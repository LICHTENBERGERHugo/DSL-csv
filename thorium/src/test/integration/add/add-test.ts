import { describe, test, expect } from "vitest";
import { execGeneratedFile } from "../../../cli/generator.js";
import { generateR } from "../../../cli/generateR.js";
import { generatePython } from "../../../cli/generatePython.js";
import { assertModelNoErrors } from "../../utils.js";

const fs = require("fs");
const csv = require("csv-parser");

const th3Code = `
let csv = CSVFile("data.csv")
let table = Table(csv)

table.add("pierre,21,Rennes,GMA")
table.add(["serge,21,Rennes,GMA", "paul,22,Paris,GMA", "herve,23,Lyon,INFO"])
table.write("./src/test/integration/add/generated.csv")
`;

describe("Test-integration add", () => {
  test("python correct results", async () => {
    const model = await assertModelNoErrors(th3Code);

    await generatePython(model, "testAdd", "./src/test/integration/add/");

    await execGeneratedFile("./src/test/integration/add/testAdd.py", "python");

    const result: any[] = [];
    const generated: any[] = [];

    await fs
      .createReadStream("./src/test/integration/add/resultAdd.csv")
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
    fs.createReadStream("./src/test/integration/add/generated.csv")
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

    await generateR(model, "testAdd", "./src/test/integration/add/");

    await execGeneratedFile("./src/test/integration/add/testAdd.R", "R");

    const result: any[] = [];
    const generated: any[] = [];

    await fs
      .createReadStream("./src/test/integration/add/resultAdd.csv")
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
    fs.createReadStream("./src/test/integration/add/generated.csv")
      .pipe(csv())
      .on("data", (row: any) => {
        generated.push(row);
      })
      .on("end", () => {
        expect(generated).toEqual(result);
      });
  });
});
