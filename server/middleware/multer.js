import multer from 'multer';

const upload = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
 }); 

 export default upload // 'image' is the field name in the form