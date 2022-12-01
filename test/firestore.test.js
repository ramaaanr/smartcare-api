const { initializeApp } = require('firebase/app');
const { doc , getFirestore, getDocs, collection, getDoc, setDoc } = require('firebase/firestore');
const firebaseConfig = require('../config/firebase-config');

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

async function getAllData() {
  const data = await getDocs(collection(db, "users"));
  const users = data.docs.map((doc) => ({...doc.data()}));
  console.log(users);
};

async function getData() {
  const docRef = doc(db, "users", "tester1");
  try {
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
        console.log(docSnap.data());
    } else {
        console.log("Document does not exist")
    }

  } catch(error) {
    console.log(error)
  }
};

async function setData() {
  const data = {
    child: [],
    username: 'tester123',
    email: 'testerupdate@gmail.com',
  };

  const docRef = doc(db, "users", "tester3" );

  try {
    await setDoc(docRef, data);
    console.log("document has been added succesfully");
  } catch (error) {
    console.log(error);
  }
}

setData();