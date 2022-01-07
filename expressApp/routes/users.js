var express = require('express');
var router = express.Router();
const userregistrations = require('../models/registrationModel')

/* GET users listing. */
router.get("/registration", async (req, res) => {
  try {
    const users = await userregistrations.find();
      return res.json({success: true, msg: 'User list', data: users});
  } catch (error) {
      return res.json({ success: false, msg: error.message, data: null });
  }
})

router.get("/registration/:username", async (req, res) => {
  try {
    username = {username : req.params.username};
    const user = await userregistrations.findOne(username);
      return res.json({success: true, msg: 'User list', data: user});
  } catch (error) {
      return res.json({ success: false, msg: error.message, data: null });
  }
})

router.post("/registration", async (req, res) => {
  try {
    const newUser = req.body;
    console.log("Here 18")
    console.log(req.body);
    const inserted = await userregistrations.create(newUser);
      return res.json({success: true, msg: 'User created', data: inserted});
  } catch (error) {
      return res.json({ success: false, msg: error.message, data: null });
  }
})

module.exports = router;
