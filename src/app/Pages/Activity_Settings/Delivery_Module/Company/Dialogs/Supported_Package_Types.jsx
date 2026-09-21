"use client"

import { Dialog } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { getShowSettingThunk } from '@/redux/slice/Setting/SettingSlice'
import { useLayoutEffect } from 'react'

function Supported_Package_Types({ open, setOpen }) {
  const { t } = useTranslation()

  //api
  const dispatch = useDispatch()
  const {getShowSetting } = useSelector((state)=>state.setting)
  useEffect(()=>{
    dispatch(getShowSettingThunk())
  },[dispatch])

  console.log('getShowSetting' , getShowSetting);


  const [selected, setSelected] = useState([])

  const data = [
    t('Up to 10 deliveries'),
    t('Up to 20 deliveries'),
    t('Up to 50 deliveries'),
    t('without limit'),
  ]

  const handleSelect = (index) => {
    setSelected((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    )
  }

  const inputClassName =  "w-5 h-5 appearance-none border border-gray-300 rounded-md bg-white cursor-pointer relative checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] after:absolute after:hidden checked:after:block checked:after:content-['✓'] checked:after:text-white checked:after:text-xs checked:after:font-bold checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2";
  
  useEffect(() => {
    if (getShowSetting?.parcel_categories) {
      const selectedIds = getShowSetting.parcel_categories
        .filter((item) => item.selected === true)
        .map((item) => item.id)

      setSelected(selectedIds)
    }
  }, [getShowSetting])

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "rerquest-dialog" }}
    >
      {/* Header */}
      <div className="flex justify-end px-6 mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(false)}
          className="border border-[#CDD5DF] w-12 h-12 cursor-pointer rounded-[100px] flex justify-center items-center hover:bg-gray-50 hover:border-[#9AA4B2] transition-colors duration-150"
        >
          <img
            src="/images/icons/xx.svg"
            alt=""
            className="w-6 h-6"
          />
        </motion.button>
      </div>

      <div>
        <p className="px-6 text-[#364152] text-xl font-semibold">
          {t('Types of supported parcels')}
        </p>

        <div className="border border-[#666B6D1F] h-[0.5px] my-4"></div>

        <div className="px-6 flex flex-col gap-2 pb-6">
          {getShowSetting?.parcel_categories?.map((item) => {
              const isSelected = selected.includes(item.id)

              return (
                <motion.label
                  key={item.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`w-full flex items-center gap-3 px-4 py-4 rounded-3px cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#FDF7E8]'
                      : 'bg-white hover:bg-[#FAFAFA]'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleSelect(item.id)}
                    className={inputClassName}
                  />

                  <span
                    className={`text-xl font-normal transition-colors duration-200 ${
                      isSelected
                        ? 'text-primary'
                        : 'text-[#364152]'
                    }`}
                  >
                    {item?.name}
                  </span>
                </motion.label>
              )
            })}
        </div>
      </div>
    </Dialog>
  )
}

export default Supported_Package_Types