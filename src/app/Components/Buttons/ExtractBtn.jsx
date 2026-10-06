import React from 'react'
import { useTranslation } from 'react-i18next'

function ExtractBtn() {
  const {t}=useTranslation()
  return (
    <button className=' flex  justify-center items-center  gap-2 h-14 w-42 border border-primary text-primary rounded-3px cursor-pointer'>
      <p><img src="/images/icons/extract.svg" alt="" /></p>
      
      <p>{t('Extract')}</p>
      
    </button>
  )
}

export default ExtractBtn