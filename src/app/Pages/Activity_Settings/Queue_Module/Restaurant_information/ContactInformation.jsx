'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function ContactInformation() {
  const {t} = useTranslation()
  return (
    <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4'>
      <p className='text-[#364152] text-base font-normal'>{t('Contact information')}</p>

      <div className='grid grid-cols-2 gap-4 mt-4'>

        {/* landline phone */}
        <div className='w-full'>
          <p className='text-sm  mb-1.5'>
            <span className='text-[#364152] font-medium '>{t('landline phone')} </span>
            <span className=' text-[#697586]  font-normal'>({t('optional')})</span>
          </p>

          <input 
            type="text"
            name='code'
            placeholder='22356420'
            className={`w-full h-14  p-3 border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] text-sm text-[#364152]  rounded-[3px] outline-none `}
          />
        </div>

        {/* WhatsApp number */}
        <div className='w-full'>
          <p className='text-sm  mb-1.5'>
            <span className='text-[#364152] font-medium '>{t('WhatsApp number')} </span>
            <span className=' text-[#697586]  font-normal'>({t('optional')})</span>
          </p>
          
          <input 
            type="text"
            name='code'
            placeholder='+20114755210'
            className={`w-full h-14  p-3 border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] text-sm text-[#364152]  rounded-[3px] outline-none `}
          />
        </div>

        {/* Mobile Number 1 */}
        <div className='w-full'>
          <p className='text-sm  mb-1.5'>
            <span className='text-[#364152] font-medium '>{t('Mobile Number')} 1 </span>
            <span className=' text-[#697586]  font-normal'>({t('optional')})</span>
          </p>
          
          <input 
            type="text"
            name='code'
            placeholder='+599655444422'
            className={`w-full h-14  p-3 border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] text-sm text-[#364152]  rounded-[3px] outline-none `}
          />
        </div>

        {/* Mobile Number 2 */}
        <div className='w-full'>
          <p className='text-sm  mb-1.5'>
            <span className='text-[#364152] font-medium '>{t('Mobile Number')} 2 </span>
            <span className=' text-[#697586]  font-normal'>({t('optional')})</span>
          </p>
          
          <input 
            type="text"
            name='code'
            placeholder='+15522222556'
            className={`w-full h-14  p-3 border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] text-sm text-[#364152]  rounded-[3px] outline-none `}
          />
        </div>


        {/* Email */}
        <div className='w-full col-span-2'>
          <p className='text-sm  mb-1.5'>
            <span className='text-[#364152] font-medium '>{t('Email')} </span>
            <span className=' text-[#697586]  font-normal'>({t('optional')})</span>
          </p>
          
          <input 
            type="text"
            name='code'
            placeholder='Exmple@restaurant.com'
            className={`w-full h-14  p-3 border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] text-sm text-[#364152]  rounded-[3px] outline-none `}
          />
        </div>


      </div>
    </div>
  )
}

export default ContactInformation