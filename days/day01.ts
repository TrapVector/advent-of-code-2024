import { Day } from './day.ts';

export class Day01 extends Day<[number[], number[]]> {
    constructor() {
        super(1, "inputs/day01.txt");
    }

    override readInput(path: string): [number[], number[]] {
        const input = Deno.readTextFileSync(path);
        const lines = input.split("\n");

        const list1: number[] = [];
        const list2: number[] = [];

        lines.forEach((line) => {
            if (line.trim() !== "") {
                const [num1, num2] = line.split("   ");
                list1.push(parseInt(num1));
                list2.push(parseInt(num2));
            }
        });

        return [list1, list2];
    }

    override solvePart1(input: [number[], number[]]): number {
        const [list1, list2] = input;
        
        list1.sort();
        list2.sort();
      
        let total = 0;
      
        for (let i = 0; i < list1.length; i++) {
          total += Math.abs(list1[i] - list2[i]);
        }
      
        return total;
    }

    override solvePart2(input: [number[], number[]]): number {
        const [list1, list2] = input;

        const occurrences = new Map<number, number>();

        for (const num of list2) {
          const count = occurrences.get(num) || 0;
          occurrences.set(num, count + 1);
        }
      
        let total = 0;
        for (const num of list1) {
          const count = occurrences.get(num) || 0;
          total += num * count;
        }
      
        return total;
    }
}