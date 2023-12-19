csv <- "data.csv"
table <- read.csv(csv, stringsAsFactors = FALSE)
sum(table$age)
length(table$age)
write.csv(table, "./src/test/integration/compute/generated.csv", row.names=FALSE, quote=FALSE)
