import React, { useEffect } from 'react'

import '../app.css'
import { useGetProductsQuery } from '../redux/api/productsApi'
import ProductItem from './product/ProductItem'
import Loader from './layout/Loader'

import toast from 'react-hot-toast';

function Home() {

  let {data, isLoading, isError, error}  = useGetProductsQuery()
  console.log(data?.products)
  

  
  useEffect(() => {
    if (isError) {
      toast.error(error.data.message)
    }
  }, [isError])
  
  if (isLoading) {
    return <Loader/>
  }
  
  return (
    <div className='home row'>
      {
        data?.products?.map((product) => {
          return <ProductItem key={product._id} product={product} />
        })
      }
      </div>
  )
}

export default Home