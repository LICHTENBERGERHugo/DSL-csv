import { exec } from "child_process";

// take a file_path as input and return the result of the execution along with execution time and memory usage
export async function execGeneratedFile(
  file_path: string,
  language: "R" | "python"
): Promise<string> {
  let INTERPRETER = "python3"; // python version to use
  if (language === "R") {
    INTERPRETER = "Rscript";
  } else if (language === "python") {
    INTERPRETER = "python";
  }
  try {
    const result = await new Promise<string>((resolve, reject) => {
      const startTime = process.hrtime(); // Start measuring execution time
      exec(INTERPRETER + " " + file_path + "", (error, stdout, stderr) => {
        const endTime = process.hrtime(startTime); // Calculate execution time
        const executionTime = `${endTime[0]}s ${endTime[1] / 1000000}ms`; // Format execution time

        if (error) {
          console.log(`error: ${error.message}`);
          reject(`error: ${error.message}`);
        } else if (stderr) {
          console.log(`stderr: ${stderr}`);
          reject(`stderr: ${stderr}`);
        } else {
          console.log(`stdout: ${stdout}`);
          console.log(`Execution Time: ${executionTime}`);
          console.log(
            `Memory Consumption: ${
              process.memoryUsage().heapUsed / 1024 / 1024
            } MB`
          );
          resolve(stdout as string);
        }
      });
    });
    return result.trim();
  } catch (error) {
    console.log(error);
    return `Error: ${error}`;
  }
}
