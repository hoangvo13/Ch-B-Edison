var express = require('express');
var PatientHealth = require('../DAL/models/patient-health');
var Patient = require('../DAL/models/patient');

var router = express.Router();

router.get('/patient/:id', function (req, res, next) {
    PatientHealth.findAll({
        include: [{
            model: Patient,
            attributes: ['patientName']
        }],
        where: {
            patientId: req.params.id
        }
    }).then(function (patients) {
        res.status(200).json(patients);
    });
});

router.post('/patient', function (req, res, next) {
    PatientHealth.create({
        heartRate: req.body.rate,
        status: req.body.status,
        mearsureDate: req.body.measureDate,
        patientId: req.body.userId,
    }).then(function (result) {
        res.status(200).json(result);
    });
});

module.exports = router;
