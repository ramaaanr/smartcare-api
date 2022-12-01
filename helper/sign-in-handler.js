const { signInWithEmailAndPassword } = require('firebase/auth');
const authentication = require('./authentication');


const signInHandler = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(authentication, email, password);
    authentication.signOut();
    return {
      error: false,
      data: {
        id: user.uid,
        email: user.email,
        username: user.displayName,
      }
    }
  } catch (error) {
    return {
      error: true,
      message: error.message,
    }
  }
}


module.exports = signInHandler;