const express = require('express');
const router = express.Router();
const giphy = require('giphy-api')(process.env.GIPHY_API_KEY);

router.get('/', function(req, res, next) {
  let message = req.query.message;
  console.log('message', message);
  giphy.search(message).then(function(giphyResponse) {
    res.send(giphyResponse.data[Math.floor(Math.random() * giphyResponse.data.length)].embed_url);
  });

});

module.exports = router;
