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

router.put("/registration/:username", async (req, res) => {
  try {
    const username = {username: req.params.username};
    console.log(username)
    const users = await userregistrations.updateOne(username, {
        $set: {
          demographics:
          {
              height: req.body.height,
              weight: req.body.weight,
              age: req.body.age,
              medHistory: req.body.medHistory,
              surgeries: req.body.surgeries,
              familyMedHistory: req.body.familyMedHistory,
              provider: req.body.provider,
              gender: req.body.gender,
              phoneNo: req.body.phoneNo,
              adderess: req.body.adderess,
              employment: req.body.employment,
              education: req.body.education,
              ethnicity: req.body.ethnicity,
              pluseRate: req.body.weight,
              bloodPressure: req.body.bloodPressure
          }
        }
      }); 
      return res.json({ success: true, msg: "DEmographics updated successfully", data: users });

  } catch (error) {
    return res.json({ success: false, msg: error.message, data: null });
  }
});

router.put("/currentMedications/:username", async (req, res) => {
  try {
    const username = {username: req.params.username};
    console.log(username)
    const users = await userregistrations.updateOne(username, {
      $set: { currentMedications: req.body } }
      ); 
      return res.json({ success: true, msg: "Medications updated successfully", data: users });

  } catch (error) {
    return res.json({ success: false, msg: error.message, data: null });
  }
});

router.put("/allergies/:username", async (req, res) => {
  try {
    const username = {username: req.params.username};
    console.log(username)
    const users = await userregistrations.updateOne(username, {
      $set: { allergies: req.body } }
      ); 
      return res.json({ success: true, msg: "Allergies updated successfully", data: users });

  } catch (error) {
    return res.json({ success: false, msg: error.message, data: null });
  }
});

router.put("/immunization/:username", async (req, res) => {
  try {
    const username = {username: req.params.username};
    console.log(username)
    const users = await userregistrations.updateOne(username, {
      $set: { immunization: req.body } }
      ); 
      return res.json({ success: true, msg: "Immunization updated successfully", data: users });

  } catch (error) {
    return res.json({ success: false, msg: error.message, data: null });
  }
});
module.exports = router;
