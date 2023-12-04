csv <- "data.csv"
table <- read.csv(csv, stringsAsFactors = FALSE)
table <- filter(table, "department" == "INFO" & "age" >= 20)
table <- filter(table, "department" == "GPM")
table <- filter(table, "city" == "Lyon" & "age" >= 22)
write.csv(table, "./src/test/integration/filter/generated.csv", row.names=FALSE, quote=FALSE)
