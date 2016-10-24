var Sequelize = require('sequelize');
var sequelize = require('../connection');
var Patient = require('./patient');

var patientHealth = sequelize.define('patient_health', {
    heartRate: {
        type: Sequelize.INTEGER
    },
    bloodPressure: {
        type: Sequelize.INTEGER
    },
    status: {
        type: Sequelize.STRING
    },
    mearsureDate: {
        type: Sequelize.DATE
    }
}, {
    timestamps: false,
    tableName: 'patient_health',
});

patientHealth.belongsTo(Patient, {foreignKey : 'patientId'});

module.exports = patientHealth;