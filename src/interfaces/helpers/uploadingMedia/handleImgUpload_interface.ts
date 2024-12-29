interface handleImgUpload_interface {
    setAddImg: (state: boolean) => void;
    setImgUrl: (state: string) => void;
    uploadedImgFromUrl: string | null;
    uploadedImgFromDevice: File | null;
    cleanedUrl: string;
    setUploadedImgFromUrl: (state: string | null) => void;
    setUploadedImgFromDevice: (state: File | null) => void;
}

export default handleImgUpload_interface;