"use client"
import React from 'react'
import { useTranslation } from 'react-i18next';

function DetailsPage() {
  const {t} = useTranslation()
  const status = 'inactive'

  const StatusRender = (status) => {
    switch (status) {
      case "active": //نشط 
        return (
        <div className=' bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit  h-9.5 rounded-3xl flex justify-center items-center '>
          <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex gap-1'>
            <img src="/images/icons/Active Status.svg" alt="" className='w-4 h-4' />
            <span className='text-xs lg1:text-sm'>{t('active')}</span>
          </div>
        </div>
        );
      case "inactive"://غير نشط 
        return (
        <div className=' bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit  h-9.5 rounded-3xl flex justify-center items-center '>
          <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex gap-1'>
            <img src="/images/icons/refused Status.svg" alt="" className='w-4 h-4 mt-1' />
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
              <img src='/images/testyImage.svg' alt="" className=' w-full' />  
            </div>
    
            <div className='w-[75%]'>
              <div className='flex gap-10'>
                <p className='text-[#364152] text-base font-medium  flex items-center'> شقة حديثة من غرفتي نوم في الجديدة القاهرة  </p> 
                <div>{StatusRender(status)}</div>
              </div>

              <div className='flex gap-2 '>
                <img src="/images/icons/locationblue.svg" className="w-4 h-4 mt-1" />
                <p className='text-[#4B5565] text-sm font-normal'>القاهرة الجديدة، القاهرة، مصر</p> 
              </div>
    
              <div className=' mt-2 flex gap-1' > 
                <img src="/images/icons/star.svg" alt="" />
                <p>
                  <span className='text-[#4B5565] text-base font-medium '>4.5</span> {''}
                  <span className='text-[#697586] text-base font-normal '>(120)</span>
                </p>
              </div>
              
            </div>
    
          </div>  

    </>
  )
}

export default DetailsPage