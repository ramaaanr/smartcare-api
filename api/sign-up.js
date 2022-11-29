const express = require('express');
const router = express.Router();
const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const firebaseConfig = require('../config/firebase-config');

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

router.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;
    await createUserWithEmailAndPassword(auth, email, password);
    response.json({
      error: false,
      status: 200,
      message: "Register Account Succesfully",
    });
    auth.signOut();
  } catch (error) {
    response.json({
      error: true,
      status: 401,
      message: error.message
    });
  }
});

module.exports = router;