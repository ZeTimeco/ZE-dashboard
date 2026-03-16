'use client'
import React from 'react'
import NewOrdersPage from './NewOrders/page'
import CurrentOrdersPage from './CurrentOrders/page'

function StreetAssistantServiceCardPage() {
  const newOrders = [
    {
      id: 1,
      service: "تشغيل بطارية",
      customer: "هاني سعيد",
      price: "40.00",
      distance: "32 كم",
      location: "شارع رئيسي 123 مدينة نصر",
    },
  ];

  const currentOrders = [
    {
      id: 1,
      service: "تشغيل بطارية",
      status: 'in_progress',
      customer: 'هاني سعيد',
    },
  ];

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