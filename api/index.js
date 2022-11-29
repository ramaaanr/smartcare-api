const express = require('express');
const router = express.Router();

router.get('/', async (request, response) => {
  try {
    response.json({
      status: 200,
      message: "Get Data has successfully",
    });
  } catch (error) {
    console.error(error);
    return response.status(500).send("server error");
  }
});

module.exports = router;