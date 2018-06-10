module.exports = (sequelize, DataTypes) => {
	const Employee = sequelize.define('employee', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: true
			}
		},
		picture: {
			type: DataTypes.STRING
		},
		big: {
			type: DataTypes.BOOLEAN,
			validate: {
				notEmpty: true
			}
		}
	}, {
		timestamps: false
	});

	Employee.sync();

	return Employee;
};