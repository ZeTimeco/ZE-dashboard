import React from 'react'
import { useTranslation } from 'react-i18next'
import Card from './Card'

function SecondClassificationListPage({setOpenEdit, setShowSecond}) {
  const {t} = useTranslation()
  return (
    <>
      <div className='border border-[#E3E8EF] py-8 px-6 rounded-[3px]'>
          <div className='flex justify-between items-center gap-3 mb-6'>
            
            <p className='text-[#364152] text-xl font-medium'>{t('List categories')}</p>
            <button 
              onClick={() => setShowSecond(false)} 
              className='w-10 h-10 bg-[var(--color-primary)] rounded-[3px] flex justify-center items-center cursor-pointer '
            >
              <img src="/images/icons/arrow-right-go.svg" className="w-5 h-5" alt="back" />
            </button>
          </div>
          <div className='grid grid-cols-2 gap-6'>
            <Card  />
          </div>
      </div>

    </>
  )
}

export default SecondClassificationListPage