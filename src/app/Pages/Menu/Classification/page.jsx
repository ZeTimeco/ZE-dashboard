'use client'
import React, { useState } from 'react'
import NoClassification from './NoClassification'
import { useTranslation } from 'react-i18next'
import AddPage from './Add/page'

function ClassificationPage() {
  const {t} = useTranslation()
  const [openAdd , setOpenAdd]= useState(false)
  return (
    <>
      <div>
        <NoClassification setOpenAdd={setOpenAdd}/>
      </div>


      <AddPage
        open={openAdd}
        setOpen={setOpenAdd}
      />

    </>
  )
}

export default ClassificationPage