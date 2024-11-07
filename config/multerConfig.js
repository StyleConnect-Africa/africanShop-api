import multer from "multer";
import { multerSaveFilesOrg } from "multer-savefilesorg";

// Initialize multer with multerSaveFileOrg as the storage engine  //

export const productUpload =multer({
    storage:multerSaveFilesOrg({
        apiAccessToken:process.env.SAVEFILESORG_API_KEY,
        relativePath:'/africanShop/products/*',
        preservePath:true,
    })
})