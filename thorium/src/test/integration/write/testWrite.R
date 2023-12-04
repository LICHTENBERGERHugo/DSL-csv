csv <- "data.csv"
table <- read.csv(csv, stringsAsFactors = FALSE)
write.csv(table, "./src/test/integration/write/generated.csv", row.names=FALSE, quote=FALSE)
