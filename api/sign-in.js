const express = require('express');
const router = express.Router();
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const firebaseConfig = require('../config/firebase-config');

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

router.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    response.json({
      error: false,
      status: 200,
      message: "Login to Account Succesfully",
      data: {
        id: user.uid,
      },
    });
  } catch (error) {
    response.json({
      error: true,
      status: 401,
      message: error.message
    });
  }
});

module.exports = router;