csv <- "data.csv"
table <- read.csv(csv, stringsAsFactors = FALSE)
print(table)
table[nrow(table) + 1,] <- c("pierre",21," rennes","GMA")
rows <- list(c("serge",21,"rennes","GMA"),c("paul",22," paris","GMA"),c("herve",23," lyon","INFO"))
for (row in rows){
    table[nrow(table) + 1,] <- row
}
print(table)
table2 <- subset(table, department == "GMA")
table2 <- table2[,c("name","age")]
print(table2)
table[2, 4] <- "GPM"
table <- table[-7,]
print(table)
write.csv(table, "data2.csv", row.names=FALSE, quote=FALSE)