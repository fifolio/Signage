import { useRef, useState } from 'react';
import Konva from 'konva';

// UI
import { Button } from "../ui/button";

// ICONS
import { FcWebcam } from "react-icons/fc";

// STORES
import { useCanvasStore } from '@/stores';

export default function Preview() {
  const stageRef = useRef<Konva.Stage | null>(null);

  const { jsonData } = useCanvasStore();

  const [isStageHasObjects, setIsStateHasObjects] = useState(false);


  const handleLivePreviewClick = () => {
    setIsStateHasObjects(true)

    if (jsonData) {
      // Remove previous stage, if any
      if (stageRef.current) {
        stageRef.current.destroy();
      }

      // Recreate the stage from JSON data
      const stage = Konva.Node.create(jsonData, 'previewContainer');
      stage.scale({ x: 0.273, y: 0.3 }); // Scale to fit within 265x350
      stage.width(265);
      stage.height(320);

      // Load images and videos
      stage.find('Image').forEach((node: Konva.Image) => {
        const imageUrl = node.getAttr('imageUrl');
        const videoUrl = node.getAttr('videoUrl');

        if (imageUrl) {
          const image = new window.Image();
          image.src = imageUrl;
          image.onload = () => {
            node.image(image);
            stage.batchDraw();
          };
        }

        if (videoUrl) {
          const video = document.createElement('video');
          video.src = videoUrl;
          video.crossOrigin = 'anonymous'; // Avoid CORS issues
          video.loop = true;
          video.muted = false; // Enable sound if required

          // Function to handle smooth playback
          const animate = () => {
            if (!video.paused) {
              node.getLayer()?.batchDraw();
              requestAnimationFrame(animate);
            }
          };

          // Play video on load
          video.onloadeddata = () => {
            node.image(video);
            stage.batchDraw();
            video.play(); // Ensure video starts playing
            requestAnimationFrame(animate); // Start animation
          };

          // Add play/pause toggle
          node.on('click', () => {
            if (video.paused) {
              video.play();
              requestAnimationFrame(animate); // Restart animation loop
            } else {
              video.pause();
            }
          });
        }
      });

      // Make all objects non-draggable
      stage.find('Shape').forEach((node: Konva.Node) => {
        node.draggable(false);
      });

      stageRef.current = stage;

      console.log('Recreated stage with JSON data: ', jsonData);
    }
  };

console.log('jsonData =>', jsonData.length)

  return (
    <div className="mt-2 mb-3 px-3">
      {/* TITLE + Live preview btn */}
      <div className="flex justify-between items-center mb-3">
        <h6 className="font-semibold">Live Preview</h6>
        <Button
          onClick={handleLivePreviewClick}
          variant="secondary"
          className="flex justify-between items-center border-[1px] border-gray-300"
        >
          <FcWebcam className="!size-5" />
          <span>Refresh</span>
        </Button>
      </div>

      {/* PREVIEW BOX */}
      <div className="bg-white my-2 border-[1px] border-gray-200 h-[320px] w-[266px]">
       
        {/* NO DATA */}
        {!isStageHasObjects && (
          <span className="text-gray-500 text-sm flex justify-center items-center h-0 absolute mt-[155px] w-[260px] mx-auto text-center">
            Update your workspace by adding objects, then click "Refresh" to see the changes.
          </span>
        )}
       
        {/* PREVIEW CONTAINER */}
        <div id="previewContainer" className="min-w-[265px] h-[320px]">
        </div>
      
        {/* PREVIEW NOTE */}
        <div className="text-sm mt-1 bg-yellow-100 border-[1px] border-yellow-500 rounded-md text-yellow-600 px-2 py-1">
          <span>This preview shows how the current workspace will appear on the final screens.</span>
        </div>
     
      </div>

    </div>
  );
}