require("dotenv").config();

const express = require('express');
const validateBody = require('../../../utils/validateBody');
const upload = require("../../../utils/upload");


const { addNotice, getNoticesByCategory } = require('../../../controllers/notices');
// const { getAllCategories} = require('../../../controllers/categories')
const { addNoticeSchema} = require('../../../db/models/notices');

const router = express.Router();

// router.get('/', getAllCategories);
router.get('/:category', getNoticesByCategory);
router.post('/', upload.array('photos', 10), validateBody(addNoticeSchema), addNotice);


module.exports = router;