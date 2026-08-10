'use client'
import { styled, Switch } from '@mui/material';
import React from 'react'
import { useTranslation } from 'react-i18next'

function TypesOfAlerts() {
  const {t} = useTranslation()

  const GreenSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
    ))(({ theme }) => ({
      width: 53,
      height: 24,
      padding: 0,
  
      '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 3,
        transitionDuration: '500ms',
  
        '&.Mui-checked': {
          transform: 'translateX(31px)',
          color: '#fff',
  
          '& + .MuiSwitch-track': {
            backgroundColor: '#10B981',
            opacity: 1,
            border: 0,
          },
  
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.5,
          },
        },
  
        '&.Mui-focusVisible .MuiSwitch-thumb': {
          color: '#33cf4d',
          border: '6px solid #fff',
        },
  
        '&.Mui-disabled .MuiSwitch-thumb': {
          color: theme.palette.grey[100],
        },
      },
  
      '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 18,
        height: 18,
      },
  
      '& .MuiSwitch-track': {
        borderRadius: 12,
        backgroundColor: '#E9E9EA',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
          duration: 500,
        }),
      },
    }));

  return (
    <>
    <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4 rounded-[3px]'>

      <p className='flex flex-col gap-1'>
        <span className='text-[#364152] text-base font-medium'>{t('Types of alerts')}</span>
        <span className='text-[#697586] text-sm font-normal'>{t("Control which alerts you want to receive")}</span>
      </p>

      {/* New orders  */}
      <div className='flex justify-between border border-[#CDD5DF] bg-[white] rounded-[3px] mt-4 p-4'>
        <div className='flex gap-2'>
          <div className='flex items-center'>
            <p className='bg-[#FEE4E2] w-8 h-8 flex justify-center items-center rounded-[3px]' >
              <img src="/images/icons/notification_red.svg" className="w-5 h-5" />
            </p>
          </div>
          
          <p className='flex flex-col gap-1'>
            <span className='text-[#364152] text-sm font-medium'>{t('New orders')}</span>
            <span className='text-[#697586] text-xs font-normal'>{t('Notification when a new order arrives')}</span>
          </p>
        </div>

        <div className='flex items-center'>
          <GreenSwitch/>
        </div>
      </div>

      {/* note */}
      <div className='border border-[#FDA29B] bg-[#FEF3F2] rounded-[3px] flex justify-center gap-2 my-4 p-3'>
        <img src="/images/icons/alert-red.svg" alt="" />
        <p className='text-[#F04438] text-base font-normal'>{t('Make sure to enable new order alerts to avoid missing any orders.')}</p>
      </div>

      {/* Order status updates  */}
      <div className='flex justify-between border border-[#CDD5DF] bg-[white] rounded-[3px] mt-4 p-4'>
        <div className='flex gap-2'>
          <div className='flex items-center'>
            <p className='bg-[#EDE7FD] w-8 h-8 flex justify-center items-center rounded-[3px]' >
              <img src="/images/icons/square-blue.svg" className="w-5 h-5" />
            </p>
          </div>
          
          <p className='flex flex-col gap-1'>
            <span className='text-[#364152] text-sm font-medium'>{t('Order status updates')}</span>
            <span className='text-[#697586] text-xs font-normal'>{t('Notification when order status changes')}</span>
          </p>
        </div>

        <div className='flex items-center'>
          <GreenSwitch/>
        </div>
      </div>

      {/* Delivery problems */}
      <div className='flex justify-between border border-[#CDD5DF] bg-[white] rounded-[3px] mt-4 p-4'>
        <div className='flex gap-2'>
          <div className='flex items-center'>
            <p className='bg-[#FEF0C7] w-8 h-8 flex justify-center items-center rounded-[3px]' >
              <img src="/images/icons/delivery-truck-yellow.svg" className="w-5 h-5" />
            </p>
          </div>
          
          <p className='flex flex-col gap-1'>
            <span className='text-[#364152] text-sm font-medium'>{t('Delivery problems')}</span>
            <span className='text-[#697586] text-xs font-normal'>{t('Alert if a connection problem occurs')}</span>
          </p>
        </div>

        <div className='flex items-center'>
          <GreenSwitch/>
        </div>
      </div>

      {/* Customer messages  */}
      <div className='flex justify-between border border-[#CDD5DF] bg-[white] rounded-[3px] mt-4 p-4'>
        <div className='flex gap-2'>
          <div className='flex items-center'>
            <p className='bg-[#DCFAE6] w-8 h-8 flex justify-center items-center rounded-[3px]' >
              <img src="/images/icons/comment-green.svg" className="w-5 h-5" />
            </p>
          </div>
          
          <p className='flex flex-col gap-1'>
            <span className='text-[#364152] text-sm font-medium'>{t('Customer messages')}</span>
            <span className='text-[#697586] text-xs font-normal'>{t('Notification when a new message is sent by the customer')}</span>
          </p>
        </div>

        <div className='flex items-center'>
          <GreenSwitch/>
        </div>
      </div>

    </div>  
    </>
  )
}

export default TypesOfAlerts