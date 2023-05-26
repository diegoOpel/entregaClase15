import express from "express"
import { productsModel } from "../dao/models/products.model.js"
//import { productManager } from '../dao/productManager'
const viewsRouter = express.Router()

viewsRouter.get('/', async (req,res)=>{
  const {limit} = req.query
  try{
    if(limit){
      let products = await productsModel.find().limit(limit).lean()
      res.status(200).render('index',{titulo:"Productos con límite",products: products})
    }
    let products = await productsModel.find().lean()
    res.status(200).render('index',{titulo:"Productos",products: products})
  }
  catch(error){
    console.log("Can't get products with Mongoose"+error)
  }
});

viewsRouter.get('/:productId', async (req, res)=>{
  const productId = req.params.productId
  try{
    let product = await productsModel.findById(productId).lean();
    res.status(200).render('index',{titulo:"Producto individual",products: [product]})
  }
  catch(error){
    console.log("Can't get products with Mongoose "+error)
  }
})

viewsRouter.post('/', async (req, res)=>{
  let {title, description, code, price, status, stock, category, thumbnails} = req.body
  if(!title || !description || !price || !stock || !category || !code || !thumbnails || !status){
    return res.status(400).send({status: 'error', error: 'incomplete values'})
  }
  try{
    let result = await productsModel.create({
      title, description, code, price, status, stock, category, thumbnails
    })
    res.status(200).render('index',{titulo:"Productos agregado",products: result})
  }
  catch(error){
    console.log("Can't post products with Mongoose"+error)
  }
})

viewsRouter.put('/:productId', async (req,res)=>{
  const id = req.params.productId
  const itemsToUpdate = req.body 
  try{
    let product = await productsModel.findByIdAndUpdate(id, itemsToUpdate)
    res.status(200).render('index',{titulo:"Producto actualizado",products: product})
  }
  catch(error){
    console.log("Can't put products with Mongoose"+error)
  }
})


viewsRouter.delete('/:productId', async (req,res)=>{
  const id = req.params.productId
  try{
    let product = await productsModel.findByIdAndDelete(id)
    res.status(200).render('index',{titulo:"Producto eliminado",products: product})
  }
  catch(error){
    console.log("Can't put products with Mongoose"+error)
  }
})

export default viewsRouter