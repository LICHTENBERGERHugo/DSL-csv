csv <- "data.csv"
table <- read.csv(csv, stringsAsFactors = FALSE)
print(table)
table[nrow(table) + 1,] <- c("pierre",21," rennes","GMA")
rows <- list(c("serge",21,"rennes","GMA"),c("paul",22," paris","GMA"),c("herve",23," lyon","INFO"))
for (row in rows){
    table[nrow(table) + 1,] <- row
}
print(table)
table <- cbind(table, age_SUM = rep(sum(table$age),length.out=length(table$age)))
table <- cbind(table, age_COUNT = rep(length(table$age),length.out=length(table$age)))
table[2,] <- c("Hugo",22,"Lyon","INFO")
table[2, 4] <- "GMA"
table[2, "age"] <- 40
print(table)
table <- subset(table, department == "INFO" & "age" >= 20)
print(table)
table <- table[-2,]
table <- table[,!names(table) %in% c("department")]
table <- table[-c(2,3),]
print(table)
table <- data.frame(list(name = table[,c("name")]))
table <- table[,c("name","age")]
write.csv(table, "data2.csv", row.names=FALSE, quote=FALSE)