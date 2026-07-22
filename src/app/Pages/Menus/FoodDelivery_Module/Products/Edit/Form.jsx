'use client'
import { styled, Switch } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

function Form() {
  const {t} = useTranslation()

    // =========================
    const [open1, setOpen1] = useState(false);
    const [searchValue1, setSearchValue1] = useState("");
    const dropdownRef1 = useRef(null);
    const categoryType = ['1','2' ,'3'];
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) setOpen1(false);
        
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
  
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
      {/* Product Name (arabic) */}
      <div className='w-full flex flex-col gap-1'>
        <p className='text-sm font-medium mb-1.5'>
          <span className='text-sm  mb-1.5'>
            <span className='text-[#364152] font-medium'>{t('Product Name')}  </span>
            <span className=' text-[#697586] font-normal'>({t('Arabic')}) </span>
          </span>  
          <span className=' text-[#F04438]'>*</span>
        </p>  
        <input 
          type="text"
          name='title'
          placeholder={t("Product Name")}
          className={`w-full h-14  p-3 border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] text-sm text-[#364152]  rounded-[3px] outline-none `}
        />
      </div>

      {/* Product Name (english)*/}
      <div className='w-full flex flex-col gap-1'>
        <p className='text-sm font-medium mb-1.5'>
          <span className='text-[#364152] font-medium'>{t('Product Name')}  </span>
          <span className=' text-[#697586] font-normal'>({t('English')}) </span>
          <span className=' text-[#F04438]'>*</span>
        </p>  
        <input 
          type="text"
          name='title'
          placeholder={t("Product Name")}
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
          placeholder={t("Write a brief description")}
          className="w-full h-25 p-3 border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] text-sm text-[#364152] rounded-[3px] outline-none resize-none"
        />
      </div>

      {/* Category */}
      <div className="flex flex-col">
        <p className='text-sm font-medium mb-1.5'>
          <span className='text-[#364152] '>{t('Category')} </span>
          <span className=' text-[#F04438]'>*</span>

        </p>

        <div className="relative w-full" ref={dropdownRef1}>
          <div
            className="relative flex items-center border border-[#C8C8C8] rounded-[3px] cursor-pointer"
            onClick={() => setOpen1(!open1)}
          >
            <input
              type="text"
              placeholder={t("Classification")}
              value={searchValue1}
              onChange={(e) => {
                setSearchValue1(e.target.value);
                setOpen1(true);
              }}
              className="h-14 p-3 w-full text-[#364152] focus:outline-none"
            />

            <span className="absolute left-3 cursor-pointer">
              {open1 ? (
                <img src="/images/icons/ArrowUp.svg" alt="up" />
              ) : (
                <img src="/images/icons/ArrowDown.svg" alt="down" />
              )}
            </span>
          </div>

          {open1 && (
            <ul className="absolute left-0 right-0 border border-[#C8C8C8] bg-white rounded-[3px] shadow-md z-10 max-h-48 overflow-y-auto">
              {categoryType
                ?.filter((opt) =>
                  opt?.toLowerCase().includes(searchValue1.toLowerCase())
                )
                .map((opt) => (
                  <li
                    key={opt}
                    onClick={() => {
                      setSearchValue1(opt);
                      setOpen1(false);
                    }}
                    className="p-3 hover:bg-[#F5F5F5] cursor-pointer"
                  >
                    {opt}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>

      {/* price */}
      <div className='w-full flex flex-col gap-1'>
        <p className='text-sm font-medium mb-1.5'>
          <span className='text-sm  mb-1.5'>
            <span className='text-[#364152] font-medium'>{t('the price')}  </span>
            <span className=' text-[#F04438]'>*</span>
          </span>  

        </p>  
        <input 
          type="text"
          name='title'
          placeholder={t("the price")}
          className={`w-full h-14  p-3 border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] text-sm text-[#364152]  rounded-[3px] outline-none `}
        />
      </div>

      {/* Calories  */}
      <div className='w-full flex flex-col gap-1'>
        <p className='text-sm font-medium mb-1.5'>
          <span className='text-sm  mb-1.5'>
            <span className='text-[#364152] font-medium'>{t('Calories')}  </span>
            <span className=' text-[#697586] font-normal'>({t('optional')}) </span>
          </span>  
        </p>  
        <input 
          type="number"
          name='time'
          className={`w-full h-14  p-3 border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] text-sm text-[#364152]  rounded-[3px] outline-none `}
        />
      </div>

      {/* Preparation time  */}
      <div className='w-full flex flex-col gap-1'>
        <p className='text-sm font-medium mb-1.5'>
          <span className='text-sm  mb-1.5'>
            <span className='text-[#364152] font-medium'>{t('Preparation time')}  </span>
            <span className=' text-[#697586] font-normal'>({t('optional')}) </span>
          </span>  
          <span className=' text-[#F04438]'>*</span>
        </p>  
        <input 
          type="number"
          name='time'
          className={`w-full h-14  p-3 border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] text-sm text-[#364152]  rounded-[3px] outline-none `}
        />
      </div>

      {/* Availability status */}
      <div className='border border-[#EEF2F6] bg-[#F8FAFC] p-3 rounded-[3px] flex justify-between'>
        <p className='flex flex-col gap-1'>
          <span className='text-[#364152] text-base font-medium'>{t('Availability status')}</span>
          <span className='text-[#697586] text-sm font-normal'>{t('The product is available to order')}</span>
        </p>
        <p className='flex items-center'>
          <GreenSwitch/>
        </p>
      </div>


      {/* Available for order */}
      <div className='border border-[#EEF2F6] bg-[#F8FAFC] p-3 rounded-[3px] flex justify-between'>
        <p className='flex flex-col gap-1'>
          <span className='text-[#364152] text-base font-medium'>{t('Available for order')}</span>
          <span className='text-[#697586] text-sm font-normal'>{t('Customers can order this product')}</span>
        </p>
        <p className='flex items-center'>
          <GreenSwitch/>
        </p>
      </div>


    </>
  )
}

export default Form