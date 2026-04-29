"use client"
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import BookingTypePage from './BookingType/page';
import SpecialPricesPage from './SpecialPrices/page';
import { useDispatch, useSelector } from 'react-redux';
import { addAvailabilitySeasonsThunk } from '@/redux/slice/Services/ServicesSlice';

function AvailabilityPage({prevStep , nextStep }) {
  const {t} = useTranslation();

  const dispatch = useDispatch();
  const {addBasicProperty} = useSelector((state) => (state.services));


  const [formData, setFormData] = useState({
    property_id: "",
    availability: {
      all_avalable: false,
      slots: [
        {
          from: "",
          to: "",
          status: ""
        }
      ]
    },
    seasonal_pricing: [
      {
        title: "",
        start_date: "",
        end_date: "",
        price: ""
      }
    ]
  })

  useEffect(() => {
    const storedPropertyId = sessionStorage.getItem("property_id");
    const propertyId = addBasicProperty?.data?.id || storedPropertyId;

    if (propertyId) {
      if (!storedPropertyId) {
        sessionStorage.setItem("property_id", propertyId);
      }
      setFormData((prevData) => ({
        ...prevData,
        property_id: propertyId,
      }));
    }
      console.log('id' , propertyId);

  }, [addBasicProperty]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("property_id", formData.property_id || "");
      data.append("availability[all_avalable]", formData.availability.all_avalable ? 1 : 0);

      formData.availability.slots.forEach((slot, index) => {
        data.append(`availability[slots][${index}][from]`, slot.from);
        data.append(`availability[slots][${index}][to]`, slot.to);
        data.append(`availability[slots][${index}][status]`, slot.status);
      });

      formData.seasonal_pricing.forEach((item, index) => {
        data.append(`seasonal_pricing[${index}][title]`, item.title);
        data.append(`seasonal_pricing[${index}][start_date]`, item.start_date);
        data.append(`seasonal_pricing[${index}][end_date]`, item.end_date);
        data.append(`seasonal_pricing[${index}][price]`, item.price);
      });

      await dispatch(addAvailabilitySeasonsThunk(data)).unwrap();
      nextStep();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className='border border-[#E6E6E6] p-8 rounded-[3px]'>
        <div>
          <p className='text-[#364152] text-xl font-medium mb-3'>
            <span>{t('Step')} 7 :</span>
            <span>{t('Availability')}</span>
          </p>
          <p className='text-[#697586] text-base font-normal'>{t('Enter availability details to begin adding them')}</p>
          <div className='border border-[#CDD5DF] my-4'></div>
        </div>




        <BookingTypePage    formData={formData} setFormData={setFormData} />
        <SpecialPricesPage  formData={formData} setFormData={setFormData} />


      {/* btn */}
      <div className="flex justify-between mt-6">
        <div className='w-full '>
          <button
            onClick={prevStep}
            className=" w-[25%] h-15 border border-[#697586] text-[#697586] rounded-[3px] cursor-pointer"
          >
            {t('the previous')}
          </button>
        </div>
        
        <div className='flex gap-2 justify-end w-full '>
          <button
            className="h-15 w-[30%]  border border-[#697586] text-[#697586] rounded-[3px] cursor-pointer"
          >
            {t('Save draft')}
          </button>

          <button
            onClick={handleSubmit}
            className="h-15 w-[25%] bg-[var(--color-primary)] text-white rounded-[3px] cursor-pointer"
          >
            {t('the next')}
          </button>
        </div>
        
      </div>
    </div>
    </>
  )
}

export default AvailabilityPage