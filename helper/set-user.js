const { doc, setDoc, } = require("firebase/firestore");
const database = require("./database");

async function setUser({ id, username, email }) {
  const data = {
    child: [],
    username,
    email,
  };

  const docRef = doc(database, "users", id );
  try {
    await setDoc(docRef, data);
    
    return Promise.resolve({
      error: false
    });
  } catch (error) {
    return Promise.reject({
      error: true,
      message: error.message,
    });
  }
}

module.exports = setUser