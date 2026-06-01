"use client"
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

function CardOfHall() {
  const {t} = useTranslation()
  const [openMenuIndex, setOpenMenuIndex] = useState(false);
  const toggleMenu = (index) => {
    setOpenMenuIndex(prev => (prev === index ? null : index));
  };
  return (
    <>
    <div className='grid  grid-cols-2'>
      <div className='relative shadow-[0_0_4px_0_rgba(0,0,0,0.20)] rounded-[3px] p-3 grid grid-cols-4 gap-4 '>
        {/* image */}
        <div>
          <img src="/images/P.p.svg" alt="" />
        </div>
        <div className='col-span-3'>
          {/*  */}
          <div className='flex justify-between items-center mb-2 '>
            <p className='text-[#364152] text-xl font-medium'>الصالة الرئيسية</p>
            <p onClick={() => toggleMenu(!openMenuIndex)} className='bg-[#EEF2F6] w-6 h-6 rounded-full flex items-center justify-center cursor-pointer'>
              <img src="/images/icons/dots.svg" alt="" />
            </p>
          </div>
          {/* dropdown */}
          {openMenuIndex && (
            <div className='absolute top-9 left-4 p-3  w-47 bg-white border border-[#EEE] rounded-[3px] shadow-md z-10'>

              <button 
                // onClick={() => router.push(`/Pages/Services/Property_Module/Service/View?id=${property.id}`)} 
                className='w-full flex gap-2 p-1 cursor-pointer hover:bg-[#EEE]'
              >
                <img src="/images/icons/eye_black.svg" className='w-5 h-5' alt="" />
                <p className='text-[#364152] text-base font-normal'>{t('views')}</p>
              </button>

              <button 
                // onClick={() => router.push(`/Pages/Services/Property_Module/Service/View?id=${property.id}`)} 
                className='w-full flex gap-2 p-1 cursor-pointer hover:bg-[#EEE]'
              >
                <img src="/images/icons/restaurant-black.svg" className='w-5 h-5' alt="" />
                <p className='text-[#364152] text-base font-normal'>{t('Hall organization')}</p>
              </button>

            </div>
          )}

          {/*  */}
          <p className='text-[#4B5565] text-base font-normal mb-4'> 8 {t('tables')}</p>

          {/* btns */}
          <div className='flex gap-2'>
            <button className='flex items-center justify-center gap-1.5 rounded-[3px] border border-[#E3E8EF] px-2 h-14 w-full cursor-pointer'> 
              <img src="/images/icons/copy_yellow.svg" className='w-5 h-5' alt="" />
              <p className='text-[#364152] text-sm font-normal'>{t('copies')}</p>
            </button>

            <button className='flex items-center justify-center gap-1.5 rounded-[3px] border border-[#E3E8EF] px-2 h-14 w-full cursor-pointer'>
              <img src="/images/icons/EditYellow.svg" className='w-5 h-5' alt="" />
              <p className='text-[#364152] text-sm font-normal'>{t('modification')}</p>
            </button>

            <button className='flex items-center justify-center gap-1.5 rounded-[3px] border border-[#E3E8EF] px-2 h-14 w-full cursor-pointer'>
              <img src="/images/icons/shut-down.svg" className='w-5 h-5' alt="" />
              <p className='text-[#364152] text-sm font-normal'>{t('closing')}</p>
            </button>
          </div>

        </div>

      </div>
    </div>
  
    </>
  )
}

export default CardOfHall