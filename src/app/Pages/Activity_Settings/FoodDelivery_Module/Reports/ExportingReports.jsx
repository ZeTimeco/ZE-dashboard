'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { getExportExcelReportThunk, getExportPdfReportThunk } from '@/redux/slice/Setting/SettingSlice'
import { motion } from 'framer-motion'

function ExportingReports() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { getReport , getExportExcelReport , getExportPdfReport} = useSelector((state) => state.setting)

  const [loadingPdf, setLoadingPdf] = useState(false)
  const [loadingExcel, setLoadingExcel] = useState(false)

  const period = getReport?.period 

  const handleDownloadPdf = async () => {
    try {
      setLoadingPdf(true)
      const res = await dispatch(getExportPdfReportThunk(period)).unwrap()
      const downloadUrl = res?.download_url 
      if (downloadUrl) {
        window.open(downloadUrl, '_blank')
      } else if (typeof res === 'string' && res.startsWith('http')) {
        window.open(res, '_blank')
      }
    } catch (error) {
      console.error('Error downloading PDF report:', error)
    } finally {
      setLoadingPdf(false)
    }
  }

  const handleDownloadExcel = async () => {
    try {
      setLoadingExcel(true)
      const res = await dispatch(getExportExcelReportThunk(period)).unwrap()
      const downloadUrl =  res?.download_url 
      if (downloadUrl) {
        window.open(downloadUrl, '_blank')
      } else if (typeof res === 'string' && res.startsWith('http')) {
        window.open(res, '_blank')
      }
    } catch (error) {
      console.error('Error downloading Excel report:', error)
    } finally {
      setLoadingExcel(false)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="flex flex-col gap-4"
    >
      <div className='bg-white border border-[#E3E8EF] shadow-2xs hover:shadow-md rounded-3px p-5 transition-shadow duration-300'>
        {/* Header */}
        <div className='flex items-center gap-2.5 border-b border-slate-100 pb-3'>
          <div className="p-2 rounded-3px bg-emerald-50 text-emerald-600">
            <img src="/images/icons/document-attachment_gray.svg" className='w-5 h-5' alt="" />
          </div>
          <p className='text-[#0B0E11] text-base font-semibold'>{t('Orders by time')}</p>
        </div>

        {/* excel */}
        <motion.div 
          whileHover={{ scale: 1.01, borderColor: 'var(--color-primary)' }}
          className='relative group border border-[#CDD5DF] rounded-3px p-3.5 mt-4 flex justify-between items-center bg-white transition-all duration-200 cursor-pointer shadow-2xs'
          onClick={handleDownloadExcel}
        >
          <div className='flex flex-col gap-0.5'>
            <p className="font-semibold text-sm text-[#202939] group-hover:text-primary transition-colors" title={getExportExcelReport?.filename}>
              تصدير كملف Excel
            </p>
            {getExportExcelReport?.filename && (
              <span className='text-xs text-[#697586] transition-all'>
                {getExportExcelReport?.filename}
              </span>
            )}
          </div>
          <button 
            disabled={loadingExcel} 
            className='cursor-pointer disabled:opacity-50 p-2 rounded-3px hover:bg-emerald-50 transition-colors'
            title={getExportExcelReport?.filename}
          >
            {loadingExcel ? (
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <img src="/images/icons/download-yellow.svg" alt="Download Excel" className="w-5 h-5 group-hover:scale-110 transition-transform" />
            )}
          </button>
        </motion.div>

        {/* pdf */}
        <motion.div 
          whileHover={{ scale: 1.01, borderColor: 'var(--color-primary)' }}
          className='relative group border border-[#CDD5DF] rounded-3px p-3.5 mt-3 flex justify-between items-center bg-white transition-all duration-200 cursor-pointer shadow-2xs'
          onClick={handleDownloadPdf}
        >
          <div className='flex flex-col gap-0.5'>
            <p className="font-semibold text-sm text-[#202939] group-hover:text-primary transition-colors" title={getExportPdfReport?.filename}>
              تصدير كملف pdf
            </p>
            {getExportPdfReport?.filename && (
              <span className='text-xs text-[#697586] transition-all'>
                {getExportPdfReport?.filename}
              </span>
            )}
          </div>
          <button 
            disabled={loadingPdf} 
            className='cursor-pointer disabled:opacity-50 p-2 rounded-3px hover:bg-rose-50 transition-colors'
            title={getExportPdfReport?.filename}
          >
            {loadingPdf ? (
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <img src="/images/icons/download-yellow.svg" alt="Download PDF" className="w-5 h-5 group-hover:scale-110 transition-transform" />
            )}
          </button>
        </motion.div>
      </div>

      {/* note */}
      <div className='border border-[#EEF2F6] bg-[#F8FAFC] rounded-3px p-3.5 flex items-center gap-3 shadow-2xs'>
        <div className="p-2 rounded-3px bg-amber-50 text-amber-600">
          <img src="/images/icons/calendar-yellow2.svg" alt="" className="w-5 h-5" />
        </div>
        <div className='flex flex-col gap-0.5'>
          <p className='text-[#364152] text-sm font-semibold'>{t('Last update')}</p>
          <p className='text-[#697586] text-xs font-normal'>
            {getReport?.last_updated || getReport?.data?.last_updated || 'اليوم في 2:30 م'}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default ExportingReports