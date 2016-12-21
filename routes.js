var express = require('express');

var router = express.Router();

router.use(function timeLog(req, res, next) {
	console.log('Request Received: ', dateDisplayed(Date.now()));
	next();
});

router.get('/', function(req, res) {
	res.json({ message: 'Welcome to the garage-door REST API' });
});

var gpio = require('pi-gpio');
var gpioPin = 16;

router.route('/trigger')
	.get(function(req, res) {
		gpio.open(gpioPin, "output", function(err) {
			gpio.write(gpioPin, 0, function() {
				setTimeout(function() {
					gpio.write(gpioPin, 1, function() {
						gpio.close(gpioPin);
					});
				}, 250);
			});
		});		
		res.json({ message: 'Garage door has been triggered!' });
	});


module.exports = router;

function dateDisplayed(timestamp) {
	var date = new Date(timestamp);
	return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
}
