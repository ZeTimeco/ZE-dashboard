"use client"
import { getDesignationsThunk, UpdateWorkerThunk } from '@/redux/slice/Workers/WorkersSlice';
import { Dialog } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

function Job({openJob , setOpenJob ,worker}) {
  const {t}= useTranslation();

  //api
  const dispatch = useDispatch();
  const {getDesignations, loading} = useSelector(state => state.workers);

  useEffect(() => {
    dispatch(getDesignationsThunk())
  }, [dispatch])

  // Job Dropdown
  const [openJobDropdown, setOpenJobDropdown] = useState(false);
  const [selectedJob, setSelectedJob] = useState("");
  const dropdownRefJob = useRef(null);
  const optionsJob = getDesignations?.designations || [];

  useEffect(() => {
    if(worker?.designation){
      setSelectedJob(worker.designation.name)
    }
  }, [worker, openJob])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRefJob.current && !dropdownRefJob.current.contains(event.target)) setOpenJobDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedDesignation = optionsJob.find(item => item.name === selectedJob);
    if (!selectedDesignation) return;

    const formData = new FormData();
    formData.append('id', worker?.id);
    formData.append('designation_id', selectedDesignation.id);
    
    const result = await dispatch(UpdateWorkerThunk(formData));
    if (UpdateWorkerThunk.fulfilled.match(result)) {
      setOpenJob(false);
    }
  };

  return (
    <>
      <Dialog 
        open={openJob} 
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ className: "ServicePage-dialog" }}
      >
        <button className='pt-8 px-6 pb-2 cursor-pointer flex justify-end w-full' onClick={()=>setOpenJob(false)}>
          <span className='border border-[#DDD] rounded-[100%] w-10 h-10 flex justify-center items-center hover:bg-gray-50 transition-colors'>
            <img src="/images/icons/xx.svg" alt="" className="transition-transform duration-200 hover:rotate-90" />
          </span>
        </button>

        <div className='flex flex-col gap-5 items-center justify-center mb-8'>
          {/* icon */}
          <div className='bg-[#EEF2F6] w-17.5 h-17.5 rounded-[100%] flex items-center justify-center shadow-xs'>
            <div className='bg-[#CDD5DF] w-12.5 h-12.5 rounded-[100%] flex items-center justify-center'>
              <img src="/images/icons/briefcase.svg" className="w-7.5 h-7.5" alt="" />
            </div>
          </div>

          {/* title */}
          <p className='text-[var(--color-primary)] text-xl font-bold'>{t('Job change')}</p>
        </div>
        
        <div className='px-6'>
          <div className="flex flex-col">
            <label className="text-[#364152] text-base font-normal mb-3">
              {t("job")}
            </label>

            <div className="relative w-full" ref={dropdownRefJob}>
              <div
                onClick={() => setOpenJobDropdown(!openJobDropdown)}
                className="p-3 h-15 border border-[#C8C8C8] rounded-[3px] cursor-pointer flex items-center justify-between focus-within:border-[#C69815] transition-colors"
              >
                <span className={selectedJob ? "text-[#364152]" : "text-[#9A9A9A]"}>
                  {selectedJob || t("Choose the job")}
                </span>
                <span>
                  {openJobDropdown ? (
                    <img src="/images/icons/ArrowUp.svg" alt="" />
                  ) : (
                    <img src="/images/icons/ArrowDown.svg" alt="" />
                  )}
                </span>
              </div>

              {openJobDropdown && (
                <ul className="absolute left-0 right-0 border border-[#C8C8C8] bg-white rounded-[3px] shadow-md z-10 max-h-48 overflow-y-auto">
                  {optionsJob.map((option, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setSelectedJob(option.name);
                        setOpenJobDropdown(false);
                      }}
                      className="p-3 hover:bg-[#F5F5F5] cursor-pointer transition-colors"
                    >
                      {option.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className='my-6 flex gap-3'>
            <motion.button 
              whileHover={{ scale: 1.02, filter: "brightness(1.05)" }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={loading}
              className='w-full h-15 bg-[var(--color-primary)] text-[#fff] cursor-pointer rounded-[3px] flex justify-center items-center disabled:opacity-50 font-medium shadow-xs transition-all'
            >
              {loading ? t('loading...') : t('save')}
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02, backgroundColor: "rgba(198, 152, 21, 0.04)" }}
              whileTap={{ scale: 0.98 }}
              onClick={()=>setOpenJob(false)} 
              className='w-full h-15 border border-[var(--color-primary)] text-[var(--color-primary)] cursor-pointer rounded-[3px] flex justify-center items-center font-medium transition-colors'
            >
              {t('cancel')}
            </motion.button>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default Job