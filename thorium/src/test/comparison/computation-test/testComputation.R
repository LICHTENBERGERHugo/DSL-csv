table <- read.csv("./src/test/comparison/computation-test/data.csv", stringsAsFactors = FALSE)
table <- cbind(table, age_SUM = rep(sum(table$age),length.out=length(table$age)))
table <- cbind(table, age_COUNT = rep(length(table$age),length.out=length(table$age)))
write.csv(table, "./src/test/comparison/computation-test/R-computation.csv", row.names=FALSE, quote=FALSE)
