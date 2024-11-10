import mongoose from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: [
        "Men’s Wear",
        "Women’s Wear",
        "Kids’ Wear",
        "Bags & Purses",
        "Footwear",
        "Ankara Prints",
        "Kente Cloth",
        "Mud Cloth",
        "Adire",
        "Aso Oke",
        "Painted Clothing",
        "Printed Designs",
      ],
      required: true,
    },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    images: [{ type: String }],
  },
  { timestamps: true }
);
productSchema.plugin(toJSON);
export default mongoose.model("Product", productSchema);
