import React from "react";
import { useTranslation } from "react-i18next";



function TrackingStatus() {
  const { t } = useTranslation();

  const CheckIcon = ({ active }) => {
    return (
      <div
        className={`w-6 h-6 rounded-3px  flex items-center justify-center shrink-0 ${active ? "bg-primary" : "bg-[#CDD5DF]"}`}
      >
        {active && (
          <img src="/images/icons/true.svg" alt="" />
        )}
      </div>
    );
  };

  const STEPS = [
    {
      labelKey: t('The order has been confirmed'),
      time: "1:15م",
      active: true,
    },
    {
      labelKey: t('It was received'),
      time: "1:15م",
      active: false,
    },
    {
      labelKey:t('in the way'),
      time: "-",
      active: false,
    },
    {
      labelKey: t('nearby'),
      time: "-",
      active: false,
    },
    {
      labelKey: t('Delivery'),
      time: "-",
      active: false,
    },
  ];


  return (
    <div className="border border-[#CDD5DF] rounded-3px p-6">
      {/* Title */}
      <p className="text-[#364152] text-xl font-medium mb-6">
        {t("Tracking status")}
      </p>

      {/* Steps */}
      <div className="flex flex-col">
        {STEPS.map((step, index) => (
          <div key={step.labelKey} className="flex flex-col">

            {/*icon + content side by side */}
            <div className="flex items-start gap-2">

              <div className="flex flex-col items-center shrink-0">
                <CheckIcon active={step.active} />
              
                {index < STEPS.length - 1 && (
                  <div className="w-px flex-1 min-h-10 bg-[#CDD5DF]" />
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-px ">
                <p className={`text-lg font-normal whitespace-nowrap ${
                    step.active ? "text-[#0B0E11]" : "text-[#A3A3A3]"
                  }`}
                >
                  {step.labelKey}
                </p>
                <p className="text-lg text-[#9AA1A9] font-light whitespace-nowrap">
                  {step.time}
                </p>
              </div>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default TrackingStatus;