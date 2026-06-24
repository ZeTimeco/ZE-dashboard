'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Card({setOpenEdit}) {
  const {t} = useTranslation()

  const status = 1
    const StatusRender = (status) => {
    switch (status) {
      case 1: //نشط 
        return (
          <div className=' bg-[#fff] border border-[#17B26A] text-[#067647] w-fit  h-7.5 rounded-full flex justify-center items-center '>
            <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex  items-center gap-1'>
              <img src="/images/icons/true_green.svg" alt="" className='w-3.5 h-3.5' />
              <span className='text-xs lg1:text-sm'>{t('active')}</span>
            </div>
          </div>
        );

      case 0: //مغلق
        return (
          <div className=' bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit  h-7.5 rounded-full flex  items-center '>
            <div className='py-1 px-2 flex  items-center  gap-1'>
              <img src="/images/icons/refused Status.svg" alt="" className='w-4 h-4' />
              <span className='text-xs lg1:text-sm'>{t('closed')}</span>
            </div>
          </div>
        );

    }
  }
  
  return (
    <>

      <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] rounded-[3px] p-4'>
        <div className=' flex justify-between'>
          <div className=''>
            <p className='text-[#364152] text-xl font-normal'>المقبلات</p>
            <div className='flex gap-6'>
              <p className='text-[#4B5565] text-lg font-normal'>5 {t('classification')}</p>
              <div>
                {StatusRender(1)}
              </div>
            </div>
          </div>
          <div className='flex gap-4 '>
            {/* edit */}
            <button onClick={()=>setOpenEdit(true)} className='cursor-pointer'>
              <img src="/images/icons/EditBlack.svg" className="w-5 h-5" />
            </button>
            
            {/* second */}
            <button className='w-8 h-8 mt-3 bg-[#EEF2F6] rounded-full flex justify-center items-center cursor-pointer'>
              <img src="/images/icons/arrow-right-blackk.svg" className="w-6 h-6" />
            </button>

          </div>
        </div>
      </div>
      
    </>
  )
}

export default Card