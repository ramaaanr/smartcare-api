const { doc, getDoc, } = require("firebase/firestore");
const getAgeRange = require("./age-range");
const { updateChildDevelopment } = require("./child-handler");
const database = require("./database");
const feedback = require("./feedback");
const HealthStatus = require("./health-status");

async function getDevelopment({ageRange}) {
  const docRef = doc(database, "development", `${ageRange}`);
  try {
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
        return Promise.resolve({
          error: false,
          data: docSnap.data(),
        })
    } else {
        return Promise.reject({
          error: true,
          message: "Data doesn't exist",
        })
    }
  } catch(error) {
    return Promise.reject({
      error: true,
      message: error.message,
    })
  }
}

async function getDevelopmentSurvey({ age }) {
  const ageRange = getAgeRange(age);
  const docRef = doc(database, "development", `${ageRange}`);
  try {
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
        const {
          BICARA_DAN_BAHASA,
          SOSIALISASI_DAN_KEMANDIRIAN,
          GERAK_HALUS,
          GERAK_KASAR,
          key
        } = docSnap.data();

        const survey = {
          key,
          BICARA_DAN_BAHASA: BICARA_DAN_BAHASA.survey,
          SOSIALISASI_DAN_KEMANDIRIAN: SOSIALISASI_DAN_KEMANDIRIAN.survey,
          GERAK_HALUS: GERAK_HALUS.survey,
          GERAK_KASAR: GERAK_KASAR.survey,
        };

        return Promise.resolve({
          error: false,
          data: survey,
        })
    } else {
        return Promise.reject({
          error: true,
          message: "Data doesn't exist",
        })
    }
  } catch(error) {
    return Promise.reject({
      error: true,
      message: error.message,
    })
  }
}



async function setDevelopment({ id, age, answer }) {
  try {
    const healthStatus = new HealthStatus({age});
    const ageRange = getAgeRange(age)
    const dataDevelopmentPerAge = await getDevelopment({ ageRange })
    const key = dataDevelopmentPerAge.data.key;
    const developmentResult = healthStatus.calculateDevelopment({answer, key});
    let stimulationFeedback = {};
    developmentResult.stimulations.forEach(
      (value) => {
        const stimulationResult = {
          [value] : [
            ...dataDevelopmentPerAge.data[value].stimulasi
          ]
        }
        stimulationFeedback = {...stimulationFeedback, ...stimulationResult};
      }
    )

    const developmentData = {
      result: developmentResult.result,
      stimulation: stimulationFeedback,
      feedback: feedback[developmentResult.result]
    }

    const { error } = await updateChildDevelopment({id, developmentData})
    if (error) {
      return Promise.reject({
        error: true,
        message: "Error in Update data",
      })
    }
    return Promise.resolve({
      error: false,
      data: developmentData,
    })
  } catch (error) {
    return Promise.reject({
      error: true,
      message: error.message,
    });
  }
}

module.exports = {getDevelopment, getDevelopmentSurvey, setDevelopment};