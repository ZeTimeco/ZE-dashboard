'use client'
import { styled, Switch } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

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
}))

const fadeInUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
}

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
    },
  },
}

function FleetAndPermissionsSettingsPage() {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <motion.div
      className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] rounded-3px p-4 mt-6 transition-shadow duration-300 hover:shadow-[0_4px_16px_0_rgba(0,0,0,0.12)]'
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      <motion.p
        className='text-[#161616] text-xl font-normal'
        variants={rowVariants}
      >
        {t('Fleet and powers')}
      </motion.p>

      <div className="h-[0.5px] bg-[#E3E8FEAA] my-4" />

      <motion.div
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Fleet */}
        <motion.div className='flex justify-between mt-4' variants={rowVariants}>
          <p className='text-[#161616] text-base font-normal'>{t('Fleet')}</p>
          <motion.button
            onClick={()=>router.push(`/Pages/Activity_Settings/Delivery_Module/Company/FleetAndPermissionsSettings/Fleet`)}
            className='cursor-pointer group'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <p className='flex items-center transition-transform duration-200 group-hover:translate-x-0.5'>
              <img src="/images/icons/arrowyellowOnly.svg" alt="" />
            </p>
          </motion.button>
        </motion.div>

        {/* Allowing the driver to refuse the request */}
        <motion.div className='flex justify-between mt-4' variants={rowVariants}>
          <p className='text-[#161616] text-base font-normal'>{t('Allowing the driver to refuse the request')}</p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <GreenSwitch />
          </motion.div>
        </motion.div>

        {/* Fleet Coverage Area */}
        <motion.div className='flex justify-between mt-4' variants={rowVariants}>
          <p className='text-[#161616] text-base font-normal'>{t('Fleet Coverage Area')}</p>
          <motion.button
            onClick={()=>router.push(`/Pages/Activity_Settings/Delivery_Module/Company/FleetAndPermissionsSettings/Workplaces`)}
            className='cursor-pointer group'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <p className='flex items-center transition-transform duration-200 group-hover:translate-x-0.5'>
              <img src="/images/icons/arrowyellowOnly.svg" alt="" />
            </p>
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default FleetAndPermissionsSettingsPage