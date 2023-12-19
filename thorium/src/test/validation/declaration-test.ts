import { describe, expect, test } from "vitest";
import { generateR } from "../../cli/generateR.js";
import { generatePython } from "../../cli/generatePython.js";
import * as fs from "node:fs";
import { assertModelNoErrors } from "../utils.js";

const expectedPython = `import pandas as pd
csv = "data.csv"
table = pd.read_csv(csv)
`;
const th3Code = `
let csv = CSVFile("data.csv")
let table = Table(csv)
`;
const expectedR = `csv <- "data.csv"
table <- read.csv(csv, stringsAsFactors = FALSE)`;

describe("Test basic declarations", () => {
  test("correct python code", async () => {
    const model = await assertModelNoErrors(th3Code);
    const file = generatePython(model, "testDeclaration", undefined);

    fs.readFile("./" + file, "utf8", function (err, data) {
      if (err) {
        console.log(err);
      } else {
        expect(data.replace(/\r\n/g, "\n")).toBe(expectedPython);
      }
    });
  });
  test("correct R code", async () => {
    const model = await assertModelNoErrors(th3Code);
    const file = generateR(model, "testDeclaration", undefined);

    fs.readFile("./" + file, "utf8", function (err, data) {
      if (err) {
        console.log(err);
      } else {
        expect(data.trim().replace(/\r\n/g, "\n")).toEqual(expectedR.trim());
      }
    });
  });
});
