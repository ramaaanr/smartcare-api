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
        status = "sangat-kurus";
      } else if (ZScore > -3 && ZScore < -2) {
        status = "kurus";
      } else if (ZScore > -2 && ZScore < 2) {
        status = "normal";
      } else {
        status = "gemuk";
      }
      return status;
    }

    const heigtPerAge = () => {
      let status='';
      const ZScore = (this._height - 88.0)/(88.0-84.09);
      if (ZScore <-3) {
        status = "sangat-pendek";
      } else if (ZScore > -3 && ZScore < -2) {
        status = "pendek";
      } else if (ZScore > -2 && ZScore < 2) {
        status = "normal";
      } else {
        status = "tinggi";
      }
      return status;
    }

    const headlengthPerAge = () => {
      let status='';
      const ZScore = (this._headLength - 88.0)/(88.0-84.09);
      if (ZScore >= -2) {
        status = "makrosefali";
      } else if (ZScore > -2 && ZScore < 2) {
        status = "normal";
      } else {
        status = "mikrosefali";
      }
      return status;
    }



    return {
      "weightPerAge": weightPerAge(),
      "heightPerAge": heigtPerAge(),
      "headlengthPerAge": headlengthPerAge(),
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