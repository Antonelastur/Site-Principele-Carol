import { describe, it, expect } from 'vitest';
import { calculateAcademicAverage } from './gradeCalculator';

/**
 * TEST SUITE: Academic Performance Engine
 * Logic: Calculates the weighted average of school grades.
 * Constraints: Grades must be between 1 and 10.
 */
describe('calculateAcademicAverage', () => {
    // 1. Happy Path
    it('should calculate the correct average for a standard set of grades', () => {
        const grades = [10, 9, 8, 10];
        expect(calculateAcademicAverage(grades)).toBe(9.25);
    });

    // 2. Edge Case: Empty Array
    it('should return 0 when no grades are provided', () => {
        expect(calculateAcademicAverage([])).toBe(0);
    });

    // 3. Edge Case: Out of Bounds (Security/Sanity Check)
    it('should throw an error if a grade is outside the 1-10 range', () => {
        const invalidGrades = [10, 11, -1];
        expect(() => calculateAcademicAverage(invalidGrades)).toThrow('INVALID_GRADE_VALUE');
    });

    // 4. Precision Check
    it('should handle decimal grades correctly with 2-decimal precision', () => {
        const decimalGrades = [9.5, 8.75];
        expect(calculateAcademicAverage(decimalGrades)).toBe(9.13); // (9.5 + 8.75) / 2 = 9.125
    });
});
