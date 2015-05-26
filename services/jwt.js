var jwt = require('jwt-simple');

var jwtService = {
	createToken: function(user, host){
		var payload = {
			iss: host,
			sub: user.id;
		}

		var token = jwt.encode(payload, 'secret_message');

		return token;
	}
};

module.exports = jwtService;