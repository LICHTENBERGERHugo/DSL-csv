## DSL with LLM 



### Methode
To Generate code with LLM, I have provided the chat bot with 2 messages : a context and an input 

+ **The context** includes one sample th3 code and its corresponding output in R and Python. This could be considered as one-shot inference with ChatGPT.

+ **The input** includes the code in th3 along with which language to generate.

### Result 

The overall result is pretty impressive. However the format of the output is sometimes not desirable. Please find the example below.

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

As you can see, the format of result can sometimes be inconsistant as the output R code includes text for further explanation.