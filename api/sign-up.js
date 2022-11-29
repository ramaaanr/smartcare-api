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
      status: 200,
      message: "Post Data has successfully",
    });
  } catch (error) {
    console.error(error);
    return response.status(500).send("server error");
  }
});

module.exports = router;