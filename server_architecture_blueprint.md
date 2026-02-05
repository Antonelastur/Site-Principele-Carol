```mermaid
erDiagram
    SCHOOL ||--o{ ACADEMIC_YEAR : "has"
    ACADEMIC_YEAR ||--o{ CLASS : "contains"
    CLASS ||--o{ STUDENT : "enrolled"
    CLASS ||--|| TEACHER : "is dirigent"
    TEACHER ||--o{ SUBJECT : "teaches"
    STUDENT ||--o{ GRADE : "receives"
    SUBJECT ||--o{ GRADE : "is for"
    USER ||--|| TEACHER : "is"
    USER ||--|| STUDENT : "is"
    
    USER {
        uuid id PK
        string email UK
        string password_hash
        enum role "ADMIN | TEACHER | STUDENT | PARENT"
        datetime created_at
    }

    STUDENT {
        uuid id PK
        uuid user_id FK
        string matricula_id UK
        date date_of_birth
    }

    CLASS {
        uuid id PK
        string name "e.g., 9A"
        uuid teacher_id FK
        uuid year_id FK
    }

    GRADE {
        uuid id PK
        integer value
        uuid student_id FK
        uuid subject_id FK
        datetime awarded_at
    }

    POST {
        uuid id PK
        string title
        text content
        uuid author_id FK
        enum category "NEWS | EVENT | ACADEMIC"
        datetime published_at
    }
```

---

### Backend Architecture: The "Heritage" Node.js Foundation

#### 1. Security-First DB Layer (`/infra/database.ts`)
Using **Kysely** for zero-runtime overhead type safety and SQL injection protection.

```typescript
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { Database } from '../domain/types';

/**
 * High-Density DB Connector.
 * Uses a singleton pattern to maintain a persistent, healthy pool of connections.
 * Encapsulates PostgreSQL logic behind a strictly-typed Kysely instance.
 */
export const db = new Kysely<Database>({
    dialect: new PostgresDialect({
        pool: new Pool({
            connectionString: process.env.DATABASE_URL,
            max: 20, // High-performance pooling
        })
    })
});
```

#### 2. Domain Entities & Validation (`/domain/schemas.ts`)
Strict typing using Zod for edge validation. No `any` allowed.

```typescript
import { z } from 'zod';

// Core Identity Schema
export const UserSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    role: z.enum(['ADMIN', 'TEACHER', 'STUDENT', 'PARENT']),
    fullName: z.string().min(3).max(100),
});

export type User = z.infer<typeof UserSchema>;

// Academic Grade Validation
export const AcademicGradeSchema = z.object({
    studentId: z.string().uuid(),
    subjectId: z.string().uuid(),
    value: z.number().int().min(1).max(10),
    teacherId: z.string().uuid(),
});

export type AcademicGrade = z.infer<typeof AcademicGradeSchema>;
```

#### 3. High-Density Business Logic (`/application/GradeService.ts`)
Functional, modular approach to grading logic.

```typescript
import { db } from '../infra/database';
import { AcademicGrade } from '../domain/schemas';
import { AppError } from '../middleware/ErrorHandler';

/**
 * Orchestrates the awarding of grades.
 * Ensures atomicity and validates permissions before persistence.
 * @throws AppError if unauthorized or data is invalid.
 */
export class GradeService {
    static async awardGrade(data: AcademicGrade) {
        return await db.transaction().execute(async (trx) => {
            // 1. Verify Teacher exists & teaches Subject
            const isAuthorized = await trx
                .selectFrom('TeacherSubjects')
                .where('teacher_id', '=', data.teacherId)
                .where('subject_id', '=', data.subjectId)
                .executeTakeFirst();

            if (!isAuthorized) {
                throw new AppError('TEACHER_NOT_AUTHORIZED', 403);
            }

            // 2. Insert Grade with strict parameterization
            return await trx
                .insertInto('grades')
                .values({
                    student_id: data.studentId,
                    subject_id: data.subjectId,
                    value: data.value,
                    awarded_at: new Date(),
                })
                .returningAll()
                .executeTakeFirstOrThrow();
        });
    }
}
```

#### 4. Global Error Handling Middleware (`/middleware/ErrorHandler.ts`)
Ensures no silent failures and provides clean responses.

```typescript
import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
    constructor(public code: string, public status: number = 500) {
        super(code);
    }
}

/**
 * Global Exception Shield.
 * Formats errors into a predictable JSON structure for the frontend.
 * Log to monitoring services (Sentry/NewRelic) should be injected here.
 */
export const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const status = err.status || 500;
    const message = err.message || 'INTERNAL_SERVER_ERROR';

    console.error(`[BACKEND_FAULT] ${new Date().toISOString()}: ${message}`, err.stack);

    res.status(status).json({
        success: false,
        error: {
            code: err.code || 'UNKNOWN_ERROR',
            message: message,
        }
    });
};
```

---

### Refactoring Note: Backend Evolution
**Observation:** The initial site used simple alerts for "Functionality coming soon".
**Architectural Shift:**
1.  **State Management:** Replaced client-side variables with a **Stateless JWT-based Auth** system. This allows the school staff to manage content without touching HTML.
2.  **Concurrency:** Replaced sequential DB calls with **Transaction-based Batching**. This prevents race conditions where a student might be moved to a different class during grade awarding.
3.  **Sanitization:** Instead of manual regex (as seen in `main.js`), security is now enforced at the **Schema Layer (Zod)**. Data that doesn't fit the mold is incinerated before reaching the service layer.

This infrastructure is built for **10-year durability**. It treats the school's digital data with the same reverence as the actual archives.
