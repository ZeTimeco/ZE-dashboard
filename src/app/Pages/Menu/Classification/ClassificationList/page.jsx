import React from 'react'
import { useTranslation } from 'react-i18next'
import Card from './Card'

function ClassificationListPage({setOpenEdit}) {
  const {t} = useTranslation()
  return (
    <>
      <div className='border border-[#E3E8EF] py-8 px-6 rounded-[3px]'>
          <p className='text-[#364152] text-xl font-medium mb-6'>{t('List categories')}</p>

          <div className='grid grid-cols-2 gap-6'>
            <Card setOpenEdit={setOpenEdit}/>
          </div>
      </div>
    </>
  )
}

export default ClassificationListPage