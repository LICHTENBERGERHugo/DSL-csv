csv <- "./src/test/comparison/write-test/data.csv"
table <- read.csv(csv, stringsAsFactors = FALSE)
write.csv(table, "./src/test/comparison/write-test/R-write.csv", row.names=FALSE, quote=FALSE)
