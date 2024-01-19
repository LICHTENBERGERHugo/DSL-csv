csv <- "data.csv"
table <- read.csv(csv, stringsAsFactors = FALSE)
table <- subset(table, department == "INFO" & age >= 20)
table <- subset(table, department == "GPM")
table <- subset(table, city == "Lyon" & age >= 22)
write.csv(table, "data2.csv", row.names=FALSE, quote=FALSE)