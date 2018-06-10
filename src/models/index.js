const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('../config')( process.env.NODE_ENV );
const db = {};

const sequelize = new Sequelize(
    config.db.database,
    config.db.username,
    config.db.password,
    config.db.config
);

sequelize
    .sync()
    .then(() => {
        console.log(`Connection has been established to database ${config.db.database} successfully.`);
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err.message );
        process.exit();
    });

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        let model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;

        if (db[model.name].associate) {
            db[model.name].associate(db);
        }
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;