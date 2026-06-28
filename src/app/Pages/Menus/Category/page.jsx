'use client'
import React, { useEffect } from 'react'
import All_CategoryPage from './All_Category/page'
import No_Category from './No_Category'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoriesThunk } from '@/redux/slice/Menus/MenusSlice'

function CategoryPage({setOpenAdd,  onViewCategoryItems }) {

  const dispatch = useDispatch()
  const {getCategories} = useSelector((state)=>state.Menus)
  
  useEffect(()=>{
    dispatch(getCategoriesThunk())
  },[dispatch])

  console.log('getCategories' , getCategories);

  return (
    <div>
      {/* <No_Category setOpenAdd={setOpenAdd}/> */}
      <All_CategoryPage onViewCategoryItems={onViewCategoryItems} getCategories={getCategories}/>
    </div>
  )
}

export default CategoryPage