import React from 'react'
import { useTranslation } from 'react-i18next'

function TitleOfDetails() {
  const {t} = useTranslation()
  return (
    <div className='flex gap-15'>

    <div className='flex flex-col gap-1'>
      <p className='text-[#364152] text-2xl font-medium'>{t('Active connection')}</p>
      <p className='text-[#697586] text-xl font-normal'>
        <span>عاجل الان</span> - <span> ZT-PR-1245</span>
      </p>

    </div>
    <p className='w-fit h-10 px-2 flex items-center bg-[#DBFFE8] rounded-lg text-[#16A34A] text-lg font-normal'>
      تم التأكيد
    </p>
      

    </div>
  )
}

export default TitleOfDetails