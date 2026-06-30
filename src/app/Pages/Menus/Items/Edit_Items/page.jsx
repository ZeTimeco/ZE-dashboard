'use client'
import { Dialog } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Form from './Form'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoriesThunk, showFullItemThunk, editItemThunk, getItemsDetailsThunk, getItemsThunk, getItemByIdThunk } from '@/redux/slice/Menus/MenusSlice'

function Edit_ItemsPage({open , setOpen ,itemID ,categoryID}) {
  const {t} = useTranslation()
    console.log('itemID####' , itemID);
  //api
  const dispatch = useDispatch()
  const {getCategories , showFullItem} = useSelector((state)=>state.Menus)
  useEffect(()=>{
    dispatch(getCategoriesThunk())
  },[dispatch])



  useEffect(()=>{
    if(itemID){
      dispatch(showFullItemThunk(itemID))
    }
  },[dispatch , itemID])

  console.log("showFullItem", showFullItem);

  const [formData , setFormData] = useState({
    name: {
      ar: "",
      en: "",
    },
    description: {
      ar: "",
      en: "",
    },
    category_id:'',
    images:[],
    base_price:'',
    prep_time_min:'',
    calories:'',
    availability_type:'',
    status: '',
    is_visible: 1,
  })

useEffect(() => {
  if (showFullItem) {
    setFormData({
      name: {
        ar: showFullItem.name_ar || "",
        en: showFullItem.name_en || "",
      },
      description: {
        ar: showFullItem.description_ar || "",
        en: showFullItem.description_en || "",
      },
      category_id: showFullItem.category_id || "",
      images: showFullItem.images || [],
      base_price: showFullItem.base_price || "",
      prep_time_min: showFullItem.prep_time_min || "",
      calories: showFullItem.calories || "",
      availability_type: showFullItem.availability_type || "",
      status: showFullItem.status,
      is_visible: Number(showFullItem.is_visible),
    });
  }
}, [showFullItem]);


const handleSubmit = async () => {
  try {
    const data = new FormData();

    data.append("name[ar]", formData.name.ar);
    data.append("name[en]", formData.name.en);

    data.append("description[ar]", formData.description.ar);
    data.append("description[en]", formData.description.en);

    data.append("category_id", formData.category_id);
    data.append("base_price", formData.base_price);
    data.append("prep_time_min", formData.prep_time_min);
    data.append("calories", formData.calories);
    data.append("availability_type", formData.availability_type);
    data.append("status", formData.status);
    data.append("is_visible", formData.is_visible);

    formData.images.forEach((img) => {
      if (img instanceof File) {
        data.append("images[]", img);
      }
    });

    await dispatch(
      editItemThunk({
        id: itemID,
        formData: data,
      })
    ).unwrap();
      await dispatch(getItemsDetailsThunk(itemID)).unwrap();
      await dispatch(getItemsThunk()).unwrap();
      await dispatch(getItemByIdThunk(categoryID)).unwrap();


    setOpen(false);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <>

      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ className: "rerquest-dialog" }}
      >
        {/* header */}
        <section className="flex justify-end px-6 mt-6">
          <button
            onClick={()=>setOpen(false)}
            className="border border-[#CDD5DF] w-12 h-12 rounded-[100px] flex justify-center items-center cursor-pointer"
          >
            <img src="/images/icons/xx.svg" alt="" className="w-6 h-6" />
          </button>
        </section>
        <section className="mt-4 px-6">
          <p className="text-[#364152] text-2xl font-medium mb-3">{t("Modify category")}</p>
          <p className="text-[#697586] text-xl font-normal mb-5">
            {t("Edit item data to display it more clearly")}
          </p>
        </section>
        <span className="border-[0.5px] border-[#E3E8EF]" />
  
        
        <div className='p-6'>
          <Form  getCategories={getCategories} formData={formData} setFormData={setFormData}/>
        </div>
  
        <span className="border-[0.5px] border-[#E3E8EF] my-5" />
  
        {/* btn */}
        <div className='px-6 flex gap-4 mb-6'>
          <button onClick={handleSubmit}  className=' w-[40%] bg-[var(--color-primary)] text-white text-base font-medium py-3 px-6 rounded-[3px]  cursor-pointer'>
            {t('Preserving the item')}
          </button>
          <button onClick={()=>setOpen(false)} className='w-[20%] border border-[var(--color-primary)] text-[var(--color-primary)] text-base font-medium py-3 px-6 rounded-[3px]  cursor-pointer'>
            {t('cancel')}
          </button>
          
        </div>
        
    </Dialog>
    


    </>
  )
}

export default Edit_ItemsPage