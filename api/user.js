const express = require('express');
const getUser = require('../helper/get-user');
const router = express.Router();

router.get('/:id', async (request, response) => {
  try {
    const userResponse = await getUser({id: request.params.id});
    if (userResponse.error) {
      return response.json({
        error: true,
        status: 401,
        message: userResponse.message,
      })
    }
    return response.json({
      status: 200,
      message: "Get user succesfully",
      data: userResponse.data,
    });
  } catch (error) {
      return response.json({
        error: true,
        status: 400,
        message: error.message,
      })}
  });

module.exports = router;