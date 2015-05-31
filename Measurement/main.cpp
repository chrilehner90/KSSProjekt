// KSS2 Milestone 3

#include <iostream>
#include <string>
#include <fstream>
#include <ctime>
#include <cmath>
#include <cctype>


using namespace std;

/***
 *  calculate mean and sd
***/

template<typename T>
double arithmetic_mean(T* data, uint32_t elem) {
  double sum = 0.0;

  for (uint32_t i = 0; i < elem; ++i) {
    sum += data[i];
  }

  return sum / static_cast<double>(elem);
}


template<typename T>
double corrected_sample_standard_deviation(T* data, uint32_t elem) {
  double sum = 0.0;
  double arithMean = arithmetic_mean(data, elem);

  for (uint32_t i = 0; i < elem; ++i) {
    double difference = data[i]-arithMean;
    sum += difference * difference;
  } 

  return sqrt((1.0 / static_cast<double>(elem-1)) * sum);
}


int main() {

    /*
    FILE *f;
    f = fopen("../Data/results.dat", "w");
    */

    int repititions = 5;
    

    //clock_t begin;
    //clock_t end;

        

        // measure time for computing KMP and Naive with search-string lengths from 10 to 100
        for(int clients = 2; clients <= 2; clients += 10)
        {

            // calculate the runtime for 5 repititions
            for(int j = 0; j < repititions; j++)
            {

                for(int x = 0; x < clients; x++)
                {
                    /*string filePath = "http://localhost:3000";
                    string command = "open " + filePath;
                    system(command.c_str());
                    */
                }


                /*begin = clock();
                KMP_Search(searchText, searchString);
                end = clock();

                neededTimeKMP = neededTimeKMP + (double(end - begin) / CLOCKS_PER_SEC);

                begin = clock();
                Naive_Search(searchText, searchString);
                end = clock();

                neededTimeNaive = neededTimeNaive + (double(end - begin) / CLOCKS_PER_SEC);
                */
            }
/*
            // save the results in a file
            fprintf(f, "lst\t%d", (int)searchString.length());
            fprintf(f, "\tt_KMP\t%f", (neededTimeKMP / repititions));
            fprintf(f, "\tt_Naive\t%f", (neededTimeNaive / repititions));
            fprintf(f, "\tcount_KMP\t%f", countKMP);
            fprintf(f, "\tcount_Naive\t%f\n", countNaive);

            neededTimeKMP = 0;
            neededTimeNaive = 0;
            */
        }

        //cout << arithmetic_mean(samplesIterativ, repititions) << endl;
        //cout << corrected_sample_standard_deviation(samplesIterativ, repititions) << endl;

        //fclose(f);
    
    return 0;
}