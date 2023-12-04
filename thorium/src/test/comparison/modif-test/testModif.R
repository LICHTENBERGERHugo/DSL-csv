table <- read.csv("./src/test/comparison/modif-test/data.csv", stringsAsFactors = FALSE)
table[2, 3] <- "GMA"
write.csv(table, "./src/test/comparison/modif-test/R-modif.csv", row.names=FALSE, quote=FALSE)
