'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IMAGE_BASE_URL } from '../../../../../../../config/imageUrl'
import { motion, AnimatePresence } from 'framer-motion'

function Data({ getItemsDetails }) {
  const { t } = useTranslation()
  const item =  getItemsDetails?.data

  const [activeSlide, setActiveSlide] = useState(0)
  const [imageLoading, setImageLoading] = useState(true);
  const handleSlideChange = (index) => {
    setImageLoading(true);
    setActiveSlide(index);
  };

  const images = item?.images?.map((img) => img.image) || [];

  const StatusRender = (status) => {
    switch (status) {
      case 'active':
        return (
          <div className='bg-[#fff] border border-[#17B26A] text-[#067647] w-fit h-7.5 rounded-full flex justify-center items-center'>
            <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex items-center gap-1'>
              <img src="/images/icons/true_green.svg" alt="" className='w-3.5 h-3.5' />
              <span className='text-xs lg1:text-sm font-medium'>{t('active')}</span>
            </div>
          </div>
        );
      case 'hidden':
        return null;
    }
  }

  return (
    <div className="flex flex-col gap-4">

      {/* Image Carousel */}
      {images.length > 0 && (
        <div
          className="relative w-full rounded-[6px] overflow-hidden bg-gray-50 border border-slate-100"
          style={{ aspectRatio: "16/9" }}
        >
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-[var(--color-primary)] rounded-full animate-spin" />
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.img
              key={activeSlide}
              src={`${IMAGE_BASE_URL}${images[activeSlide]}`}
              alt={item?.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: imageLoading ? 0 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full h-full object-cover"
              onLoad={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
            />
          </AnimatePresence>

          {images.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSlideChange(i)}
                  className={`rounded-full transition-all cursor-pointer ${
                    i === activeSlide
                      ? "w-4 h-2 bg-white shadow-sm"
                      : "w-2 h-2 bg-white/60 hover:bg-white"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Name, Category & Status */}
      <motion.div 
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="flex justify-between items-start"
      >
        {/* name + category */}
        <div className="flex flex-col gap-1.5">
          <p className="text-[#364152] text-xl font-medium">{item?.name}</p>
          <p className="text-[#697586] text-sm font-normal">{item?.category_name}</p>
        </div>
        {/* status badge + price */}
        <div className="flex flex-col gap-2 items-end">
          <span>
            {StatusRender(item?.status)}
          </span>
          <p className="text-[var(--color-primary)] text-lg font-semibold">
            {item?.base_price} جنيه
          </p>
        </div>
      </motion.div>

      {/* Description */}
      <motion.div 
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut', delay: 0.05 }}
        className="shadow-[0px_0px_4px_0px_rgba(0,0,0,0.12)] rounded-[3px] p-4 bg-white"
      >
        <div className="mb-2">  
          <p className="text-[#364152] text-base font-medium mb-2">{t('description')}</p>
          <p className="text-[#4B5565] text-sm font-normal leading-relaxed text-right">
            {item?.description}
          </p>
        </div>
      </motion.div>

      {/* Additional Info */}
      <motion.div 
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
        className="shadow-[0px_0px_4px_0px_rgba(0,0,0,0.12)] rounded-[6px] p-4 bg-white"
      >
        <div className="mb-2">
          <p className="text-[#364152] text-base font-semibold">{t('Additional information')}</p>
        </div>
        {/* Preparation time row */}
        <div className="flex justify-between items-center py-2 border-b border-gray-50">
          <p className="text-[#697586] text-sm font-normal">{t('Preparation time')}</p>
          <p className="text-[#364152] text-sm font-medium">
            {item?.prep_time_min} {t('minutes')}
          </p>
        </div>

        {/* Calories row */}
        <div className="flex justify-between items-center py-2">
          <p className="text-[#697586] text-sm font-normal">{t('Calories')}</p>
          <p className="text-[#364152] text-sm font-medium">{item?.calories} {t('calorie')}</p>
        </div>
      </motion.div>

    </div>
  )
}

export default Data
