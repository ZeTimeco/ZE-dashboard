'use client'
import React, { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { styled, Switch } from '@mui/material'


function Form() {
  const {t} = useTranslation()
  const [images, setImages] = useState([])
  const fileInputRef = useRef(null)

  const handleAddImage = (e) => {
    const files = Array.from(e.target.files)
    if (!files.length) return
    const remaining = 5 - images.length
    const toAdd = files.slice(0, remaining).map((file) => ({
      id: Math.random().toString(36).slice(2),
      url: URL.createObjectURL(file),
      name: file.name,
    }))
    setImages((prev) => [...prev, ...toAdd])
    e.target.value = ''
  }

  const handleRemoveImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
  }

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
    {/* Basic Information */}
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
            placeholder={t("Write a brief description")}
            className="w-full h-25 p-3 border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] text-sm text-[#364152] rounded-[3px] outline-none resize-none"
          />
        </div>

      </div>
    </div>

    {/* images */}
    <div className='shadow-[0px_0px_4px_0px_rgba(0,0,0,0.20)] p-4 rounded-[3px] my-6'>
      <p className='text-[#364152] text-lg font-medium mb-4'>{t('Photos')}</p>

      {/* hidden file input */}
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        multiple
        className='hidden'
        onChange={handleAddImage}
      />

      {/* image preview cards */}
      {images.length > 0 && (
        <div className='grid grid-cols-5 gap-3 mb-3'>
          {images.map((img) => (
            <div key={img.id} className='relative group rounded-[3px] overflow-hidden border border-[#CDD5DF] aspect-square'>
              <img src={img.url} alt={img.name} className='w-full h-full object-cover' />
              <button
                type='button'
                onClick={() => handleRemoveImage(img.id)}
                className='absolute top-1 right-1 w-5 h-5 bg-[#F04438] text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* add button — hidden when 5 images uploaded */}
      {images.length < 5 && (
        <button
          type='button'
          onClick={() => fileInputRef.current?.click()}
          className='w-full border border-dashed border-[#CDD5DF] p-4 flex flex-col gap-2 justify-center items-center cursor-pointer rounded-[3px]'
        >
          <p>
            <img src='/images/icons/image-add--gray.svg' alt='' />
          </p>
          <p className='text-[#4B5565] font-normal text-sm'>{t('Add image')}</p>
        </button>
      )}

      <p className='text-[#697586] text-xs font-normal mt-2'>{t('Add up to 5 photos')}</p>
    </div>

    {/* price */}
    <div className='shadow-[0px_0px_4px_0px_rgba(0,0,0,0.20)] p-4 rounded-[3px] my-6'>
      <p className='text-[#364152] text-lg font-medium mb-4'>{t('Pricing')}</p>
      {/*Basic price  */}
      <div className='w-full flex flex-col gap-1'>
        <p className='text-sm font-medium mb-1.5'>
          <span className='text-[#364152] '>{t('Basic price')} ({t('Egypt')})</span>
        </p>  
        <input 
          type="text"
          name='title'
          placeholder='0:00'
          className={`w-full h-14  p-3 border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] text-sm text-[#364152]  rounded-[3px] outline-none `}
        />
      </div>

    </div>

    {/* Preparation */}
    <div className='shadow-[0px_0px_4px_0px_rgba(0,0,0,0.20)] p-4 rounded-[3px]'>
      <p className='text-[#364152] text-lg font-medium mb-4'>{t('Preparation')}</p>
      {/*Preparation time  */}
      <div className='w-full flex flex-col gap-1'>
        <p className='text-sm font-medium mb-1.5'>
          <span className='text-[#364152] '>{t('Preparation time')} ({t('minutes')})</span>
        </p>  
        <input 
          type="number"
          name='title'
          placeholder='0:00'
          className={`w-full h-14  p-3 border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] text-sm text-[#364152]  rounded-[3px] outline-none `}
        />
      </div>

      {/*Calories */}
      <div className='w-full flex flex-col gap-1 mt-3'>
        <p className='text-sm font-medium mb-1.5'>
          <span className='text-[#364152] '>{t('Calories')} ({t('optional')})</span>
        </p>  
        <input 
          type="number"
          name='title'
          placeholder='0:00'
          className={`w-full h-14  p-3 border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] text-sm text-[#364152]  rounded-[3px] outline-none `}
        />
      </div>

    </div>

    {/* Savings schedule */}
    <div className='shadow-[0px_0px_4px_0px_rgba(0,0,0,0.20)] p-4 rounded-[3px] mt-6'>
      <p className='text-[#364152] text-base font-medium'>{t('Savings schedule')}</p>
      <div className='mt-4 flex justify-between'>
        <div className='flex flex-col gap-1'>
          <p className='text-[#364152] text-sm font-normal'>{t('Available all day')}</p>
          <p className='text-[#4B5565] text-sm font-normal'>{t('Available at all times')}</p>
        </div>

        <div>
          <GreenSwitch/>
        </div>
      </div>
    </div>

    {/* Status */}
    <div className='shadow-[0px_0px_4px_0px_rgba(0,0,0,0.20)] p-4 rounded-[3px] mt-6'>
      <p className='text-[#364152] text-lg font-medium mb-4'>{t('Status')}</p>
      
      <div className='mt-4 flex justify-between'>
        <div className='flex flex-col gap-1'>
          <p className='text-[#364152] text-sm font-normal'>{t('active')}</p>
          <p className='text-[#4B5565] text-sm font-normal'>{t('Show this category in the list')}</p>
        </div>

        <div>
          <GreenSwitch/>
        </div>
      </div>


      <div className="border-[0.5px] border-[#E3E8EF] my-3" />


      <div className='mt-4 flex justify-between'>
        <div className='flex flex-col gap-1'>
          <p className='text-[#364152] text-sm font-normal'>{t('available')}</p>
          <p className='text-[#4B5565] text-sm font-normal'>{t('Marked as temporarily unavailable')}</p>
        </div>

        <div>
          <GreenSwitch/>
        </div>
      </div>

    </div>




  

    </>
  )
}

export default Form