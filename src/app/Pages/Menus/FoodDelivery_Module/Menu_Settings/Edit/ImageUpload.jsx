"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IMAGE_BASE_URL } from "../../../../../../../config/imageUrl";

function ImageUpload({ formData, setFormData }) {
  const { t } = useTranslation();

  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (
      formData?.image &&
      typeof formData.image === "string" &&
      !previewImage
    ) {
      if (formData.image.startsWith("http")) {
        setPreviewImage(formData.image);
      } else {
        setPreviewImage(`${IMAGE_BASE_URL}${formData.image}`);
      }
    }
  }, [formData?.image]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (previewImage.startsWith("blob:")) {
      URL.revokeObjectURL(previewImage);
    }

    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);

    setFormData((prev) => ({
      ...prev,
      image: file,
      remove_image: 0,
    }));

    e.target.value = "";
  };

  const handleDelete = () => {
    if (previewImage.startsWith("blob:")) {
      URL.revokeObjectURL(previewImage);
    }

    setPreviewImage("");

    setFormData((prev) => ({
      ...prev,
      image: null,
      remove_image: 1,
    }));
  };

  return (
    <div className="shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4 rounded-[3px]">
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
          onChange={handleFileChange}
        />

        {!previewImage ? (
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
          <div className="relative w-40 h-40 border border-[#E5E7EB] rounded-[3px] overflow-hidden">
            <img
              src={previewImage}
              alt="preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={handleDelete}
              className="absolute top-2 right-2 bg-[#00000080] w-6 h-6 rounded-full flex items-center justify-center"
            >
              <img src="/images/icons/x_white.svg" alt="" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;