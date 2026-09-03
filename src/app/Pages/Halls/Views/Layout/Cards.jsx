'use client'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { DeleteTableThunk, EditRestaurantTableThunk } from '@/redux/slice/Halls/HallsSlice';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

function Cards({ table, hallId, onRefresh, setSelectedTableId }) {
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch()

  if (!table) return null;

  const handleDelete = async () => {
    if (window.confirm(t('Are you sure you want to delete this table?'))) {
      const result = await dispatch(DeleteTableThunk(table.id))
      if (!result.error) {
        toast.success(t('Table deleted successfully'));
        setSelectedTableId(null);
        if (onRefresh) onRefresh();
      } else {
        toast.error(t('Failed to delete table'));
      }
    }
  }

  const handleToggleActive = async () => {
    const data = new FormData();
    data.append('code', table.code);
    data.append('shape', table.shape);
    data.append('capacity', String(table.capacity));
    data.append('is_bookable', table.is_bookable ? '1' : '0');
    data.append('is_active', table.is_active ? '0' : '1');

    if (table.tags) {
      table.tags.forEach((tag, index) => {
        data.append(`tags[${index}]`, tag.id);
      });
    }

    if (table.views) {
      table.views.forEach((view, index) => {
        data.append(`views[${index}]`, view.id);
      });
    }

    try {
      await dispatch(EditRestaurantTableThunk({ id: table.id, formData: data })).unwrap();
      toast.success(t('Table status updated successfully'));
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error(err);
      toast.error(err?.message || t('Failed to update table status'));
    }
  }

  console.log('table' , table);

  return (
    <div className='grid grid-cols-2'>
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className='mt-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-[#E3E8EF] p-6 bg-white rounded-[6px]'
      >
        <div className='flex justify-end items-center'>
          <button 
            onClick={() => setSelectedTableId(null)}
            className='text-gray-400 hover:text-gray-700 hover:scale-110 active:scale-95 transition-all duration-150 font-medium cursor-pointer text-xl w-6 h-6 flex items-center justify-center'
          >
            ✕
          </button>
        </div>

        <div className='relative bg-white rounded-[8px] px-2'>
          <div className='flex justify-between'>
            <div className='flex gap-6 w-full'>
              {/* image/shape icon */}
              <div className='border border-blue-600/20 bg-[linear-gradient(180deg,_#1183FF_50.96%,_#0064D2_100%)] flex justify-center items-center rounded-[8px] text-[#FCFCFD] w-35 h-25 shadow-xs'>
                <p className='text-2xl font-bold'>{table?.code}</p>
              </div>

              <div className='flex flex-col gap-4 justify-center w-full'>
                <div className='flex gap-1 text-[#4B5565] text-base font-normal'>
                  <p className=''>{table?.views?.[0]?.name || t('No specific view')}</p>
                  <p>-</p>
                  <p>{table?.shape}</p>
                </div>

                <div className=''>
                  <p className='flex gap-1.5 items-center border border-[#CDD5DF] bg-[#F8FAFC] w-fit px-3 py-1 rounded-full'>
                    <img src="/images/icons/user-group_grey.svg" className="w-4 h-4" alt="" />
                    <span className='text-[#4B5565] text-sm font-medium'>{table?.capacity} {t('Guests')}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */} 
          <div className='grid grid-cols-3 gap-4 pt-4 w-full'>
            <button 
              onClick={() => router.push(`/Pages/Halls/Tables/Edit?id=${table?.id}&hall_id=${hallId}`)}  
              className='flex items-center justify-center gap-2 rounded-[4px] border border-[#CDD5DF] bg-white hover:bg-slate-50 hover:border-slate-400 active:scale-[0.98] transition-all duration-150 px-2 h-11 w-full cursor-pointer font-medium text-slate-700 text-sm'
            >
              <img src="/images/icons/EditYellow.svg" className='w-5 h-5' alt="" />
              <span>{t('modification')}</span>
            </button>

            <button 
              onClick={handleToggleActive}
              className='flex items-center justify-center gap-2 rounded-[4px] border border-[#CDD5DF] bg-white hover:bg-slate-50 hover:border-slate-400 active:scale-[0.98] transition-all duration-150 px-2 h-11 w-full cursor-pointer font-medium text-slate-700 text-sm'
            >
              <img src={table?.is_active ? "/images/icons/shut-down.svg" : "/images/icons/checkmark-circle-true.svg"} className='w-5 h-5' alt="" />
              <span>{table?.is_active ? t('closing') : t('reactivation')}</span>
            </button>

            <button 
              onClick={handleDelete} 
              className='flex items-center justify-center gap-2 rounded-[4px] border border-red-200 bg-red-50 hover:bg-red-100 hover:border-red-300 active:scale-[0.98] transition-all duration-150 px-2 h-11 w-full cursor-pointer font-medium text-red-700 text-sm'
            >
              <img src="/images/icons/delete-darkRed.svg" className='w-5 h-5' alt="" />
              <span>{t('delete')}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Cards