import React from 'react'

function DetailsPage() {
  return (
    <>
      <div className='mb-6 grid grid-cols-2 gap-4'>
        <div className='w-[30%]'>
          <img src="/images/testyImage.svg" alt="" />
        </div>

        <div className='w-[70%]'>
          <p>شقة حديثة من غرفتي نوم في الجديدة القاهرة </p>
          <ul className="flex items-center gap-2 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
              2 سرير
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
              2 حمام
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
              4 ضيوف
            </li>
          </ul>
          
        </div>

      </div>

    </>
  )
}

export default DetailsPage