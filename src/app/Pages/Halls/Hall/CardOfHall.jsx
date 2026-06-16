"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux';
import { dublicateHallThunk, getHallsThunk } from '@/redux/slice/Halls/HallsSlice';
import { IMAGE_BASE_URL } from '../../../../../config/imageUrl';

function CardOfHall({ halls }) {
  const { t } = useTranslation()
  const router = useRouter()

  const dispatch = useDispatch()


  const [openMenuIndex, setOpenMenuIndex] = useState(false);
  const toggleMenu = (id) => {
    setOpenMenuIndex(prev => (prev === id ? null : id));
  };



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
          <div className=' bg-[#fff] border border-[#17B26A] text-[#067647] w-fit  h-7.5 rounded-full flex justify-center items-center '>
            <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex  items-center gap-1'>
              <img src="/images/icons/true_green.svg" alt="" className='w-3.5 h-3.5' />
              <span className='text-xs lg1:text-sm'>{t('active')}</span>
            </div>
          </div>
        );

      case 0: //مغلق
        return (
          <div className=' bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit  h-7.5 rounded-full flex  items-center '>
            <div className='py-1 px-2 flex  items-center  gap-1'>
              <img src="/images/icons/refused Status.svg" alt="" className='w-4 h-4' />
              <span className='text-xs lg1:text-sm'>{t('closed')}</span>
            </div>
          </div>
        );

    }
  }

  const [selectedHall, setSelectedHall] = useState(null);

  return (
    <>
      <div className='grid grid-cols-1  lg1:grid-cols-2 gap-6'>
        {halls?.data?.map((hall) => (
          <div
            
            key={hall?.id}
            className={`relative  cursor-pointer rounded-[3px] p-3 grid grid-cols-4 gap-4 hover:shadow-[0_0_8px_var(--color-primary)] 
                        ${selectedHall === hall?.id ? ' shadow-[0_0_8px_var(--color-primary)] ' : 'shadow-[0_0_4px_0_rgba(0,0,0,0.20)]'}
                    `}
          >
            {/* image */}
            <div className=''>
              <img src={`${IMAGE_BASE_URL}${hall?.image}`} className='w-full h-full object-cover' alt="" />
            </div>

            <div className='col-span-3'>
              {/*  */}
              <div className='flex justify-between items-center mb-2 '>
                <p 
                onClick={() => {
                  router.push(`/Pages/Halls/Tables?hall_id=${hall?.id}`);
                  setSelectedHall(hall?.id);
                }}
                  className='text-[#364152] text-xl font-medium'
                >{hall?.name}</p>
                <p onClick={() => toggleMenu(hall?.id)} className='bg-[#EEF2F6] w-6 h-6 rounded-full flex items-center justify-center cursor-pointer'>
                  <img src="/images/icons/dots.svg" alt="" />
                </p>
              </div>
              {/* dropdown */}
              {openMenuIndex === hall?.id && (
                <div className='absolute top-9 left-4 p-3  w-47 shadow-[0_0_4px_0_rgba(0,0,0,0.25)] rounded-[3px] bg-white z-10'>

                  <button
                    onClick={() => router.push(`/Pages/Halls/Views?id=${hall?.id}`)} 
                    className='w-full flex gap-2 p-1 cursor-pointer hover:bg-[#EEE]'
                  >
                    <img src="/images/icons/eye_black.svg" className='w-5 h-5' alt="" />
                    <p className='text-[#364152] text-base font-normal'>{t('views')}</p>
                  </button>

                  <button
                    onClick={() => router.push(`/Pages/Halls/Views/Layout?id=${hall?.id}`)} 
                    className='w-full flex gap-2 p-1 cursor-pointer hover:bg-[#EEE]'
                  >
                    <img src="/images/icons/restaurant-black.svg" className='w-5 h-5' alt="" />
                    <p className='text-[#364152] text-base font-normal'>{t('Hall organization')}</p>
                  </button>

                </div>
              )}

              {/*  */}
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
                  className='flex items-center justify-center gap-1 rounded-[3px] border border-[#E3E8EF] px-2 h-14 w-full cursor-pointer'
                >
                  <img src="/images/icons/copy_yellow.svg" className='w-5 h-5' alt="" />
                  <p className='text-[#364152] text-sm font-normal'>{t('copies')}</p>
                </button>

                <button onClick={() => router.push(`/Pages/Halls/Hall/Edit?id=${hall?.id}`)} className='flex items-center justify-center gap-1 rounded-[3px] border border-[#E3E8EF] px-2 h-14 w-full cursor-pointer'>
                  <img src="/images/icons/EditYellow.svg" className='w-5 h-5' alt="" />
                  <p className='text-[#364152] text-sm font-normal'>{t('modification')}</p>
                </button>

                {hall?.status ? (
                  <button className='flex items-center justify-center gap-1 rounded-[3px] border border-[#E3E8EF] px-2 h-14 w-full cursor-pointer'>
                    <img src="/images/icons/shut-down.svg" className='w-5 h-5' alt="" />
                    <p className='text-[#364152] text-sm font-normal'>{t('closing')}</p>
                  </button>
                ) : (
                  <button className='flex items-center justify-center gap-1 rounded-[3px] border border-[#E3E8EF] px-2 h-14 w-full cursor-pointer'>
                    <img src="/images/icons/checkmark-circle-true.svg" className='w-5 h-5' alt="" />
                    <p className='text-[#364152] text-sm font-normal'>{t('reactivation')}</p>
                  </button>
                )}
              </div>

            </div>

          </div>
        ))}

      </div>

    </>
  )
}

export default CardOfHall