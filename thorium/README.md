# DSL Project for CSV File Processing

## Introduction

Welcome to Thorium, the DSL project dedicated to CSV file processing. This Domain Specific Language has been developed to simplify and expedite the tabular data manipulation process, offering compilation to both R and the Pandas library in Python.

## Supported Libraries and Languages

This project supports the following languages:

- R
- Python (Pandas)

The necessary libraries for each language are specified in the respective documentation.

## Abstract Syntax

The DSL defines an abstract syntax that allows for an intuitive description of CSV file manipulation operations. Refer to the documentation for more details on the abstract syntax.

## Programs in Action

Explore the included program examples in the `examples/` directory to witness the DSL in action. These programs demonstrate various features such as CSV file reading, transformation operations, and compilation to R or Pandas.

## How to Run the Project

To run the project, follow these simple steps:

1. Clone the repository to your local machine.
2. Run the docker container associated with the project with `docker run`
3. Write `npm i` to install all the necessary dependencies to start the project.
4. Use `npm start` to kick-off the project and generate the AST of the language.

Then you can choose between different commands to perform various actions :

- `npm compile` to compile every test programs and see their results (use the `--file` option to compile only a specific file)
- `npm run test` to run all the tests of the language and verify everything is running well.
- `npm benchmark` to see which compiler performs best for a specific task or the default ones included in the project (R may be better at performing some tasks than Pandas)

## Assessment of Different Compilers

The project evaluates various compilers for code generation, including [mention the compilers used, for example, Babel for R and Python Compiler for Python]. Refer to the documentation for details on the performance and features of each compiler.

## Langium

This project uses Langium as the framework for creating domain-specific languages. Langium provides a powerful and extensible solution for DSL development. Refer to the Langium documentation for detailed information.

## Usage of LLM in the Project

The Language Model (LLM) integrated into this project enhances code understanding and generation. It provides intelligent suggestions during development using advanced language models.

---

Remember to tailor these sections according to the specific details of your project and provide links, concrete examples, and technical details in each section. Good luck with your project!
