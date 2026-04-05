'use client';
import { Switch } from '@mui/material';
import { styled } from '@mui/material/styles'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getModuleTitle } from '../../../../../../../config/getModuleTitle';
import { changeStatusThunk } from '@/redux/slice/Home/HomeSlice';
import { getProfileThunk } from '@/redux/slice/Setting/SettingSlice';

function TileOfSevicesPage({current_module_key}) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const { profileData } = useSelector((state) => state.setting);

  useEffect(()=>{
    dispatch(getProfileThunk())
  },[dispatch])

console.log('profileData*********************', profileData?.provider?.is_active);

  const handleStatusChange = (event) => {
    const token = event.target.checked;
    dispatch(changeStatusThunk(token)).then(() => {
      dispatch(getProfileThunk());
    });
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

  const title = getModuleTitle(current_module_key, t)


  return (
    <>
    <div className='flex justify-between mb-10 '>
      <div>
        <p className='text-[#364152]  text-2xl font-medium mb-3'>{title}</p> 
        <p className='text-[#697586] text-base font-normal'>تابع وادِر طلبات الخدمات المنزلية بسهولة وكفاءة.</p>
      </div>
      <div className='flex items-center justify-between gap-3 border border-[#CDD5DF] rounded-[3px] w-[30%]  p-4'>
        <p className='text-[#364152] text-base font-normal'>{t('Current situation')}</p>
        <GreenSwitch checked={profileData?.provider?.is_active} onChange={handleStatusChange} />
      </div>
    </div>
    

    </>
  )
}

export default TileOfSevicesPage