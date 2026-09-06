"use client";

import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

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
      toast.warning(`${t('Maximum number of photos')} ${MAX_IMAGES}`);
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
    <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4 rounded-[3px] bg-white mt-6'>
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

      <div className="w-full p-4 border border-dashed border-[#9AA4B2] hover:border-[var(--color-primary)] rounded-[3px] transition-colors duration-200">
        <input
          ref={fileInputRef}
          type="file"
          accept=".png,.jpg,.jpeg,.webp"
          className="hidden"
          onChange={handleFilesChange}
        />

        {previewImages.length === 0 ? (
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => fileInputRef.current.click()}
            className="flex flex-col items-center justify-center gap-4 cursor-pointer py-4"
          >
            <img src="/images/icons/image-add--gray.svg" alt="" className="w-8 h-8" />
            <p className="text-base font-medium text-[#364152]">
              {t("Add image")}
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {previewImages.map((src, index) => (
              <div
                key={index}
                className="relative aspect-square border border-[#E5E7EB] rounded-[3px] overflow-hidden group shadow-2xs"
              >
                <img src={src} alt="preview" className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105" />
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleDelete}
                  className="absolute top-1.5 right-1.5 bg-[#00000080] hover:bg-[#000000b0] w-6 h-6 flex items-center justify-center rounded-full cursor-pointer transition-colors"
                >
                  <img src="/images/icons/x_white.svg" alt="" className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;