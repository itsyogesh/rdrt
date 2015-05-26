var App = require('../models/App');
var urlService = require('../services/url');
var logger = require('../config/logger');

var appRoute = {

	//Url endpoint hadler "POST /apps"
	addApp : function(req, res){
		var app = new App();

		app.user_id = req.user.id;
		app.name = req.body.name;
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

	//Url endpoint handler "GET /apps/:appId"
	getApp : function(req, res){
		App.findById(req.params.appId, function(err, app){
			if(err){
				return res.status(400).send(err);
			}

			return res.status(200).json(app);
		});
	},

	//Url endpoint handler "PUT /apps/:appId"
	updateApp: function(req, res){
		App.findById(req.params.appId, function(err, app){
			if(err){
				return res.status(400).send(err);
			}

			app.name = (req.body.name) ? req.body.name : app.name;
			app.app_id = (req.body.app_id) ? req.body.app_id : app.app_id;

			app = urlService.setUrl(req.body, app);

			app.save(function(err){
				if(err){
					return res.status(400).send(err);
				}

				return res.status(200).json(app);
			});
		});
	},

	//Url endpoint handler "DELETE /apps/:appId"
	deleteApp : function(req, res){
		App.findByIdandRemove(req.params.appId, function(err){
			if(err){
				res.status(400).send(err);
			}

			return res.status(200).json({
				message: "App deleted successfully"
			});
		})
	},


}