table <- read.csv("data.csv", stringsAsFactors = FALSE)
table <- table[-2,]
table <- read.csv("data.csv", stringsAsFactors = FALSE)
table <- table[,!names(table) %in% c("age")]
table <- read.csv("data.csv", stringsAsFactors = FALSE)
table <- table[-c(1,2,3),]
table <- read.csv("data.csv", stringsAsFactors = FALSE)
table <- table[,!names(table) %in% c("name","department")]
write.csv(table, "./src/test/integration/delete/generated.csv", row.names=FALSE, quote=FALSE)
