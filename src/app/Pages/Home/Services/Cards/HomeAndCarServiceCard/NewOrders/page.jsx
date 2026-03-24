'use client';
import { getBookingNewThunk } from "@/redux/slice/Home/HomeSlice";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { IMAGE_BASE_URL } from "../../../../../../../../config/imageUrl";

function NewOrdersPage({ orders = [], layout = "list" ,current_module_key }) {
  const { t } = useTranslation();

  //API
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(getBookingNewThunk())
  },[dispatch])



  return (
    <div className="border border-[#CDD5DF] rounded-[3px] p-6  h-[500px] overflow-y-auto">
      <p className="text-[#0F022E] text-xl font-medium">
        {t("New orders")}
      </p>

      <div className={layout === "grid" ? "grid grid-cols-2 gap-4" : `grid lg1:grid-cols-1 ${orders.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
        {orders?.map((order , index) => (
          <div
            key={order?.booking_id || index}
            className="mt-6 border border-[#CDD5DF] bg-white shadow-sm rounded-[3px] p-4 mb-4"
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
              <button className="bg-[#079455] text-white text-sm font-semibold w-[70%] h-14 rounded-[3px] cursor-pointer">
                {t("Application accepted")}
              </button>

              <button className="border border-[#FF3B30] text-[#FF3B30] text-sm font-medium w-[30%] h-14 rounded-[3px] cursor-pointer">
                {t("to reject")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewOrdersPage;
