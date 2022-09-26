const Class = require("../models/classModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllClasses = catchAsync(async (req, res) => {
  const classes = await Class.find();
  res.status(200).json({
    status: "success",
    results: classes.length,
    data: {
      classes,
    },
  });
});
exports.createClass = catchAsync(async (req, res) => {
  const newClasses = await Class.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      classes: newClasses,
    },
  });
});

exports.getClass = catchAsync(async (req, res, next) => {
  const classroom = await Class.findById(req.params.id);

  if (!classroom) {
    return next(new AppError("No class found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      classroom,
    },
  });
});
exports.updateClass = catchAsync(async (req, res, next) => {
  const classroom = await Class.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    // (để nó sẽ trả về document mới nhất)
    runValidators: true,
    // (có chạy trình validate)
  });

  if (!classroom) {
    return next(new AppError("No class found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      classroom,
    },
  });
});
exports.deleteClass = catchAsync(async (req, res, next) => {
  const classroom = await Class.findByIdAndDelete(req.params.id);
  if (!classroom) {
    return next(new AppError("No class found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
