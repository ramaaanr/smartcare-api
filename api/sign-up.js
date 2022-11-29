const express = require('express');
const router = express.Router();
const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');


const firebaseConfig = {
  apiKey: 'AIzaSyAGNFcaaxQvge7U4xf1p4HnDtLFhrFgzZE',
  authDomain: 'smartcare-3670b.firebaseapp.com',
  projectId: 'smartcare-3670b',
  storageBucket: 'smartcare-3670b.appspot.com',
  messagingSenderId: '528534664501',
  appId: '1:528534664501:web:937fa7e7047c5225e8c87c',
};

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