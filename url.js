var user = require('./controller/user');
var status = require('./controller/status');

module.exports = function(express) {
	
	var router = express.Router(); 

	router.post('/user/create', user.createAccount);

	router.get('/user/search', user.getAccountInfo);

	router.delete('/user/delete', user.deleteAccount);

	router.post('/status/create', status.createStatus);

	router.get('/status/retrieve', status.getStatus);

	return router;

}

