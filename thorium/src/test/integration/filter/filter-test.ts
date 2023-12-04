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

table.filter([("department" == "INFO"), ("age" >= 20)])

table.filter("department" == "GPM")

table.filter([("city" == "Lyon"), ("age" >= 22)])

table.write("./src/test/integration/filter/generated.csv")
`;

describe("Test-integration filter", () => {
  test("python correct results", async () => {
    const model = await assertModelNoErrors(th3Code);

    await generatePython(model, "testFilter", "./src/test/integration/filter/");

    await execGeneratedFile(
      "./src/test/integration/filter/testFilter.py",
      "python"
    );

    const result: any[] = [];
    const generated: any[] = [];

    await fs
      .createReadStream("./src/test/integration/filter/resultFilter.csv")
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
    fs.createReadStream("./src/test/integration/filter/generated.csv")
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

    await generateR(model, "testFilter", "./src/test/integration/filter/");

    await execGeneratedFile("./src/test/integration/filter/testFilter.R", "R");

    const result: any[] = [];
    const generated: any[] = [];

    await fs
      .createReadStream("./src/test/integration/filter/resultFilter.csv")
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
    fs.createReadStream("./src/test/integration/filter/generated.csv")
      .pipe(csv())
      .on("data", (row: any) => {
        generated.push(row);
      })
      .on("end", () => {
        expect(generated).toEqual(result);
      });
  });
});
