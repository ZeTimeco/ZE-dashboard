"use client"
import { changeStatusByIdThunk, deletePropertyThunk } from '@/redux/slice/Services/ServicesSlice';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

function CardOfService({getProperties}) {
  const {t}= useTranslation()
  const dispatch = useDispatch()

  //

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
  //'draft','pending','completed','inactive','rejected'
  const StatusRender2 = (status) => {
    switch(status) {
      case "completed": //مكتمله 
        return (
          <div className=' bg-[#fff] border border-[#17B26A] text-[#067647] w-fit  h-7.5 rounded-[3px] flex justify-center items-center '>
            <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex  items-center gap-1'>
              <img src="/images/icons/true_green.svg" alt="" className='w-3.5 h-3.5' />
              <span className='text-xs lg1:text-sm'>{t('completed')}</span>
            </div>
          </div>
        );
      case "pending": //في انتظار الموافقة
        return (
          <div className=' bg-[#FFFAEB] border border-[#F79009] text-[#DC6803] w-fit  h-7.5 rounded-[3px] flex  items-center '>
            <div className='py-1 px-2 flex  items-center  gap-1'>
              <img src="/images/icons/loading.svg" alt="" className='w-4 h-4' />
              <span className='text-xs lg1:text-sm'>{t('pending')}</span>
            </div>
          </div>
        );
      case "draft": //مسودة
        return (
          <div className=' bg-[#EFF6FF] border border-[#48A1FF] text-[#48A1FF] w-fit  h-7.5 rounded-[3px] flex justify-center items-center '>
            <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex  items-center gap-1'>
              <img src="/images/icons/remove-circle_babyblue.svg" alt="" className='w-3.5 h-3.5' />
              <span className='text-xs lg1:text-sm'>{t('draft')}</span>
            </div>
          </div>
        );
      case "inactive": //غير نشط
        return (
          <div className=' bg-[#F8FAFC] border border-[#9AA4B2] text-[#9AA4B2] w-fit  h-7.5 rounded-[3px] flex  items-center '>
            <div className='py-1 px-2 flex  items-center  gap-1'>
              <img src="/images/icons/remove-circle_gray.svg" alt="" className='w-4 h-4' />
              <span className='text-xs lg1:text-sm'>{t('inactive')}</span>
            </div>
          </div>
        );
      case "rejected": //مرفوض
        return (
          <div className=' bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit  h-7.5 rounded-[3px] flex  items-center '>
            <div className='py-1 px-2 flex  items-center  gap-1'>
              <img src="/images/icons/refused Status.svg" alt="" className='w-4 h-4' />
              <span className='text-xs lg1:text-sm'>{t('rejected')}</span>
            </div>
          </div>
        );
    }
  }

  //tooltip content
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const toggleMenu = (index) => {
    setOpenMenuIndex(prev => (prev === index ? null : index));
  };

const handleClick = (property) => {
  const newStatus =
    property.activity_status === "active" ? "inactive" : "active";

  dispatch(
    changeStatusByIdThunk({
      property_id: property.id,
      status: newStatus,
    })
      
  );
        

};

const handleDelete = (propertyId) => {
  dispatch(deletePropertyThunk(propertyId));
};
  return (
    <>

      {getProperties.map((property , index)=>{
        const  approvalStatus = property?.approval_status
        let content;
        if(approvalStatus === 'completed' || approvalStatus === 'inactive') {
            content = (
                <div className='py-4 grid grid-cols-2 gap-4'>
                  <div className='flex gap-1.5'>
                    <img src="/images/icons/dollar-circle_gray.svg" alt="" />
                    <p className='text-[#4B5565] text-sm font-normal'>{property?.metrics?.this_month_profit} جنيه/شهر</p>
                  </div>

                  <div className='flex gap-1.5'>
                    <img src="/images/icons/price.svg" alt="" />
                    <p className='text-[#4B5565] text-sm font-normal'>{property?.metrics?.this_month_occupancy}% {t('busy')}</p>
                  </div>

                  <div className='flex gap-1.5'>
                    <img src="/images/icons/star.svg" alt="" />
                    <p className='text-[#4B5565] text-sm font-normal'> {property?.metrics?.ratings_count} ({property?.metrics?.average_rating})</p>
                  </div>

                  <div className='flex gap-1.5'>
                    <img src="/images/icons/price.svg" alt="" />
                    {property?.metrics?.bookings_count === null ? (
                      <p className='text-[#4B5565] text-sm font-normal'> {t('No reservations')}</p>
                    ) : (
                      <p className='text-[#4B5565] text-sm font-normal'> {property?.metrics?.bookings_count}{t('reservation')}</p>
                    )}
                  </div>
                  
                </div>
            )
        }else if(approvalStatus === 'pending') {
            content = (
              <div className='my-4 py-2 px-4 border border-[#FEC84B] bg-[#FFFAEB] rounded-[3px] '>
                <div className='flex gap-1.5'>
                  <img src="/images/icons/clock_orange_bold.svg" alt="" />
                  <p className='text-[#364152] text-sm font-medium'>{t('Under review')}</p>
                </div>
                <p className='text-[#4B5565] text-sm font-normal'>
                  {t('Expected approval within 2-3 business days')}
                </p>
              </div>
            )
        }else if(approvalStatus === 'draft') {
            content = (
              <div className='my-4 py-2 px-4 border border-[#48A1FF] bg-[#EFF6FF] rounded-[3px]'>
                <div className='flex gap-1.5'>
                  <img src="/images/icons/i_blue.svg" alt="" />
                  <p className='text-[#364152] text-sm font-medium'>{t('Complete the numbers')}</p>
                </div>
                <p className='text-[#4B5565] text-sm font-normal'>
                  {property?.text_to_show}
                </p>
              </div>
            )
        }else if(approvalStatus === 'rejected') {
            content = (
              <div className='my-4 py-2 px-4 border border-[#F04438] bg-[#FEE4E2] rounded-[3px]'>
                <div className='flex gap-1.5'>
                  <img src="/images/icons/warning_red.svg" alt="" />
                  <p className='text-[#364152] text-sm font-medium'>{t('Required procedure')}</p>
                </div>
                <p className='text-[#4B5565] text-sm font-normal'>
                  {property?.text_to_show}
                </p>
              </div>
            )
        }

        // 
        const mainActions = property?.main_actions || [];

        


      return(
        <section 
          key={index}
          className='shadow-[0_0_4px_0_#0000004D] p-3'
        >
          {/* //image and status */}
          <div className='relative w-full'>
            <img src="/images/testyImage.svg" alt="" className='w-full' />
            <div className='absolute top-2 right-2'>{StatusRender(property?.activity_status)}</div>
            <button onClick={() => toggleMenu(index)} className='absolute top-2 left-2 cursor-pointer '>
              <img src="/images/icons/dots.svg" alt="" />
            </button>
            {/* dropdown */}
            {openMenuIndex === index && (
              <div className='absolute top-8 left-2 p-3  w-47 bg-white border border-[#EEE] rounded-[3px] shadow-md z-10'>
              
                {(property?.side_actions?.includes('activate') || property?.side_actions?.includes('deactivate')) && (
                  <button onClick={() => handleClick(property)} className='w-full flex gap-2 p-1 cursor-pointer   hover:bg-[#EEE]'>
                    <img src="/images/icons/checkmark-circle_black.svg"  />
                    <p className=' text-[#364152] text-base font-normal'>
                      {property?.side_actions?.includes('activate')
                      ? t("Activate")
                      : t("Deactivate")}
                    </p>
                  </button>
                )}

                {property?.side_actions?.includes('view_details') && (
                  <button className='w-full flex gap-2 p-1 cursor-pointer hover:bg-[#EEE]'>
                    <img src="/images/icons/fileBlack.svg" alt="" />
                    <p className='text-[#364152] text-base font-normal'>{t('Property details')}</p>
                  </button>
                )}

                {property?.side_actions?.includes('share') && (
                  <button className='w-full flex gap-2 p-1  cursor-pointer  hover:bg-[#EEE]'>
                    <img src="/images/icons/shareBlack.svg" alt="" />
                    <p className='text-[#364152] text-base font-normal'>{t('Property sharing')}</p>
                  </button>
                )}

                {property?.side_actions?.includes('view_ratings') && (
                  <button className='w-full flex gap-2 p-1  cursor-pointer  hover:bg-[#EEE]'>
                    <img src="/images/icons/remove-circle-black.svg" alt="" />
                    <p className='text-[#364152] text-base font-normal'>{t('Property Report')}</p>
                  </button>
                )}

                {property?.side_actions?.includes('remove') && (
                  <button onClick={() => handleDelete(property.id)} className='w-full flex gap-2 p-1  cursor-pointer  hover:bg-[#EEE]'>
                    <img src="/images/icons/delete-darkRed.svg" alt="" />
                    <p className='text-[#364152] text-base font-normal'>{t('Delete property')}</p>
                  </button>
                )}
              </div>
            )}

          </div>

          <div className='pt-4 '>
            {/* //title and location and status*/}
            <div className='flex gap-2 justify-between items-center'>
              <div className='w-[50%]'>
                <p className='text-[#364152] text-base font-semibold'>{property?.title}</p>
                <div className='flex gap-1'>
                  <img src="/images/icons/location-gray.svg" alt="" />
                  <p className='text-[#697586] text-sm font-normal'>{property?.address}</p>
                </div>
              </div>
              <div className='w-[50%] flex justify-end' >{StatusRender2(property?.approval_status)}</div>
            </div>

            {/* //price and busy and rating and reservation */}
            {content}

            <div className='border border-[#E3E8EF]'></div>


            <div className='flex justify-between'>
              {/* available date */}
              <div className='flex items-center gap-1.5'>
                {property?.approval_status === 'completed' || property?.approval_status === 'inactive' ? (
                  <>
                    <img src="/images/icons/calender.svg" className="w-6 h-6" />
                    <p className='text-[#364152] text-sm font-normal'>
                      {property?.text_to_show}
                    </p>
                  </>
                  ):null}
              </div>

              {/* btn */}
              <div className='flex mt-2 gap-3 '>
                <button className={`relative group ${mainActions.includes('view_bookings') ? 'bg-[#F9F5E8] cursor-pointer' : 'bg-[#EEF2F6] cursor-not-allowed'} p-2.5 rounded-[3px]  transition-all duration-300 hover:shadow-sm`}>
                  {mainActions.includes('view_bookings') ?(
                  <img src="/images/icons/book-open_Yellow.svg" />
                  ):(
                  <img src="/images/icons/book-open_Gray.svg" />
                  )}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1.5 bg-[#364152] text-white text-xs font-medium rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100 whitespace-nowrap z-50 pointer-events-none">
                    {t('View Bookings')}
                  </div>
                </button>
                
                <button className={`relative group ${mainActions.includes('calendar') ? 'bg-[#F9F5E8] cursor-pointer' : 'bg-[#EEF2F6] cursor-not-allowed '} p-2.5 rounded-[3px] transition-all duration-300 hover:shadow-sm`}>
                  {mainActions.includes('calendar') ?(
                  <img src="/images/icons/calender_yellow.svg" />
                  ):(
                  <img src="/images/icons/calender__gray.svg" />
                  )}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1.5 bg-[#364152] text-white text-xs font-medium rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100 whitespace-nowrap z-50 pointer-events-none">
                    {t('Calendar')}
                  </div>
                </button>

                <button className={`relative group ${mainActions.includes('edit_property') ? 'bg-[#F9F5E8] cursor-pointer' : 'bg-[#EEF2F6] cursor-not-allowed'} p-2.5 rounded-[3px] transition-all duration-300 hover:shadow-sm`}>
                  {mainActions.includes('edit_property') ?(
                    <img src="/images/icons/EditYellow.svg" />
                  ):(
                    <img src="/images/icons/EditGray.svg" />
                  )}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1.5 bg-[#364152] text-white text-xs font-medium rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100 whitespace-nowrap z-50 pointer-events-none">
                    {t('Edit Property')}
                  </div>
                </button>
              </div>

            </div>
          </div>

        </section>
      )})}


    </>
  )
}

export default CardOfService