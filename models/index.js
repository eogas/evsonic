
var orm = require('orm'),
	config = require('../config');

module.exports = function(app) {
	app.use(orm.express(
		'mysql://' +
		config.db_user + ':' + config.db_pass +
		'@localhost/' + config.db_name, {

		define: function(db, models) {
			db.settings.set('instance.autoFetchLimit', 2);

			// set up models
			models.User = require('./user.js')(db);
		}
	}));
};
