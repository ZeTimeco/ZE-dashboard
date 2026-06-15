"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IMAGE_BASE_URL } from '../../../../../../config/imageUrl';

function Form({getHallView}) {
  const {t} = useTranslation()
  // =========================
  const [open1, setOpen1] = useState(false);
  const [selected1, setSelected1] = useState(null);
  const [searchValue1, setSearchValue1] = useState("");
  const dropdownRef1 = useRef(null);
  const option1 =[
    {name:t('Right side') , value:'right'},
    {name:t('Left side') , value:'left'},
    {name:t('Top side') , value:'top'},
    {name:t('Bottom side') , value:'bottom'},
  ]


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) setOpen1(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [description, setDescription] = useState("");

  return (
    <>
    <div className='px-6 pt-6'>
      {/*Name of the view  */}
      <div className='w-full flex flex-col gap-1.5'>
        <p className='text-sm font-medium'>
          <span className='text-[#364152] '>{t('Name of the view')} </span>
        </p>
        <input 
          type="text"
          name='title'
          placeholder={t('Write the name of the view')}
          className={`w-full h-14  p-3 border border-[#C8C8C8]  text-sm text-[#364152]  rounded-[3px] outline-none `}
        />
      </div>

      {/* Choose the icon */}
      <div className='my-5 flex flex-col gap-1.5'>
        <p className='text-sm font-medium'>
          <span className='text-[#364152] '>{t('Choose the icon')} </span>
        </p>
        <div className=' grid grid-cols-3 gap-4'>
          {getHallView?.data?.map((items)=>(
            <div key={items?.id} className='border border-[#E3E8EF] py-3 px-2 flex flex-col gap-2 justify-center items-center rounded-[8px]'>
              <p 
                className='w-12.5 h-12  flex items-center justify-center rounded-[3px]'
                style={{backgroundColor:items?.hex_code}}
              >
                <img src={`${IMAGE_BASE_URL}${items?.icon}`} alt="" />
              </p>
                <p className='text-[#4B5565] text-base font-normal'>{items?.name}</p>
            </div>
          ))}
        
        </div>
      </div>

      {/* Choose the direction of the view  */}
      <div className="flex flex-col gap-1.5">
        <p className='text-sm font-medium '>
          <span className='text-[#364152] '>{t('Choose the direction of the view')} </span>
          <span className=' text-[#F04438]'>*</span>
        </p>

        <div className="relative w-full" ref={dropdownRef1}>
          <div
            className="relative h-14 flex items-center border border-[#C8C8C8] rounded-[3px] cursor-pointer"
            onClick={() => setOpen1(!open1)}
          >
            <input
              type="text"
              placeholder={t("Choose the direction of the view")}
              value={searchValue1 || selected1|| ""}
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
            <ul className="absolute left-0 right-0 border border-[#C8C8C8] bg-white rounded-[3px] shadow-md z-10 max-h-48 overflow-y-auto">
              {option1
                ?.filter((opt) =>
                  opt?.name?.toLowerCase().includes(searchValue1.toLowerCase())
                )
                .map((opt , index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setSelected1(opt?.name);
                      setSearchValue1("");
                      setOpen1(false);
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
      
      {/*description  */}
      <div className="w-full flex flex-col gap-1.5 mt-5">
        <div className=" ">
          <p>
            <span className="text-sm text-[#364152] font-medium">{t('description')}</span> {' '}
            <span className="text-[#697586] font-normal">({t('optional')})</span>
          </p>
        </div>

        <div className="relative">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={100}
            placeholder={t('Write a brief description')}
            className="w-full h-40 rounded-[3px] border border-[#CDD5DF]  p-3 text-[#364152] outline-none resize-none "
          />

          <span className="absolute bottom-2 left-3 text-sm text-gray-400">
            {description.length}/100
          </span>
        </div>

        <div className='flex gap-2'>  
          <img src="/images/icons/note.svg" alt="" />
          <p className='text-[#9AA4B2] text-sm font-normal'>{t('This description helps customers understand the offer.')}</p>
        </div>
      </div>
    

    </div>

    </>
  )
}

export default Form