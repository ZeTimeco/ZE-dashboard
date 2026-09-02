'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import DeleteDialog from './DeleteDialog';
import { motion } from 'framer-motion';

function HaveTerms_PoliciesPage({ onAddClick, onEditClick, policies = [], loading }) {
  const { t } = useTranslation()
  const StatusRender = (Status) => {
    switch (Status) {
      case "approved": // مقبولة 
        return (
          <div className='bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit h-8 rounded-3xl shadow-2xs'>
            <div className='p-1.5 px-2.5 flex items-center gap-1.5'>
              <img src="/images/icons/Active Status.svg" alt="" className='w-4 h-4' />
              <span className='text-xs font-medium'>{t('Acceptable')}</span>
            </div>
          </div>
        );
      case "pending": // قيد المراجعة
        return (
          <div className='bg-[#EFF4FF] border border-[#518BFF] text-[#004EEB] w-fit h-8 rounded-3xl shadow-2xs'>
            <div className='p-1.5 px-2.5 flex items-center gap-1.5'>
              <img src="/images/icons/Under review.svg" alt="" className='w-4 h-4' />
              <span className='text-xs font-medium'>{t('Under review')}</span>
            </div>
          </div>
        );
      case "rejected": // مرفوضة
        return (
          <div className='bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit h-8 rounded-3xl shadow-2xs'>
            <div className='p-1.5 px-2.5 flex items-center gap-1.5'>
              <img src="/images/icons/refused Status.svg" alt="" className='w-4 h-4' />
              <span className='text-xs font-medium'>{t('rejected')}</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const [openDelete, setOpenDelete] = useState(false)
  const [selectedPolicyId, setSelectedPolicyId] = useState(null)

  return (
    <>
      <div className='p-6'>
        <div className='grid grid-cols-1 lg1:grid-cols-2 gap-6'>
          {policies?.map((policy, index) => (
            <motion.div 
              key={policy?.id || index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
              whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
              className='bg-white border border-[#E3E8EF] shadow-xs rounded-[3px] p-5 flex flex-col justify-between transition-all duration-300'
            >
              <div>
                <div className='flex justify-between items-start gap-2 w-full'>
                  <p className='text-[#121926] text-base font-semibold w-[65%]'>{policy?.policy_name}</p>
                  <div className='w-[35%] flex justify-end'>{StatusRender(policy?.status)}</div>
                </div>
                <div 
                  className='text-[#697586] text-sm font-normal my-4 break-words leading-relaxed'
                  dangerouslySetInnerHTML={{ __html: policy?.policy_content }}
                />
              </div>

              <div className='text-base font-normal w-full flex gap-3 mt-4 pt-4 border-t border-gray-100'>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  onClick={() => onEditClick(policy)} 
                  className='bg-[var(--color-primary)] hover:bg-[#b08713] text-white w-full h-12 rounded-[3px] cursor-pointer font-medium transition-colors'
                >
                  {t('modification')}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: '#FEF3F2' }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  onClick={() => {
                    setSelectedPolicyId(policy?.id)
                    setOpenDelete(true)
                  }}
                  className='border border-[#DA5305] text-[#DA5305] w-full h-12 rounded-[3px] cursor-pointer font-medium transition-colors'
                >
                  {t('delete')}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button 
          whileHover={{ scale: 1.02, boxShadow: '0 4px 14px rgba(198, 152, 21, 0.2)' }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          onClick={onAddClick}
          className='mt-10 bg-[var(--color-primary)] hover:bg-[#b08713] rounded-[3px] cursor-pointer text-white flex items-center justify-center gap-2 lg1:w-[35%] w-full sm:w-[50%] h-14 font-semibold transition-colors'
        >
          <span className='text-base font-semibold'>{t('Add policy')}</span>
          <img src="/images/icons/AddIcon.svg" alt="" className='w-5 h-5' />
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