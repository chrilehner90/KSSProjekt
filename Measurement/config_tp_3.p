set terminal png enhanced

set xlabel "Interval between sending in ms"
set ylabel "Throughput 1 = 100%" 

set key left bottom

set xrange [*:] reverse
set yrange[0:1.05]

plot \
file using 1:2:3 with errorlines title "1", \
file using 1:4:5 with errorlines title "2", \
file using 1:6:7 with errorlines title "5"

