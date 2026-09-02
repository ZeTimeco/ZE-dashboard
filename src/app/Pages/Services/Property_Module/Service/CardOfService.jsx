"use client"
import { changeStatusByIdThunk, deletePropertyThunk } from '@/redux/slice/Services/ServicesSlice';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import DeletePage from './Module/Delete/page';
import { IMAGE_BASE_URL } from '../../../../../../config/imageUrl';
import { motion, AnimatePresence } from 'framer-motion';

function CardOfService({ getProperties }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const router = useRouter();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);

  const StatusRender = (status) => {
    switch (status) {
      case "active": //نشط 
        return (
          <div className='bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit h-9.5 rounded-3xl flex justify-center items-center shadow-xs'>
            <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex gap-1 items-center'>
              <img src="/images/icons/Active Status.svg" alt="" className='w-4 h-4' />
              <span className='text-xs lg1:text-sm font-medium'>{t('active')}</span>
            </div>
          </div>
        );
      case "inactive"://غير نشط 
        return null;  
      default:
        return null;
    }
  }; 

  //'draft','pending','completed','inactive','rejected'
  const StatusRender2 = (status) => {
    switch(status) {
      case "completed": //مكتمله 
        return (
          <div className='bg-white border border-[#17B26A] text-[#067647] w-fit h-7.5 rounded-[3px] flex justify-center items-center shadow-2xs'>
            <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex items-center gap-1'>
              <img src="/images/icons/true_green.svg" alt="" className='w-3.5 h-3.5' />
              <span className='text-xs lg1:text-sm font-medium'>{t('completed')}</span>
            </div>
          </div>
        );
      case "pending": //في انتظار الموافقة
        return (
          <div className='bg-[#FFFAEB] border border-[#F79009] text-[#DC6803] w-fit h-7.5 rounded-[3px] flex items-center shadow-2xs'>
            <div className='py-1 px-2 flex items-center gap-1'>
              <img src="/images/icons/loading.svg" alt="" className='w-4 h-4' />
              <span className='text-xs lg1:text-sm font-medium'>{t('pending')}</span>
            </div>
          </div>
        );
      case "draft": //مسودة
        return (
          <div className='bg-[#EFF6FF] border border-[#48A1FF] text-[#48A1FF] w-fit h-7.5 rounded-[3px] flex justify-center items-center shadow-2xs'>
            <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex items-center gap-1'>
              <img src="/images/icons/remove-circle_babyblue.svg" alt="" className='w-3.5 h-3.5' />
              <span className='text-xs lg1:text-sm font-medium'>{t('draft')}</span>
            </div>
          </div>
        );
      case "inactive": //غير نشط
        return (
          <div className='bg-[#F8FAFC] border border-[#9AA4B2] text-[#9AA4B2] w-fit h-7.5 rounded-[3px] flex items-center shadow-2xs'>
            <div className='py-1 px-2 flex items-center gap-1'>
              <img src="/images/icons/remove-circle_gray.svg" alt="" className='w-4 h-4' />
              <span className='text-xs lg1:text-sm font-medium'>{t('inactive')}</span>
            </div>
          </div>
        );
      case "rejected": //مرفوض
        return (
          <div className='bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit h-7.5 rounded-[3px] flex items-center shadow-2xs'>
            <div className='py-1 px-2 flex items-center gap-1'>
              <img src="/images/icons/refused Status.svg" alt="" className='w-4 h-4' />
              <span className='text-xs lg1:text-sm font-medium'>{t('rejected')}</span>
            </div>
          </div>
        );
      default:
        return null;
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

  const handleDelete = () => {
    if (propertyToDelete) {
      dispatch(deletePropertyThunk(propertyToDelete));
      setOpenDeleteDialog(false);
      setPropertyToDelete(null);
    }
  };
  
  return (
    <>
      {getProperties?.map((property, index) => {
        const approvalStatus = property?.approval_status
        let content;

        if(approvalStatus === 'completed' || approvalStatus === 'inactive') {
            content = (
                <div className='py-4 grid grid-cols-2 gap-3 text-sm'>
                  <div className='flex items-center gap-1.5'>
                    <img src="/images/icons/dollar-circle_gray.svg" alt="" className='w-4 h-4' />
                    <p className='text-[#4B5565] font-normal'>{property?.metrics?.this_month_profit} جنيه/شهر</p>
                  </div>

                  <div className='flex items-center gap-1.5'>
                    <img src="/images/icons/price.svg" alt="" className='w-4 h-4' />
                    <p className='text-[#4B5565] font-normal'>{property?.metrics?.this_month_occupancy}% {t('busy')}</p>
                  </div>

                  <div className='flex items-center gap-1.5'>
                    <img src="/images/icons/star.svg" alt="" className='w-4 h-4' />
                    <p className='text-[#4B5565] font-normal'> {property?.metrics?.ratings_count} ({property?.metrics?.average_rating})</p>
                  </div>

                  <div className='flex items-center gap-1.5'>
                    <img src="/images/icons/price.svg" alt="" className='w-4 h-4' />
                    {property?.metrics?.bookings_count === null ? (
                      <p className='text-[#4B5565] font-normal'> {t('No reservations')}</p>
                    ) : (
                      <p className='text-[#4B5565] font-normal'> {property?.metrics?.bookings_count}{t('reservation')}</p>
                    )}
                  </div>
                </div>
            )
        } else if(approvalStatus === 'pending') {
            content = (
              <div className='my-4 py-2.5 px-4 border border-[#FEC84B] bg-[#FFFAEB] rounded-[3px] shadow-2xs'>
                <div className='flex items-center gap-1.5 mb-1'>
                  <img src="/images/icons/clock_orange_bold.svg" alt="" className='w-4 h-4' />
                  <p className='text-[#364152] text-sm font-medium'>{t('Under review')}</p>
                </div>
                <p className='text-[#4B5565] text-xs font-normal'>
                  {t('Expected approval within 2-3 business days')}
                </p>
              </div>
            )
        } else if(approvalStatus === 'draft') {
            content = (
              <div className='my-4 py-2.5 px-4 border border-[#48A1FF] bg-[#EFF6FF] rounded-[3px] shadow-2xs'>
                <div className='flex items-center gap-1.5 mb-1'>
                  <img src="/images/icons/i_blue.svg" alt="" className='w-4 h-4' />
                  <p className='text-[#364152] text-sm font-medium'>{t('Complete the numbers')}</p>
                </div>
                <p className='text-[#4B5565] text-xs font-normal'>
                  {property?.text_to_show}
                </p>
              </div>
            )
        } else if(approvalStatus === 'rejected') {
            content = (
              <div className='my-4 py-2.5 px-4 border border-[#F04438] bg-[#FEE4E2] rounded-[3px] shadow-2xs'>
                <div className='flex items-center gap-1.5 mb-1'>
                  <img src="/images/icons/warning_red.svg" alt="" className='w-4 h-4' />
                  <p className='text-[#364152] text-sm font-medium'>{t('Required procedure')}</p>
                </div>
                <p className='text-[#4B5565] text-xs font-normal'>
                  {property?.text_to_show}
                </p>
              </div>
            )
        }

        const mainActions = property?.main_actions || [];
      
        return (
          <motion.section 
            key={property?.id || index}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
            whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
            className='group relative bg-white shadow-[0_0_4px_0_#0000004D] rounded-[3px] p-3 transition-all duration-300'
          >
            {/* Image and status */}
            <div className='relative w-full overflow-hidden rounded-[2px]'>
              <img
                src={
                  property?.primary_image
                    ? `${IMAGE_BASE_URL}${property.primary_image}`
                    : "/images/testyImage.svg"
                }
                alt=""
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />            
              <div className='absolute top-2 right-2'>{StatusRender(property?.activity_status)}</div>
              
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleMenu(index)} 
                className='absolute top-2 left-2 cursor-pointer bg-white/85 backdrop-blur-xs p-1 rounded-full shadow-xs hover:bg-white transition-all duration-200'
              >
                <img src="/images/icons/dots.svg" alt="" className='w-4 h-4' />
              </motion.button>

              {/* Dropdown */}
              <AnimatePresence>
                {openMenuIndex === index && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: -6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className='absolute top-9 left-2 p-2 w-47 bg-white border border-[#EEE] rounded-[3px] shadow-lg z-20 space-y-1'
                  >
                    {(property?.side_actions?.includes('activate') || property?.side_actions?.includes('deactivate')) && (
                      <button 
                        onClick={() => { handleClick(property); setOpenMenuIndex(null); }} 
                        className='w-full flex items-center gap-2 p-1.5 rounded-[2px] cursor-pointer hover:bg-[#EEE] transition-colors text-right'
                      >
                        <img src="/images/icons/checkmark-circle_black.svg" className='w-4 h-4' alt="" />
                        <p className='text-[#364152] text-sm font-normal'>
                          {property?.side_actions?.includes('activate') ? t("Activate") : t("Deactivate")}
                        </p>
                      </button>
                    )}

                    {property?.side_actions?.includes('view_details') && (
                      <button 
                        onClick={() => router.push(`/Pages/Services/Property_Module/Service/View?id=${property.id}`)} 
                        className='w-full flex items-center gap-2 p-1.5 rounded-[2px] cursor-pointer hover:bg-[#EEE] transition-colors text-right'
                      >
                        <img src="/images/icons/fileBlack.svg" alt="" className='w-4 h-4' />
                        <p className='text-[#364152] text-sm font-normal'>{t('Property details')}</p>
                      </button>
                    )}

                    {property?.side_actions?.includes('share') && (
                      <button className='w-full flex items-center gap-2 p-1.5 rounded-[2px] cursor-pointer hover:bg-[#EEE] transition-colors text-right'>
                        <img src="/images/icons/shareBlack.svg" alt="" className='w-4 h-4' />
                        <p className='text-[#364152] text-sm font-normal'>{t('Property sharing')}</p>
                      </button>
                    )}

                    {property?.side_actions?.includes('view_ratings') && (
                      <button className='w-full flex items-center gap-2 p-1.5 rounded-[2px] cursor-pointer hover:bg-[#EEE] transition-colors text-right'>
                        <img src="/images/icons/remove-circle-black.svg" alt="" className='w-4 h-4' />
                        <p className='text-[#364152] text-sm font-normal'>{t('Property Report')}</p>
                      </button>
                    )}

                    {property?.side_actions?.includes('remove') && (
                      <button 
                        onClick={() => {
                          setPropertyToDelete(property?.id);
                          setOpenDeleteDialog(true);
                          setOpenMenuIndex(null);
                        }} 
                        className='w-full flex items-center gap-2 p-1.5 rounded-[2px] cursor-pointer hover:bg-red-50 text-red-600 transition-colors text-right'
                      >
                        <img src="/images/icons/delete-darkRed.svg" alt="" className='w-4 h-4' />
                        <p className='text-red-600 text-sm font-normal'>{t('Delete property')}</p>
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className='pt-4'>
              {/* Title and location and status */}
              <div className='flex gap-2 justify-between items-start'>
                <div className='w-[50%]'>
                  <p className='text-[#364152] text-base font-semibold truncate group-hover:text-black transition-colors'>{property?.title}</p>
                  <div className='flex items-center gap-1 mt-0.5'>
                    <img src="/images/icons/location-gray.svg" alt="" className='w-3.5 h-3.5' />
                    <p className='text-[#697586] text-sm font-normal truncate'>
                      {property?.area}
                    </p>
                  </div>
                </div>
                <div className='w-[50%] flex justify-end'>{StatusRender2(property?.approval_status)}</div>
              </div>

              {/* Price and busy and rating and reservation */}
              {content}

              <div className='border-b border-[#E3E8EF] my-2'></div>

              <div className='flex justify-between items-center'>
                {/* Available date */}
                <div className='flex items-center gap-1.5'>
                  {property?.approval_status === 'completed' || property?.approval_status === 'inactive' ? (
                    <>
                      <img src="/images/icons/calender.svg" className="w-5 h-5" alt="" />
                      <p className='text-[#364152] text-xs sm:text-sm font-normal'>
                        {property?.text_to_show}
                      </p>
                    </>
                  ) : null}
                </div>

                {/* Buttons */}
                <div className='flex mt-2 gap-2.5'>
                  <motion.button 
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    onClick={() => mainActions.includes('view_bookings') && router.push(`/Pages/requests/Property_Module?serviceid=${property?.id}`)}
                    className={`relative group/btn ${mainActions.includes('view_bookings') ? 'bg-[#F9F5E8] hover:bg-[#f6eed2] cursor-pointer' : 'bg-[#EEF2F6] cursor-not-allowed opacity-60'} p-2.5 rounded-[3px] transition-all duration-200`}
                  >
                    {mainActions.includes('view_bookings') ? (
                      <img src="/images/icons/book-open_Yellow.svg" className='w-5 h-5' alt="" />
                    ) : (
                      <img src="/images/icons/book-open_Gray.svg" className='w-5 h-5' alt="" />
                    )}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1.5 bg-[#364152] text-white text-xs font-medium rounded shadow-lg opacity-0 invisible group-hover/btn:opacity-100 group-hover/btn:visible transition-all duration-200 transform scale-95 group-hover/btn:scale-100 whitespace-nowrap z-50 pointer-events-none">
                      {t('View Bookings')}
                    </div>
                  </motion.button>
                  
                  <motion.button 
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    onClick={() => mainActions.includes('calendar') && router.push(`/Pages/Services/Property_Module/Service/Calendar?id=${property.id}`)}
                    className={`relative group/btn ${mainActions.includes('calendar') ? 'bg-[#F9F5E8] hover:bg-[#f6eed2] cursor-pointer' : 'bg-[#EEF2F6] cursor-not-allowed opacity-60'} p-2.5 rounded-[3px] transition-all duration-200`}
                  >
                    {mainActions.includes('calendar') ? (
                      <img src="/images/icons/calender_yellow.svg" className='w-5 h-5' alt="" />
                    ) : (
                      <img src="/images/icons/calender__gray.svg" className='w-5 h-5' alt="" />
                    )}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1.5 bg-[#364152] text-white text-xs font-medium rounded shadow-lg opacity-0 invisible group-hover/btn:opacity-100 group-hover/btn:visible transition-all duration-200 transform scale-95 group-hover/btn:scale-100 whitespace-nowrap z-50 pointer-events-none">
                      {t('Calendar')}
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    onClick={() => mainActions.includes('edit_property') && router.push(`/Pages/Services/Property_Module/Service/Edit?id=${property.id}`)}
                    className={`relative group/btn ${mainActions.includes('edit_property') ? 'bg-[#F9F5E8] hover:bg-[#f6eed2] cursor-pointer' : 'bg-[#EEF2F6] cursor-not-allowed opacity-60'} p-2.5 rounded-[3px] transition-all duration-200`}
                  >
                    {mainActions.includes('edit_property') ? (
                      <img src="/images/icons/EditYellow.svg" className='w-5 h-5' alt="" />
                    ) : (
                      <img src="/images/icons/EditGray.svg" className='w-5 h-5' alt="" />
                    )}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1.5 bg-[#364152] text-white text-xs font-medium rounded shadow-lg opacity-0 invisible group-hover/btn:opacity-100 group-hover/btn:visible transition-all duration-200 transform scale-95 group-hover/btn:scale-100 whitespace-nowrap z-50 pointer-events-none">
                      {t('Edit Property')}
                    </div>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.section>
        )
      })}

      <DeletePage
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        handleDelete={handleDelete}
      />
    </>
  )
}

export default CardOfService