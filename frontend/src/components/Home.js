import React, { useEffect } from 'react'

import '../app.css'
import { useGetProductsQuery } from '../redux/api/productsApi'
import ProductItem from './product/ProductItem'
import Loader from './layout/Loader'

import toast from 'react-hot-toast';
import CustomPagination from './layout/CustomPagination'
import { useSearchParams } from 'react-router-dom'

function Home() {
   let [searchParams] = useSearchParams()

  let page = Number(searchParams.get("page")) || 1

  let param = { page }
  
  let {data, isLoading, isError, error}  = useGetProductsQuery(param)
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

      <div>
        <CustomPagination resPerPage={data?.resPerPage} filteredProductsCount={data?.totalproducts } />
      </div>
      
      </div>
  )
}

export default Home