'use client'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { IMAGE_BASE_URL } from '../../../../../../config/imageUrl'

function RestaurantPhotos({formData , setFormData}) {
  const {t} = useTranslation()
  const fileInputRef = useRef(null)

  const images = (formData.images || []).map((img) => {
    if (img instanceof File) {
      return {
        id: img.name + img.size,
        url: URL.createObjectURL(img),
        name: img.name,
      };
    }

    return {
      id: img.id,
      url: `${IMAGE_BASE_URL}${img.image}`,
      name: img.image,
    };
  });

  const handleAddImage = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
  
    const remaining = 5 - (formData?.images?.length || 0);
    const toAdd = files.slice(0, remaining);
  
    setFormData((prev) => ({
      ...prev,
      images: [...(prev.images || []), ...toAdd],
    }));
    e.target.value = "";
  };

  const handleRemoveImage = (id) => {
    setFormData((prev) => ({
      ...prev,
      images: (prev.images || []).filter((img) => {
        if (img instanceof File) return (img.name + img.size) !== id;
        if (typeof img === 'string') return img !== id;
        return (img.id ?? img.image ?? img.image_path ?? img.url) !== id;
      }),
    }));
  };

  return (
    <>      

    {/* images */}
    <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4 rounded-[3px] '>
      <p className='text-[#364152] text-base font-normal'>{t('Restaurant photos')}</p>
      <p className = 'text-[#4B5565] text-xs font-normal my-2'>{t('You can add up to 5 photos. Tap the star to set the main photo.')}</p>
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
        <div className='grid grid-cols-5 gap-3 mb-3 mt-5'>
          {images.map((img) => (
            <div key={img.id} className='relative group rounded-[3px] overflow-hidden border border-[#CDD5DF] aspect-square'>
              <img src={img.url} alt={img.name} className='w-full h-full object-cover' />
              <button
                type='button'
                onClick={() => handleRemoveImage(img.id)}
                className='absolute top-1 right-1 w-5 h-5 bg-[#F04438] text-white rounded-[3px] flex justify-center items-center text-base opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
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

    </div>

    </>
  )
}

export default RestaurantPhotos
