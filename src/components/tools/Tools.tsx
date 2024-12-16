// UI
import { Button } from "../ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

// ICONS
import { IoText } from "react-icons/io5";
import { FcPicture } from "react-icons/fc";
import { FcStart } from "react-icons/fc";
import { FcInfo } from "react-icons/fc";
import { MdDelete } from "react-icons/md";
import { LuRectangleHorizontal } from "react-icons/lu";
import { FaRegCircle } from "react-icons/fa";
import { GoHorizontalRule } from "react-icons/go";
import { RxDividerVertical } from "react-icons/rx";


export default function Tools() {
    return (
        <div className="space-y-3 flex flex-col items-center">
            <Button type="button" variant="outline"><IoText className="!size-5" /></Button>
            <Separator />
            <Dialog>
                <DialogTrigger><Button variant="outline"><FcPicture className="!size-5" /></Button></DialogTrigger>
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

            <Dialog>
                <DialogTrigger><Button variant="outline"><FcStart className="!size-5" /></Button></DialogTrigger>
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

            <Separator />
            <Button variant="outline"><LuRectangleHorizontal className="!size-5"/></Button>
            <Button variant="outline"><FaRegCircle className="!size-5"/></Button>
            <Button variant="outline"><GoHorizontalRule className="!size-5"/></Button>
            <Button variant="outline"><RxDividerVertical className="!size-5"/></Button>


            <Separator />
            <Button type="button" variant="destructive"><MdDelete className="!size-5 text-white" /></Button>
            <Separator />
            <Button variant="outline"><FcInfo className="!size-5" /></Button>
        </div>
    );
}
