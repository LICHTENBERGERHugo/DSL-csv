table <- read.csv("./src/test/benchmark/modif-test/data.csv", stringsAsFactors = FALSE)
table[2, "age"] <- 40
write.csv(table, "./src/test/benchmark/modif-test/R-modif.csv", row.names=FALSE, quote=FALSE)
