

"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ViewHome_Car_Street_ModulePage from "@/app/Pages/requests/Home_Car_Street_Module/Views/Home_Car_Street_Module/View/page";
import { getBookingByIDThunk } from "@/redux/slice/Requests/RequestsSlice";

function HaveReviewsPage({ reviews }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { bookingDetails } = useSelector((state) => state.requests);

  const [expandedIndexes, setExpandedIndexes] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const handleClickOpen = (id) => {
    setSelectedBookingId(id);
    dispatch(getBookingByIDThunk(id));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBookingId(null);
  };

  const toggleExpanded = (index) => {
    setExpandedIndexes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const maxLength = 90;

  /** for random colors */
  const avatarColors = [
    "bg-red-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-yellow-400",
    "bg-indigo-400",
  ];
  const getAvatarColor = (user_name) => {
    if (!user_name) return "bg-gray-400";
    const charCode = user_name.charCodeAt(0);
    return avatarColors[charCode % avatarColors.length];
  };

  return (
    <>
      <div className="flex flex-col">
        {reviews?.data?.map((rating, index) => {
          const text = rating?.review || "";
          const isLong = text.length > maxLength;
          const shortText = text.slice(0, maxLength);
          const expanded = expandedIndexes[index] || false;

          return (
            <motion.section 
              className="p-4" 
              key={rating?.booking_id || index}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
            >
              <div className="border-b border-[#CDD5DF] pb-3 hover:bg-[#FAFAFA] transition-colors rounded-sm px-2">
                <div className="flex justify-between items-start">
                  <div className="flex mb-3 gap-3">
                    <motion.p
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.15 }}
                      className={`${getAvatarColor(rating?.user_name)} 
                      w-10 h-10 flex justify-center items-center rounded-full p-2 mt-1 text-white font-semibold shadow-xs select-none`}
                    >
                      {rating?.user_name?.charAt(0)}
                    </motion.p>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-[#364152] text-base font-medium">
                        {rating?.user_name}
                      </p>
                      <p className="text-[#697586] text-sm font-normal">
                        {new Date(rating.date).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 items-end">
                    <p className="text-sm font-medium flex gap-1">
                      <span className="text-[#8B8B8B]">#</span>
                      <span
                        className="text-[#4D0CE7] underline cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => handleClickOpen(rating?.booking_id)}
                      >
                        {rating?.booking_id}
                      </span>
                    </p>

                    <p className="flex items-center gap-1">
                      <img
                        src="/images/icons/star.svg"
                        alt="star"
                        className="w-4 h-4"
                      />
                      <span className="text-[#FDB022] text-sm font-semibold">
                        {rating?.rating}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-[#4B5565] text-sm font-normal leading-relaxed">
                    {expanded || !isLong ? text : shortText + "... "}
                    {isLong && (
                      <span
                        onClick={() => toggleExpanded(index)}
                        className="text-[#4D0CE7] text-sm font-normal cursor-pointer hover:underline"
                      >
                        {expanded ? t("Show less") : t("Read more")}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </motion.section>
          );
        })}
      </div>

      <div className="w-full h-px bg-[#CDD5DF]"></div>

      <ViewHome_Car_Street_ModulePage
        open={open}
        handleClose={handleClose}
        bookingId={selectedBookingId}
        bookingDetails={bookingDetails}
      />
    </>
  );
}

export default HaveReviewsPage;
