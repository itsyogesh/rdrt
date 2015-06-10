'use strict';
var App = require('../models/app');
var Url = require('../models/url');

var urlService = require('../services/url');

var redirectRoute = {

	appRedirect: function(req, res){
		var appBase = urlService.subdomain(req.headers.host);

		App.findOne({base: appBase}, function(err, app){
			if(err){
				return res.send(err);
			}
			var redirectUrl = urlService.redirectUrl(app, req.useragent);
			if(redirectUrl){
				urlService.redirectPage(redirectUrl, 'app', function(err, page){
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

	//Endpoint handler for appBase.rdrt.me/:urlBase
	urlRedirect: function(req, res){
		var appBase = urlService.subdomain(req.headers.host);

		App.findOne({base: appBase}, function(err, app){
			if(err){
				res.status(400).send(err);
			}

			Url.findOne({base: req.params.urlBase, app_id: app.id}, function(err, url){
				var redirectUrl = urlService.redirectUrl(url, req.useragent);
				
				urlService.redirectPage(redirectUrl, 'url', function(err, page){
					if(err){
						return res.status(400).send(err)
					}

					return res.send(page);
				});
			});
		});
	},

	//Endpoint handler GET appBase.rdrt.me/notInstalled
	notInstalled: function(req, res){
		var appBase = urlService.subdomain(req.headers.host);

		App.findOne({base: appBase}, function(err, app){
			var redirectUrl = urlService.redirectUrl(app, req.useragent);
			if(redirectUrl){
				urlService.redirectPage(redirectUrl, 'app', function(err, page){
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

module.exports = redirectRoute;