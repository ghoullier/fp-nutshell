import { EOL } from "node:os";

interface Manifest {
  version: string;
}

const jsr = Bun.file("./jsr.json", { type: "application/json" });
const pkg = Bun.file("./package.json", { type: "application/json" });
const pkgContent: Manifest = await pkg.json();
const jsrContent: Manifest = await jsr.json();

await Bun.write(
  jsr,
  `${JSON.stringify(
    {
      ...jsrContent,
      version: pkgContent.version,
    },
    null,
    2
  )}${EOL}`
);
