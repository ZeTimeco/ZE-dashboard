import React from 'react'

function CardOfService() {
  const activity_status = "active" //or "inactive"
  return (
    <>

      <section className='shadow-[0_0_4px_0_#0000004D] p-3'>
        <div className='relative w-full'>
          <img src="/images/testyImage.svg" alt="" className='w-full' />
          <p className='absolute top-2 right-2'>right</p>
          <p className='absolute top-2 left-2'>left</p>
        </div>
      </section>

    </>
  )
}

export default CardOfService