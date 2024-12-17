import { useEffect, useRef } from 'react';
import { StaticCanvas, FabricText } from 'fabric';

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasInstance = useRef<StaticCanvas | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      // Dispose of the existing canvas instance if it exists
      if (canvasInstance.current) {
        canvasInstance.current.dispose();
      }

      // Instantiate the canvas and text objects
      const canvas = new StaticCanvas(canvasRef.current);
      const helloWorld = new FabricText('Hello world!');

      // Add the text object to the canvas and center it
      canvas.add(helloWorld);
      canvas.centerObject(helloWorld);

      // Store the canvas instance in the ref
      canvasInstance.current = canvas;
    }

    // Cleanup function to dispose of the canvas when the component unmounts
    return () => {
      if (canvasInstance.current) {
        canvasInstance.current.dispose();
      }
    };
  }, []);

  return (
    <div className="bg-white my-2 mx-auto p-2 border-[1px] border-gray-200 rounded-md min-h-[500px] w-[970px]">
      <canvas ref={canvasRef} />
    </div>
  );
}
