csv1 <- "data.csv"
table <- read.csv(csv1, stringsAsFactors = FALSE)
table <- data.frame(list(name = table[,c("name")]))
table <- table[,c("name","age")]
write.csv(table, "data2.csv", row.names=FALSE, quote=FALSE)