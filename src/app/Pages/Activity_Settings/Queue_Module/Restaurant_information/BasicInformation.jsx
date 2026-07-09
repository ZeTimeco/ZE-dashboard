'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

function BasicInformation({getRestaurantTypes , formData , setFormData ,currentLang}) {
  const {t} = useTranslation()
  // =========================
  const [open1, setOpen1] = useState(false);
  const [selected1, setSelected1] = useState(null);
  const [searchValue1, setSearchValue1] = useState("");
  const dropdownRef1 = useRef(null);
  const option1 =getRestaurantTypes?.data

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) setOpen1(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  return (
    <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4'>
      <p className='text-[#364152] text-base font-normal'>{t('Basic Information')}</p>

      {/*  */}
      <div className='grid grid-cols-2 gap-4 mt-4'>
        {/* Restaurant name */}
        <div className='w-full'>
          <p className='text-sm font-medium mb-1.5'>
            <span className='text-[#364152] '>{t('Restaurant name')} </span>
            <span className=' text-[#F04438]'>*</span>
          </p>
          <input 
            type="text"
            name='code'
            value={formData?.name[currentLang]}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                name: {
                  ...prev.name,
                  [currentLang]: e.target.value,
                },
              }))
            }
            placeholder={t('Restaurant name')}
            className={`w-full h-14  p-3 border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] text-sm text-[#364152]  rounded-[3px] outline-none `}
          />
        </div>

        {/* Branch name */}
        <div className='w-full'>
          <p className='text-sm font-medium mb-1.5'>
            <span className='text-[#364152] '>{t('Branch name')} </span>
            <span className=' text-[#697586]'>({t('optional')})</span>
          </p>
          <input 
            type="text"
            name='code'
            value={formData?.branch_name[currentLang]}
            onChange={(e)=>setFormData((prev)=>({
              ...prev,
              branch_name:{
                ...prev.branch_name,
                [currentLang]:e.target.value
              }
            }))}
            placeholder={t('Branch name')}
            className={`w-full h-14  p-3 border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] text-sm text-[#364152]  rounded-[3px] outline-none `}
          />
        </div>

        {/* Restaurant type */}
        <div className="flex flex-col gap-1.5">
        <p className='text-sm font-medium '>
          <span className='text-[#364152] '>{t('Restaurant type')} </span>
          <span className=' text-[#F04438]'>*</span>
        </p>

        <div className="relative w-full" ref={dropdownRef1}>
          <div
            className="relative h-14 flex items-center border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] rounded-[3px] cursor-pointer"
            onClick={() => setOpen1(!open1)}
          >
            <input
              type="text"
              placeholder={t("Restaurant type")}
              value={searchValue1 || option1?.find((item) => item.id === formData?.restaurant_type_id)?.name ||""}
              onChange={(e) => {
                setSearchValue1(e.target.value);
                setOpen1(true);
              }}
              className=" p-3 w-full text-sm text-[#364152] focus:outline-none"
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
            <ul className="absolute left-0 right-0 border border-[#CDD5DF] bg-white rounded-[3px] shadow-md z-10 max-h-48 overflow-y-auto">
              {option1
                ?.filter((opt) =>
                  opt?.name?.toLowerCase().includes(searchValue1.toLowerCase())
                )
                .map((opt) => (
                  <li
                    key={opt?.id}
                    onClick={() => {
                      setSelected1(opt?.name);
                      setSearchValue1("");
                      setOpen1(false);
                      setFormData((prev)=>({
                        ...prev,
                        restaurant_type_id:opt?.id

                      }))
                    }}
                    className="p-3 hover:bg-[#F5F5F5] cursor-pointer"
                  >
                    {opt?.name}
                  </li>
              ))}
            </ul>
          )}
        </div>
      </div>

        {/*Restaurant description */}
        <div className='w-full'>
          <p className='text-sm font-medium mb-1.5'>
            <span className='text-[#364152] '>{t('Restaurant description')} </span>
          </p>
          <input 
            type="text"
            name='code'
            value={formData?.description[currentLang]}
            onChange={(e)=>setFormData((prev)=>({
              ...prev,
              description:{
                ...prev.description,
                [currentLang]:e.target.value
              }
            }))}
            placeholder={t('Restaurant description')}
            className={`w-full h-14  p-3 border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]  text-sm text-[#364152]  rounded-[3px] outline-none `}
          />
        </div>
      </div>
    </div>
  )
}

export default BasicInformation