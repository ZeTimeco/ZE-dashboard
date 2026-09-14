'use client'
import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";



function TrackingStatus({getActiveDelivery}) {
  const { t } = useTranslation();
  const getActiveDeliveryData = getActiveDelivery?.data

  

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };
  const CheckIcon = ({ active }) => {
    return (
      <motion.div
        className={`w-6 h-6 rounded-3px flex items-center justify-center shrink-0 ${
          active ? "bg-primary" : "bg-[#CDD5DF]"
        }`}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {active && (
          <motion.img
            src="/images/icons/true_white.svg"
            alt=""
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25, delay: 0.1 }}
          />
        )}
        {active && (
          <motion.div
            className="absolute w-6 h-6 rounded-3px bg-primary opacity-0"
            animate={{ scale: [1, 1.6], opacity: [0.35, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
            style={{ position: 'absolute' }}
          />
        )}
      </motion.div>
    );
  };

  const tracking = getActiveDeliveryData?.tracking;
  const STEPS = [
    {
      key: "confirmed",
      label: t("The order has been confirmed"),
    },
    {
      key: "picked_up",
      label: t("It was received"),
    },
    {
      key: "on_the_way",
      label: t("in the way"),
    },
    {
      key: "delivered",
      label: t("Delivery"),
    },
  ];

  return (
    <motion.div
      className="border border-[#CDD5DF] rounded-3px p-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Title */}
      <motion.p
        className="text-[#364152] text-xl font-medium mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {t("Tracking status")}
      </motion.p>

      {/* Steps */}
      <motion.div
        className="flex flex-col"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {STEPS.map((step, index) => {
          const trackingData = tracking?.[step.key];

          return (
            <motion.div
              key={step.key}
              className="flex flex-col"
              variants={stepVariants}
            >
              <motion.div className="flex items-start gap-2 rounded-md px-1 py-0.5">
                
                <div className="flex flex-col items-center shrink-0 relative">
                  
                  <CheckIcon active={trackingData?.completed} />

                  {index < STEPS.length - 1 && (
                    <motion.div
                      className={`w-px flex-1 min-h-10 ${
                        trackingData?.completed
                          ? "bg-primary"
                          : "bg-[#CDD5DF]"
                      }`}
                      initial={{ scaleY: 0, originY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.2 + index * 0.08,
                      }}
                    />
                  )}

                </div>

                {/* Content */}
                <div className="flex flex-col gap-px">
                  
                  <p
                    className={`text-lg font-normal whitespace-nowrap ${
                      trackingData?.completed
                        ? "text-[#0B0E11]"
                        : "text-[#A3A3A3]"
                    }`}
                  >
                    {step.label}
                  </p>

                  <p className="text-lg text-[#9AA1A9] font-light whitespace-nowrap">
                    {trackingData?.completed
                      ? trackingData?.time
                      : "-"}
                  </p>

                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

export default TrackingStatus;
