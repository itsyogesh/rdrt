var jwt = require('jwt-simple');
var secret = "secret_message";

var jwtService = {
	/*
	* createToken: Provides a json web token based with jwt-simple
	* @params user: the user id, to add user.id to the token payload subject.
	* @params host: the host that requested the webtoken, added to the token payload issuer
	* @return token: the json web token with the secret.
	*/
	createToken: function(user, host){
		var payload = {
			iss: host,
			sub: user.id
		};

		var token = jwt.encode(payload, secret);

		return token;
	},
	/*
	* decodeToken: Decodes a json web token with jwt-simple
	* @params token: json web token to be decoded.
	* @return decodedToken: decoded jwt, which is used to get the user data
	*/
	decodeToken: function(token){
		var decodedToken = jwt.decode(token, secret);
		return decodedToken;
	}
};

module.exports = jwtService;