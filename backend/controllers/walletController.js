const { Wallet } = require("./../models");
const catchAsync = require('./../utils/catchAsync');


exports.getWalletBalanceById = catchAsync(async (req, res, next) => {
  const walletBallance = await Wallet.findOne({
    where: { id: req.params.user_id },
  });
  res.status(200).json(walletBallance);
});
