import { Dialog } from '@mui/material'
import React from 'react'

function ViewsPage({open , setOpen}) {
  return (
    <>
      <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "rerquest-dialog" }}
    >
      {/* Close Button */}
      <section className="px-6 mt-6 flex justify-end">
        <button
          onClick={()=>{setOpen(false)}}
          className="border border-[#CDD5DF] w-12 h-12 rounded-[100px] flex justify-center items-center cursor-pointer"
        >
          <img src="/images/icons/xx.svg" alt="" className="w-6 h-6" />
        </button>
      </section>
    </Dialog>

    </>
  )
}

export default ViewsPage