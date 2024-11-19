import Product from "../model/Product.js";
// Create Product
   export const createProduct = async (req, res) => {
     try {
       console.log("Uploaded files:", req.files); // Log the uploaded files
       const images = req.files.map((file) => file.filename); // Get image URLs
       const newProduct = new Product({
         ...req.body,
         vendor: req.user.id,
         images,
       });
       await newProduct.save();
       res.status(201).json({
        message:"Product added successfully",
        newProduct
       }
      );
     } catch (error) {
       res.status(400).json({ message: error.message });
     }
   };
// Get Products with Filtering
export const getProducts = async (req, res) => {
  try {
    const filters = req.query; // Example: category, price range
    const products = await Product.find(filters);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product.vendor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized action" });
    }
    Object.assign(product, req.body);
    await product.save();
    res.status(200).json({message:"Product updated successfully",product});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the current user is the vendor of the product
    if (product.vendor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You do not have permission to delete this product' });
    }

    // Use deleteOne to remove the product
    await product.deleteOne();

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};

export const listProducts = async (req, res) => {
  try {
    const { category, priceMin, priceMax, vendor } = req.query; // Extract query params for filtering

    let filter = {};

    if (category) {
      filter.category = category;
    }

    if (priceMin || priceMax) {
      filter.price = {};
      if (priceMin) filter.price.$gte = priceMin;
      if (priceMax) filter.price.$lte = priceMax;
    }

    if (vendor) {
      filter.vendor = vendor; // Filter by vendor if specified
    }

    const products = await Product.find(filter).populate(
      "vendor",
      "name email"
    );

    return res.status(200).json(products);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error listing products", error: error.message });
  }
};

// Get details of a specific product
export const getProductDetails = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId).populate(
      "vendor",
      "name email"
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Error fetching product details",
        error: error.message,
      });
  }
};

export const getProductsWithVendorInfo = async (req, res) => {
  try {
    const products = await Product.find().populate('vendor', 'storeName');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};