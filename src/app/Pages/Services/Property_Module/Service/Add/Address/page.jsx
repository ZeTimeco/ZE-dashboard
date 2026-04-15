"use client"
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Switch } from '@mui/material';
import { styled } from '@mui/material/styles';
import MapDialog from './MapDialog';

function AddressPage({prevStep , nextStep }) {
    const {t} = useTranslation();
    const [count, setCount] = useState(0);
    const [openMap, setOpenMap] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(t('Click to open the map'));

    const handleMapConfirm = (data) => {
      if (data.address) {
        setSelectedAddress(data.address);
      }
    };

    const GreenSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
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
          borderRadius: 24 / 2,
          backgroundColor: '#E9E9EA',
          opacity: 1,
          transition: theme.transitions.create(['background-color'], {
            duration: 500,
          }),
        },
    }));

    const SiteTips = [
    {id:1 , title:t('The precise location helps guests easily find their royal accommodation.')},
    {id:2 , title:t('Your exact address will remain private until you book.')},
    {id:3 , title:t('A pin should be placed at the building entrance.')},
    ]
  return (
    <>

      <div className='border border-[#E6E6E6] p-8 rounded-[3px]'>
        <div>
          <p className='text-[#364152] text-xl font-medium mb-3'>
            <span>{t('Step')} 2 :</span>
            <span>{t('the address')}</span>
          </p>
          <p className='text-[#697586] text-base font-normal'>{t('Enter the address details to begin adding it')}</p>
          <div className='border border-[#CDD5DF] my-4'></div>
        </div>

        {/* the address */}
        <div className="flex flex-col mt-10">
          <p className='text-sm font-medium mb-1.5'>
            <span className='text-[#364152] '>{t('the address')} </span>
            <span className=' text-[#F04438]'>*</span>
          </p>
          <div className="relative w-full">
            <textarea
              onChange={(e) => setCount(e.target.value.length)}
              placeholder={t("Write a brief description of the property.")}
              maxLength={500}
              className="w-full h-20 border border-[#C8C8C8] rounded-[3px] p-3 text-sm text-[#7d8d84]  outline-none "
            />

            {/* counter */}
            <span className="absolute bottom-3 left-3 text-[#9A9A9A] text-sm">
              {count}/500
            </span>
          </div>
        </div>

        {/*  */}
        <div className='border border-[#CDD5DF] p-3 rounded-[3px] flex justify-between mt-4'>
          <p className='text-[#4B5565] text-xs font-normal flex items-center '>{t('Show the user the exact and detailed address before booking')}</p>
          <div>
            <GreenSwitch />
          </div>
        </div>

        {/* note */}
        <div className='flex gap-2 mt-3'>
          <img src="/images/icons/ii.svg" alt="" />
          <p className='text-[#9AA4B2] text-sm font-normal'>{t('Disabling the display of the specified address will result in the user being shown a radius of one square kilometer until the booking is completed.')}</p>
        </div>

        {/* Locate the site on the map */}
        <div className='mt-6'>
          <p className='text-[#364152] text-sm font-medium'>{t('Locate the site on the map')}</p>

          <div 
            className='bg-[#F8FAFC] border border-[#EEF2F6] p-3 w-full  rounded-[3px] flex justify-between mt-4 cursor-pointer hover:bg-[#EEF2F6]'
            onClick={() => setOpenMap(true)}
          >
            <div className='flex gap-1 w-full'>
              <img src="/images/icons/location_gray.svg" alt="" />
              <p className='text-[#4B5565] text-xs font-normal flex items-center '>
                {selectedAddress}
              </p>
            </div>
            <p>
              <img src="/images/icons/google-map-icon.svg" alt="" />
            </p>
          </div>
        </div>

        <div className='border border-[#FEDF89] bg-[#FFFCF5] rounded-[3px] px-3 py-4 mt-4'>
          <div className='flex gap-2'>
            <img src="/images/icons/ii.svg" alt="" />
            <p className='text-[#364152] text-base font-medium'>{t('Site tips')}</p>
          </div>
            
          <div className='flex flex-col gap-2   my-4'>
            {SiteTips?.map((items,index)=>(
            <div key={items?.id} className='flex gap-1 w-[95%]  '>
              <img src="/images/icons/true.svg" className="w-6 h-6 " />
              <p className='text-[#4B5565] text-sm font-normal  '>{items?.title}</p>
            </div>
          ))}
          </div>
        </div>







        {/* Map Dialog */}
        <MapDialog 
          open={openMap} 
          handleClose={() => setOpenMap(false)} 
          onConfirm={handleMapConfirm}
        />

        {/* btn */}
        <div className="flex justify-between mt-6">
          <div className='w-full '>
            <button
              onClick={prevStep}
              className=" w-[25%] h-15 border border-[#697586] text-[#697586] rounded-[3px] cursor-pointer"
            >
              {t('the previous')}
            </button>
          </div>
          
          <div className='flex gap-2 justify-end w-full '>
            <button
              className="h-15 w-[30%]  border border-[#697586] text-[#697586] rounded-[3px] cursor-pointer"
            >
              {t('Save draft')}
            </button>

            <button
              onClick={nextStep}
              className="h-15 w-[25%] bg-[var(--color-primary)] text-white rounded-[3px] cursor-pointer"
            >
              {t('the next')}
            </button>
          </div>
          
        </div>

      </div>
    </>
  )
}

export default AddressPage