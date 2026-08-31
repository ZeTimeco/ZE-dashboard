"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

function EvaluationPage({ handleClose, service }) {
  const { t } = useTranslation();

  const [expandedIndexes, setExpandedIndexes] = useState({});

  const toggleExpanded = (index) => {
    setExpandedIndexes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const maxLength = 90;

  return (
    <>
      <motion.section
        className="px-6 mb-4"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28 }}
      >
        <div className="px-4 py-3 border border-[#FEC84B] bg-[#FFFAEB] rounded-[10px] text-[#202939] text-base font-normal">
          {t(
            "To view customer reviews to enable them to improve and raise the efficiency of service performance and obtain more orders"
          )}
        </div>
      </motion.section>

      {service?.ratings?.map((rating, index) => {
        const text = rating?.review || "";
        const isLong = text.length > maxLength;
        const shortText = text.slice(0, maxLength);
        const expanded = expandedIndexes[index] || false;

        return (
          <motion.section
            className="px-6 mb-4"
            key={rating.id || index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: index * 0.06 }}
          >
            <div className="border-b border-[#CDD5DF] pb-1 hover:bg-[#FAFAFA] transition-colors rounded-sm px-1">
              <div className="flex justify-between">
                <div className="flex mb-4 gap-3">
                  <motion.p
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.15 }}
                    className="bg-amber-400 w-10 h-10 flex justify-center items-center rounded-full p-2 mt-2 font-semibold select-none"
                  >
                    {rating?.user?.name ? rating.user.name.charAt(0) : ""}
                  </motion.p>
                  <div className="flex flex-col gap-1">
                    <p className="text-[#364152] text-base font-medium">
                      {rating?.user?.name} {rating?.user?.lastname}
                    </p>
                    <p className="text-[#697586] text-sm font-normal">
                      {rating?.created_at
                        ? new Date(rating.created_at).toLocaleDateString("en-GB")
                        : ""}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1 items-center">
                  <img
                    src="images/icons/star.svg"
                    alt=""
                    className="w-4 h-4 mt-0.5"
                  />
                  <p className="text-[#FDB022] text-sm font-medium">
                    {rating?.rating}
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-4 text-[#4B5565] text-sm font-normal leading-relaxed">
                  {expanded || !isLong ? text : shortText + "... "}
                  {isLong && (
                    <motion.span
                      onClick={() => toggleExpanded(index)}
                      whileHover={{ opacity: 0.75 }}
                      className="text-[#4D0CE7] text-sm font-normal cursor-pointer"
                    >
                      {expanded ? t("Show less") : t("Read more")}
                    </motion.span>
                  )}
                </p>
              </div>
            </div>
          </motion.section>
        );
      })}

      <div className="w-full h-px bg-[#CDD5DF]"></div>

      <div className="px-6 mt-5 mb-3">
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: "rgba(198, 152, 21, 0.04)" }}
          whileTap={{ scale: 0.98 }}
          onClick={handleClose}
          className="border border-[#C69815] text-[#C69815] h-13.5 w-40 rounded-[3px] text-base font-medium cursor-pointer transition-colors"
        >
          {t("cancel")}
        </motion.button>
      </div>
    </>
  );
}

export default EvaluationPage;

