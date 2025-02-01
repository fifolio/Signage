import { useEffect, useState } from "react"

// UI
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import LoadingState from "@/components/ui/LoadingState"
import { useToast } from "@/hooks/use-toast"

// ICONS
import { FcSettings } from "react-icons/fc"
import { FiCopy } from "react-icons/fi"

// STORES
import {
    useFileName,
    useFileDetails,
    useUserDataStore
} from "@/stores"

// SERVICES
import updateFileName from "@/backend/services/files/updateFileName"
import { deleteFile } from "@/backend/services/files/deleteFile"



export default function Settings() {

    const { toast } = useToast()

    // Get file details from store
    const { fileDetails } = useFileDetails()

    // Get user details from store
    const { userData } = useUserDataStore();

    // Get the file name from the store
    const { newFileName, setNewFileName, currentFileName, setCurrentFileName } = useFileName();

    // Loading state
    const [loadingUpdateName, setLoadingUpdateName] = useState<boolean>(false);

    // Delete alert box
    const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(true);

    // Store Delete ID value
    const [fileDeleteID, setFileDeleteID] = useState<string>('');
    const [loadingDeleteFile, setLodingDeleteFile] = useState<boolean>(false);

    // Copy Screen ID to clipboard
    const handleCopyFileId = async () => {
        await navigator.clipboard.writeText(fileDetails?.fileId)
    }

    // Update file name
    async function handleUpdateFileName() {
         // Prevent Updating the 'Welcome' File
    if (fileDetails?.$id === "677a7399002e2dc1a522") {
        console.log('Oops!, you are not allowed to make any changes on this file.')
      } else {
          setLoadingUpdateName(true)
          await updateFileName(fileDetails?.$id, newFileName, userData?.name)
              .then(() => {
                  setNewFileName(newFileName);
                  setCurrentFileName(newFileName);
                  setLoadingUpdateName(false);
              }).finally(() => {
                  setNewFileName('');
              });
      }
    };

    // Reset the new file name when the dialog is closed
    useEffect(() => {
        setNewFileName('');
    }, []);


    // Handle delete file
    async function handleDeleteFile() {
        setLodingDeleteFile(true)
        if (fileDeleteID == fileDetails?.$id) {
            await deleteFile(fileDeleteID, fileDetails.fileId)
                .then((res) => {
                    if (res === true) {
                        window.location.href = '/';
                    } else {
                        setLodingDeleteFile(false);
                    }
                });
        } else {
            toast({
                title: "Oops! Incorrect File Delete ID",
                description: "The provided File Delete ID does not matched with this file. Please double-check the ID and try again. If you are still having trouble, please contact the admin team of IT department at Signcast Media directly to obtain the correct ID.",
                variant: "destructive"
            });
            setLodingDeleteFile(false);
        }
    }

    return (
        <Dialog onOpenChange={() => setShowDeleteAlert(false)}>
            <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center">
                    <FcSettings className="h-5 w-5" />
                    <span>Settings</span>
                </Button>
            </DialogTrigger>
            <DialogContent className={`${showDeleteAlert ? 'sm:max-w-[525px]' : 'sm:max-w-[425px]'}`}>
                {showDeleteAlert ? (
                    <>
                        <DialogHeader>
                            <DialogTitle>Delete File</DialogTitle>
                            <DialogDescription>
                                File Deletion Requires Authorization
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-3">
                            <div className="grid gap-3 mb-2">
                                <div className="text-sm bg-red-100 border-[1px] border-red-500 rounded-md text-red-600 px-2 py-2">
                                    <span>
                                        This file is essential for the proper functioning of our system and contains important information. Due to its sensitivity, deleting this file requires special authorization and a unique security code.
                                        <p className="py-2"></p>
                                        If you believe deleting this file is absolutely necessary, please contact the admin team of IT department at Signcast Media directly to request and obtain the required authorization code.
                                        <p className="py-2"></p>
                                        Please note that the "Screen ID (e.g, <span className="text-black">11e306f492d</span>)" displayed for this file is distinct from the required "File Delete ID (e.g, <span className="text-black">6775817400164cb423dc</span>)". The "Screen ID" is for public visibility and sharing. The "File Delete ID" is a secure code exclusively held by the Signcast Media IT administration team.
                                        <p className="py-2"></p>
                                        Once you have the code, you'll be able to enter it into the field below to complete the deletion.
                                    </span>
                                </div>
                            </div>
                            <div className="grid gap-3 mb-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="fileName">
                                        <span className="text-red-500">*</span> File Delete ID
                                    </Label>
                                </div>
                                <Input
                                    id="fileDeleteID"
                                    maxLength={20}
                                    onChange={(e) => setFileDeleteID(e.target.value)}
                                    placeholder="Enter File Delete ID to continue"
                                />
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center">
                                <Button onClick={() => setShowDeleteAlert(false)} variant="outline">
                                    Back to settings
                                </Button>
                                <Button disabled={fileDeleteID === '' || fileDeleteID.length < 20 || fileDeleteID.trim().length === 0 || loadingDeleteFile} variant={"destructive"} className="min-w-[150px]" onClick={handleDeleteFile}>
                                    {loadingDeleteFile ? (
                                        <LoadingState setWidth="28" />
                                    ) : (
                                        <span>Delete Permanently</span>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle>File Settings</DialogTitle>
                            <DialogDescription>
                                Manage your file settings and properties.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 mt-2">
                            <div className="grid gap-3 mb-2">
                                <Label htmlFor="fileId">Screen ID</Label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        id="fileId"
                                        value={fileDetails?.fileId}
                                        readOnly
                                        className="bg-gray-100 flex-grow"
                                    />
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={handleCopyFileId}
                                        aria-label="Copy Screen ID"
                                    >
                                        <FiCopy className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="grid gap-3 mb-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="fileName">File Title</Label>
                                    <span className="text-sm font-medium text-gray-500">Current: {currentFileName}</span>
                                </div>
                                <Input
                                    id="fileName"
                                    maxLength={25}
                                    value={newFileName}
                                    onChange={(e) => setNewFileName(e.target.value)}
                                    placeholder="Enter new file title"
                                />
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center">
                                <Button onClick={() => setShowDeleteAlert(true)} variant="destructive">
                                    Delete file
                                </Button>
                                <Button disabled={newFileName === '' || newFileName.length === 0 || newFileName.trim().length === 0 || loadingUpdateName} className="min-w-[150px]" onClick={handleUpdateFileName}>
                                    {loadingUpdateName ? (
                                        <LoadingState setWidth="28" />
                                    ) : (
                                        <span>Update file title</span>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}