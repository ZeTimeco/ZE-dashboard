"use client"
import React from 'react'
import { useTranslation } from 'react-i18next';

function CardOfService() {
  const {t}= useTranslation()

  const status = "active"
  const StatusRender = (status) => {
    switch (status) {
      case "active": //نشط 
        return (
          <div className=' bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit  h-9.5 rounded-3xl flex justify-center items-center '>
          <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex gap-1'>
            <img src="/images/icons/Active Status.svg" alt="" className='w-4 h-4' />
            <span className='text-xs lg1:text-sm'>{t('active')}</span>
          </div>
        </div>
        );
      case "inactive"://غير نشط 
        return null;  
    }
  }; 
  //'draft','pending','active','inactive', 'rejected'
  // const  status2 = 'draft'
  // const StatusRender2 = (status) => {
  //   switch(status) {
  //     case "draft": //مسودة
  //       return (
  //         <div className=' bg-[#F9F5E8] border border-[#F59E0B] text-[#F59E0B] w-fit  h-9.5 rounded-3xl flex justify-center items-center '>
  //         <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex gap-1'>
  //           <img src="/images/icons/Draft Status.svg" alt="" className='w-4 h-4' />
  //           <span className='text-xs lg1:text-sm'>{t('draft')}</span>
  //         </div>
  //       </div>
  //       );
  //     case "pending": //في انتظار الموافقة
  //       return null;
  //     case "active": //مكتمله
  //       return null;
  //     case "inactive": //غير نشط
  //       return null;
  //     case "rejected": //مرفوض
  //       return null;
  //   }
  // }
  return (
    <>

      <section className='shadow-[0_0_4px_0_#0000004D] p-3'>
        <div className='relative w-full'>
          <img src="/images/testyImage.svg" alt="" className='w-full' />
          <div className='absolute top-2 right-2'>{StatusRender(status)}</div>
          <p className='absolute top-2 left-2 '>
            <img src="/images/icons/dots.svg" alt="" />
          </p>
        </div>

        <div className='pt-4 '>
          {/* //title and location and status*/}
          <div className='flex justify-between items-center'>
            <div>
              <p className='text-[#364152] text-base font-semibold'>فيلا الروابي الفاخرة</p>
              <div className='flex gap-1'>
                <img src="/images/icons/location-gray.svg" alt="" />
                <p className='text-[#697586] text-sm font-normal'>فيلا . جدة, حي الشاطي</p>
              </div>
            </div>
            <div>hhh</div>
          </div>

          {/* //price and busy and rating and reservation */}
          <div className='py-4 grid grid-cols-2 gap-4'>
            <div className='flex gap-1.5'>
              <img src="/images/icons/dollar-circle_gray.svg" alt="" />
              <p className='text-[#4B5565] text-sm font-normal'>1,200 SAR</p>
            </div>

            <div className='flex gap-1.5'>
              <img src="/images/icons/price.svg" alt="" />
              <p className='text-[#4B5565] text-sm font-normal'>78% {t('busy')}</p>
            </div>

            <div className='flex gap-1.5'>
              <img src="/images/icons/star.svg" alt="" />
              <p className='text-[#4B5565] text-sm font-normal'> 4.2(120)</p>
            </div>

            <div className='flex gap-1.5'>
              <img src="/images/icons/price.svg" alt="" />
              <p className='text-[#4B5565] text-sm font-normal'>18 {t('reservation')}</p>
            </div>
            
          </div>

          <div className='border border-[#E3E8EF]'></div>

          <div className='flex justify-between'>
            {/* available date */}
            <div className='flex items-center gap-1.5'>
              <img src="/images/icons/calender.svg" className="w-6 h-6" />
              <p className='text-[#364152] text-sm font-normal'>
                <span>{t('Available starting from')} : </span>
                <span> 20 اكتوبر </span>
              </p>
            </div>

            {/* btn */}
            <div className='flex mt-2 gap-3 '>
              <button className='bg-[#F9F5E8] p-2.5 rounded-[3px] cursor-pointer'>
                <img src="/images/icons/book-open_Yellow.svg" alt="Property requests" />
              </button>

              <button className='bg-[#F9F5E8] p-2.5 rounded-[3px] cursor-pointer'>
                <img src="/images/icons/calender_yellow.svg" alt="Property valuation" />
              </button>

              <button className='bg-[#F9F5E8] p-2.5 rounded-[3px] cursor-pointer'>
                <img src="/images/icons/EditYellow.svg" alt="Modification" />
              </button>
            </div>

          </div>
        </div>

      </section>

    </>
  )
}

export default CardOfService