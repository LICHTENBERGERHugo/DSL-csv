csv <- "./src/test/benchmark/write-test/data.csv"
table <- read.csv(csv, stringsAsFactors = FALSE)
write.csv(table, "./src/test/benchmark/write-test/R-write.csv", row.names=FALSE, quote=FALSE)
