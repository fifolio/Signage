interface handleVideoUpload_interface {
    setAddVideo: (state: boolean) => void;
    setVideoUrl: (state: string) => void;
    uploadedVideoFromUrl: string | null;
    uploadedVideoFromDevice: File | null;
    cleanedUrl: string;
    setUploadedVideoFromUrl: (state: string | null) => void;
    setUploadedVideoFromDevice: (state: File | null) => void;
}

export default handleVideoUpload_interface
