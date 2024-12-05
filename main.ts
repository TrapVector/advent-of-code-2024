function readDay1Input(path: string): [number[], number[]] {
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

function computeDistance(list1: number[], list2: number[]) {
  list1.sort();
  list2.sort();

  let total = 0;

  for (let i = 0; i < list1.length; i++) {
    total += Math.abs(list1[i] - list2[i]);
  }

  return total;
}

function computeSimilarity(list1: number[], list2: number[]) {
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

function readDay2Input(path: string) {
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

function isSafe(report: number[]) {
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

function countSafeReports(reports: number[][]) {
  let safeCount = 0;
  for (const report of reports) {
    if (isSafe(report)) {
      safeCount++;
    }
  }

  return safeCount;
}

function countSafeReportsWithDampener(reports: number[][]) {
  let safeCount = 0;
  for (const report of reports) {
    if (isSafe(report)) {
      safeCount++;
    }
    else {
      for (let i = 0; i < report.length; i++) {
        const subReport = report.filter((_, index) => index !== i);
        if (isSafe(subReport)) {
          safeCount++;
          break;
        }
      }
    }
  }

  return safeCount;
}

function main() {
  console.log("Day 1");
  {
    const [list1, list2] = readDay1Input("inputs/day01.txt");
    console.log("Part 1 =", computeDistance(list1, list2));
    console.log("Part 2 =", computeSimilarity(list1, list2));
  }

  console.log("Day 2");
  {
    const reports = readDay2Input("inputs/day02.txt");
    console.log("Part 1 =", countSafeReports(reports));
    console.log("Part 2 =", countSafeReportsWithDampener(reports));
  }
}

if (import.meta.main) {
  main();
}
