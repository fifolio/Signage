
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

// ICONS
import { FcSettings } from "react-icons/fc"

export default function Settings() {
    return (
        <Dialog>
            <DialogTrigger>
                <Button variant="outline" className="flex justify-center items-center capitalize">
                    <FcSettings className="!size-5" />
                    <span>Settings</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
