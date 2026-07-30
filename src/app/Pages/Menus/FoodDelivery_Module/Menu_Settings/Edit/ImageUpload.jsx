"use client";

import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const MAX_IMAGES = 5;

function ImageUpload() {
  const { t } = useTranslation();

  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);

    if (previewImages.length + files.length > MAX_IMAGES) {
      alert(`Maximum number of photos ${MAX_IMAGES}`);
      return;
    }

    setImages((prev) => [...prev, ...files]);
    setPreviewImages((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);

    e.target.value = "";
  };

  const handleDelete = (index) => {
    URL.revokeObjectURL(previewImages[index]);

    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4  roundd-[3px]'>
      <div className="flex justify-between mb-3">
        <p className="flex flex-col ">
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
          multiple
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
                <img
                  src={src}
                  alt="preview"
                  className="w-full h-full object-cover"
                />

                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  className="absolute top-1 right-1 bg-[#00000080] w-5 h-5 flex items-center justify-center rounded-full"
                >
                  <img src="/images/icons/x_white.svg" alt="" />
                </button>
              </div>
            ))}

            {previewImages.length < MAX_IMAGES && (
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="aspect-square border border-dashed border-[#CDD5DF] rounded-[3px] flex items-center justify-center bg-[#F8FAFC]"
              >
                <img src="/images/icons/AddGrayIcon.svg" alt="" />
              </button>
            )}
          </div>
        )}

        {previewImages.length >= MAX_IMAGES && (
          <p className="mt-2 text-sm text-[var(--color-primary)]">
            {t("You reached max images. Delete one to add new.")}
          </p>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;