const { User, Wallet, Transaction } = require("./../models");
const catchAsync = require("../utils/catchAsync");
const { WALLET_BALANCE } = require("../utils/constants");
const factory = require("./handlerController");
const { where } = require("sequelize");

//Create one with ewallet default balance
exports.createUser = catchAsync(async (req, res, next) => {
  //1. creating new user
  const newUser = new User(req.body);
  const result = await newUser.save();

  //2.creating user wallet and associating with the user
  const wallet = new Wallet({
    userFK: result.id,
    walletBalance: WALLET_BALANCE,
  });
  await wallet.save();

  res.status(201).json(result);
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const { count, rows: results } = await User.findAndCountAll({
    include: [
      {
        model: Wallet,
        as: "wallet",
        attributes: ["walletBalance"],
      },
    ],
  });
  //SEND RESPONSE
  res.status(200).json({
    count: count,
    results,
  });
});

exports.updateUserDetails = catchAsync(async (req, res, next) => {
  const user = await User.findOne({
    where: { id: req.params.edittedUserId },
  });

  //Set UPDATED values from the req obj and map them to the retrieved gasVariety
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;

  const updatedUser = await user.save();

  if (updatedUser) {
    res.status(200).json(updatedUser);
  } else {
    // const error = new AppError('No document Found with That ID!', 404);
    // return next(error);
    const error = new Error("User not Found and Not Updated");
    res.status(404).json({
      data: null,
      error,
    });
  }
});

exports.getUserRelatedTableRecords = catchAsync(async (req, res, next) => {
  // console.log(req.params.id)
  const result = await User.findAll({
    where: { id: req.params.detailsId },
    attributes: ["id", "firstName", "lastName", "email"],
    include: [
      {
        model: Wallet,
        as: "wallet",
        attributes: ["id", "walletBalance"],
      },
      {
        model: Transaction,
        as: "transaction",
        attributes: ["id", "amount", "transactionType", "transactionStatus"],
      },
      // {
      //   model: Withdraw,
      //   as: 'withdraw',
      //   attributes: ['id', 'walletBalance', 'createdAt', 'updatedAt'],
      // },
      // {
      //   model: Transfer,
      //   as: 'transfer',
      //   attributes: ['id', 'walletBalance', 'createdAt', 'updatedAt'],
      // },
    ],
  });
  res.status(201).json(result);
});
