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


// measure time for x clients
double testForXClients(int n) {

    string filePath = "http://localhost:3000";
    string command = "open " + filePath;

    auto start = chrono::high_resolution_clock::now();    
    
    for(int x = 0; x < n; x++)
    {
        system(command.c_str());
    }

    double time_in_microseconds = std::chrono::duration_cast<std::chrono::microseconds>(std::chrono::high_resolution_clock::now() - start).count();

    return time_in_microseconds;
}


int main() {

    /*
    FILE *f;
    f = fopen("../Data/results.dat", "w");
    */

    int repititions = 5;

    double samplesTest[repititions];
        

        // measure time for 
        for(int clients = 2; clients <= 2; clients += 10)
        {

            // calculate the runtime for 5 repititions
            for(int j = 0; j < repititions; j++)
            {
                    double test = testForXClients(clients);
                    samplesTest[j] = test; 
            }
/*
            // save the results in a file
            fprintf(f, "clients\t%d", clients);
            fprintf(f, "\mean\t%d", arithmetic_mean(samplesIterativ, repititions));
            fprintf(f, "\sd\t%f", corrected_sample_standard_deviation(samplesIterativ, repititions));

            */
        }

        cout << arithmetic_mean(samplesTest, repititions) << endl;
        //cout << corrected_sample_standard_deviation(samplesIterativ, repititions) << endl;

        //fclose(f);
    
    return 0;
}