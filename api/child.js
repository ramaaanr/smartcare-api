const express = require('express');
const { setChild, getChild, updateChild } = require('../helper/child-handler');

const router = express.Router();

router.get('/:id', async (request, response) => {
  try {
    const dataResponse = await getChild({id: request.params.id});
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
      message: "Get data child succesfully",
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

router.post('/', async (request, response) => {
  
  const dataResponse = await setChild(request.body);

  if (dataResponse.error) {
    response.json({
      error: true,
      status: 401,
      message: dataResponse.message
    })
    return;
  }

  response.json({
    error: false,
    status: 200,
    message: "Create your Child Profile succesfully",
    data: dataResponse.data
  })

  return;
});

router.put('/:id', async (request, response) => {
  
  const dataResponse = await updateChild(request.params.id, request.body);

  if (dataResponse.error) {
    response.json({
      error: true,
      status: 401,
      message: dataResponse.message
    })
    return;
  }

  response.json({
    error: false,
    status: 200,
    message: "Update your Child Profile succesfully",
    data: dataResponse.data
  })

  return;
});

module.exports = router;