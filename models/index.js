
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

			// set up relations
			for (var model in models) {
				if (models[model].setRelations) {
					models[model].setRelations(models);
				}
			}

			// synchronize models to create tables
			db.sync(function(err) {
				console.log(err || 'ORM: tables synchronized!');
			});

			// export the models
			for (model in models) {
				module.exports[model] = models[model];
			}
		}
	}));
};
