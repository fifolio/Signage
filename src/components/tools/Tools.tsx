// UI
import { Separator } from "@/components/ui/separator";

// TOOLS
import AddText from "./AddText";
import AddImage from "./AddImage";
import AddVideo from "./AddVideo";
import AddSquare from "./AddSquare";
import AddCircle from "./AddCircle";
import AddHLine from "./AddHLine";
import AddVLine from "./AddVLine";
import Info from "./Info";

export default function Tools() {

    return (
        <div className="space-y-3 flex flex-col items-center">

            {/* ADD TEXT */}
            <AddText />

            <Separator />

            {/* ADD IMAGE */}
            <AddImage />

            {/* ADD VIDEO */}
            <AddVideo />

            <Separator />

            {/* ADD SQUARE */}
            <AddSquare />

            {/* ADD CIRCLE */}
            <AddCircle />

            {/* ADD HORIZONTAL LINE */}
            <AddHLine />

            {/* ADD VERTICAL LINE */}
            <AddVLine />

            <Separator />

            {/* INFO / HOW TO USE */}
            <Info />

        </div>
    );
}
