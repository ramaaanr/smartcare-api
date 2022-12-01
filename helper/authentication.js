const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');
const firebaseConfig = require('../config/firebase-config');

const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);


module.exports = authentication;
