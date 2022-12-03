class HealthStatus {
  constructor({ age, weight, height, headLength }) {
    this._age = age;
    this._weight = weight;
    this._height = height;
    this._headLength = headLength;
  };

  calculateGrowth() {
  if (this._age <= 60) {
    const weightPerAge = () => {
      let status='';
      const ZScore = (this._weight - 12.4)/(12.4-11.0);
      if (ZScore <-3) {
        status = "Gizi Buruk";
      } else if (ZScore > -3 && ZScore < -2) {
        status = "Gizi Kurang";
      } else if (ZScore > -2 && ZScore < 2) {
        status = "Gizi Baik";
      } else {
        status = "Gizi Lebih";
      }
      return status;
    }

    const heigtPerAge = () => {
      let status='';
      const ZScore = (this._height - 88.0)/(88.0-84.09);
      if (ZScore <-3) {
        status = "Sangat Pendek";
      } else if (ZScore > -3 && ZScore < -2) {
        status = "Pendek";
      } else if (ZScore > -2 && ZScore < 2) {
        status = "Normal";
      } else {
        status = "Tinggi";
      }
      return status;
    }

    const weightPerHeight = () => {
      let status='';
      const ZScore = (this._weight - 9.7)/(9.7 - 9.0);
      if (ZScore <-3) {
        status = "Sangat Kurus";
      } else if (ZScore > -3 && ZScore < -2) {
        status = "Kurus";
      } else if (ZScore > -2 && ZScore < 2) {
        status = "Normal";
      } else {
        status = "Gemuk";
      }
      return status;
    }

    const bodyMassIndex = () => {
      let status='';
      const BMI = this._weight/(this._height * this._height);
      const ZScore = (BMI - 16.0)/(16.0 - 14.8);
      if (ZScore <-3) {
        status = "Sangat Kurus";
      } else if (ZScore > -3 && ZScore < -2) {
        status = "Kurus";
      } else if (ZScore > -2 && ZScore < 2) {
        status = "Normal";
      } else {
        status = "Gemuk";
      }
      return status;
    }

    return {
      "BB/U": weightPerAge(),
      "PB/U": heigtPerAge(),
      "BB/PB": weightPerHeight(),
      "IMT": bodyMassIndex(),
    }
  } else {
    const BMI = this._weight/(this._height * this._height);
    let status = '';
    if (BMI < 17.0) {
      status = "Kekurangan berat badan tingkat berat";
    } else if (BMI >= 17.0 && BMI <= 18.4) {
      status = "Kekurangan berat badan tingkat ringan";
    } else if (BMI >= 18.25 && BMI <= 25.0) {
      status = "Normal";
    } else if (BMI >= 25.10 && BMI <= 27.0) {
      status = "Kelebihan berat badan tingkat ringan";
    } else {
      status = "Kelebihan berat badan tingkat berat";
    }
    return {
      "IMT": status,
    }
  }
}
}

module.exports = HealthStatus;