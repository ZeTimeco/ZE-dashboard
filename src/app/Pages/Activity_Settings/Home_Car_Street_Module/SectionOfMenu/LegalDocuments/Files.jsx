'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import AddFile from './Dialog/AddFile'
import dayjs from "dayjs";

function Files({documents}) {
  const {t} = useTranslation()
  const [openAddFile , setOpenAddFile] = useState(false)
  const [selectedDocKey, setSelectedDocKey] = useState(null)

  return (
    <>
      <div className='px-6 mb-6 flex flex-col gap-3'>
        {documents?.documents?.map((doc , index)=>{
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
          { 
            if(is_uploaded === false && status === null ){
              content=(
                <p className='text-[#697586] text-xs font-normal'>{t('Add the file and expiry date')}</p>
              )
            }else if(is_uploaded === true && documentExpired === false &&   (status === 'pending' || status === 'approved')){
              content = (
                <p className='text-[#697586] text-xs font-normal'>{t('Expiry date')}{" "}{dayjs(expiry_date).format("DD/MM/YYYY")} </p>
              )       
            }else if(is_uploaded === false && status === 'rejected'){
              content =(
                <p className='text-[#F04438] text-xs font-normal'>{t('The document was rejected. Please resubmit it.')}</p>
              ) 
            }else if(is_uploaded === false && status === 'expired'){
              content =(
                <p className='text-[#F04438] text-xs font-normal'>{t('The document has expired; please add a newer copy.')}</p>
              )
            }
          }

          let imgLog;
          {
            if(is_uploaded === false && status === null ){
              imgLog=(
                <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-lg">
                  <img src="/images/uploadd.svg" className="w-6 h-8" alt="" />
                </div>
              )
            }else if(is_uploaded === true && documentExpired === false &&   (status === 'pending' || status === 'approved')){
              imgLog = (
                <div className="relative w-10 h-10 flex items-center justify-center bg-emerald-50 rounded-lg">
                  <img src="/images/filephoto.svg" className="w-6 h-8" alt="" />
                  <span className="absolute bottom-0 right-1 text-white text-[9px] px-1 py-0.2 rounded-xs bg-emerald-600 font-bold">
                    pdf
                  </span>
                </div>
              )       
            }else if(is_uploaded === false && status === 'rejected'){
              imgLog =(
                <div className="relative w-10 h-10 flex items-center justify-center bg-red-50 rounded-lg">
                  <img src="/images/filephoto.svg" className="w-6 h-8" alt="" />
                  <span className="absolute bottom-0 right-1 text-white text-[9px] px-1 py-0.2 rounded-xs bg-red-600 font-bold">
                    pdf
                  </span>
                </div>
              ) 
            }else if(is_uploaded === false  && status === 'expired'){
              imgLog =(
                <div className="relative w-10 h-10 flex items-center justify-center bg-amber-50 rounded-lg">
                  <img src="/images/filephoto.svg" className="w-6 h-8" alt="" />
                  <span className="absolute bottom-0 right-1 text-white text-[9px] px-1 py-0.2 rounded-xs bg-amber-600 font-bold">
                    pdf
                  </span>
                </div>
              )
            }
          }

          let btn;  
          {
            if(is_uploaded === true && documentExpired === false &&   (status === 'pending' || status === 'approved')){
              btn=(
                <div className='w-[50%] flex justify-end items-center'>
                  <motion.img 
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.15 }}
                    src="/images/icons/true_green.svg" 
                    alt="approved" 
                    className="w-6 h-6"
                  />
                </div>
              )
            } else {
              btn=(
                <div
                  onClick={()=>{ setSelectedDocKey(doc.doc_key); setOpenAddFile(true); }}
                  className='w-[50%] flex justify-end items-center cursor-pointer'
                >
                  <motion.img 
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    src="/images/icons/checkmark-circle-false_yellow.svg" 
                    alt="action" 
                    className="w-6 h-6"
                  />
                </div>
              )
            }
          }

          return (
            <motion.div 
              key={doc?.id || index}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
              whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}
              className='flex justify-between items-center border border-[#CDD5DF] rounded-[3px] p-4 w-full bg-white transition-all duration-200'
            >
              <div className='flex items-center gap-3.5 w-[50%]'>
                <div className="shrink-0">
                  {imgLog}
                </div>
                <div className='flex flex-col gap-0.5'>
                  <p className='text-[#344054] text-sm font-medium'>{doc?.doc_name}</p>
                  <>{content}</>
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