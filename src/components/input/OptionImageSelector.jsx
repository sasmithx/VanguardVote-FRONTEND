import React from "react";
import {HiOutlineTrash} from "react-icons/hi";
import {HiMiniPlus} from "react-icons/hi2";

const OptionImageSelector = ({imageList, setImageList}) => {

    //Function to handle adding an image
    const handleAddImage = (event) => {
        // Add image
        const file = event.target.files[0];
        if (file && imageList.length < 4) {
            const reader = new FileReader();
            reader.onload = () => {
                // Add object with base64 and file to the array
                setImageList([
                    ...imageList,
                    {base64: reader.result, file},
                ]);
            };
            reader.readAsDataURL(file);
            event.target.value = null;
        }
    };

    //Function to handle deleting an image
    const handleDeleteImage = (index) => {
        const updatedList = imageList.filter((_, idx) => idx !== index);
        setImageList(updatedList);
    };

    return (
        <div>
            {imageList?.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mb-4">
                    {imageList.map((item, index) => (
                        <div key={index} className="bg-gray-600/10 rounded-md relative">
                            <img src={item.base64}
                                 alt={`Selected_${index}`}
                                 className="w-full h-36 object-contain rounded-md"
                            />

                            <button onClick={() => handleDeleteImage(index)}
                                    className="text-red-500 bg-gray-100 rounded-full p-2 absolute top-2 right-2">
                                <HiOutlineTrash className="text-lg"/>
                            </button>
                        </div>
                    ))}
                </div>
            )}


            {imageList.length < 4 && (
                <div className="flex items-center gap-5">
                    <input
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={handleAddImage}
                        className="hidden"
                        id="imageInput"
                    />
                    <label
                        htmlFor="imageInput" className="btn-small text-nowrap py-1 cursor-pointer">
                        <HiMiniPlus className="text-lg"/>
                        Select Image
                    </label>
                </div>
            )}
        </div>
    )
}

export default OptionImageSelector