const config = {
	development: {
		port: 3000,
		jwt_secret 	: 'qwerty',
		request_entity_limit: '5mb',
		db: {
			database 	: 'acme_app_dev',
			username 	: 'root',
			password 	: '',
			config 		: {
				dialect: 'mysql',
				operatorsAliases: false, // fixes deprecated warning
				logging: false
			}
		}
	},
	production: {
		port: 3000,
		jwt_secret 	: 'amxpotHSfgetwT#$',
		request_entity_limit: '5mb',
		db: {
			database 	: 'acme_app',
			username 	: 'root',
			password 	: '',
			config 		: {
				dialect: 'mysql',
				operatorsAliases: false, // fixes deprecated warning
				logging: false
			},
		}
	},
	testing: {
		port: 3000,
		jwt_secret 	: '.',
		request_entity_limit: '5mb',
		db: {
			database 	: 'acme_app_testing',
			username 	: 'root',
			password 	: '',
			config 		: {
				dialect: 'mysql',
				operatorsAliases: false, // fixes deprecated warning
				logging: false
			}
		}
	}
}

module.exports = function(environment){
	return config[environment] || config['development'];
}