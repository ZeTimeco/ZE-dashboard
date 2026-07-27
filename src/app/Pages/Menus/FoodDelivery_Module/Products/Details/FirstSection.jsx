'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IMAGE_BASE_URL } from '../../../../../../../config/imageUrl'

function FirstSection({getProductDetailsData}) {
  const {t} = useTranslation()
  const router = useRouter()

  const images = [];
  if (getProductDetailsData?.images && Array.isArray(getProductDetailsData.images)) {
    getProductDetailsData.images.forEach((img) => {
      const src = typeof img === 'string' ? img : (img?.image || img?.image_path);
      if (src) images.push(src);
    });
  }
  if (images.length === 0 && getProductDetailsData?.image) {
    images.push(getProductDetailsData.image);
  }

  const [activeSlide, setActiveSlide] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);

  const handleSlideChange = (index) => {
    setImageLoading(true);
    setActiveSlide(index);
  };

  return (
    <>
    <div className='relative flex justify-center items-center bg-[#EEF2F6] w-full h-40 rounded-[6px] overflow-hidden shadow-[inset_0_0_4px_rgba(0,0,0,0.05)]'>
      {images.length > 0 ? (
        <>
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#EEF2F6]">
              <div className="w-6 h-6 border-2 border-gray-300 border-t-[var(--color-primary)] rounded-full animate-spin" />
            </div>
          )}
          <img 
            src={`${IMAGE_BASE_URL}${images[activeSlide]}`} 
            alt={getProductDetailsData?.name || ""} 
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
          />
          {images.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSlideChange(i)}
                  className={`rounded-full transition-all cursor-pointer ${
                    i === activeSlide
                      ? "w-4 h-2 bg-white"
                      : "w-2 h-2 bg-white/50"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <img src="/images/burger.svg" alt="Default Product" className="max-h-[80%] object-contain" />
      )}
    </div>


    <div className='flex justify-between mt-6'>
      <p className='text-[#364152] text-xl font-medium'>{getProductDetailsData?.name}</p>
      <p className='border border-[#067647] bg-[#DCFAE6] text-[#067647] rounded-full w-fit px-3'>{getProductDetailsData?.is_visible ? t('visible to customers') : null}</p>
    </div>

    <div className='flex justify-between my-4'>
      <p className='text-[#4B5565] text-base font-normal'>{getProductDetailsData?.category?.name}</p>
      <p className='text-[var(--color-primary)] text-base font-semibold'>{getProductDetailsData?.base_price} {t('pound')}</p>
    </div>

    <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4 mb-4'>
      <p className='text-[#364152] text-base font-medium'>{t('description')}</p>
    
      <p className='text-[#4B5565] text-sm font-normal mt-2'>
        {getProductDetailsData?.description=== null ? 'لا يوجد' : getProductDetailsData?.description }  
      </p>
    </div>

  {(getProductDetailsData?.prep_time_min !== null ||getProductDetailsData?.calories !== null) && (
    <div className="shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4 mb-4">
      <p className="text-[#364152] text-base font-medium">
        {t("Additional information")}
      </p>

      {getProductDetailsData?.prep_time_min !== null && (
        <div className="flex justify-between mt-4 rounded-[3px]">
          <p className="text-[#697586] text-sm font-normal">
            {t("Preparation time")}
          </p>
          <p className="text-[#364152] text-sm font-normal">
            {getProductDetailsData?.prep_time_min} {t("minute")}
          </p>
        </div>
      )}

      {getProductDetailsData?.calories !== null && (
        <div className="flex justify-between mt-2 rounded-[3px]">
          <p className="text-[#697586] text-sm font-normal">
            {t("Calories")}
          </p>
          <p className="text-[#364152] text-sm font-normal">
            {getProductDetailsData?.calories} {t('calorie')}
          </p>
        </div>
      )}
    </div>
  )}

    <div className='flex justify-between mb-4'>
      <p className='text-[#364152] text-base font-medium'>{t('Add-ons and options')}</p>
      <button 
        onClick={()=>{router.push(`/Pages/Menus/FoodDelivery_Module/AddOns_Options?id=${getProductDetailsData?.id}`)}}
        className='border border-[var(--color-primary)]  flex gap-2 px-3 rounded-[3px] cursor-pointer'>
        <p className='flex items-center'><img src="/images/icons/arrowyellowOnly.svg" className="w-3 h-3" /></p>
        <p className='text-[var(--color-primary)] text-sm font-normal'>{t('administration')}</p>
      </button>
    </div>

          


    </>
  )
}

export default FirstSection