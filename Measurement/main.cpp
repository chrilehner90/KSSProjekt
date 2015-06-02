// KSS2 Milestone 3

#include <iostream>
#include <string>
#include <fstream>
#include <ctime>
#include <cmath>
#include <cctype>


using namespace std;



// measure time for x clients
double testForXClients(int n) {

    string filePath = "http://localhost:3000";
    string command = "open " + filePath;
  
    
    for(int x = 0; x < n; x++)
    {
        system(command.c_str());
    }

    return 1.0;
}


int main() {

    /*
    FILE *f;
    f = fopen("../Data/results.dat", "w");
    */


    double test = testForXClients(3);


        cout << test << endl;
        //cout << corrected_sample_standard_deviation(samplesIterativ, repititions) << endl;

        //fclose(f);
    
    return 0;
}