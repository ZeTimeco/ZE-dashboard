'use client'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Header from './Header'
import DepositSetup from './DepositSetup'
import PaymentSettings from './PaymentSettings'
import NoShowFees from './NoShowFees'
import { useDispatch, useSelector } from 'react-redux'
import { editPaymentSettingsThunk, editPaymentTrueSettingsThunk, getPaymentSettingsThunk, getPaymentTrueSettingsThunk } from '@/redux/slice/Setting/SettingSlice'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

function PaymentsPage() {
  const {t} = useTranslation()
  //api
  const dispatch = useDispatch()
  const {getPaymentTrueSettings} = useSelector((state)=>state.setting)
  useEffect(()=>{
    dispatch(getPaymentTrueSettingsThunk())
  },[dispatch])

  const [formData , setFormData] = useState({
    'payment_mode':'',
    'deposit_value':'',
    'deposit_type':'',
    'apply_deposit_to_invoice':1,
    'no_show_fee_enabled':1,
  })

  useEffect(() => {
    if (getPaymentTrueSettings) {
      setFormData({
        payment_mode: getPaymentTrueSettings.payment_mode ?? "",
        deposit_value: getPaymentTrueSettings.deposit_value ?? "",
        deposit_type: getPaymentTrueSettings.deposit_type ?? "",
        apply_deposit_to_invoice: getPaymentTrueSettings.apply_deposit_to_invoice ? 1 : 0,
        no_show_fee_enabled: getPaymentTrueSettings.no_show_fee_enabled ? 1 : 0,
      });
    }
  }, [getPaymentTrueSettings]);

  const [loading, setLoading] = useState(false);
  const handleSubmit = async ()=>{
    setLoading(true);
    try{
      await dispatch(editPaymentTrueSettingsThunk(formData)).unwrap()
      await dispatch(getPaymentTrueSettingsThunk())
      toast.success(t('Restaurant information updated successfully.'));
    }catch(error){
      console.log(error);
      toast.error(error?.message || t("Something went wrong."));
    } finally {
        setLoading(false);
    }
  }


  return (
    <>
      <div className='border border-[#E3E8EF] mb-4 rounded-[3px] bg-white shadow-2xs'>
        <div>
          <Header/>
        </div>
  
        <div className='p-6 flex flex-col gap-4'>
          <PaymentSettings formData={formData} setFormData={setFormData}/>
          <DepositSetup formData={formData} setFormData={setFormData}/>
          <NoShowFees formData={formData} setFormData={setFormData}/>
      
          <motion.button
            whileHover={!loading ? { scale: 1.01 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
            onClick={handleSubmit}
            disabled={loading}
            className={`w-[30%] h-14 rounded-[3px] text-white transition-all duration-200
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[var(--color-primary)] hover:opacity-95 hover:shadow-md cursor-pointer"
              }`}
          >
            {loading ? t("Saving...") : t("Save changes")}
          </motion.button>
        </div>
      </div>
    </>
  )
}

export default PaymentsPage