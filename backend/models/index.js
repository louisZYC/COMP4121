const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
});

const models = {};

models.sequelize = sequelize;
models.product = require("./product.model.js")(sequelize);
models.user = require("./user.model.js")(sequelize)
models.transaction = require("./transaction.model.js")(sequelize)

module.exports = models;