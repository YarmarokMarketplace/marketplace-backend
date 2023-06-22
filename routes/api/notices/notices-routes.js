require("dotenv").config();

const express = require('express');
const validateBody = require('../../../utils/validateBody');
const upload = require("../../../utils/upload");


const { getAllNotices, addNotice, getNoticesByCategory } = require('../../../controllers/notices');
const { addNoticeSchema} = require('../../../db/models/notices');

const router = express.Router();

router.get('/', getAllNotices);
router.get('/:category', getNoticesByCategory);
router.post('/', upload.array('photos', 4), validateBody(addNoticeSchema), addNotice);


module.exports = router;