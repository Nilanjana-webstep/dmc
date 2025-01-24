import multer from 'multer';
import path from 'path'
import CustomError from '../utils/util.customError.js';

const adharStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/adhar/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+'.pdf')
    }
})



const fileFilter = (req, file, cb) => {

    const extName = path.extname(file.originalname); 
    

    // console.log("the ext name is : ",extName);
    
    if (extName == '.pdf' || extName == '.jpg' || extName == '.jpeg' ) {
        cb(null, true);
    } else {
        cb(new CustomError('Unsupported file type',401), false); 
    }
};


const csvStorage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.csv');
    }
});


export const uploadCsv = multer({ storage: csvStorage });

export const uploadAdhar = multer({ storage: adharStorage, fileFilter:fileFilter,limits: { fileSize : 1 * 1024 * 1024} });





