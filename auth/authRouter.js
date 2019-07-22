const express = require('express');

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
  try {
    res.status(200).json({ message: `Hello.` });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
