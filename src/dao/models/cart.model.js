import mongoose from "mongoose";

const cartCollection = "carts"

const productInCartSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true
  }
})
const cartSchema = new mongoose.Schema({
  productsInCart: [productInCartSchema]
})

export const cartModel = mongoose.model(cartCollection,cartSchema)