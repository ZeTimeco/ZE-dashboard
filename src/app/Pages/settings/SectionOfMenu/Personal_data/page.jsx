"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Header from './Header'
import { useTranslation } from 'react-i18next'
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import EmailDialogPage from './Dialogs/EmailDialog/page';
import PhoneDialogPage from './Dialogs/PhoneDialog/page';
import OtpPhonePage from './Dialogs/OtpPhone/page';
import OtpEmailPage from './Dialogs/OtpEmail/page';
import { useDispatch } from 'react-redux';
import Loader from '@/app/Components/Loader/Loader'

function Personal_dataPage({ userData }) {
  const { t } = useTranslation()

  const [openEmail, setOpenEmail] = useState(false);
  const [openPhone, setOpenPhone] = useState(false);
  const [openOtpPhone, setOpenOtpPhone] = useState(false);
  const [openOtpEmail, setOpenOtpEmail] = useState(false);
  
  if (!userData) return <div className="py-12 flex justify-center"><Loader /></div>

  const dispatch = useDispatch()
  
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('');

  return (  
    <>
      <motion.div 
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="border border-[#E3E8EF] mb-8 bg-white rounded-[3px] shadow-xs"
      >
        <Header/>
        <div className='lg1:p-6 p-3'>
          <div className='grid lg1:grid-cols-3 lg1:gap-4 grid-cols-2 gap-4 border border-[#E3E8EF] p-5 rounded-[3px] bg-[#F8FAFC]/50'>
            <div>
              <p className='text-[#697586] text-sm font-normal mb-1'>{t('First Name')}</p>
              <p className='text-[#364152] text-base font-semibold'>{userData?.firstname || '-'}</p>
            </div>

            <div>
              <p className='text-[#697586] text-sm font-normal mb-1'>{t('Last Name')}/{t('Family Name')}</p>
              <p className='text-[#364152] text-base font-semibold'>{userData?.lastname || '-'}</p>
            </div>

            <div>
              <p className='text-[#697586] text-sm font-normal mb-1'>{t('National ID number')}</p>
              <p className='text-[#364152] text-base font-semibold'>{userData?.national_id || '-'}</p>
            </div>

            <div>
              <p className='text-[#697586] text-sm font-normal mb-1'>{t('Gender')}</p>
              <p className='text-[#364152] text-base font-semibold'>{userData?.gender || '-'}</p>
            </div>

            <div>
              <p className='text-[#697586] text-sm font-normal mb-1'>{t('Nationality')}</p>
              <p className='text-[#364152] text-base font-semibold'>{userData?.nationality || '-'}</p>
            </div>
          </div>
        </div>
      
        {/* email */}
        <div className='px-6 mb-4'>
          <p className='text-[#4B5565] text-base font-normal mb-1.5'>{t('Email')}</p>
          <div className='flex justify-between gap-3'>
            <input 
              type="text" 
              value={userData?.email ?? ''}
              className='border border-[#E3E8EF] w-[80%] lg1:w-[90%] h-14 outline-none shadow-xs py-2.5 px-3 text-[#364152] bg-[#F8FAFC] rounded-[3px]'
              readOnly 
            />
            <div className='flex items-center'>
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: '#FAF5EA' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpenEmail(true)} 
                className='w-14.5 h-14 flex items-center justify-center border border-[var(--color-primary)] rounded-[3px] cursor-pointer shadow-xs transition-colors'
              >
                <img src="/images/icons/EditYellow.svg" alt="edit" className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* phone number */}
        <div className='p-6 pt-2'>
          <p className='text-[#4B5565] text-base font-normal mb-1.5'>{t('phone number')}</p>
          <div className='flex justify-between gap-3'>
            <div className='w-[80%] lg1:w-[90%]'>
              <PhoneInput
                value={`${userData?.country_code || ''}${userData?.phone || ''}`}
                placeholder="000000000"
                containerClass="!w-full"
                inputClass="!w-full !min-w-0 !h-14 !border !border-[#E3E8EF] !rounded-[3px] !pl-24 !text-left !shadow-xs !text-[#364152] placeholder-[#9A9A9A] focus:border-[#C69815] outline-none"
                buttonClass="!absolute !left-0 !top-0 !h-full !px-3 !flex !items-center !gap-2 !bg-transparent !border-r-0"
                dropdownClass="!absolute !left-0 !top-full !mt-1 !z-50 !border !border-[#E3E8EF] !rounded-md !shadow-md"    
              />
            </div>
            <div className='flex items-center'>
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: '#FAF5EA' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpenPhone(true)}
                className='w-14.5 h-14 flex items-center justify-center border border-[var(--color-primary)] rounded-[3px] cursor-pointer shadow-xs transition-colors'
              >
                <img src="/images/icons/EditYellow.svg" alt="edit" className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <EmailDialogPage 
        openEmail={openEmail}  
        setOpenEmail={setOpenEmail}  
        setOpenOtpEmail={setOpenOtpEmail}  
        email={email} 
        setEmail={setEmail} 
        dispatch={dispatch} 
      />
      <PhoneDialogPage 
        openPhone={openPhone}  
        setOpenPhone={setOpenPhone} 
        setOpenOtpPhone={setOpenOtpPhone}
        phone={phone}
        setPhone={setPhone}
        countryCode={countryCode}
        setCountryCode={setCountryCode}
        dispatch={dispatch} 
      />

      <OtpPhonePage 
        openOtpPhone={openOtpPhone} 
        setOpenOtpPhone={setOpenOtpPhone}
        setOpenPhone={setOpenPhone}
        phone={phone}
        setPhone={setPhone}
        countryCode={countryCode}
        setCountryCode={setCountryCode}
        dispatch={dispatch} 
      />
      
      <OtpEmailPage 
        openOtpEmail={openOtpEmail} 
        setOpenOtpEmail={setOpenOtpEmail} 
        setOpenEmail={setOpenEmail}
        email={email}
        dispatch={dispatch}
      />
    </>
  )
}

export default Personal_dataPage