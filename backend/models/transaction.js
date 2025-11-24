"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here

      //1. reverse target of one-to-one to the user, the walllet belongs to
      this.belongsTo(User, {
        foreignKey: "userFK",
        as: "user",
        allowNull: false,
      });
    }
  }
  Transaction.init(
    {
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
      initialBalance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
      currentBalance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
      transactionType: {
        type: DataTypes.STRING,
        validate: {
          isIn: {
            args: [
              ["deposit", "withdraw", "transfer_credit", "transfer_debit"],
            ],
            msg: "Transaction type can only be Deposit, Withdraw, Transfer Credit or Transfer Debit",
          },
        },
        allowNull: false,
        defaultValue: "",
      },
      transactionStatus: {
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
      tableName: "transactions",
      modelName: "Transaction",
    }
  );
  return Transaction;
};
