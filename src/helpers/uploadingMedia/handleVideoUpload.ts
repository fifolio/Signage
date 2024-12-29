import axios from "axios";
import { handleVideoUpload_interface } from "@/interfaces";

export default async function handleVideoUpload(
    {
        setAddVideo,
        setVideoUrl,
        uploadedVideoFromUrl,
        uploadedVideoFromDevice,
        cleanedUrl,
        setUploadedVideoFromUrl,
        setUploadedVideoFromDevice,
    }: handleVideoUpload_interface
) {
    // Set the loading state
    setAddVideo(true)

    // Set the video URL and add video to the editor
    if (uploadedVideoFromUrl) {
        setVideoUrl(cleanedUrl);
    } else if (uploadedVideoFromDevice) {
        // Upload video from device to Cloudinary and set the video URL and add video to the editor
        const formData = new FormData();
        formData.append('file', uploadedVideoFromDevice);
        formData.append('upload_preset', `${import.meta.env.VITE_UPLOAD_PRESENT_KEY}`);

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/video/upload`,
                formData
            );
            setVideoUrl(response.data.secure_url);

        } catch (error) {
            console.error('Error uploading the video', error);
            setAddVideo(false)
        }
    }

    // Reset the state
    setUploadedVideoFromUrl(null);
    setUploadedVideoFromDevice(null);

    return { success: true };
};