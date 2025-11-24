"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transfer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here

      this.belongsTo(User, {
        foreignKey: "senderUserFK",
        as: "user",
        allowNull: false,
      }); 
    }
  }
  Transfer.init(
    {
      receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
      transferStatus: {
        type: DataTypes.STRING,
        validate: {
          isIn: {
            args: [["pending", "completed", "failed"]],
            msg: "Transaction Status can only be either pendingInititated, completed or failed",
          },
        },
        allowNull: false,
        defaultValue: "pending",
      },
    },
    {
      sequelize,
      tableName: "transfers",
      modelName: "Transfer",
    }
  );
  return Transfer;
};
