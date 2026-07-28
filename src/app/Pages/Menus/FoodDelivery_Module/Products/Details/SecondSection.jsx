'use client'
import { styled, Switch } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { toggleAvailabilityThunk, getProductDetailsThunk, updateStatusesThunk } from '@/redux/slice/Menus/MenusSlice'

function SecondSection({getProductDetailsData}) {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const [open , setOpen] = useState(false)
  const [open2 , setOpen2] = useState(false)

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
    
  const handleToggleAvailability = async () => {
    if (getProductDetailsData?.id) {
      const result = await dispatch(toggleAvailabilityThunk(getProductDetailsData.id))
      if (!result.error) {
        dispatch(getProductDetailsThunk(getProductDetailsData.id))
      }
    }
  }

  const handleToggleVisibility = async () => {
    if (getProductDetailsData?.id) {
      const newVisibility = getProductDetailsData?.is_visible === 1 ? 0 : 1
      const payload = {
        item_id: getProductDetailsData.id,
        is_visible: newVisibility
      }
      const result = await dispatch(updateStatusesThunk(payload))
      if (!result.error) {
        dispatch(getProductDetailsThunk(getProductDetailsData.id))
      }
    }
  }

  return (
    <>
      {/* Additions */}
      <div className="shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4 mb-4">
        <div className="flex justify-between">
          <p className="text-[#364152] text-base font-normal">
            {t("Additions")}
          </p>

          <button
            onClick={() => setOpen(!open)}
            className="cursor-pointer transition-transform duration-300"
          >
            <img
              src="/images/icons/ArrowDown_gray.svg"
              alt="arrow"
              className={`transition-transform duration-300 ${
                open ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>

        {open &&  getProductDetailsData?.addons?.map((addon) => (
            <div
              key={addon?.id}
              className="p-3 border border-[#E3E8EF] rounded-[3px] my-5 cursor-pointer"
            >
              <div className="flex gap-4">
                <div className="bg-[#F9F5E8] w-14 h-12 flex justify-center items-center rounded-[3px]">
                  <img src="/images/burger.svg" alt="" />
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[#364152] text-base font-normal">
                    {addon?.name}
                  </span>
                  <span className="text-[var(--color-primary)] text-base font-normal">
                    {addon?.base_price}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Options */}
      <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)]  p-4 mb-4'>
        <div className='flex justify-between'>
          <p className='text-[#364152] text-base font-normal'>{t('Options')}</p>
          <button
            onClick={() => setOpen2(!open2)}
            className="cursor-pointer transition-transform duration-300"
          >
            <img
              src="/images/icons/ArrowDown_gray.svg"
              alt="arrow"
              className={`transition-transform duration-300 ${
                open2 ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>
        {open2 && getProductDetailsData?.foodDeliveryOptionGroups?.map((option) => (
            <div
              key={option?.id}
              className="p-3 border border-[#E3E8EF] rounded-[3px] my-5 cursor-pointer"
            >
              <p className="text-[#364152] text-base font-normal">
                {option.name}
              </p>

              <p className="text-[#697586] text-sm font-normal">
                {option.options?.map((item) => item.name).join(" / ")}
              </p>
            </div>
          ))
        }
      </div>

      {/* Available for order */}
      <div className='border border-[#EEF2F6] bg-[#F8FAFC] p-3 rounded-[3px] flex justify-between'>
        <p className='flex flex-col gap-1'>
          <span className='text-[#364152] text-base font-medium'>{t('Available for order')}</span>
          <span className='text-[#697586] text-sm font-normal'>{t('Customers can order this product')}</span>
        </p>
        <p className='flex items-center'>
          <GreenSwitch
            checked={getProductDetailsData?.status === "active"}
            onChange={handleToggleAvailability}
          />
        </p>
      </div>


      {/* Availability status */}
      <div className='border border-[#EEF2F6] bg-[#F8FAFC] p-3 rounded-[3px] flex justify-between my-4'>
        <p className='flex flex-col gap-1'>
          <span className='text-[#364152] text-base font-medium'>{t('Availability status')}</span>
          <span className='text-[#697586] text-sm font-normal'>{t('The product is available to order')}</span>
        </p>
        <p className='flex items-center'>
          <GreenSwitch
            checked={getProductDetailsData?.is_visible === 1}
            onChange={handleToggleVisibility}
          />
        </p>
      </div>
      
    </>
  )
}

export default SecondSection