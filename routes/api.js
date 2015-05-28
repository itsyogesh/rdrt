'use strict';

var appRouter = require('express').Router();
var urlRouter = require('express').Router();
var userRouter = require('express').Router();

var authService = require('../services/auth');

var user = require('./userRoute');
var app = require('./appRoute');
var url = require('./urlRoute');

appRouter.route('/apps')
	.post(authService.isAuthenticated, app.addApp)
	.get(authService.isAuthenticated, app.getApps);

appRouter.route('/apps/:appBase')
	.get(authService.isAuthenticated, app.getApp)
	.put(authService.isAuthenticated, app.updateApp)
	.delete(authService.isAuthenticated, app.deleteApp);

urlRouter.route('/apps/:appBase/urls')
	.post(authService.isAuthenticated, url.addUrl)
	.get(authService.isAuthenticated, url.getUrls);

urlRouter.route('/apps/:appBase/urls/:urlBase')
	.get(authService.isAuthenticated, url.getUrl)
	.put(authService.isAuthenticated, url.updateUrl)
	.delete(authService.isAuthenticated, url.deleteUrl);

userRouter.route('/register').post(user.addUser);

userRouter.route('/user/details')
	.get(authService.isAuthenticated, user.getUser)
	.put(authService.isAuthenticated, user.updateUser);

userRouter.route('/login')
	.post(authService.isAuthenticated, user.login);


exports.userRouter = userRouter;
exports.appRouter = appRouter;
exports.urlRouter = urlRouter;