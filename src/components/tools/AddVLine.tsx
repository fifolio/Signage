// UI
import { Button } from "../ui/button";

// STORES
import useTools from "@/stores/tools/useTools";

// ICONS
import { RxDividerVertical } from "react-icons/rx";


export default function AddVLine() {

    const {
        // Add Vertical Line
        setAddVerticalLine
    } = useTools();

  return (
    <Button onClick={() => setAddVerticalLine(true)} variant="outline"><RxDividerVertical className="!size-5" /></Button>
)
}
