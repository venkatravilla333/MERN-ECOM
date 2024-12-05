
// var product = {
//   name: 'apple',
//   price: 200
// }

const Product = require("../models/productModel.js")
const APIFilters = require("../utils/apiFilters.js")
const ErrorHandler = require("../utils/errorHandler.js")

//controller for create product in db

async function createProduct(req, res, next) {
  let product = await Product.create(req.body)
  if (!product) {
    // res.status(404).json({
    //  message: 'Product not created'
    // })
  return next(new ErrorHandler('Product not created', 404))
    
  }
  res.status(201).json({
    product
  })
   console.log(product)

}

//controller for get all products from db

async function getProducts(req, res, next) {

  let apiFilters = new APIFilters(Product, req.query).search().filters()
  let products = await apiFilters.query
  let totalproducts = products.length
  

  // let products = await Product.find()
  if (!products) {
    // res.status(404).json({
    //   message: 'no products in db'
    // })
    return next(new ErrorHandler('Products not found', 404))
  }
  res.status(200).json({
    totalproducts,
    products
  })
  console.log(products)
}

//controller for get single product details from db

async function getProductDetails(req, res, next) {

  let product = await Product.findById(req.params.id)
  if (!product) {
    // res.status(404).json({
    //   message: 'product not found in db'
    // })
    return next(new ErrorHandler('Product not found', 404))
  }
  res.status(200).json({
    product
  })
  console.log(product)
}

//controller for update product in db
async function updateProduct(req, res) {

  let product = await Product.findById(req.params.id)
  if (!product) {
    res.status(404).json({
      message: 'product not found in db'
    })
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, { new : true})
  res.status(200).json({
    product
  })
  console.log(product)
}

//controller for delete product in db
async function deleteProduct(req, res) {

  let product = await Product.findById(req.params.id)
  if (!product) {
    res.status(404).json({
      message: 'product not found in db'
    })
  }
  await Product.deleteOne()

  res.status(200).json({
    message: 'Product deleted from DB'
  })
}

module.exports = { createProduct, getProducts, getProductDetails, updateProduct, deleteProduct}