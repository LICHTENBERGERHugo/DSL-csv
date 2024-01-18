        — OUTPUT IN R —
        csv <- "data.csv"
table <- read.csv(csv, stringsAsFactors = FALSE)
table <- subset(table, select = -c(age_SUM, age_COUNT))
table$age_SUM <- sum(table$age)
table$age_COUNT <- length(table$age)
print(table)