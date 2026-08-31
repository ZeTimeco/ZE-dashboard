'use client';
import { Switch } from '@mui/material';
import { styled } from '@mui/material/styles'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
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

  // console.log('profileData*********************', profileData?.provider?.is_active);

  const handleStatusChange = (event) => {
    const token = event.target.checked;
    dispatch(changeStatusThunk(token)).then(() => {
      dispatch(getProfileThunk());
    });
  };

  const GreenSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 50,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 3,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(24px)', 
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
        color: '#10B981',
        border: '4px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: theme.palette.grey[100],
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 20,
      height: 20,
      boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: '#E2E8F0',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 300,
      }),
    },
  }));

  const title = getModuleTitle(current_module_key, t);
  const isActive = Boolean(profileData?.provider?.is_active);

  return (
    <>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2'>
        <div>
          <div className='flex items-center gap-2 mb-1.5'>
            <h1 className='text-[#1E293B] text-2xl lg1:text-3xl font-semibold tracking-tight'>
              {title}
            </h1>
          </div>
          <p className='text-[#64748B] text-sm lg1:text-base font-normal leading-relaxed'>
            تابع وادِر طلبات الخدمات المنزلية بسهولة وكفاءة.
          </p>
        </div>

        <motion.div 
          whileHover={{ y: -2, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.06), 0 8px 10px -6px rgba(0, 0, 0, 0.04)' }}
          transition={{ duration: 0.2 }}
          className='flex items-center justify-between gap-4 bg-white border border-slate-200/90 rounded-2xl shadow-xs px-5 py-3.5 min-w-[240px] md:w-auto hover:border-slate-300 transition-all duration-300'
        >
          <div className='flex items-center gap-2.5'>
            <span className='relative flex h-3 w-3'>
              {isActive ? (
                <>
                  <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75'></span>
                  <span className='relative inline-flex rounded-full h-3 w-3 bg-emerald-500'></span>
                </>
              ) : (
                <span className='relative inline-flex rounded-full h-3 w-3 bg-slate-300'></span>
              )}
            </span>
            <p className='text-[#1E293B] text-sm md:text-base font-medium select-none'>
              {t('Current situation')}
            </p>
          </div>
          <GreenSwitch checked={isActive} onChange={handleStatusChange} />
        </motion.div>
      </div>
    </>
  )
}

export default TileOfSevicesPage
