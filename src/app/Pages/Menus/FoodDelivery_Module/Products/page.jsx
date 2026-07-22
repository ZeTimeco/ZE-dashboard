import React from 'react'
import Header from './Header'
import Box from './Box'
import Product from './Product'

function ProductsPage() {
  return (
    <div className='mt-10'>
      <Header/>
      <Box/>

      <div  className='grid grid-cols-2 gap-6'>
        <Product/>
      </div>



    </div>
  )
}

export default ProductsPage