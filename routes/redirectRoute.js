'use strict';
var App = require('../models/app');
var Url = require('../models/url');

var urlService = require('../services/url');
var appService = require('../services/app');
var generator = require('../services/generator');
var constants = require('../config/constants');

var redirectRoute = {

	appRedirect: function(req, res){
		var appBase = generator.subdomain(req.headers.host);

		App.findOne({base: appBase}, function(err, app){
			if(err){
				return res.send(err);
			}
			var redirectUrl = appService.redirectApp(app, true, req.useragent);
			var isWeb = (generator.userAgent(req.useragent) === constants.web);

			appService.redirectPage(redirectUrl, app, isWeb, function(err, page){
				if(err){
					return res.status(401).send(err)
				}
				
				return res.send(page);
			});
			
		});
	},

	//Endpoint handler for appBase.rdrt.me/:urlBase
	urlRedirect: function(req, res){
		var appBase = generator.subdomain(req.headers.host);
		App.findOne({base: appBase}, function(err, app){
			if(err){
				res.status(400).send(err);
			}
			Url.findOne({base: req.params.urlBase, app_id: app.id}, function(err, url){
				if(err || !url){
					return res.send(err);
				}

				var redirectUrl = urlService.redirectUrl(url, app, req.useragent);
				var isWeb = (generator.userAgent(req.useragent) === constants.web);

				urlService.redirectPage(redirectUrl, app, isWeb, function(err, page){
					if(err){
						return res.status(401).send(err)
					}

					return res.send(page);
				});
			});
		});
	},

	//Endpoint handler GET appBase.rdrt.me/notinstalled
	notInstalled: function(req, res){
		var appBase = generator.subdomain(req.headers.host);
		App.findOne({base: appBase}, function(err, app){
			var redirectUrl = appService.redirectApp(app, false, req.useragent);
			appService.noAppPage(redirectUrl, app, function(err, page){
				if(err){
					return res.status(400).send(err);
				}
				return res.status(200).send(page);
			});
		});
	}	
};

module.exports = redirectRoute;