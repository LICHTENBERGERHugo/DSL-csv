csv1 <- "data.csv"
table1 <- read.csv(csv1, stringsAsFactors = FALSE)
csv2 <- csv1
table2 <- read.csv(csv2, stringsAsFactors = FALSE)
write.csv(table2, "data2.csv", row.names=FALSE, quote=FALSE)