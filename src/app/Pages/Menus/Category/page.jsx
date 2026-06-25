'use client'
import React from 'react'
import All_CategoryPage from './All_Category/page'
import No_Category from './No_Category'

function CategoryPage({setOpenAdd,  onViewCategoryItems }) {
  return (
    <div>
      {/* <No_Category setOpenAdd={setOpenAdd}/> */}
      <All_CategoryPage onViewCategoryItems={onViewCategoryItems}/>
    </div>
  )
}

export default CategoryPage