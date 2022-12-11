const headlengthPercentil = require("../data/headlength-percentile");
const headlengthStandard = require("../data/headlength-standard");
const heightStandard = require("../data/height-standard");
const weightStandard = require("../data/weight-standard");

function getWeightStandard(age, weight) {
  const { minusSD, median, plusSD} = weightStandard[age-1];
  if (weight < median) {
    return {
      median,
      SD: minusSD,
    }
  }
  return {
    median,
    SD: plusSD,
  }
};

function getHeightStandard(age, height) {
  const { minusSD, median, plusSD} = heightStandard[age-1];
  if (height < median) {
      return (height - median)/(median-minusSD);
  }
  return (height - median)/(minusSD + plusSD);

};

function getHeadlengthStandard({age, gender}) {
  return headlengthStandard[gender][age];
}

function getHeadlengthPercentile(ZScore) {
  if (ZScore < -3 ) {
    return 0.10;
  }
  if (ZScore > 3) {
    return 99.90;
  }
  let end = 3;
if (ZScore < 0) {
  end = 4;
}
let result = 100;
const firstDigit = ZScore.toString().substring(0, end);
const secondDigit = ZScore.toString().substring(end, end+1);

headlengthPercentil.forEach((percentile) => {
  if (percentile.Z == firstDigit) {
    result = percentile[secondDigit]
  }
});

return result;
}


module.exports = {
  getWeightStandard,
  getHeightStandard,
  getHeadlengthStandard,
  getHeadlengthPercentile,
}