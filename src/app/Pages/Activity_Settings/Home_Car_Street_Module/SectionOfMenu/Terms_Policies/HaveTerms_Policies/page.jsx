'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import DeleteDialog from './DeleteDialog';

function HaveTerms_PoliciesPage({onAddClick, onEditClick ,policies = [] ,loading}) {
  const {t} = useTranslation()
  const StatusRender = (Status) => {
    switch (Status) {
      case "approved": // مقبولة 
        return (
          <div className='bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit h-8 rounded-3xl transition-transform duration-150 hover:scale-[1.02]'>
            <div className='p-1.5 flex items-center gap-1'>
              <img src="/images/icons/Active Status.svg" alt="" className='w-4 h-4' />
              <span className='text-xs font-medium'>{t('Acceptable')}</span>
            </div>
          </div>
        );
      case "pending":// قيد المراجعة
        return (
          <div className='bg-[#EFF4FF] border border-[#518BFF] text-[#004EEB] w-fit h-8 rounded-3xl transition-transform duration-150 hover:scale-[1.02]'>
            <div className='p-1.5 flex items-center gap-1'>
              <img src="/images/icons/Under review.svg" alt="" className='w-4 h-4' />
              <span className='text-xs font-medium'>{t('Under review')}</span>
            </div>
          </div>
        );
      case "rejected": // مرفوضة
        return (
          <div className='bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit h-8 rounded-3xl transition-transform duration-150 hover:scale-[1.02]'>
            <div className='p-1.5 flex items-center gap-1'>
              <img src="/images/icons/refused Status.svg" alt="" className='w-4 h-4'/>
              <span className='text-xs font-medium'>{t('rejected')}</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const [openDelete , setOpenDelete] = useState(false)
  const [selectedPolicyId, setSelectedPolicyId] = useState(null)

  return (
    <>
      <div className='p-6'>
        <div className='grid grid-cols-1 lg1:grid-cols-2 gap-6'>
          {policies?.map((policy, index)=>(
            <motion.div 
              key={policy?.id || index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.06 }}
              whileHover={{ y: -3, boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}
              className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] bg-white rounded-[3px] transition-all duration-200 flex flex-col justify-between'
            >
              <div className='p-4 flex flex-col h-full justify-between'>
                <div>
                  <div className='flex justify-between items-start gap-2 w-full'>
                    <p className='text-[#121926] text-base font-semibold w-[65%] leading-snug'>{policy?.policy_name}</p>
                    <div className='w-[35%] flex justify-end'>{StatusRender(policy?.status)}</div>
                  </div>
                  <div 
                    className='text-[#697586] text-sm font-normal my-4 break-words leading-relaxed'
                    dangerouslySetInnerHTML={{ __html: policy?.policy_content }}
                  />
                </div>

                <div className='text-base font-normal w-full flex gap-4 mt-2 pt-2'>
                  <motion.button 
                    whileHover={{ scale: 1.02, filter: 'brightness(1.05)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onEditClick(policy)} 
                    className='bg-[var(--color-primary)] text-white w-full h-12 lg1:h-14 rounded-[3px] cursor-pointer font-medium shadow-xs transition-all'
                  >
                    {t('modification')}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(218, 83, 5, 0.04)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={()=>{
                      setSelectedPolicyId(policy?.id)
                      setOpenDelete(true)
                    }}
                    className='border border-[#DA5305] text-[#DA5305] w-full h-12 lg1:h-14 rounded-[3px] cursor-pointer font-medium transition-all'
                  >
                    {t('delete')}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button 
          whileHover={{ scale: 1.02, filter: 'brightness(1.05)' }}
          whileTap={{ scale: 0.98 }}
          onClick={onAddClick}
          className='mt-10 bg-[var(--color-primary)] rounded-[3px] cursor-pointer text-white flex items-center justify-center gap-2 lg1:w-[35%] w-[50%] h-14 font-semibold shadow-xs transition-all'
        >
          <span className='text-base font-semibold'>{t('Add policy')}</span>
          <img src="/images/icons/AddIcon.svg" alt="" className="w-5 h-5" />
        </motion.button>
      </div>

      <DeleteDialog 
        open={openDelete} 
        setOpen={setOpenDelete}
        policyId={selectedPolicyId}
      />
    </>
  )
}

export default HaveTerms_PoliciesPage