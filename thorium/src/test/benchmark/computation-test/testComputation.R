table <- read.csv("./src/test/benchmark/computation-test/data.csv", stringsAsFactors = FALSE)
table <- cbind(table, age_SUM = rep(sum(table$age),length.out=length(table$age)))
table <- cbind(table, age_COUNT = rep(length(table$age),length.out=length(table$age)))
write.csv(table, "./src/test/benchmark/computation-test/R-computation.csv", row.names=FALSE, quote=FALSE)
