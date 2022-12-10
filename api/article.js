const express = require('express');
const { getArticles, getArticle } = require('../helper/articles-handler');
const { setChild, getChild, updateChild } = require('../helper/child-handler');

const router = express.Router();

router.get('/', async (request, response) => {
  try {
    const dataResponse = await getArticles();
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
      message: "Get data articles succesfully",
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

router.get('/:id', async (request, response) => {
  try {
    const dataResponse = await getArticle(request.params.id);
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
      message: "Get data article succesfully",
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