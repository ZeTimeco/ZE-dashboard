"use client"
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Content from './Content'
import Header from './Header'
import NoTerms_PoliciesPage from './NoTerms_Policies'
import AddContent from './Add/AddContent'
import EditContent from './Edit/EditContent'

function Terms_PoliciesPage() {
  const {t} = useTranslation()
  const data = ["sd"]  
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)

  return (
    <>
      <div className='border border-[#E3E8EF] '>
        <Header/>
        <div className='px-6 py-4'>
          {isAdding ? (
            <AddContent onCancel={() => setIsAdding(false)} />
          ) : editingId !== null ? (
            <EditContent onCancel={() => setEditingId(null)} />
          ) : data?.length > 0 ? (
            <Content onEdit={(id) => setEditingId(id)} onAdd={() => setIsAdding(true)}/>
          ) : (
            <NoTerms_PoliciesPage onAdd={() => setIsAdding(true)} />
          )}
          
        
        
      
        </div>
      </div>

    </>
  )
}

export default Terms_PoliciesPage