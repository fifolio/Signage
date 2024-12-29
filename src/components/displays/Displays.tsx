// UI
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


// ICONS
import { FcServices } from "react-icons/fc";

export default function Displays() {
    return (
        <div className="mt-3 mb-3 px-3">

            {/* TITLE + Manage btn */}
            <div className="flex justify-between items-center mb-6">
                <Dialog>
                    <DialogTrigger>
                        <Button variant="outline" className="flex justify-center items-center border-[1px] border-gray-300 min-w-[265px]">
                            <FcServices className="!size-5"  />
                            <span>Manage Displays</span>
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
            </div>
        </div>
    )
}
