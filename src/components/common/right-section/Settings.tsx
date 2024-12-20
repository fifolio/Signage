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

// ICONS
import { FcSettings } from "react-icons/fc"
import { FiCopy } from "react-icons/fi"

// STORES
import { useFileName } from "@/stores"





export default function Settings() {

    // Get the file name from the store
    const { currentFileName, newFileName, setNewFileName, setCurrentFileName } = useFileName();

    // Temp fileID
    const fileId = "FILE_12345"

    const handleCopyFileId = async () => {
        await navigator.clipboard.writeText(fileId)
    }

    const handleUpdateFileName = () => {
        setCurrentFileName(newFileName)
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center">
                    <FcSettings className="h-5 w-5" />
                    <span>Settings</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>File Settings</DialogTitle>
                    <DialogDescription>
                        Manage your file settings and properties.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 mt-2">

                    <div className="grid gap-3 mb-2">
                        <Label htmlFor="fileId">File ID</Label>
                        <div className="flex items-center gap-2">
                            <Input
                                id="fileId"
                                value={fileId}
                                readOnly
                                className="bg-gray-100 flex-grow"
                            />
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleCopyFileId}
                                aria-label="Copy file ID"
                            >
                                <FiCopy className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="grid gap-3 mb-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="fileName">File name</Label>
                            <span className="text-sm font-medium text-gray-500">Current: {currentFileName}</span>
                        </div>
                        <Input
                            id="fileName"
                            maxLength={25}
                            onChange={(e) => setNewFileName(e.target.value)}
                            placeholder="Enter new file name"
                        />
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center">
                        <Button variant="destructive">
                            Delete file
                        </Button>
                        <Button disabled={newFileName.length <= 0} onClick={handleUpdateFileName}>
                            Update file name
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
