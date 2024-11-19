// models/Cart.js
import mongoose from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";
const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now },
});
cartSchema.plugin(toJSON);
export default mongoose.model("Cart", cartSchema);
