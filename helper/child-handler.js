const { doc, getDoc, setDoc, updateDoc, deleteDoc } = require("firebase/firestore");
const database = require("./database");
const HealthStatus = require("./health-status");

async function setChild(childData) {
  const { age, height, weight, headLength } = childData;
  const healthStatus = new HealthStatus({ age, height, weight, headLength });
  const data = {
    healthStatus: {
      ...healthStatus.calculateGrowth(),
      development: {
        result: 'belum-dimuat',
        feedback: '',
        stimulation: '',
      },
    },
    ...childData,
  };
  
  const id = `c${+new Date()}`;

  const docRef = doc(database, "childs", id );
  try {
    await setDoc(docRef, data);

    const responseChildData = await getChild({id});

    return Promise.resolve({
      error: false,
      data: {id, ...responseChildData.data},
    });
  } catch (error) {
    return Promise.reject({
      error: true,
      message: error.message,
    });
  }
};

async function updateChild(id, childData) {
  const { age, height, weight, headLength } = childData;
  const healthStatus = new HealthStatus({ age, height, weight, headLength });
  const data = {
    healthStatus: {
      growth: healthStatus.calculateGrowth(),
      development: '',
    },
    ...childData,
  };
  

  const docRef = doc(database, "childs", id );
  try {
    await setDoc(docRef, data);

    const responseChildData = await getChild({id});

    return Promise.resolve({
      error: false,
      data: responseChildData.data,
    });
  } catch (error) {
    return Promise.reject({
      error: true,
      message: error.message,
    });
  }
};


async function updateChildDevelopment({id, developmentData}) {
  const { data:prevData } = await getChild({ id });
  const docRef = doc(database, "childs",  id);
  try {
    await updateDoc(docRef, {
      
      healthStatus: {
        ...prevData.healthStatus,
        development: { ...developmentData },
      }
    });
    
    return Promise.resolve({
      error: false
    });
  } catch (error) {
    return Promise.reject({
      error: true,
      message: error.message,
    });
  }
};


async function getChild({ id }) {
  const docRef = doc(database, "childs", id );
  try {
    const docSnap = await getDoc(docRef);
    if(!docSnap.exists()) {
      return Promise.reject({
        error: true,
        message: "id not found",
      });
    } 
    return Promise.resolve({
      error: false,
      data: docSnap.data(),
    });
  } catch (error) {
    return Promise.reject({
      error: true,
      message: error.message,
    });
  }
}

async function deleteChild({ id }) {
  const docRef = doc(database, "childs", id );
  try {
    await deleteDoc(docRef);
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

module.exports = { deleteChild, getChild, setChild, updateChild, updateChildDevelopment };