import express from "express";
import { productUpload } from "../config/multerConfig.js";
import {
  createProduct,
  getProducts,
  updateProduct,
  listProducts,
  getProductDetails,
  deleteProduct,
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

// Update a product (only by vendor who owns it)
router.put("/:id", verifyVendor, updateProduct);

// Delete a product (only by vendor who owns it)
router.delete("/:id", verifyVendor, deleteProduct);
// Route for listing all products with filters (accessible to all users)
router.get('/', listProducts);

// Route for getting a specific product's details (accessible to all users)
router.get('/:id', getProductDetails);

export default router;
