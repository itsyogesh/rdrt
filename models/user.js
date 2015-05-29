var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var User = mongoose.Schema({
	email : {type: String, unique: true, required: true},
	password: {type: String, required: true},
	name: {type: String, required: true},
	logo : {type: String}
});

/*
* comparePassword: returns an isMatch if the password matches using bcrypt
* @params password: password to compare with the current user password
* @params callback: callback function that returns an ismatch from bcrypt
*/

User.methods.comparePassword = function(password, callback){
	bcrypt.compare(password, this.password, callback);
}

/*
* toJSON : returns a Json of the user without the password
*/

User.methods.toJSON = function(){
	var user = this.toObject();
	delete user.password;

	return user;
}

User.pre('save', function(callback){
	var user = this;

	if(!user.isModified('password')){
		return callback();
	}

	bcrypt.genSalt(10, function(err, salt){
		if(err){
			return callback(err);
		}

		bcrypt.hash(user.password, salt, null, function(err, hash){
			if(err){
				return err;
			}

			user.password = hash;
			return callback();
		});
	});
});

module.exports = mongoose.model('User', User);