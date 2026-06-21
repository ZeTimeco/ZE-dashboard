"use client"
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SendNotificationPage from '../SendNotification/page';
import DelayPage from '../Delay/page';
import SendOtpPage from '../SendOtp/page';

function Cards({ activeTab }) {
  const {t} = useTranslation()
  const [openNotification , setOpenNotification] = useState(false)
  const [openDelay , setOpenDelay] = useState(false)
  const [openOtp , setOpenOtp] = useState(false)

  return (
    <>
      <div className='grid grid-cols-2 gap-6 my-6'>
        {/* Active Tab: {activeTab} */}

      
        <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-6'>
          {/*  */}
          <div className='flex justify-between'>
            <div className='flex items-center gap-2'>
              <p className='bg-[linear-gradient(180deg,_#1183FF_50.96%,_#0064D2_100%)] text-white w-15 h-14 rounded-[3px] flex justify-center items-center'>
                #1223
              </p>
              <p className='text-[#364152] text-lg font-medium'>أحمد سمير</p>
            </div>

            {/* pending','confirmed','seated','completed','cancelled' 'no_show','arrived','rejected */}
            <div className=' flex items-center'>
              <p className='border border-[#4D0CE7] text-[#4D0CE7] bg-[#EDE7FD] h-8 w-fit px-2 rounded-full flex items-center'>arrived</p>
            </div>

          </div>

          {/*  */}
          <div className='flex w-full my-3'>
            <p className='flex gap-2  w-[40%]'>
              <img src="/images/icons/user-group_grey.svg" alt="" />
              <span className='text-[#697586] text-base font-normal'> 5 {t('guests')}</span>
            </p>
            <p className='text-[#697586] text-base font-normal  w-full'>إطلالة على الحديقة</p>
          </div>

          {/*  */}
          <div className='flex gap-2'>
            <img src="/images/icons/comment-gray.svg" alt="" />
            <p className='text-[#364152] text-base font-normal'>طلب كرسي مرتفع</p>
          </div>

          {/*  */}
          <div className='mt-3 mb-5 flex justify-between'>
            <p className=' text-base font-normal'>
              <span className='text-[#697586] '>{t('Log in')} : </span> {' '}
              <span className='text-[#364152] '>6:15 م</span>
            </p>
            <p className=' text-base font-normal'>
              <span className='text-[#697586] '>{t('Expected arrival')} : </span> {' '}
              <span className='text-[#364152] '>6:15 م</span>
            </p>
          </div>
            {/* btns */} 
          <div className='grid grid-cols-3 gap-4  w-full '>
              

            <button onClick={()=>setOpenNotification(true)} className='flex items-center justify-center gap-1 rounded-[3px] border border-[#E3E8EF] px-2 h-10 w-full cursor-pointer'>
              <p className='text-[#364152] text-sm font-normal'>{t('notice')}</p>
            </button>

            
            <button onClick={()=>setOpenOtp(true)} className='flex items-center justify-center gap-1 rounded-[3px] border border-[#E3E8EF] px-2 h-10 w-full cursor-pointer'>
              <p className='text-[#364152] text-sm font-normal'>{t('Seating')}</p>
            </button>
          
            <button onClick={()=>setOpenDelay(true)}  className='flex items-center justify-center  gap-1 rounded-[3px] border border-[#E3E8EF] px-2 h-10 w-full cursor-pointer'>
              <p className='text-[#364152] text-sm font-normal'>{t('delay')}</p>
            </button>
              
            </div>
        </div>


        

      </div>

      <SendNotificationPage
        open={openNotification}
        setOpen={setOpenNotification}
      />

      <DelayPage
        open={openDelay}
        setOpen={setOpenDelay}
      />

      <SendOtpPage
        open={openOtp}
        setOpen={setOpenOtp}
      />
    </>
  );
}

export default Cards;