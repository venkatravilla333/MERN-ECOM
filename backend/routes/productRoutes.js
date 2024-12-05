let express = require('express')

const { createProduct, getProducts, getProductDetails, updateProduct, deleteProduct } = require('../controllers/productController.js')
let router = express.Router()

// router.get('/products', (req, res) => {
//   res.status(200).json({
//     product
//   })
//   console.log(product)
// })


router.route('/admin/products').post(createProduct)
router.route('/products').get(getProducts)
router.route('/products/:id').get(getProductDetails)
router.route('/admin/products/:id').put(updateProduct)
router.route('/admin/products/:id').delete(deleteProduct)

module.exports = router