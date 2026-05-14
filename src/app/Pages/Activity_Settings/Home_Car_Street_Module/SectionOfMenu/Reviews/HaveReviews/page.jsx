

"use client";
import React, { useState } from "react";
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

  // ✅ Mock Data بدل service جاي من backend
  const ratings = [
    {
      id: 1,
      rating: 4.5,
      review:
        "The service was very good and fast. I really appreciate the professionalism and the quick response from the team.",
      created_at: "2026-02-15",
      user: {
        name: "Ahmed",
        lastname: "Ali",
      },
    },
    {
      id: 2,
      rating: 5,
      review:
        "Excellent experience! Everything was smooth and well organized. Highly recommended.",
      created_at: "2026-02-14",
      user: {
        name: "Sara",
        lastname: "Mohamed",
      },
    },
  ];


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
     console.log(reviews?.data);
  return (
    <>
        {reviews?.data?.map((rating, index) => {
          const text = rating?.review || "";
          const isLong = text.length > maxLength;
          const shortText = text.slice(0, maxLength);
          const expanded = expandedIndexes[index] || false;

          return (
            <section className="p-4 " key={rating?.booking_id}>
              <div className="border-b border-[#CDD5DF]">
                <div className="flex justify-between">
                  <div className="flex mb-4 gap-3">
                    <p
                      className={`${getAvatarColor(rating?.user_name)} 
                      w-10 h-10 flex justify-center items-center rounded-full p-2 mt-2 text-white`}
                    >
                      {rating?.user_name?.charAt(0)}
                    </p>
                    <div className="flex flex-col gap-1">
                      <p className="text-[#364152] text-base font-medium">
                        {rating?.user_name}
                      </p>
                      <p className="text-[#697586] text-sm font-normal">
                        {new Date(rating.date).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium flex gap-1">
                      <span className="text-[#8B8B8B]">#</span>

                      <span
                        className="text-[#4D0CE7] underline cursor-pointer"
                        onClick={() => handleClickOpen(rating?.booking_id)}
                      >
                        {rating?.booking_id}
                      </span>
                    </p>

                    <p className="flex items-center">
                      <img
                        src="/images/icons/star.svg"
                        className="w-4 h-4 mt-0.5"
                      />

                      <span className="text-[#FDB022] text-sm font-medium">
                        {rating?.rating}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  <p className="mb-4 text-[#4B5565] text-sm font-normal">
                    {expanded || !isLong ? text : shortText + "... "}
                    {isLong && (
                      <span
                        onClick={() => toggleExpanded(index)}
                        className="text-[#4D0CE7] text-sm font-normal cursor-pointer"
                      >
                        {expanded ? t("Show less") : t("Read more")}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </section>
          );
        })}

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
