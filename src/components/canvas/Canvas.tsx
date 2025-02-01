import { useEffect, useRef, useState } from 'react';
import Konva from 'konva';

// STORES
import { useFileDetails, useTools, useUserDataStore } from '@/stores';
import { useCanvasStore } from '@/stores';
import useIsSaving from '@/stores/footer/useIsSaving';

// SERVICES
import { updateFileData } from '@/backend/services/files/updateFileData';


export default function Canvas() {

  const [isCanvasReady, setIsCanvasReady] = useState(false);

  // Refs for stage and layer
  const stageRef = useRef<Konva.Stage | null>(null);
  const layerRef = useRef<Konva.Layer | null>(null);

  // State to track the selected object
  const [selectedObject, setSelectedObject] = useState<Konva.Shape | null>(null);

  // State to store the JSON data of the canvas
  const { jsonData, setJsonData } = useCanvasStore();

  // Get user details from store
  const { userData } = useUserDataStore();

  // Get file details from store
  const { fileDetails } = useFileDetails();

  // Check on the saving status
  const { setIsSaving } = useIsSaving();


  const {
    // Add Text
    textOptions,
    handleAddText,
    setHandleAddText,

    // Add Square
    addingSquare,
    squareOptions,
    setAddingSquare,

    // Add Circle
    addingCircle,
    circleOptions,
    setAddingCircle,

    // Add Horizontal Line
    addHorizontalLine,
    setAddHorizontalLine,

    // Add Vertical Line
    addVerticalLine,
    setAddVerticalLine,

    // Add Img
    addImg,
    imgUrl,
    setAddImg,
    setImgUrl,

    // Add Video
    addVideo,
    videoUrl,
    setAddVideo,
    setVideoUrl,
  } = useTools();

  // Function to load images and videos from URLs
  const loadAssets = (node: Konva.Node) => {
    if (node.getClassName() === 'Image') {
      // Handle images
      const imageUrl = node.getAttr('imageUrl');
      if (imageUrl) {
        const image = new window.Image();
        image.src = imageUrl;
        image.onload = () => {
          node.setAttr('image', image); // Set the loaded image
          node.getLayer()?.batchDraw(); // Redraw the layer
        };
      }

      // Handle videos
      const videoUrl = node.getAttr('videoUrl');
      if (videoUrl) {
        const video = document.createElement('video');
        video.src = videoUrl;
        video.autoplay = true;
        video.loop = true;
        video.muted = false; // Ensure the video is muted for autoplay

        video.onloadeddata = () => {
          node.setAttr('image', video); // Set the video as the image
          node.getLayer()?.batchDraw(); // Redraw the layer

          // Restore playback state
          const isPlaying = node.getAttr('isPlaying');
          if (isPlaying) {
            video.play();
          } else {
            video.pause();
          }

          // Add click event to toggle play/pause
          node.on('click', () => {
            if (video.paused) {
              video.play();
            } else {
              video.pause();
            }
            node.getLayer()?.batchDraw();
          });

          // Start the video frame update loop
          const updateVideoFrame = () => {
            node.setAttr('image', video);
            node.getLayer()?.batchDraw();
            requestAnimationFrame(updateVideoFrame);
          };

          updateVideoFrame();
        };
      }
    }
  };


  // Initialize Konva stage and layer
  useEffect(() => {
    const stage = new Konva.Stage({
      container: 'container',
      width: 1920,
      height: 1080,
    });
    const layer = new Konva.Layer();

    // Add layer to the stage
    stage.add(layer);

    // Save stage and layer in refs
    stageRef.current = stage;
    layerRef.current = layer;

    // Load JSON data if it exists
    if (jsonData) {
      const loadedStage = Konva.Node.create(jsonData, 'container') as Konva.Stage;
      stageRef.current = loadedStage;
      layerRef.current = loadedStage.getLayers()[0];

      // Add event listeners and load assets for all nodes
      loadedStage.getLayers().forEach((layer) => {
        layer.getChildren().forEach((node) => {
          addEventListeners(node);
          loadAssets(node); // Load images and videos
        });
      });
    }

    setIsCanvasReady(true);
  }, []);

  // Function to export JSON data
  const exportJsonData = () => {
    if (stageRef.current) {
      const jsonData = stageRef.current.toJSON();
      setJsonData(jsonData);
    }
  };

  // Call exportJsonData whenever stageRef or layerRef changes
  useEffect(() => {
    exportJsonData();
  }, [stageRef.current, layerRef]);

  // Function to add event listeners to update JSON data on transform and dragmove
  const addEventListeners = (node: Konva.Node) => {
    node.on('transform', exportJsonData);
    node.on('dragmove', exportJsonData);
  };

  // Handle Adding Text
  useEffect(() => {
    if (isCanvasReady && handleAddText) {
      const layer = layerRef.current;

      if (!layer) return;

      // Create a new text element
      const text = new Konva.Text({
        x: 50,
        y: 50,
        draggable: true,
        text: textOptions.text,
        fontSize: textOptions.fontSize,
        fill: textOptions.color,
      });

      // Add the text to the layer
      layer.add(text);
      layer.draw(); // Redraw the layer to reflect changes

      // Add event listeners to update JSON data
      addEventListeners(text);

      // Update JSON data
      exportJsonData();

      // Reset the handleAddText flag
      setHandleAddText(false);
    }
  }, [textOptions, handleAddText, setHandleAddText, isCanvasReady]);

  // Handle Adding Square
  useEffect(() => {
    if (isCanvasReady && addingSquare) {
      const layer = layerRef.current;

      if (!layer) return;

      // Create a new square element
      const square = new Konva.Rect({
        x: 50,
        y: 50,
        draggable: true,
        stroke: squareOptions.stroke,
        strokeWidth: squareOptions.strokeWidth,
        width: squareOptions.width,
        height: squareOptions.height,
        fill: squareOptions.fill === "null" ? 'transparent' : squareOptions.fill
      });

      // Add the square to the layer
      layer.add(square);
      layer.draw(); // Redraw the layer to reflect changes

      // Add event listeners to update JSON data
      addEventListeners(square);

      // Update JSON data
      exportJsonData();

      // Reset the setAddingSquare flag
      setAddingSquare(false);
    }
  }, [addingSquare, squareOptions, setAddingSquare, isCanvasReady]);

  // Handle Adding Circle
  useEffect(() => {
    if (isCanvasReady && addingCircle) {
      const layer = layerRef.current;

      if (!layer) return;

      // Create a new circle element
      const circle = new Konva.Circle({
        x: 50,
        y: 50,
        radius: 50,
        draggable: true,
        width: circleOptions.circleSize,
        height: circleOptions.circleSize,
        stroke: circleOptions.stroke,
        strokeWidth: circleOptions.strokeWidth,
        fill: circleOptions.fill === "null" ? 'transparent' : circleOptions.fill,
      });

      // Add the circle to the layer
      layer.add(circle);
      layer.draw(); // Redraw the layer to reflect changes

      // Add event listeners to update JSON data
      addEventListeners(circle);

      // Update JSON data
      exportJsonData();

      // Reset the setAddingCircle flag
      setAddingCircle(false);
    }
  }, [addingCircle, circleOptions, setAddingCircle, isCanvasReady]);

  // Handle Adding Horizontal Line
  useEffect(() => {
    if (isCanvasReady && addHorizontalLine) {
      const layer = layerRef.current;

      if (!layer) return;

      // Create a new Horizontal Line element
      const HLine = new Konva.Line({
        points: [20, 50, 220, 50],
        x: 50,
        y: 50,
        draggable: true,
        stroke: 'black',
        strokeWidth: 2,
      });

      // Add the Horizontal Line to the layer
      layer.add(HLine);
      layer.draw(); // Redraw the layer to reflect changes

      // Add event listeners to update JSON data
      addEventListeners(HLine);

      // Update JSON data
      exportJsonData();

      // Reset the setAddHorizontalLine flag
      setAddHorizontalLine(false);
    }
  }, [addHorizontalLine, setAddHorizontalLine, isCanvasReady]);

  // Handle Adding Vertical Line
  useEffect(() => {
    if (isCanvasReady && addVerticalLine) {
      const layer = layerRef.current;

      if (!layer) return;

      // Create a new Vertical Line element
      const VLine = new Konva.Line({
        points: [20, 220, 20, 50],
        x: 50,
        y: 50,
        draggable: true,
        stroke: 'black',
        strokeWidth: 2,
      });

      // Add the Vertical Line to the layer
      layer.add(VLine);
      layer.draw(); // Redraw the layer to reflect changes

      // Add event listeners to update JSON data
      addEventListeners(VLine);

      // Update JSON data
      exportJsonData();

      // Reset the setAddVerticalLine flag
      setAddVerticalLine(false);
    }
  }, [addVerticalLine, setAddVerticalLine, isCanvasReady]);

  // Handle Adding Images
  useEffect(() => {
    if (isCanvasReady && addImg) {
      const layer = layerRef.current;

      if (!layer) return;

      // Create a new Image element
      const image = new Image();
      image.src = `${imgUrl}`;
      image.onload = () => {
        const myimg = new Konva.Image({
          x: 50,
          y: 50,
          image: image,
          draggable: true,
          width: image.width,
          height: image.height,
        });

        // Add the image URL as a custom attribute
        myimg.setAttr('imageUrl', imgUrl);

        // Add a transformer for resizing
        const transformer = new Konva.Transformer({
          nodes: [myimg],
          enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
          anchorSize: 8,
          borderDash: [4, 4], // Optional: for styling
        });

        // Add click event to the image for selecting it
        myimg.on('click', () => {
          layer.add(transformer);
          transformer.nodes([myimg]);
          setSelectedObject(myimg); // Set the selected object
          layer.draw();
        });

        // Handle deselection
        stageRef.current?.on('click', (e) => {
          if (e.target === stageRef.current) {
            transformer.detach(); // Detach the transformer when clicking outside
            layer.draw();
          } else if (e.target !== myimg) {
            transformer.detach(); // Detach if clicking on any other object
            layer.draw();
          }
        });

        // Add the image and transformer to the layer
        layer.add(myimg);
        layer.add(transformer);
        layer.draw(); // Redraw the layer to reflect changes

        // Add event listeners to update JSON data
        addEventListeners(myimg);

        // Update JSON data
        exportJsonData();

        // Reset the setAddImg flag
        setTimeout(() => {
          setAddImg(false);
          setImgUrl('');
        }, 2000);
      };
    }
  }, [addImg, imgUrl, setAddImg, setImgUrl, isCanvasReady]);

  // Handle Adding Videos
  useEffect(() => {
    if (isCanvasReady && addVideo) {
      const layer = layerRef.current;

      if (!layer) return;

      // Create a new Video element
      const video = document.createElement('video');
      video.src = `${videoUrl}`;
      video.autoplay = true;
      video.loop = true;
      video.muted = false;
      video.onloadeddata = () => {
        const myVideo = new Konva.Image({
          x: 50,
          y: 50,
          image: video,
          draggable: true,
          width: 500,
          height: 300,
        });

        // Add the video URL as a custom attribute
        myVideo.setAttr('videoUrl', videoUrl);

        // Add a transformer for resizing
        const transformer = new Konva.Transformer({
          nodes: [myVideo],
          enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
          anchorSize: 8,
          borderDash: [4, 4], // Optional: for styling
        });

        // Add click event to the video for selecting it and toggling play/pause
        myVideo.on('click', () => {
          if (video.paused) {
            video.play();
          } else {
            video.pause();
          }
          layer.add(transformer);
          transformer.nodes([myVideo]);
          setSelectedObject(myVideo); // Set the selected object
          layer.draw();
        });

        // Handle deselection
        stageRef.current?.on('click', (e) => {
          if (e.target === stageRef.current) {
            transformer.detach(); // Detach the transformer when clicking outside
            layer.draw();
          } else if (e.target !== myVideo) {
            transformer.detach(); // Detach if clicking on any other object
            layer.draw();
          }
        });

        // Function to update the video frame
        const updateVideoFrame = () => {
          myVideo.image(video);
          layer.batchDraw();
          requestAnimationFrame(updateVideoFrame);
        };

        // Start updating the video frame
        updateVideoFrame();

        // Add the video and transformer to the layer
        layer.add(myVideo);
        layer.add(transformer);
        layer.draw(); // Redraw the layer to reflect changes

        // Add event listeners to update JSON data
        addEventListeners(myVideo);

        // Update JSON data
        exportJsonData();

        // Reset the setAddVideo flag
        setTimeout(() => {
          setAddVideo(false);
          setVideoUrl('');
        }, 2000);
      };
    }
  }, [addVideo, videoUrl, setAddVideo, setVideoUrl, isCanvasReady]);

  // Global Selection Handling
  useEffect(() => {
    const stage = stageRef.current;
    const layer = layerRef.current;

    if (!stage || !layer) return;

    const transformer = layer.findOne('Transformer') || new Konva.Transformer();
    layer.add(transformer as Konva.Transformer);

    const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
      if (e.target === stage) {
        // Clicked on the stage (empty area), deselect all
        (transformer as Konva.Transformer).detach();
        setSelectedObject(null);
      } else if (e.target !== selectedObject) {
        // Clicked on a new object
        (transformer as Konva.Transformer).nodes([e.target]);
        setSelectedObject(e.target as Konva.Shape);
      }
      layer.draw();
    };

    stage.on('click', handleStageClick);

    return () => {
      stage.off('click', handleStageClick);
    };
  }, [selectedObject]);

  // Listen for the 'Delete' key to delete the selected object
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' && selectedObject) {
        const layer = layerRef.current;
        if (!layer) return;

        // Remove the selected object
        selectedObject.destroy();

        // Clear the selected object reference
        setSelectedObject(null);

        // Find and detach the transformer
        const transformer = layer.findOne('Transformer');
        if (transformer) {
          (transformer as Konva.Transformer).detach();  // Detach transformer to prevent issues with subsequent selections
        }

        layer.draw(); // Redraw the layer to reflect changes

        // Update JSON data
        exportJsonData();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedObject]);


  // Update the JSON Data
  function sentDataToBackend() {
    // Prevent Updating the 'Welcome' File
    if (fileDetails?.$id === "677a7399002e2dc1a522") {
      console.log('Oops!, you are not allowed to make any changes on this file.')
    } else {
      setIsSaving(true);
      setTimeout(async () => {
        await updateFileData(
          fileDetails?.$id,
          jsonData,
          userData?.name
        ).then((res) => {
          if (res === true) {
            setIsSaving(false);
          } else if (res === false) {
            console.log('Error while updating the file', res)
            setIsSaving(false);
          }
        })
      }, 5000)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      sentDataToBackend();
    }, 5000)
  }, [jsonData]);



  return (
    <div className="bg-white my-2 mx-auto pr-5 border-[1px] border-gray-200 min-h-[1080px] w-[1920px]">
      {/* Init canvas stage */}
      <div id="container" className="rounded-md min-w-[1920px] min-h-[1080px]"></div>
    </div>
  );
}