csv <- "data.csv"
table <- read.csv(csv, stringsAsFactors = FALSE)
write.csv(table, "./generated.csv", row.names=FALSE, quote=FALSE)