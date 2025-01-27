
import React from 'react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

const ProductItem = ({ product }) => {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 col-12 my-1 mx-4">
      <div className="card h-100">
        <img
          src={product?.images[0]?.url}
          className="card-img-top p-1"
          alt={product.name}
          style={{ width: '100%', height: '160px',  }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link className="link text-primary" to={`/product/${product._id}`}>
              {product.name}
            </Link>
          </h5>
          <div className="mb-2">
            <StarRatings
              rating={product.ratings}
              starRatedColor="gold"
              numberOfStars={5}
              name="rating"
              starDimension="22px"
              starSpacing="1px"
            />
            <span className="ms-2">{product.ratings}</span>
          </div>
          <h5 className="mt-auto">₹{product.price}</h5>
          <Link
            to={`/product/${product._id}`}
            className="btn btn-primary mt-2 fw-bolder"
          >
            Product Info
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;


