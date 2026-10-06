"use client";
import React from 'react'
import { Dialog } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

function Complete_Data({setNationalId}) {
  const { t } = useTranslation();
  const router = useRouter();

  const handleCompleteData = () => {
    router.push('/Pages/dashboard/TemporaryDashboard/CompleteSignupData');
    setNationalId(true);
  };

  return (
    <>
    <Dialog
      open={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "ServicePage-dialog" }}
    >
      <section className="px-6 mt-6">
        <button
          onClick={() => setNationalId(true)}
          className="border border-[#CDD5DF] w-12 h-12 rounded-[100px] flex justify-center items-center cursor-pointer"
        >
          <img src="/images/icons/xx.svg" alt="" className="w-6 h-6" />
        </button>
    
      </section>
      <div className='flex flex-col items-center '>
        <p className='text-[#0F022E] text-xl font-semibold mt-12 mb-5.5'>{t('Please complete your details and subscribe before adding the service.')}</p>
      </div>
      <hr className='border border-[#E4E4E7] w-full  mb-6' />

      <div className='px-6 mb-6'>
        <button 
          onClick={handleCompleteData}
          className='flex justify-center  bg-primary text-white px-4 py-2.5 h-14 w-full rounded-3px cursor-pointer'>
          <p className='text-base flex items-center'>{t("Complete your data")} </p>
        </button>
      </div>
    </Dialog>
    </>
  )
}

export default Complete_Data