import React from 'react'
import All_ItemsPage from './All_Items/page'
import No_Items from './No_Items'

function ItemsPage({setOpenAddItem}) {
  return (
    <>
      {/* <No_Items setOpenAddItem={setOpenAddItem}/> */}
      <All_ItemsPage/>
    </>
  )
}

export default ItemsPage