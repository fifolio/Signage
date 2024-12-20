// UI
import { Separator } from "../ui/separator";

// COMPONENTS
import Preview from "../preview/Preview";
import Displays from "../displays/Displays";


export default function Manage() {
    return (
        <>
            {/* PREVIEW AREA */}
            <Preview />

            <Separator />

            {/* DISPLAY MANAGE AREA */}
            <Displays />
        </>
    )
}
