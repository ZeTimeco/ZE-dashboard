'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { styled, Switch } from '@mui/material'


function Form({formData , setFormData}) {
  const {t} = useTranslation()

  console.log('formData' , formData);

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
    <div className='shadow-[0px_0px_4px_0px_rgba(0,0,0,0.20)] p-4 rounded-[3px]'>
      <p className='text-[#364152] text-lg font-medium mb-4'>{t('Basic Information')}</p>

      <div className='flex flex-col gap-3'>

        {/*Classification name (Arabic)  */}
        <div className='w-full flex flex-col gap-1'>
          <p className='text-sm font-medium mb-1.5'>
            <span className='text-[#364152] '>{t('Classification name')} ({t('Arabic')})</span>
            <span className=' text-[#F04438]'>*</span>
          </p>  
          <input 
            type="text"
            name='title'
            value={formData?.name?.ar}
            onChange={(e)=>setFormData((prev)=>({
              ...prev,
              name:{
                ...prev.name,
                ar:e.target.value
              }
            }))}
            placeholder={t("Classification name")}
            className={`w-full h-14  p-3 border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] text-sm text-[#364152]  rounded-[3px] outline-none `}
          />
        </div>

        {/*Classification name (English)  */}
        <div className='w-full flex flex-col gap-1'>
          <p className='text-sm font-medium mb-1.5'>
            <span className='text-[#364152] '>{t('Classification name')} ({t('English')})</span>
          </p>  
          <input 
            type="text"
            name='title'
            value={formData?.name?.en}
            onChange={(e)=>setFormData((prev)=>({
              ...prev,
              name:{
                ...prev.name,
                en:e.target.value
              }

            }))}
            placeholder={t("Classification name")}
            className={`w-full h-14  p-3 border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]  text-sm text-[#364152]  rounded-[3px] outline-none `}
          />
        </div>

        {/*description (Arabic)  */}
        <div className='w-full flex flex-col gap-1.5'>
          <p className='text-sm  mb-1.5'>
            <span className='text-[#364152] font-medium'>{t('description')} {t('Arabic')} </span>
            <span className=' text-[#697586] font-normal'>({t('optional')}) </span>
          </p>  
          <textarea
            name="description"
            value={formData?.description?.ar}
            onChange={(e)=>setFormData(
              (prev)=>({
                ...prev,
                description:{
                  ...prev.description,
                  ar:e.target.value
                }
              })
            )}
            placeholder={t("Write a brief description")}
            className="w-full h-25 p-3 border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] text-sm text-[#364152] rounded-[3px] outline-none resize-none"
          />
        </div>

        {/*description (English)  */}
        <div className='w-full flex flex-col gap-1.5'>
          <p className='text-sm  mb-1.5'>
            <span className='text-[#364152] font-medium'>{t('description')} {t('English')} </span>
            <span className=' text-[#697586] font-normal'>({t('optional')}) </span>
          </p>  
          <textarea
            name="description"
            value={formData?.description?.en}
            onChange={(e)=>setFormData(
              (prev)=>({
                ...prev,
                description:{
                  ...prev.description,
                  en:e.target.value
                }

              })
            )}
            placeholder={t("Write a brief description")}
            className="w-full h-25 p-3 border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] text-sm text-[#364152] rounded-[3px] outline-none resize-none"
          />
        </div>

      </div>
    </div>

    {/* Condition and appearance */}
    <div className='shadow-[0px_0px_4px_0px_rgba(0,0,0,0.20)] p-4 rounded-[3px] mt-6'>
      <p className='text-[#364152] text-base font-medium'>{t('Condition and appearance')}</p>
      <div className='mt-4 flex justify-between'>
        <div className='flex flex-col gap-1'>
          <p className='text-[#364152] text-sm font-normal'>{t('active')}</p>
          <p className='text-[#4B5565] text-sm font-normal'>{t('Show this category in the list')}</p>
        </div>

        <div>
          <GreenSwitch
            checked={formData.status === 1}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                status: e.target.checked ? 1 : 0,
              }))
            }
          />
        </div>
      </div>
    </div>


    {/* Appearance settings */}
    <div className='shadow-[0px_0px_4px_0px_rgba(0,0,0,0.20)] p-4 rounded-[3px] mt-6'>
      <p className='text-[#364152] text-base font-medium'>{t('Appearance settings')}</p>
      <div className='mt-4 flex justify-between'>
        <div className='flex flex-col gap-1'>
          <p className='text-[#364152] text-sm font-normal'>{t('available')}</p>
          <p className='text-[#4B5565] text-sm font-normal'>{t('Available for restaurant orders')}</p>
        </div>

        <div>
          <GreenSwitch
            checked={formData.is_visible === 1}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                is_visible: e.target.checked ? 1 : 0,
              }))
            }
          />
        </div>
      </div>
    </div>

    </>
  )
}

export default Form