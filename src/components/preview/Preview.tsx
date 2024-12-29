// UI
import { Button } from "../ui/button";

// ICONS
import { FcWebcam } from "react-icons/fc";


export default function Preview() {
  return (
    <div className="mt-5 mb-6 px-3">
      {/* TITLE + Live preview btn */}
      <div className="flex justify-between items-center mb-6">
        <h6 className="font-semibold">Live Preview</h6>
        <Button
          // disabled={loadingLivePreview || !canvasReady}
          // onClick={handleLivePreviewClick}
          variant="secondary"
          className="flex justify-between items-center border-[1px] border-gray-300"
        >
          <FcWebcam className="!size-5" />
          <span>Refresh</span>
        </Button>
      </div>

      {/* PREVIEW BOX */}
      <div className="bg-white my-2 border-[1px] border-gray-200 rounded-md min-h-[350px] w-[265px]">
        {/* Init canvas stage */}
        <div id="previewContainer" className="rounded-md min-w-[265px] min-h-[350px]"></div>
      </div>

    </div>
  )
}
