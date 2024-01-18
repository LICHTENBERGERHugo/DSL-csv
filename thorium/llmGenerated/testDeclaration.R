csv <- "data.csv"
table1 <- read.csv(csv, stringsAsFactors = FALSE)
table2 <- read.csv(csv, stringsAsFactors = FALSE)
write.csv(table2, "data2.csv", row.names=FALSE, quote=FALSE)