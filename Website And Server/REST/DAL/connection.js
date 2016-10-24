var Sequelize = require('sequelize');

// Make connection to the led.sqlite database
var sequelize = new Sequelize('heartbeat', 'username', 'password', {    
    dialect: 'sqlite',
    storage: 'heartbeat.sqlite'
});

module.exports = sequelize;