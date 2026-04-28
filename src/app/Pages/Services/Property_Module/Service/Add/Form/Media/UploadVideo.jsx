"use client"
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';

function UploadVideo() {
  const {t} = useTranslation();
  
  // additional media
  const tourVideoRef = useRef(null);
  const propertyVideoRef = useRef(null);
  const [tourVideo, setTourVideo] = useState(null);
  const [propertyVideo, setPropertyVideo] = useState(null);
    
  return (
    <>
      {/* Additional media */}
      <div>
        <p className='text-[#364152] text-base font-medium mb-4'>{t('Additional media')} ({t('optional')})</p>
        <div className='grid grid-cols-2 gap-6'>
          <div className='border border-[#E3E8EF] py-4 px-3 rounded-[3px] flex justify-between'>
            <div className='flex gap-2 '>
              <p className='flex items-start mt-1'>
                <img src="/images/icons/Frame-green.svg" alt="" />
              </p>
              <div className='flex flex-col '>
                <p className='text-[#364152] text-base font-medium'>{t('virtual tour')}</p>
                <p className='text-[#4B5565] text-sm font-normal'>{t('360-degree interactive experience')}</p>
              </div>
            </div>

            {/* hidden video input for tour */}
            <input
              ref={tourVideoRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => setTourVideo(e.target.files[0] || null)}
            />

            {tourVideo ? (
              <div className="flex items-center gap-1  px-2 py-1">
                <img src="/images/icons/checkmark-circle-true.svg" className="w-4 h-4" alt="" />
                <p className="text-[#17B26A] text-sm font-normal ">{t('A tour was selected')}</p>
                <button
                  onClick={() => { setTourVideo(null); tourVideoRef.current.value = ''; }}
                  className="text-[#17B26A] font-bold text-sm leading-none cursor-pointer"
                >×</button>
              </div>
            ) : (
              <button
                onClick={() => tourVideoRef.current.click()}
                className='text-[var(--color-primary)] text-base font-normal cursor-pointer'
              >
                {t('Add a tour')}
              </button>
            )}
          </div>

          {/* Property video */}
          <div className='border border-[#E3E8EF] py-4 px-3 rounded-[3px] flex justify-between'>
            <div className='flex gap-2 '>
              <p className='flex items-start mt-1'>
                <img src="/images/icons/camera_blue.svg" alt="" />
              </p>
              <div className='flex flex-col '>
                <p className='text-[#364152] text-base font-medium'>{t('Property video')}</p>
                <p className='text-[#4B5565] text-sm font-normal'>{t('View a detailed tour of your space')}</p>
              </div>
            </div>

            {/* hidden video input for property video */}
            <input
              ref={propertyVideoRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => setPropertyVideo(e.target.files[0] || null)}
            />

            {propertyVideo ? (
              <div className="flex items-center gap-1  px-2 py-1">
                <img src="/images/icons/checkmark-circle-true.svg" className="w-4 h-4" alt="" />
                <p className="text-[#17B26A] text-sm font-normal ">{t('A tour was selected')}</p>
                <button
                  onClick={() => { setTourVideo(null); tourVideoRef.current.value = ''; }}
                  className="text-[#17B26A] font-bold text-sm leading-none cursor-pointer"
                >×</button>
              </div>
            ) : (
              <button
                onClick={() => propertyVideoRef.current.click()}
                className='text-[var(--color-primary)] text-base font-normal cursor-pointer'
              >
                {t('Add a video')}
              </button>
            )}
          </div>


        </div>
        
      </div>
    </>
  )
}

export default UploadVideo