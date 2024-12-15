import { Day } from './day.ts';

export class Day04 extends Day<string[]> {
    constructor() {
        super(4, "inputs/day04.txt");
    }

    override readInput(path: string): string[] {
        const input = Deno.readTextFileSync(path);
        return input.split("\n");
    }

    matchWord(puzzle: string[], word: string, startX: number, startY: number, dirX: number, dirY: number): boolean {
        const width = puzzle[0].length;
        const height = puzzle.length;
        const end = word.length - 1;
        const endX = startX + end * dirX;
        const endY = startY + end * dirY;

        if (endX < 0 || endX >= width) return false;
        if (endY < 0 || endY >= height) return false;

        let x = startX;
        let y = startY;

        for (let i = 0; i < word.length; i++) {
            if (puzzle[y][x] != word[i]) {
                return false;
            }

            x += dirX;
            y += dirY;
        }

        return true;
    }

    matchWords(puzzle: string[], word: string, x: number, y: number): number {
        const directions: [number, number][] = [
            [ 0, -1], // 8
            [ 1, -1], // 9
            [ 1,  0], // 6
            [ 1,  1], // 3
            [ 0,  1], // 2
            [-1,  1], // 1
            [-1,  0], // 4
            [-1, -1], // 7   
        ]

        let count = 0;
        for (const [dirX, dirY] of directions) {
            if (this.matchWord(puzzle, word, x, y, dirX, dirY)) {
                count++;
            }
        }

        return count;
    }

    override solvePart1(input: string[]): number {
        const word = "XMAS";
        const width = input[0].length;
        const height = input.length;

        let count = 0;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                count += this.matchWords(input, word, x, y);
            }
        }

        return count;
    }

    matchX(puzzle: string[], word: string, x: number, y: number): boolean {
        const l = word.length - 1;
        const left = this.matchWord(puzzle, word, x, y, 1, 1)
            || this.matchWord(puzzle, word, x+l, y+l, -1, -1);

        const right = this.matchWord(puzzle, word, x+l, y, -1, 1)
            || this.matchWord(puzzle, word, x, y+l, 1, -1);

        return left && right;
    }

    override solvePart2(input: string[]): number {
        const word = "MAS";
        const width = input[0].length;
        const height = input.length;
        const size = word.length - 1;

        let count = 0;
        for (let y = 0; y < height - size; y++) {
            for (let x = 0; x < width - size; x++) {
                if (this.matchX(input, word, x, y)) {
                    count++;
                }
            }
        }

        return count;
    }
}