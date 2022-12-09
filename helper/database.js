const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const firebaseConfig = require('../config/firebase-config');

const app = initializeApp(firebaseConfig);

const database = getFirestore(app);

module.exports = database;