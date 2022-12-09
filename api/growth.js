const express = require('express');
const getGrowthFeedback = require('../helper/growth-feedback-handler');

const router = express.Router();

router.get('/:measurement/:status', async (request, response) => {
  const measurement = request.params.measurement;
  const status = request.params.status;
 
  try {
    const dataResponse = await getGrowthFeedback({measurement, status});
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
      message: "Get data Growth succesfully",
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