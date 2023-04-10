const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	// Define the schema: table name and columns
  const Product = sequelize.define("product", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    image: {
      type: DataTypes.STRING,
    },
    monthlySales:{
      type: DataTypes.INTEGER
    },
    supplier:{
      type:DataTypes.STRING
    }
  });

  return Product;
};