
var redirectRouter = require('express').Router();
var redirect = require('./redirectRoute');

redirectRouter.route('/')
	.get(redirect.appRedirect);

redirectRouter.route('/:urlBase')
	.get(redirect.urlRedirect);

redirectRouter.route('/notInstalled')
	.get(redirect.notInstalled);

module.exports = redirectRouter;
