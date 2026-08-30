'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { IMAGE_BASE_URL } from '../../../../../../../../config/imageUrl';

function Image({service ,handleChange}) {
  const { t } = useTranslation();
  
  //upload images
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);
  const MAX_IMAGES = 7;

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > MAX_IMAGES) {
      alert(`${t("Maximum number of photos")} ${MAX_IMAGES}`);
      return;
    }
    const newImages = files.map(file => ({
      url: URL.createObjectURL(file), // For preview
      file: file, // For upload
      isNew: true
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const handleDelete = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (service?.images) {
      const existingImages = service.images.map(img => ({
        id: img.id,
        url: `${IMAGE_BASE_URL}${img.image_path}`,
        isNew: false
      }));
      setImages(existingImages);
    }
  }, [service]);

  // Sync images with parent form data
  useEffect(() => {
    // 1. Existing image IDs
    const existingIds = images
      .filter(img => !img.isNew)
      .map(img => img.id);

    // 2. New image files
    const newFiles = images
      .filter(img => img.isNew)
      .map(img => img.file);

    handleChange("image_ids", existingIds);
    handleChange("image_files", newFiles);
  }, [images]);


  return (

    <>
    <div
        onClick={() => fileInputRef.current.click()}
        className="w-full p-8 border border-dashed border-[#9AA4B2] cursor-pointer"
      >
        {/* hidden input */}
        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept=".svg,.png,.jpg,.jpeg"
          className="hidden"
          onChange={handleFilesChange}
        />

        {images.length === 0 ? (
          <>
            {/* icon */}
            <div className="flex items-center justify-center">
              <div className="bg-[#E3E8EF] w-14 h-14 rounded-full flex items-center justify-center">
                <div className="bg-[#EEF2F6] w-12 h-12 rounded-full flex items-center justify-center">
                  <img src="/images/icons/upload images.svg" alt="upload" />
                </div>
              </div>
            </div>

            {/* text */}
            <div className="flex flex-col items-center mt-5">
              <p className="text-sm text-center">
                <span className="text-[#364152] font-semibold">{t("Click to upload")} </span>
                <span className="text-[#9AA4B2] font-medium">{t("Or drag and drop files")}</span>
              </p>
              <p className="text-[#494C4D] text-sm font-normal m-3">
                ({t("Maximum")} 15MB) SVG, PNG, JPG
              </p>
              <p className="text-sm font-normal">
                <span className="text-[#9AA4B2]">{t("Maximum number of photos")} :</span>
                <span className="text-[#202939]"> {MAX_IMAGES} {t("Photos")}</span>
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-4 lg1:grid-cols-7 gap-4">
              {images.map((src, idx) => (
                <div
                  key={idx}
                  className="relative w-32.5 h-27.5 border border-[#C8C8C8] rounded-[6px] overflow-hidden flex  items-center justify-center"
                >
                  {/* image */}
                  <img
                    src={images[idx].url}
                    alt={`uploaded-${idx}`}
                    className="w-full h-full object-cover"
                  />

                  {/* delete button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // يمنع فتح input
                      handleDelete(idx);
                    }}
                    className="absolute top-3.5 left-3.5 bg-[#FEE4E2] border border-[#F04438] rounded-[3px] p-1"
                  >
                    <img src="/images/icons/delete Red.svg" alt="" />
                  </button>
                </div>
              ))}

              {/* زرار الإضافة */}
              {images.length < 7 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // يمنع تكرار الفتح
                    fileInputRef.current.click();
                  }}
                  className="w-28 h-28 py-6 px-7.5 border border-[#CDD5DF] bg-[#F8FAFC] rounded-[6px] flex items-center justify-center"
                >
                  <img src="/images/icons/AddGrayIcon.svg" alt="" />
                </button>
              )}
            </div>

            {/* الرسالة تحت الصور */}
            {images.length >= 7 && (
              <div className="flex gap-2 mt-6 bg-[#FFFCF5] border border-[#FEC84B] rounded-2xl px-3 py-1.5">
                <img src="/images/icons/i.svg" alt="" />
                <p>
                  {t(
                    "You have reached the maximum number of image uploads (7 images). If you want to upload a new image, please delete an existing image first."
                  )}
                </p>
              </div>
            )}
          </>
        )}
      </div>
      

    </>
  )
}

export default Image