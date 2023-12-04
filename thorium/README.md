# DSL Project for CSV File Processing

## Overview

The Thorium DSL Compiler project focuses on developing a specialized Domain Specific Language (DSL) tailored for efficient operations on CSV files. Inspired by the functionalities of Python Pandas and R, Thorium aims to streamline and simplify complex data manipulations commonly encountered in data analysis. The project involves the creation of a compiler that seamlessly translates Thorium scripts into Python or R code, optimizing execution for enhanced performance. Thorium's rich set of functions mirrors those of Python Pandas and R, providing users with a unified and familiar environment for data processing. Ultimately, this project seeks to empower data analysts by bridging the gap between Python and R, fostering collaboration and standardizing CSV data manipulation practices in the realm of data science.

## Supported Libraries and Languages

This project supports the following languages:

- R
- Python (Pandas)

The necessary libraries for each language are specified in the respective documentation.

## Abstract Syntax

![Class diagram (metamodel)](../diagram.svg)

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

This project uses Langium as the framework for creating domain-specific languages. Langium provides a powerful and extensible solution for DSL development.

We found that using Langium was a really interesting way to create a DSL. The presence of Typescript and the yo command to generate a clean folder structure and base project makes it beginner-friendly as all the members already had an experience with npm and Typescript. Comparing it to the previous experiences some of the members could have had with the DSL creation, it is much more simple, as most of the work is already done. It allows to put more focus on developing interesting model and grammar, and on making the language more reliable with test suits and deployment process.
Yet, the default Typescript configuration is sometimes a bit strict. Moreover, it often take way too much time to reload the project when modifying the grammar, particularly when writing tests and an implementation lacks something. Also, as it is still an ongoing project, the framework documentation can be incomplete,limited or not up-to-date at times, which makes it more difficult to solve a problem. For example, we found a problem that was solved in one of the earlier versions, and we really struggled to find that information.

Apart from that, we think that our usecase didn't make us use all of its possibilities such as the web part (editor or generator). And we didn't customize the CLI part, so we can't give any opinion about that part either.

## Usage of LLM in the Project

We tested and used different LLM to achieve this project. We mainly tried ChatGPT, Github Copilot and BingChat. We mainly used BingChat because it's based on GPT-4 whereas this ChatGPT feature was only allowed to premium users.

First, we didn't ask ChatGPT to generate our grammar or our metamodel because of its lack of knowledge about the Langium framework. It couldn't help us with the writing the .langium file, but it gave us some insights about what is usually included in the metamodel.
Then, we obviously could use it to generate Python and R files that performed simple actions on CSV files as it's a pretty standard question. It was also helpful when it came to generate test files, even if it wasn't always correct or sometimes was OS-dependent. Especially, validation tests were straightforward. To test the output of our Python files, it was more difficult. It required more context, and we found it was most of the time longer to write a prompt than to code the test. But Github Copilot did help with basic syntax in Typescript syntax, or added fluidity to the coding workflow.

All of it, really speed up the development process of our DSL, because usually simple and repetitive tasks that implied basic programmation skills could be handled with a simple prompt and sometimes a few correction steps.

---

Remember to tailor these sections according to the specific details of your project and provide links, concrete examples, and technical details in each section. Good luck with your project!
