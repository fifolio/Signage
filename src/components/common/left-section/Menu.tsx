import { Link } from "react-router-dom";

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
import { FcLock } from "react-icons/fc";


// HELPERS
import { handleCreateNewFile, handleLogout} from "@/helpers";

// STORES
import useUserDataStore from "@/stores/backend/useUserDataStore";



export default function Menu() {

    // Get user data from store
    const { userData } = useUserDataStore();

    // handle Logout func.
    async function logout() {
        // setLogoutSpinner(true)
        await handleLogout();
    }

    // Handle Create New File
    async function createNewFile() {
        await handleCreateNewFile(userData?.name, userData?.name);
    };

    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger className="flex space-x-2 cursor-pointer">
                    <TiThMenu className="!size-5" />
                    {/* <span>Menu</span> */}
                </MenubarTrigger>
                <MenubarContent className="capitalize">
                    <MenubarItem onClick={createNewFile} className="cursor-pointer hover:font-semibold">
                        Create new <MenubarShortcut><FcFile className="size-4" /></MenubarShortcut>
                    </MenubarItem>
                    <Link to="/">
                        <MenubarItem className="cursor-pointer hover:font-semibold">
                            open file <MenubarShortcut><FcOpenedFolder className="size-4" /></MenubarShortcut>
                        </MenubarItem>
                    </Link>
                    <MenubarSeparator />
                    <MenubarItem className="cursor-pointer hover:font-semibold">
                        help center <MenubarShortcut><FcInfo className="size-4" /></MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem onClick={logout} className="text-red-600 hover:!text-red-600 cursor-pointer hover:font-semibold">
                        Logout <MenubarShortcut><FcLock className="size-4" /></MenubarShortcut>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}
