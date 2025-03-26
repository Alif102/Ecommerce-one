import React from 'react'
import ProductDetailsPage from './ProductDetailsPage'
import ProductTabs from './ProductTabs'
import Navbar from '@/app/components/Navbar/Navbar'

const page = () => {
  return (
    <div>
       <div>
   <Navbar/>
   </div>
      <div>
        <ProductDetailsPage />
      </div>
      <div>
        <ProductTabs />
      </div>
    </div>
  )
}

export default page