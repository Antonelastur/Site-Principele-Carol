/**
 * @file gradeCalculator.js
 * @description Core logic for academic calculations at Școala Principele Carol.
 * Built following TDD principles.
 */

/**
 * Calculates the arithmetic average of an array of grades.
 * 
 * @param {number[]} grades - Array of numeric grades.
 * @returns {number} The calculated average, rounded to 2 decimal places.
 * @throws {Error} If any grade is outside the valid 1-10 range.
 */
export function calculateAcademicAverage(grades) {
    if (!grades || grades.length === 0) {
        return 0;
    }

    const sum = grades.reduce((acc, grade) => {
        if (grade < 1 || grade > 10) {
            throw new Error('INVALID_GRADE_VALUE');
        }
        return acc + grade;
    }, 0);

    const average = sum / grades.length;

    // Applying high-density rounding (Fixed 2 decimals)
    return Math.round((average + Number.EPSILON) * 100) / 100;
}
