const express = require('express');
const { getUser, updateUserChild, removeUserChild } = require('../helper/user-handler');

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

router.put('/add-child/:id', async (request, response) => {
  try {
    const userResponse = await updateUserChild({id: request.params.id, child: request.body.child});
    if (userResponse.error) {
      return response.json({
        error: true,
        status: 401,
        message: userResponse.message,
      })
    }
    return response.json({
      status: 200,
      message: "Update user child succesfully",
      data: userResponse.data,
    });
  } catch (error) {
      return response.json({
        error: true,
        status: 400,
        message: error.message,
      })}
});

router.put('/remove-child/:id', async (request, response) => {
  try {
    const userResponse = await removeUserChild({id: request.params.id, child: request.body.child});
    if (userResponse.error) {
      return response.json({
        error: true,
        status: 401,
        message: userResponse.message,
      })
    }
    return response.json({
      status: 200,
      message: "Remove user child succesfully",
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