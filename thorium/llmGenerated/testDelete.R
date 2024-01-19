csv <- "data.csv"
table <- read.csv(csv, stringsAsFactors = FALSE)
table <- table[-2,]

csv <- "data.csv"
table <- read.csv(csv, stringsAsFactors = FALSE)
table <- table[,!names(table) %in% c("age")]

csv <- "data.csv"
table <- read.csv(csv, stringsAsFactors = FALSE)
table <- table[-c(1,2,3),]

csv <- "data.csv"
table <- read.csv(csv, stringsAsFactors = FALSE)
table <- table[,!names(table) %in% c("name","department")]

write.csv(table, "data2.csv", row.names=FALSE, quote=FALSE)