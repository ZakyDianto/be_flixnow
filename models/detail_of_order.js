'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detail_of_order extends Model {
  static associate(models) {
  detail_of_order.belongsTo(models.film, {
    foreignKey: 'filmID',
    as: 'film'
  });
}
  }
  detail_of_order.init({
    orderID: DataTypes.INTEGER,
    filmID: DataTypes.INTEGER,
    qty: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'detail_of_order',
  });
  return detail_of_order;
};