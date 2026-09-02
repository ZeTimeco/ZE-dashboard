'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import AddFile from './Dialog/AddFile'
import dayjs from "dayjs";
import { motion } from 'framer-motion';

function Files({ documents }) {
  const { t } = useTranslation()
  const [openAddFile, setOpenAddFile] = useState(false)
  const [selectedDocKey, setSelectedDocKey] = useState(null)

  return (
    <>
      <div className='px-6 mb-6 space-y-3'>
        {documents?.documents?.map((doc, index) => {
          const is_uploaded = doc.is_uploaded;
          const expiry_date = doc.expiry_date;
          const status = doc.status;
          
          const isExpired = (dateString) => {
            if (!dateString) return false;          
            const [day, month, year] = dateString.split('/').map(Number);
            const expiryDate = new Date(year, month - 1, day); 
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            expiryDate.setHours(0, 0, 0, 0);  
            return expiryDate < currentDate;
          };
          const documentExpired = isExpired(expiry_date);

          let content;  
          if (is_uploaded === false && status === null) {
            content = (
              <p className='text-[#697586] text-xs font-normal'>{t('Add the file and expiry date')}</p>
            )
          } else if (is_uploaded === true && documentExpired === false && (status === 'pending' || status === 'approved')) {
            content = (
              <p className='text-[#697586] text-xs font-normal'>{t('Expiry date')}{" "}{dayjs(expiry_date).format("DD/MM/YYYY")} </p>
            )       
          } else if (is_uploaded === false && status === 'rejected') {
            content = (
              <p className='text-[#F04438] text-xs font-normal'>{t('The document was rejected. Please resubmit it.')}</p>
            ) 
          } else if (is_uploaded === false && status === 'expired') {
            content = (
              <p className='text-[#F04438] text-xs font-normal'>{t('The document has expired; please add a newer copy.')}</p>
            )
          }

          let imgLog;
          if (is_uploaded === false && status === null) {
            imgLog = (
              <img src="/images/uploadd.svg" className="w-8 h-10" alt="" />
            )
          } else {
            imgLog = (
              <div className="relative w-10 h-10 flex items-center justify-center">
                <img src="/images/filephoto.svg" className="w-8 h-10" alt="" />
                <span className="absolute bottom-1 right-1 text-white text-[9px] px-1 py-0.5 rounded-xs font-semibold">
                  pdf
                </span>
              </div>
            )
          }

          let btn;  
          if (is_uploaded === true && documentExpired === false && (status === 'pending' || status === 'approved')) {
            btn = (
              <div className='flex justify-end items-center'>
                <img src="/images/icons/true_green.svg" alt="" className="w-6 h-6" />
              </div>
            )
          } else {
            btn = (
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => { setSelectedDocKey(doc.doc_key); setOpenAddFile(true); }}
                className='flex justify-end items-center cursor-pointer p-1'
              >
                <img src="/images/icons/checkmark-circle-false_yellow.svg" alt="" className="w-6 h-6" />
              </motion.div>
            )
          }

          return (
            <motion.div 
              key={doc?.id || index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.04 }}
              className='flex justify-between items-center border border-[#CDD5DF] hover:border-slate-400 bg-white rounded-[3px] p-4 w-full transition-all duration-200 hover:shadow-2xs'
            >
              <div className='flex items-center gap-3.5'>
                <div>
                  {imgLog}
                </div>

                <div className='flex flex-col gap-0.5'>
                  <p className='text-[#344054] text-sm font-semibold'>{doc?.doc_name}</p>
                  <div>{content}</div>
                </div>
              </div>

              {btn}
            </motion.div>
          )
        })}
      </div>

      <AddFile open={openAddFile} setOpen={setOpenAddFile} docKey={selectedDocKey} />
    </>
  )
}

export default Files