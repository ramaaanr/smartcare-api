const HealthStatus = require("../helper/health-status")

describe('Growth Status Testing', () => {
  const healthCalc = new HealthStatus({ age: 2, weight: 4.3, height: 51, headLength: 40, gender: "laki-laki" });
  fit('headlength testing',() => {
    console.log(healthCalc.calculateGrowth());
  });
})