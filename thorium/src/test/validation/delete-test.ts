import { describe, expect, test } from "vitest";
import { generatePython, generateR } from "../../cli/generator.js";
import * as fs from "node:fs";
import { assertModelNoErrors } from "../utils.js";

const th3Code = `
let csv = CSVFile("data.csv")
let table = Table(csv)

table.delete(2)
table.delete("age")
table.delete([1,2,3])
table.delete(["name","departement"])
`;

const expectedPython = `import pandas as pd
csv = "data.csv"
table = pd.read_csv(csv)
table = table.drop(2)
table = table.drop("age", axis=1)
table = table.drop([1,2,3])
table = table.drop(["name","departement"], axis=1)
`;
const expectedR = `csv <- "data.csv"
table <- read.csv(csv, stringsAsFactors = FALSE)
table <- table[-2,]
table <- table[,!names(table) %in% c("age")]
table <- table[-c(1,2,3),]
table <- table[,!names(table) %in% c("name","departement")]
`;

describe("Test delete", () => {
  test("correct python code", async () => {
    const model = await assertModelNoErrors(th3Code);
    const file = generatePython(model, "testDelete", undefined);

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
    const file = generateR(model, "testDelete", undefined);

    fs.readFile("./" + file, "utf8", function (err, data) {
      if (err) {
        console.log(err);
      } else {
        expect(data.trim().replace(/\r\n/g, "\n")).toEqual(expectedR.trim());
      }
    });
  });
});
