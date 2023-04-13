const multer  = require('multer');
const {UPLOAD_DIR} = process.env;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_DIR)
    },
    filename: function (req, file, cb) {
        const  extensionFile = file.originalname.split('.')[1];
        const filename = file.originalname.split('.')[0];
        const uniqueSuffix = Date.now().toString();
        cb(null, `${uniqueSuffix}_${filename}.${extensionFile}`)
    }
})

const upload = multer({ storage: storage,
    limits:{ fileSize:900000},
    fileFilter : (req, file, cb)  => {
    if(file.mimetype.includes('image/gif') || file.mimetype.includes('image/jpeg') || file.mimetype.includes('image/png')) {
        return cb(null, true)
    }
        cb(new Error('Wrong format file !!!'))


}})

const uploadFile = multer({ storage: storage,
    limits:{ fileSize:100000},
    fileFilter : (req, file, cb)  => {
        if(file.mimetype.includes('text/plain')) {
            return cb(null, true)
        }
        cb(new Error('Wrong format file !!!'))

    }})

module.exports = {uploadImg: upload, uploadFile};