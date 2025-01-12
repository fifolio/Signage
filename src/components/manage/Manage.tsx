// UI
import { Separator } from "../ui/separator";

// COMPONENTS
import Preview from "../preview/Preview";
import Displays from "../displays/Displays";


export default function Manage() {
    return (
        <div className="flex flex-col justify-between w-full h-full">
            {/* PREVIEW AREA */}
            <Preview />

            <div className="hidden">
                <Separator />

                {/* DISPLAY MANAGE AREA */}
                <Displays />
            </div>
        </div>
    )
}
