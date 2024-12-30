import React, { useEffect } from 'react'

import '../app.css'
import { useGetProductsQuery } from '../redux/api/productsApi'
import ProductItem from './product/ProductItem'
import Loader from './layout/Loader'

import toast from 'react-hot-toast';
import CustomPagination from './layout/CustomPagination'
import { useSearchParams } from 'react-router-dom'
import Filters from './layout/Filters'

function Home() {
   let [searchParams] = useSearchParams()

  let page = Number(searchParams.get("page")) || 1
  let keyword = searchParams.get("keyword") || ""

  let param = { page, keyword }
  
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
    <div className='home row m-1'>
      <div className='col-3'>
      <Filters/>
      </div>
      <div className='col-9'>
      <h3  className='my-2'>
        {
          keyword ? `All products based on your seach keyword (${keyword}) : ${data?.products?.length} products` : "Recenet products"
         }
        </h3>
        <div className='d-flex'>

      {
        data?.products?.map((product) => {
          return <ProductItem key={product._id} product={product} />
        })
      }
        </div>
     
      </div>

      <div className='d-flex justify-content-center my-4'>
        <CustomPagination resPerPage={data?.resPerPage} filteredProductsCount={data?.totalproducts } />
      </div>
      
      </div>
  )
}

export default Home