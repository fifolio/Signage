import { useEffect, useRef } from 'react';
import { Textbox, Canvas as FabricCanvas, Rect, Circle, Line } from 'fabric'; // Assuming you're using fabric.js for canvas

// STORES
import useTools from '@/stores/tools/useTools';

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasInstance = useRef<FabricCanvas | null>(null);

  const {
    // Add Text
    textOptions,
    handleAddText,
    setHandleAddText,

    // Add Square
    addingSquare,
    setAddingSquare,
    squareOptions,

    // Add Circle
    addingCircle,
    setAddingCircle,
    circleOptions,

    // Add Horizontal Line
    addHorizontalLine,
    setAddHorizontalLine,

    // Add Vertical Line
    addVerticalLine,
    setAddVerticalLine,
  } = useTools();

  useEffect(() => {
    if (canvasRef.current) {
      // Dispose of the existing canvas instance if it exists
      if (canvasInstance.current) {
        canvasInstance.current.dispose();
      }

      // Initialize the canvas
      const dpr = window.devicePixelRatio || 1;
      const canvas = new FabricCanvas(canvasRef.current);

      // Set canvas dimensions and scaling
      canvas.setWidth(canvasRef.current.offsetWidth * dpr);
      canvas.setHeight(canvasRef.current.offsetHeight * dpr);
      canvas.contextContainer.scale(dpr, dpr);

      canvasInstance.current = canvas;

      // Add double-click event for text editing
      canvas.on('mouse:dblclick', () => {
        const activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'textbox') {
          activeObject.set({ editable: true });
          canvas.renderAll();
        }
      });

      // Add "Delete" key functionality
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Delete') {
          const activeObject = canvas.getActiveObject();
          if (activeObject) {
            canvas.remove(activeObject);
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      // Cleanup function
      return () => {
        canvas.dispose();
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, []);


  // Handle Adding Text
  useEffect(() => {
    if (handleAddText && canvasInstance.current) {
      const text = new Textbox(textOptions.text, {
        left: 50,
        top: 50,
        fill: textOptions.color,
        fontSize: textOptions.fontSize * window.devicePixelRatio,
        editable: true,
        width: 300,
        wordWrap: false,
      });

      canvasInstance.current.add(text);
      canvasInstance.current.renderAll();

      setHandleAddText(false);
    }
  }, [handleAddText, textOptions, setHandleAddText]);


  // Handle Adding Square
  useEffect(() => {
    if (addingSquare && canvasInstance.current) {
      const square = new Rect({
        left: 100,
        top: 100,
        fill: squareOptions.fill === "null" ? null : squareOptions.fill,
        stroke: squareOptions.stroke,
        hasBorders: true,
        strokeWidth: squareOptions.strokeWidth,
        strokeUniform: true,
        width: squareOptions.width,
        height: squareOptions.height,
      });

      canvasInstance.current.add(square);
      canvasInstance.current.renderAll();

      setAddingSquare(false);
    }
  }, [squareOptions, addingSquare, setAddingSquare]);


  // Handle Adding Circle
  useEffect(() => {
    if (addingCircle && canvasInstance.current) {
      const circle = new Circle({
        left: 100,
        top: 100,
        fill: circleOptions.fill === "null" ? null : circleOptions.fill,
        radius: 50,
        stroke: circleOptions.stroke,
        hasBorders: true,
        strokeWidth: circleOptions.strokeWidth,
        strokeUniform: true,
      });

      canvasInstance.current.add(circle);
      canvasInstance.current.renderAll();

      setAddingCircle(false);
    }
  }, [circleOptions, addingCircle, setAddingCircle]);

  // Handle Adding Horizontal Line
  useEffect(() => {
    if (addHorizontalLine && canvasInstance.current) {
      const hLine = new Line([50, 100, 300, 100], {
        left: 100, // Left position
        top: 100,  // Top position
        stroke: 'black',
        strokeWidth: 1,
        strokeUniform: true,
      });

      canvasInstance.current.add(hLine);
      canvasInstance.current.renderAll();

      setAddHorizontalLine(false);
    }
  }, [addHorizontalLine, setAddHorizontalLine]);

  // Handle Adding Vertical Line
  useEffect(() => {
    if (addVerticalLine && canvasInstance.current) {
      const vLine = new Line([150, 50, 150, 300], {
        left: 100, // Left position
        top: 100,  // Top position
        stroke: 'black',
        strokeWidth: 1,
        strokeUniform: true,
      });

      canvasInstance.current.add(vLine);
      canvasInstance.current.renderAll();

      setAddVerticalLine(false);
    }
  }, [addVerticalLine, setAddVerticalLine]);

  return (
    <div className="bg-white my-2 mx-auto p-2 border-[1px] border-gray-200 rounded-md min-h-[500px] w-[970px]">
      <canvas ref={canvasRef} className="rounded-md min-w-[950px] min-h-[480px] border-[1px] border-gray-400" />
    </div>
  );
}
