const { nanoid } = require("nanoid");
const path = require('path');
const fs = require('fs/promises');

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


const addNoticeByCategory = async (req, res) => {
    console.log(req.body);
    const photosDir = path.join(__dirname, "../", "public", "photos");
    const { path: tempUpload, filename } = req.file;
    const uniqueId = nanoid();

    const photoName = `${uniqueId}_${filename}`;
    const resultUpload = path.join(photosDir, photoName);
    console.log(tempUpload);
    console.log(resultUpload);
    fs.rename(tempUpload, resultUpload);
    const photo = path.join("photos", photoName);

    const result = await Notice.create({...req.body, photo});

  res.status(201).json({
    result,
  });  
};

module.exports = {
  getAllNotices: controllerWrapper(getAllNotices),
  getNoticesByCategory: controllerWrapper(getNoticesByCategory),
  addNoticeByCategory: controllerWrapper(addNoticeByCategory),
};