// UI
import { Button } from "../ui/button";

// ICONS
import { GoHorizontalRule } from "react-icons/go";

// STORES
import useTools from "@/stores/tools/useTools";

export default function AddHLine() {

    const {
        // Add Horizontal Line
        setAddHorizontalLine,
    } = useTools();

  return (
    <Button onClick={() => setAddHorizontalLine(true)} variant="outline"><GoHorizontalRule className="!size-5" /></Button>
)
}
