        # OUTPUT IN R
        csv <- "data.csv"
        table <- read.csv(csv, stringsAsFactors = FALSE)
        table <- table[-2,]
        table <- table[,-which(names(table) %in% c("age"))]
        table <- table[-c(1,2,3),]
        write.csv(table, "data2.csv", row.names=FALSE, quote=FALSE)