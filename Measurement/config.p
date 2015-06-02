set terminal png enhanced

set xlabel "Sending Frequency"
set ylabel "Milliseconds" 

set xrange [*:] reverse 
set yrange[0:]

plot \
"data.dat" using 1:3:4 with errorlines title "Latency Avg", \
"data.dat" using 1:5:6 with errorlines title "Visualization Avg"

