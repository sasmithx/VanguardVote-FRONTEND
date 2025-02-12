import React, { use } from "react";
import { useRef, useState } from "react";
import { LuUpload, LuUser, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      //Update the image state
      setImage(file);

      //Generate preview URL from the file
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-sky-100">
          <LuUser className="text-4xl text-primary" />

          <button
            type="button"
            className="absolute flex items-center justify-center w-8 h-8 text-white rounded-full bg-primary -bottom-1 -right-1"
            onClick={onChooseFile}
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="profile photo"
            className="object-cover w-20 h-20 rounded-full"
          />

          <button
            type="button"
            className="absolute flex items-center justify-center w-8 h-8 text-white bg-red-500 rounded-full -bottom-1 -right-1"
            onClick={handleRemoveImage}
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
