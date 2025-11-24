const { User, Wallet, Transaction } = require("./../models");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerController");
const log = require("../utils/log").log;
const { TRANSACTONTYPE, TRANSACTONSTATUS } = require("../utils/constants");

//Withdrawing Cash in user's Wallet
exports.withdrawCash = catchAsync(async (req, res, next) => {
  log.info(
    `"Transaction": "Withdraw", "message": "Flow for Withdraw Transaction"`
  );
  // the user comes wit the request to want to withdraw cash
  const { id: userId, amount } = req.body;

  //The user's details on whose withdraw is transacted
  const user = await User.findOne({ where: { id: userId } });

  //check the user's wallet balance account to determine withdraw
  const userWalletDetails = await user.getWallet();
  const userWalletBalanceAmount = userWalletDetails.walletBalance;

  // scenarios when existing user with withdraws money from their wallet
  if (Number(userWalletBalanceAmount) > 0) {
    let newTransaction;

    //1. Initiate withdraw transaction with pending status, amount to withdraw and transactionType
    log.info(
      `"Transaction": "Withdraw", "message": "Pending Withdraw Transaction Initiated"`
    );
    newTransaction = new Transaction({
      userFK: userId,
      amount,
      transactionType: TRANSACTONTYPE.TRANSACTION_WITHDRAW,
      transactionStatus: TRANSACTONSTATUS.TRANSACTION_PENDING,
    });

    const inititatedTransaction = await newTransaction.save();

    //2. PROCESSING WITHDRAW: Process Withdraw
    log.info(
      `"Transaction": "Withdraw", "message": "Updated Wallet Ballance after withdraw request."`
    );
    //a. WITHDRAW IN ACTION NOW-----DEDUCT AMOUNT FROM the walletBalance and UPDATE WITH TOPPED UP AMOUNT
    if (Number(userWalletBalanceAmount) > Number(amount)) {
      userWalletDetails.walletBalance =
        Number(userWalletBalanceAmount) - Number(amount);
    }

    //on GET THE PREVIOUS Initial BALANCE AMOUNT after deducting
    const userWalletPreviuosBalanceAmount =
      userWalletDetails.previous("walletBalance");

    await userWalletDetails.save();

    log.info(
      `"Transaction": "Withdraw", "message": "Updating Transaction to Complete Initiated"`
    );
    //Find the pending initiaed transaction to UPDATE THE RECORD COMPLETE since withdraw has been processed
    const initiatedPendingWithdrawTransaction = await Transaction.findOne({
      where: {
        userFK: userId,
        transactionType: TRANSACTONTYPE.TRANSACTION_WITHDRAW,
        transactionStatus: TRANSACTONSTATUS.TRANSACTION_PENDING,
      },
    });

    //now marking the fields to record the ledger with withdrawn detail operations
    initiatedPendingWithdrawTransaction.initialBalance = Number(
      userWalletPreviuosBalanceAmount
    );
    initiatedPendingWithdrawTransaction.transactionStatus =
      TRANSACTONSTATUS.TRANSACTION_COMPLETED;

    //KEY NOTE HERE
    //this is to avoid negative records in the db where current value was updated fr when user tried to make withdraw with
    //higher amount than their wallet balance
    //PREVIOUS WALLET BALLANCE IS THE ACTUAL AMOUNT
    //i.e 700(actual wallet balance)700 - (more higher unexpected amonunt)710---- NOT ALLOW AS WILL CREATE NEGATIVE VALUES
    if (Number(userWalletPreviuosBalanceAmount) > Number(amount)) {
      initiatedPendingWithdrawTransaction.currentBalance =
        Number(userWalletPreviuosBalanceAmount) - Number(amount);

      const completedWithdrawTransaction =
        await initiatedPendingWithdrawTransaction.save();
      res.status(201).json(completedWithdrawTransaction);
      log.info(
        `"Transaction": "Withdraw", "message": "Withdraw Transaction Completed"`
      );
    }
  }

  //scenarios when COMPLETE NEW USER makes unexpected withdrawal(NOT RECOMMENDED BUT STILL RECORDED)
  if (
    Number(userWalletBalanceAmount) === 0 ||
    Number(amount) > Number(userWalletBalanceAmount)
  ) {
    let newTransaction;

    log.info(
      `"Transaction": "DepoWithdrawsit", "message": "Pending Deposit Transaction Initiated"`
    );
    newTransaction = new Transaction({
      userFK: userId,
      amount,
      transactionType: TRANSACTONTYPE.TRANSACTION_WITHDRAW,
      transactionStatus: TRANSACTONSTATUS.TRANSACTION_PENDING,
    });

    const inititatedTransaction = await newTransaction.save();

    //START: OF RECORDING THE 0 amount WITHDRAW PROCESS
    //2. Process Withdraw
    log.info(
      `"Transaction": "Deposit", "message": "Updated Transaction: amount being deposited."`
    );
    //a. Get find the user's wallet to update the balance
    const userWallet = await user.getWallet();

    //b. DEPOSIT AMOUNT TO the walletBalance and save
    if (Number(amount) > Number(userWalletBalanceAmount)) {
      // on first balance deposit
      userWallet.walletBalance = Number(userWalletBalanceAmount);
      await userWallet.save();
    }

    if (Number(userWalletBalanceAmount) === 0) {
      // on first balance deposit
      userWallet.walletBalance = String(0);
      await userWallet.save();
    }

    log.info(
      `"Transaction": "Deposit", "message": "Updating Transaction to Complete Initiated"`
    );
    const initiatedPendingNoCashTransaction = await Transaction.findOne({
      where: {
        userFK: userId,
        transactionType: TRANSACTONTYPE.TRANSACTION_WITHDRAW,
        transactionStatus: TRANSACTONSTATUS.TRANSACTION_PENDING,
      },
    });

    //confirm here if the ammont is exactly 0 and save wth the zero and not with the
    if (Number(amount) > Number(userWalletBalanceAmount)) {
      initiatedPendingNoCashTransaction.initialBalance = Number(
        userWalletBalanceAmount
      );
      initiatedPendingNoCashTransaction.currentBalance = Number(
        userWalletBalanceAmount
      );
      initiatedPendingNoCashTransaction.transactionStatus =
        TRANSACTONSTATUS.TRANSACTION_PENDING;

      const completedNoCashTransaction =
        await initiatedPendingNoCashTransaction.save();

      //RESPOND GIVE BACK message to the user to top up first to make withdrawal
      const completedNoCashTransactionMessage = {
        message: "NO! Trying to withdraw more Funds than your Current Wallet Balance.",
      };

      res.status(201).json(completedNoCashTransactionMessage);
    }

    //REST OF CODE WHEN BALANCE WAS ACTUALLY 0 and NO withdrawal was made for sure!!
    initiatedPendingNoCashTransaction.initialBalance = String(amount);
    initiatedPendingNoCashTransaction.currentBalance = String(amount);
    initiatedPendingNoCashTransaction.transactionStatus =
      TRANSACTONSTATUS.TRANSACTION_PENDING;

    // const completedNoCashTransaction =
    //   await initiatedPendingNoCashTransaction.save();
    log.info(
      `"Transaction": "Deposit", "message": "Deposit Transaction Completed"`
    );

    //RESPOND GIVE BACK message to the user to top up first to make withdrawal
    const completedNoCashTransactionMessage = {
      message: "No Funds in Your Wallet, Top Up First With Cash.",
    };

    res.status(201).json(completedNoCashTransactionMessage);
  }
});
