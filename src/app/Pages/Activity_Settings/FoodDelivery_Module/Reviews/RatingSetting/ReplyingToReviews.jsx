

'use client'
import { styled, Switch } from '@mui/material';
import React from 'react'
import { useTranslation } from 'react-i18next';

function ReplyingToReviews({formData , setFormData}) {
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


  const notes = [
  { id: 1, text:t('Responding to all reviews shows your concern for customers.') },
  { id: 2, text:t('Addressing low ratings quickly improves the impression') },
  { id: 3, text: t('Thanking people for positive reviews encourages loyalty.') },
];

  return (
    <>
      <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4'>
        <p className='flex flex-col gap-1'>
          <span className='text-[#364152] text-base font-medium'>{t('Replying to reviews')}</span>
          <span className='text-[#697586] text-sm font-normal'>{t("Allowing responses to customer reviews")}</span>
        </p>

        <div className='border border-[#E3E8EF] my-4'></div>

        {/* Allow replies */}
        <div className='flex justify-between border border-[#CDD5DF] bg-[white] rounded-3px mt-4 p-4'>
        <div>
          <p className='flex flex-col gap-1'>
            <span className='text-[#364152] text-sm font-medium'>{t('Allow replies')}</span>
            <span className='text-[#697586] text-xs font-normal'>{t('Employees and managers can respond to reviews.')}</span>
          </p>
        </div>

        <div className='flex items-center'>
          <GreenSwitch
            checked={formData?.replies_enabled}
            onChange={(e)=>{
              setFormData((prev)=>({
                ...prev,
                replies_enabled : e.target.checked ? 1 : 0
              }))
            }}
          />
        </div>
        </div>


        </div>



      {/* note */}
      <div className="w-full border border-[#FEC84B] bg-[#FFFCF5] px-4 py-3 rounded-3px">
        <div className="flex items-start gap-2">
          <span className=" mt-1">
            <img src="/images/icons/ii.svg" alt="" />
          </span>

          <div className="flex flex-col gap-1 text-right flex-1">
            <p className="text-[#93370D] text-base font-normal">
              {t('Reputation management tips')}
            </p>

            <ul className="flex flex-col gap-1 text-[#F79009] text-sm font-normal">
              {notes.map((note) => (
                <li key={note.id} className="flex gap-1">
                  <span>•</span>
                  <span>{note.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>


    </>
  )
}

export default ReplyingToReviews