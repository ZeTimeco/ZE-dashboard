"use client"
import React from 'react'
import { styled, Switch } from '@mui/material'
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

function Content({ formData, setFormData }) {
  const { t } = useTranslation()

  const set = (key, value) => setFormData(prev => ({ ...prev, [key]: value }))

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

  const inputClassNameTrue = "w-5 h-5 appearance-none border border-gray-300 rounded-sm bg-white cursor-pointer relative checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] after:absolute after:hidden checked:after:block checked:after:content-['✓'] checked:after:text-white checked:after:text-xs checked:after:font-bold checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 transition-colors";

  return (
    <>
      {/* Hours */}
      <div className='flex justify-between items-center py-2'>
        <p className='flex flex-col gap-1'>
          <span className='text-[#364152] text-base font-semibold'>{t('No-attendance is automatically recorded after')} X {t('hours')}</span>
          <span className='text-[#697586] text-sm font-normal'>{t('Automatically setting reservations for non-attendance')}</span>
        </p>
        <GreenSwitch
          checked={!!formData?.auto_set_no_show}
          onChange={(e) => set('auto_set_no_show', e.target.checked)}
        />
      </div>
      
      <AnimatePresence>
        {!!formData?.auto_set_no_show && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className='mt-4 overflow-hidden'
          >
            <p className='text-[#364152] text-sm font-medium'>{t('Hours after check-in time')}</p>
          
            <div className='flex items-center gap-3 py-2'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type='button'
                onClick={() => set('no_show_after_hours', Math.max(0, (Number(formData.no_show_after_hours) || 0) - 1))}
                className='w-12.5 h-11 flex items-center justify-center text-[#4B5565] bg-[#F8FAFC] border border-[#E3E8EF] text-base font-semibold rounded-[3px] transition cursor-pointer hover:bg-slate-200/60'
              >
                -
              </motion.button>

              <span className='w-full h-11 text-[#4B5565] flex items-center justify-center font-medium text-center bg-[#F8FAFC] border border-[#E3E8EF] rounded-[3px] shadow-2xs'>
                {formData?.no_show_after_hours || 0} {t('hours')}
              </span>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type='button'
                onClick={() => set('no_show_after_hours', Math.max(0, (Number(formData.no_show_after_hours) || 0) + 1))}
                className='w-12.5 h-11 flex items-center justify-center text-[#4B5565] bg-[#F8FAFC] border border-[#E3E8EF] text-base font-semibold rounded-[3px] transition cursor-pointer hover:bg-slate-200/60'
              >
                +
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Booking completed automatically after departure */}
      <div className='mt-6 pt-4 border-t border-gray-100 flex justify-between items-center'>
        <p className='flex flex-col gap-1'>
          <span className='text-[#364152] text-base font-semibold'>{t('Booking completed automatically after departure')}</span>
          <span className='text-[#697586] text-sm font-normal'>{t('The reservation is complete upon the guest s departure.')}</span>
        </p>
        <GreenSwitch
          checked={!!formData?.auto_complete_booking_on_no_show}
          onChange={(e) => set('auto_complete_booking_on_no_show', e.target.checked)}
        />
      </div>

      {/* No-attendance policy */}
      <div className='mt-8 pt-4 border-t border-gray-100'>
        <p className='text-[#364152] text-base font-semibold'>{t('No-attendance policy')}</p>
        <div className='mt-3 grid grid-cols-1 md:grid-cols-3 gap-4'>
          {/* Collect the full amount */}
          <div 
            onClick={() => setFormData(prev => ({ ...prev, no_show_collection_policy: 'collect_all' }))}
            className={`flex justify-between items-center border py-4 px-4 rounded-[3px] cursor-pointer transition-all duration-200 ${
              formData?.no_show_collection_policy === "collect_all" ? 'border-[var(--color-primary)] bg-[#FFFDF5]' : 'border-[#CDD5DF] hover:border-slate-400'
            }`}
          >
            <p>
              <span className='text-[#364152] text-sm font-medium'>{t('Collect the full amount')}</span>
            </p>
            <input 
              type="radio" 
              className={inputClassNameTrue}
              name='box'
              checked={formData?.no_show_collection_policy === "collect_all"}
              onChange={() =>
                setFormData((prev) => ({
                  ...prev,
                  no_show_collection_policy: 'collect_all'
                }))
              }
            />
          </div>

          {/* Charge only for the first night */}
          <div 
            onClick={() => setFormData(prev => ({ ...prev, no_show_collection_policy: 'collect_one_night' }))}
            className={`flex justify-between items-center border py-4 px-4 rounded-[3px] cursor-pointer transition-all duration-200 ${
              formData?.no_show_collection_policy === "collect_one_night" ? 'border-[var(--color-primary)] bg-[#FFFDF5]' : 'border-[#CDD5DF] hover:border-slate-400'
            }`}
          >
            <p>
              <span className='text-[#364152] text-sm font-medium'>{t('Charge only for the first night')}</span>
            </p>
            <input 
              type="radio" 
              className={inputClassNameTrue}
              name='box'
              checked={formData?.no_show_collection_policy === "collect_one_night"}
              onChange={() =>
                setFormData((prev) => ({
                  ...prev,
                  no_show_collection_policy: 'collect_one_night'
                }))
              }
            />
          </div>

          {/* Without collection */}
          <div 
            onClick={() => setFormData(prev => ({ ...prev, no_show_collection_policy: 'collect_nothing' }))}
            className={`flex justify-between items-center border py-4 px-4 rounded-[3px] cursor-pointer transition-all duration-200 ${
              formData?.no_show_collection_policy === "collect_nothing" ? 'border-[var(--color-primary)] bg-[#FFFDF5]' : 'border-[#CDD5DF] hover:border-slate-400'
            }`}
          >
            <p>
              <span className='text-[#364152] text-sm font-medium'>{t('Without collection')}</span>
            </p>
            <input 
              type="radio" 
              className={inputClassNameTrue}
              name='box'
              checked={formData?.no_show_collection_policy === "collect_nothing"}
              onChange={() =>
                setFormData((prev) => ({
                  ...prev,
                  no_show_collection_policy: 'collect_nothing'
                }))
              }
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Content