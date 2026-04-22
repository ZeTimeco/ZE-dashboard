"use client"
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

function MediaPage({prevStep , nextStep }) {
  const {t} = useTranslation();
  const router = useRouter();

  const imageNote = [
    {id:1 , title:t('Use natural light when possible')},
    {id:2 , title:t('View all rooms and amenities')},
    {id:3 , title:t('Keep spaces clean and organized')},
    {id:4 , title:t('Including outdoor and neighborhood shots')},
  ]



  //upload images
  const fileInputRef = useRef(null);

  // additional media
  const tourVideoRef = useRef(null);
  const propertyVideoRef = useRef(null);
  const [tourVideo, setTourVideo] = useState(null);
  const [propertyVideo, setPropertyVideo] = useState(null);
  const [images, setImages] = useState([]); // files
  const [previewImages, setPreviewImages] = useState([]); // urls

  const MAX_IMAGES = 6;
  // index of the main (selected) image, null if none selected
  const [mainIndex, setMainIndex] = useState(null);

  // drag & drop rearrangement
  const [isRearranging, setIsRearranging] = useState(false);
  const dragIndex = useRef(null);
  const dragOverIndex = useRef(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);

  const handleDragStart = (idx) => {
    dragIndex.current = idx;
  };

  const handleDragEnter = (idx) => {
    dragOverIndex.current = idx;
    setDragOverIdx(idx);
  };

  const handleDragEnd = () => {
    const from = dragIndex.current;
    const to = dragOverIndex.current;
    if (from === null || to === null || from === to) {
      dragIndex.current = null;
      dragOverIndex.current = null;
      setDragOverIdx(null);
      return;
    }
    // reorder both arrays
    const reorder = (arr) => {
      const copy = [...arr];
      const [moved] = copy.splice(from, 1);
      copy.splice(to, 0, moved);
      return copy;
    };
    setPreviewImages(reorder);
    setImages(reorder);
    // fix mainIndex after reorder
    setMainIndex((prev) => {
      if (prev === null) return null;
      if (prev === from) return to;
      if (from < to && prev > from && prev <= to) return prev - 1;
      if (from > to && prev >= to && prev < from) return prev + 1;
      return prev;
    });
    dragIndex.current = null;
    dragOverIndex.current = null;
    setDragOverIdx(null);
  };

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > MAX_IMAGES) {
      alert(`Maximum number of photos ${MAX_IMAGES}`);
      return;
    }

    // save files
    setImages((prev) => [...prev, ...files]);

    // preview
    const newPreviews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviewImages((prev) => [...prev, ...newPreviews]);
  };

  const handleDelete = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setMainIndex((prev) => {
      if (prev === null) return null;
      if (prev === index) return null;
      if (prev > index) return prev - 1;
      return prev;
    });
  };

  const isMinImagesReached = previewImages.length >= 5;
  const isMainSelected = mainIndex !== null;
  
  const imageRequirement = [
    {
      id: 1,
      title: t('Limit 5 photos (6/5)'),
      isValid: isMinImagesReached,
    },
    {
      id: 2,
      title: t('The primary image was selected'),
      isValid: isMainSelected,
    },
    {
      id: 3,
      title: t('Add a photo of the dining area (recommended)'),
      isValid: false,
    },
    {
      id: 4,
      title: t('Add a neighborhood photo (recommended)'),
      isValid: false,
    },
  ];

  return (
    <>
    <div className='border border-[#E6E6E6] p-8 rounded-[3px]'>
      <div>
        <p className='text-[#364152] text-xl font-medium mb-3'>
          <span>{t('Step')} 8 :</span>
          <span>{t('Media')}</span>
        </p>
        <p className='text-[#697586] text-base font-normal'>{t('Enter the media details to begin adding them.')}</p>
        <div className='border border-[#CDD5DF] my-4'></div>
      </div>
      

      <div>
        <p className='text-[#364152] text-lg font-medium'>{t('Property photos')}</p>
        <p>{t('Add at least 5 high-quality photos to showcase your property.')}</p>
      </div>

      {/* note */}
      <div className='bg-[#F8FAFC] border border-[#EEF2F6] rounded-[3px] p-3 my-4'>
        <p className='flex gap-1'>
          <img src="/images/icons/ii_blue.svg" className="w-6 h-6" />
          <span className='text-[#364152] text-base font-medium'>{t('Recommendations before adding images')}</span>
        </p>
        <ul className='grid grid-cols-2 gap-3 mt-4 list-disc pr-6'>
          {imageNote?.map((item)=>(
            <li key={item?.id} className='text-[#4B5565] text-base font-normal'>{item?.title}</li>
          ))}
        </ul>
      </div>


      {/* upload image */}
      <div>  
        <div className='flex justify-between mb-4'>
          <p className='flex gap-1'>
            <img src="/images/icons/album-blue.svg" className="w-6 h-6" />
            <span className='text-[#364152] text-base font-medium'>{t('Uploaded images')}</span>
          </p>

          {previewImages.length > 1 && (
            <button
              onClick={() => setIsRearranging((prev) => !prev)}
              className={`cursor-pointer flex gap-1 items-center px-3 py-1 rounded-[3px] transition-all duration-200 ${
                isRearranging
                  ? ''
                  : 'text-[#697586]'
              }`}
            >
              <img
                src={isRearranging ? "/images/icons/true.svg" : "/images/icons/add_gray.svg"}
                className={`${isRearranging ? 'w-5 h-5' : 'w-3 h-3'}`}
              />
              <p className={`text-base font-normal ${ isRearranging ? 'text-[#17B26A]' : 'text-[#697586]'}`}>
                {isRearranging ? t('ending') : t('rearrangement')}
              </p>
            </button>
          )}
        </div>

        {/* no images */}
        {previewImages.length <= 0 && (
          <div className='flex gap-3 p-3 border border-[#DC6803] bg-[#FFFAEB] rounded-[3px] mb-3'>
            <img src="/images/icons/i_orange.svg" alt="" />
            <p className='text-[#DC6803] text-base font-normal'>{t('No images have been added yet.')}</p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <div
            className="w-full p-4 border border-dashed border-[#9AA4B2]  rounded-[3px]"
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
                <p className="">
                  <img src="/images/icons/upload_file_blue.svg" alt="" />
                </p>
                <p className="text-base font-medium text-[#364152] ">  {t('Download images')}  </p>
                <p className="text-sm text-[#9AA4B2] font-normal">  {t('Drag and drop or tap to select')}  </p>

                <button 
                  onClick={() => fileInputRef.current.click()} 
                  className="border border-[var(--color-primary)] text-[var(--color-primary)] rounded-[3px] cursor-pointer h-14 w-[20%]"
                >
                  {t('Upload file')}
                </button>
              </div>
            ) : (
              <div className="flex gap-2 flex-wrap">
                {previewImages.map((src, idx) => (
                  <div
                    key={idx}
                    draggable={isRearranging}
                    onDragStart={isRearranging ? () => handleDragStart(idx) : undefined}
                    onDragEnter={isRearranging ? () => handleDragEnter(idx) : undefined}
                    onDragEnd={isRearranging ? handleDragEnd : undefined}
                    onDragOver={isRearranging ? (e) => e.preventDefault() : undefined}
                    className={`relative w-36.5 h-35 border rounded-[3px] overflow-hidden transition-all duration-200 ${
                      isRearranging
                        ? dragOverIdx === idx
                          ? 'border-[var(--color-primary)] border-2 scale-105 shadow-lg'
                          : 'border-[var(--color-primary)] border-dashed cursor-grab'
                        : 'border-[#E5E7EB]'
                    }`}
                  >
                    <img
                      src={src}
                      alt="preview"
                      className={`w-full h-full transition-opacity duration-200 ${
                        isRearranging ? 'pointer-events-none select-none' : ''
                      }`}
                    />

                    {/* drag overlay hint + order number */}
                    {isRearranging && (
                      <div className="absolute inset-0 bg-[#00000050] flex items-center justify-center">
                        <div className="absolute  text-[white] text-3xl font-medium flex items-center justify-center ">
                          {idx + 1}
                        </div>
                      </div>
                    )}

                  

                    {!isRearranging && (
                      <div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(idx);
                          }}
                          className="absolute top-1 right-1 bg-[#00000080] w-5 h-5 flex justify-center items-center rounded-full cursor-pointer"
                        >
                          <img src="/images/icons/x_white.svg" alt="" />
                        </button>

                        <button
                          className={`absolute top-2 left-1 ${
                            mainIndex === idx ? 'w-[70%] h-6 bg-[var(--color-primary)]' : 'w-6 h-6 bg-[white]'
                          } flex justify-center items-center rounded-full cursor-pointer`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setMainIndex(prev => prev === idx ? null : idx);
                          }}
                        >
                          {mainIndex === idx ? (
                            <div className='flex gap-1'>
                              <p className='text-xs text-[white]'>الصوره الرئسيه</p>
                              <img src="/images/icons/star-white2.svg" alt="" />
                            </div>
                          ) : <img src="/images/icons/star_black2.svg" alt="" />}
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                {!isRearranging && previewImages.length < MAX_IMAGES && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current.click();
                    }}
                    className="w-36.5 h-35 cursor-pointer border bg-[#F8FAFC] border-dashed border-[#CDD5DF] flex items-center justify-center"
                  >
                    <img src="/images/icons/AddGrayIcon.svg" alt="" />
                  </button>
                )}
              </div>
            )}

            {previewImages.length >= MAX_IMAGES && (
              <p className="mt-1 text-sm text-[var(--color-primary)]">
                {t('You reached max images. Delete one to add new.')}
              </p>
            )}
          </div>
        </div>
      </div>



      {/* Note Requirement of images  */}
      <div className='bg-[#F8FAFC] border border-[#EEF2F6] rounded-[3px] p-3 my-4'>
        <p className='flex gap-1'>
          <img src="/images/icons/ii_blue.svg" className="w-6 h-6" />
          <span className='text-[#364152] text-base font-medium'>{t('Image requirements')}</span>
        </p>
        <ul className='grid grid-cols-2 gap-3 mt-4 '>
          {imageRequirement?.map((item)=>(
            <div key={item?.id}  className='flex gap-2 pr-1'>
              <p className='flex items-center'>
                <img src={ item.isValid ? "/images/icons/true_green.svg": "/images/icons/ii.svg"} className="w-3.5 h-3.5 " />
              </p>
              <li className='text-[#4B5565] text-base font-normal'>{item?.title}</li>
            </div>
          
          ))}
        </ul>
      </div>


      {/* Additional media */}
      <div>
        <p className='text-[#364152] text-base font-medium mb-4'>{t('Additional media')} ({t('optional')})</p>
        <div className='grid grid-cols-2 gap-6'>
          <div className='border border-[#E3E8EF] py-4 px-3 rounded-[3px] flex justify-between'>
            <div className='flex gap-2 '>
              <p className='flex items-start mt-1'>
                <img src="/images/icons/Frame-green.svg" alt="" />
              </p>
              <div className='flex flex-col '>
                <p className='text-[#364152] text-base font-medium'>{t('virtual tour')}</p>
                <p className='text-[#4B5565] text-sm font-normal'>{t('360-degree interactive experience')}</p>
              </div>
            </div>

            {/* hidden video input for tour */}
            <input
              ref={tourVideoRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => setTourVideo(e.target.files[0] || null)}
            />

            {tourVideo ? (
              <div className="flex items-center gap-1  px-2 py-1">
                <img src="/images/icons/checkmark-circle-true.svg" className="w-4 h-4" alt="" />
                <p className="text-[#17B26A] text-sm font-normal ">{t('A tour was selected')}</p>
                <button
                  onClick={() => { setTourVideo(null); tourVideoRef.current.value = ''; }}
                  className="text-[#17B26A] font-bold text-sm leading-none cursor-pointer"
                >×</button>
              </div>
            ) : (
              <button
                onClick={() => tourVideoRef.current.click()}
                className='text-[var(--color-primary)] text-base font-normal cursor-pointer'
              >
                {t('Add a tour')}
              </button>
            )}
          </div>

          {/* Property video */}
          <div className='border border-[#E3E8EF] py-4 px-3 rounded-[3px] flex justify-between'>
            <div className='flex gap-2 '>
              <p className='flex items-start mt-1'>
                <img src="/images/icons/camera_blue.svg" alt="" />
              </p>
              <div className='flex flex-col '>
                <p className='text-[#364152] text-base font-medium'>{t('Property video')}</p>
                <p className='text-[#4B5565] text-sm font-normal'>{t('View a detailed tour of your space')}</p>
              </div>
            </div>

            {/* hidden video input for property video */}
            <input
              ref={propertyVideoRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => setPropertyVideo(e.target.files[0] || null)}
            />

            {propertyVideo ? (
              <div className="flex items-center gap-1  px-2 py-1">
                <img src="/images/icons/checkmark-circle-true.svg" className="w-4 h-4" alt="" />
                <p className="text-[#17B26A] text-sm font-normal ">{t('A tour was selected')}</p>
                <button
                  onClick={() => { setTourVideo(null); tourVideoRef.current.value = ''; }}
                  className="text-[#17B26A] font-bold text-sm leading-none cursor-pointer"
                >×</button>
              </div>
            ) : (
              <button
                onClick={() => propertyVideoRef.current.click()}
                className='text-[var(--color-primary)] text-base font-normal cursor-pointer'
              >
                {t('Add a video')}
              </button>
            )}
          </div>


        </div>
        
      </div>















      {/* btn */}
      <div className="flex justify-between mt-6">
        <div className='w-full '>
          <button
            onClick={prevStep}
            className=" w-[25%] h-15 border border-[#697586] text-[#697586] rounded-[3px] cursor-pointer"
          >
            {t('the previous')}
          </button>
        </div>
        
        <div className='flex gap-2 justify-end w-full '>
          <button
            className="h-15 w-[30%]  border border-[#697586] text-[#697586] rounded-[3px] cursor-pointer"
          >
            {t('Save draft')}
          </button>

          <button
            onClick={() => router.push('/Pages/Services/Property_Module/Service/Add/FormData')}
            className="h-15 w-[25%] bg-[var(--color-primary)] text-white rounded-[3px] cursor-pointer"
          >
            {t('the next')}
          </button>
        </div>
        
      </div>
    </div>
    </>
  )
}

export default MediaPage