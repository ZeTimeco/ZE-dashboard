import React from 'react'
import { useTranslation } from 'react-i18next'

function Boxes() {
  const {t} = useTranslation()


  return (  
    <>
    {/* main box */}
    <div className='grid grid-cols-3 gap-4 mt-4'>
      {/* role */}
      <div className=' border border-[#CDD5DF] rounded-[3px] p-4'>
        <div className='flex items-center gap-3'>
          <p className=' w-10 h-10 flex justify-center items-center bg-[#EDE7FD] rounded-md'>
            <img src="/images/icons/userBlue.svg" alt="" />
          </p>
          <p className='text-[#4B5565] text-base font-normal'>{t('role')}</p>
        </div>
        <p className=' text-lg  my-2.5'>
          <span className='text-[#202939] font-medium'>4</span> 
        </p>
      </div>

      {/* power */}
      <div className=' border border-[#CDD5DF] rounded-[3px] p-4'>
        <div className='flex items-center gap-3'>
          <p className=' w-10 h-10 flex justify-center items-center bg-[#F9F5E8] rounded-md'>
            <img src="/images/icons/security_yellow.svg" alt="" />
          </p>
          <p className='text-[#4B5565] text-base font-normal'>{t('power')}</p>
        </div>
        <p className='text-[#202939] text-lg font-medium my-2.5'>3</p>
      </div>

      {/* category */}
      <div className=' border border-[#CDD5DF] rounded-[3px] p-4'>
        <div className='flex items-center gap-3'>
          <p className=' w-10 h-10 flex justify-center items-center bg-[#DCFAE6] rounded-md'>
            <img src="/images/icons/checkmark-circle-true.svg" alt="" />
          </p>
          <p className='text-[#4B5565] text-base font-normal'>{t('category')}</p>
        </div>
        <p className='text-[#202939] text-lg font-medium my-2.5'>33</p>
      </div>

    </div>



    {/* note */}
      <div className='border border-[var(--color-primary)] bg-[#F9F5E8] p-3 rounded-[3px] flex gap-2'>
        <p>
          <img src="/images/icons/i_Yellow.svg" alt="" />
        </p>

        <p className='flex flex-col gap-1'>
          <span className='text-[var(--color-primary)] text-base font-medium'>{t('Managing job roles')}</span>
          <span className='text-[#364152] text-sm font-normal'>{t("Define the permissions for each job role. You can customize the permissions to suit your restaurant's needs.")}</span>
        </p>

      </div>
    </>
  )
}

export default Boxes