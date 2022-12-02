const { doc, getDoc, } = require("firebase/firestore");
const database = require("./database");

async function getUser({ id }) {
  const docRef = doc(database, "users", id );
  try {
    const docSnap = await getDoc(docRef);
    if(!docSnap.exists()) {
      return Promise.reject({
        error: true,
        message: "id not found",
      });
    } 
    return Promise.resolve({
      error: false,
      data: docSnap.data(),
    });
  } catch (error) {
    return Promise.reject({
      error: true,
      message: error.message,
    });
  }
}

module.exports = getUser;