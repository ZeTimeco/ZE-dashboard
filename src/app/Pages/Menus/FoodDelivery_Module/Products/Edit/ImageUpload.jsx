"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { IMAGE_BASE_URL } from '../../../../../../../config/imageUrl';

const MAX_IMAGES = 5;

function UploadImage({ formData, setFormData, existingImages = [] }) {
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
      alert(`Maximum number of photos ${MAX_IMAGES}`);
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
    <>
      <div>
        <div className='flex justify-between mb-4'>
          <p className='flex gap-1'>
            <img src="/images/icons/album-blue.svg" className="w-6 h-6" />
            <span className='text-[#364152] text-base font-medium'>{t('Product image')}</span>
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="w-full p-4 border border-dashed border-[#9AA4B2] rounded-[3px]">
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
              <div className="flex flex-col items-center justify-center gap-4">
                <p>
                  <img src="/images/icons/upload_file_blue.svg" alt="" />
                </p>
                <p className="text-base font-medium text-[#364152]">{t('Download images')}</p>
                <p className="text-sm text-[#9AA4B2] font-normal">{t('Drag and drop or tap to select')}</p>
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="border border-[var(--color-primary)] text-[var(--color-primary)] rounded-[3px] cursor-pointer h-14 w-[20%]"
                >
                  {t('Upload file')}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-5 gap-2 w-full">
                {/* Existing server images */}
                {serverImages.map((img) => (
                  <div
                    key={`server-${img.id}`}
                    className="relative w-full aspect-square border border-[#E5E7EB] rounded-[3px] overflow-hidden"
                  >
                    <img
                      src={getImageUrl(img.image)}
                      alt="product"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteServer(img.id)}
                      className="absolute top-1 right-1 bg-[#00000080] w-5 h-5 flex justify-center items-center rounded-full cursor-pointer"
                    >
                      <img src="/images/icons/x_white.svg" alt="" />
                    </button>
                  </div>
                ))}

                {/* Newly uploaded images */}
                {previewImages.map((src, idx) => (
                  <div
                    key={`new-${idx}`}
                    className="relative w-full aspect-square border border-[#E5E7EB] rounded-[3px] overflow-hidden"
                  >
                    <img
                      src={src}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteNew(idx)}
                      className="absolute top-1 right-1 bg-[#00000080] w-5 h-5 flex justify-center items-center rounded-full cursor-pointer"
                    >
                      <img src="/images/icons/x_white.svg" alt="" />
                    </button>
                  </div>
                ))}

                {/* Add more slot */}
                {totalCount < MAX_IMAGES && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="w-full aspect-square cursor-pointer border bg-[#F8FAFC] border-dashed border-[#CDD5DF] flex items-center justify-center rounded-[3px]"
                  >
                    <img src="/images/icons/AddGrayIcon.svg" alt="" />
                  </button>
                )}
              </div>
            )}

            {totalCount >= MAX_IMAGES && (
              <p className="mt-2 text-sm text-[var(--color-primary)]">
                {t('You reached max images. Delete one to add new.')}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadImage
