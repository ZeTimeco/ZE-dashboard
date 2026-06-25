'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Details_Of_ItemsPage from '../Details_Of_Items/page'

function Card() {
    const {t} = useTranslation()
    const [openDetailsItem , setOpenDetailsItem] = useState(false)
  
  return (
    <>
    
      <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] rounded-[3px] pt-4 px-4'>
        <div className=' flex justify-between'>
          <div className='flex  gap-2'>
            <div className='w-20 h-20'>
              <img src="/images/P.p.svg" alt="" />
            </div>
            <div className='flex flex-col justify-center '>
              <p className='text-[#364152] text-xl font-normal'>حمص</p>
              <p className='text-[var(--color-primary)] text-lg font-normal'>20 جنية</p>
            </div>
          </div>
          <div className='flex items-center '>
          
            {/* details */}
            <button onClick={()=>setOpenDetailsItem(true)}  className='w-8 h-8  bg-[#EEF2F6] rounded-full flex justify-center items-center cursor-pointer'>
              <img src="/images/icons/arrow-right-blackk.svg" className="w-6 h-6" />
            </button>

          </div>
        </div>
      </div>

      <Details_Of_ItemsPage
        open={openDetailsItem}
        setOpen={setOpenDetailsItem}
      />

      

    </>
  )
}

export default Card