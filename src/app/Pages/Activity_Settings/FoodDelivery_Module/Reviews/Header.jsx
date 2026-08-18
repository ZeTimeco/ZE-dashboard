"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function Header({ activeView, setActiveView }) {
    const {t} = useTranslation()
  
  return (
    <>

      <div className='py-4 px-6 flex justify-between items-center'>
        <div className='flex gap-2 items-center'>
          <p className='w-10 h-10 bg-[#EDE7FD] flex justify-center items-center rounded-[3px]'>
            <img src="/images/icons/star_blue.svg" alt=""  className='w-8 h-8 '/>
          </p>
          <p className='flex items-center text-[#364152] text-base font-normal'>
            {activeView === 'rating_setting' ? t('Rating settings') : t('Reviews')}
          </p>
        </div>

        {activeView === 'rating_setting' ? (
          <button 
            onClick={() => setActiveView('review')} 
            className="bg-[var(--color-primary)] rounded-[3px] w-10 h-10 flex justify-center items-center cursor-pointer"
          >
            <img src="/images/icons/arrow-right-go.svg" className="w-5 h-5" alt="back" />
          </button>
        ) : (
          <button 
            onClick={() => setActiveView('rating_setting')} 
            className='w-[20%] h-14 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-[3px] cursor-pointer text-base font-medium'
          >
            {t('Rating settings')}
          </button>
        )}
        
      </div>
      <hr className='border-0.5 border-[#E4E6EF]'/>

    </>
  )
}

export default Header