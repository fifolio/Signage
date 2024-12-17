// UI
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"
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
import { TiThMenu } from "react-icons/ti";
import { FcFile } from "react-icons/fc";
import { FcOpenedFolder } from "react-icons/fc";
import { FcInfo } from "react-icons/fc";
import { FcSettings } from "react-icons/fc";
import { LuFullscreen } from "react-icons/lu";
import { FcUpload } from "react-icons/fc";





export default function Navbar() {
    return (
        <nav className="bg-white w-full m-0 shadow-sm px-3 py-2 flex justify-between items-center">

            {/* LEFT SECTION */}
            <div className="flex justify-start space-x-2">
                {/* FULL-SCREEN BUTTON */}
                <Button variant="outline">
                    <LuFullscreen className="!size-5" />
                </Button>

                {/* MENU */}
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger className="flex space-x-2 cursor-pointer">
                            <TiThMenu className="size-4" />
                            <span>
                                Menu
                            </span>
                        </MenubarTrigger>
                        <MenubarContent className="capitalize">
                            <MenubarItem className="cursor-pointer hover:font-semibold">
                                Create new <MenubarShortcut><FcFile className="size-4" /></MenubarShortcut>
                            </MenubarItem>
                            <MenubarItem className="cursor-pointer hover:font-semibold">
                                open saved file <MenubarShortcut><FcOpenedFolder className="size-4" /></MenubarShortcut>
                            </MenubarItem>
                            <MenubarSeparator className="flex md:hidden" />
                            <MenubarItem className="flex md:hidden cursor-pointer hover:font-semibold">
                                Sync updates <MenubarShortcut><FcUpload className="size-4" /></MenubarShortcut>
                            </MenubarItem>
                            <MenubarItem className="flex md:hidden cursor-pointer hover:font-semibold">
                                Settings <MenubarShortcut><FcSettings className="size-4" /></MenubarShortcut>
                            </MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem className="cursor-pointer hover:font-semibold">
                                help center <MenubarShortcut><FcInfo className="size-4" /></MenubarShortcut>
                            </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            </div>

            {/* MID SECTION */}
            <div className="font-semibold">Untitled Presentation</div>

            {/* RIGHT SECTION */}
            <div className="hidden md:flex space-x-2 capitalize">
                {/* SAVE BUTTON */}
                <Button variant="outline" className="flex justify-center items-center capitalize">
                    <FcUpload className="!size-5" />
                    <span>Sync updates</span>
                </Button>

                {/* SETTINGS BUTTON */}
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

            </div>
        </nav>
    )
}
