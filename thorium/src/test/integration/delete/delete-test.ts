import { describe, test, expect } from "vitest";
import { execGeneratedFile } from "../../../cli/generator.js";
import { generatePython } from "../../../cli/generatePython.js";
import { generateR } from "../../../cli/generateR.js";
import { assertModelNoErrors } from "../../utils.js";

const fs = require("fs");
const csv = require("csv-parser");

const th3Code = `
let table = Table(CSVFile("data.csv"))
table.delete(2) // delete 1 row

let table = Table(CSVFile("data.csv"))
table.delete("age") // delete 1 column

let table = Table(CSVFile("data.csv"))
table.delete([1,2,3]) // delete rows

let table = Table(CSVFile("data.csv"))
table.delete(["name","department"]) // delete cols 

table.write("./src/test/integration/delete/generated.csv")
`;

describe("Test-integration delete", () => {
  test("python correct results", async () => {
    const model = await assertModelNoErrors(th3Code);

    await generatePython(model, "testDelete", "./src/test/integration/delete/");

    await execGeneratedFile(
      "./src/test/integration/delete/testDelete.py",
      "python"
    );

    const result: any[] = [];
    const generated: any[] = [];

    await fs
      .createReadStream("./src/test/integration/delete/resultDelete.csv")
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
    fs.createReadStream("./src/test/integration/delete/generated.csv")
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

    await generateR(model, "testDelete", "./src/test/integration/delete/");

    await execGeneratedFile("./src/test/integration/delete/testDelete.R", "R");

    const result: any[] = [];
    const generated: any[] = [];

    await fs
      .createReadStream("./src/test/integration/delete/resultDelete.csv")
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
    fs.createReadStream("./src/test/integration/delete/generated.csv")
      .pipe(csv())
      .on("data", (row: any) => {
        generated.push(row);
      })
      .on("end", () => {
        expect(generated).toEqual(result);
      });
  });
});
