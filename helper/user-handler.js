const { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove} = require("firebase/firestore");
const database = require("./database");

async function setUser({ id, username, email }) {
  const data = {
    childs: [],
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

async function updateUserChild({ id, child }) {

  const docRef = doc(database, "users",  id);
  try {
    await updateDoc(docRef, {
      childs: arrayUnion(...child),
    });
    
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
async function removeUserChild({ id, child }) {

  const docRef = doc(database, "users",  id);
  try {
    await updateDoc(docRef, {
      childs: arrayRemove(...child),
    });
    
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


module.exports = {setUser, getUser, updateUserChild, removeUserChild}