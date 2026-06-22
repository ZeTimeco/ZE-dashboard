'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

function Form({getViews, formData ,setFormData}) {
  const {t} = useTranslation();
  const [guests, setGuests] = useState(1);
  const [description, setDescription] = useState('');

  const [selectedView, setSelectedView] = useState(null);

  console.log(formData);
  return (
    <>
    <div className='p-6'>
      {/*the name  */}
      <div className='w-full flex flex-col gap-1.5'>
        <p className='text-sm font-medium mb-1.5'>
          <span className='text-[#364152] '>{t('the name')}</span>
          <span className=' text-[#F04438]'>*</span>
        </p>  
        <input 
          type="text"
          name='title'
          value={formData?.name}
          onChange={(e)=>setFormData({...formData , name:e.target.value})}
          placeholder={t("Write the guest's name")}
          className={`w-full h-14  p-3 border border-[#C8C8C8]  text-sm text-[#364152]  rounded-[3px] outline-none `}
        />
      </div>


      {/*mobile number  */}
      <div className='w-full flex flex-col gap-1.5 mt-4'>
      
        <p className='text-sm font-medium mb-1.5'>
          <span className='text-[#364152] '>{t('Mobile number')}</span>
          <span className=' text-[#F04438]'>*</span>
        </p>
        <input 
          type="text"
          name='title'
          value={formData?.phone}
          onChange={(e)=>setFormData({...formData , phone:e.target.value})}
          placeholder='xxxxxxxxxxx'
          className={`w-full h-14  p-3 border border-[#C8C8C8]  text-sm text-[#364152]  rounded-[3px] outline-none `}
        />
      </div>

      {/*=========== Number of guests =============*/}
      <div className="w-full flex flex-col gap-1.5 mt-4">
        <p className="text-sm font-medium text-[#364152]">
          {t('Number of guests')}
        </p>

        <div className="h-14 px-3 flex items-center justify-between rounded-[3px] border border-[#EEF2F6] bg-[#F8FAFC]">

        <button
          onClick={() => {
            const newGuests = guests + 1;
            setGuests(newGuests);

            setFormData((prev) => ({
              ...prev,
              number_of_guests: newGuests,
            }));
          }}

            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[3px] border border-[#E3E8EF] bg-white text-lg text-[#0F022E]"
          >
            +
          </button>

          <div className="text-center">
            <p className="text-xl font-medium text-[var(--color-primary)]">
              {guests}
            </p>
            <p className="text-sm text-[#364152]">{t('Guests')}</p>
          </div>

          <button
            onClick={() => {
              const newGuests = Math.max(1, guests - 1);
              setGuests(newGuests);

              setFormData((prev) => ({
                ...prev,
                number_of_guests: newGuests,
              }));
            }}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[3px] border border-[#E3E8EF] bg-white text-lg text-[#0F022E]"
          >
            -
          </button>

        </div>
      </div>

      {/*Favorite look  */}
      <div className='mt-4'>
        <p className='font-normal'>
          <span className='text-[#364152] text-base'>{t('Favorite look')}</span>{" "}
          <span className='text-[#697586] text-sm'>({t('optional')})</span>
        </p>

        <div className='grid grid-cols-2 gap-4 my-3'>
          {getViews?.data?.map((item) => (
            <div
              key={item?.id}
              onClick={() => {
                setFormData((prev)=>({
                  ...formData , 
                  favourite_view_id : item.id
                }))

              }}
              className={`py-2.5 px-2 flex justify-center items-center rounded-[3px] cursor-pointer transition-all
                ${
                    formData.favourite_view_id === item.id
                    ? "bg-[#FFFDF5] border border-[var(--color-primary)]"
                    : "bg-white border border-[#D5D7DA]"
                }`}
            >
              <p className='text-[#364152] text-base font-normal'>
                {item?.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* comments */}
      <div className='flex flex-col gap-1.5 mt-4'>
        <p className=' font-normal'>
          <span className='text-[#364152] text-base'>{t('comments')}</span> {' '}
          <span className='text-[#697586] text-sm'>({t('optional')})</span>
        </p>

        <div className="relative">
          <textarea
            value={formData?.notes}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                notes: e.target.value,
              }))
            }
            maxLength={100}
            placeholder={t('Write a brief comments')}
            className="w-full h-40 rounded-[3px] border border-[#CDD5DF] p-3 text-[#364152] outline-none resize-none"
          />

          <span className="absolute bottom-2 left-3 text-sm text-gray-400">
            {formData?.notes.length}/100
          </span>
        </div>

      </div>


    </div>

    </>
  )
}

export default Form