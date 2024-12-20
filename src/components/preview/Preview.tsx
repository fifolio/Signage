// UI
import { Button } from "../ui/button";

// ICONS
import { FcWebcam } from "react-icons/fc";

export default function Preview() {
  return (
<div className="mt-5 mb-6 px-3">

{/* TITLE + Live preview btn */}
<div className="flex justify-between items-center mb-6">
    <h6 className="font-semibold">Preview</h6>
    <Button variant="secondary" className="flex justify-between items-center border-[1px] border-gray-300">
        <FcWebcam className="!size-5" />
        <span>Live Preview</span>
    </Button>
</div>

{/* PREVIEW BOX */}
<div id="previewBox" className="px-3 bg-[ghostwhite] border-[1px] border-gray-200 w-full h-[150px] rounded-md shadow-sm">

    <span id="noPreview">
        <div className="flex justify-center items-center h-full text-gray-500 font-normal">Preview</div>
    </span>
</div>

</div>
  )
}
