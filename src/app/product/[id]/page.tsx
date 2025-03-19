import React from 'react'
import ProductDetailsPage from './ProductDetailsPage'
import ProductTabs from './ProductTabs'

const page = () => {
  return (
    <div>
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