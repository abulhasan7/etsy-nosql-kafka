const express = require('express');

const router = express.Router();

const { checkAuth } = require('../utils/passport');

const { sendMessage } = require('../kafka/producer');

router.get('/get-all', checkAuth, async (req, res) => {
  sendMessage(process.env.FAVOURITES_TOPIC, { userId: req.user.userId }, 'GET-ALL', (error, data) => {
    if (data) {
      res.status(200).json({ message: data });
    } else {
      console.log('error', error);

      res.status(400).json({

        error: error || 'Some error occured during regsitration',

      });
    }
  });
});

router.post('/add', checkAuth, async (req, res) => {
  sendMessage(process.env.FAVOURITES_TOPIC, { ...req.body, user_id: req.user.userId }, 'ADD', (error, data) => {
    if (data) {
      res.status(200).json({ message: data });
    } else {
      console.log('error', error);

      res.status(400).json({

        error: error || 'Some error occured during regsitration',

      });
    }
  });
});

router.delete('/remove', checkAuth, async (req, res) => {
  sendMessage(process.env.FAVOURITES_TOPIC, { favouriteId: req.body.favourite_id }, 'REMOVE', (error, data) => {
    if (data) {
      res.status(200).json({ message: data });
    } else {
      console.log('error', error);

      res.status(400).json({

        error: error || 'Some error occured during regsitration',

      });
    }
  });
});

module.exports = router;
