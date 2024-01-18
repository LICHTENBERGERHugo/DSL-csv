library(readr)

csv1 <- "data.csv"
table1 <- read_csv(csv1)

table2 <- read_csv(csv1)
csv2 <- csv1

write_csv(table2, "data2.csv")