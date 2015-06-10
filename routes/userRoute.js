var jwt = require('../services/jwt');
var User = require('../models/user');

var userRoute = {

	//Endpoint handler "POST /register"
	addUser: function(req, res){
		var user = new User();
		user.email = req.body.email;
		user.password = req.body.password;
		user.name = req.body.name;

		if(req.files.profile_image){
			user.profile_image = req.files.profile_image.path;
		}

		user.save(function(err){
			if(err){
				res.send(err);
			}

			return res.status(200).json({
				user: user.toJSON(),
				token: jwt.createToken(user, req.hostname)
			});
		});
	},

	//Endpoint handler "GET /user/details"
	getUser: function(req, res){
		User.findById(req.user.id, function(err, user){
			if(err){
				res.send(err);
			}

			res.status(200).send(user.toJSON());
		});
	},

	//Endpoint handler "PUT /user/details"
	updateUser: function(req, res){
		User.findById(req.user.id, function(err, user){
			user.name = (req.body.name) ? req.body.name : user.name;
			if(req.files.logo){
				user.logo = req.files.logo.path;
			}

			user.save(function(err){
				if(err){
					res.send(err);
				}

				return res.status(200).json({
					user: user.toJSON()
				});
			});
		});
	},

	//Endpoint handler "POST /login"
	login: function(req, res){
		return res.status(200).json({
			user: req.user,
			token: jwt.createToken(req.user, req.hostname)
		});
	}

};

module.exports = userRoute;