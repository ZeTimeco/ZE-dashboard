"use client"
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';

function ImageUpload() {
  const {t} = useTranslation()
  
  const MAX_IMAGES = 7;
  const fileInputRef = useRef(null);
  
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > MAX_IMAGES) {
      alert(`Maximum number of photos ${MAX_IMAGES}`);
      return;
    }

    setImages((prev) => [...prev, ...files]);

    setPreviewImages((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const handleDelete = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };


  return (
    <>
    {/* upload image */}
    <div className="flex flex-col gap-2">
      <p className='text-base font-medium'>
        <span className='text-[#364152] '>{t('Photos of the hall')}</span>
        <span className='text-[#F04438]'>*</span>
      </p>
      <div
        onClick={() => fileInputRef.current.click()}
        className="w-full p-8 border border-dashed border-[#9AA4B2] cursor-pointer rounded-md"
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
            <div className="bg-[#E3E8EF] w-14 h-14 rounded-full flex items-center justify-center">
              <div className="bg-[#EEF2F6] w-12 h-12 rounded-full flex items-center justify-center">
                <img src="/images/icons/upload images.svg" alt="upload" />
              </div>
            </div>
            <p className="text-center text-sm">
              <span className="font-semibold text-[#364152]">{t("Click to upload")}</span>{" "}
              <span className="font-medium text-[#9AA4B2]">{t("Or drag and drop files")}</span>
            </p>
            <p className="text-[#494C4D] text-sm font-normal">
              ({t("Maximum")} 15MB) SVG, PNG, JPG
            </p>
            <p className="text-sm font-normal">
              <span className="text-[#9AA4B2]">{t("Maximum number of photos")} :</span>{" "}
              <span className="text-[#202939]">{MAX_IMAGES} {t("Photos")}</span>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-4">
            {previewImages.map((src, idx) => (
              <div key={idx} className="relative w-32.5 h-27.5 border border-[#C8C8C8] rounded-[6px] overflow-hidden flex items-center justify-center">
                <img src={src} alt={`uploaded-${idx}`} className="w-full h-full object-cover" />
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(idx); }}
                  className="absolute top-2 left-2 bg-[#FEE4E2] border border-[#F04438] rounded-[3px] p-1"
                >
                  <img src="/images/icons/delete Red.svg" alt="delete" />
                </button>
              </div>
            ))}

            {previewImages.length < MAX_IMAGES && (
              <button
                onClick={(e) => { e.stopPropagation(); fileInputRef.current.click(); }}
                className="w-28 h-28 border border-[#CDD5DF] bg-[#F8FAFC] rounded-[6px] flex items-center justify-center"
              >
                <img src="/images/icons/AddGrayIcon.svg" alt="add" />
              </button>
            )}
          </div>
        )}

        {previewImages.length >= MAX_IMAGES && (
          <div className="flex gap-2 mt-4 bg-[#FFFCF5] border border-[#FEC84B] rounded-md px-3 py-1.5 text-sm">
            <img src="/images/icons/i.svg" alt="info" />
            <p>{t("You have reached the maximum number of image uploads (7 images). If you want to upload a new image, please delete an existing image first.")}</p>
          </div>
        )}
      </div>

    
    </div>
    </>
  )
}

export default ImageUpload