csv <- "data.csv"
table <- read.csv(csv, stringsAsFactors = FALSE)
table <- cbind(table, age_SUM = rep(sum(table$age),length.out=length(table$age)))
table <- cbind(table, age_COUNT = rep(length(table$age),length.out=length(table$age)))
write.csv(table, "./src/test/integration/compute/generated.csv", row.names=FALSE, quote=FALSE)
