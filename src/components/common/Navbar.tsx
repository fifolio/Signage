// COMPONENTS
import Menu from "./left-section/Menu"
import Title from "./mid-section/Title"
import Settings from "./right-section/Settings"
import SyncBtn from "./right-section/SyncBtn"


export default function Navbar() {
    return (
        <nav className="bg-white w-full m-0 border-b-[1px] border-gray-200 px-3 py-2 flex justify-between items-center">

            {/* LEFT SECTION */}
            <div className="flex justify-start space-x-2">
                {/* MENU */}
                <Menu />
            </div>

            {/* MID SECTION */}
            <Title />

            {/* RIGHT SECTION */}
            <div className="flex space-x-2 capitalize">
                {/* SYNC BUTTON */}
                <SyncBtn />

                {/* SETTINGS BUTTON */}
                <Settings />
            </div>
        </nav>
    )
}
