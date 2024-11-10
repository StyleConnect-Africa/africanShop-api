import multer from "multer";
import { multerSaveFilesOrg } from "multer-savefilesorg";

// Initialize multer with multerSaveFileOrg as the storage engine  //

// File type validation function
const fileFilter = (req, file, cb) => {
    // Accept images only with specific mime types
    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/gif'
    ) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and GIF images are allowed.'), false); // Reject the file
    }
};

export const productUpload =multer({
    storage:multerSaveFilesOrg({
        apiAccessToken:process.env.SAVEFILESORG_API_KEY,
        relativePath:'/africanShop/products/*',
        preservePath:true,
    
    }),
    fileFilter, // Attach file filter for validation
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit file size to 5 MB
    },
})