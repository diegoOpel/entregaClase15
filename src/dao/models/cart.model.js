import mongoose from "mongoose";

const cartCollection = "carts"

const productInCartSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true
  },
  quantity: {
    type: Number,
    required: true
  }
})
const cartSchema = new mongoose.Schema({
  products: {
    type: [productInCartSchema],
    required: true
  }
})

export const cartModel = mongoose.model(cartCollection,cartSchema)