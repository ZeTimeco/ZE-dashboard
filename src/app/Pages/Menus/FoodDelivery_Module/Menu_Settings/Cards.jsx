'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Cards() {
  const {t} = useTranslation()
  const router = useRouter()
  const state = 'open'

  const StatusRender = (status) => {
    switch (status) {
      case 'open': 
        return (
          <div className=' bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit  h-7.5 rounded-full flex justify-center items-center '>
            <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 '>
              <span className='text-xs lg1:text-sm'>{t('Visible to customers')}</span>
            </div>
          </div>
        );

      case 'hidden': 
        return (
          <div className=' bg-[#EEF2F6] border border-[#697586] text-[#697586] w-fit  h-7.5 rounded-full flex  items-center '>
            <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 '>
              <span className='text-xs lg1:text-sm'>{t('Hidden')}</span>
            </div>
          </div>
        );

    }
  }
  return (
    <>
      <div className='border border-[#CDD5DF] rounded-[3px] p-4'>
        <div className='flex justify-between'>
          <div>
            <p className='text-[#364152] text-base font-medium '>البرجر </p>
            <p className='text-[#4B5565] text-sm font-normal '> 12 {t('Product')}</p>
          </div>
          <div className='flex gap-3'>
            {state === 'open' ? (
              <button className="w-8 h-8 bg-[#DCFAE6] rounded-[3px] flex justify-center items-center cursor-pointer">
                <img src="/images/icons/eye_Green.svg" className="w-5 h-5" />
              </button>
            ) : (
              <>
                {/* close eye */}
                <button className="w-8 h-8 bg-[#EEF2F6] rounded-[3px] flex justify-center items-center cursor-pointer">
                  <img src="/images/icons/eye_Close_gray.svg" className="w-5 h-5" />
                </button>
              </>
            )}

            <button 
              onClick={()=>router.push(`/Pages/Menus/FoodDelivery_Module/Menu_Settings/Edit`)}
              className="w-8 h-8 bg-[#F4EAD0] rounded-[3px] flex justify-center items-center cursor-pointer">
              <img src="/images/icons/EditYellow.svg" className="w-5 h-5" />
            </button>

            
          </div>
        </div>

        <div className='border border-[#E3E8EF] my-3'></div>

        <div>
          {StatusRender(state)}
        </div>
        
      </div>
      
    </>
  )
}

export default Cards