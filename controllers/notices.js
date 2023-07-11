const { Notice } = require("../db/models/notices");
const HttpError = require("../helpers/httpError");
const controllerWrapper = require("../utils/controllerWrapper");

const getAllNotices = async (req, res) => {
  const { page = 1, limit = 9 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Notice.find({}, "", {
    skip,
    limit: Number(limit),
  }).sort({ createdAt: -1 });

  if (result.length === 0) {
    throw HttpError.NotFoundError("Notices not found");
  }

  const totalResult = await Notice.count();
  const totalPages = Math.ceil(totalResult / limit);

  res.status(200).json({
    totalResult,
    totalPages,
    page: Number(page),
    limit: Number(limit),
    result,
  });
};

const getNoticesByCategory = async (req, res) => {
  const { page = 1, limit = 9} = req.query;
  const { category } = req.params;
  const skip = (page - 1) * limit;

  const result = await Notice.find({ category }, "", {
       skip,
       limit: Number(limit),
     }).sort({ createdAt: -1 });

    if (result.length === 0) {
      throw HttpError.NotFoundError("Notices not found");
    }

  const totalResult = result.length;
  const totalPages = Math.ceil(totalResult / limit);

  res.status(200).json({
     totalResult,
     totalPages,
     page: Number(page),
     limit: Number(limit),
    result,
  });
};

const addNotice = async (req, res) => {
  const uploaded = req.files.map(reqfile => reqfile.location);
  const result = await Notice.create({...req.body, photos: uploaded});

  res.status(201).json({
    result,
  });  
};

const getNoticeById = async (req, res) => {
  const { id } = req.params;

  const notice = await Notice.findById(id);
  if (!notice) {
    throw HttpError.NotFoundError("Notice not found");
  }
  res.status(201).json({
    data: notice,
  });
};

module.exports = {
  getAllNotices: controllerWrapper(getAllNotices),
  getNoticesByCategory: controllerWrapper(getNoticesByCategory),
  addNotice: controllerWrapper(addNotice),
  getNoticeById: controllerWrapper(getNoticeById),
};