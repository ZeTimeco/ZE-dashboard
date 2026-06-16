'use client'
import { styled, Switch, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import React, { useState } from 'react'
import { useTranslation } from "react-i18next";
import EditPage from "./Edit/page";
import { IMAGE_BASE_URL } from "../../../../../config/imageUrl";
import ConfirmDelete from "./ConfirmDelete";

function CardOfViews({getViews , handleDelete ,handleToggle, refreshViews}) {
  const {t} = useTranslation()
  const GreenSwitch = styled(Switch)(({ theme }) => ({
    width: 53,
    height: 24,
    padding: 0,

    "& .MuiSwitch-switchBase": {
      margin: 3,
      padding: 0,
      transitionDuration: `${theme.transitions.duration.standard}ms`,

      "&.Mui-checked": {
        transform: "translateX(29px)",
        color: "#fff",

        "& + .MuiSwitch-track": {
          backgroundColor: "#10B981",
          opacity: 1,
          border: 0,
        },

        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },

      "&.Mui-focusVisible .MuiSwitch-thumb": {
        border: "4px solid #fff",
      },

      "&.Mui-disabled .MuiSwitch-thumb": {
        color: theme.palette.grey[300],
      },
    },

    "& .MuiSwitch-thumb": {
      width: 18,
      height: 18,
      boxSizing: "border-box",
    },

    "& .MuiSwitch-track": {
      borderRadius: 12,
      backgroundColor: "#E9E9EA",
      opacity: 1,
      transition: theme.transitions.create("background-color", {
        duration: theme.transitions.duration.standard,
      }),
    },
  }));

  const StatusRender = (status) => {
    switch (status) {

      case 'right': //الجانب الايمن 
        return (
          <div className=' bg-[#FEE4E2] border border-[#F04438] text-[#F04438] w-fit  h-7.5 rounded-full flex justify-center items-center '>
            <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex  items-center justify-center gap-1'>
              <span className='text-xs lg1:text-sm'>{t('Right side')}</span>
            </div>
          </div>
        );

      case 'left': //الجانب الأيسر
        return (
          <div className=' bg-[#DAECFF] border border-[#007AFF] text-[#007AFF] w-fit  h-7.5 rounded-full flex  items-center '>
            <div className='py-1 px-2 flex  items-center justify-center  gap-1'>
              <span className='text-xs lg1:text-sm'>{t('Left side')}</span>
            </div>
          </div>
        );

      case 'top': //الجانب العلوي 
        return (
          <div className=' bg-[#FFEFD8] border border-[#FF9500] text-[#FF9500] w-fit  h-7.5 rounded-full flex  items-center '>
            <div className='py-1 px-2 flex  items-center justify-center  gap-1'>
              <span className='text-xs lg1:text-sm'>{t('Top side')}</span>
            </div>
          </div>
        );

      case 'bottom': //الجانب السفلي
        return (
          <div className=' bg-[#DCFAE6] border border-[#17B26A] text-[#17B26A] w-fit  h-7.5 rounded-full flex  items-center '>
            <div className='py-1 px-2 flex  items-center justify-center  gap-1'>
              <span className='text-xs lg1:text-sm'>{t('Bottom side')}</span>
            </div>
          </div>
        );

    }
  }

  const [openEdit , setOpenEdit] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

console.log(getViews);
const [selectedViewId, setSelectedViewId] = useState(null);
  return (
    <>

      <div className='grid grid-cols-1  lg1:grid-cols-2 gap-6'>
        {getViews?.data?.map((view)=>(
          <div key={view?.id} className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] cursor-pointer rounded-[3px] p-3 '>

          {/*  */}
          <div className="flex justify-between">
            <div className='flex gap-4'>
              <p
                className="w-15 h-14 flex items-center justify-center rounded-[3px]"
                style={{ background: view?.hex_code }}
              >
                <img src={`${IMAGE_BASE_URL}${view?.icon}`} alt="" />
              </p>
              <p className='text-[#364152] text-xl font-normal flex items-center'>{view?.name}</p>

            </div>

            <div className="flex items-center">
              <GreenSwitch checked={view?.status} onChange={() => handleToggle(view?.id)}/>
            </div>

          </div>

          {/*  */}
          <div className="flex justify-between mt-2">
            <p className="text-[#697586] text-base font-normal"> 
              {view?.status === true ? t('Visible to customers') : t('Invisible to customers')}
            </p>
            <div>
              {StatusRender(view?.side)}
            </div>
          </div>

          {/* btn */} 
          <div className="grid grid-cols-2 gap-6 mt-4">
            <button  
              onClick={() => {
                setSelectedViewId(view?.id);
                setOpenEdit(true);
              }} 
              className='flex items-center justify-center gap-1 rounded-[3px] border border-[#E3E8EF] px-2 h-10 w-full cursor-pointer'
            >
              <img src="/images/icons/EditYellow.svg" className='w-5 h-5' alt="" />
              <p className='text-[#364152] text-sm font-normal'>{t('modification')}</p>
            </button>

            <button onClick={() => setDeleteId(view?.id)} className='flex items-center justify-center  gap-1 rounded-[3px] border border-[#E3E8EF] px-2 h-10 w-full cursor-pointer'>
              <img src="/images/icons/delete-darkRed.svg" className='w-5 h-5' alt="" />
              <p className='text-[#364152] text-sm font-normal'>{t('delete')}</p>
            </button>

          </div>

          

          </div>
        ))}
        
      </div>

      <EditPage
        open={openEdit}
        setOpen={setOpenEdit}
        viewId={selectedViewId}
        refreshViews={refreshViews}
      />

      {/* Confirm Delete Dialog */}
          <ConfirmDelete 
          deleteId={deleteId}
          setDeleteId={setDeleteId}
          handleDelete={handleDelete}
          />

    </>
    
  )
}

export default CardOfViews