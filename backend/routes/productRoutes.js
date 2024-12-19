let express = require('express')

const { createProduct, getProducts, getProductDetails, updateProduct, deleteProduct, createReview, getReviews, deleteReview } = require('../controllers/productController.js')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth.js')
let router = express.Router()

// router.get('/products', (req, res) => {
//   res.status(200).json({
//     product
//   })
//   console.log(product)
// })


router.route('/products').get(getProducts)
router.route('/products/:id').get(getProductDetails)
router
  .route('/admin/products')
  .post(isAuthenticatedUser, authorizeRoles('admin'), createProduct)
router
  .route('/admin/products/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
router
  .route('/admin/products/:id')
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct)

router
  .route('/reviews')
  .put(isAuthenticatedUser, createReview)
router
  .route('/allReviews')
  .get(isAuthenticatedUser, getReviews)
router
  .route('/admin/deleteReview')
  .delete(isAuthenticatedUser, authorizeRoles('admin'),  deleteReview)

module.exports = router