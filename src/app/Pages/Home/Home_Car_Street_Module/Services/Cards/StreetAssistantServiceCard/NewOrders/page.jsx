'use client';
import { getBookingNewThunk } from "@/redux/slice/Home/HomeSlice";
import { UpdateBookingThunk } from "@/redux/slice/Requests/RequestsSlice";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { IMAGE_BASE_URL } from "../../../../../../../../../config/imageUrl";

function NewOrdersPage({ orders = [], layout = "list" }) {
  const { t } = useTranslation();

  //API
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(getBookingNewThunk())
  },[dispatch])

  const handleAcceptBooking = (booking_id) => {
    if (!booking_id) return;
    dispatch(UpdateBookingThunk({ id: booking_id, formData: { status: "accepted" } }))
      .unwrap()
      .then(() => {
        dispatch(getBookingNewThunk());
      })
      .catch((err) => {
        console.error("Failed to accept booking:", err);
      });
  };

  const handleRejectedBooking = (booking_id) => {
    if (!booking_id) return;
    dispatch(UpdateBookingThunk({ id: booking_id, formData: { status: "rejected" } }))
      .unwrap()
      .then(() => {
        dispatch(getBookingNewThunk());
      })
      .catch((err) => {
        console.error("Failed to reject booking:", err);
      });
  };


  const [hiddenOrders, setHiddenOrders] = useState(new Set());
  const [loadingOrders, setLoadingOrders] = useState(new Set());
  
  useEffect(() => {
    // Auto-accept progress bar simulation
    orders.forEach((order) => {
      const id = order?.booking_id;
      if (id && !hiddenOrders.has(id) && !loadingOrders.has(id)) {
        // Set loading state immediately for the progress bar
        setLoadingOrders((prev) => new Set([...prev, id]));

        setTimeout(() => {
          setHiddenOrders((prev) => new Set([...prev, id]));
          setLoadingOrders((prev) => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
          });
        }, 60000);
      }
    });
  }, [orders, hiddenOrders, loadingOrders]);
  
  // Filter out hidden orders
  const visibleOrders = orders.filter((order) => !hiddenOrders.has(order?.booking_id));


  return (
    <div className="border border-[#CDD5DF] rounded-[3px] p-6  h-[500px] overflow-y-auto">
      <p className="text-[#0F022E] text-xl font-medium">
        {t("New orders")}
      </p>

      <div className={layout === "grid" ? "grid grid-cols-2 gap-4" : `grid lg1:grid-cols-1 ${orders.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
      {visibleOrders.map((order) => (
        <div
          key={order?.booking_id}
          className="mt-6 border border-[#CDD5DF] bg-white shadow-sm rounded-[3px] p-4 mb-4"
        >
            <p>{order?.booking_id}</p>
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

          {/*Distance */}
          <div className="flex justify-between">
            <div className="flex gap-1.5 items-center">
              <img src="/images/icons/clock-gray.svg" alt="price" />
              <p className="text-[#364152] text-base font-medium">
                {t('Total')}{' '}
                {order?.total_duration_minutes >= 60
                  ? `${(order?.total_duration_minutes / 60).toFixed(1)} ساعة`
                  : `${order?.total_duration_minutes} دقيقة`}
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
            <div className="flex justify-between w-full">
              <div className="flex gap-2 items-center">
                <img src="/images/icons/location-bluee.svg" alt="location" />
                <p className="text-[#364152] text-base">
                  {order?.address}
                </p>
              </div>
              <button 
                onClick={() => handleRejectedBooking(order?.booking_id)}
                className=" bg-[#FF3B30] text-[#fff] text-sm font-medium w-[25%] h-10 rounded-[3px] cursor-pointer hover:bg-[#d93026] transition-colors"
              >
                {t("to reject")}
              </button>
            </div>
        

          <hr className="border-[#E3E8EF] my-4" />
          <div className="flex justify-between items-center w-full">
            {/* Buttons */}
            <button
              onClick={() => handleAcceptBooking(order?.booking_id)}
              className={`
                text-white text-sm font-semibold w-[50%] h-14 rounded-[3px]
                flex items-center justify-center gap-2
                overflow-hidden relative cursor-pointer hover:bg-[#067c47] transition-colors
                ${loadingOrders.has(order?.booking_id)
                  ? " bg-[#079455]"
                  : "bg-[#079455] "}
              `}
            >
              {loadingOrders.has(order?.booking_id) && (
                <span
                  className="absolute top-0 right-0 h-full bg-gradient-to-r from-[#17B26A] via-[#17B26A] to-[#17B26A] animate-progress"
                  style={{ width: "0%" }}
                ></span>
                )}
                <span className="relative z-10">
                {t("acceptance")}
                </span>
            </button>

            <p className="text-[var(--color-primary)] text-xl font-semibold">
                  {order?.price} جنية
            </p>
            
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default NewOrdersPage;
