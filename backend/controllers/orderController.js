
let Order = require('../models/orderModel.js')
const ErrorHandler = require("../utils/errorHandler.js")



//controller for place order
async function placeOrder(req, res, next) {

  let {
    orderItems,
    shippingInfo,
    paymentMethod,
    paymentInfo,
    itemPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
  } = req.body

  let order = await Order.create({
    orderItems,
    shippingInfo,
    paymentMethod,
    paymentInfo,
    itemPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    user: req.user._id
  })

  return res.status(201).json({
    'message': 'Order placed successfully'
  })
}


//controller for getOrderDetails

async function getOrderDetails(req, res, next) { 

  let order = await Order.findById(req.params.id)

  if (!order) {
    return next(new ErrorHandler('order not found with this id', 404))
  }

  return res.status(200).json({
    order
  })

}

//controller for getting all orders of current user

async function getAllOrders(req, res, next) { 

  let orders = await Order.find({user: req.user._id })
  console.log(orders)

  if (!orders) {
    return next(new ErrorHandler('orders not found with this user', 404))
  }

  return res.status(200).json({
    count: orders.length,
    orders
  })

}

//controller for getting all orders by admin

async function allOrders(req, res, next) {

  let orders = await Order.find()

  if (!orders) {
    return next(new ErrorHandler('orders not found', 404))
  }

  return res.status(200).json({
    orders
  })
}
 

//controller for delete order by admin

async function deleteOrder(req, res, next) {

  let order = await Order.findById(req.params.id)

  if (!order) {
    return next(new ErrorHandler('orders not found with given id', 404))
  }

  await order.deleteOne()

  return res.status(200).json({
    message: "order deleted successfully"
  })
 }


module.exports = {placeOrder, getOrderDetails, getAllOrders, allOrders, deleteOrder}