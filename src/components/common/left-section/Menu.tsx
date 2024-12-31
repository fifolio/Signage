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

// ICONS
import { TiThMenu } from "react-icons/ti";
import { FcFile } from "react-icons/fc";
import { FcOpenedFolder } from "react-icons/fc";
import { FcInfo } from "react-icons/fc";
import { FcSettings } from "react-icons/fc";
import { FcUpload } from "react-icons/fc";
import { FcLock } from "react-icons/fc";

// SERVICES
import { logout } from "@/backend/services/auth/logout";



export default function Menu() {

    // handle Logout func.
    async function handleLogout() {
        // setLogoutSpinner(true)
        const res = await logout();
        if (res) {
            window.location.reload()
        } else {
            console.log('Can not logout! something went wrong while logging out!');
        }
    }

    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger className="flex space-x-2 cursor-pointer">
                    <TiThMenu className="!size-5" />
                    {/* <span>
                                Menu
                            </span> */}
                </MenubarTrigger>
                <MenubarContent className="capitalize">
                    <MenubarItem className="cursor-pointer hover:font-semibold">
                        Create new <MenubarShortcut><FcFile className="size-4" /></MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem className="cursor-pointer hover:font-semibold">
                        open file <MenubarShortcut><FcOpenedFolder className="size-4" /></MenubarShortcut>
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
                    <MenubarSeparator />
                    <MenubarItem onClick={handleLogout} className="text-red-600 hover:!text-red-600 cursor-pointer hover:font-semibold">
                        Logout <MenubarShortcut><FcLock className="size-4" /></MenubarShortcut>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}
