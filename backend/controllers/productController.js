
// var product = {
//   name: 'apple',
//   price: 200
// }

const Product = require("../models/productModel.js")
const APIFilters = require("../utils/apiFilters.js")
const ErrorHandler = require("../utils/errorHandler.js")

//controller for create product in db

async function createProduct(req, res, next) {
  

   req.body.user = req.user._id
    
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

  let resPerPage = 5
  
  let apiFilters = new APIFilters(Product, req.query).search().filters()
  let products = await apiFilters.query
  let totalproducts = products.length
  apiFilters.pagination(resPerPage)
  products = await apiFilters.query.clone()
  console.log(products)
  
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



//controller for create/update reveiw

async function createReview(req, res, next) {

  let { rating, comment, productId } = req.body
  console.log(req.body)
  
  let review = {
    user: req.user._id,
    rating: Number(rating),
    comment
  }

  let product = await Product.findById(productId)
  console.log(product)

  if (!product) {
    return next(new ErrorHandler('product not found', 404))
  }

  let isReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString())

  console.log('hello', isReviewed)
  
  if (isReviewed) {
    product.reviews.forEach((reveiw) => {
      if (reveiw.user.toString() === req.user._id.toString()) {
        reveiw.rating = rating
        reveiw.comment = comment
      }
    })
    
  } else {
    console.log('else')
    product.reviews.push(review)
    product.noOfReviews = product.reviews.length
    // console.log(product.reviews)
    // console.log(product.noOfReviews)
  }

  console.log(product.reviews.length )

  product.ratings = product.reviews.rating === 0 ? 0 : product.reviews.reduce((acc, review) => review.rating + acc, 0) / product.reviews.length
  

  await product.save({validateBeforeSave: false})
  
  return res.status(200).json({
    success: true,
    product
 })
}

//controller for getting all reviews

async function getReviews(req, res, next) {
  let product = await Product.findById(req.query.id)
  console.log('allreviews', product)
  return res.status(200).json({
    reviews: product.reviews
  })
 }


//controller for deleteReview (admin)

async function deleteReview(req, res, next) {

  let product = await Product.findById(req.query.productId)
  console.log(product)

  if (!product) {
     return next(new ErrorHandler('product not found', 404))
  }


  let reviews = product.reviews.filter((reveiw) => {
    return reveiw._id.toString() !== req.query.id.toString()
  })

  let noOfReviews = reviews.length

  let ratings = noOfReviews === 0 ? 0 :  product.reviews.reduce((acc, item) => {
   return  (item.rating+acc)/noOfReviews
  }, 0)

  product = await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, noOfReviews, ratings },
    {new: true}
  )

  return res.status(200).json({
    success: true,
    product
  })

 }
 


module.exports = { createProduct, getProducts, getProductDetails, updateProduct, deleteProduct, createReview, getReviews, deleteReview}