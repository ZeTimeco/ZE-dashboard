'use client'
import React from 'react'
import NewOrdersPage from './NewOrders/page'
import CurrentOrdersPage from './CurrentOrders/page'
import { useSelector } from 'react-redux'

function StreetAssistantServiceCardPage({current_module_key}) {
      const {ongoingBookings,newBookings , loading ,error}= useSelector((state)=>state.Home)
  
  const newOrders = newBookings ;

  const currentOrders = ongoingBookings ;

  const isNewOrdersEmpty = newOrders.length === 0;
  const isCurrentOrdersEmpty = currentOrders.length === 0;

  if (isNewOrdersEmpty && !isCurrentOrdersEmpty) {
    return <CurrentOrdersPage orders={currentOrders} layout="grid" />;
  }

  if (!isNewOrdersEmpty && isCurrentOrdersEmpty) {
    return <NewOrdersPage orders={newOrders} layout="grid" />;
  }

  return (
    <>
      <div className={`grid grid-cols-1 lg1:grid-cols-2 gap-6`}>
        <NewOrdersPage orders={newOrders} />
        <CurrentOrdersPage orders={currentOrders} />
      </div>
    </>
  )
}

export default StreetAssistantServiceCardPage