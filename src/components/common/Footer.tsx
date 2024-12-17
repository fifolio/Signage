// ICONS
import { FcHighPriority } from "react-icons/fc";
import { FcOk } from "react-icons/fc";

export default function Footer() {
    return (
        <div className="bg-white font-normal text-gray-500 text-sm w-full z-50 m-0 border-t-[1px] border-gray-200 px-3 py-2 flex justify-between items-center">

            {/* LEFT AREA */}
            <div className="flex justify-start">
                {/* CONNECTION STATE */}
                <div>
                    {/* Disconnected - INDICATOR */}
                    <span id="disconnected" className="hidden">
                        <div className="flex justify-center items-center space-x-2">
                            <span><FcHighPriority className="!size-4" /></span>
                            <span>Disconnected</span>
                        </div>
                    </span>

                    {/* Connected - INDICATOR */}
                    <span id="connected" className="block">
                        <div className="flex justify-center items-center space-x-2">
                            <span><FcOk className="!size-4" /></span>
                            <span className="border-r-[1px] pr-2">Connected</span>
                            <div className="">
                                Display ID: DISP-001
                            </div>
                        </div>
                    </span>
                </div>
            </div>

            {/* RIGHT AREA */}
            <div>Canvas: 1920 × 1080 px</div>
        </div>
    )
}
