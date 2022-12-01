const express = require('express');
const router = express.Router();
const signUpHandler = require('../helper/sign-up-handler');

router.post('/', async (request, response) => {
  const { username, email, password } = request.body;
  if(!email || !password || !username) {
    response.json({
      error: true,
      status: 403,
      message: "invalid input, email or password or username are still empty"
    })
    return;
  }

  const signUpResponse = await signUpHandler(username, email, password);

  if (signUpResponse.error) {
    response.json({
      error: true,
      status: 401,
      message: signUpResponse.message
    })
    return;
  }

  response.json({
    error: false,
    status: 200,
    message: "Create your account succesfully",
  })

  return;
});

module.exports = router;