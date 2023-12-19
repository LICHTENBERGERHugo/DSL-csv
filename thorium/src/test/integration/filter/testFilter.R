csv <- "data.csv"
table <- read.csv(csv, stringsAsFactors = FALSE)
table <- subset(table, department == "INFO" & "age" >= 20)
write.csv(table, "./src/test/integration/filter/generated.csv", row.names=FALSE, quote=FALSE)
