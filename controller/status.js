var _    = require('underscore');
var uuid = require('node-uuid');

var statuses = [];

exports.createStatus = function(req,res) {
	var time = req.body.time || req.query.time;
	var status = req.body.status || req.query.status;
	var username = req.body.username || req.query.username;
	var id = uuid.v1();

	statuses.push({
		id: id,
		time: time,
		content: status,
		username: username
	});

	res.status(200);

	res.json({
		status: "created successfully",
		data  : statuses
	});
}

exports.getStatus = function(req,res) {
	if(statuses.length) {
		res.status(200);
		res.json(statuses)
	}
	else {
		res.status(404);
		res.json({
			error: "No Status posted"
		})
	}
}
