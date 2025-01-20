
import multer from 'multer';



// Set up storage engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.csv');
    }
});

// Initialize upload
const upload = multer({ storage: storage });

export default upload;



