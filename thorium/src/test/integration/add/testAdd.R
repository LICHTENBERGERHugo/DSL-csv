csv <- "data.csv"
table <- read.csv(csv, stringsAsFactors = FALSE)
table[nrow(table) + 1,] <- c("pierre",21,"Rennes","GMA")
rows <- list(c("serge",21,"Rennes","GMA"),c("paul",22,"Paris","GMA"),c("herve",23,"Lyon","INFO"))
for (row in rows){
	table[nrow(table) + 1,] <- row
}
write.csv(table, "./src/test/integration/add/generated.csv", row.names=FALSE, quote=FALSE)
