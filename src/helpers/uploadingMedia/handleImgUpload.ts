import axios from "axios";
import { handleImgUpload_interface } from "@/interfaces";


export default async function handleImgUpload(
    {
        setAddImg,
        setImgUrl,
        uploadedImgFromUrl,
        uploadedImgFromDevice,
        cleanedUrl,
        setUploadedImgFromUrl,
        setUploadedImgFromDevice,
    }: handleImgUpload_interface
) {
    // Set the loading state
    setAddImg(true)

    // Set the image URL and add image to the editor
    if (uploadedImgFromUrl) {
        setImgUrl(cleanedUrl);
    } else if (uploadedImgFromDevice) {
        // Upload image from device to Cloudinary and set the image URL and add image to the editor
        const formData = new FormData();
        formData.append('file', uploadedImgFromDevice);
        formData.append('upload_preset', `${import.meta.env.VITE_UPLOAD_PRESET_KEY}`);

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
                formData
            );
            setImgUrl(response.data.secure_url);

        } catch (error) {
            console.error('Error uploading the image', error);
            setAddImg(false)
        }
    }

    // Reset the state
    setUploadedImgFromUrl(null);
    setUploadedImgFromDevice(null);

    return { success: true };
};