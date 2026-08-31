"use client"
import { Dialog } from '@mui/material'
import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next';
import RequestStatusDataPage from './RequestStatusData/page';

// Force dynamic rendering - this page should not be statically generated
export const dynamic = 'force-dynamic';

function ViewHome_Car_Street_ModulePage({ open, handleClose, bookingId ,bookingDetails}) {
  const { t } = useTranslation();
  console.log("bookingId" ,bookingId);
  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          className: "RequestsViewPage-dialog",
          style: {
            borderRadius: '6px',
            maxHeight: '90vh',
            overflowY: 'auto',
            overflowX: 'hidden'
          }
        }}
      >
        {/* Close Button */}
        <section className="px-6 mt-6 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#F8FAFC" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClose}
            className="border border-[#CDD5DF] w-12 h-12 rounded-[100px] flex justify-center items-center cursor-pointer transition-colors duration-150"
          >
            <img src="/images/icons/xx.svg" alt="" className="w-6 h-6 transition-transform duration-200 hover:rotate-90" />
          </motion.button>
        </section>

        {/* تفاصيل الطلب */}
        <RequestStatusDataPage bookingDetails={bookingDetails} handleCloseViewHome_Car={handleClose}/>

      </Dialog>
    </>
  )
}

export default ViewHome_Car_Street_ModulePage