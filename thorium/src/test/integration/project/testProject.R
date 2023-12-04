csv <- "data.csv"
table <- read.csv(csv, stringsAsFactors = FALSE)
table <- table[,c("name","age")]
write.csv(table, "./src/test/integration/project/generated.csv", row.names=FALSE, quote=FALSE)
