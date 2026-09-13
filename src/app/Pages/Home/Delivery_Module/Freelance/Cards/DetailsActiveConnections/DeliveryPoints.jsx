import React from "react";
import { useTranslation } from "react-i18next";

function DeliveryPoints() {
  const { t } = useTranslation();

  const deliveryPoints = [
    {
      address: "321 شارع ابن، جناح 200",
      recipient: "أمير هارون",
    },
    {
      address: "321 شارع ابن، جناح 200",
      recipient: "أمير هارون",
    },
    {
      address: "321 شارع ابن، جناح 200",
      recipient: "أمير هارون",
    },
  ];

  return (
    <div className="border border-[#CDD5DF] rounded-3px p-6">
      {/* Title */}
      <p className="text-[#364152] text-xl font-medium mb-6">
        {t("Delivery points")} (3)
      </p>

      {/* Delivery Points */}
      <div className="border border-[#E7E7E7] rounded-3px p-4">
        <div className="flex flex-col ">
          {deliveryPoints.map((point, index) => (
            <div key={index}  className="relative   " >
              {/* Left Arrow */}
              <div className="absolute left-0 top-5 cursor-pointer ">
                <img src="/images/icons/arrow-right-blackk.svg" alt="" />
              </div>

              {/* Content */}
              <div className="mr-auto flex items-start gap-2 text-right ">
                <div className="relative flex flex-col  items-center ">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-3px bg-[#F4EAD0]  flex items-center justify-center z-10" style={{ boxShadow: '0 0 0 4px #FFF8E620' }}>
                    <img src="/images/icons/map-pinpoint_yellow.svg" alt="" />
                  </div>

                  {/* Dotted Line */}
                  {index !== deliveryPoints.length - 1 && (
                    <div className="w-px flex-1  border-l border-dashed border-[#F1D98A]" style={{ minHeight: '60px' }} />
                  )}
                </div>

                {/* Text */}
                <div className="flex flex-col items-start ">
                  <p className="text-base text-[#697586] font-normal whitespace-nowrap">
                    {t("recipient")}
                  </p>

                  <p className="text-base text-[#364152] font-normal whitespace-nowrap leading-6">
                    {point.address}
                  </p>

                  <p className="text-base text-[#697586] font-normal whitespace-nowrap">
                    {t("recipient")}: {point.recipient}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DeliveryPoints;