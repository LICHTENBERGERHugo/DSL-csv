import { describe, expect, test } from "vitest";
import { generatePython, generateR } from "../../cli/generator.js";
import * as fs from "node:fs";
import { assertModelNoErrors } from "../utils.js";

const th3Code = `
let csv = CSVFile("data.csv")
let table = Table(csv)

table.print()
`;
const expectedPython = `import pandas as pd
csv = "data.csv"
table = pd.read_csv(csv)
print(table.to_string())
`;
const expectedR = `csv <- "data.csv"
table <- read.csv(csv, stringsAsFactors = FALSE)
print(table)`;

describe("Test print", () => {
  test("correct python code", async () => {
    const model = await assertModelNoErrors(th3Code);
    const file = generatePython(model, "testPrint", undefined);

    fs.readFile("./" + file, "utf8", function (err, data) {
      if (err) {
        console.log(err);
      } else {
        expect(data.replace(/\r\n/g, "\n")).toEqual(expectedPython);
      }
    });
  });
  test("correct R code", async () => {
    const model = await assertModelNoErrors(th3Code);
    const file = generateR(model, "testPrint", undefined);

    fs.readFile("./" + file, "utf8", function (err, data) {
      if (err) {
        console.log(err);
      } else {
        expect(data.trim().replace(/\r\n/g, "\n")).toEqual(expectedR.trim());
      }
    });
  });
});
