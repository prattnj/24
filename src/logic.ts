export function generatePuzzle(): [number[], string[]] {
    // continually generates 4 digits until they have a solution
    let solutions: string[] = [];
    let digits: number[] = [];
    do {
        digits = [generateRandomDigit(), generateRandomDigit(), generateRandomDigit(), generateRandomDigit()];
        solutions = solve(digits);
    } while (solutions.length === 0);
    return [digits, solutions];
}

function generateRandomDigit(): number {
    // generate a 0-9
    return Math.floor(Math.random() * 9) + 1;
}

function solve(digits: number[]): string[] {
    // returns an array of solutions to 24

    // generate all 7680 (5 parenthetical combos * 4! digit permutations * 64 operator combos) combinations
    const possibleSolutions: string[] = generateStrings(digits);

    // find which possible solutions are valid
    const results: string[] = [];
    for (var possibleSolution of possibleSolutions) {
        if (validateSolution(possibleSolution)) results.push(possibleSolution);
    }

    return results;
}

function generateStrings(digits: number[]): string[] {
    let results: string[] = [];
    const digitPermutations: string[][] = permuteDigits(digits);
    for (var digitPerm of digitPermutations) {
        results = results.concat(makeParenAndOpCombos(digitPerm));
    }
    return results;
}

function permuteDigits(digits: number[]): string[][] {
    const a: string = digits[0].toString();
    const b: string = digits[1].toString();
    const c: string = digits[2].toString();
    const d: string = digits[3].toString();
    return [
        [a, b, c, d],
        [a, b, d, c],
        [a, c, b, d],
        [a, c, d, b],
        [a, d, b, c],
        [a, d, c, b],
        [b, a, c, d],
        [b, a, d, c],
        [b, c, a, d],
        [b, c, d, a],
        [b, d, a, c],
        [b, d, c, a],
        [c, a, b, d],
        [c, a, d, b],
        [c, b, a, d],
        [c, b, d, a],
        [c, d, a, b],
        [c, d, b, a],
        [d, a, b, c],
        [d, a, c, b],
        [d, b, a, c],
        [d, b, c, a],
        [d, c, a, b],
        [d, c, b, a],
    ];
}

function makeParenAndOpCombos(digits: string[]): string[] {
    const results: string[] = [];
    const ops: string[] = ["+", "-", "*", "/"];
    const [a, b, c, d] = digits;
    for (var op1 of ops) {
        for (var op2 of ops) {
            for (var op3 of ops) {
                results.push(`(${a} ${op1} ${b}) ${op2} (${c} ${op3} ${d})`);
                results.push(`((${a} ${op1} ${b}) ${op2} ${c}) ${op3} ${d}`);
                results.push(`(${a} ${op1} (${b} ${op2} ${c})) ${op3} ${d}`);
                results.push(`${a} ${op1} ((${b} ${op2} ${c}) ${op3} ${d})`);
                results.push(`${a} ${op1} (${b} ${op2} (${c} ${op3} ${d}))`);
            }
        }
    }
    return results;
}

function validateSolution(solution: string): boolean {
    // given an equation as a string, see if it equals 24

    const tokens: Token[] = tokenize(solution);
    const [expression, _]: [Expression | number, Token[]] = createExpression(tokens);

    if (expression === 0) return false;
    return (expression as Expression).evaluate() === 24;
}

enum Token {
    OpenParen = 10,
    CloseParen = 11,
    Plus = 12,
    Minus = 13,
    Multiply = 14,
    Divide = 15,
    One = 1,
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5,
    Six = 6,
    Seven = 7,
    Eight = 8,
    Nine = 9,
}

class Expression {
    left: number | Expression;
    right: number | Expression;
    operator: Token;

    constructor(left: number | Expression, right: number | Expression, operator: Token) {
        this.left = left;
        this.right = right;
        this.operator = operator;
    }

    evaluate(): number {
        const leftValue: number = (typeof this.left) === "number" ? this.left as number : (this.left as Expression).evaluate();
        const rightValue: number = (typeof this.right) === "number" ? this.right as number : (this.right as Expression).evaluate();

        if (this.operator === Token.Plus) return leftValue + rightValue;
        else if (this.operator === Token.Minus) return leftValue - rightValue;
        else if (this.operator === Token.Multiply) return leftValue * rightValue;
        else if (this.operator === Token.Divide) {
            if (rightValue === 0) return Infinity;
            else return leftValue / rightValue;
        }
        else return Infinity; // this shouldn't happen
    }
}

function tokenize(input: string): Token[] {
    const results: Token[] = [];
    for (var char of input) {
        if (char === '(') results.push(Token.OpenParen);
        else if (char === ')') results.push(Token.CloseParen);
        else if (char === '+') results.push(Token.Plus);
        else if (char === '-') results.push(Token.Minus);
        else if (char === '*') results.push(Token.Multiply);
        else if (char === '/') results.push(Token.Divide);
        else if (char === '1') results.push(Token.One);
        else if (char === '2') results.push(Token.Two);
        else if (char === '3') results.push(Token.Three);
        else if (char === '4') results.push(Token.Four);
        else if (char === '5') results.push(Token.Five);
        else if (char === '6') results.push(Token.Six);
        else if (char === '7') results.push(Token.Seven);
        else if (char === '8') results.push(Token.Eight);
        else if (char === '9') results.push(Token.Nine);
    }
    return results;
}

const ops = new Set([Token.Plus, Token.Minus, Token.Multiply, Token.Divide]);
const digits = new Set([Token.One, Token.Two, Token.Three, Token.Four, Token.Five, Token.Six, Token.Seven, Token.Eight, Token.Nine]);

function createExpression(input: Token[]): [number | Expression, Token[]] {
    let left: number | Expression | null = null;
    let right: number | Expression | null = null;
    let operator: Token | null = null;

    while (input.length > 0) {
        const token: Token = input.shift()!;
        if (token === Token.OpenParen) {
            const [innerExp, remaining] = createExpression(input);
            input = remaining;
            if (!left) left = innerExp;
            else right = innerExp;
        } else if (token === Token.CloseParen) {
            break;
        } else if (ops.has(token)) {
            operator = token;
        } else if (digits.has(token)) {
            if (!left) left = token.valueOf();
            else if (!right) right = token.valueOf();
        }
    }
    
    if (left && operator && right) return [new Expression(left, right, operator), input];
    
    return [0, []];
}