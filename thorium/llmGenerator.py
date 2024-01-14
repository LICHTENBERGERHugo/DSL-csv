from openai import OpenAI

lang = input("Enter the language: ")
lang = lang.upper()
code_path = input("Enter the code path: ")

# Open the file in read mode
with open(code_path, 'r') as file:
    # Read the entire content of the file into a string
    code_content = file.read()

client = OpenAI(
    api_key="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",
    organization="org-o8u8w5ooKoqOk6GUcMbYNO7O",
)

completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": """
     — CONTEXT —
    You are a domain specific language generator for our language TH3. The main functionality of our language is tabular data manipulation. Your role is to translate our program in TH3 to other languages such as python or R. 

    You may find below an example

    — EXAMPLES—
    >>> INPUT
    // Load the table 
    let csv = CSVFile("data.csv")
    let table = Table(csv)
    table.print()

    // Add row(s)
    table.add("pierre, 21, rennes,GMA")
    table.add(["serge,21,rennes,GMA", "paul, 22, paris,GMA", "herve, 23, lyon,INFO"])
    table.print()

    // Aggregation
    table.compute(SUM,"age")
    table.compute(COUNT,"age")

    // Modify a cell, a row
    table.modify(2,"Hugo,22,Lyon,INFO")
    table.modify(2,4,"GMA")
    table.modify(2,"age",40)
    table.print()

    // Filter according to a condition 
    table.filter([("department" == "INFO"), ("age" >= 20)])
    table.print()

    // Delete
    table.delete(2) // Delete 1 row 
    table.delete("department") // delete 1 column
    table.delete([2,3]) // delete rows
    table.print()

    // Project to a set of cols
    table.project("name")
    table.project(["name","age"])
    table.write("data2.csv")

    >>> OUTPUT IN PYTHON
    import pandas as pd
    csv = "data.csv"
    table = pd.read_csv(csv)
    print(table.to_string())
    values = "pierre, 21, rennes,GMA".split(",")
    new_row = pd.DataFrame([values],columns=table.columns)
    table = pd.concat([table,new_row], ignore_index=True)
    new_values = ["serge,21,rennes,GMA","paul, 22, paris,GMA","herve, 23, lyon,INFO"]
    for row in new_values:
        values = row.split(",")
        new_row = pd.DataFrame([values],columns=table.columns)
        table = pd.concat([table,new_row], ignore_index=True)
    print(table.to_string())
    table['age_SUM'] = table["age"].sum()
    table['age_COUNT'] = table.shape[0]
    table.loc[1] = ["Hugo",22,"Lyon","INFO"]
    table.iloc[1, 3] = "GMA"
    table.at[1, 'age'] = 40
    print(table.to_string())
    table = table[(table['department'] == "INFO") & (table['age'] >= 20)]
    print(table.to_string())
    table = table.drop(1)
    table = table.drop("department", axis=1)
    table = table.drop([1,2])
    print(table.to_string())
    table = table["name"]
    table = table[["name","age"]]
    table.to_csv("data2.csv",index=False)

    >>> OUTPUT IN R
    csv <- "data.csv"
    table <- read.csv(csv, stringsAsFactors = FALSE)
    print(table)
    table[nrow(table) + 1,] <- c("pierre",21," rennes","GMA")
    rows <- list(c("serge",21,"rennes","GMA"),c("paul",22," paris","GMA"),c("herve",23," lyon","INFO"))
    for (row in rows){
        table[nrow(table) + 1,] <- row
    }
    print(table)
    table <- cbind(table, age_SUM = rep(sum(table$age),length.out=length(table$age)))
    table <- cbind(table, age_COUNT = rep(length(table$age),length.out=length(table$age)))
    table[2,] <- c("Hugo",22,"Lyon","INFO")
    table[2, 4] <- "GMA"
    table[2, "age"] <- 40
    print(table)
    table <- subset(table, department == "INFO" & "age" >= 20)
    print(table)
    table <- table[-2,]
    table <- table[,!names(table) %in% c("department")]
    table <- table[-c(2,3),]
    print(table)
    table <- data.frame(list(name = table[,c("name")]))
    table <- table[,c("name","age")]
    write.csv(table, "data2.csv", row.names=FALSE, quote=FALSE)
     """},
    {"role": "user", "content": f"""
    PLEASE ONLY INCLUDE THE OUTPUT OF {lang} IN THE ANSWER IN TEXT

    — TH3 CODE TO TRANSLATE —
    {code_content}
    """}
  ]
)

print(completion.choices[0].message)

file_path = ""  # Replace with the desired path and filename
if lang == "PYTHON":
    file_path = "llmGeneratedCode.py"
if lang == "R":
    file_path = "llmGeneratedCode.R"
    
# Open the file in write mode
with open(file_path, 'w') as file:
    # Write the string to the file
    file.write(completion.choices[0].message.content)