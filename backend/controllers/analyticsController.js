const { Sequelize, Op } = require("sequelize");
const { User, Wallet, Transfer, Transaction } = require("./../models");
const catchAsync = require("./../utils/catchAsync");

exports.totalUsers = catchAsync(async (req, res, next) => {
  const results = await User.findAll({
    attributes: [[Sequelize.fn("COUNT", Sequelize.col("id")), "totalUsers"]],
    where: { isActive: true },
    raw: true,
    // group: [User.id]
  });

  res.status(200).json(results[0]);
});

exports.totalWalletsValue = catchAsync(async (req, res, next) => {
  const results = await Wallet.findAll({
    attributes: [
      [
        Sequelize.fn("SUM", Sequelize.col("walletBalance")),
        "totalWalletsValue",
      ],
    ],
    where: {
      walletBalance: {
        [Op.gt]: 0,
      },
    },
    raw: true,
  });
  res.status(200).json(results[0]);
});

exports.totalTransfers = catchAsync(async (req, res, next) => {
  const results = await Transfer.findAll({
    attributes: [
      [Sequelize.fn("SUM", Sequelize.col("amount")), "totalTransfers"],
    ],
    where: {
      amount: {
        [Op.gt]: 0,
      },
      transferStatus: "completed",
    },
    raw: true,
  });
  res.status(200).json(results[0]);
});

exports.totalWithdraws = catchAsync(async (req, res, next) => {
  const results = await Transaction.findAll({
    attributes: [
      [Sequelize.fn("SUM", Sequelize.col("amount")), "totalWithdraws"],
    ],
    where: {
      amount: {[Op.gt]: 0,},
      amount: {[Op.lt]: Sequelize.col("initialBalance"),},
      transactionStatus: { [Op.eq]: "completed"},
      transactionType: { [Op.eq]: "withdraw"},
    },
    raw: true,
  });
  res.status(200).json(results[0]);
});
