"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

function RoomPage() {
  const {t} = useTranslation()
  const [showContent, setShowContent] = useState(false)

    // Room type
    const [open1, setOpen1] = useState(false);
    const [selected1, setSelected1] = useState(null);
    const [searchValue1, setSearchValue1] = useState("");
    const dropdownRef1 = useRef(null);
    const optionRoomType = ['d' , '1'];


    //bed
    const [open2, setOpen2] = useState(false);
    const [selected2, setSelected2] = useState(null);
    const [searchValue2, setSearchValue2] = useState("");
    const dropdownRef2 = useRef(null);
    const optionBeds = ['d' , '1'];
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) setOpen1(false);
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);



    //upload images
    const fileInputRef = useRef(null);
    const [images, setImages] = useState([]); // files
    const [previewImages, setPreviewImages] = useState([]); // urls
  
    const MAX_IMAGES = 5;
  
    const handleFilesChange = (e) => {
      const files = Array.from(e.target.files);
  
      if (images.length + files.length > MAX_IMAGES) {
        alert(`Maximum number of photos ${MAX_IMAGES}`);
        return;
      }
  
      // save files
      setImages((prev) => [...prev, ...files]);
  
      // preview
      const newPreviews = files.map((file) =>
        URL.createObjectURL(file)
      );
  
      setPreviewImages((prev) => [...prev, ...newPreviews]);
    };
  
    const handleDelete = (index) => {
      setImages((prev) => prev.filter((_, i) => i !== index));
      setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    };

      const [count, setCount] = useState(0);
      const [bedCounter, setBedCounter] = useState(0);
    
      const increaseBed = () => setBedCounter(prev => prev + 1);
      const decreaseBed = () => { if (bedCounter > 0) setBedCounter(prev => prev - 1); };

  return (
    <>
    <div className='mt-10'>
      <p className='flex gap-1'>
        <img src="/images/icons/bed-single-blue.svg" alt="" />
        <span className='text-[#364152] text-base font-medium'>{t('Room Information')}</span>
      </p>
      <p className='text-[#4B5565] text-sm font-normal mt-1'>{t('Add details of each room and the beds in it.')}</p>

      {!showContent?(
        <button onClick={() => setShowContent(true)} className='flex justify-center items-center gap-1 w-full h-14 py-2.5 px-4 border border-dashed border-[#CDD5DF] mt-6 cursor-pointer rounded-[3px]'>
          <p className='text-[#697586] text-base font-medium '>{t('Add a room')}</p>
          <img src="/images/icons/AddGrayIcon.svg" className="w-5 h-5" />
        </button>
      ):(
        <>
        <div className='border border-[#CDD5DF] rounded-[3px] p-4 mt-6'>

          {/* Room type */}
          <div className="flex flex-col w-full mb-6">
            <p className='text-sm font-medium mb-1.5'>
              <span className='text-[#364152] '>{t('Room type')} </span>
              <span className=' text-[#F04438]'>*</span>
            </p>

            <div className="relative w-full" ref={dropdownRef1}>
              <div
                className="relative flex items-center "
                onClick={() => setOpen1(!open1)}
              >
                <input
                  type="text"
                  placeholder={t("Choose room type")}
                  value={searchValue1 || selected1 || ""}
                  onChange={(e) => {
                    setSearchValue1(e.target.value);
                    setOpen1(true);
                    setSelected1(null);
                  }}

                  className='w-full h-14 p-3 border border-[#CDD5DF] text-sm text-[#7d8d84] rounded-[3px] outline-none'
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
                  {optionRoomType
                    .filter((opt) =>
                      opt.toLowerCase().includes(searchValue1.toLowerCase())
                    )
                    .map((opt) => (
                      <li
                        key={opt}
                        onClick={() => {
                          setSelected1(opt);
                          setSearchValue1("");
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

          {/* upload image */}
          <div>
            <div className=' mb-1.5'>
              <p className=''>
                <span className='text-[#364152] text-sm font-medium'>
                  {t('Room photos')}
                </span>
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div onClick={() => fileInputRef.current.click()} className="w-full p-4 border border-dashed border-[#9AA4B2] rounded-[3px] cursor-pointer">
                
                <input
                  type="file"
                  ref={fileInputRef}
                  multiple
                  accept=".svg,.png,.jpg,.jpeg"
                  className="hidden"
                  onChange={handleFilesChange}
                />

                {previewImages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-4">
                    <img src="/images/icons/image-add-gray.svg" />

                    <p className="text-lg font-normal text-[#4B5565]">
                      {t('Add image')}
                    </p>

                  </div>
                ) : (
                  <div className="flex gap-2 flex-wrap">
                    {previewImages.map((src, idx) => (
                      <div
                        key={idx}
                        className="relative w-36.5 h-35 border border-[#E5E7EB] rounded-[3px] overflow-hidden"
                      >
                        <img
                          src={src}
                          alt="preview"
                          className="w-full h-full"
                        />

                        {/* delete only */}
                        <button
                          onClick={() => handleDelete(idx)}
                          className="absolute top-1 right-1 bg-[#00000080] w-5 h-5 flex justify-center items-center rounded-full cursor-pointer"
                        >
                          <img src="/images/icons/x_white.svg" />
                        </button>

                      </div>
                    ))}

                    {previewImages.length < MAX_IMAGES && (
                      <button
                        onClick={() => fileInputRef.current.click()}
                        className="w-36.5 h-35 cursor-pointer border bg-[#F8FAFC] border-dashed border-[#CDD5DF] flex items-center justify-center"
                      >
                        <img src="/images/icons/AddGrayIcon.svg" />
                      </button>
                    )}
                  </div>
                )}

                {previewImages.length >= MAX_IMAGES && (
                  <p className="mt-1 text-sm text-[var(--color-primary)]">
                    {t('You reached max images. Delete one to add new.')}
                  </p>
                )}
              </div>
            </div>
            <p className='text-[#697586] text-sm font-normal mt-2'>{t('Add up to 5 images. The first image will be the main image.')}</p>
          </div>
          


          {/* bed  */}
          <div className='mt-6'>
            <p className='mb-1.5'>
              <span className='text-[#364152] text-sm font-medium'>
                {t('A bed in this room')}
              </span>
            </p>
            
            <div className='flex gap-5'>
              {/* Bed type */}
              <div className=" w-[80%]">

                <div className="relative w-full" ref={dropdownRef2}>
                  <div
                    className="relative flex items-center "
                    onClick={() => setOpen2(!open2)}
                  >
                    <input
                      type="text"
                      placeholder={t("Choose room type")}
                      value={searchValue2 || selected2 || ""}
                      onChange={(e) => {
                        setSearchValue2(e.target.value);
                        setOpen2(true);
                        setSelected2(null);
                      }}

                      className='w-full h-14 p-3 border border-[#CDD5DF] text-sm text-[#7d8d84] rounded-[3px] outline-none'
                    />

                    <span className="absolute left-3 cursor-pointer">
                      {open2 ? (
                        <img src="/images/icons/ArrowUp.svg" alt="up" />
                      ) : (
                        <img src="/images/icons/ArrowDown.svg" alt="down" />
                      )}
                    </span>
                  </div>

                  {open2 && (
                    <ul className="absolute left-0 right-0 border border-[#C8C8C8] bg-white rounded-[3px] shadow-md z-10 max-h-48 overflow-y-auto">
                      {optionBeds
                        .filter((opt) =>
                          opt.toLowerCase().includes(searchValue2.toLowerCase())
                        )
                        .map((opt) => (
                          <li
                            key={opt}
                            onClick={() => {
                              setSelected2(opt);
                              setSearchValue2("");
                              setOpen2(false);
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
              {/* counter & delete */}
              <div className='w-[20%] flex gap-4 '>
                {/* counter */}
                <div className='flex items-center gap-3 bg-[#EEF2F6] rounded-full p-2'>
                  <button onClick={decreaseBed} className='w-9 h-9 flex items-center justify-center text-lg cursor-pointer'> - </button>
                  <span className='text-[#364152] text-base font-medium w-3 text-center'>{bedCounter}</span>
                  <button onClick={increaseBed} className='w-9 h-9 flex items-center justify-center text-lg cursor-pointer'> + </button>
                </div>
                {/* delete */}
                <button className='cursor-pointer'>
                  <img src="/images/icons/xxxx.svg" className="w-5 h-5" />
                </button>
              </div>



            </div>

            <button  className='flex justify-center items-center gap-1 w-full h-14 py-2.5 px-4 border border-dashed border-[#CDD5DF] mt-6 cursor-pointer rounded-[3px]'>
              <p className='text-[#697586] text-base font-medium '>{t('Add a bed')}</p>
              <img src="/images/icons/AddGrayIcon.svg" className="w-5 h-5" />
            </button>
          </div>



        </div>
        
        
        
        
        
        
        
        </>
      )}
      
    </div>


    </>
  )
}

export default RoomPage