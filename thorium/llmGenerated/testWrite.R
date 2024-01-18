The equivalent code in R would be:

```R
csv <- "data.csv"
table <- read.csv(csv, stringsAsFactors = FALSE)
write.csv(table, file = "./generated.csv", row.names = FALSE)
```

This code loads the CSV file "data.csv" and stores it in the variable `table`. Then, it writes the contents of `table` to a new CSV file called "generated.csv" in the current directory, with row names excluded.