import { useState } from "react";

// UI
import { Button } from "@/components/ui/button";
import LoadingState from "@/components/ui/LoadingState";
import { useToast } from "@/hooks/use-toast"

// ICONS
import { FcUpload } from "react-icons/fc";

// SERVICES
import { updateScreen } from "@/backend/services/files/updateScreen";
import { getFile } from "@/backend/services/files/getFile";

// STORES
import { useFileDetails } from "@/stores";
import useIsSaving from "@/stores/footer/useIsSaving";

export default function SyncBtn() {

    const { toast } = useToast()

    // Track the syncing state 
    const [isSyncing, setIsSyncing] = useState(false);
    const { isSaving } = useIsSaving();

    // Get file details from store
    const { fileDetails } = useFileDetails()

    async function syncUpdates() {
        setIsSyncing(true)
        await getFile(fileDetails?.fileId)
            .then(async (res) => {
                await updateScreen(fileDetails?.fileId, res.fileData, Math.floor((Math.random() * 1000000)))
                toast({ title: "✅ Updates Synced Successfully" })
                setIsSyncing(false)
            });
        setIsSyncing(false)
    };

    return (
        <Button disabled={isSyncing || isSaving} onClick={syncUpdates} variant="outline" className="flex justify-center items-center capitalize">
            {isSyncing ? (
                <div className="flex items-center space-x-2">
                    <LoadingState setWidth="25" />
                    <span>Syncing..</span>
                </div>
            ) : (
                <div className="flex items-center space-x-2">
                    <FcUpload className="!size-5" />
                    <span>Sync updates</span>
                </div>
            )}
        </Button>
    )
}
