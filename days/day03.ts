import { Day } from './day.ts';

export class Day03 extends Day<string> {
    constructor() {
        super(3, "inputs/day03.txt");
    }

    
    override readInput(path: string): string {
        const input = Deno.readTextFileSync(path);
        return input;
    }
    
    override solvePart1(input: string): number {
        const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;
        let total = 0;
        for (const match of input.matchAll(mulRegex)) {
            const a = parseInt(match[1]);
            const b = parseInt(match[2]);

            total += a * b;
        }

        return total;
    }

    override solvePart2(input: string): number {
        const scanLength = 12; // max length of mul instruction
        const doCmd = "do()";
        const dontCmd = "don't()";
        const mulCmd = "mul(";
        const mulRegex = /^mul\((\d{1,3}),(\d{1,3})\)/;

        let total = 0;
        let enabled = true;
        let index = 0;
        while (index < input.length - scanLength) {
            if (input.startsWith(doCmd, index)) {
                enabled = true;
                index += doCmd.length;
            }
            else if (input.startsWith(dontCmd, index)) {
                enabled = false;
                index += dontCmd.length;
            }
            else if (input.startsWith(mulCmd, index)) {
                const instruction = input.substring(index, index + scanLength);
                const match = instruction.match(mulRegex);
                if (match === null) {
                    index += mulCmd.length;
                }
                else {
                    if (enabled) {
                        const a = parseInt(match[1]);
                        const b = parseInt(match[2]);
            
                        total += a * b;
                    }
                    index += match[0].length;
                }
            }
            else {
                index++;
            }
        }
        
        return total;
    }
}