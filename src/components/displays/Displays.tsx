// UI
import { Button } from "../ui/button";
import { ScrollArea } from "@/components/ui/scroll-area"
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
    <div className="mt-6 mb-6 px-3">

                {/* TITLE + Manage btn */}
                <div className="flex justify-between items-center mb-6">
                    <h6 className="font-semibold">Displays</h6>
                    <Dialog>
                        <DialogTrigger>
                            <Button variant="secondary" className="flex justify-between items-center border-[1px] border-gray-300">
                                <FcServices className="!size-5" />
                                <span>Manage</span>
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

                {/* DISPLAYS BOX */}
                <ScrollArea className="px-3 border-[1px] border-gray-200 max-w-[300px] h-[150px] max-h-[150px] rounded-md">
                    <span id="noDisplay">
                        <div id="noPreview" className="flex justify-center items-center h-[140px] text-gray-500 text-[15px] m-0">No displays connected</div>
                    </span>
                </ScrollArea>

            </div>
  )
}
