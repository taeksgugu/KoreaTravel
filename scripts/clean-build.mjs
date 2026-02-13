import { rm } from "node:fs/promises";

const targets = [".next", ".open-next"];

for (const target of targets) {
  await rm(target, { recursive: true, force: true });
}

console.log("Cleaned build directories:", targets.join(", "));

