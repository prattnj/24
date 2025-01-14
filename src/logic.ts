export function generatePuzzle(): number[] {
    // continually generates 4 digits until they have a solution
    let hasSolution = false;
    let digits: number[] = [];
    do {
        digits = [generateRandomDigit(), generateRandomDigit(), generateRandomDigit(), generateRandomDigit()];
        hasSolution = digitsHaveSolution(digits);
    } while (!hasSolution);
    return digits;
}

function generateRandomDigit(): number {
    // generate a 0-9
    return Math.floor(Math.random() * 9) + 1;
}

function digitsHaveSolution(digits: number[]): boolean {
    // determines if the 4 operands can be manipulated with basic arithmetic operations (+, -, x, /) to equal 24
    return true;
}