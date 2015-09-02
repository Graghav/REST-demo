var users = [];

var _ = require('underscore');

exports.createAccount = function(req,res) {

	var user = {};

	user.username = req.query.username || req.body.username;

	user.fullName = req.query.name || req.body.name;

	user.age = req.query.age || req.body.age;

	users.push(user);

	res.status(200);

	res.json({
		status: "created successfully",
		user  : user
	});
}

exports.getAccountInfo = function(req,res) {

	var username = req.query.username || req.body.username;

	var user = _.where(users, { username: username });

	if(username == "all") {
		res.status(200);
		res.json(users);
	}
	else if(user.length) {
		res.status(200);
		res.json(user);
	}
	else {
		res.status(404);
		res.json({ error: "User not found" });
	}
}

exports.deleteAccount = function(req,res) {
	var username = req.query.username || req.body.username;

	if(username) {
		var isFound = _.findWhere(users, { username : username }) || false;

		if(isFound) {
			users = _.reject(users, function(u){
				return u.username == username;
			});
			res.status(200);
			res.json({
				status: "Deleted successfully"
			})
		}
		else {
			res.status(404);
			res.json({ error: "User not found "});
		}
	}
	else {
		res.status(400);
		res.json({ error: "Missing Parameter: username"})
	}
}