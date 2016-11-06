var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');

var patientRoutes = require('./routes/patient');
var patientHealthRoutes = require('./routes/patient-health');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Setup notification
var alert;
io.on('connection', function (socket) {
	alert = socket;
});

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'SPA', 'favicon.ico')));
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../SPA')));
app.disable('x-powered-by');

// Send alert to client.
app.post('/api/alert', function (req, res) {
	alert.emit('notify', { user: req.body.name, status: req.body.status, rate: req.body.rate });
	res.status(200).json({ result: 'success' });
});

app.use('/api/patients', patientRoutes);
app.use('/api/patient-health', patientHealthRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.json({
			"message": err.message,
			"error": err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.json({
		"message": err.message,
		"error": err
	});
});


http.listen(3000, '0.0.0.0', function () {
	console.log('Listening on port 3000');
});