const express = require('express');

// const isValidId = require('../../../middlewares/isValidId');
const validateBody = require('../../../utils/validateBody');
const upload = require("../../../utils/upload");

const { getAllNotices, getNoticeById, addNoticeByCategory, removeNotice} = require('../../../controllers/notices');
const { addNoticeSchema} = require('../../../db/models/notices');

const router = express.Router();

router.get('/', getAllNotices);
// router.get('/:noticeId', isValidId, getNoticeById);
router.post('/', upload.single('photo'), validateBody(addNoticeSchema), addNoticeByCategory);
// router.delete('/:noticeId', removeNotice);

module.exports = router;