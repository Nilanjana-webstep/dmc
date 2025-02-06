import multer from 'multer';
import path from 'path'
import CustomError from '../utils/util.customError.js';

const adharStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/upload/adharPhoto/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+'.jpg')
    }
})


const grievanceStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/upload/grievancePhoto/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname + '-' + uniqueSuffix+'.jpg')
    }
})



const fileFilter = (req, file, cb) => {

    const extName = path.extname(file.originalname); 
    
    if ( extName == '.jpg' ) {
        cb(null, true);
    } else {
        cb(new CustomError('Unsupported file type',401), false); 
    }
};

const grievanceFileFilter = (req, file, cb) => {

    const extName = path.extname(file.originalname); 
    
    if (extName == '.pdf' || extName == '.jpg' ) {
        cb(null, true);
    } else {
        cb(new CustomError('Unsupported file type',401), false); 
    }
};


const csvStorage = multer.diskStorage({
    destination: './public/upload/csv/',
    filename: (req, file, cb) => {
        cb(null, file.originalname + '-' + Date.now() + '.csv');
    }
});


export const uploadCsv = multer({ storage: csvStorage });

export const uploadAdhar = multer({ storage: adharStorage, fileFilter:fileFilter,limits: { fileSize : 1 * 1024 * 1024} });

export const uploadGrievancePhoto = multer({ storage: grievanceStorage, fileFilter:grievanceFileFilter,limits: { fileSize : 1 * 1024 * 1024} });





