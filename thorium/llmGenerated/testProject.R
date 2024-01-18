The equivalent code in R would be:

```R
csv1 <- "data.csv"
table <- read.csv(csv1, stringsAsFactors = FALSE)

table <- table[, c("name")]
table <- table[, c("name", "age")]

write.csv(table, "data2.csv", row.names=FALSE, quote=FALSE)
```

This code loads the CSV file "data.csv" into a table, then performs the "project" operation to keep only the "name" column and the "name" and "age" columns. Finally, it writes the resulting table to "data2.csv".