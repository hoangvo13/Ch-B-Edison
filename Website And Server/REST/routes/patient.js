var express = require('express');
var uuid = require('uuid');

var Patient = require('../DAL/models/patient');

var router = express.Router();

router.get('/', function (req, res, next) {
	Patient.findAll().then(function (patients) {
		res.status(200).json(patients);
	});	
});

router.post('/', function (req, res, next) {
	Patient.create({
		id: uuid.v1(),
		patientName: req.body.name,
		joinDate: req.body.date
	}).then(function (result) {
		res.status(200).json(result);
	});
});

module.exports = router;
