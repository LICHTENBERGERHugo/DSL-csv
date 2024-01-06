import { describe, expect, test } from "vitest";
import { generatePython } from "../../cli/generatePython.js";
import { generateR } from "../../cli/generateR.js";
import * as fs from "node:fs";
import { assertModelNoErrors } from "../utils.js";

const expectedPython = `import pandas as pd
table = pd.read_csv("data.csv")
table.loc[1] = ["Hugo",22,"Lyon","INFO"]
table.iloc[1, 3] = "GMA"
table.at[1, 'age'] = 40
`;
const th3Code = `
let table = Table(CSVFile("data.csv"))
table.modify(2,"Hugo,22,Lyon,INFO")
table.modify(2,4,"GMA")
table.modify(2,"age",40)`;
const expectedR = `table <- read.csv("data.csv", stringsAsFactors = FALSE)
table[2,] <- c("Hugo",22,"Lyon","INFO")
table[2, 4] <- "GMA"
table[2, "age"] <- 40
`;

describe("Test modif", () => {
  test("correct python code", async () => {
    const model = await assertModelNoErrors(th3Code);

    const file = generatePython(model, "testModif", undefined);

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
    const file = generateR(model, "testModif", undefined);

    fs.readFile("./" + file, "utf8", function (err, data) {
      if (err) {
        console.log(err);
      } else {
        expect(data.trim().replace(/\r\n/g, "\n")).toEqual(expectedR.trim());
      }
    });
  });
});
