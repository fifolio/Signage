import { useState } from "react";

// UI
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator";
import LoadingState from "@/components/ui/LoadingState";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// ICONS
import { FcStart } from "react-icons/fc";

// STORES
import { useTools } from "@/stores";

// HELPERS
import { handleVideoUpload } from "@/helpers";

export default function AddVideo() {

    const { addVideo, setAddVideo, setVideoUrl } = useTools();

    // Upload from URL 
    const [uploadedVideoFromUrl, setUploadedVideoFromUrl] = useState<string | null>(null);
    const cleanedUrl = uploadedVideoFromUrl ? uploadedVideoFromUrl.replace(/\s+/g, '') : '';

    // Upload from Device
    const [uploadedVideoFromDevice, setUploadedVideoFromDevice] = useState<File | null>(null);

    // Dialog State
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    // Alert Checked
    const [checkPoint, setCheckPoint] = useState(false);


    // handle Dialog Close state
    function handleDialogCloseState() {
        setIsDialogOpen(false);
        setUploadedVideoFromUrl(null);
        setUploadedVideoFromDevice(null);
        setTimeout(() => {
            setCheckPoint(false);
        }, 1000)
    };

    // Handle Video Upload
    async function uploadVideo() {
        const result = await handleVideoUpload({
            setAddVideo,
            setVideoUrl,
            uploadedVideoFromUrl,
            uploadedVideoFromDevice,
            cleanedUrl,
            setUploadedVideoFromUrl,
            setUploadedVideoFromDevice,
        });

        if (result.success) {
            // Handle successful upload if needed
            console.log('Video uploaded successfully');
            setCheckPoint(true);
        } else {
            // Handle failed upload if needed
            console.error('Video upload failed', result);
        }
    };


    return (
        <Dialog open={isDialogOpen}>
            <DialogTrigger onClick={() => setIsDialogOpen(true)}>
                <Button variant="outline"><FcStart className="!size-5" /></Button>
            </DialogTrigger>

            <DialogContent className={`[&>button]:hidden`}>

                {/* VIDEO CONTENT */}
                <div className={`${checkPoint ? 'hidden' : 'block'}`}>
                    <DialogHeader>
                        <DialogTitle className="font-bold">Add Video</DialogTitle>
                        <DialogDescription>Choose a video from your device or paste a URL</DialogDescription>
                        <DialogClose asChild onClick={() => handleDialogCloseState()}>
                            <button aria-label="Close" className="absolute top-1 right-4 font-bold text-[25px] text-red-600">
                                <span aria-hidden>×</span>
                            </button>
                        </DialogClose>
                    </DialogHeader>

                    <div className="grid gap-4 py-2 mb-3">
                        <div className="grid gap-2">
                            <h4 className="font-medium">Upload from Device</h4>
                            <p className="text-sm text-muted-foreground">
                                Select a video file from your local device
                            </p>
                            <Input
                                type="file"
                                accept="video/*"
                                className="cursor-pointer"
                                onChange={(e) => setUploadedVideoFromDevice(e.target.files?.[0] as File)}
                            />
                        </div>

                        <div className="flex justify-around items-center text-gray-500 font-bold max-w-[214px] mt-1">
                            <Separator />
                            <span className="mx-2">Or</span>
                            <Separator />
                        </div>

                        <div className="grid gap-2">
                            <h4 className="font-medium">Paste URL</h4>
                            <p className="text-sm text-muted-foreground">
                                Enter the URL of a video
                            </p>
                            <Input
                                type="url"
                                placeholder="https://example.com/video.mp4"
                                value={uploadedVideoFromUrl === null ? '' : uploadedVideoFromUrl}
                                onChange={(e) => setUploadedVideoFromUrl(e.target.value)}
                            />
                        </div>
                    </div>

                    <Separator className="my-4" />

                    <DialogFooter>
                        <Button
                            disabled={addVideo === true || (uploadedVideoFromUrl === null && uploadedVideoFromDevice === null) as boolean || uploadedVideoFromUrl?.trim().length === 0}
                            className="w-full" onClick={uploadVideo}>
                            {addVideo ? (
                                <span className="flex items-center justify-center space-x-3">
                                    <LoadingState setWidth="28" /> Please hold on while we adding your video..
                                </span>
                            ) : (
                                <span>Add Video</span>
                            )}
                        </Button>
                    </DialogFooter>
                </div>

                {/* ALERT CONTENT */}
                <div className={`${checkPoint ? 'block' : 'hidden'}`}>
                    <Alert variant="default" className="bg-yellow-100 text-yellow-800 space-y-3">
                        <AlertTitle>Alert: Pause Video Before Deleting</AlertTitle>
                        <AlertDescription>
                            <p>
                                To delete a video, please ensure it is paused. Select the paused video and press '<i>Delete</i>' on your keyboard. If the video is not paused, it will only be <u>hidden</u>, and its sound will continue to play.
                            </p>
                            <br />
                            <p>
                                Always pause your video before deleting it from the workspace to ensure it is fully removed.
                            </p>
                        </AlertDescription>
                    </Alert>


                    <Separator className="my-4" />

                    <DialogFooter>
                        <Button className="mx-auto" onClick={() => handleDialogCloseState()}>
                            I understand to pause videos before deleting
                        </Button>
                    </DialogFooter>
                </div>

            </DialogContent>
        </Dialog>
    )
}