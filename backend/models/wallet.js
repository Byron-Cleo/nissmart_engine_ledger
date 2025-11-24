"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here

      //1.reverse target of one-to-one to the user, the walllet belongs to
      this.belongsTo(User, {
        foreignKey: "userFK",
        as: "user",
        allowNull: false,
      });
    }
  }
  Wallet.init(
    {
      userFK: {
        //foreignKey referencing the user
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      walletBalance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: "wallets",
      modelName: "Wallet",
    }
  );
  return Wallet;
};
