

let mongoose = require('mongoose')

let orderSchema = new mongoose.Schema({
  shippingInfo: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    phoneNo: {
      type: Number,
      required: true,
    },
    zipCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      product : {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product'
      },
    }
  ],
   orderStatus: {
    type: String,
    enum: {
      values: ['processing', 'shipped', 'delivered'],
      message: 'please select above status'
     },
    default: 'processing'
  },
  itemPrice: {
    type: Number,
    required: true
  },
  taxAmount: {
    type: Number,
    required: true
  }, 
  shippingAmount: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },

  paymentMethod: {
    type: String,
    required: [true, 'please provide payment method: COD or Card'],
    enum: {
      values: ['COD', 'Card'],
      message: 'please select above payment methods'
    }
  },

  paymentInfo: {
    id: String,
    status: String
  },

  deliveredAt: {
    type: Date
  }

}, { timestamps: true })

let Order = mongoose.model('Order', orderSchema)

module.exports = Order