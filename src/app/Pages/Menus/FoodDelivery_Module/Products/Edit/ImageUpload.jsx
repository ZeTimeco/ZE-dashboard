"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { IMAGE_BASE_URL } from '../../../../../../../config/imageUrl';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const MAX_IMAGES = 5;

function UploadImage({ formData, setFormData ,existingImages}) {
  const { t } = useTranslation();

  const fileInputRef = useRef(null);
  const [previewImages, setPreviewImages] = useState([]); 
  const [serverImages, setServerImages] = useState([]);  

  useEffect(() => {
    setServerImages(existingImages || []);
    if (!formData?.images?.length) {
      setPreviewImages([]);
    }
  }, [existingImages, formData?.images?.length, formData?.keep_image_ids?.length]);

  const getImageUrl = (src) => {
    if (!src) return '';
    if (src.startsWith('blob:') || src.startsWith('http://') || src.startsWith('https://')) return src;
    if (src.startsWith('/storage/')) return `${IMAGE_BASE_URL}${src}`;
    if (src.startsWith('storage/')) return `${IMAGE_BASE_URL}/${src}`;
    return `${IMAGE_BASE_URL}${src}`;
  };

  const totalCount = serverImages.length + previewImages.length;

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    if (totalCount + files.length > MAX_IMAGES) {
      toast.warning(`${t('Maximum number of photos')} ${MAX_IMAGES}`);
      return;
    }

    const newPreviews = files.map((file) => URL.createObjectURL(file));

    setFormData((prev) => ({
      ...prev,
      images: [...(prev.images || []), ...files],
    }));

    setPreviewImages((prev) => [...prev, ...newPreviews]);
    e.target.value = '';
  };

  // Delete a newly uploaded (local) image
  const handleDeleteNew = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index),
    }));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteServer = (imgId) => {
    setServerImages((prev) => prev.filter((img) => img.id !== imgId));
    setFormData((prev) => ({
      ...prev,
      keep_image_ids: (prev.keep_image_ids || []).filter((id) => id !== imgId),
    }));
  };

  return (
    <div>
      <div className='flex justify-between mb-4'>
        <p className='flex items-center gap-1.5'>
          <img src="/images/icons/album-blue.svg" className="w-6 h-6" />
          <span className='text-[#364152] text-base font-medium'>{t('Product image')}</span>
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="w-full p-6 border border-dashed border-[#9AA4B2] rounded-[3px] hover:border-[var(--color-primary)] transition-colors duration-200">
          <input
            type="file"
            ref={fileInputRef}
            multiple
            accept=".png,.jpg,.jpeg,.webp"
            className="hidden"
            onChange={handleFilesChange}
          />

          {totalCount === 0 ? (
            // Empty state
            <div className="flex flex-col items-center justify-center gap-4 py-4">
              <p>
                <img src="/images/icons/upload_file_blue.svg" alt="" className="w-12 h-12" />
              </p>
              <p className="text-base font-medium text-[#364152]">{t('Download images')}</p>
              <p className="text-sm text-[#9AA4B2] font-normal">{t('Drag and drop or tap to select')}</p>
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => fileInputRef.current.click()}
                className="border border-[var(--color-primary)] text-[var(--color-primary)] rounded-[3px] cursor-pointer h-14 w-[20%] hover:bg-[#FFFDF5] font-medium transition-all duration-200"
              >
                {t('Upload file')}
              </motion.button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 w-full">
              {/* Existing server images */}
              {serverImages.map((img) => (
                <div
                  key={`server-${img.id}`}
                  className="relative w-full aspect-square border border-[#E5E7EB] rounded-[3px] overflow-hidden group shadow-2xs"
                >
                  <img
                    src={getImageUrl(img.image)}
                    alt="product"
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDeleteServer(img.id)}
                    className="absolute top-1.5 right-1.5 bg-[#00000080] hover:bg-[#000000b0] w-6 h-6 flex justify-center items-center rounded-full cursor-pointer transition-colors"
                  >
                    <img src="/images/icons/x_white.svg" alt="" className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              ))}

              {/* Newly uploaded images */}
              {previewImages.map((src, idx) => (
                <div
                  key={`new-${idx}`}
                  className="relative w-full aspect-square border border-[#E5E7EB] rounded-[3px] overflow-hidden group shadow-2xs"
                >
                  <img
                    src={src}
                    alt="preview"
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDeleteNew(idx)}
                    className="absolute top-1.5 right-1.5 bg-[#00000080] hover:bg-[#000000b0] w-6 h-6 flex justify-center items-center rounded-full cursor-pointer transition-colors"
                  >
                    <img src="/images/icons/x_white.svg" alt="" className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              ))}

              {/* Add more slot */}
              {totalCount < MAX_IMAGES && (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => fileInputRef.current.click()}
                  className="w-full aspect-square cursor-pointer border bg-[#F8FAFC] border-dashed border-[#CDD5DF] hover:border-[var(--color-primary)] hover:bg-[#FFFDF5] flex items-center justify-center rounded-[3px] transition-all duration-150"
                >
                  <img src="/images/icons/AddGrayIcon.svg" alt="" className="w-6 h-6" />
                </motion.button>
              )}
            </div>
          )}

          {totalCount >= MAX_IMAGES && (
            <p className="mt-2 text-sm text-[var(--color-primary)] font-medium">
              {t('You reached max images. Delete one to add new.')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadImage;
