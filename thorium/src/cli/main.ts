import type { Model } from "../language/generated/ast.js";
import chalk from "chalk";
import { Command } from "commander";
import { ThoriumLanguageMetaData } from "../language/generated/module.js";
import { createThoriumServices } from "../language/thorium-module.js";
import { extractAstNode } from "./cli-util.js";
import { generatePython } from "./generatePython.js";
import { generateR } from "./generateR.js";
import { NodeFileSystem } from "langium/node";

export const generateAction = async (
  fileName: string,
  opts: GenerateOptions
): Promise<void> => {
  const services = createThoriumServices(NodeFileSystem).Thorium;
  const model = await extractAstNode<Model>(fileName, services);
  const generatedFilePathPython = generatePython(
    model,
    fileName,
    opts.destination
  );
  console.log(
    chalk.green(
      `Python code generated successfully: ${generatedFilePathPython}`
    )
  );
  const generatedFilePathR = generateR(model, fileName, opts.destination);
  console.log(
    chalk.green(`R code generated successfully: ${generatedFilePathR}`)
  );
};

export type GenerateOptions = {
  destination?: string;
};

export default function main(): void {
  const program = new Command();

  //program
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  // .version(require("../../package.json").version);

  const fileExtensions = ThoriumLanguageMetaData.fileExtensions.join(", ");
  program
    .command("generate")
    .argument(
      "<file>",
      `source file (possible file extensions: ${fileExtensions})`
    )
    .option("-d, --destination <dir>", "destination directory of generating")
    .description(
      'generates JavaScript code that prints "Hello, {name}!" for each greeting in a source file'
    )
    .action(generateAction);

  program.parse(process.argv);
}

main();
