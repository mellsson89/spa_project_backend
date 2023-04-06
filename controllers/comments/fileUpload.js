// const Comment = require('../../models/comment')
const UploadService = require('../../services/uploadService')

const fileUpload = async (req, res, next) => {

    try {
        const {filename, path} = req.file;
        const uploadService = new UploadService(path, filename);
        const urlFile = await uploadService.updateFile();
        res.status(201).json({urlFile: urlFile});
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

module.exports=fileUpload;