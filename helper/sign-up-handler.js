const { createUserWithEmailAndPassword, updateProfile } = require('firebase/auth');
const authentication = require('./authentication');


const signUpHandler = async (username, email, password) => {
  try {
    await createUserWithEmailAndPassword(authentication, email, password);
    await updateProfile(authentication.currentUser, {
      displayName: username,
    });
    authentication.signOut();
    return {
      error: false,
    }
  } catch (error) {
    return {
      error: true,
      message: error.message,
    }
  }
}


module.exports = signUpHandler;