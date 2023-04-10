const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // Define the schema: table name and columns
  const Transaction = sequelize.define("transaction", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    details: {
      type: DataTypes.STRING,
    },
    deliverTo: {
      type: DataTypes.STRING
    },
    contact: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "paid",
    },
    totalAmount: {
      type: DataTypes.FLOAT
    }
  });

  return Transaction;
};