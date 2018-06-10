module.exports = (sequelize, DataTypes) => {
	const Opening = sequelize.define('opening', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: true
			}
		},
		description: {
			type: DataTypes.TEXT,
			validate: {
				notEmpty: true
			}
		}
	}, {
		timestamps: false
	});

	Opening.sync();

	return Opening;
};