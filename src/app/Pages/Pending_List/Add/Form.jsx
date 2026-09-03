'use client'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const fieldVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut', delay: i * 0.06 },
  }),
}

function Form({getViews, formData ,setFormData}) {
  const {t} = useTranslation();
  const [guests, setGuests] = useState(formData?.number_of_guests || 1);

  useEffect(() => {
    if (!formData?.number_of_guests) {
      setFormData((prev) => ({
        ...prev,
        number_of_guests: guests || 1,
      }));
    } else {
      setGuests(formData.number_of_guests);
    }
  }, [formData?.number_of_guests, setFormData]);

  console.log(formData);

  return (
    <>
      <div className='p-6'>
        {/* the name */}
        <motion.div
          className='w-full flex flex-col gap-1.5'
          custom={0} variants={fieldVariants} initial="hidden" animate="visible"
        >
          <p className='text-sm font-medium mb-1.5'>
            <span className='text-[#364152]'>{t('the name')}</span>
            <span className='text-[#F04438]'>*</span>
          </p>
          <input
            type="text"
            name='title'
            value={formData?.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder={t("Write the guest's name")}
            className='w-full h-14 p-3 border border-[#C8C8C8] text-sm text-[#364152] rounded-[3px] outline-none transition-all duration-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/20'
          />
        </motion.div>

        {/* mobile number */}
        <motion.div
          className='w-full flex flex-col gap-1.5 mt-4'
          custom={1} variants={fieldVariants} initial="hidden" animate="visible"
        >
          <p className='text-sm font-medium mb-1.5'>
            <span className='text-[#364152]'>{t('Mobile number')}</span>
            <span className='text-[#F04438]'>*</span>
          </p>
          <input
            type="text"
            name='title'
            value={formData?.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            placeholder='xxxxxxxxxxx'
            className='w-full h-14 p-3 border border-[#C8C8C8] text-sm text-[#364152] rounded-[3px] outline-none transition-all duration-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/20'
          />
        </motion.div>

        {/* Number of guests */}
        <motion.div
          className="w-full flex flex-col gap-1.5 mt-4"
          custom={2} variants={fieldVariants} initial="hidden" animate="visible"
        >
          <p className="text-sm font-medium text-[#364152]">{t('Number of guests')}</p>
          <div className="h-14 px-3 flex items-center justify-between rounded-[3px] border border-[#EEF2F6] bg-[#F8FAFC]">
            <motion.button
              whileHover={{ scale: 1.08, transition: { duration: 0.15 } }}
              whileTap={{ scale: 0.93, transition: { duration: 0.1 } }}
              onClick={() => {
                const newGuests = guests + 1;
                setGuests(newGuests);
                setFormData((prev) => ({ ...prev, number_of_guests: newGuests }));
              }}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[3px] border border-[#E3E8EF] bg-white text-lg text-[#0F022E] transition-colors duration-200 hover:border-gray-300 hover:bg-gray-50"
            >
              +
            </motion.button>
            <div className="text-center">
              <p className="text-xl font-medium text-[var(--color-primary)]">{guests}</p>
              <p className="text-sm text-[#364152]">{t('Guests')}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.08, transition: { duration: 0.15 } }}
              whileTap={{ scale: 0.93, transition: { duration: 0.1 } }}
              onClick={() => {
                const newGuests = Math.max(1, guests - 1);
                setGuests(newGuests);
                setFormData((prev) => ({ ...prev, number_of_guests: newGuests }));
              }}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[3px] border border-[#E3E8EF] bg-white text-lg text-[#0F022E] transition-colors duration-200 hover:border-gray-300 hover:bg-gray-50"
            >
              -
            </motion.button>
          </div>
        </motion.div>

        {/* Favorite look */}
        <motion.div
          className='mt-4'
          custom={3} variants={fieldVariants} initial="hidden" animate="visible"
        >
          <p className='font-normal'>
            <span className='text-[#364152] text-base'>{t('Favorite look')}</span>{" "}
            <span className='text-[#697586] text-sm'>({t('optional')})</span>
          </p>
          <div className='grid grid-cols-2 gap-4 my-3'>
            {getViews?.data?.map((item) => (
              <motion.div
                key={item?.id}
                whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
                onClick={() => {
                  setFormData((prev) => ({ ...formData, favourite_view_id: item.id }))
                }}
                className={`py-2.5 px-2 flex justify-center items-center rounded-[3px] cursor-pointer transition-all duration-200
                  ${
                    formData.favourite_view_id === item.id
                      ? "bg-[#FFFDF5] border border-[var(--color-primary)]"
                      : "bg-white border border-[#D5D7DA] hover:border-gray-400 hover:bg-gray-50"
                  }`}
              >
                <p className='text-[#364152] text-base font-normal'>{item?.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* comments */}
        <motion.div
          className='flex flex-col gap-1.5 mt-4'
          custom={4} variants={fieldVariants} initial="hidden" animate="visible"
        >
          <p className='font-normal'>
            <span className='text-[#364152] text-base'>{t('comments')}</span>{' '}
            <span className='text-[#697586] text-sm'>({t('optional')})</span>
          </p>
          <div className="relative">
            <textarea
              value={formData?.notes}
              onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
              maxLength={100}
              placeholder={t('Write a brief comments')}
              className="w-full h-40 rounded-[3px] border border-[#CDD5DF] p-3 text-[#364152] outline-none resize-none transition-all duration-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/20"
            />
            <span className="absolute bottom-2 left-3 text-sm text-gray-400">
              {formData?.notes.length}/100
            </span>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default Form