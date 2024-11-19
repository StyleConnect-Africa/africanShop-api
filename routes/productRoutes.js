import express from "express";
import { productUpload } from "../config/multerConfig.js";
import {
  createProduct,
  getProducts,
  updateProduct,
  listProducts,
  getProductDetails,
  deleteProduct,
  getProductsWithVendorInfo,
} from "../controllers/productController.js";
import { verifyVendor } from "../middlewares/authMiddleware.js";
import { validateProduct } from "../validators/validateProduct.js";
const router = express.Router();

// Create a new product
router.post(
  "/create",
 verifyVendor,
 validateProduct,
  productUpload.array("images", 4),
  createProduct
);

// Get all products or by filters (for buyers)
router.get("/", getProducts);
// Route for getting products with vendor information
router.get('/vendor-info', verifyVendor, getProductsWithVendorInfo);

// Update a product (only by vendor who owns it)
router.patch("/:id", verifyVendor, updateProduct);

// Delete a product (only by vendor who owns it)
router.delete("/:id", verifyVendor, deleteProduct);
// Route for listing all products with filters (accessible to all users)
router.get('/list', listProducts);

// Route for getting a specific product's details (accessible to all users)
router.get('/:id', getProductDetails);
export default router;
