// Funniest Sign on a Haunted Server Room Door — one original line.
//
// The sign: the ghost that haunts Rack 7 is not some vague spook. It has
// root access, it changes passwords at 3 a.m., and the only sensible
// sysadmin response is to apologise and back away. Office IT life meets
// the supernatural, in the voice of a printed warning sign.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const sign =
  "CAUTION: The ghost in Rack 7 has root access. If it changes your " +
  "password at 3 a.m., apologise and back away slowly.";

// The gate only accepts 1-120 characters of real text on a single line,
// so refuse to write anything that would fail it instead of shipping
// a bad entry.
const line = sign.trim();
if (line.length < 1 || line.length > 120) {
  throw new Error(`sign must be 1-120 characters, got ${line.length}`);
}
if (!/\S/.test(line)) {
  throw new Error("sign must not be only whitespace");
}
if (line.includes("\n") || line.includes("\r")) {
  throw new Error("sign must be a single line");
}

// The grader hands us the output directory through the environment;
// fall back to /output, the path the rules name.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), line, "utf8");

// Print it too, so a human running it can hear the sign read aloud.
console.log(line);
console.log(`(${line.length} characters)`);
