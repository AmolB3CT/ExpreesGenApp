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



module.exports = router;
