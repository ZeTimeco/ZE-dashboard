"use client";

import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

function Images() {
  const { t } = useTranslation();
  const fileInputRef = useRef(null);

  const [images, setImages] = useState([]);

  const imagePreviews = images.map((file) => ({
    id: `${file.name}-${file.size}`,
    url: URL.createObjectURL(file),
    name: file.name,
  }));

  const handleAddImage = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const remaining = 5 - images.length;
    const selectedFiles = files.slice(0, remaining);

    setImages((prev) => [...prev, ...selectedFiles]);

    e.target.value = "";
  };

  const handleRemoveImage = (id) => {
    setImages((prev) =>
      prev.filter((file) => `${file.name}-${file.size}` !== id)
    );
  };

  return (
    <div className="shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4 rounded-[3px]">
      <p className="text-[#364152] text-base font-normal">
        {t("Restaurant photos")}
      </p>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleAddImage}
      />

      {imagePreviews.length > 0 && (
        <div className="grid grid-cols-5 gap-3 mb-3 mt-3">
          {imagePreviews.map((img) => (
            <div
              key={img.id}
              className="relative group rounded-[3px] overflow-hidden border border-[#CDD5DF] aspect-square"
            >
              <img
                src={img.url}
                alt={img.name}
                className="w-full h-full object-cover"
              />

              <button
                type="button"
                onClick={() => handleRemoveImage(img.id)}
                className="absolute top-1 right-1 w-5 h-5 bg-[#F04438] text-white rounded-[3px] flex items-center justify-center text-base opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {imagePreviews.length < 5 && (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full border border-dashed border-[#CDD5DF] p-4 flex flex-col items-center gap-2 rounded-[3px] cursor-pointer"
        >
          <img src="/images/icons/image-add--gray.svg" alt="" />
          <p className="text-[#4B5565] text-sm font-normal">
            {t("Add image")}
          </p>
        </button>
      )}
    </div>
  );
}

export default Images;