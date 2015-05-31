var arithmetic_mean = function(data, elem) {
  var sumAM = 0.0;

  for(var i = 0; i < elem; i++) {
    sumAM = sumAM + data[i];
  }
  return sumAM / elem;
}


var corrected_sample_standard_deviation = function(data, elem) {
  var sumSD = 0.0;
  var arithMean = arithmetic_mean(data, elem);

  console.log(arithMean);

  for(var i = 0; i < elem; i++) {
    var difference = data[i] - arithMean;

    sumSD = sumSD + (difference * difference);
  }

  return Math.sqrt((1.0 / (elem-1) * sumSD));
}