FILE = main.cpp
MAIN = main
CONFIG = config.p
CONFIG2 = config2.p
CONFIG3 = config3.p
CONFIG_TP = config_tp.p
CONFIG_TP_2 = config_tp_2.p
CONFIG_TP_3 = config_tp_3.p
RESULT = result.png
filenames = data_100PL \
			data_100PL_alle_F \
			data_10PL_alle_F \
			data_1PL_alle_F \
			data_25PL_alle_F \
			data_50PL_alle_F \
			data_5PL_alle_F 
filenames2= data_F_10_alle_PL \
			data_F_125_alle_PL \
			data_F_250_alle_PL \
			data_F_500_alle_PL \
			data_F_50_alle_PL \
			data_F_5_alle_PL
filenames3= data_10_clients \
			data_2_clients \
			data_3_clients \
			data_5_clients
throughput = data_polyline_tp
throughput2 = data_frequencies_tp
throughput3 = data_clients_tp



all: build run

run: 
	./$(MAIN)

build: $(FILES)
	g++ --std=c++14 -O3 -Wall -Wextra -Werror -Weffc++ -o $(MAIN) $(FILE)


plot: 
	for file in $(filenames) ; do \
		gnuplot -e "file='$$file.dat'" $(CONFIG) > $$file".png" ; \
	done
	for file in $(filenames2) ; do \
		gnuplot -e "file='$$file.dat'" $(CONFIG2) > $$file".png" ; \
	done
	for file in $(filenames3) ; do \
		gnuplot -e "file='$$file.dat'" $(CONFIG3) > $$file".png" ; \
	done
	for file in $(throughput) ; do \
		gnuplot -e "file='$$file.dat'" $(CONFIG_TP) > $$file".png" ; \
	done
	for file in $(throughput2) ; do \
		gnuplot -e "file='$$file.dat'" $(CONFIG_TP_2) > $$file".png" ; \
	done
	for file in $(throughput3) ; do \
		gnuplot -e "file='$$file.dat'" $(CONFIG_TP_3) > $$file".png" ; \
	done

clean:
	