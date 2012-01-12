data  = read.delim("alldata.out", sep='\t')

php <- subset(data, lang=="php")
node <- subset(data, lang=="node")

even <- subset(data, concurrency % 200 == 0)

library(ggplot2)

labs = c("node 100 Concurrent", "node 200 Concurrent", "node 300 Concurrent", "node 400 Concurrent", "node 500 Concurrent", "node 600 Concurrent", "node 700 Concurrent", "node 800 Concurrent", "node 900 Concurrent", "node 1000 Concurrent", "php 100 Concurrent", "php 200 Concurrent", "php 300 Concurrent", "php 400 Concurrent", "php 500 Concurrent", "php 600 Concurrent", "php 700 Concurrent", "php 800 Concurrent", "php 900 Concurrent", "php 1000 Concurrent")
levels(data$label) <- labs
data$labels <- factor(data$labels, levels = labs)

png("combined.png", width=1600, height=1200)
qplot(index, ttime, data=data, group=label, color=lang, log="y")
dev.off()

png("faceted.png", width=1200, height=1600)
qplot(index, ttime, data=data, group=label, color=lang, facets= concurrency ~ ., log="y")
dev.off()

png("chopped.png", width=1600, height=1200)
qplot(index, ttime, data=data, group=label, color=lang, log="y",xlim=c(8000,10000))
dev.off()

png("chopped_faceted.png", width=1200, height=1600)
qplot(index, ttime, data=data, group=label, color=lang, facets= concurrency ~ ., log="y",xlim=c(8000,10000))
dev.off()