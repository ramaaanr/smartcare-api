const express = require('express');
const signInHandler = require('../helper/sign-in-handler');
const router = express.Router();

router.post('/', async (request, response) => {
  const { email, password } = request.body;
  if(!email || !password) {
    response.json({
      error: true,
      status: 403,
      message: "invalid input, email or password still empty"
    })
    return;
  }

  const signInResponse = await signInHandler(email, password);

  if (signInResponse.error) {
    response.json({
      error: true,
      status: 401,
      message: signInResponse.message
    })
    return;
  }

  response.json({
    error: false,
    status: 200,
    message: "Login to your account succesfully",
    data: signInResponse.data,
  })

  return;
});


module.exports = router;