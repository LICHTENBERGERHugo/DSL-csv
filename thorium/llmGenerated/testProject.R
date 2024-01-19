csv <- "data.csv"
table <- read.csv(csv, stringsAsFactors = FALSE)
table <- table[,c("name")]
table <- table[,c("name","age")]
write.csv(table, "data2.csv", row.names=FALSE, quote=FALSE)