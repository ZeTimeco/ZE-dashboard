'use client'
import { styled, Switch } from '@mui/material';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

function LowRatingAlerts() {
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

  const [selectedRating, setSelectedRating] = useState(null);

  return (
    <>
      <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4'>
        <p className='flex flex-col gap-1'>
          <span className='text-[#364152] text-base font-medium'>{t('Low rating alerts')}</span>
          <span className='text-[#697586] text-sm font-normal'>{t("Receive instant alerts for low ratings")}</span>
        </p>

        <div className='border border-[#E3E8EF] my-4'></div>

        {/* Enable notifications */}
        <div className='flex justify-between border border-[#CDD5DF] bg-[white] rounded-3px mt-4 p-4'>
          <div>
            <p className='flex flex-col gap-1'>
              <span className='text-[#364152] text-sm font-medium'>{t('Enable notifications')}</span>
              <span className='text-[#697586] text-xs font-normal'>{t('Send an alert when you receive a low rating')}</span>
            </p>
          </div>

          <div className='flex items-center'>
            <GreenSwitch
            />
          </div>
        </div>

        {/* Low rating solution */}
        <div className='mt-4'>
          <p className='flex flex-col gap-1'>
            <span className='text-[#364152] text-sm font-medium'>{t('Low rating solution')}</span>
            <span className='text-[#697586] text-xs font-normal'>{t('Receive an alert when ratings are lower than or equal to')}</span>
          </p>

          <div className="grid grid-cols-5 gap-6 mt-4">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => setSelectedRating(rating)}
                className={`border p-4 flex flex-col justify-center items-center rounded-3px cursor-pointer transition-all
                  ${
                    selectedRating === rating
                      ? "border-primary bg-[#F9F5E8]"
                      : "border-[#E3E8EF] bg-white hover:border-primary"
                  }
                `}
              >
                <img src="/images/icons/star.svg" alt="star"  className="w-5 h-5" />

                <p className={`${selectedRating === rating ? 'text-primary':'text-[#4B5565]'}  text-sm font-normal mt-2`}>
                  {rating}
                </p>
              </button>
            ))}
          </div>
          
        </div>


        {/* note */}
        <div className='border border-[#FDA29B] bg-[#FFFAEB] rounded-3px flex gap-2 mt-4 p-3'>
          <img src="/images/icons/alert-red.svg" alt="" />
          <p className='text-[#F04438] text-base font-normal'>{t('You will receive an alert when your rating is 3 stars or less.')}</p>
        </div>


      </div>
      
    </>
  )
}

export default LowRatingAlerts