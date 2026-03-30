"use client"
import SearchForm from '@/app/Components/Forms/SearchForm'
import { Dialog } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

function LocationPage({openLocation , setOpenLocation ,setOpenMainFilter}) {
  const {t} = useTranslation()
  const [selectedLocations, setSelectedLocations] = useState([])

  const toggleLocation = (id) => {
    if (selectedLocations.includes(id)) {
      setSelectedLocations(selectedLocations.filter(locId => locId !== id))
    } else {
      setSelectedLocations([...selectedLocations, id])
    }
  }
  return (
    <>
    <Dialog
      open={openLocation}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "property-dialog" }}
    >

      <section className="flex px-6 mt-6 mb-4">
        <button
          onClick={() => {
            setOpenLocation(false);
            setOpenMainFilter(true);
          }}
        >
          <img src="/images/icons/arrow-right-black.svg" alt="" className="w-6 h-6" />
        </button>

        <p className="text-[#364152] text-2xl w-full flex justify-center items-center">
          {t('Choose the city')}
        </p>
      </section>

      <section className='px-6 mb-6 '>
        <SearchForm  placeholderKey="Searching for the city"  width="100%"/>
      </section>

      <section className='flex flex-col px-6 mb-6 '>
        <p className='text-[#364152] text-base font-normal mb-3'>
          {t('Last cities')}
        </p>
        {/* Show selected location */}
        <div className='flex gap-3'>
          <div className='flex gap-1.5 border border-[#E2E2E2] bg-[#EDE7FD] w-fit px-3 py-1 h-9 rounded-[999px]'>
            <p className='text-[#505050] text-sm flex items-center'>عباسية</p>
            <p className='flex items-center '>
              <img src="/images/icons/xx.svg" alt="" className="w-4 h-4 cursor-pointer" />
            </p>
          </div>
        </div>
      </section>

      <section className='px-6 mb-6'>
        <p className='text-[#364152] text-base font-normal mb-4'>{t('All cities')}</p>

        <div 
          className={` p-4 cursor-pointer relative transition-colors ${selectedLocations.includes(1) ? 'bg-[#eff6ef]' : ''}`}
          onClick={() => toggleLocation(1)}
        >
          <div className='flex gap-3 items-center'>
            <p className='bg-[#DBEAFE] w-8 h-8 rounded-full flex justify-center items-center'>
              <img src="/images/icons/location-bluee.svg" className="w-4 h-4" />
            </p>

            <p className='flex flex-col gap-0.5'>
              <span className={`text-base font-normal`}>القاهرة الجديدة</span>
              <span className={`text-sm font-normal `}>مدينة نصر , صلاح سالم</span>
            </p>
          </div>
          {selectedLocations.includes(1) && (
            <div className='absolute top-7 left-4'>
              <img src="/images/icons/true_circle _blue.svg" alt="" className="w-5 h-5" />
            </div>
          )}
        </div>
      </section>

    </Dialog>

    </>
  )
}

export default LocationPage