'use client';
import { getBookingNewThunk, getBookingOngoingThunk } from "@/redux/slice/Home/HomeSlice";
import { getBookingByIDThunk, UpdateBookingThunk } from "@/redux/slice/Requests/RequestsSlice";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { IMAGE_BASE_URL } from "../../../../../../../../../config/imageUrl";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import ViewHome_Car_Street_ModulePage from "@/app/Pages/requests/Home_Car_Street_Module/Views/Home_Car_Street_Module/View/page";

function NewOrdersPage({ orders = [], layout = "list", current_module_key }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { bookingDetails } = useSelector((state) => state.requests);

  const [hiddenBookingIds, setHiddenBookingIds] = useState([]);
  const [loadingBookingId, setLoadingBookingId] = useState(null);

  // Modal / Popup state
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  
  useEffect(() => {
    dispatch(getBookingNewThunk());
  }, [dispatch]);

  // Listen for booking updates across components
  useEffect(() => {
    const handleBookingUpdated = () => {
      dispatch(getBookingNewThunk());
      dispatch(getBookingOngoingThunk());
    };
    window.addEventListener('booking_updated', handleBookingUpdated);
    return () => window.removeEventListener('booking_updated', handleBookingUpdated);
  }, [dispatch]);

  const handleCardClick = (bookingId) => {
    if (!bookingId) return;
    setSelectedBookingId(bookingId);
    dispatch(getBookingByIDThunk(bookingId));
    setIsViewOpen(true);
  };

  const handleCloseView = () => {
    setIsViewOpen(false);
    setSelectedBookingId(null);
  };

  const handleAcceptBooking = (booking_id) => {
    console.log("booking id ---->", booking_id);
    if (!booking_id || loadingBookingId) return;
    setLoadingBookingId(booking_id);
    dispatch(UpdateBookingThunk({ id: booking_id, formData: { status: "accepted" } }))
      .unwrap()
      .then(() => {
        setHiddenBookingIds((prev) => [...prev, booking_id]);
        toast.success(t("Booking accepted successfully") || "تم قبول الطلب بنجاح");
        dispatch(getBookingNewThunk());
        dispatch(getBookingOngoingThunk());
      })
      .catch((err) => {
        console.error("Failed to accept booking:", err);
        toast.error(t("Failed to accept booking") || "فشل في قبول الطلب");
      })
      .finally(() => {
        setLoadingBookingId(null);
      });
  };

  const handleRejectedBooking = (booking_id) => {
    console.log("booking id ---->", booking_id);
    if (!booking_id || loadingBookingId) return;
    setLoadingBookingId(booking_id);
    dispatch(UpdateBookingThunk({ id: booking_id, formData: { status: "rejected" } }))
      .unwrap()
      .then(() => {
        setHiddenBookingIds((prev) => [...prev, booking_id]);
        toast.success(t("Booking rejected successfully") || "تم رفض الطلب بنجاح");
        dispatch(getBookingNewThunk());
        dispatch(getBookingOngoingThunk());
      })
      .catch((err) => {
        console.error("Failed to reject booking:", err);
        toast.error(t("Failed to reject booking") || "فشل في رفض الطلب");
      })
      .finally(() => {
        setLoadingBookingId(null);
      });
  };

  const visibleOrders = (orders || []).filter((order) => {
    const id = order?.booking_id ?? order?.id;
    return !hiddenBookingIds.includes(id);
  });

  return (
    <>
      <div className="border border-[#CDD5DF] rounded-3px p-6 h-[500px] overflow-y-auto">
        <p className="text-[#0F022E] text-xl font-medium">
          {t("New orders")}
        </p>

        {visibleOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[380px] text-center text-[#697586]">
            <img src="/images/icons/renewable-energy.svg" alt="" className="w-12 h-12 mb-3 opacity-40" />
            <p className="text-base font-normal">{t("No new orders available") || "لا توجد طلبات جديدة حالياً"}</p>
          </div>
        ) : (
          <div className={layout === "grid" ? "grid grid-cols-2 gap-4" : `grid lg1:grid-cols-1 ${visibleOrders.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
            <AnimatePresence mode="popLayout">
              {visibleOrders.map((order, index) => {
                const bookingId = order?.booking_id ?? order?.id;

                return (
                  <motion.div
                    key={bookingId || index}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    whileHover={{
                      y: -3,
                      scale: 1.01,
                      borderColor: "var(--color-primary, #6927DA)",
                      boxShadow: "0 12px 24px -6px rgba(105, 39, 218, 0.12), 0 4px 8px -2px rgba(0, 0, 0, 0.04)"
                    }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    onClick={() => handleCardClick(bookingId)}
                    className="mt-6 border border-[#CDD5DF] bg-white shadow-sm rounded-3px p-4 mb-4 cursor-pointer select-none"
                  >
                    {/* Service */}
                    <div className="flex gap-2 items-center">
                      <img
                        src={
                          order?.service_icon
                            ? `${IMAGE_BASE_URL}${order.service_icon}`
                            : "/images/icons/renewable-energy.svg"
                        }
                        alt="service"
                        className='w-6 h-6 mt-1'
                      />             
                      <p>
                        <span className="text-[#364152] text-lg font-medium">
                          {order?.service_name} -
                        </span>{" "}
                        <span className="text-[#4B5565] text-sm">
                          {order?.username}
                        </span>
                      </p>
                    </div>

                    <hr className="border-[#E3E8EF] my-4" />

                    {/* Price & Distance */}
                    <div className="flex justify-between">
                      <div className="flex gap-1.5 items-center">
                        <img src="/images/icons/price.svg" alt="price" />
                        <p className="text-[var(--color-primary)] text-base font-medium">
                          {order?.price} جنية
                        </p>
                      </div>

                      <div className="flex gap-1.5 items-center">
                        <img src="/images/icons/route.svg" alt="distance" />
                        <p className="text-[#364152] text-base">
                          {t('Working distance')} {order?.total_distance_km} {t('kilometers')}
                        </p>
                      </div>
                    </div>

                    <hr className="border-[#E3E8EF] my-4" />

                    {/* Location */}
                    {current_module_key === 'home_services' && (
                      <div className="flex gap-2 items-center">
                        <img src="/images/icons/location-bluee.svg" alt="location" />
                        <p className="text-[#364152] text-base">
                          {order?.address}
                        </p>
                      </div>
                    )}

                    {/* car details */}
                    {current_module_key === 'car_services' && (
                      <div className="flex gap-2 items-center">
                        <img src="/images/icons/car-alert_gray.svg" alt="car" />
                        <p className="text-[#364152] text-base">
                          {order?.car?.brand} {order?.car?.model} - {order?.car?.year}
                        </p>
                      </div>
                    )}

                    <hr className="border-[#E3E8EF] my-4" />

                    {/* Buttons */}
                    <div className="flex gap-4">
                      <motion.button 
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAcceptBooking(bookingId);
                        }}
                        disabled={loadingBookingId === bookingId}
                        className="bg-[#079455] text-white text-sm font-semibold w-[70%] h-14 rounded-[3px] cursor-pointer hover:bg-[#067c47] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {loadingBookingId === bookingId ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                            <span>{t("Processing...") || "جاري المعالجة..."}</span>
                          </>
                        ) : (
                          t("Application accepted")
                        )}
                      </motion.button>

                      <motion.button 
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRejectedBooking(bookingId);
                        }}
                        disabled={loadingBookingId === bookingId}
                        className="border border-[#FF3B30] text-[#FF3B30] text-sm font-medium w-[30%] h-14 rounded-3px cursor-pointer hover:bg-[#fff5f5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {t("to reject")}
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Booking Details View Popup */}
      <ViewHome_Car_Street_ModulePage
        open={isViewOpen}
        handleClose={handleCloseView}
        bookingId={selectedBookingId}
        bookingDetails={bookingDetails}
      />
    </>
  );
}

export default NewOrdersPage;
