'use client';
import React from 'react'
import { useTranslation } from 'react-i18next';

function TileOfSevicesPage() {
  const {t} = useTranslation();


  return (
    <>
    <div className='flex justify-between mb-10 '>
      <div>
        <p className='text-[#364152]  text-2xl font-medium mb-3'>{t('Today overview')}</p> 
        <p className='text-[#697586] text-base font-normal'>{t('Track and manage real estate service requests easily and efficiently.')}</p>
      </div>
    
    </div>
    

    </>
  )
}

export default TileOfSevicesPage