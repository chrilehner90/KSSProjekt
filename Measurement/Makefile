FILE = main.cpp
MAIN = main
CONFIG = config.p
RESULT = result.png

all: build run

run: 
	./$(MAIN)

build: $(FILES)
	g++ --std=c++14 -O3 -Wall -Wextra -Werror -Weffc++ -o $(MAIN) $(FILE)


plot: 
	gnuplot $(CONFIG) > $(RESULT)

clean:
	