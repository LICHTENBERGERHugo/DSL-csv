table <- read.csv("./src/test/comparison/project-test/data.csv", stringsAsFactors = FALSE)
table <- table[,c("name","age")]
write.csv(table, "./src/test/comparison/project-test/R-project.csv", row.names=FALSE, quote=FALSE)
