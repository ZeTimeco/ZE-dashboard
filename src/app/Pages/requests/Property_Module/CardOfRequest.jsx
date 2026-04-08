"use client"
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import ViewsPage from './Views/page';

function CardOfRequest() {
  const {t} = useTranslation()

  const [openView , setOpenView] = useState(false)

  const status = "confirmed"
  const StatusRender = (status) => {
    switch (status) {
      case "confirmed": //مقبوله
        return (
          <div className=' bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit  h-9.5 rounded-3xl'>
          <div className='py-1.5 px-3 flex gap-1'>
            <img src="/images/icons/Active Status.svg" alt="" className=' mt-1' />
            <span className=''>{t('Acceptable')}</span>
          </div>
        </div>
        );
      case "completed"://مكتملة
        return (
          <div className=' bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit  h-9.5 rounded-3xl'>
          <div className='py-1.5 px-3 flex gap-1'>
            <img src="/images/icons/Active Status.svg" alt="" className=' mt-1' />
            <span className=''>{t('Complete')}</span>
          </div>
        </div>
        );
      case "pending": //قيد الانتظار          
        return (
          <div className=' bg-[#FFFAEB] border  border-[#F79009] text-[#DC6803] w-fit h-9.5 rounded-3xl'>
            <div className='py-1.5 px-3 flex gap-1'>
              <img src="/images/icons/pending Status.svg" alt=""className=' mt-1' />
              <span className=''>{t('Pending')}</span>
            </div>
          </div>
        );
      case "checked_in": // تم الوصول 
        return (
          <div className=' bg-[#E3E8EF] border border-[#697586] text-[#4B5565] w-fit h-9.5 rounded-3xl'>
            <div className='py-1.5 px-3 flex gap-1'>
              <img src="/images/icons/on_going Status.svg" alt="" className=' mt-1' />
              <span className=''>{t('checked_in')}</span>
            </div>
          </div>
        );
      case "not_attend": // لم يحضر
        return (
          <div className=' bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit h-9.5 rounded-3xl'>
            <div className='py-1.5 px-3 flex gap-1'>
              <img src="/images/icons/refused Status.svg" alt="" className=' mt-1'/>
              <span className=''>{t('not_attend')}</span>
            </div>
          </div>
        );
      case "cancelled": // ملغيه
        return (
          <div className=' bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit  rounded-3xl'>
            <div className='py-1.5 px-3 flex gap-1'>
              <img src="/images/icons/refused Status.svg" alt="" className=' mt-1' />
              <span className='text-xs font-normal flex items-center'>{t('cancelled')}</span>
            </div>
          </div>
        );
      }
  };

  return (
    <>
      <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.30)] mt-6 p-4'>
        {/*  */}
        <div className='flex justify-between '>
          {/* name */}
          <div className='flex gap-3'>
            <p className='bg-[#007AFF] text-white text-sm w-11 h-11 flex justify-center items-center rounded-full'>s</p>
            <p className='text-[#364152] text-sm font-medium flex items-center'>أسم العميل</p>
          </div>
          {/* status */}
          <div className='flex items-center'>{StatusRender(status)}</div>
        </div>

        {/*  */}
        <div className='flex justify-between mt-6'>
          <div className='flex flex-col gap-1'>
            <p className='text-[#364152] text-base font-normal'>فيلا الروابي الفاخرة</p>
            <p className='text-[#697586] text-sm font-normal'>جدة, حي الشاطي</p>
          </div>
          <p className='text-[#4B5565] text-base font-normal'>BK-368955</p>
        </div>

        {/*  */}
        <div className='grid grid-cols-2 gap-4 my-4'>
          <div className='flex flex-col font-normal'>
            <p className='text-[#364152] text-base '>{t('Arrival date')}:</p>
            <p className='text-[#697586] text-sm '>15 ديسمبر 2026</p>
          </div>

          <div className='flex flex-col font-normal'>
            <p className='text-[#364152] text-base '>{t('Departure date')}:</p>
            <p className='text-[#697586] text-sm '>15 ديسمبر 2026</p>
          </div>

          <div className='flex flex-col font-normal'>
            <p className='text-[#364152] text-base '>{t('Guests')}:</p>
            <p className='text-[#697586] text-sm '>15 ديسمبر 2026</p>
          </div>

          <div className='flex flex-col font-normal '>
            <p className='text-[#364152] text-base '>{t('amount')}:</p>
            <p className='text-[var(--color-primary)] text-sm '>200.00 جنية</p>
          </div>
        </div>

        <div className='flex gap-8 text-base font-normal'>
          <p className='text-[#364152] '>{t('Expected customer arrival time')}:</p>
            <p className='text-[#697586]'>12:00 مساًء</p>
        </div>
        <div className='bg-[#E3E8EF] h-0.5 my-2'></div>

        <div className='flex justify-between'>
          <button 
            onClick={()=>{setOpenView(true)}}
            className='bg-[var(--color-primary)] text-white h-14 w-[70%] rounded-[3px] cursor-pointer'
          >
            {t('Details')}
          </button>
          <div className='flex items-center'>
            <p className='border border-[var(--color-primary)] w-10 h-10 flex items-center justify-center rounded-full cursor-pointer'>
              <img src="/images/icons/chat_yellow.svg" alt="" />
            </p>
          </div>
          
        </div>
        
      </div>


      <ViewsPage open={openView} setOpen={setOpenView}/>
    </>
  )
}

export default CardOfRequest