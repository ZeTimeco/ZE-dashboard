import React from 'react'
import { useTranslation } from 'react-i18next'

function DriverDetails() {
  const {t} = useTranslation()
  return (
    <>

    <div className='my-10 border border-[#CDD5DF] rounded-3px p-6'>
      <div className='flex justify-between '>
        {/*  */}
        <div className='flex gap-3'>

          <div className='flex items-center'>
            <p className='bg-[#F9F5E8] w-12 h-12 rounded-full flex justify-center items-center'>
              <img src="/images/icons/user_yellow.svg" alt="" />
            </p>
          </div>
          
          <div className='flex flex-col gap-px'>
            <p className='text-[#364152] text-lg font-normal'>أحمد محمد</p>
            <p className='text-[#4B5565] text-base font-normal'>+1 (555) 123-4567</p>
          </div>

        </div>

        {/*  */}
        <button className='bg-[#FAEFD1] rounded-3px flex items-center gap-2 w-fit h-10 px-3 cursor-pointer '>
          <p className='text-primary text-lg font-medium'>{t('communication')}</p>
          <p><img src="/images/icons/call_yellow.svg" alt="" /></p>
        </button>
      </div>



      <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.30)] p-4 mt-6 rounded-3px flex justify-between'>
        <p className='text-[#364152] text-lg font-normal'>{t('Delivery fee')}</p>
        <p className='text-primary text-xl font-semibold'>200 {t('pound')}</p>

      </div>



    </div>
      
    
    </>
  )
}

export default DriverDetails