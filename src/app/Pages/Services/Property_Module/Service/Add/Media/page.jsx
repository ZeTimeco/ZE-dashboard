"use client"
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';

function MediaPage({prevStep , nextStep }) {
  const {t} = useTranslation();

  const imageNote = [
    {id:1 , title:t('Use natural light when possible')},
    {id:2 , title:t('View all rooms and amenities')},
    {id:3 , title:t('Keep spaces clean and organized')},
    {id:4 , title:t('Including outdoor and neighborhood shots')},
  ]

  const imageRequirement = [
    {id:1 , title:t('Limit 5 photos (6/5)')},
    {id:2 , title:t('The primary image was selected')},
    {id:3 , title:t('Add a photo of the dining area (recommended)')},
    {id:4 , title:t('Add a neighborhood photo (recommended)')},
  ]

  //upload images
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]); // files
  const [previewImages, setPreviewImages] = useState([]); // urls

  const MAX_IMAGES = 7;

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > MAX_IMAGES) {
      alert(`Maximum number of photos ${MAX_IMAGES}`);
      return;
    }

    // save files
    setImages((prev) => [...prev, ...files]);

    // preview
    const newPreviews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviewImages((prev) => [...prev, ...newPreviews]);
  };

  const handleDelete = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
    <div className='border border-[#E6E6E6] p-8 rounded-[3px]'>
      <div>
        <p className='text-[#364152] text-xl font-medium mb-3'>
          <span>{t('Step')} 8 :</span>
          <span>{t('Media')}</span>
        </p>
        <p className='text-[#697586] text-base font-normal'>{t('Enter the media details to begin adding them.')}</p>
        <div className='border border-[#CDD5DF] my-4'></div>
      </div>
      

      <div>
        <p className='text-[#364152] text-lg font-medium'>{t('Property photos')}</p>
        <p>{t('Add at least 5 high-quality photos to showcase your property.')}</p>
      </div>

      {/* note */}
      <div className='bg-[#F8FAFC] border border-[#EEF2F6] rounded-[3px] p-3 my-4'>
        <p className='flex gap-1'>
          <img src="/images/icons/ii_blue.svg" className="w-6 h-6" />
          <span className='text-[#364152] text-base font-medium'>{t('Recommendations before adding images')}</span>
        </p>
        <ul className='grid grid-cols-2 gap-3 mt-4 list-disc pr-6'>
          {imageNote?.map((item)=>(
            <li key={item?.id} className='text-[#4B5565] text-base font-normal'>{item?.title}</li>
          ))}
        </ul>
      </div>


      {/* upload image */}
      <div className="flex flex-col gap-6">
        <div
          className="w-full p-8 border border-dashed border-[#9AA4B2]  rounded-md"
        >
          <input
            type="file"
            ref={fileInputRef}
            multiple
            accept=".svg,.png,.jpg,.jpeg"
            className="hidden"
            onChange={handleFilesChange}
          />

          {previewImages.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="">
                <img src="/images/icons/upload_file_blue.svg" alt="" />
              </p>
              <p className="text-base font-medium text-[#364152] ">  {t('Download images')}  </p>
              <p className="text-sm text-[#9AA4B2] font-normal">  {t('Drag and drop or tap to select')}  </p>

              <button 
                onClick={() => fileInputRef.current.click()} 
                className="border border-[var(--color-primary)] text-[var(--color-primary)] rounded-[3px] cursor-pointer h-14 w-[20%]"
              >
                {t('Upload file')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-4">
              {previewImages.map((src, idx) => (
                <div
                  key={idx}
                  className="relative w-28 h-28 border rounded overflow-hidden"
                >
                  <img
                    src={src}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                  <div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(idx);
                      }}
                      className="absolute top-1 right-1 bg-[#00000080] w-5 h-5 flex justify-center items-center rounded-full cursor-pointer"
                    >
                      <img src="/images/icons/x_white.svg" alt="" />
                    </button>

                    <button
                      className="absolute top-1 left-1 bg-[white] w-6 h-6 flex justify-center items-center rounded-full cursor-pointer"
                    >
                      <img src="/images/icons/star_black2.svg" alt="" />
                    </button>
                  </div>
                </div>
              ))}

              {previewImages.length < MAX_IMAGES && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current.click();
                  }}
                  className="w-28 h-28 cursor-pointer border bg-[#F8FAFC] border-dashed border-[#CDD5DF] flex items-center justify-center"
                >
                  <img src="/images/icons/AddGrayIcon.svg" alt="" />
                </button>
              )}
            </div>
          )}

          {previewImages.length >= MAX_IMAGES && (
            <p className="mt-4 text-sm text-yellow-600">
              You reached max images. Delete one to add new.
            </p>
          )}
        </div>
      </div>




      {/* note */}
      <div className='bg-[#F8FAFC] border border-[#EEF2F6] rounded-[3px] p-3 my-4'>
        <p className='flex gap-1'>
          <img src="/images/icons/ii_blue.svg" className="w-6 h-6" />
          <span className='text-[#364152] text-base font-medium'>{t('Recommendations before adding images')}</span>
        </p>
        <ul className='grid grid-cols-2 gap-3 mt-4 '>
          {imageRequirement?.map((item)=>(
            <div key={item?.id}  className='flex gap-2 pr-1'>
              <p className='flex items-center'>
                <img src="/images/icons/ii.svg" className="w-3.5 h-3.5 " />
              </p>
              <li className='text-[#4B5565] text-base font-normal'>{item?.title}</li>
            </div>
          
          ))}
        </ul>
      </div>











      {/* btn */}
      <div className="flex justify-between mt-6">
        <div className='w-full '>
          <button
            onClick={prevStep}
            className=" w-[25%] h-15 border border-[#697586] text-[#697586] rounded-[3px] cursor-pointer"
          >
            {t('the previous')}
          </button>
        </div>
        
        <div className='flex gap-2 justify-end w-full '>
          <button
            className="h-15 w-[30%]  border border-[#697586] text-[#697586] rounded-[3px] cursor-pointer"
          >
            {t('Save draft')}
          </button>

          <button
            onClick={nextStep}
            className="h-15 w-[25%] bg-[var(--color-primary)] text-white rounded-[3px] cursor-pointer"
          >
            {t('the next')}
          </button>
        </div>
        
      </div>
    </div>
    </>
  )
}

export default MediaPage