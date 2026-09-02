"use client"
import ViewsPage from '@/app/Pages/requests/Property_Module/Views/page';
import { getProviderRateThunk } from '@/redux/slice/Home/HomeSlice';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

function Content() {
  const { t } = useTranslation()

  // API
  const dispatch = useDispatch()
  const { providerRate, providerState, loading } = useSelector((state) => state.Home)
  useEffect(() => {
    dispatch(getProviderRateThunk())
  }, [dispatch])

  const [expandedIndexes, setExpandedIndexes] = useState({});
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const handleOpenBooking = (bookingId) => {
    setSelectedBookingId(bookingId);
    setBookingOpen(true);
  };
  
  const toggleExpanded = (index) => {
    setExpandedIndexes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  
  const maxLength = 130;
  return (
    <>
      <div className="space-y-4">
        {providerRate?.ratings?.map((rate, index) => {
          const text = rate?.review || "";
          const isLong = text.length > maxLength;
          const shortText = text.slice(0, maxLength);
          const expanded = expandedIndexes[index];

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.04 }}
              className="border-b border-[#CDD5DF] pb-4 transition-colors duration-150 hover:bg-slate-50/60 p-3 rounded-[3px]"
            >
              <div className="flex justify-between items-start">
                <div className="flex mb-3 gap-3 items-center">
                  <p className="bg-amber-400 text-slate-800 font-semibold w-10 h-10 flex justify-center items-center rounded-full shadow-2xs">
                    {rate?.user?.name?.charAt(0) || 'U'}
                  </p>

                  <div className="flex flex-col">
                    <p className="text-[#364152] text-base font-semibold">
                      {rate?.user?.name} {rate?.user?.lastname}
                    </p>

                    <p className="text-[#697586] text-xs font-normal">
                      {rate?.created_at ? (
                        `${new Date(rate?.created_at).getDate()}/${
                          new Date(rate?.created_at).getMonth() + 1
                        }/${new Date(rate?.created_at).getFullYear()}`
                      ) : ''}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <p className="text-sm font-medium flex items-center gap-1">
                    <span className="text-[#8B8B8B]">#</span>
                    <span
                      className="text-[#4D0CE7] hover:text-[#370aa8] font-semibold underline cursor-pointer transition-colors"
                      onClick={() => handleOpenBooking(rate?.booking_id)}
                    >
                      {rate?.booking_id}
                    </span>
                  </p>

                  <div className="flex items-center gap-1 bg-[#FFFAEB] border border-[#FEC84B] px-2 py-0.5 rounded-[3px]">
                    <img
                      src="/images/icons/star.svg"
                      className="w-3.5 h-3.5"
                      alt=""
                    />
                    <span className="text-[#DC6803] text-xs font-semibold">
                      {rate?.rating}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-1 text-[#4B5565] text-sm font-normal leading-relaxed">
                {expanded || !isLong ? text : shortText + "... "}

                {isLong && (
                  <span
                    onClick={() => toggleExpanded(index)}
                    className="text-[#4D0CE7] hover:underline font-medium text-xs cursor-pointer ml-1"
                  >
                    {expanded ? t("Show less") : t("Read more")}
                  </span>
                )}
              </p>
            </motion.div>
          );
        })}
      </div>

      <ViewsPage
        open={bookingOpen}
        setOpen={setBookingOpen}
        id={selectedBookingId}
      />
    </>
  )
}

export default Content