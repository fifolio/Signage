import { useState } from "react";

// UI
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import LoadingState from "../ui/LoadingState";

// ICONS
import { FcPicture } from "react-icons/fc";
import { FcAddImage } from "react-icons/fc";
import { FcLink } from "react-icons/fc";
import { FcSmartphoneTablet } from "react-icons/fc";
import { FcUpload } from "react-icons/fc";

// STORES
import { useTools } from "@/stores";

// HELPERS
import { handleImgUpload } from "@/helpers";

export default function AddImage() {

    const { addImg, setAddImg, setImgUrl } = useTools()

    // Upload from URL 
    const [uploadedImgFromUrl, setUploadedImgFromUrl] = useState<string | null>(null);
    const cleanedUrl = uploadedImgFromUrl ? uploadedImgFromUrl.replace(/\s+/g, '') : '';

    // Upload from Device
    const [uploadedImgFromDevice, setUploadedImgFromDevice] = useState<File | null>(null);

    // Dialog State
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    // handle Dialog Close state
    function handleDialogCloseState() {
        setIsDialogOpen(false);
        setUploadedImgFromUrl(null);
        setUploadedImgFromDevice(null);
    }

    // Handle Image Upload
    async function uploadImage() {
        const result = await handleImgUpload({
            setAddImg,
            setImgUrl,
            uploadedImgFromUrl,
            uploadedImgFromDevice,
            cleanedUrl,
            setUploadedImgFromUrl,
            setUploadedImgFromDevice,
        });

        if (result.success) {
            // Handle successful upload if needed
            console.log('Image uploaded successfully');
            setIsDialogOpen(false);
        } else {
            // Handle failed upload if needed
            console.error('Image upload failed', result);
        }
    };

    return (
        <Dialog open={isDialogOpen}>
            <DialogTrigger onClick={() => setIsDialogOpen(true)}><Button variant="outline"><FcPicture className="!size-5" /></Button></DialogTrigger>
            <DialogContent className="[&>button]:hidden">
                <DialogHeader>
                    <DialogTitle className="font-bold flex items-center">
                        <FcAddImage className="w-[28px] text-[28px] mr-2" />
                        Add Image
                    </DialogTitle>
                    <DialogDescription>Choose an image from your device or paste a URL</DialogDescription>
                    <DialogClose asChild onClick={() => handleDialogCloseState()}>
                        <button aria-label="Close" className="absolute top-1 right-4 font-bold text-[25px] text-red-600">
                            <span aria-hidden>×</span>
                        </button>
                    </DialogClose>
                </DialogHeader>

                <div className="grid gap-1 py-2">
                    <div className="grid gap-2">
                        <h4 className="font-medium flex items-center">
                            <FcSmartphoneTablet className="text-[25px] mt-[3px] mr-2" />
                            Upload from Device
                        </h4>
                        <p className="text-sm text-muted-foreground">
                            Select an image file from your local device
                        </p>
                        <Input
                            type="file"
                            accept="image/*"
                            className="cursor-pointer"
                            onChange={(e) => setUploadedImgFromDevice(e.target.files?.[0] as File)}
                        />
                    </div>

                    <div className="flex justify-around items-center text-gray-500 font-bold max-w-[214px] mt-1">
                        <Separator />
                        <span className="mx-2">Or</span>
                        <Separator />
                    </div>

                    <div className="grid gap-2">
                        <h4 className="font-medium flex items-center">
                            <FcLink className="text-[25px] mt-[3px] mr-2" />
                            Paste URL
                        </h4>
                        <p className="text-sm text-muted-foreground">
                            Enter the URL of an image
                        </p>
                        <Input
                            type="url"
                            placeholder="https://example.com/image.jpg"
                            value={uploadedImgFromUrl === null ? '' : uploadedImgFromUrl}
                            onChange={(e) => setUploadedImgFromUrl(e.target.value)}
                        />
                    </div>
                </div>
                <Separator />
                <DialogFooter>
                    <Button
                        disabled={addImg === true || (uploadedImgFromUrl === null && uploadedImgFromDevice === null) as boolean || uploadedImgFromUrl?.trim().length === 0}
                        className="w-full" onClick={uploadImage}>
                        {addImg ? (
                            <span className="flex items-center justify-center space-x-3">
                                <LoadingState setWidth="28" /> Please hold on while we adding your image..
                            </span>
                        ) : (
                            <span className="flex items-center">
                                <FcUpload className="text-[28px] mr-2" />
                                <span>Add Video</span>
                            </span>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
