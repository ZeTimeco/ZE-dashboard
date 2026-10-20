'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Documents() {
  const { t } = useTranslation()

  const documents = [
    {
      label: 'commercial register',
      fileName: 'commercial_register.pdf',
      fileSize: '2.4 MB',
      expiryDate: '15/06/2026',
    },
    {
      label: 'National ID (Front)',
      fileName: 'national_id_front.jpg',
      fileSize: '1.1 MB',
      expiryDate: '20/03/2028',
    },
    {
      label: 'National ID (Back)',
      fileName: 'national_id_back.jpg',
      fileSize: '980 KB',
      expiryDate: '20/03/2028',
    },
    {
      label: 'Bank Certificate (IBAN)',
      fileName: 'bank_certificate.pdf',
      fileSize: '540 KB',
      expiryDate: null,
    },
  ]

  return (
    <div className='border border-[#E7E5E4E5] rounded-3px p-3'>
      <div className='flex justify-between mb-3 border-b border-[#E7E5E4E5] pb-2'>
        <p className='flex items-center gap-2 '>
          <span className='inline-block w-2 h-2 rounded-full bg-primary'></span>
          <span className='text-[#1C1917] text-base font-semibold'>{t('Attached documents')}</span>
        </p>
      </div>

      <div className='flex flex-col gap-3'>
        {documents.map((doc, index) => (
          <div key={index} className='flex items-center justify-between py-2'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-lg bg-[#FDF7E8] flex items-center justify-center shrink-0 border border-[#F3E8C4]'>
                <img src="/images/icons/document-attachment-yellow.svg" alt="file" className="w-5 h-5" />
              </div>
              <div className='flex flex-col gap-0.5'>
                <p className='text-[#292524] text-sm font-medium'>{t(doc.label)}</p>
                <div className='flex items-center gap-2 text-xs text-[#A8A29E]'>
                  <span>{doc.fileName}</span>
                  <span>•</span>
                  <span>{doc.fileSize}</span>
                </div>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              {doc.expiryDate && (
                <div className='flex items-center gap-1.5 text-xs'>
                  <img src="/images/icons/calendar_yellow.svg" alt="calendar" className="w-3.5 h-3.5" />
                  <span className='text-[#A8A29E] font-medium'>{t('Expiry date')}:</span>
                  <span className='text-primary font-semibold'>{doc.expiryDate}</span>
                </div>
              )}

              <div className='w-6 h-6 rounded-full bg-[#ECFDF3] flex items-center justify-center'>
                <svg className='w-3.5 h-3.5 text-[#12B76A]' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={3}>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Documents