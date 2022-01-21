var express = require('express');
var router = express.Router();
const userregistrations = require('../models/registrationModel')

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

router.get("/proCodes", async (req, res) => {
    try {
      const procedureCodes = await req.db.collection('ProcedureCodes').find({}).toArray();
        return res.json({success: true, msg: 'Medicine list', data: procedureCodes});
    } catch (error) {
        return res.json({ success: false, msg: error.message, data: null });
    }
  });

router.get("/diagCodes", async (req, res) => {
    try {
      const DiagnosisCodes = await req.db.collection('DiagnosisCodes').find({}).toArray();
        return res.json({success: true, msg: 'Medicine list', data: DiagnosisCodes});
    } catch (error) {
        return res.json({ success: false, msg: error.message, data: null });
    }
  });

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
      const physician = await req.db.collection('Physicians').findOne(username);
      console.log(physician)  
      return res.json({success: true, msg: 'User list', data: physician});
    } catch (error) {
        return res.json({ success: false, msg: error.message, data: null });
    }
  })
  

router.post("/physicians", async (req, res) => {
    try {
      const newUser = req.body;
      console.log(req.body);
      const inserted = await req.db.collection('Physicians').insertOne(newUser);
        return res.json({success: true, msg: 'Physician created', data: inserted});
    } catch (error) {
        return res.json({ success: false, msg: error.message, data: null });
    }
  })

  router.put("/shedule-appointment/:physicianId", async (req, res) => {
    try {
        const physicianId = req.params.physicianId;
        console.log("req.params.id");
        console.log(req.params.physicianId);
        const newUser = req.body;
        const patientData = await userregistrations.findOne({ _id: req.body.patient_id });

        console.log("patientData------------------------------------------------------------------------------");

        console.log(patientData);

        let finalData;
        finalData = {...patientData.demographics};
        finalData.type = newUser.type;
        finalData.notes = newUser.notes;
        finalData.schedule_time = newUser.schedule_time;
        finalData.immunization = patientData.immunization;
        finalData.allergies = patientData.allergies;
        finalData.currentMedications = patientData.currentMedications;
        finalData.username=patientData.username;
        finalData.visitDetails= {}

        finalData.email=patientData.email;

        finalData.dob=patientData.dob;

        const physicianData = await req.db.collection('Physicians').findOne({ username: physicianId });
        console.log("kdfuwuweruwhviuloerhvuvv");
       console.log(physicianData.sceduledAppointments);



        physicianData.sceduledAppointments.forEach((element) => {
            let each_date = new Date(element)
            if ((each_date.getDate() == new Date(newUser.schedule_time).getDate()) && (each_date.getMonth() == new Date(newUser.schedule_time).getMonth()) && (each_date.getHours() == new Date(newUser.schedule_time).getHours())) {
                return res.json({ success: false, msg: "The selected data/time for the selected physician is blocked. Request you to please select  a different time/date" });
            }
        });

        let physicianD={

          physicianName:physicianId,

          dateAndTime:newUser.schedule_time,

          type:newUser.type
        }

        const inserted = await req.db.collection('Physicians').updateOne ({ username: physicianId }, { $push: { patientsDetails: finalData } });
        const insert = await req.db.collection('Physicians').updateOne ({ username: physicianId }, { $push: { sceduledAppointments: newUser.schedule_time } });
        const intouserdetils=await userregistrations.updateOne ({ username: patientData.username }, { $push: { sceduledAppointments:physicianD} });
        //   const inserted = await physician.Update({username: physicianId},  {$push:{patientsDetails:finalData}});
        return res.json({ success: true, msg: "Appointment Sheduled", scheduledDetails: inserted });
    } catch (error) {
        return res.json({ success: false, msg: error.message });
    }
});

router.put("/visitDetails/:physicianId", async (req, res) => {
  try {
      const physicianId = req.params.physicianId;

      const physicianData = await req.db.collection('Physicians').updateOne({ username: physicianId, "patientsDetails": { $elemMatch: { username:req.body.username , schedule_time:req.body.schedule_time }} }, { "$set": { "patientsDetails.$.visitDetails": req.body.visitDetails } });
      //   const inserted = await physician.Update({username: physicianId},  {$push:{patientsDetails:finalData}});
      return res.json({ success: true, msg: "Visit Completed", visitDetails: physicianData });
  } catch (error) {
      return res.json({ success: false, msg: error.message });
  }
});

module.exports = router;
