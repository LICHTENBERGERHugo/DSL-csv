csv <- "data.csv"
table <- read.csv(csv, stringsAsFactors = FALSE)
table[nrow(table) + 1,] <- c("pierre",21,"rennes","GMA")
rows <- list(c("serge",21,"rennes","GMA"),c("paul",22,"paris","GMA"),c("herve",23,"lyon","INFO"))
for (row in rows){
    table[nrow(table) + 1,] <- row
}
write.csv(table, "data2.csv", row.names=FALSE, quote=FALSE)