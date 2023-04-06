// const Comment = require('../../models/comment')
const UploadService = require('../../services/uploadService');

const imgUpload = async (req, res, next) => {

    try {
        console.log(req.file)
        const {filename, path} = req.file;
        const uploadService = new UploadService(path, filename);
        const urlImg = await uploadService.updateImg();
        res.status(201).json({urlImg: urlImg});
        // const {parent_id} = req.body;
        // if(parent_id) {
        //     const nestedComment = await Comment.create({...req.body})
        //     return res.status(201).json({data: nestedComment});
        // }
        //
        // const newComment = await Comment.create({...req.body})
        // res.status(201).json({data: newComment});
    } catch (error) {
        next(error)
    }
}

module.exports=imgUpload;