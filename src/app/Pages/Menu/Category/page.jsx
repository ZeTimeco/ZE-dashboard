'use client'
import React, { useState } from 'react'
import NoCategory from './NoCategory'
import AddPage from './Add/page'

function CategoryPage() {
  const [openAdd , setOpenAdd]= useState(false)
  
  return (
    <>
      <div>
        <NoCategory setOpenAdd={setOpenAdd}/>
      </div>


      <AddPage
        open={openAdd}
        setOpen={setOpenAdd}
      />

    </>
  )
}

export default CategoryPage