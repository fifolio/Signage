// UI
import { Button } from "@/components/ui/button";

// ICONS
import { FcUpload } from "react-icons/fc";

export default function SyncBtn() {
    return (
        <Button variant="outline" className="flex justify-center items-center capitalize">
            <FcUpload className="!size-5" />
            <span>Sync updates</span>
        </Button>
    )
}
