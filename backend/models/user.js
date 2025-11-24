"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Wallet, Transaction, Transfer }) {
      // define association here
      //source of one-to-one relationship
      this.hasOne(Wallet, {
        foreignKey: "userFK",
        as: "wallet",
      });
      //one to many relationship with the transaction table
      this.hasMany(Transaction, {
        foreignKey: "userFK",
        as: "transaction",
      });

      //one to many relationship with the transaction table
      this.hasMany(Transfer, {
        foreignKey: "senderUserFK",
        as: "transfer",
      });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        validate: {
          notNull: {
            msg: "Please enter user's first name",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        validate: {
          notNull: {
            msg: "Please enter user's last name",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: "Please provide a valid email",
          },
          isLowercase: true,
          notNull: {
            msg: "Please provide an email to this user",
          },
        },
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
    }
  );
  return User;
};
