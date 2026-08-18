'use client'
import { Dialog } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getPermissionShowThunk, EditPermissionThunk } from '@/redux/slice/Setting/SettingSlice';

function RoleData({open , setOpen, roleId}) {
  const {t} = useTranslation()

  const [openGroupId, setOpenGroupId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [saveStatus, setSaveStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const inputClassName = "w-5 h-5 appearance-none border border-gray-300 rounded-md bg-white cursor-pointer relative checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] after:absolute after:hidden checked:after:block checked:after:content-['✓'] checked:after:text-white checked:after:text-xs checked:after:font-bold checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2";

  // console.log('roleId' , roleId);

  //API
  const dispatch = useDispatch()
  const {getPermissionShow} = useSelector((state)=>state.setting)

  useEffect(() => {
    if (getPermissionShow?.role?.groups) {
      const initialIds = getPermissionShow.role.groups.flatMap((group) =>
        group?.permissions
          ?.filter((p) => p?.selected || p?.checked)
          ?.map((p) => p?.id) || []
      );
      setSelectedIds(initialIds);
    }
  }, [getPermissionShow]);

  const togglePermission = (permissionId) => {
    setSelectedIds((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleSave = () => {
    setSaveStatus('loading');
    dispatch(
      EditPermissionThunk({
        groupId: roleId,
        formData: { permission_ids: selectedIds },
      })
    ).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        setSaveStatus('success');
        dispatch(getPermissionShowThunk(roleId));
        setTimeout(() => setSaveStatus('idle'), 2500);
      } else {
        setSaveStatus('error');
        setTimeout(() => setSaveStatus('idle'), 2500);
      }
    });
  };

  useEffect(()=>{
    if(roleId){
      dispatch(getPermissionShowThunk(roleId))
    }
    
  },[dispatch , roleId])

  // console.log('getPermissionShow' , getPermissionShow);
  

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
      <div className='pt-6 px-6 flex justify-end'>
        <button 
          onClick={()=>setOpen(false)} 
          className='border border-[rgba(102,107,109,0.20)] w-12 h-12  rounded-[58.182px] flex justify-center items-center'
        >
          <img src="/images/icons/xx.svg" alt="" />
        </button>
      </div>
      
      <div className='flex flex-col gap-1 px-6  '>
      <h1 className='text-[#364152] text-xl font-medium'> {getPermissionShow?.role?.name}</h1>
      <p className='text-[#697586] text-sm font-normal'>{getPermissionShow?.role?.description}</p>
      <motion.p
          className='w-fit px-3 border border-primary bg-[#F9F5E8] rounded-full'
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <span className='text-primary text-xs font-normal'> {selectedIds.length} {t('from')} {getPermissionShow?.role?.permissions_count} {t('Specific validity')}</span>
      </motion.p>
      </div>

      <div className='border border-[#CDD5DF] my-4 '></div>

    
      {getPermissionShow?.role?.groups?.map((group, index) => {
        const groupId = group?.id ?? group?.group_id ?? group?.group_name ?? index;
        const isOpen = openGroupId === groupId;

        return (
          <div key={groupId} className="flex flex-col px-6">

            {/* Group Header */}
            <div
              onClick={() =>
                setOpenGroupId((prev) => (prev === groupId ? null : groupId))
              }
              className={`border border-[#CDD5DF] bg-[#F8FAFC] rounded-3px p-3 flex justify-between cursor-pointer ${
                isOpen ? "rounded-b-none" : "mb-4"
              }`}
            >
              <div className="flex gap-2">

                <div className="w-7 h-7 rounded-full border border-primary flex items-center justify-center">
                  <div className="w-5.5 h-5.5 rounded-full bg-primary flex items-center justify-center">
                    <img
                      src="/images/icons/Terms and Policies_White.svg"
                      alt=""
                      className="w-4 h-4"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-[#364152] text-sm font-medium">
                    {group?.group_name}
                  </p>

                  <p className="text-[#4B5565] text-xs font-normal">
                    {group?.selected_count} من {group?.total_count} محدد
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenGroupId((prev) => (prev === groupId ? null : groupId));
                }}
                className="cursor-pointer"
              >
                <motion.img
                  src="/images/icons/ArrowDown.svg"
                  alt="arrow"
                  className="w-5 h-5"
                  animate={{
                    rotate: isOpen ? 180 : 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                />
              </button>
            </div>

            {/* Permissions */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                  className="overflow-hidden mb-10"
                >
                  <div className="p-4 bg-white border border-t-0 border-[#CDD5DF]">

                    {group?.permissions?.map((permission, pIndex) => {
                      const isChecked = selectedIds.includes(permission?.id);
                      return (
                        <motion.div
                          key={permission?.id || pIndex}
                          animate={{
                            borderColor: isChecked
                              ? "var(--color-primary)"
                              : "#CDD5DF",

                            backgroundColor: isChecked
                              ? "#F9F5E8"
                              : "#FFFFFF",

                            scale: isChecked ? 1.01 : 1,
                          }}
                          transition={{
                            duration: 0.25,
                            ease: "easeOut",
                          }}
                          className="p-2 border rounded-3px mb-2"
                        >
                          <div className="py-2 px-3 flex gap-3">

                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                className={inputClassName}
                                checked={!!isChecked}
                                onChange={() => togglePermission(permission?.id)}
                              />
                            </div>

                            <div>
                              <p className="text-[#364152] text-sm font-medium">
                                {permission?.name}
                              </p>

                              <p className="text-[#4B5565] text-xs font-normal">
                                {permission?.description}
                              </p>
                            </div>

                          </div>
                        </motion.div>
                      );
                    })}

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        );
      })}

    
      {/* Success / Error Toast */}
      <AnimatePresence>
        {(saveStatus === 'success' || saveStatus === 'error') && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className={`absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl shadow-lg ${
              saveStatus === 'success'
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.1 }}
              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                saveStatus === 'success' ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              {saveStatus === 'success' ? (
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </motion.div>
            <span className={`text-sm font-medium ${
              saveStatus === 'success' ? 'text-green-700' : 'text-red-700'
            }`}>
              {saveStatus === 'success' ? t('Saved successfully') : t('Save failed')}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Save Button */}
      <div className='px-6 mb-4'>
        <motion.button
          onClick={handleSave}
          disabled={saveStatus === 'loading'}
          className="bg-primary h-15 w-full rounded-3px text-white text-base font-normal cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
          whileHover={saveStatus !== 'loading' ? { y: -1 } : {}}
          whileTap={saveStatus !== 'loading' ? { scale: 0.98 } : {}}
          transition={{ duration: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {saveStatus === 'loading' ? (
              <motion.svg
                key="spinner"
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                exit={{ opacity: 0 }}
                transition={{ rotate: { duration: 0.8, repeat: Infinity, ease: 'linear' }, opacity: { duration: 0.2 } }}
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </motion.svg>
            ) : saveStatus === 'success' ? (
              <motion.svg
                key="check"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </motion.svg>
            ) : (
              <motion.span
                key="text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {t('Preserving privileges')} ({selectedIds.length})
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

    </Dialog>
      
    </>
  )
}

export default RoleData