import { describe, test, expect } from "vitest";
import { execGeneratedFile } from "../../../cli/generator.js";
import { generateR } from "../../../cli/generateR.js";
import { generatePython } from "../../../cli/generatePython.js";
import { assertModelNoErrors } from "../../utils.js";

const fs = require("fs");
const csv = require("csv-parser");

const th3Code = `
let table = Table(CSVFile("data.csv"))

table.modify(2,"Hugo,22,Lyon,INFO")
table.modify(2,4,"GMA")
table.modify(2,"age",40)

table.write("./src/test/integration/modif/generated.csv")
`;

describe("Test-integration modif", () => {
  test("python correct results", async () => {
    const model = await assertModelNoErrors(th3Code);

    await generatePython(model, "testModif", "./src/test/integration/modif/");

    await execGeneratedFile(
      "./src/test/integration/modif/testModif.py",
      "python"
    );

    const result: any[] = [];
    const generated: any[] = [];

    await fs
      .createReadStream("./src/test/integration/modif/resultModif.csv")
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
    fs.createReadStream("./src/test/integration/modif/generated.csv")
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

    await generateR(model, "testModif", "./src/test/integration/modif/");

    await execGeneratedFile("./src/test/integration/modif/testModif.R", "R");

    const result: any[] = [];
    const generated: any[] = [];

    await fs
      .createReadStream("./src/test/integration/modif/resultModif.csv")
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
    fs.createReadStream("./src/test/integration/modif/generated.csv")
      .pipe(csv())
      .on("data", (row: any) => {
        generated.push(row);
      })
      .on("end", () => {
        expect(generated).toEqual(result);
      });
  });
});
