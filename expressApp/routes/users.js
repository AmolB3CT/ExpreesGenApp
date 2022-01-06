var express = require('express');
var router = express.Router();
const userregistrations = require('../models/registrationModel')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/registration", async (req, res) => {
  try {
    const newUser = req.body;
    const inserted = await userregistrations.create(newUser);
      return res.json({success: true, msg: 'User created', data: inserted});
  } catch (error) {
      return res.json({ success: false, msg: error.message, data: null });
  }
})

module.exports = router;
