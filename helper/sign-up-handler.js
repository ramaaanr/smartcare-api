const { createUserWithEmailAndPassword, updateProfile } = require('firebase/auth');
const authentication = require('./authentication');
const setUser = require('./set-user');


const signUpHandler = async (username, email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(authentication, email, password);
    await updateProfile(authentication.currentUser, {
      displayName: username,
    });
    const { error } = await setUser({
      id: user.uid,
      username,
      email,
    })
    if (error) {
      return Promise.reject({
        error: true,
        message: error.message,
      });
    }
    authentication.signOut();
    return Promise.resolve({
      error: false,
    });
  } catch (error) {
    return Promise.reject({
      error: true,
      message: error.message,
    });
  }
}


module.exports = signUpHandler;