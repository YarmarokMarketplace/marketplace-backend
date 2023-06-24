const { Category } = require("../db/models/categories");
const HttpError = require("../helpers/httpError");
const controllerWrapper = require("../utils/controllerWrapper");

const getAllCategories = async (req, res) => {
  
  const result = await Category.find({});
  if (result.length === 0) {
    throw HttpError.NotFoundError("Categories not found");
  }
  res.status(200).json({
    result,
  });
};

module.exports = {
  getAllCategories: controllerWrapper(getAllCategories),
};