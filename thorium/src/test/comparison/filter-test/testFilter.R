table <- read.csv("./src/test/comparison/filter-test/data.csv", stringsAsFactors = FALSE)
table <- subset(table, department == "INFO" & "age" >= 20)
write.csv(table, "./src/test/comparison/filter-test/R-filter.csv", row.names=FALSE, quote=FALSE)
