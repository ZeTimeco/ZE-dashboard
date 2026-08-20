'use client'
import { Dialog } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { busyStatusThunk, getResturantStatusThunk } from '@/redux/slice/Setting/SettingSlice'
import { toast } from 'react-toastify'

function BusyDialog({ open, setOpen }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    setLoading(true)
    try {
      await dispatch(busyStatusThunk({ status: 'busy' })).unwrap()
      toast.success(t("Restaurant status updated successfully"))
      dispatch(getResturantStatusThunk())
      setOpen(false)
    } catch (error) {
      toast.error(error?.message || error || t("Failed to update restaurant status"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={() => !loading && setOpen(false)}
        PaperProps={{
          className: "!rounded-xl !p-6 !max-w-[360px] !w-full",
        }}
      >
        <div className="flex flex-col items-center text-center">
          {/* Icon */}
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFFAEB]">
            <img
              src="/images/icons/clock-yellow.svg"
              alt=""
              className="h-7 w-7"
            />
          </div>

          {/* Title */}
          <h2 className="mt-4 text-lg font-medium text-[#364152]">
            {t("Do you want to change the restaurant's status to busy?")}
          </h2>

          {/* Description */}
          <p className="mt-2 text-sm text-[#4B5565]">
            {t("Preparation time is longer than usual (30-45 minutes)")}
          </p>

          {/* Buttons */}
          <div className="mt-6 grid w-full grid-cols-2 gap-3">
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="h-11 rounded-3px cursor-pointer bg-primary text-white font-medium transition hover:bg-[#b58d00] disabled:opacity-50"
            >
              {loading ? (t("Loading...") || "...") : t("confirmation")}
            </button>

            <button
              onClick={() => setOpen(false)}
              disabled={loading}
              className="h-11 rounded-3px cursor-pointer border border-[#D0D5DD] bg-white text-[#344054] font-medium transition hover:bg-gray-50 disabled:opacity-50"
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default BusyDialog