import React from 'react'
import All_ItemsPage from './All_Items/page'
import No_Items from './No_Items'

function ItemsPage({setOpenAdd}) {
  return (
    <>
      {/* <No_Items setOpenAdd={setOpenAdd}/> */}
      <All_ItemsPage/>
    </>
  )
}

export default ItemsPage