"use client"
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import BathroomCard from './BathroomCard'

function createBathroom() {
  return {
    id: Date.now() + Math.random(),
    open1: false,
    selected1: null,
    searchValue1: '',
    open2: false,
    selected2: null,
    searchValue2: '',
    images: [],
    previewImages: [],
    selectedFeature: null  
  };
}

function BathroomPage() {
  const { t } = useTranslation();
  const [bathrooms, setBathrooms] = useState([]);

  const addBathroom = () => {
    setBathrooms((prev) => [...prev, createBathroom()]);
  };

  const deleteBathroom = (id) => {
    setBathrooms((prev) => prev.filter((b) => b.id !== id));
  };

  const updateBathroom = (id, changes) => {
    setBathrooms((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...changes } : b))
    );
  };

  // allow add only if last bathroom is filled
  const lastBathroomFilled =
    bathrooms.length === 0 ||
    bathrooms[bathrooms.length - 1].selected1 !== null;

  return (
    <>
      <div className='mt-10'>
        <p className='flex gap-1'>
          <img src="/images/icons/bathtub-blue.svg" alt="" />
          <span className='text-[#364152] text-base font-medium'>{t('Bathroom information')}</span>
        </p>
        <p className='text-[#4B5565] text-sm font-normal mt-1'>{t('Add details of each bathroom and its type.')}</p>



        {/* Bathrooms list */}
        {bathrooms.map((bathroom) => (
          <BathroomCard
            key={bathroom.id}
            bathroom={bathroom}
            onUpdate={(changes) => updateBathroom(bathroom.id, changes)}
            onDelete={() => deleteBathroom(bathroom.id)}
          />
        ))}

        {/* Add bathroom button */}
        <button
          onClick={lastBathroomFilled ? addBathroom : undefined}
          className={`flex justify-center items-center gap-1 w-full h-14 py-2.5 px-4 border border-dashed border-[#CDD5DF] mt-6 rounded-[3px] ${
            lastBathroomFilled
              ? 'cursor-pointer'
              : 'cursor-not-allowed opacity-50'
          }`}
        >
          <p className='text-[#697586] text-base font-medium'>
            {t('Add bathroom')}
          </p>
          <img src="/images/icons/AddGrayIcon.svg" className="w-5 h-5" />
        </button>
      </div>
    </>
  );
}

export default BathroomPage;