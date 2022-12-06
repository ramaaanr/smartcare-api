const { getDoc, doc } = require("firebase/firestore");
const database = require("./database");

async function getGrowthFeedback({ measurement, status }) {
  const docRef = doc(database, "growth", measurement );
  try {
    const docSnap = await getDoc(docRef);
    if(!docSnap.exists() || !docSnap.data()[status]) {
      return Promise.reject({
        error: true,
        message: "result not found",
      });
    }
    
    return Promise.resolve({
      error: false,
      data: docSnap.data()[status],
    });
  } catch (error) {
    return Promise.reject({
      error: true,
      message: error.message,
    });
  }
}

module.exports = getGrowthFeedback;