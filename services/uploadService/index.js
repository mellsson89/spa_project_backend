const {FOLDER_IMG, FOLDER_FILES} = process.env;
const sharp = require('sharp');
const path = require("path");
const fs = require('fs/promises');

class UploadService {
    constructor(filePath, filename) {
        this.filePath = filePath;
        this.filename = filename;
    }

    async transformImg(filePath) {
        const url = path.join(FOLDER_IMG, this.filename);
        await sharp(filePath).resize(320,240).toFile(path.join(__dirname, '../../', url));
        await fs.unlink(filePath);
        return path.normalize(path.join('img',this.filename));
    }

    async transformFile(filePath) {
        const url = path.join(FOLDER_FILES, this.filename);
        await fs.rename(filePath, url);
        return path.normalize(path.join('files',this.filename));
    }

    async updateImg () {
      const urlImg = await this.transformImg(this.filePath);
      return urlImg;
    }

    async updateFile () {
        const urlFile = await this.transformFile(this.filePath);
        return urlFile;
    }


}


module.exports = UploadService;