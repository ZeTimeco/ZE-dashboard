"use client";
import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { IMAGE_BASE_URL } from "../../../../config/imageUrl";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import DeletePage from "./Model/Delete/page";
import { useDispatch } from "react-redux";
import { deleteWorkerThunk } from "@/redux/slice/Workers/WorkersSlice";

export default function TableWorkers({workers , loading}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [selectedWorkerId, setSelectedWorkerId] = useState(null);

  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = (id) => {
    setSelectedWorkerId(id);
    setOpen(true);
  };
  const handleClosee = () => {
    setOpen(false);
    setSelectedWorkerId(null);
  };

  const handleDeleteWorker = () => {
    if (selectedWorkerId) {
      dispatch(deleteWorkerThunk(selectedWorkerId));
      handleClosee();
    }
  };

  const StatusRender = (status) => {
    if (status === true || status === "true") {
      return (
        <div className='bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit h-9.5 rounded-3xl transition-transform duration-150 hover:scale-[1.02]'>
          <div className='py-1.5 px-3 flex gap-1 items-center'>
            <img src="/images/icons/Active Status.svg" alt="" className='mt-1' />
            <span>{t('active')}</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className='bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit h-9.5 rounded-3xl transition-transform duration-150 hover:scale-[1.02]'>
          <div className='py-1.5 px-3 flex gap-1 items-center'>
            <img src="/images/icons/refused Status.svg" alt="" className='mt-1'/>
            <span>{t('inactive')}</span>
          </div>
        </div>
      );
    }
  };

  const [imgError, setImgError] = useState(false);

  const router = useRouter();
  const handleEditClick = (id) => {
    router.push(`/Pages/workers/Edit?id=${id}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="overflow-x-auto mt-8 rounded-[3px] mb-5 border border-[#E3E8EF] shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]"
    >
      <table className="min-w-[1000px] lg1:w-full border border-[#E3E8EF] text-sm text-right">
        {/* Table Head */}
        <thead className="bg-[#F8FAFC] border-b border-[#E3E8EF] text-[#364152] sticky top-0 z-10">
          <tr>
            <th className="p-4 font-normal">{t("User code")}</th>
            <th className="p-4 font-normal">{t("Name of the worker")}</th>
            <th className="p-4 font-normal">{t("job")}</th>
            <th className="p-4 font-normal">{t("Working hours")}</th>
            <th className="p-4 font-normal">{t("phone number")}</th>
            <th className="p-4 font-normal">{t("Status")}</th>
            <th className="p-4 font-normal text-center">{t("procedures")}</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7} className="text-center py-10">
                <CircularProgress size="3rem" color="warning" />
              </td>
            </tr>
          ) : workers.length > 0 ? (
            workers.map((worker, index) => (
              <motion.tr
                key={worker.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: Math.min(index * 0.03, 0.3) }}
                className="hover:bg-[#F9F5E8] hover:border-0 border-y border-[#E3E8EF] font-normal text-sm text-[#697586] transition-colors duration-200"
              >
                <td className="p-4 font-medium text-[#364152]">{worker?.id}#</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {worker?.image === null || imgError ? (
                      <div className="w-8 h-8 rounded-full bg-[#C8C8C8] flex justify-center items-center shadow-sm">
                        <span className="font-medium text-sm text-white">
                          {worker?.firstname?.charAt(0)}
                          {worker?.lastname?.charAt(0)}
                        </span>
                      </div>
                    ) : (
                      <img
                        src={`${IMAGE_BASE_URL}${worker?.image}`}
                        alt={worker.worker}
                        className="w-8 h-8 rounded-full object-cover shadow-sm transition-transform duration-200 hover:scale-105"
                        onError={() => setImgError(true)} 
                      />
                    )}
                  
                    <span className="font-medium text-[#364152]">{worker?.firstname} {worker?.lastname}</span>
                  </div>
                </td>
                <td className="p-4">{worker?.designation?.name}</td>
                <td className="p-4">{worker?.working_time}</td>
                <td className="p-4">{worker?.phone}</td>
                <td className="p-4">{StatusRender(worker.is_active)}</td>
                <td className="flex gap-4 justify-center p-4">
                  <motion.button 
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEditClick(worker.id)} 
                    className="cursor-pointer p-1"
                  >
                    <img src="/images/icons/EditBlack.svg" alt="" className="w-6 h-6"/>
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    className="cursor-pointer p-1" 
                    onClick={() => handleClickOpen(worker.id)}
                  >
                    <img src="/images/icons/delete-darkRed.svg" alt="" className="w-6 h-6" />
                  </motion.button>
                </td>
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-10">
                {t("No workers found")}
              </td>
            </tr>
          )}
        </tbody>
      </table>
  
      <DeletePage 
        open={open} 
        handleClosee={handleClosee} 
        onDelete={handleDeleteWorker}
      />
    </motion.div>
  );
}

