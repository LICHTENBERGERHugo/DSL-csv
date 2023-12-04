import { describe, expect, test } from "vitest";
import { generatePython, generateR } from "../../cli/generator.js";
import * as fs from "node:fs";
import { assertModelNoErrors } from "../utils.js";

const th3Code = `
let csv1 = CSVFile("data.csv")
let table = Table(CSVFile("data.csv"))

table.project("name")
table.project(["name","age"])
`;
const expectedPython = `import pandas as pd
csv1 = "data.csv"
table = pd.read_csv("data.csv")
table = table["name"]
table = table[["name","age"]]
`;
const expectedR = `csv1 <- "data.csv"
table <- read.csv("data.csv")
table <- table[,c("name")]
table <- table[,c("name","age")]`;
describe("Test validate project", () => {
  test("correct python code", async () => {
    const model = await assertModelNoErrors(th3Code);
    const file = generatePython(model, "testProject", undefined);

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
    const file = generateR(model, "testProject", undefined);

    fs.readFile("./" + file, "utf8", function (err, data) {
      if (err) {
        console.log(err);
      } else {
        expect(data.trim().replace(/\r\n/g, "\n")).toEqual(expectedR.trim());
      }
    });
  });
});
