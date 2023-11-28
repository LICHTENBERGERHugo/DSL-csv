import { describe, test,  } from "vitest";
import { execGeneratedFile } from "../../cli/generator.js";
//import { readFileSync } from "fs";

describe('Test-integration add', () => { 
    test('correct results', async () => {
        let res=await execGeneratedFile("./generated/testAdd.py","python")
        // Read the contents of the file using fs.readFileSync
        // const txt = readFileSync("dataAdd.txt", "utf-8");

        // expect(res).toBe(txt)
        console.log(res)
    })
 })