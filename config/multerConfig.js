import multer from "multer";
import { multerSaveFilesOrg } from "multer-savefilesorg";

// File type validation function
const fileFilter = (req, file, cb) => {
  // Accept images only with specific mime types
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/gif"
  ) {
    cb(null, true); // Accept the file
  } else {
    cb(
      new Error(
        "Invalid file type. Only JPEG, PNG, and GIF images are allowed."
      ),
      false
    ); // Reject the file
  }
};

// File type validation function for profile pictures
const profileFileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png'
    ) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Invalid file type. Only JPEG and PNG images are allowed.'), false); // Reject the file
    }
};

// Multer configuration for profile picture uploads
export const profileUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: '/africanShop/profiles/*',
        preservePath: true,
    }),
    fileFilter: profileFileFilter,
    limits: {
        fileSize: 8 * 1024 * 1024, // Limit file size to 8 MB
    },
});
// Multer configuration for product uploads
export const productUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: '/africanShop/products/*',
        preservePath: true,
    }),
    fileFilter, // Attach file filter for validation
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit file size to 5 MB
    },
});

