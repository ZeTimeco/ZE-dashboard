'use client'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Switch from '@mui/material/Switch'
import { styled } from '@mui/material/styles'
import { motion, AnimatePresence } from 'framer-motion'
import AddFuel from './Dialogs/AddFuel'
import UpdateFuel from './Dialogs/UpdateFuel'
import { useDispatch, useSelector } from 'react-redux'
import { getFuelPricesThunk, getStreetServiceByIdThunk, streetAssistantStatusThunk, updateServiceSettingStatusThunk, updateServiceSettingThunk } from '@/redux/slice/Services/ServicesSlice'

function ContentPage() {
  const {t} = useTranslation()

  const dispatch = useDispatch()
  const { streetServices, fuelPrice, loadingList, mainStatus: reduxMainStatus } = useSelector((state) => state.services)
  const fuel = fuelPrice?.data
  const batteryReviveService = streetServices?.find(service => service.id === 39)
  
  const [mainStatus, setMainStatus] = useState(false)
  const [serviceStatus, setServiceStatus] = useState(false)
  const [price, setPrice] = useState('')
  const [isDayOnly, setIsDayOnly] = useState(0)
  const [openContent, setOpenContent] = useState(false)
  const [openAddFuel, setOpenAddFuel] = useState(false)
  const [openUpdateFuel, setOpenUpdateFuel] = useState(false)
  const [selectedFuel, setSelectedFuel] = useState(null)

  useEffect(() => { dispatch(getStreetServiceByIdThunk()); dispatch(getFuelPricesThunk()) }, [dispatch])

  useEffect(() => {
    if (batteryReviveService?.settings) {
      setServiceStatus(batteryReviveService.settings.status === 1)
      setPrice(batteryReviveService.settings.price || '')
      setIsDayOnly(batteryReviveService.settings.is_day_only)
    }
  }, [batteryReviveService])

  useEffect(() => {
    if (reduxMainStatus !== null && reduxMainStatus !== undefined) {
      setMainStatus(reduxMainStatus === 1)
    }
  }, [reduxMainStatus])

  const handleSave = () => {
    if (!batteryReviveService?.settings?.id) return;
    const data = { service_setting_id: batteryReviveService.settings.id, price: price, is_day_only: isDayOnly }
    dispatch(updateServiceSettingThunk(data))
      .unwrap()
      .then(() => { dispatch(getStreetServiceByIdThunk()) })
      .catch((error) => { console.error("Failed to update settings:", error) })
  }

  const handleStatusChange = (e) => {
    const newStatus = e.target.checked;
    setServiceStatus(newStatus);
    if (!batteryReviveService?.settings?.id) return;
    const data = { service_setting_id: batteryReviveService.settings.id, status: newStatus ? 1 : 0 }
    dispatch(updateServiceSettingStatusThunk(data))
      .unwrap()
      .then(() => { dispatch(getStreetServiceByIdThunk()) })
      .catch((error) => { console.error("Failed to update status:", error); setServiceStatus(!newStatus); })
  }

  const handleMainStatusChange = (e) => {
    const newStatus = e.target.checked;
    setMainStatus(newStatus);
    const formData = new FormData();
    formData.append('street_assistant_status', newStatus ? 1 : 0);
    dispatch(streetAssistantStatusThunk(formData))
      .unwrap()
      .then(() => { console.log("Street assistant status updated successfully") })
      .catch((error) => { console.error("Failed to update main status:", error); setMainStatus(!newStatus); })
  }

  const GreenSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 53, height: 24, padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0, margin: 3, transitionDuration: '500ms',
      '&.Mui-checked': {
        transform: 'translateX(31px)', color: '#fff',
        '& + .MuiSwitch-track': { backgroundColor: '#10B981', opacity: 1, border: 0 },
        '&.Mui-disabled + .MuiSwitch-track': { opacity: 0.5 },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': { color: '#33cf4d', border: '6px solid #fff' },
      '&.Mui-disabled .MuiSwitch-thumb': { color: theme.palette.grey[100] },
    },
    '& .MuiSwitch-thumb': { boxSizing: 'border-box', width: 18, height: 18 },
    '& .MuiSwitch-track': {
      borderRadius: 24 / 2, backgroundColor: '#E9E9EA', opacity: 1,
      transition: theme.transitions.create(['background-color'], { duration: 500 }),
    },
  }));

  if (loadingList) {
    return (
      <div className='p-6 flex items-center justify-center'>
        <p className='text-[#4B5565]'>{t('Loading...')}</p>
      </div>
    )
  }

  return (
    <>
      <motion.div
        className='p-6'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        <p className='hidden'>{batteryReviveService?.settings?.id}</p>
        <div className='border border-[#CDD5DF] p-6'>

          <div className='flex justify-between items-center px-6 py-4 mb-8 border border-[#CDD5DF] rounded-[3px] transition-shadow duration-200 hover:shadow-sm'>
            <p className='text-[#4B5565] text-base font-normal '>{t('Activation of all services')}</p>
            <GreenSwitch checked={mainStatus} onChange={handleMainStatusChange} />
          </div>

          <div className='flex gap-3 w-full mb-6'>
            <section className='border border-[#CDD5DF] rounded-[3px] p-4 w-full transition-shadow duration-200 hover:shadow-md'>
              <div className='flex items-center gap-3'>
                <p className='w-10 h-10 bg-[#EDE7FD] flex items-center justify-center rounded-[3px]'>
                  <img src="/images/icons/cash.svg" alt="" />
                </p>
                <p className='text-[#4B5565] text-base font-normal'>{t('Total profits')}</p>
              </div>
              <div className='py-2.5'>
                <p className='text-[#202939] text-lg font-medium'>{batteryReviveService?.bookings_sum || 0}</p>
              </div>
            </section>

            <section className='border border-[#CDD5DF] rounded-[3px] p-4 w-full transition-shadow duration-200 hover:shadow-md'>
              <div className='flex items-center gap-3'>
                <p className='w-10 h-10 bg-[#FEF0C7] flex items-center justify-center rounded-[3px]'>
                  <img src="/images/icons/Invoice_Orange.svg" alt="" />
                </p>
                <p className='text-[#4B5565] text-base font-normal'>{t('Number of requests')}</p>
              </div>
              <div className='py-2.5'>
                <p className='text-[#202939] text-lg font-medium'>
                  <span>{batteryReviveService?.bookings_count || 0}</span>
                  <span>{t('Requests')}</span>
                </p>
              </div>
            </section>
          </div>

          <div className='border border-[#CDD5DF] p-6'>
            <div className='flex gap-4 mb-6'>
              <p className='text-[#4B5565] text-base font-normal '>{t('Activate the service')}</p>
              <GreenSwitch checked={serviceStatus} onChange={handleStatusChange} />
            </div>

            <div className='flex flex-col gap-1.5 mb-4'>
              <label className="text-[#364152] text-sm font-normal">{t('Price per kilometer')}</label>
              <input
                type="text"
                placeholder={t('Enter the price')}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className='border border-[#C8C8C8] w-full h-14 px-3 outline-none transition-colors duration-200 focus:border-[var(--color-primary)]'
              />
            </div>

            {/* Fuel types accordion */}
            <div className='border border-[#CDD5DF] p-3 mb-4'>
              <div className='flex justify-between'>
                <p className='flex gap-2 w-full'>
                  <img src="/images/icons/fuel_Yellow.svg" alt="" />
                  <span className='text-[#0F022E] text-base font-normal'>{t('Types of fuel')}</span>
                </p>
                <button
                  className='flex items-center cursor-pointer transition-transform duration-200 hover:scale-110'
                  onClick={() => setOpenContent(!openContent)}
                >
                  <img src={openContent ? "/images/icons/ArrowUp.svg" : "/images/icons/ArrowDown.svg"} alt="" />
                </button>
              </div>

              <AnimatePresence initial={false}>
                {openContent && (
                  <motion.div
                    key="fuel-content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                    className="py-4"
                  >
                    {fuel?.map((fuelItem) => (
                      <div
                        key={fuelItem?.id}
                        className='flex justify-between py-3 px-2 mb-3 border border-[#CDD5DF] transition-shadow duration-150 hover:shadow-sm'
                      >
                        <div className='flex gap-9'>
                          <div className='flex gap-2'>
                            {fuelItem?.is_active ? (
                              <img src="/images/icons/True_RounedCheck.svg" alt="" className='w-4.5 h-4.5' />
                            ) : (
                              <img src="/images/icons/cancel-circle-red.svg" alt="" className='w-4.5 h-4.5' />
                            )}
                            <p className='text-[#4B5565] text-sm font-normal'>{fuelItem?.type_name}</p>
                          </div>
                          <p className='text-[#4B5565] text-sm font-normal'>{fuelItem?.price} جنية</p>
                        </div>
                        <button
                          onClick={() => { setSelectedFuel(fuelItem); setOpenUpdateFuel(true) }}
                          className='cursor-pointer transition-transform duration-150 hover:scale-110'
                        >
                          <img src="/images/icons/EditGray.svg" alt="" />
                        </button>
                      </div>
                    ))}

                    {!fuelPrice?.all_created ? (
                      <motion.button
                        whileHover={{ scale: 1.01, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                        onClick={() => setOpenAddFuel(true)}
                        className='flex gap-2 justify-center items-center w-full h-14 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-[3px] cursor-pointer'
                      >
                        <img src="/images/icons/AddYellowIcon.svg" alt="" className='w-6 h-6' />
                        <p className='text-base font-medium'>{t('Add type')}</p>
                      </motion.button>
                    ) : null}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div>
              <p className='text-[#4B5565] text-sm font-normal mb-3'>{t('Is the service available only during daytime hours?')}</p>
              {[
                { label: t('yes'), value: 1 },
                { label: t('no'), value: 0 }
              ].map((item, index) => (
                <label key={index} className="flex items-center gap-2 cursor-pointer transition-opacity duration-150 hover:opacity-80">
                  <input
                    type="radio"
                    name="fuel_day_service"
                    className="peer hidden"
                    checked={isDayOnly === item.value}
                    onChange={() => setIsDayOnly(item.value)}
                  />
                  <span className="w-5 h-5 mb-2 rounded-full border border-gray-400 flex items-center justify-center peer-checked:bg-[var(--color-primary)] peer-checked:border-0 transition-all duration-200">
                    <img src="/images/icons/checkWhite.svg" alt="" />
                  </span>
                  <span className='mb-2 text-[#697586] text-sm font-normal'>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 4px 14px rgba(0,0,0,0.15)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            onClick={handleSave}
            className='bg-[var(--color-primary)] text-white text-base font-medium h-15 w-[25%] rounded-[3px] my-6 cursor-pointer'
          >
            {t('It was completed')}
          </motion.button>

        </div>
      </motion.div>

      <AddFuel open={openAddFuel} setOpen={setOpenAddFuel} />
      <UpdateFuel open={openUpdateFuel} setOpen={setOpenUpdateFuel} fuelData={selectedFuel} />
    </>
  )
}

export default ContentPage