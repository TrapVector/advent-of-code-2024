import { Day01 } from './days/day01.ts'
import { Day02 } from './days/day02.ts'
import { Day03 } from "./days/day03.ts";

function main() {
    const days = [
        new Day01(),
        new Day02(),
        new Day03(),
    ]

    for (const day of days) {
        day.printSolutions();
    }
}

if (import.meta.main) {
    main();
}
