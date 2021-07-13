'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Products.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Products',
    timestamps: false
  });
  return Products;
};