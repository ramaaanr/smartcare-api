const HealthStatus = require("../helper/health-status")

describe('Growth Status Testing', () => {
  const healthCalc = new HealthStatus({ age: 5, weight: 8, height: 65, headLength: 45, gender: "laki-laki" });
  fit('headlength testing',() => {
    expect(healthCalc.calculateGrowth()).toEqual({
      weightPerAge: 'normal',
      heightPerAge: 'normal',
      headlengthPerAge: 'normal'
    })
  });
})