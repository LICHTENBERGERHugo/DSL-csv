table <- read.csv("./src/test/benchmark/project-test/data.csv", stringsAsFactors = FALSE)
table <- table[,c("name","age")]
write.csv(table, "./src/test/benchmark/project-test/R-project.csv", row.names=FALSE, quote=FALSE)
