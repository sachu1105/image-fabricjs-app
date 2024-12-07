import { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);
  const [imageSize, setImageSize] = useState({ width: 500, height: 500 });

  useEffect(() => {
    if (canvasRef.current && !fabricCanvas.current) {
      fabricCanvas.current = new fabric.Canvas(canvasRef.current, {
        backgroundColor: '#f0f0f0',
        selection: false,
        width: imageSize.width,
        height: imageSize.height,
      });
      console.log('Fabric canvas initialized:', fabricCanvas.current);
    }
  }, [imageSize]);

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const imageUrl = reader.result;
        console.log('Image URL loaded', imageUrl);
        console.log('Attempting to load image with Fabric.js:', imageUrl);
        console.log('Fabric.js version:', fabric.version);

        fabric.Image.fromURL(imageUrl, (img) => {
          if (img) {
            console.log('Image loaded:', img);
            console.log('Image dimensions:', img.width, img.height);

            // Clear any previous content on the canvas
            fabricCanvas.current.clear();

            // Set the canvas size based on the image size
            fabricCanvas.current.setWidth(img.width);
            fabricCanvas.current.setHeight(img.height);
            setImageSize({ width: img.width, height: img.height });

            // Add image to canvas
            img.set({
              left: 0,
              top: 0,
              scaleX: 1,
              scaleY: 1,
            });

            fabricCanvas.current.add(img);
            fabricCanvas.current.renderAll(); // Re-render the canvas to show the image
            console.log('Image added to canvas');
          } else {
            console.error('Error loading image into fabric canvas');
          }
        });
      };

      reader.onerror = (err) => {
        console.error('FileReader error:', err);
      };

      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid image file.');
    }
  };

  // Add Rectangle Annotation
  const addRectangle = () => {
    const rect = new fabric.Rect({
      left: 50,
      top: 50,
      fill: 'rgba(0, 0, 255, 0.3)',
      width: 100,
      height: 80,
      selectable: true,
      hasBorders: true,
      hasControls: true,
    });
    fabricCanvas.current.add(rect);
  };

  // Add Circle Annotation
  const addCircle = () => {
    const circle = new fabric.Circle({
      left: 200,
      top: 200,
      radius: 50,
      fill: 'rgba(255, 0, 0, 0.3)',
      selectable: true,
      hasBorders: true,
      hasControls: true,
    });
    fabricCanvas.current.add(circle);
  };

  // Add Text Annotation
  const addText = () => {
    const text = new fabric.Textbox('Sample Text', {
      left: 300,
      top: 300,
      fontSize: 20,
      selectable: true,
      hasBorders: true,
      hasControls: true,
    });
    fabricCanvas.current.add(text);
  };

  // Delete Selected Annotation
  const deleteAnnotation = () => {
    const activeObject = fabricCanvas.current.getActiveObject();
    if (activeObject) {
      fabricCanvas.current.remove(activeObject);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Image Upload Input */}
      <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />

      {/* Annotation Buttons */}
      <div className="flex space-x-4 mb-4">
        <button onClick={addRectangle} className="bg-blue-500 text-white p-2 rounded">Add Rectangle</button>
        <button onClick={addCircle} className="bg-green-500 text-white p-2 rounded">Add Circle</button>
        <button onClick={addText} className="bg-yellow-500 text-white p-2 rounded">Add Text</button>
        <button onClick={deleteAnnotation} className="bg-red-500 text-white p-2 rounded">Delete Selected</button>
      </div>

      {/* Canvas */}
      <canvas ref={canvasRef} className="border border-gray-300" width={imageSize.width} height={imageSize.height} />
    </div>
  );
};

export default CanvasComponent;
