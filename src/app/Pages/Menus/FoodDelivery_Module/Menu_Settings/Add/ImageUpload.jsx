
"use client";

import React, { useRef } from "react";
import { useTranslation } from "react-i18next";

const MAX_IMAGES = 1;

function ImageUpload({ formData, setFormData }) {
  const { t } = useTranslation();
  const fileInputRef = useRef(null);

  const previewImages = formData.image
    ? [URL.createObjectURL(formData.image)]
    : [];

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    if (previewImages.length + files.length > MAX_IMAGES) {
      alert(`Maximum number of photos ${MAX_IMAGES}`);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      image: files[0],
      remove_image: 0,
    }));

    e.target.value = "";
  };

  const handleDelete = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
      remove_image: 1,
    }));
  };

  return (
    <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4 roundd-[3px]'>
      <div className="flex justify-between mb-3">
        <p className="flex flex-col">
          <span className="text-[#364152] text-base font-normal">
            {t("Image category")}
          </span>
          <span className="text-[#4B5565] text-sm font-normal">
            {t("Upload an image for the category (optional)")}
          </span>
        </p>
      </div>

      <div className="w-full p-4 border border-dashed border-[#9AA4B2] rounded-[3px]">
        <input
          ref={fileInputRef}
          type="file"
          accept=".png,.jpg,.jpeg,.webp"
          className="hidden"
          onChange={handleFilesChange}
        />

        {previewImages.length === 0 ? (
          <div
            onClick={() => fileInputRef.current.click()}
            className="flex flex-col items-center justify-center gap-4 cursor-pointer"
          >
            <img src="/images/icons/image-add--gray.svg" alt="" />
            <p className="text-base font-medium text-[#364152]">
              {t("Add image")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-2">
            {previewImages.map((src, index) => (
              <div
                key={index}
                className="relative aspect-square border border-[#E5E7EB] rounded-[3px] overflow-hidden"
              >
                <img src={src} alt="preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={handleDelete}
                  className="absolute top-1 right-1 bg-[#00000080] w-5 h-5 flex items-center justify-center rounded-full"
                >
                  <img src="/images/icons/x_white.svg" alt="" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;