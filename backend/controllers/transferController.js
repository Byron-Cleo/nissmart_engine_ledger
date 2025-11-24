const { User, Wallet, Transaction, Transfer } = require("./../models");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerController");
const log = require("../utils/log").log;
const { TRANSACTONTYPE, TRANSACTONSTATUS } = require("../utils/constants");

//Withdrawing Cash in user's Wallet
exports.transferCash = catchAsync(async (req, res, next) => {
  log.info(
    `"Transaction": "Transfer", "message": "Flow for Transfer Transaction"`
  );
  const { id: senderUserFK, receiverId, amount } = req.body;

  //The users' details for operations i.e SENDER AND RECEIVER
  const senderUser = await User.findOne({ where: { id: senderUserFK } });
  const receiverUser = await User.findOne({ where: { id: receiverId } });

  //check the users' wallet balance amount
  const senderUserWalletDetails = await senderUser.getWallet();
  const receiverUserWalletDetails = await receiverUser.getWallet();

  // users' balance amounts
  const senderWalletBalanceAmount = senderUserWalletDetails.walletBalance;
  const receiverWalletBalanceAmount = receiverUserWalletDetails.walletBalance;

  //scenaries of transfering funds because people are different.
  // sender must have money in thier wallet
  // the wallet can be with some money (FOR EXIXTING USER) or no money for (NEW USER)

  // 1. for new created user with no funds in their wallet.
  // the user NEEDS TO first deposits money in their wallet(THIS IS NOT DONEin the flow as hey will need to go to the deposit flow frst,
  // JUST RECORD THE TRANSFER AND SHOW THE USER TO TOP UP FIRST IN ORDER TO DO THE TRANSFER)

  //2. SCENARIO, where exixting user has money in their wallet hence ELIGIBALE to transfer money
  if (Number(senderWalletBalanceAmount) > 0) {
    //STEPS
    //1. TRANSFER TABLE. initiate transfer with PENDING STATUS to show transfer is about to start
    // SENDER, RECEIVER, AMOUNT as structure and PENDING STATUS
    const newTransfer = new Transfer({
      senderUserFK,
      receiverId,
      amount,
      transferStatus: TRANSACTONSTATUS.TRANSACTION_PENDING,
    });

    const inititatedTransfer = await newTransfer.save();

    //2. WALLET TABLE OPERATION :--(TRANSFER IN ACTION NOW)
    //---IF TRANSFER IS COMPLET ---TRANSACTION IS COMPLETE(which will be inserted in transaction table)
    //---IF TRANSFER IS FAILED --- TRANSACTION IS FAILED (which will be inserted in transaction table)
    //check the sender TRANSFER AMOUNT is LESS than their WALLET BALANCE
    //if less:true
    if (Number(senderWalletBalanceAmount) > Number(amount)) {
      // a.do TRANSFER_DEBIT: i.e sender --- walletBalance - transferAmount
      senderUserWalletDetails.walletBalance =
        Number(senderWalletBalanceAmount) - Number(amount);
      // b.do TRANSFER_CREDIT: i.e receiver --- walletBalance + tranferedAmount
      receiverUserWalletDetails.walletBalance =
        Number(receiverWalletBalanceAmount) + Number(amount);
    }
    //get previous wallentBalance amounts for both sender and receiver -- TO BE RECORDED IN THE TRANSACTION TABLE AS
    // INITAIL AMOUNTS BEFORE TANSACTIONS
    const senderWalletPreviuosBalanceAmount =
      senderUserWalletDetails.previous("walletBalance");
    const receiverWalletPreviuosBalanceAmount =
      receiverUserWalletDetails.previous("walletBalance");

    //save the new walletBalance Details now
    await senderUserWalletDetails.save();
    await receiverUserWalletDetails.save();

    //3. TRANSACTION TABLE OPERATION: the ledger
    // Insert TRANSFER DEBIT and mark as complete status
    const completedSenderDebitTransaction = new Transaction({
      userFK: senderUserFK,
      amount,
      initialBalance: Number(senderWalletPreviuosBalanceAmount),
      currentBalance:
        Number(senderWalletPreviuosBalanceAmount) - Number(amount),
      transactionType: TRANSACTONTYPE.TRANSACTION_TRANSFER_DEBIT,
      transactionStatus: TRANSACTONSTATUS.TRANSACTION_COMPLETED,
    });

    //save new  debit transaction
    const senderCompletedTransction =
      await completedSenderDebitTransaction.save();

    // Insert TRANSFER CREDIT and mark as complete status
    const completedReceiverCreditTransaction = new Transaction({
      userFK: receiverId,
      amount,
      initialBalance: Number(receiverWalletPreviuosBalanceAmount),
      currentBalance:
        Number(receiverWalletPreviuosBalanceAmount) + Number(amount),
      transactionType: TRANSACTONTYPE.TRANSACTION_TRANSFER_CREDIT,
      transactionStatus: TRANSACTONSTATUS.TRANSACTION_COMPLETED,
    });

    //save new  credit transaction
    const receiverCompletedTransction =
      await completedReceiverCreditTransaction.save();

    //4. TRANSFER. TABLE -- FINALLY, UPDATE pending initiated transfer as complete for the user
    const initiatedPendingTransfer = await Transfer.findOne({
      where: {
        senderUserFK,
        receiverId,
        amount,
        transferStatus: TRANSACTONSTATUS.TRANSACTION_PENDING,
      },
    });

    //update the table now to complete
    initiatedPendingTransfer.transferStatus =
      TRANSACTONSTATUS.TRANSACTION_COMPLETED;

    //save the change now
    const completedTransfer = await initiatedPendingTransfer.save();

    // respond back to the user with current balance after complete transfer details
    res.status(201).json(completedTransfer);
  }
});
