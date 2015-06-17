
var redirectRouter = require('express').Router();
var redirect = require('./redirectRoute');

redirectRouter.route('/')
	.get(redirect.appRedirect);

redirectRouter.route('/notinstalled')
	.get(redirect.notInstalled);

redirectRouter.route('/:urlBase')
	.get(redirect.urlRedirect);

module.exports = redirectRouter;
