import { describe, test, expect } from "vitest";
import { execGeneratedFile, generatePython, generateR } from "../../../cli/generator.js";
import { assertModelNoErrors } from "../../utils.js";

const fs = require("fs");
const csv = require("csv-parser");

const th3Code = `
let csv = CSVFile("data.csv")
let table = Table(csv)

table.add("pierre, 21, rennes,GMA")
table.add(["serge,21,rennes,GMA", "paul, 22, paris,GMA", "herve, 23, lyon,INFO"])
table.write("./src/test/integration/add/data2.csv")
`;

describe("Test-integration add", () => {
  test("correct results", async () => {
    const model = await assertModelNoErrors(th3Code);

    await generatePython(model, "testAdd", "./src/test/comparison/add-test/");
    await generateR(model, "testAdd", "./src/test/comparison/add-test/");

    await execGeneratedFile("./src/test/comparison/add-test/testAdd.py", "python");
    await execGeneratedFile("./src/test/comparison/add-test/testAdd.py", "R");

    const data1: any[] = [];
    const data2: any[] = [];

    await fs
      .createReadStream("./src/test/comparison/add-test/resultAdd.csv")
      .pipe(csv())
      .on("data", (row: any) => {
        data1.push(row);
      })
      .on("error", (error: any) => {
        // En cas d'erreur pendant la lecture du fichier
        console.error(
          "Erreur lors de la lecture du fichier CSV:",
          error.message
        );
      });
    fs.createReadStream("./src/test/comparison/add-test/data2.csv")
      .pipe(csv())
      .on("data", (row: any) => {
        data2.push(row);
      })
      .on("end", () => {
        expect(data1).toEqual(data2);
      });
    
  });
});
