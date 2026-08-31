"use client";
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next';

function CardOfActivePage({is_marketer , cardData}) {
    const {t} = useTranslation()

    const profit_change_percentage = cardData?.profit_change_percentage;
    const subscribers_change_percentage = cardData?.subscribers_change_percentage;
    const pending_profit_change_percentage = cardData?.pending_profit_change_percentage

    const [copied, setCopied] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);

  return (
    <>
      {/* total profits */}
      <motion.section 
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        whileHover={{ y: -2, boxShadow: "0 4px 14px rgba(0,0,0,0.06)" }}
        className={`border border-[#CDD5DF] rounded-[3px] py-3.5 px-3 transition-all duration-200 ${is_marketer ? 'bg-white' : 'bg-[#EEF2F6]'}`}
      >
        {/* title */}
        <div className='flex items-center gap-3'>
          <p className={`w-10 h-10 flex items-center justify-center rounded-[3px] shadow-2xs ${is_marketer ? 'bg-[#B4F0CC]' : 'bg-[#CDD5DF]'}`}>
            {is_marketer ? 
            (<img src="/images/icons/earnings.svg" alt="" className='w-6 h-6' />)
            :( <img src="/images/icons/earnings_grey.svg" alt="" className='w-6 h-6' />)
            }
          </p>
          <p className='text-[#4B5565] text-base font-normal'>{t('total profits')}</p>
        </div>

        <div className='py-2.5'>
          <p className='text-[#202939] text-xl font-bold tracking-tight'>{cardData?.total_profit}</p>
        </div>

        <div className='flex gap-1 items-center'>
          <p className='text-[#697586] text-xs font-light'>{t('Last week')}</p>
          {profit_change_percentage >= 0 ? (
            <>
              <p className='flex items-center text-sm font-semibold text-[#17B26A]'>
                <span className='text-xs'>{profit_change_percentage}%</span>
                <span>+</span>  
              </p>
              <p className='flex items-center'>
                <img src="/images/icons/green_arrow_up.svg" alt="" className="w-3.5 h-3.5" />
              </p>
            </>
          ) : (
            <>
              <p className='flex items-center text-sm font-semibold text-[#F04438]'>
                <span className='text-xs'>{profit_change_percentage}%</span>
              </p>
              <p className='flex items-center'>
                <img src="/images/icons/red_arrow_down.svg" alt="" className="w-3.5 h-3.5" />
              </p>
            </>
          )}
        </div>
      </motion.section>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3'>
        {/* Total number of subscribers */}
        <motion.section 
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.05 }}
          whileHover={{ y: -2, boxShadow: "0 4px 14px rgba(0,0,0,0.06)" }}
          className={`border border-[#CDD5DF] rounded-[3px] py-3.5 px-3 transition-all duration-200 ${is_marketer ? 'bg-white' : 'bg-[#EEF2F6]'}`}
        >
          {/* title */}
          <div className='flex items-center gap-3'>
            <p className={`w-10 h-10 flex items-center justify-center rounded-[3px] shadow-2xs ${is_marketer ? 'bg-[#FEF3F2]' : 'bg-[#CDD5DF]'}`}>
              {is_marketer ? 
              (<img src="/images/icons/user-group.svg" alt="" className='w-6 h-6' />)
              :( <img src="/images/icons/user-group_grey.svg" alt="" className='w-6 h-6' />)}
            </p>
            <p className='text-[#4B5565] text-base font-normal'>{t('Total number of subscribers')}</p>
          </div>

          <div className='py-2.5'>
            <p className='text-[#202939] text-xl font-bold tracking-tight'>{cardData?.total_subscribers}</p>
          </div>

          <div className='flex gap-1 items-center'>
            <p className='text-[#697586] text-xs font-light'>{t('Last week')}</p>
            {subscribers_change_percentage >= 0 ? (
              <>
                <p className='flex items-center text-sm font-semibold text-[#17B26A]'>
                  <span className='text-xs'>{subscribers_change_percentage}%</span>
                  <span>+</span>  
                </p>
                <p className='flex items-center'>
                  <img src="/images/icons/green_arrow_up.svg" alt="" className="w-3.5 h-3.5" />
                </p>
              </>
            ) : (
              <>
                <p className='flex items-center text-sm font-semibold text-[#F04438]'>
                  <span className='text-xs'>{subscribers_change_percentage}%</span>
                </p>
                <p className='flex items-center'>
                  <img src="/images/icons/red_arrow_down.svg" alt="" className="w-3.5 h-3.5" />
                </p>
              </>
            )}
          </div>
        </motion.section> 

        {/* pending profits */}
        <motion.section 
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.1 }}
          whileHover={{ y: -2, boxShadow: "0 4px 14px rgba(0,0,0,0.06)" }}
          className={`border border-[#CDD5DF] rounded-[3px] py-3.5 px-3 transition-all duration-200 ${is_marketer ? 'bg-white' : 'bg-[#EEF2F6]'}`}
        >
          {/* title */}
          <div className='flex items-center gap-3'>
            <p className={`w-10 h-10 flex items-center justify-center rounded-[3px] shadow-2xs ${is_marketer ? 'bg-[#B4F0CC]' : 'bg-[#CDD5DF]'}`}>
              {is_marketer ? 
              (<img src="/images/icons/earnings.svg" alt="" className='w-6 h-6' />)
              :( <img src="/images/icons/earnings_grey.svg" alt="" className='w-6 h-6' />)
              }
            </p>
            <p className='text-[#4B5565] text-base font-normal'>{t('pending profits')}</p>
          </div>

          <div className='py-2.5'>
            <p className='text-[#202939] text-xl font-bold tracking-tight'>{cardData?.pending_profit}</p>
          </div>

          <div className='flex gap-1 items-center'>
            <p className='text-[#697586] text-xs font-light'>{t('Last week')}</p>
            {pending_profit_change_percentage >= 0 ? (
              <>
                <p className='flex items-center text-sm font-semibold text-[#17B26A]'>
                  <span className='text-xs'>{pending_profit_change_percentage}%</span>
                  <span>+</span>  
                </p>
                <p className='flex items-center'>
                  <img src="/images/icons/green_arrow_up.svg" alt="" className="w-3.5 h-3.5" />
                </p>
              </>
            ) : (
              <>
                <p className='flex items-center text-sm font-semibold text-[#F04438]'>
                  <span className='text-xs'>{pending_profit_change_percentage}%</span>
                </p>
                <p className='flex items-center'>
                  <img src="/images/icons/red_arrow_down.svg" alt="" className="w-3.5 h-3.5" />
                </p>
              </>
            )}
          </div>
        </motion.section>

        {/* Total balance due */}
        <motion.section 
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.15 }}
          whileHover={{ y: -2, boxShadow: "0 4px 14px rgba(0,0,0,0.06)" }}
          className={`border border-[#CDD5DF] rounded-[3px] py-3.5 px-3 transition-all duration-200 ${is_marketer ? 'bg-white' : 'bg-[#EEF2F6]'}`}
        >
          {/* title */}
          <div className='flex items-center gap-3'>
            <p className={`w-10 h-10 flex items-center justify-center rounded-[3px] shadow-2xs ${is_marketer ? 'bg-[#FEF0C7]' : 'bg-[#CDD5DF]'}`}>
              {is_marketer ? 
              (<img src="/images/icons/wallet-done.svg" alt="" className='w-6 h-6' />)
              :( <img src="/images/icons/wallet-done_grey.svg" alt="" className='w-6 h-6' />)
              }
            </p>
            <p className='text-[#4B5565] text-base font-normal'>{t('Total balance due')}</p>
          </div>

          <div className='py-2.5'>
            <p className='text-[#202939] text-xl font-bold tracking-tight'>{cardData?.available_profit}</p>
          </div>
        </motion.section>

        {/* Total amount withdrawn */}
        <motion.section 
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.2 }}
          whileHover={{ y: -2, boxShadow: "0 4px 14px rgba(0,0,0,0.06)" }}
          className={`border border-[#CDD5DF] rounded-[3px] py-3.5 px-3 transition-all duration-200 ${is_marketer ? 'bg-white' : 'bg-[#EEF2F6]'}`}
        >
          {/* title */}
          <div className='flex items-center gap-3'>
            <p className={`w-10 h-10 flex items-center justify-center rounded-[3px] shadow-2xs ${is_marketer ? 'bg-[#EDE7FD]' : 'bg-[#CDD5DF]'}`}>
              {is_marketer ? 
              (<img src="/images/icons/Available_withdrawal.svg" alt="" className='w-6 h-6' />)
              :( <img src="/images/icons/Available_withdrawal_grey.svg" alt="" className='w-6 h-6' />)
              }
            </p>
            <p className='text-[#4B5565] text-base font-normal'>{t('Total amount withdrawn')}</p>
          </div>

          <div className='py-2.5'>
            <p className='text-[#202939] text-xl font-bold tracking-tight'>{cardData?.total_withdrawed}</p>
          </div>
        </motion.section>
      </div>

      {/* code */}
      <section className='mt-6'>
        <p className='text-[#364152] text-sm font-medium'>{t('code')}</p>
        <div className="relative mt-1.5">
          <input 
            type="text" 
            value={cardData?.marketer_code ?? ""}
            readOnly
            className={`w-full p-3 border border-[#CDD5DF] rounded-[3px] focus:outline-none transition-colors ${is_marketer ? 'bg-white' : 'bg-[#EEF2F6]'}`}
          />
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (cardData?.marketer_code) {
                navigator.clipboard.writeText(cardData.marketer_code);
                setShowSnackbar(true);
                setTimeout(() => {
                  setShowSnackbar(false);
                }, 1500);
              }
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer p-1"
            title={t("Copy code")}
          >
            <img src="/images/icons/copy.svg" alt="" className="w-5 h-5" />
          </motion.button>
        </div>

        {showSnackbar && (
          <div className='flex justify-end'>
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="w-fit mt-2"
            >
              <div className="bg-[#16A34A] text-white px-5 py-2 rounded-[3px] shadow-md flex items-center gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-sm font-medium">
                  {t("Copied successfully")}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </section>
    </>
  )
}

export default CardOfActivePage