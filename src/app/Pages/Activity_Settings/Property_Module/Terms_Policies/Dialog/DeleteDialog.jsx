'use client'
import { CircularProgress, Dialog } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { deletePolicyThunk } from '@/redux/slice/Setting/SettingSlice';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';


function DeleteDialog({ open, setOpen, policyId }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
      if (deleting || !policyId) return;
      setDeleting(true);
      try {
        await dispatch(deletePolicyThunk(policyId)).unwrap();
        toast.success(t('Policy deleted successfully') , {
          position: 'top-right',
          autoClose: 2500,
        });
        setOpen(false);
      } catch (err) {
        const errMsg = err?.message || (typeof err === 'string' ? err : null) || t('Failed to delete policy') ;
        toast.error(errMsg, { position: 'top-right', autoClose: 3000 });
      } finally {
        setDeleting(false);
      }
    };

  return (
    <>
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        className: "ServiceDeletePage-dialog",
      }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className='pt-6 px-6'>
              <button 
                onClick={() => !deleting && setOpen(false)} 
                disabled={deleting}
                className='border border-[rgba(102,107,109,0.20)] w-12 h-12 rounded-[58.182px] flex justify-center items-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <img src="/images/icons/xx.svg" alt="" />
              </button>
            </div>

            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.05, type: 'spring', stiffness: 300, damping: 20 }}
              className='flex justify-center mb-4'
            >
              <div className='bg-[#FEF3F2] w-12 h-12 p-3 rounded-full'>
                <div className='bg-[#FEE4E2] w-6 h-6 rounded-full'>
                  <img src="/images/icons/xxx.svg" alt="" />
                </div>
              </div>
            </motion.div>

            <div className='flex flex-col items-center mb-6'>
              <p className='text-[#0F022E] text-xl font-semibold mb-4'>
                {t('Are you sure you want to delete this policy?')}
              </p>
              <p className='text-[#697586] text-base font-normal text-center'>
                {t('This policy will be removed from your list and will no longer be available.')}
              </p>
            </div>

            <div className="w-full h-px bg-[#CDD5DF] mt-6"></div>

            <section className='w-full flex p-6 gap-3'>
              <motion.button
                whileHover={!deleting ? { scale: 1.02 } : {}}
                whileTap={!deleting ? { scale: 0.97 } : {}}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                onClick={handleDelete}
                disabled={deleting}
                className={`w-full bg-[#D92D20] text-white h-13.5 rounded-3px flex items-center justify-center gap-2 ${
                  deleting ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer hover:bg-[#b91c1c]'
                } transition-colors duration-200`}
              >
                {deleting ? (
                  <>
                    <CircularProgress size={18} color="inherit" />
                    <span className='text-base font-medium'>{t('Deleting...')}</span>
                  </>
                ) : (
                  <span className='text-base font-medium'>{t('delete')}</span>
                )}
              </motion.button>

              <motion.button
                whileHover={!deleting ? { scale: 1.02 } : {}}
                whileTap={!deleting ? { scale: 0.98 } : {}}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                onClick={() => !deleting && setOpen(false)}
                disabled={deleting}
                className='w-full border border-[#697586] text-[#4B5565] h-13.5 rounded-3px cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 hover:bg-gray-50'
              >
                <span className='text-base font-normal'>{t('cancel')}</span>
              </motion.button>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </Dialog>
    </>
  )
}

export default DeleteDialog