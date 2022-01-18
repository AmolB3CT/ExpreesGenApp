var express = require('express');
var router = express.Router();

router.get("/medicines", async (req, res) => {
    try {
      const medicines = await req.db.collection('Medicines').find({}).toArray();
        return res.json({success: true, msg: 'Medicine list', data: medicines});
    } catch (error) {
        return res.json({ success: false, msg: error.message, data: null });
    }
  });
  
router.get("/allergies", async (req, res) => {
    try {
      const allergies = await req.db.collection('Allergies').find({}).toArray();
        return res.json({success: true, msg: 'Allergies list', data: allergies});
    } catch (error) {
        return res.json({ success: false, msg: error.message, data: null });
    }
  })

router.get("/physicians", async (req, res) => {
    try {
      const physicians = await req.db.collection('Physicians').find({}).toArray();
        return res.json({success: true, msg: 'Physicians list', data: physicians});
    } catch (error) {
        return res.json({ success: false, msg: error.message, data: null });
    }
  })

router.get("/physicians/:username", async (req, res) => {
    try {
      username = {username : req.params.username};
      const physician = await req.db.collection('Physicians').findOne({}).toArray();
        return res.json({success: true, msg: 'User list', data: physician});
    } catch (error) {
        return res.json({ success: false, msg: error.message, data: null });
    }
  })

router.post("/physicians", async (req, res) => {
  console.log("here422222")
    try {
      const newUser = req.body;
      console.log(req.body);
      const inserted = await req.db.collection('Physicians').insertOne(newUser);
        return res.json({success: true, msg: 'Physician created', data: inserted});
    } catch (error) {
        return res.json({ success: false, msg: error.message, data: null });
    }
  })

module.exports = router;
