"use client";
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next';
import { IMAGE_BASE_URL } from '../../../../../../../../../../config/imageUrl';

function ImagesPage({bookingDetails}) {
  const { t } = useTranslation();

  const images = Array.isArray(bookingDetails?.images) 
    ? bookingDetails.images.map(img => `${IMAGE_BASE_URL}${img.image_path}`) 
    : [];
  const [current, setCurrent] = useState(0);
  const length = images.length;

  useEffect(() => {
    if (length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 5000);
    return () => clearInterval(interval);
  }, [length]);

  if (images.length === 0) return null;

  return (
    <>
      {bookingDetails?.images?.length > 0 && (
        <motion.section 
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className='shadow-[0_0_4px_0_rgba(0,0,0,0.12)] hover:shadow-[0_2px_8px_0_rgba(0,0,0,0.1)] transition-shadow duration-200 rounded-[3px] p-4 mt-6 w-full bg-white border border-[#F0F2F5]'
        >
          <p className='text-[#364152] text-base font-normal mb-4'>{t('Illustrative images')}</p>

          <div className="overflow-hidden rounded-[3px]">
            {/* Image Slider */}
            <section className="relative w-full h-[200px] bg-[#F8FAFC] flex items-center justify-center overflow-hidden rounded-[3px]">
              <AnimatePresence mode="wait">
                {images.map((img, index) => (
                  index === current ? (
                    <motion.img
                      key={index}
                      src={img}
                      alt={`service-image-${index}`}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="absolute top-0 left-0 w-full h-[200px] object-cover"
                    />
                  ) : null
                ))}
              </AnimatePresence>

              {/* Image Dots */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/30 backdrop-blur-xs h-6 px-3 py-1 rounded-[20px] flex items-center gap-1.5 z-10">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrent(index)}
                      className={`transition-all duration-300 rounded-full cursor-pointer ${
                        current === index
                          ? "w-4 h-2 bg-white"
                          : "w-2 h-2 bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        </motion.section>
      )}
    </>
  )
}

export default ImagesPage