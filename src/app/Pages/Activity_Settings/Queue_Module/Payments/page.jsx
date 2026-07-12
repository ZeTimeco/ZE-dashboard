'use client'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Header from './Header'
import DepositSetup from './DepositSetup'
import PaymentSettings from './PaymentSettings'
import NoShowFees from './NoShowFees'
import { useDispatch, useSelector } from 'react-redux'
import { editPaymentSettingsThunk, getPaymentSettingsThunk } from '@/redux/slice/Setting/SettingSlice'


function PaymentsPage() {
  const {t} = useTranslation()
  //api
  const dispatch = useDispatch()
  const {getPaymentSettings} = useSelector((state)=>state.setting)
  useEffect(()=>{
    dispatch(getPaymentSettingsThunk())
  },[dispatch])

  const [formData , setFormData] = useState({
    'payment_mode':'',
    'deposit_value':'',
    'deposit_type':'',
    'apply_deposit_to_invoice':1,
    'no_show_fee_enabled':1,
  })

  useEffect(() => {
    if (getPaymentSettings) {
      setFormData({
        payment_mode: getPaymentSettings.payment_mode ?? "",
        deposit_value: getPaymentSettings.deposit_value ?? "",
        deposit_type: getPaymentSettings.deposit_type ?? "",
        apply_deposit_to_invoice: getPaymentSettings.apply_deposit_to_invoice ? 1 : 0,
        no_show_fee_enabled: getPaymentSettings.no_show_fee_enabled ? 1 : 0,
      });
    }
  }, [getPaymentSettings]);

  const [loading, setLoading] = useState(false);
  const handleSubmit = async ()=>{
    setLoading(true);
    try{
      await dispatch(editPaymentSettingsThunk(formData)).unwrap()
      await dispatch(getPaymentSettingsThunk())
      alert(t('Restaurant information updated successfully.'));
    }catch(error){
      console.log(error);
      alert(error?.message || "Something went wrong.");
    } finally {
        setLoading(false);
    }
  }


  return (
    <>
  <div className='border border-[#E3E8EF] mb-4'>
          <div>
            <Header/>
          </div>
    
          <div className='p-6 flex flex-col gap-4'>
            <PaymentSettings formData={formData} setFormData={setFormData}/>
            <DepositSetup formData={formData} setFormData={setFormData}/>
            <NoShowFees formData={formData} setFormData={setFormData}/>
        
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-[30%] h-14 rounded-[3px] text-white transition
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[var(--color-primary)] cursor-pointer"
              }`}
          >
            {loading ? t("Saving...") : t("Save changes")}
          </button>
          </div>
    
          
          
      </div>

    </>
  )
}

export default PaymentsPage