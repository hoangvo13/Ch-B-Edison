var express = require('express');
var Patient = require('../DAL/models/patient');

var router = express.Router();

router.get('/', function (req, res, next) {
	Patient.findAll().then(function (patients) {
		res.status(200).json(patients);
	});	
});

module.exports = router;
