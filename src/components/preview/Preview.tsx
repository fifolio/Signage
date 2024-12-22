import { useRef, useEffect, useState } from "react";
import { Canvas } from "fabric";

// UI
import { Button } from "../ui/button";
import LoadingState from "../ui/LoadingState";

// ICONS
import { FcWebcam } from "react-icons/fc";

// STORES
import useLivePreview from "@/stores/livePreview/useLivePreview";
import useCanvasStore from "@/stores/canvasStore/useCanvasStore";

export default function Preview() {
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasInstance = useRef<Canvas | null>(null);
  const { jsonData } = useCanvasStore();
  const { loadingLivePreview, setLoadingLivePreview } = useLivePreview();

  const [canvasReady, setCanvasReady] = useState<boolean>(false);

  const [hiddenCanvas, setHiddenCanvas] = useState<boolean>(true);


  // Function to initialize the canvas
  const initializeCanvas = () => {
    if (previewCanvasRef.current && jsonData) {
      if (canvasInstance.current) {
        canvasInstance.current.dispose();
      }

      const canvas = new Canvas(previewCanvasRef.current);
      canvasInstance.current = canvas;

      // Set canvas dimensions
      canvas.setDimensions({ width: 263, height: 130 });
      canvas.getContext().scale(1, 1);

      // Make the objects smaller
      canvas.setZoom(0.27);

      // Load JSON data and apply restrictions
      canvas.loadFromJSON(jsonData, () => {

        // Prevent selection
        canvas.on("selection:created", () => {
          canvas.discardActiveObject(); // Deselect any selection
        });

        setTimeout(() => {
          canvas.renderAll(); // Re-render the canvas
          setHiddenCanvas(false);
        }, 3000)
        setTimeout(() => {
          setLoadingLivePreview(false);
        }, 3500)
      });
    } else {
      console.error("Canvas data is not available yet.");
      setLoadingLivePreview(false);
    }
  };



  // Ensure the reference is ready before initializing
  useEffect(() => {
    if (previewCanvasRef.current) {
      setCanvasReady(true); // Mark the canvas as ready
    }
  }, []);

  // Handle live preview button click
  const handleLivePreviewClick = () => {
    if (!canvasReady) {
      console.error("Canvas is not ready yet.");
      return;
    }
    setLoadingLivePreview(true);
    setHiddenCanvas(true);
    initializeCanvas();
  };

  return (
    <div className="mt-5 mb-6 px-3">
      {/* TITLE + Live preview btn */}
      <div className="flex justify-between items-center mb-6">
        <h6 className="font-semibold">Live Preview</h6>
        <Button
          disabled={loadingLivePreview || !canvasReady}
          onClick={handleLivePreviewClick}
          variant="secondary"
          className="flex justify-between items-center border-[1px] border-gray-300"
        >
          <FcWebcam className="!size-5" />
          <span>Refresh</span>
        </Button>
      </div>

      {/* PREVIEW BOX */}
      <div id="previewBox" className={`${hiddenCanvas ? 'hidden' : 'block'} rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 
      overflow-hidden border-[1px] border-gray-200 py-1 pl-[3.3px]`}>

        <canvas ref={previewCanvasRef} className="rounded-md min-w-[263px] max-h-[130px]"></canvas>

      </div>

      {/* PRE-PREVIEW */}
      <div className={`${hiddenCanvas ? 'block' : 'hidden'} rounded-md border-[1px] border-gray-200 min-h-[138px]`}>

        {/* Loading State */}
        {loadingLivePreview ? (
          <div className="flex justify-center items-center min-h-[138px]">
            <LoadingState setWidth="50" />
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-[138px] text-gray-500 font-normal">
            Refresh to see live preview
          </div>
        )}
      </div>

    </div>
  );
}
