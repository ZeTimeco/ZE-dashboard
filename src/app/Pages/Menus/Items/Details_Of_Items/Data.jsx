'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

// Mock item data — replace with real props/API data as needed
const MOCK_ITEM = {
  images: [
    '/images/P.p.svg',
    '/images/P.p.svg',
    '/images/P.p.svg',
  ],
  nameAr: 'حمص',
  category: 'المقبلات',
  price: 25,
  currency: 'جنية',
  status: 'متوفر',
  descriptionAr: 'وصف تفصيلي للصنف يتضمن المكونات وطريقة التحضير والخصائص المميزة أبدأ الطبق الشهي',
  prepTimeMin: 15,
  prepTimeMax: 20,
  calories: 350,
}

function Data({ item = MOCK_ITEM }) {
  const { t } = useTranslation()
  const [activeSlide, setActiveSlide] = useState(0)

  const images = item.images || []

  return (
    <div className="flex flex-col gap-4">

      {/* ── Image Carousel ─────────────────────────────── */}
      {images.length > 0 && (
        <div className="relative w-full rounded-[6px] overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <img
            src={images[activeSlide]}
            alt={item.nameAr}
            className="w-full h-full object-cover"
          />

          {/* Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`rounded-full transition-all cursor-pointer ${
                    i === activeSlide
                      ? 'w-4 h-2 bg-white'
                      : 'w-2 h-2 bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Name, Category & Status ─────────────────────── */}
      <div className="flex justify-between items-start">
      
        {/*  name + category */}
        <div className="flex flex-col items-end gap-2">
          <p className="text-[#364152] text-xl font-medium">{item.nameAr}</p>
          <p className="text-[#697586] text-sm font-normal">{item.category}</p>
        </div>
        {/*  status badge + price */}
        <div className="flex flex-col gap-2">
          <span className="flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#ECFDF3] text-[#067647] border border-[#ABEFC6] w-fit">
            {item.status}
          </span>
          <p className="text-[var(--color-primary)] text-lg font-semibold">
            {item.price} {item.currency}
          </p>
        </div>
      </div>

      {/* ── Description ────────────────────────────────── */}
      <div className="shadow-[0px_0px_4px_0px_rgba(0,0,0,0.12)] rounded-[3px] p-4">
        <div className=" mb-2">  

          <p className="text-[#364152] text-base font-medium mb-2">{t('description')}</p>
          <p className="text-[#4B5565] text-sm font-normal leading-relaxed text-right">
            {item.descriptionAr}
          </p>

        </div>
      </div>

      {/* ── Additional Info ─────────────────────────────── */}
      <div className="shadow-[0px_0px_4px_0px_rgba(0,0,0,0.12)] rounded-[6px] p-4">
        <div className="mb-2">
          <p className="text-[#364152] text-base font-semibold">{t('Additional information')}</p>
        </div>
        {/* Preparation time row */}
        <div className="flex justify-between items-center py-2">
          <p className="text-[#697586] text-sm font-normal">{t('Preparation time')}</p>
          <p className="text-[#364152] text-sm font-medium">
            {item.prepTimeMin}-{item.prepTimeMax} {t('minutes')}
          </p>
        
        </div>


        {/* Calories row */}
        <div className="flex justify-between items-center py-2">
          <p className="text-[#697586] text-sm font-normal">{t('Calories')}</p>
          <p className="text-[#364152] text-sm font-medium">{item.calories}</p>
        
        </div>
      </div>

    </div>
    
  )
}

export default Data
