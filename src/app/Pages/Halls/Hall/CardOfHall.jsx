"use client"
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux';
import { dublicateHallThunk, getHallsThunk } from '@/redux/slice/Halls/HallsSlice';
import { IMAGE_BASE_URL } from '../../../../../config/imageUrl';
import { motion, AnimatePresence } from 'framer-motion';

function CardOfHall({ halls }) {
  const { t } = useTranslation()
  const router = useRouter()

  const dispatch = useDispatch()

  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const menuContainerRef = useRef(null);

  const toggleMenu = (id) => {
    setOpenMenuIndex(prev => (prev === id ? null : id));
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuContainerRef.current && !menuContainerRef.current.contains(e.target)) {
        setOpenMenuIndex(null);
      }
    };
    if (openMenuIndex !== null) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openMenuIndex]);

  const handleDuplicate = (hallId) => {
    dispatch(dublicateHallThunk({ hall_id: hallId }))
      .unwrap()
      .then((response) => {
        dispatch(getHallsThunk());
      })
      .catch((error) => {
        console.error("Failed to duplicate hall:", error);
      });
  };

  const StatusRender = (status) => {
    switch (status) {
      case 1: //نشط 
        return (
          <div className=' bg-[#fff] border border-[#17B26A] text-[#067647] w-fit h-7.5 rounded-full flex justify-center items-center shadow-xs transition-colors duration-200'>
            <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex items-center gap-1'>
              <img src="/images/icons/true_green.svg" alt="" className='w-3.5 h-3.5' />
              <span className='text-xs lg1:text-sm'>{t('active')}</span>
            </div>
          </div>
        );

      case 0: //مغلق
        return (
          <div className=' bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit h-7.5 rounded-full flex items-center shadow-xs transition-colors duration-200'>
            <div className='py-1 px-2 flex items-center gap-1'>
              <img src="/images/icons/refused Status.svg" alt="" className='w-4 h-4' />
              <span className='text-xs lg1:text-sm'>{t('closed')}</span>
            </div>
          </div>
        );

    }
  }

  const [selectedHall, setSelectedHall] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        ref={menuContainerRef}
        className='grid grid-cols-1 lg1:grid-cols-2 gap-6'
      >
        {halls?.data?.map((hall) => (
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -3 }}
            key={hall?.id}
            className={`group relative cursor-pointer rounded-[3px] p-3 grid grid-cols-4 gap-4 transition-all duration-300 hover:shadow-[0_0_8px_var(--color-primary)] 
                        ${selectedHall === hall?.id ? ' shadow-[0_0_8px_var(--color-primary)] ' : 'shadow-[0_0_4px_0_rgba(0,0,0,0.20)]'}
                    `}
          >
            {/* image */}
            <div className='overflow-hidden rounded-[2px]'>
              <img 
                src={`${IMAGE_BASE_URL}${hall?.image}`} 
                className='w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105' 
                alt="" 
              />
            </div>

            <div className='col-span-3'>
              {/* header of card */}
              <div className='flex justify-between items-center mb-2 '>
                <p 
                  onClick={() => {
                    router.push(`/Pages/Halls/Tables?hall_id=${hall?.id}`);
                    setSelectedHall(hall?.id);
                  }}
                  className='text-[#364152] text-xl font-medium hover:text-[var(--color-primary)] transition-colors duration-200'
                >
                  {hall?.name}
                </p>
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMenu(hall?.id);
                  }} 
                  className='bg-[#EEF2F6] hover:bg-[#E2E8F0] active:scale-95 transition-all duration-150 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer'
                >
                  <img src="/images/icons/dots.svg" alt="" />
                </button>
              </div>

              {/* dropdown */}
              <AnimatePresence>
                {openMenuIndex === hall?.id && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: -6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -6 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className='absolute top-9 left-4 p-3 w-47 shadow-[0_4px_16px_0_rgba(0,0,0,0.15)] rounded-[3px] bg-white z-20 border border-[#E3E8EF]'
                  >
                    <button
                      onClick={() => router.push(`/Pages/Halls/Views?id=${hall?.id}`)} 
                      className='w-full flex gap-2 p-1.5 rounded-[2px] cursor-pointer hover:bg-[#F1F5F9] transition-colors duration-150 items-center'
                    >
                      <img src="/images/icons/eye_black.svg" className='w-5 h-5' alt="" />
                      <p className='text-[#364152] text-base font-normal'>{t('views')}</p>
                    </button>

                    <button
                      onClick={() => router.push(`/Pages/Halls/Views/Layout?id=${hall?.id}`)} 
                      className='w-full flex gap-2 p-1.5 rounded-[2px] cursor-pointer hover:bg-[#F1F5F9] transition-colors duration-150 items-center'
                    >
                      <img src="/images/icons/restaurant-black.svg" className='w-5 h-5' alt="" />
                      <p className='text-[#364152] text-base font-normal'>{t('Hall organization')}</p>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* info */}
              <div className='flex justify-between mt-4'>
                <p className='text-[#4B5565] text-base font-normal mb-4'> {hall?.tables_count} {t('tables')}</p>
                <div>
                  {StatusRender(hall?.status)}
                </div>
              </div>

              {/* btns */}
              <div className='flex gap-2'>
                <button
                  onClick={() => handleDuplicate(hall?.id)}
                  className='flex items-center justify-center gap-1 rounded-[3px] border border-[#E3E8EF] hover:border-[#CDD5DF] hover:bg-[#F8FAFC] active:scale-[0.98] transition-all duration-200 px-2 h-14 w-full cursor-pointer'
                >
                  <img src="/images/icons/copy_yellow.svg" className='w-5 h-5' alt="" />
                  <p className='text-[#364152] text-sm font-normal'>{t('copies')}</p>
                </button>

                <button 
                  onClick={() => router.push(`/Pages/Halls/Hall/Edit?id=${hall?.id}`)} 
                  className='flex items-center justify-center gap-1 rounded-[3px] border border-[#E3E8EF] hover:border-[#CDD5DF] hover:bg-[#F8FAFC] active:scale-[0.98] transition-all duration-200 px-2 h-14 w-full cursor-pointer'
                >
                  <img src="/images/icons/EditYellow.svg" className='w-5 h-5' alt="" />
                  <p className='text-[#364152] text-sm font-normal'>{t('modification')}</p>
                </button>

                {hall?.status ? (
                  <button className='flex items-center justify-center gap-1 rounded-[3px] border border-[#E3E8EF] hover:border-[#CDD5DF] hover:bg-[#F8FAFC] active:scale-[0.98] transition-all duration-200 px-2 h-14 w-full cursor-pointer'>
                    <img src="/images/icons/shut-down.svg" className='w-5 h-5' alt="" />
                    <p className='text-[#364152] text-sm font-normal'>{t('closing')}</p>
                  </button>
                ) : (
                  <button className='flex items-center justify-center gap-1 rounded-[3px] border border-[#E3E8EF] hover:border-[#CDD5DF] hover:bg-[#F8FAFC] active:scale-[0.98] transition-all duration-200 px-2 h-14 w-full cursor-pointer'>
                    <img src="/images/icons/checkmark-circle-true.svg" className='w-5 h-5' alt="" />
                    <p className='text-[#364152] text-sm font-normal'>{t('reactivation')}</p>
                  </button>
                )}
              </div>

            </div>

          </motion.div>
        ))}

      </motion.div>

    </>
  )
}

export default CardOfHall