"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("transfers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      senderUserFK: {
        //foreignKey referencing the user
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      receiverId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
      transferStatus: {
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
    await queryInterface.dropTable("transfers");
  },
};
