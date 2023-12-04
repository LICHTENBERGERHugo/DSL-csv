table <- read.csv("./src/test/comparison/delete-test/data.csv", stringsAsFactors = FALSE)
table <- table[,!names(table) %in% c("name","department")]
write.csv(table, "./src/test/comparison/delete-test/R-delete.csv", row.names=FALSE, quote=FALSE)
