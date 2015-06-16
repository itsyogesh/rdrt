var App = require('../models/app');
var urlService = require('../services/url');
var logger = require('../config/logger');

var appRoute = {

	//Url endpoint hadler "POST /apps"
	addApp : function(req, res){
		var app = new App();

		app.user_id = req.user.id;
		app.name = req.body.name;

		app.preferences = {};
		app.preferences.default_url = req.body.preferences.default_url;
		
		app.base = req.body.base;
		
		if(req.files.logo){
			app.logo = req.files.logo.path;
		}
		
		if(req.body.web){
			app.web.url = req.body.web.url;
		}
		
		if(req.body.android){
			app.android.scheme = req.body.android.scheme;
			app.android.package = req.body.android.package;
			app.android.store_url = req.body.android.store_url;

			app.preferences.android = req.body.preferences.android ? req.body.preferences.android : true; 
		}

		if(req.body.ios){
			app.ios.scheme = req.body.ios.scheme;
			app.ios.store_url = req.body.ios.store_url;

			app.preferences.ios = req.body.preferences.ios ? req.body.preferences.ios : true; 
		}

		if(req.body.windows){
			app.windows.scheme = req.body.windows.scheme;
			app.windows.store_url = req.body.windows.store_url;
			app.preferences.windows = req.body.preferences.windows ? req.body.preferences.windows : true; 
		}

		app.save(function(err){
			if(err){
				return res.status(401).send(err);
			}

			return res.status(200).json(app);
		});
	},

	//Url endpoint handler "GET /apps"
	getApps : function(req, res){
		App.find({user_id: req.user.id}, function(err, apps){
			if(err){
				return res.status(401).send(err);
			}

			return res.status(200).json(apps);
		});
	},

	//Url endpoint handler "GET /apps/:appBase"
	getApp : function(req, res){
		App.findOne({base: req.params.appBase}, function(err, app){
			if(err){
				return res.status(401).send(err);
			}

			return res.status(200).json(app);
		});
	},

	//Url endpoint handler "PUT /apps/:appBase"
	updateApp: function(req, res){
		App.findOne({base: req.params.appBase}, function(err, app){
			if(err){
				return res.status(401).send(err);
			}

			app.name = (req.body.name) ? req.body.name : app.name;
			app.base = (req.body.base) ? req.body.base : app.base;

			app = urlService.setUrl(req.body, app);

			app.save(function(err){
				if(err){
					return res.status(400).send(err);
				}

				return res.status(200).json(app);
			});
		});
	},

	//Url endpoint handler "DELETE /apps/:appBase"
	deleteApp : function(req, res){
		App.findOneandRemove({base: req.params.appBase}, function(err){
			if(err){
				res.status(400).send(err);
			}

			return res.status(200).json({
				message: "App deleted successfully"
			});
		})
	},

	//Url endpoint handler "/:appBase"
	redirectApp: function(req, res){
		App.findOne({base: req.params.appBase}, function(err, app){
			var redirectUrl = url.redirectUrl(app, req.useragent);
			if(redirectUrl){
				url.redirectPage(redirectUrl, 'app', function(err, page){
					if(err){
						return res.status(400).send(err)
					}

					return res.send(page);
				});
			}
			else {
				return res.redirect(app.default);
			}
		});
	},

	//Url endpoint handler ":/appBase/notinstalled"
	appNotInstalled: function(req, res){
		App.findOne({base: req.params.appBase}, function(err, app){
			var redirectUrl = url.redirectUrl(app, req.useragent);
			if(redirectUrl){
				url.redirectPage(redirectUrl, 'app', function(err, page){
					if(err){
						return res.status(400).send(err);
					}

					return res.status(200).send(page);
				});
			}

			else{
				return res.redirect(app.default);
			}
		});
	}

};

module.exports = appRoute;