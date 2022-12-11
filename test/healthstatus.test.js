const HealthStatus = require("../helper/health-status")

describe('Growth Status Testing', () => {
  const healthCalc = new HealthStatus({ age: 5, weight: 8, height: 65, headLength: 43, gender: "laki-laki" });
  fit('headlength testing',() => {
    const data = healthCalc.calculateGrowth();
    console.log(data);
    expect(data).toEqual({
      weightPerAge: 'normal',
      heightPerAge: 'normal',
      headlengthPerAge: 'normal'
    })
  });
})