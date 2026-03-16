"use client";
import { getProviderStateThunk } from '@/redux/slice/Home/HomeSlice';
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

function BoxPage({current_module_key}) {
  const {t} = useTranslation();
  
  //API
  const dispatch = useDispatch()
  const {providerState}= useSelector((state)=>state.Home)

  useEffect(() => {
    dispatch(getProviderStateThunk())
  }, [dispatch]);
  console.log(providerState);

  // Determine the role of the provider
  const role =providerState ?.role  // 'freelance'  'company'

  return (
    <>

    <section className='mb-10 grid grid-cols-2 lg1:grid-cols-4 gap-4 '>

      {/* New orders */}
      <div className=' border border-[#CDD5DF] rounded-[3px] p-4'>
        <div className='flex items-center gap-3'>
          <p className=' w-10 h-10 flex justify-center items-center bg-[#FEF3F2] rounded-md'>
            <img src="/images/icons/invoice-red.svg" alt="" />
          </p>
          <p className=''>{t('New orders')}</p>
        </div>
        <p className='text-[#202939] text-lg font-medium my-2.5'>{t('today')} ({providerState?.new_bookings_count})</p>
      </div>
    
      {/* Current Orders */}
      <div className=' border border-[#CDD5DF] rounded-[3px] p-4'>
        <div className='flex items-center gap-3'>
          <p className=' w-10 h-10 flex justify-center items-center bg-[#B4F0CC] rounded-md'>
            <img src="/images/icons/invoice-green.svg" alt="" />
          </p>
          <p className=''>{t('Current Orders')}</p>
        </div>
        <p className='text-[#202939] text-lg font-medium my-2.5'>{providerState?.ongoing_bookings_count}</p>
      
      </div>

      {/* profits */}
      <div className=' border border-[#CDD5DF] rounded-[3px] p-4'>
        <div className='flex items-center gap-3'>
          <p className=' w-10 h-10 flex justify-center items-center bg-[#FEF0C7] rounded-md'>
            <img src="/images/icons/profits-orange.svg" alt="" />
          </p>
          <p className=''>{t('profits')}</p>
        </div>
        <p className='text-[#202939] text-lg font-medium my-2.5'>{t('today')} ({providerState?.today_earnings})</p>
      </div>

      {/* Evaluation */}
      {/* Conditional Display based on current_module_key and role */}
      {(() => {
        if (current_module_key === 'street_assistant') {
          if (role === 'company') {
            return (
              <div className=' border border-[#CDD5DF] rounded-[3px] p-4'>
                <div className='flex items-center gap-3'>
                  <p className=' w-10 h-10 flex justify-center items-center bg-[#EDE7FD] rounded-md'>
                    <img src="/images/icons/labor-blue.svg" alt="" />
                  </p>
                  <p className=''>{t('Available technicians')}</p>
                </div>
                <div className='my-2.5 flex gap-1'>
                  <p className='text-[#121926] text-base font-medium'>
                    <span>50</span>{' '}
                    <span>{t('Technicians')}</span>
                  </p>
                </div>
              </div> 
            );
          } else {
            return (
              <div className=' border border-[#CDD5DF] rounded-[3px] p-4'>
                <div className='flex items-center gap-3'>
                  <p className=' w-10 h-10 flex justify-center items-center bg-[#EDE7FD] rounded-md'>
                    <img src="/images/icons/Evaluation-blue.svg" alt="" />
                  </p>
                  <p className=''>{t('Evaluation')}</p>
                </div>
                <div className='my-2.5 flex gap-1'>
                  <img src="/images/icons/star.svg" alt="" />
                  <p className='text-[#FDB022] text-base font-medium'>{providerState?.average_rating}</p>
                </div>
              </div> 
            );
          }
        } else if(current_module_key === 'car_services') {
          return  (
            <div className=' border border-[#CDD5DF] rounded-[3px] p-4'>
              <div className='flex items-center gap-3'>
                <p className=' w-10 h-10 flex justify-center items-center bg-[#EDE7FD] rounded-md'>
                  <img src="/images/icons/checkmark-circle-blue.svg" alt="" />
                </p>
                <p className=''>{t('Completed applications')}</p>
              </div>
              <p className='text-[#202939] text-lg font-medium my-2.5'>44</p>
            </div>
          )
        }else {
          return (
            <div className=' border border-[#CDD5DF] rounded-[3px] p-4'>
              <div className='flex items-center gap-3'>
                <p className=' w-10 h-10 flex justify-center items-center bg-[#EDE7FD] rounded-md'>
                  <img src="/images/icons/Evaluation-blue.svg" alt="" />
                </p>
                <p className=''>{t('Evaluation')}</p>
              </div>
              <div className='my-2.5 flex gap-1'>
                <img src="/images/icons/star.svg" alt="" />
                <p className='text-[#FDB022] text-base font-medium'>{providerState?.average_rating}</p>
              </div>
            </div> 
          )
        }
      })()}


    </section>
    </>
  )
}

export default BoxPage