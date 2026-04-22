"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function DetailsPage() {
  const {t} = useTranslation()

  const status = 'inactive'
  const StatusRender = (status) => {
    switch (status) {
      case "active": //نشط 
        return (
          <div className=' bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit  h-9.5 rounded-3xl flex justify-center items-center '>
            <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 '>
              <span className='text-xs lg1:text-sm'>{t('active')}</span>
            </div>
          </div>
        );
      case "inactive"://غير نشط 
        return (
          <div className=' bg-[#FEE4E2] border border-[#F97066] text-[#F97066] w-fit  h-9.5 rounded-3xl flex justify-center items-center '>
            <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 '>
              <span className='text-xs lg1:text-sm'>{t('inactive')}</span>
            </div>
          </div>
        );  
    }
  }; 
  return (
    <>
      <div className='mb-6 w-full flex gap-8  border border-[#CDD5DF] rounded-[3px] p-3'>
        <div className='w-[25%]  '>
          <img src='/images/property.svg' alt="" className='h-35 w-full' />  
        </div>

        <div className='w-[75%]'>
          <div className='flex gap-6'>
            <p className='text-[#364152] text-base font-medium mb-2'>  شقة حديثة من غرفتي نوم في الجديدة القاهرة  </p> 
            <div>{StatusRender(status)}</div>
          </div>
          
          <ul className="flex items-center gap-2 text-sm font-normal text-[#4B5565]">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#4B5565] rounded-full"></span> 
              5 {t('bed')}
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#4B5565] rounded-full"></span> 
              2{t('bathroom')}
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#4B5565] rounded-full"></span> 
              3 {t('guests')}
            </li>
          </ul>
          
          <div className='flex gap-2 mt-3'>
            <img src="/images/icons/locationblue.svg" className="w-4 h-4 mt-1" />
            <p className='text-[#4B5565] text-sm font-normal'>el hosary</p> 
          </div>

          <div className='text-[var(--color-primary)] text-base font-medium my-2 flex gap-2' > 
            <p>
              <span>22</span>
              <span>$</span>
            </p>
            <p>{t('On the night')}</p>
          </div>
          
        </div>

      </div>


    </>
  )
}

export default DetailsPage