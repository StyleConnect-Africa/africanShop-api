import mongoose from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const categoryMapping = {
  "Clothing": [
    "Men’s Wear",
    "Women’s Wear",
    "Kids’ Wear"
  ],
  "Accessories": [
    "Jewelry",
    "Headwear",
    "Bags & Purses",
    "Footwear"
  ],
  "Fabric & Materials": [
    "Ankara Prints",
    "Kente Cloth",
    "Mud Cloth",
    "Adire",
    "Aso Oke"
  ],
  "Art Wear": [
    "Painted Clothing",
    "Printed Designs"
  ],
  "Crafts & Gifts": [
    "Handmade Crafts",
    "Gift Sets",
    "Cultural Souvenirs"
  ]
};

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: Object.keys(categoryMapping), // Main categories
      required: true,
    },
    subcategory: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          // Validate that the subcategory belongs to the category
          return categoryMapping[this.category].includes(value);
        },
        message: props => `${props.value} is not a valid subcategory for ${this.category}`
      }
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
