import { styled, Switch } from '@mui/material';
import React from 'react'
import { useTranslation } from 'react-i18next'

function DeliveryBehavior({formData , setFormData}) {
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
    <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4 rounded-3px'>
      <p className='flex flex-col gap-1'>
        <span className='text-[#364152] text-base font-medium'>{t('Delivery behavior')}</span>
        <span className='text-[#697586] text-sm font-normal'>{t('Default settings for the connection process')}</span>
      </p>

      <div className='flex justify-between border border-primary bg-[#FFFDF5] rounded-3px mt-4 p-4'>

        <div className='flex gap-2'>
          <p >
            <img src="/images/icons/eyeYellow.svg" className="w-6 h-6" />
          </p>
          <p className='flex flex-col gap-1'>
            <span className='text-[#364152] text-sm font-medium'>{t('default preparation time')}</span>
            <span className='text-[#697586] text-xs font-normal'>{t('Estimated order preparation time (in minutes)')}</span>
          </p>
        </div>

        <div className='flex items-center'>
          <GreenSwitch
            checked={formData?.delivery_allow_without_touch === 1}
            onChange={
              (e)=>{
                setFormData((prev)=>({
                  ...prev,
                  delivery_allow_without_touch : e.target.checked ? 1 : 0
                }))
              }
            }
          />
        </div>


      </div>
    </div>      

    </>
  )
}

export default DeliveryBehavior