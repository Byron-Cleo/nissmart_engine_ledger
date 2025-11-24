const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

//Create one Customer
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const result = await Model.create(req.body);

    res.status(201).json(result);
  });

//For Listing all the Customers
exports.getAll = (Model) =>  
  catchAsync(async (req, res, next) => {
    //The findAndCountAll method returns an object with two properties:
    //count: total number of records matching the query and
    //rows(suppleiers): obtained records
    //NB: ORDER BY ID in DESCENDING(Largest to Smallest i.e newest to oldest)
    const { count, rows: results } = await Model.findAndCountAll({
      order: [['id', 'DESC']],
    });

    //SEND RESPONSE
    res.status(200).json({
      count: count,
      results,
    });
  });

//For Details Page
exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;

    const result = await Model.findOne({ where: { id } });

    if (!result) {
      return next(new AppError('There is no Record with that ID', 400));
    }

    res.status(200).json(result);
  });

//DELETE of CRUD
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const record = await Model.findOne({ where: { id } });

    if (!record) {
      return next(new AppError('No Record Found with That ID', 404));
    }

    if (record) {
      await record.destroy();

      const message = 'Successfully Deteled';

      res.status(200).json(message);
    }

  });
