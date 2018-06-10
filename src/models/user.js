const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('user', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			unique: true,
			validate: {
				isValid: (str) => {
					if(str.length < 5 || str.length > 32){
						throw new Error('The username length should be between 5 and 32 characters.');
					}

					if(str.indexOf(' ') !== -1){
						throw new Error('You are not allowed to use empty character in your username!');
					}

					if(!/^[a-z0-9]+$/i.test(str)){
						throw new Error('You are not allowed to use non alphanumeric characters in your username!');
					}
				}
			}
		},
		password: {
			type: DataTypes.STRING,
			validate: {
				isValid: (str) => {
					if(str.length < 6 || str.length > 32){
						throw new Error('The password length should be between 6 and 32 characters.');
					}

					if(str.indexOf(' ') !== -1){
						throw new Error('You are not allowed to use empty character in your password!');
					}
				}
			}
		}
	}, {
		timestamps: false
	});

	User.prototype.isCorrectPassword =  function(password){
        return bcrypt.compare(password, this.password);
    }

	User.beforeCreate(async user => {
		user.password = await bcrypt.hash(user.password, 10);
	});

	User.sync();

	return User;
};