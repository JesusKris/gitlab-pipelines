'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bills extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bills.init({
    id: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    number_of_items: { type: DataTypes.INTEGER, allowNull: false },
    total_amount: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    sequelize,
    modelName: 'Bills',
    timestamps: false
  });
  return Bills;
};