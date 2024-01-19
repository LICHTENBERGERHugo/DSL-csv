csv <- "data.csv"
table <- read.csv(csv, stringsAsFactors = FALSE)
table[2,] <- c("Hugo",22,"Lyon","INFO")
table[2, 4] <- "GMA"
table[2, "age"] <- 40
write.csv(table, "data2.csv", row.names=FALSE, quote=FALSE)