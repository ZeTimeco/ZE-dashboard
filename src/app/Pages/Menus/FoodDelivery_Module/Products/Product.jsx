'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import DetailsPage from './Details/page';

function Product() {
  const {t} = useTranslation()
  const [open, setOpen] = useState(false);
    
  const [openDetails , setOpenDetails] = useState(false)

  return (
    <>

      <div className='my-8'>

        <div 
          className="shadow-[0_0_2px_0_rgba(0,0,0,0.20)] p-3 rounded-[3px]"
          >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <p className="bg-[#F4EAD0] text-[var(--color-primary)] text-xs w-5 h-5 rounded-full flex justify-center items-center">3</p>
              <p className="text-[#364152] text-lg font-medium">برجر</p>
              <p className="border border-[#F97066] bg-[#FEE4E2] rounded-full px-2 py-1 text-[#D92D20] text-xs font-normal"> 1 {t("Not available")} </p>            
            </div>

            <button
              onClick={() => setOpen(!open)}
              className="cursor-pointer transition-transform duration-300"
            >
              <img
                src="/images/icons/ArrowDown_gray.svg"
                alt=""
                className={`transition-transform duration-300 ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
          </div>

          {/* Dropdown */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-96 opacity-100 p-2 mt-4" : "max-h-0 opacity-0" }`}>            
            {/* items */}
            <div 
              onClick={()=>setOpenDetails(true)} 
              className="shadow-[0_0_2px_0_rgba(0,0,0,0.2)]  bg-white p-3 rounded-[3px] mb-4 cursor-pointer"
            >
              <div className='flex justify-between w-full'>
                <div className='flex gap-4  w-full'>
                  <p className='bg-[#F9F5E8] w-13.5 h-12 flex items-center justify-center rounded-[3px]'>
                    <img src="/images/burger.svg" alt="" />
                  </p>
                  <div>
                    <p className='text-[#364152] text-base font-normal'>برجر كلاسيك</p>
                    <p className='text-[var(--color-primary)] text-base font-semibold'>350 جنية</p>
                  </div>
                </div>

                <div className=' w-full flex flex-col items-end gap-2  '>
                  <p className="border border-[#067647] bg-[#DCFAE6]  rounded-full h-7 w-15 flex justify-center items-center  text-[#067647] text-xs font-normal">  {t("available")}  </p>
                  <p className='text-[#4B5565] text-xs font-normal'>ظاهر للعملاء</p>
                </div>
              </div>
            </div>

            

          </div>
        </div>

      </div>


      <DetailsPage
        open={openDetails}
        setOpen={setOpenDetails}
      />
      
    </>
  )
}

export default Product