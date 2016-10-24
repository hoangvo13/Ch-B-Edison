var Sequelize = require('sequelize');
var sequelize = require('../connection');

var patient = sequelize.define('patient', {
    patientName: {
        type: Sequelize.STRING
    },
    joinDate: {
        type: Sequelize.DATEONLY
    }
}, {
    timestamps: false,
    tableName: 'patient'
});

module.exports = patient;