'use client';
import { getBookingNewThunk, getBookingOngoingThunk } from '@/redux/slice/Home/HomeSlice';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { IMAGE_BASE_URL } from '../../../../../../../../../config/imageUrl';
import { UpdateBookingThunk } from '@/redux/slice/Requests/RequestsSlice';

function CurrentOrdersPage({ orders = [], layout = "list" ,current_module_key}) {
  const { t } = useTranslation();

  //API
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getBookingOngoingThunk())
  },[dispatch])

  const handleOpenMap = (order) => {
    const lat = order?.booking_current_latitude || order?.latitude || order?.lat;
    const lng = order?.booking_current_longitude || order?.longitude || order?.lng;
    
    console.log('Order location data:', { lat, lng });
    
    if (lat && lng) {
      window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
    } else {
      alert("لم أتمكن من العثور على الإحداثيات! هذه هي البيانات المتاحة بالطلب:\n" + Object.keys(order).join(",\n"));
      console.warn("Missing location data:", order);
    }
  };
  
  const StatusRender = (status) => {
    switch (status) {
      case "accepted": //تم القبول
        return (
          <div className=' bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit  h-9.5 rounded-3xl flex justify-center items-center '>
          <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex gap-1'>
            <img src="/images/icons/Active Status.svg" alt="" className='w-4 h-4' />
            <span className='text-xs lg1:text-sm'>{t('accepted')}</span>
          </div>
        </div>
        );
      case "completed"://مكتملة
        return (
          <div className=' bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit  h-9.5 rounded-3xl flex justify-center items-center'>
          <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex gap-1'>
            <img src="/images/icons/Active Status.svg" alt="" className=' w-4 h-4 ' />
            <span className='text-xs lg1:text-sm'>{t('Complete')}</span>
          </div>
        </div>
        );
      case "pending_approval": //في انتظار الموافقة
        return (
          <div className=' bg-[#FFFAEB] border  border-[#F79009] text-[#DC6803] w-fit h-9 rounded-3xl flex justify-center items-center'>
            <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex gap-1'>
              <img src="/images/icons/pending Status.svg" alt=""className='w-4 h-4 ' />
              <span className='text-xs lg1:text-sm'>{t('pending')}</span>
            </div>
          </div>
        );
      case "in_progress": //قيد التنفيذ
      return (
        <div className=' bg-[#EFF4FF] border border-[#518BFF] text-[#004EEB] w-fit  h-9.5 rounded-3xl flex justify-center items-center'>
        <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex gap-1'>
          <img src="/images/icons/inactive Status.svg" alt="" className=' w-4 h-4 ' />
          <span className='text-xs lg1:text-sm'>{t('in_progress')}</span>
        </div>
      </div>
      );
      case "on_going": //العامل في الطريق
        return (
          <div className=' bg-[#E3E8EF] border border-[#697586] text-[#4B5565] w-fit h-9.5 rounded-3xl flex justify-center items-center'>
            <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex gap-1'>
              <img src="/images/icons/on_going Status.svg" alt="" className=' w-4 h-4 ' />
              <span className='text-xs lg1:text-sm'>{t('The worker on the road')}</span>
            </div>
          </div>
        );
      case "rejected": // مرفوضة
        return (
          <div className=' bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit h-9.5 rounded-3xl flex justify-center items-center'>
            <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex gap-1'>
              <img src="/images/icons/refused Status.svg" alt="" className=' w-4 h-4 ' />
              <span className='text-xs lg1:text-sm'>{t('rejected')}</span>
            </div>
          </div>
        );
    }
  };

  const handleInProgressBooking = (booking_id) => {
    if (!booking_id) return;
    dispatch(UpdateBookingThunk({ id: booking_id, formData: { status: "in_progress" } }))
      .unwrap()
      .then(() => {
        dispatch(getBookingNewThunk());
      })
      .catch((err) => {
        console.error("Failed to accept booking:", err);
      });
  };

  return (
    <div className='border border-[#CDD5DF] rounded-[3px] p-6 max-h-[500px] overflow-y-auto'>
      <p className='text-[#0F022E] text-xl font-medium'>{t('Current orders')}</p>

      <div className={layout === "grid" ? "grid grid-cols-2 gap-4" : `grid lg1:grid-cols-1 ${orders.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
        {orders?.map((order) => (
          <div key={order?.booking_id} className='mt-6 w-full border border-[#CDD5DF] bg-white shadow-sm rounded-[3px] p-4 mb-4'>
            <div className='flex justify-between w-full'>
              <div className='flex gap-2 w-full'>
                <img
                  src={
                    order?.service_icon
                      ? `${IMAGE_BASE_URL}${order.service_icon}`
                      : "/images/icons/renewable-energy.svg"
                  }
                  alt="service"
                  className='w-6 h-6 mt-1'
                />
                <p className='text-[#364152] text-lg font-medium'>{order?.service_name}</p>
              </div>
              <div className='w-full flex justify-end'>{StatusRender(order?.booking_status)}</div>
            </div>

            <hr className='border-[#E3E8EF] border my-4' />

            <div className='flex justify-between w-full '>
              <div className='flex gap-2 lg1:w-full w-[70%]'>
                <img src='/images/icons/Customer.svg' alt='' className='w-6 h-6' />
                <p className='text-base font-normal'>
                  <span className='text-[#808080]'>{t('Customer')} </span>
                  <span className='text-[#0B2C3E]'>{order?.username}</span>
                </p>
              </div>

              <div className='flex justify-end gap-4 lg1:w-full w-[30%]'>
                <p className='rounded-[20px] w-7 h-7 border border-[#8B8B8B] flex items-center justify-center cursor-pointer'>
                  <img src='/images/icons/chat.svg' alt='' />
                </p>
                <a href={`tel:${order?.phone}`} className='rounded-[20px] w-7 h-7 border border-[#8B8B8B] flex items-center justify-center cursor-pointer'>
                  <img src='/images/icons/calll.svg' alt='' />
                </a>
              </div>
            </div>

            {/* Buttons */}
            {current_module_key === 'home_services' && (
              <button 
                onClick={() => handleOpenMap(order)}
                className='flex gap-2 items-center justify-center bg-[var(--color-primary)] text-white text-sm font-semibold w-full h-14 mt-4 rounded-[3px] cursor-pointer hover:bg-[#1a5b82] transition-colors'
              >
                <img src='/images/icons/maps-location.svg' alt='' className='w-6 h-6' />
                <span>{t('Open the map')}</span>
              </button>
            )}
            
            {current_module_key === 'car_services' && (
              <div className='flex gap-4'>
                <button 
                  onClick={() => handleInProgressBooking(order?.booking_id)}
                  className='flex gap-2 items-center justify-center bg-[var(--color-primary)] text-white text-sm font-semibold w-full h-14 mt-4 rounded-[3px] cursor-pointer'>
                  <span>{t('Start Service')}</span>
                  <img src='/images/icons/arrow-left-white.svg' alt='' className='w-6 h-6' />
                </button>

                <button 
                  onClick={() => handleOpenMap(order)}
                  className='flex gap-2 items-center justify-center border border-[#7F7F7F66] text-[#7F7F7F80] text-sm font-semibold w-full h-14 mt-4 rounded-[3px] cursor-pointer hover:bg-[#f5f5f5] transition-colors'
                >
                  <img src='/images/icons/maps-location_gray.svg' alt='' className='w-6 h-6' />
                  <span>{t('Open the map')}</span>
                </button>
              </div>
            )}
          

          </div>
        ))}
      </div>
    </div>
  );
}

export default CurrentOrdersPage;
