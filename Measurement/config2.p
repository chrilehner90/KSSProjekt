set terminal png enhanced

set xlabel "Plotted Polylines"
set ylabel "Milliseconds" 

set yrange[0:250]

plot \
file using 1:3:4 with errorlines title "Latency Avg", \
file using 1:5:6 with errorlines title "Visualization Avg"

