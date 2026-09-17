'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Monthly_SummaryPage() {
  const {t} = useTranslation()

  return (
    <>
      <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4 '>
        <p className='text-[#161616] text-lg font-medium mb-6'>{t('Monthly Summary')}</p>

        <div className='flex flex-col gap-1'>

          {/* Total delivery fees  */}
          <div className='flex justify-between'>
            <p className='text-[#161616] text-sm font-normal'>{t('Total delivery fees')}</p>
            <p className='text-[#707070] text-sm font-medium'>42,180  {t('pound')}</p>
          </div>

          {/* Drivers' entitlements  */}
          <div className='flex justify-between'>
            <p className='text-[#161616] text-sm font-normal'>{t("Drivers' entitlements")} (70%)</p>
            <p className='text-[#C61515] text-sm font-medium'>42,180  {t('pound')}</p>
          </div>

          {/* Platform commission  */}
          <div className='flex justify-between'>
            <p className='text-[#161616] text-sm font-normal'>{t("Platform commission")} (15%)</p>
            <p className='text-[#C61515] text-sm font-medium'>-29,526   {t('pound')}</p>
          </div>

          <div className='border border-[#E3E8EF] my-4'></div>

          {/* Company net  */}
          <div className='flex justify-between'>
            <p className='text-[#161616] text-sm font-normal'>{t("Company net")} </p>
            <p className='text-primary text-sm font-medium'>29,526 {t('pound')}</p>
          </div>



        </div>

      </div>
      

    </>
  )
}

export default Monthly_SummaryPage