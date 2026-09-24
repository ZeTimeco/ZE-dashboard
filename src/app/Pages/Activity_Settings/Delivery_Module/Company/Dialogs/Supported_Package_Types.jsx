"use client"

import { Dialog } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

function Supported_Package_Types({ open, setOpen, getShowSetting, handleUpdate, handleSubmit }) {
  const { t } = useTranslation()
  const [selected, setSelected] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    )
  }

  const inputClassName = "w-5 h-5 appearance-none border border-gray-300 rounded-md bg-white cursor-pointer relative checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] after:absolute after:hidden checked:after:block checked:after:content-['✓'] checked:after:text-white checked:after:text-xs checked:after:font-bold checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
  
  useEffect(() => {
    if (getShowSetting?.parcel_categories) {
      const selectedIds = getShowSetting.parcel_categories
        .filter((item) => item.selected === true)
        .map((item) => item.id)

      setSelected(selectedIds)
    }
  }, [getShowSetting, open])

  const handleSave = async () => {
    setLoading(true)
    const updateFn = handleUpdate || handleSubmit
    if (updateFn) {
      const success = await updateFn({ parcel_category_ids: selected })
      if (success !== false) {
        setOpen(false)
      }
    }
    setLoading(false)
  }

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
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

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-6 my-6 w-full px-6">
          <button
            onClick={handleSave}
            disabled={loading}
            className={`h-12 w-full text-white rounded-3px transition-all duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary cursor-pointer hover:opacity-95"
            }`}
          >
            {loading ? t('Saving...') || '...' : t('save')}
          </button>
          <button
            onClick={() => setOpen(false)}
            disabled={loading}
            className="h-12 w-full border border-[#697586] text-[#697586] rounded-3px cursor-pointer hover:bg-gray-50"
          >
            {t('cancel')}
          </button>
        </div>
      </div>
    </Dialog>
  )
}

export default Supported_Package_Types