const { Transaction, User } = require("./../models");
const catchAsync = require("./../utils/catchAsync");

exports.viewTransactionHistory = catchAsync(async (req, res, next) => {
  const transactionsHistory = await Transaction.findAll({
    where: { userFK: req.params.user_id },
    include: [
      {
        model: User,
        as: "user",
        attributes: ["firstName", "lastName",],
      },
    ],
  });
  res.status(200).json(transactionsHistory);
});
