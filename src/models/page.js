module.exports = (sequelize, DataTypes) => {
	const Page = sequelize.define('page', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		slug: {
			type: DataTypes.STRING,
			unqiue: true,
			validate: {
				notEmpty: true
			}
		},
		title: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: true
			}
		},
		content: {
			type: DataTypes.TEXT,
			validate: {
				notEmpty: true
			}
		}
	}, {
		timestamps: false
	});

	Page.sync();

	return Page;
};