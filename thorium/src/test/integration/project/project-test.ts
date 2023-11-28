import { describe, test, expect } from "vitest";
import {
  execGeneratedFile,
  generatePython,
  generateR,
} from "../../../cli/generator.js";
import { assertModelNoErrors } from "../../utils.js";

const fs = require("fs");
const csv = require("csv-parser");

const th3Code = `
let csv = CSVFile("data.csv")
let table = Table(csv)

table.project(["name","age"]) 

table.write("./src/test/integration/project/generated.csv")
`;

describe("Test-integration project", () => {
  test("python correct results", async () => {
    const model = await assertModelNoErrors(th3Code);

    await generatePython(
      model,
      "testProject",
      "./src/test/integration/project/"
    );

    await execGeneratedFile(
      "./src/test/integration/project/testProject.py",
      "python"
    );

    const result: any[] = [];
    const generated: any[] = [];

    await fs
      .createReadStream("./src/test/integration/project/resultProject.csv")
      .pipe(csv())
      .on("data", (row: any) => {
        result.push(row);
      })
      .on("error", (error: any) => {
        // En cas d'erreur pendant la lecture du fichier
        console.error(
          "Erreur lors de la lecture du fichier CSV:",
          error.message
        );
      });
    fs.createReadStream("./src/test/integration/project/generated.csv")
      .pipe(csv())
      .on("data", (row: any) => {
        generated.push(row);
      })
      .on("end", () => {
        expect(generated).toEqual(result);
      });
  });

  test("R correct results", async () => {
    const model = await assertModelNoErrors(th3Code);

    await generateR(model, "testProject", "./src/test/integration/project/");

    await execGeneratedFile(
      "./src/test/integration/project/testProject.R",
      "R"
    );

    const result: any[] = [];
    const generated: any[] = [];

    await fs
      .createReadStream("./src/test/integration/project/resultProject.csv")
      .pipe(csv())
      .on("data", (row: any) => {
        result.push(row);
      })
      .on("error", (error: any) => {
        // En cas d'erreur pendant la lecture du fichier
        console.error(
          "Erreur lors de la lecture du fichier CSV:",
          error.message
        );
      });
    fs.createReadStream("./src/test/integration/project/generated.csv")
      .pipe(csv())
      .on("data", (row: any) => {
        generated.push(row);
      })
      .on("end", () => {
        expect(generated).toEqual(result);
      });
  });
});
