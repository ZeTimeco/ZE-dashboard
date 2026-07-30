'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import DetailsPage from './Details/page';
import { IMAGE_BASE_URL } from '../../../../../../config/imageUrl';
import { useSearchParams } from 'next/navigation';

function Product({getMenus}) {
  const {t} = useTranslation()
  const searchParams = useSearchParams()
  const search = searchParams.get('search') || ''
  
  const [open, setOpen] = useState(false);
    
  const [openDetails , setOpenDetails] = useState(false)

const [selectedProductId, setSelectedProductId] = useState(null);
  
  return (
    <>

        {getMenus?.categories?.map((category)=>{
          const isCategoryOpen = open === category.id || (search && category?.items?.length > 0)

          return (
            <div 
              key={category?.id}
              className="shadow-[0_0_2px_0_rgba(0,0,0,0.20)] p-3 rounded-[3px]"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex gap-4 items-center">
                  <p className="bg-[#F4EAD0] text-[var(--color-primary)] text-xs w-5 h-5 rounded-full flex justify-center items-center">{category?.items_count}</p>
                  <p className="text-[#364152] text-lg font-medium">{category?.name}</p>
                  {category?.unavailable_count === 0 ? null :(
                    <p className="border border-[#F97066] bg-[#FEE4E2] rounded-full px-2 py-1 text-[#D92D20] text-xs font-normal"> {category?.unavailable_count} {t("Not available")} </p>            
                  )}
                </div>

                <button
                  onClick={() => setOpen(isCategoryOpen ? null : category.id)}
                  className="cursor-pointer transition-transform duration-300"
                >
                  <img
                    src="/images/icons/ArrowDown_gray.svg"
                    alt=""
                    className={`transition-transform duration-300 ${
                      isCategoryOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
              </div>

              {/* Dropdown */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out 
                ${isCategoryOpen ? "max-h-[1000px] opacity-100 p-2 mt-4" : "max-h-0 opacity-0" }`}
              >            
              {/* items */}
              {category?.items?.map((item)=>(
                <div 
                  key={item?.id}
                  onClick={() => {
                    setSelectedProductId(item.id);
                    setOpenDetails(true);
                  }}
                  className="shadow-[0_0_2px_0_rgba(0,0,0,0.2)]  bg-white p-3 rounded-[3px] mb-4 cursor-pointer"
                >
                  <div className='flex justify-between w-full'>
                    <div className='flex gap-4  w-full'>
                      
                      <p className='bg-[#F9F5E8] w-13.5 h-12 flex items-center justify-center rounded-[3px]'>
                        {item?.image === null ? (
                          <img src="/images/burger.svg" alt="" />
                        ):(
                          <img src={`${IMAGE_BASE_URL}${item?.image}`}  className='w-10 h-10'/>
                        )}
                        
                      </p>
                      <div>
                        <p className='text-[#364152] text-base font-normal'> {item?.name}</p>
                        <p className='text-[var(--color-primary)] text-base font-semibold'>{item?.base_price} {t('pound')}</p>
                      </div>
                    </div>

                    <div className=' w-full flex flex-col items-end gap-2  '>
                      {item?.status === 'active' ? (
                        <p className="border border-[#067647] bg-[#DCFAE6]  rounded-full h-7 w-15 flex justify-center items-center  text-[#067647] text-xs font-normal">  
                          {t("available")} 
                        </p>
                      ):(
                        <p className="border border-[#F97066] bg-[#FEE4E2]  rounded-full h-7 w-15 flex justify-center items-center  text-[#D92D20] text-xs font-normal">  
                          {t("Not available")} 
                        </p>
                      )}
                      
                      <p className='text-[#4B5565] text-xs font-normal'> {item?.is_visible ? t('visible to customers') : null}</p>
                    </div>
                  </div>
                </div>
              ))}
            

              
            </div>
          </div>
        )})}
        



      <DetailsPage
        open={openDetails}
        setOpen={setOpenDetails}
        itemId={selectedProductId}
      />
      
    </>
  )
}

export default Product