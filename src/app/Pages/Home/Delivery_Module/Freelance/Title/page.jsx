'use client';
import { Switch } from '@mui/material';
import { styled } from '@mui/material/styles'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';


function TitlePage() {
  const {t} = useTranslation();
  
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

  const [isConnected, setIsConnected] = useState(false);


  return (
    <>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10'>
        <div>
          <div className='flex items-center gap-2 mb-1.5'>
            <h1 className='text-[#697586] text-xl font-normal tracking-tight'>
              اهلا بيك 
            </h1>
          </div>
          <p className='text-[#364152] text-2xl  font-medium leading-relaxed'>
            أحمد محمد 
          </p>
        </div>

      <motion.div
        whileHover={{ y: -2, boxShadow:"0 10px 25px -5px rgba(0, 0, 0, 0.06), 0 8px 10px -6px rgba(0, 0, 0, 0.04)",}}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-between gap-4 bg-white border border-slate-200/90 rounded-3px shadow-xs px-5 py-3.5 min-w-[240px] md:w-auto hover:border-slate-300 transition-all duration-300"
      >
        <div className="flex items-center gap-2.5">
          <p className="text-[#1E293B] text-sm md:text-base font-medium select-none">
            {isConnected ? t("Connected to orders") : t("Offline for orders")}
          </p>
        </div>

        <GreenSwitch
          checked={isConnected}
          onChange={(e) => setIsConnected(e.target.checked)}
        />
      </motion.div>

      </div>
    </>
  )
}

export default TitlePage
