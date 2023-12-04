import { describe, expect, test } from "vitest";
import { generatePython, generateR } from "../../cli/generator.js";
import * as fs from "node:fs";
import { assertModelNoErrors } from "../utils.js";

const expectedPython = `import pandas as pd
csv = "data.csv"
table = pd.read_csv(csv)
values = "pierre, 21, rennes,GMA".split(",")
new_row = pd.DataFrame([values],columns=table.columns)
table = pd.concat([table,new_row], ignore_index=True)
new_values = ["serge,21,rennes,GMA","paul, 22, paris,GMA","herve, 23, lyon,INFO"]
for row in new_values:
	values = row.split(",")
	new_row = pd.DataFrame([values],columns=table.columns)
	table = pd.concat([table,new_row], ignore_index=True)
`;
const th3Code = `
let csv = CSVFile("data.csv")
let table = Table(csv)

table.add("pierre, 21, rennes,GMA")
table.add(["serge,21,rennes,GMA", "paul, 22, paris,GMA", "herve, 23, lyon,INFO"])`;
const expectedR = `csv <- "data.csv"
table <- read.csv(csv, stringsAsFactors = FALSE)
table[nrow(table) + 1,] <- c("pierre",21," rennes","GMA")
rows <- list(c("serge",21,"rennes","GMA"),c("paul",22," paris","GMA"),c("herve",23," lyon","INFO"))
for (row in rows){
	table[nrow(table) + 1,] <- row
}
`;

describe("Test add", () => {
  test("correct python code", async () => {
    const model = await assertModelNoErrors(th3Code);

    const file = generatePython(model, "testAdd", undefined);

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
    const file = generateR(model, "testAdd", undefined);

    fs.readFile("./" + file, "utf8", function (err, data) {
      if (err) {
        console.log(err);
      } else {
        expect(data.trim().replace(/\r\n/g, "\n")).toEqual(expectedR.trim());
      }
    });
  });
});
