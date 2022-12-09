class HealthStatus {
  constructor({ age, weight = 0, height = 0, headLength = 0 }) {
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
  calculateDevelopment({ answer, key }) {
    const keyDetail = [
      'BICARA_DAN_BAHASA',
      'GERAK_HALUS',
      'GERAK_KASAR',
      'SOSIALISASI_DAN_KEMANDIRIAN',
    ];
    let result;
    let point = 0;
    let stimulations = [];
    // const point = answer.reduce((prev, current) => prev + current, 0);
    answer.forEach((value, index) => {
      point += value;
      if(key[index]/2 >= value) {
        stimulations.push(keyDetail[index]);
      }
    });
    if (point > 8) {
      result = 'memuaskan';
    } else if (point > 6) {
      result = 'meragukan';
    } else {
      result = 'menyimpang';
    }
    return {
      result,
      stimulations,
    }
  }
}

module.exports = HealthStatus;