csv1 <- "data.csv"
table1 <- read.csv(csv1, stringsAsFactors = FALSE)
table2 <- read.csv("data.csv", stringsAsFactors = FALSE)
csv2 <- csv1
write.csv(table2, "./src/test/integration/declaration/generated.csv", row.names=FALSE, quote=FALSE)
