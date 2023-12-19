import { describe, expect, test } from "vitest";
import { generatePython, generateR } from "../../cli/generator.js";
import * as fs from "node:fs";
import { assertModelNoErrors } from "../utils.js";

const expectedPython = `import pandas as pd
csv = "data.csv"
table = pd.read_csv(csv)
table.to_csv("./generated.csv",index=False)
`;
const th3Code = `
let csv = CSVFile("data.csv")
let table = Table(csv)
table.write("./generated.csv")
`;
const expectedR = `csv <- "data.csv"
table <- read.csv(csv, stringsAsFactors = FALSE)
write.csv(table, "./generated.csv", row.names=FALSE, quote=FALSE)
`;

describe("Test write", () => {
  test("correct python code", async () => {
    const model = await assertModelNoErrors(th3Code);

    const file = generatePython(model, "testWrite", undefined);

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
    const file = generateR(model, "testWrite", undefined);

    fs.readFile("./" + file, "utf8", function (err, data) {
      if (err) {
        console.log(err);
      } else {
        expect(data.trim().replace(/\r\n/g, "\n")).toEqual(expectedR.trim());
      }
    });
  });
});
