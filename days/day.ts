export interface IDay {
    printSolutions(): void;
}

export abstract class Day<T> implements IDay {
    abstract readInput(path: string): T;
    
    abstract solvePart1(input: T): number;
    abstract solvePart2(input: T): number;

    constructor(public index: number, public inputPath: string) { }

    printSolutions(): void {
        console.log(`Day ${this.index}:`);
        const input: T = this.readInput(this.inputPath);
        console.log(` Part 1 = ${this.solvePart1(input)}`);
        console.log(` Part 2 = ${this.solvePart2(input)}`);
    }
}