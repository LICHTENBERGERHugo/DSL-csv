table <- read.csv("data.csv")
table[2,] <- c("Hugo",22,"Lyon","INFO")
table[2, 4] <- "GMA"
table[2, "age"] <- 40
write.csv(table, "./src/test/integration/modif/generated.csv", row.names=FALSE, quote=FALSE)
