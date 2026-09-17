'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Bank_Transfer_Request from './Dialog/Bank_Transfer_Request'

function Net_profitPage() {
  const {t} = useTranslation()
  const [openBank ,setOpenBank] = useState(false)

  return (
    <>
    <div className='bg-[linear-gradient(99deg,rgba(218,149,22,0.64)_0%,#C69815_100%)] p-4 rounded-3px'>
      <div className='flex items-center gap-2'>
        <p className='w-10 h-10 bg-[#FFFFFF40] rounded-3px flex justify-center items-center'>
          <img src="/images/icons/dollar_white.svg" alt="" />
        </p>
        <p className='text-[#FFF] text-xl font-normal'>{t('Company net profit')} ({t('per month')})</p>
      </div>

      <p className='text-[#FFF] text-2xl font-semibold my-5'>1,284.55 {t('pound')}</p>

      <button  onClick={()=>setOpenBank(true)} className='w-full h-14 bg-[#FAEFD1] text-primary text-lg font-semibold rounded-3px cursor-pointer'>
        {t('bank transfer request')}
      </button>


    </div>

    <Bank_Transfer_Request
      open={openBank}
      setOpen={setOpenBank}
    />
      
    </>
  )
}

export default Net_profitPage