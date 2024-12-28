let mongoose = require('mongoose')

let productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    maxlength: [100, 'Product name can not exceed 100 chars']
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price'],
    maxlength: [6, 'Product price can not exceed 6 digits']
  },
  description: {
    type: String,
    required: [true, 'Please provide product description'],
  }, 
  images: [
    {
      public_id: {
        type: String,
        // required: true
      },
      url: {
        type: String,
        required: true
      }
    },
  ],
  seller: {
    type: String,
    required: [true, 'please provide seller name']
  },
  stock: {
    type: Number,
    required: [true, 'please provide stock']
  },
  
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    comment: {
      type: String,
      required: true
    }
  }],
  noOfReviews: {
    type: Number,
    default: 0
    },
  
  ratings: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    required: [true, 'please provide category'],
    enum: {
      values: ['electronics', 'cloths', 'food'],
      message: 'please select correct category'
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true })


let Product = mongoose.model('Products', productSchema)

module.exports = Product