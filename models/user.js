var mongoose = require('mongoose');

var User = mongoose.Schema({
	email : {type: String, unique: true, required: true},
	password: {type: String, required: true},
	logo : {type: String}
});

User.pre('save', function(callback){
	var user = this;

	if(!user.isModified('password')){
		return callback();
	}

	bcrypt.genSalt(10, function(err, salt){
		if(err){
			return next(err);
		}

		bcrypt.hash(user.password, salt, null, function(err, hash){
			if(err){
				return err;
			}

			user.password = hash;
			next();
		});
	});
});

module.exports = mongoose.model('User', User);