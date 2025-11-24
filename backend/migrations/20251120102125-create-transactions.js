"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("transactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userFK: {
        //foreignKey referencing the user
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
      initialBalance: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
      currentBalance: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
      transactionType: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
        validate: {
          isIn: {
            args: [["pending", "completed", "failed"]],
            msg: "Transaction Status can only be either pendingInititated, completed or failed",
          },
        },
        allowNull: false,
        defaultValue: "pending",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("transactions");
  },
};
