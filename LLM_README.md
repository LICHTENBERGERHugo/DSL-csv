## DSL with LLM 

### Getting started 

We must installed the openai api and dot env first by excuting the following command : 

    pip install openai
    pip install python-dotenv

Please enter your a your OpenAI API key in the **./thorium/.env** files :

    # Example 
    OPENAI_API_KEY = sk-xxx

Run the following command to generate a code in a language of your choice from a th3 code with the following keyword  **PYTHON, R, JAVASCRIPT, JULIA, JAVA, C, C++, GO, RUST, RUBY**:

    python ./thorium/myLlmGenerator.py <output_language> <path_to_th3_code>

You can find some demo in the **./thorium/llmGenerated** folder which contains the generated code in R and Python for TH3 code in **./thorium/test-cases**.

### Methode
Initally, I have tried to generate the output code only with the input th3 code and a question. The output code wasn't correct at all and the output includes a lot of explanation in text while we aim to generate pure code.

I then tried to include some sample code of some functionalities (Adding rows) in the prompt in addition to the input. I was hoping the LLM to understand the whole logic of the TH3 language with examples of a few functionalities, however the outputs for other functionality without comprehensive example was incorrect.

Then, I had to write an example which include every functionality  of the TH3 language along with detailed comments in the prompt. The output seems to be more promising, but there were still some format problem in the answer. please find the example below : 

**INPUT (in our DSL th3)**

``` 
let csv = CSVFile("data.csv")
let table = Table(csv)

table.filter([("department" == "INFO"), ("age" >= 20)])

table.filter("department" == "GPM")

table.filter([("city" == "Lyon"), ("age" >= 22)])

table.write("data2.csv")
```

**OUTPUT in Python**
``` 
let csv = CSVFile("data.csv")
let table = Table(csv)

table.filter([("department" == "INFO"), ("age" >= 20)])

table.filter("department" == "GPM")

table.filter([("city" == "Lyon"), ("age" >= 22)])

table.write("data2.csv")

```

**OUTPUT in R**

    The translated code in R would be:

    ```
    csv <- "data.csv"
    table <- read.csv(csv, stringsAsFactors = FALSE)

    table <- subset(table, department == "INFO" & age >= 20)

    table <- subset(table, department == "GPM")

    table <- subset(table, city == "Lyon" & age >= 22)

    write.csv(table, "data2.csv", row.names = FALSE, quote = FALSE)
    ```

    This code loads the CSV file into a table, filters the table based on different conditions, and then writes the filtered table to a new CSV file.

At the end, I have included a more comprehensive sample code with all the functionality in the prompt, the quality of the code was well improved in term of semantics. However, the generated code is only excutable and correct a few time.

To generate code with LLM, I have provided the chat bot with 2 prompts : a context and an input 

+ **The context** includes one sample th3 code and its corresponding output in R and Python. This could be considered as one-shot inference with ChatGPT.

+ **The input** includes the code in th3 along with which language to generate.

### Result 
The overall result is not impressive, the Python code generated seems to be more correct than the one in R. I think by including more comprehensive examples and fine tuning the model would achieve more accurate results. 

