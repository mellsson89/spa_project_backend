const express = require('express');
const router = express.Router();
const {addComment,getAllComments, imgUpload, fileUpload} = require('../../controllers')
const {uploadImg, uploadFile} = require('../../middlewares/upload');
const validations = require('../../middlewares/validations');
const {commentSchema} = require('../../middlewares/validation')

router.post('/', validations(commentSchema), addComment);
router.get('/', getAllComments);
router.post('/uploadImg', uploadImg.single('uploadImg'), imgUpload);
router.post('/uploadFile', uploadFile.single('uploadFile'), fileUpload);

module.exports = router
