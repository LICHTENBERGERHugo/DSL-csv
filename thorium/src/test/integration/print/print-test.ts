import { describe, expect, test } from "vitest";
import { execGeneratedFile } from "../../../cli/generator.js";
import { generateR } from "../../../cli/generateR.js";
import { generatePython } from "../../../cli/generatePython.js";
import { assertModelNoErrors } from "../../utils.js";

const th3Code = `
let csv = CSVFile("data.csv")
let table = Table(csv)
table.print()
`;

const expectedR = `     name age     city department
1    Hugo  21     Lyon       INFO
2    Theo  22      Gap        GPM
3  Arthur  22   Rennes       INFO
4    Jean  45    Paris         MA
5 Jacques  69 Toulouse       INFO
`;
const expectedPython = `      name  age      city department
0     Hugo   21      Lyon       INFO
1     Theo   22       Gap        GPM
2   Arthur   22    Rennes       INFO
3     Jean   45     Paris         MA
4  Jacques   69  Toulouse       INFO
`;
describe("Test-integration print", () => {
  test("python correct results", async () => {
    const model = await assertModelNoErrors(th3Code);

    await generatePython(model, "testPrint", "./src/test/integration/print/");

    const res = await execGeneratedFile(
      "./src/test/integration/print/testPrint.py",
      "python"
    );
    // console.log(res);
    // const match = res.match(/stdout:\n([\s\S]+)\nExecution Time:/);
    // if (match && match[1]) {
    //   const extractedStdout = match[1];
    //   console.log(extractedStdout);

    //   expect(extractedStdout).toBe(expectedPython);
    // }

    // expect(res.replace(/\r/g, "")).toBe(expectedPython.replace(/\r/g, ""));
    //expect(res.stdout.replace(/\r/g, "")).toBe(expectedPython.replace(/\r/g, ""));
    expect(res.stdout).toBe(expectedPython);

  });

  test("R correct results", async () => {
    const model = await assertModelNoErrors(th3Code);

    await generateR(model, "testPrint", "./src/test/integration/print/");

    const res = await execGeneratedFile(
      "./src/test/integration/print/testPrint.R",
      "R"
    );

    // expect(res.replace(/\r/g, "")).toBe(expectedR.replace(/\r/g, ""));
    // expect(res.stdout.replace(/\r/g, "")).toBe(expectedR.replace(/\r/g, ""));
    expect(res.stdout).toBe(expectedR);

  });
});
