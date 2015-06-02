set terminal png enhanced

set xlabel "Interval between sending in ms"
set ylabel "Throughput 1 = 100%" 

set key left bottom

set xrange [*:] reverse
set yrange[0:1.05]

plot \
file using 1:2:3 with errorlines title "1", \
file using 1:4:5 with errorlines title "5", \
file using 1:6:7 with errorlines title "10", \
file using 1:8:9 with errorlines title "25", \
file using 1:10:11 with errorlines title "50", \
file using 1:12:13 with errorlines title "100"

