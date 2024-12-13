import { Day } from './day.ts';

export class Day02 extends Day<number[][]> {
    constructor() {
        super(2, "inputs/day02.txt");
    }

    override readInput(path: string): number[][] {
        const input = Deno.readTextFileSync(path);
        const lines = input.split("\n");

        const reports: number[][] = [];

        lines.forEach((line) => {
            if (line.trim() !== "") {
                const readings = line.split(" ");
                reports.push(readings.map((r) => { return parseInt(r); }));
            }
        });

        return reports;
    }

    isSafe(report: number[]) {
        let lastReading = report[0];
        let direction: "up" | "down" | "unknown" = "unknown";

        for (let i = 1; i < report.length; i++) {
            const reading = report[i];

            if (reading === lastReading) {
                return false;
            }

            if (Math.abs(reading - lastReading) > 3) {
                return false;
            }

            if (direction === "unknown") {
                if (reading > lastReading) {
                    direction = "up";
                }
                else {
                    direction = "down";
                }
            }

            if (direction === "up") {
                if (reading < lastReading) {
                    return false;
                }
            }
            else if (direction === "down") {
                if (reading > lastReading) {
                    return false;
                }
            }

            lastReading = reading;
        }

        return true;
    }

    override solvePart1(input: number[][]): number {
        let safeCount = 0;
        for (const report of input) {
            if (this.isSafe(report)) {
                safeCount++;
            }
        }

        return safeCount;
    }

    override solvePart2(input: number[][]): number {
        let safeCount = 0;
        for (const report of input) {
            if (this.isSafe(report)) {
                safeCount++;
            }
            else {
                for (let i = 0; i < report.length; i++) {
                    const subReport = report.filter((_, index) => index !== i);
                    if (this.isSafe(subReport)) {
                        safeCount++;
                        break;
                    }
                }
            }
        }

        return safeCount;
    }
}