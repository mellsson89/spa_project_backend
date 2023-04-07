const UploadService = require('../../services/uploadService');

const imgUpload = async (req, res, next) => {

    try {
        const {filename, path} = req.file;
        const uploadService = new UploadService(path, filename);
        const urlImg = await uploadService.updateImg();

        res.status(201).json({urlImg: urlImg});
    } catch (error) {
        next(error)
    }
}

module.exports=imgUpload;