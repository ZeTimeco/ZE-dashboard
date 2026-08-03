'use client'
import { styled, Switch } from '@mui/material';
import React from 'react'
import { useTranslation } from 'react-i18next'

function Form({formData, setFormData}) {
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

  
  return (
  <>
    <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4 roundd-[3px] grid grid-cols-2 gap-4'>
      
      {/* Product Name (arabic) */}
      <div className='w-full flex flex-col gap-1'>
        <p className='text-sm font-medium mb-1.5'>
          <span className='text-sm  mb-1.5'>
            <span className='text-[#364152] font-medium'>{t('Category name')}  </span>
            <span className=' text-[#697586] font-normal'>({t('Arabic')}) </span>
          </span>  
          <span className=' text-[#F04438]'>*</span>
        </p>  
        <input 
          type="text"
          name='title'
          value={formData?.name?.ar}
          onChange={(e) =>
          setFormData(prev => ({
              ...prev,
              name: {
                  ...prev.name,
                  ar: e.target.value
              }
          }))
          }
          placeholder={t("Category name")}
          className={`w-full h-14  p-3 border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] text-sm text-[#364152]  rounded-[3px] outline-none `}
        />
      </div>

      {/* Product Name (english)*/}
      <div className='w-full flex flex-col gap-1'>
        <p className='text-sm font-medium mb-1.5'>
          <span className='text-[#364152] font-medium'>{t('Category name')}  </span>
          <span className=' text-[#697586] font-normal'>({t('English')}) </span>
          <span className=' text-[#F04438]'>*</span>
        </p>  
        <input 
          type="text"
          name='title'
          value={formData?.name?.en}
          onChange={(e) =>
          setFormData(prev => ({
              ...prev,
              name: {
                  ...prev.name,
                  en: e.target.value
              }
          }))
          }
          placeholder={t("Category name")}
          className={`w-full h-14  p-3 border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] text-sm text-[#364152]  rounded-[3px] outline-none `}
        />
      </div>

      {/*description (Arabic)  */}
      <div className='w-full flex flex-col gap-1.5'>
        <p className='text-sm  mb-1.5'>
          <span className='text-[#364152] font-medium'>{t('description')}  </span>
          <span className=' text-[#697586] font-normal'>({t('Arabic')}) </span>
        </p>  
        <textarea
          name="description"
          value={formData?.description?.ar}
          onChange={(e) =>
          setFormData(prev => ({
              ...prev,
              description: {
                  ...prev.description,
                  ar: e.target.value
              }
          }))
          }
          placeholder={t("Write a brief description")}
          className="w-full h-25 p-3 border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] text-sm text-[#364152] rounded-[3px] outline-none resize-none"
        />
      </div>

      {/*description (English)  */}
      <div className='w-full flex flex-col gap-1.5'>
        <p className='text-sm  mb-1.5'>
          <span className='text-[#364152] font-medium'>{t('description')} {t('English')} </span>
          <span className=' text-[#697586] font-normal'>({t('English')})</span>
        </p>  
        <textarea
          name="description"
          value={formData?.description?.en}
          onChange={(e) =>
          setFormData(prev => ({
              ...prev,
              description: {
                  ...prev.description,
                  en: e.target.value
              }
          }))
          }
          placeholder={t("Write a brief description")}
          className="w-full h-25 p-3 border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] text-sm text-[#364152] rounded-[3px] outline-none resize-none"
        />
      </div>


    </div>


    <div className='grid grid-cols-2 gap-4 my-6'>

      {/* active */}
      <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-3 rounded-[3px] flex justify-between'>
        <p className='flex flex-col gap-1'>
          <span className='text-[#364152] text-base font-medium'>{t('active')}</span>
          <span className='text-[#697586] text-sm font-normal'>{t('Show this category in the list')}</span>
        </p>
        <p className='flex items-center'>
          <GreenSwitch
            checked={formData.status === 1}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                status: e.target.checked ? 1 : 0,
              }));
            }}
          />
        </p>
      </div>


      {/* Available upon request */}
      <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-3 rounded-[3px] flex justify-between'>
        <p className='flex flex-col gap-1'>
          <span className='text-[#364152] text-base font-medium'>{t('Available upon request')}</span>
          <span className='text-[#697586] text-sm font-normal'>{t('Can customers order products in this category?')}</span>
        </p>
        <p className='flex items-center'>
          <GreenSwitch
            checked={formData.is_visible === 1}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                is_visible: e.target.checked ? 1 : 0,
              }))
            }
          />
        </p>
      </div>

    </div>



  </>
  )
}

export default Form