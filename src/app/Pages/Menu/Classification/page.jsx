'use client'
import React, { useState } from 'react'
import NoClassification from './NoClassification'
import { useTranslation } from 'react-i18next'
import AddPage from './Add/page'
import EditPage from './Edit/page'
import ClassificationListPage from './ClassificationList/page'
import SecondClassificationListPage from './SecondClassificationList/page'

function ClassificationPage({openAdd , setOpenAdd}) {
  const {t} = useTranslation()
  const [openEdit , setOpenEdit]= useState(false)
  const [showSecond, setShowSecond] = useState(false)



  return (
    <>
      <div>
        {/* <NoClassification setOpenAdd={setOpenAdd}/> */}
        {showSecond ? (
          <SecondClassificationListPage setOpenEdit={setOpenEdit} setShowSecond={setShowSecond} />
        ) : (
          <ClassificationListPage setOpenEdit={setOpenEdit} setShowSecond={setShowSecond} />
        )}

      </div>


      <AddPage
        open={openAdd}
        setOpen={setOpenAdd}
      />

      <EditPage
        open={openEdit}
        setOpen={setOpenEdit}
      />

    </>
  )
}

export default ClassificationPage