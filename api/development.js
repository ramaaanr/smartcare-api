const express = require('express');
const { getDevelopmentSurvey, setDevelopment } = require('../helper/development-handler');

const router = express.Router();

router.get('/:id/:age', async (request, response) => {
  const age = request.params.age;
  try {
    const dataResponse = await getDevelopmentSurvey({age});
    if (dataResponse.error) {
      return response.json({
        error: true,
        status: 401,
        message: dataResponse.message,
      });
    }
    return response.json({
      error: false,
      status: 200,
      message: "Get data survey succesfully",
      data: dataResponse.data,
    });
  } catch (error) {
      return response.json({
        error: true,
        status: 400,
        message: error.message,
      });
  }
});


router.post('/:id', async (request, response) => {
  const id = request.params.id;
  const { age, answer } = request.body;
  try {
    const dataResponse = await setDevelopment({id, age, answer});
    if (dataResponse.error) {
      return response.json({
        error: true,
        status: 401,
        message: dataResponse.message,
      });
    }
    return response.json({
      error: false,
      status: 200,
      message: "Get data survey succesfully",
      data: dataResponse.data,
    });
  } catch (error) {
      return response.json({
        error: true,
        status: 400,
        message: error.message,
      });
  }
});

module.exports = router;