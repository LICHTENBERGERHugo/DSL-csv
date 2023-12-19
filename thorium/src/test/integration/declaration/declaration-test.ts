import { describe, test, expect } from "vitest";
import { execGeneratedFile } from "../../../cli/generator.js";
import { generateR } from "../../../cli/generateR.js";
import { generatePython } from "../../../cli/generatePython.js";
import { assertModelNoErrors } from "../../utils.js";

const fs = require("fs");
const csv = require("csv-parser");

const th3Code = `
let csv1 = CSVFile("data.csv")
let table1 = Table(csv1)
let table2 = Table(CSVFile("data.csv"))
let csv2 = csv1
table2.write("./src/test/integration/declaration/generated.csv")

`;

describe("Test-integration declaration", () => {
  test("python correct results", async () => {
    const model = await assertModelNoErrors(th3Code);

    await generatePython(
      model,
      "testDeclaration",
      "./src/test/integration/declaration/"
    );

    await execGeneratedFile(
      "./src/test/integration/declaration/testDeclaration.py",
      "python"
    );

    const result: any[] = [];
    const generated: any[] = [];

    await fs
      .createReadStream(
        "./src/test/integration/declaration/resultDeclaration.csv"
      )
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
    fs.createReadStream("./src/test/integration/declaration/generated.csv")
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

    await generateR(
      model,
      "testDeclaration",
      "./src/test/integration/declaration/"
    );

    await execGeneratedFile(
      "./src/test/integration/declaration/testDeclaration.R",
      "R"
    );

    const result: any[] = [];
    const generated: any[] = [];

    await fs
      .createReadStream(
        "./src/test/integration/declaration/resultDeclaration.csv"
      )
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
    fs.createReadStream("./src/test/integration/declaration/generated.csv")
      .pipe(csv())
      .on("data", (row: any) => {
        generated.push(row);
      })
      .on("end", () => {
        expect(generated).toEqual(result);
      });
  });
});
