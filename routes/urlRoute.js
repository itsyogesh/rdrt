var Url = require('../models/url');
var urlService = require('../services/url');
var logger = require('../config/logger');

var urlRoute = {

	//Url endpoint hadler "POST /apps/:appBase/urls"
	addUrl : function(req, res){
		var url = new Url();

		url.user_id = req.user.id;
		url.app_id = req.body.app_id;
		url.base = req.body.base;
		
		url = urlService.setUrl(req.body, url);

		url.save(function(err){
			if(err){
				return res.status(400).send(err);
			}

			return res.status(200).json(url);
		});
	},

	//Url endpoint handler "GET /apps/:appBase/urls"
	getUrls : function(req, res){
		App.findOne({base: req.params.appBase}, function(err, app){
			Url.find({app_id: app.id}, function(err, urls){
				if(err){
					return res.status(400).send(err);
				}

				return res.status(200).json(urls);
			});
		});
	},

	//Url endpoint handler "GET apps/:appBase/urls/:urlBase"
	getUrl : function(req, res){
		Url.findOne({base: req.params.urlBase}, function(err, url){
			if(err){
				return res.status(400).send(err);
			}

			return res.status(200).json(url);
		});
	},

	//Url endpoint handler "PUT apps/:appBase/urls/:urlBase"
	updateUrl: function(req, res){
		Url.findOne({base: req.params.urlBase}, function(err, url){
			if(err){
				return res.status(400).send(err);
			}

			url.base = (req.body.base) ? req.body.base : url.base;

			url = urlService.setUrl(req.body, url);

			url.save(function(err){
				if(err){
					return res.status(400).send(err);
				}

				return res.status(200).json(url);
			});
		});
	},

	//Url endpoint handler "DELETE /apps/:appBase/urls/:urlBase"
	deleteUrl : function(req, res){
		Url.findOneAndRemove({base: req.params.urlBase}, function(err){
			if(err){
				res.status(400).send(err);
			}

			return res.status(200).json({
				message: "url deleted successfully"
			});
		})
	},

	//Url endpoint handler "/:appBase/:urlBase"
	redirectUrl: function(req, res){
		Url.findOne({base: req.params.urlBase}, function(err, url){
			var redirectUrl = url.redirectUrl(url, req.useragent);
			if(redirectUrl){
				url.redirectPage(redirectUrl, 'url', function(err, page){
					if(err){
						return res.status(400).send(err)
					}

					return res.send(page);
				});
			}

			else {
				App.findOne({base: req.params.appBase}, function(err, app){
					if(err){
						return res.send(err);
					}

					return res.redirect(app.default);
				});
			}
		});
	}

};

module.exports = urlRoute;