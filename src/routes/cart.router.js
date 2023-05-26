import { cartModel } from "../dao/models/cart.model.js";
import express from 'express';

const cartRouter = express.Router();

cartRouter.get('/:cartId', async (req,res)=>{
  const cartId = req.params.cartId
  try{
    let cart = await cartModel.findById(cartId)

    res.status(200).render("cart",{titulo: "Cart encontrado", cartId: cart._id, productsInCart: cart.productsInCart})
  }catch(error){
    console.log("Can't get carts with Mongoose "+error)
  }
})

cartRouter.post('/', async (req,res) => {
  let {products} = req.body
  products = JSON.parse(products)
  products.forEach(product => {
   if(!product.productId || !product.quantity){
     return res.status(400).send({status: 'error', error: 'incomplete values'})
   }
  }); 
  try{
    let cart = await cartModel.create({productsInCart: products})
    res.status(200).render("cart",{titulo: "Cart agregado", cartId: cart._id, productsInCart: [cart.productsInCart], cartProductsLength: cart.productsInCart.length})
  }
  catch(error){
    console.log("Can't post carts with Mongoose"+error)
  }
})

export default cartRouter