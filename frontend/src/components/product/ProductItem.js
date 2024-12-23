import React from 'react'

import StarRatings from 'react-star-ratings';
import {Link} from 'react-router-dom'

function ProductItem({product}) {
  return (
    <div className="card">
        <img src="..." className="card-img-top" alt="..."></img>
      <div className="card-body">    
        <h5>
          <Link className='link' to={`/product/${product._id}`}>{product.name}</Link>
        </h5>
        
        <StarRatings
          rating={product.ratings}
          starRatedColor="gold"
          numberOfStars={5}
          name='rating'
          starDimension='22px'
          starSpacing='1px'
        />
        <span>{product.ratings }</span>
        <h5>{product.price}</h5>
        <Link to={`/product/${product._id}`} className="card-link bg-dark p-1 border rounded link">Product Info</Link>
          </div>
    </div>
  )
}

export default ProductItem