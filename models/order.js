'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
   static associate(models) {
      order.belongsTo(models.user, {
        foreignKey: 'userID',
        as: 'user'
      });

      order.belongsTo(models.admin, {
        foreignKey: 'adminID',
        as: 'admin'
      });

      order.hasMany(models.detail_of_order, {
        foreignKey: 'orderID',
        as: 'details_of_order'
      });
    }
  }
  order.init({
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
    },
    userID: DataTypes.INTEGER,
    adminID: DataTypes.INTEGER,
    date_of_order: DataTypes.DATE,
    status: DataTypes.BOOLEAN

  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};