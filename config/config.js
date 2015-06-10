
var isProduction = (process.env.NODE_ENV === 'production') ? true : false;

var template = {
	production: {
		path: '/var/www/rdrt/templates/'
	},
	development: {
		path: '/home/yogeshkumar/node_work/rdrt/templates/'
	}
};

var db = {
	production: {
		endpoint: '104.131.90.215:20102/rdrt'
	},
	development: {
		endpoint: 'localhost:27017/rdrt'
	}
}

var templatePath = (isProduction) ? template.production.path : template.development.path;
var dbEndpoint = (isProduction) ? db.production.endpoint : db.development.endpoint;

exports.templatePath = templatePath;
exports.dbEndpoint = dbEndpoint;

