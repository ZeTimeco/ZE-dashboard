'use client'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';

function ImageUpload() {
  const { t } = useTranslation();

  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleChooseImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
  };

  return (
    <div>
      <p className="text-[#364152] text-base font-normal mb-3">
        {t("Product image")}
      </p>

      <div
        onClick={handleChooseImage}
        className="border border-dashed border-[#C8C8C8] rounded-[6px] cursor-pointer overflow-hidden"
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-52 object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-1 p-6">
            <img src="/images/icons/image-add-gray.svg" alt="" />

            <p className="text-[#0F022E] text-sm font-normal">
              {t("Click to upload an image")}
            </p>

            <p className="text-xs font-normal">
              <span className="text-[#697586]">
                {t("It supports all formats")} :
              </span>{" "}
              <span className="text-[#202939]">
                WEBP, AVIF, PNG, JPG
              </span>
            </p>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".png,.jpg,.jpeg,.webp,.avif"
        className="hidden"
        onChange={handleImageChange}
      />
    </div>
  );
}

export default ImageUpload;