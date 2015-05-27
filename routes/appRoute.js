var App = require('../models/App');
var urlService = require('../services/url');
var logger = require('../config/logger');

var appRoute = {

	//Url endpoint hadler "POST /apps"
	addApp : function(req, res){
		var app = new App();

		app.user_id = req.user.id;
		app.name = req.body.name;
		app.default = req.body.default;
		app.app_id = req.body.app_id;
		
		app = urlService.setUrl(req.body, app);

		app.save(function(err){
			if(err){
				return res.status(400).send(err);
			}

			return res.status(200).json(app);
		});
	},

	//Url endpoint handler "GET /apps"
	getApps : function(req, res){
		App.find({user_id: req.user.id}, function(err, apps){
			if(err){
				return res.status(400).send(err);
			}

			return res.status(200).json(apps);
		});
	},

	//Url endpoint handler "GET /apps/:appBase"
	getApp : function(req, res){
		App.findOne({base: req.params.appBase}, function(err, app){
			if(err){
				return res.status(400).send(err);
			}

			return res.status(200).json(app);
		});
	},

	//Url endpoint handler "PUT /apps/:appBase"
	updateApp: function(req, res){
		App.findOne({base: req.params.appBase}, function(err, app){
			if(err){
				return res.status(400).send(err);
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

}