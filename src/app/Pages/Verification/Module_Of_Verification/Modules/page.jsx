'use client'

import MainLayout from '@/app/Components/MainLayout/MainLayout'
import { useTranslation } from 'react-i18next'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { getBussinessModuleThunk, getBusinessModuleRequirementsThunk } from '@/redux/slice/Auth/AuthSlice'
import HiddenItemsLayout from '@/app/Components/MainLayout/HiddenItemsLayout'

function ModulesPage() {
  const { t } = useTranslation('')
  //api
  const dispatch = useDispatch()
  const {getBussinessModule} = useSelector((state)=>state.auth)
  useEffect(()=>{
    dispatch(getBussinessModuleThunk())
  },[dispatch])

  // console.log('getBussinessModule' , getBussinessModule);


  const [selectedModule, setSelectedModule] = useState(null)
  const router = useRouter()

  const inputClassName ="w-5 h-5 appearance-none border rounded-full border-gray-300 bg-white checked:border-[var(--color-primary)] relative cursor-pointer checked:after:content-[''] checked:after:w-2.5 checked:after:h-2.5 checked:after:bg-[var(--color-primary)] checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"

  const moduleStyle = [
    {
      id: 1,
      bgColor: 'bg-[#FDF7E8]',
      name: 'خدمات الطريق',
      price: 150,
      icon: '/images/icons/car_primary.svg',
    },
    {
      id: 2,
      bgColor: 'bg-[#FAF5FF]',
      name: 'خدمات السيارات',
      price: 150,
      icon: '/images/icons/car-purple.svg',
    },
    {
      id: 3,
      bgColor: 'bg-[#EEF2FF]',
      name: 'تأجير منازل',
      price: 150,
      icon: '/images/icons/key-blue.svg',
    },
    {
      id: 4,
      bgColor: 'bg-[#ECFDF5]',
      name: 'خدمات التوصيل',
      price: 150,
      icon: '/images/icons/square-green.svg',
    },
    {
      id: 5,
      bgColor: 'bg-[#F0F9FF]',
      name: 'خدمات منزلية',
      price: 150,
      icon: '/images/icons/home_blue.svg',
    },
    {
      id: 6,
      bgColor: 'bg-[#F0FDFA]',
      name: 'حجز مطاعم',
      price: 150,
      icon: '/images/icons/Dining green.svg',
    },
  ]

  const handleModuleChange = (item) => {
    const isCurrentlySelected = selectedModule === item.id;
    const newSelected = isCurrentlySelected ? null : item.id;
    setSelectedModule(newSelected);

    if (!isCurrentlySelected && item?.module_key) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('selected_module_key', item.module_key);
      }
      dispatch(getBusinessModuleRequirementsThunk(item.module_key));
    }
  };

  const handleNext = () => {
    const selectedItem = getBussinessModule?.find((item) => item.id === selectedModule);
    const key = selectedItem?.module_key || (typeof window !== 'undefined' ? localStorage.getItem('selected_module_key') : null);
    if (key) {
      router.push(`/Pages/Verification/Account_Verification?module_key=${key}`);
    } else {
      router.push('/Pages/Verification/Account_Verification');
    }
  };

  return (
    <HiddenItemsLayout>
      <div className="flex flex-col gap-1">
        <h1 className="text-[#171717] text-2xl font-semibold">
          {t('Choose your business')}
        </h1>

        <p className="text-[#737373] text-base font-medium">
          {t(
            'This option verifies your business type to properly activate your account.'
          )}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-15">
        {getBussinessModule?.map((item) => {
          const module = moduleStyle.find(
            (module) => module.id === item.id
          );

          if (!module) return null;

          const isChecked = selectedModule === item.id;

          return (
            <div
              key={item.id}
              onClick={() => handleModuleChange(item)}
              className={`border rounded-3px p-3.5 flex justify-between transition-colors duration-200 cursor-pointer ${
                isChecked ? "border-primary" : "border-[#E5E5E5]"
              }`}
            >
              <div className="flex gap-4">
                <div className="flex items-center">
                  <div
                    className={`w-11 h-11 ${module.bgColor} rounded-xl flex justify-center items-center`}
                  >
                    <img src={module.icon} alt="" />
                  </div>
                </div>

                <div className="flex flex-col">
                  <h1 className="text-[#171717] text-lg font-normal">
                    {item.name}
                  </h1>

                  <p className="text-[#737373] text-base font-medium">
                    {t("amount")} : {module.price}$
                  </p>
                </div>
              </div>

              <div className="flex justify-center items-center">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleModuleChange(item)}
                  onClick={(e) => e.stopPropagation()}
                  className={inputClassName}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* btn */}
      <div className="mt-8 flex gap-4  pt-6">
        <button
          type="button"
          onClick={handleNext}
          className="rounded-3px  w-[20%] h-14  bg-primary px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#AD850F] cursor-pointer"
        >
          التالي
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-3px w-[20%] h-14 border border-gray-300 px-6 py-3 text-sm text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
        >
          الرجوع
        </button>
      </div>
    </HiddenItemsLayout>
  )
}

export default ModulesPage
