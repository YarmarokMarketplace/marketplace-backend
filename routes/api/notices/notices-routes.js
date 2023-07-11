require("dotenv").config();

const express = require('express');
const validateBody = require('../../../utils/validateBody');
const upload = require('../../../utils/upload');
const isValidId = require('../../../middlewares/isValidId');

const { addNotice, getNoticesByCategory, removeNotice } = require('../../../controllers/notices');
const { addNoticeSchema} = require('../../../db/models/notices');

const router = express.Router();

router.get('/:category', getNoticesByCategory);
router.post('/', upload.array('photos', 6), validateBody(addNoticeSchema), addNotice);
router.delete('/notice/:id', isValidId, removeNotice);


module.exports = router;