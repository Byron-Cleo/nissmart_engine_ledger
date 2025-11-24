const { User, Wallet, Transaction } = require("./../models");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerController");
const log = require("../utils/log").log;
const { TRANSACTONTYPE, TRANSACTONSTATUS } = require("../utils/constants");

//Deposit Cash in user's Wallet
exports.depositCash = catchAsync(async (req, res, next) => {
  log.info(
    `"Transaction": "Deposit", "message": "Flow for Deposit Transaction"`
  );
  const { id: userId, amount } = req.body;

  //The user's details on whose deposit is transacted
  const user = await User.findOne({ where: { id: userId } });

  //check the user's wallet balance account to determine if a new transaction or a top up
  const userWalletDetails = await user.getWallet();
  const userWalletBalanceAmount = userWalletDetails.walletBalance;

  //SCENARIO WHEN NEW USER IS created and has nothing in theier wallet since
  // one user has one wallet in order to do various operations
  //PUTING MONEY FOR THE FIRST TIME
  if (Number(userWalletBalanceAmount) === 0) {
    let newTransaction;

    //1. Initiate transaction with pending status, amount to deposit and transactionType
    log.info(
      `"Transaction": "Deposit", "message": "Pending Deposit Transaction Initiated"`
    );
    newTransaction = new Transaction({
      userFK: userId,
      amount,
      transactionType: TRANSACTONTYPE.TRANSACTION_DEPOSIT,
      transactionStatus: TRANSACTONSTATUS.TRANSACTION_PENDING,
    });

    const inititatedTransaction = await newTransaction.save();

    //2. Process Deposit
    log.info(
      `"Transaction": "Deposit", "message": "Updated Transaction: amount being deposited."`
    );
    //a. Get find the user's wallet to update the balance
    const userWallet = await user.getWallet();

    //b. DEPOSIT AMOUNT TO the walletBalance and save
    //on first balance deposit
    userWallet.walletBalance = +amount;
    await userWallet.save();

    log.info(
      `"Transaction": "Deposit", "message": "Updating Transaction to Complete Initiated"`
    );
    const initiatedPendingTransaction = await Transaction.findOne({
      where: {
        userFK: userId,
        transactionType: TRANSACTONTYPE.TRANSACTION_DEPOSIT,
        transactionStatus: TRANSACTONSTATUS.TRANSACTION_PENDING,
      },
    });

    initiatedPendingTransaction.currentBalance = Number(amount);
    initiatedPendingTransaction.transactionStatus =
      TRANSACTONSTATUS.TRANSACTION_COMPLETED;

    const completedTransaction = await initiatedPendingTransaction.save();
    log.info(
      `"Transaction": "Deposit", "message": "Deposit Transaction Completed"`
    );

    res.status(201).json(completedTransaction);
  }

  // scenario when already EXIXTING USER has money in their wallet hence just topping up
  //ADDING MONEY AGAIN AND AGAIN
  if (Number(userWalletBalanceAmount) > 0) {
    let newTransaction;

    //1. Now mark transaction complete by to update the pending status, amount to deposit and transactionType
    log.info(
      `"Transaction": "Deposit", "message": "Pending Deposit Transaction Initiated"`
    );
    newTransaction = new Transaction({
      userFK: userId,
      amount,
      transactionType: TRANSACTONTYPE.TRANSACTION_DEPOSIT,
      transactionStatus: TRANSACTONSTATUS.TRANSACTION_PENDING,
    });

    const inititatedTransaction = await newTransaction.save();

    //2. Process Deposit
    log.info(
      `"Transaction": "Deposit", "message": "Updated Transaction: amount being deposited."`
    );
    //a. DEPOSIT AMOUNT TO the walletBalance and UPDATE WITH TOPPED UP AMOUNT
    userWalletDetails.walletBalance =
      Number(userWalletBalanceAmount) + Number(amount);

    //on GET THE PREVIOUS BALANCE AMOUNT
    const userWalletPreviuosBalanceAmount =
      userWalletDetails.previous("walletBalance");

    await userWalletDetails.save();

    log.info(
      `"Transaction": "Deposit", "message": "Updating Transaction to Complete Initiated"`
    );

    const initiatedPendingTopUpTransaction = await Transaction.findOne({
      where: {
        userFK: userId,
        transactionType: TRANSACTONTYPE.TRANSACTION_DEPOSIT,
        transactionStatus: TRANSACTONSTATUS.TRANSACTION_PENDING,
      },
    });

    initiatedPendingTopUpTransaction.initialBalance = Number(
      userWalletPreviuosBalanceAmount
    );
    initiatedPendingTopUpTransaction.currentBalance =
      Number(userWalletPreviuosBalanceAmount) + Number(amount);
    initiatedPendingTopUpTransaction.transactionStatus =
      TRANSACTONSTATUS.TRANSACTION_COMPLETED;

    const completedTopUpTransaction =
      await initiatedPendingTopUpTransaction.save();

    log.info(
      `"Transaction": "Deposit", "message": "Deposit Transaction Completed"`
    );
    res.status(201).json(completedTopUpTransaction);
  }
});
