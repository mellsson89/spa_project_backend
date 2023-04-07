const UploadService = require('../../services/uploadService')

const fileUpload = async (req, res, next) => {

    try {
        const {filename, path} = req.file;
        const uploadService = new UploadService(path, filename);
        const urlFile = await uploadService.updateFile();
        res.status(201).json({urlFile: urlFile});

    } catch (error) {
        next(error)
    }
}

module.exports=fileUpload;