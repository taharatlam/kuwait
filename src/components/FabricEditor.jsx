"use client";

import React, { useEffect, useRef, useState } from "react";
import fabric from "fabric";

export default function FabricEditor() {
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);

  const [bgColor, setBgColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [fontSize, setFontSize] = useState(24);
  const [textValue, setTextValue] = useState("");

  useEffect(() => {
    const loadFabric = async () => {
      const fabric = (await import("fabric")).default;
      console.log("fabric", fabric); // should log the fabric object now

      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 500,
        backgroundColor: bgColor,
      });

      fabricRef.current = canvas;
    };

    loadFabric();

    return () => {
      if (fabricRef.current) {
        fabricRef.current.dispose();
      }
    };
  }, []);

  const addText = async () => {
    const { fabric } = await import("fabric");
    const canvas = fabricRef.current;
    if (!canvas) return;

    const text = new fabric.IText(textValue || "Text Here", {
      left: 100,
      top: 100,
      fill: textColor,
      fontSize: parseInt(fontSize, 10),
    });

    canvas.add(text);
    canvas.setActiveObject(text);
  };

  const addShape = async (shape) => {
    const { fabric } = await import("fabric");
    const canvas = fabricRef.current;

    let shapeObj;

    if (shape === "rect") {
      shapeObj = new fabric.Rect({
        left: 100,
        top: 100,
        fill: "#00f",
        width: 100,
        height: 100,
      });
    } else if (shape === "circle") {
      shapeObj = new fabric.Circle({
        left: 100,
        top: 100,
        fill: "#0f0",
        radius: 50,
      });
    }

    canvas.add(shapeObj);
    canvas.setActiveObject(shapeObj);
  };

  const handleImageUpload = async (e) => {
    const { fabric } = await import("fabric");
    const canvas = fabricRef.current;
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      fabric.Image.fromURL(reader.result, (img) => {
        img.set({ left: 100, top: 100, scaleX: 0.5, scaleY: 0.5 });
        canvas.add(img);
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="container mt-4">
      <h2>Fabric Editor</h2>

      <div className="row mb-3">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Enter text"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="color"
            className="form-control form-control-color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="number"
            className="form-control"
            placeholder="Font size"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
          />
        </div>
        <div className="col">
          <button className="btn btn-primary w-100" onClick={addText}>
            Add Text
          </button>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <input
            type="color"
            className="form-control form-control-color"
            value={bgColor}
            onChange={(e) => {
              setBgColor(e.target.value);
              if (fabricRef.current) {
                fabricRef.current.setBackgroundColor(
                  e.target.value,
                  fabricRef.current.renderAll.bind(fabricRef.current)
                );
              }
            }}
          />
        </div>
        <div className="col">
          <input
            type="file"
            className="form-control"
            onChange={handleImageUpload}
          />
        </div>
        <div className="col">
          <button
            className="btn btn-success w-100"
            onClick={() => addShape("rect")}
          >
            Add Rectangle
          </button>
        </div>
        <div className="col">
          <button
            className="btn btn-success w-100"
            onClick={() => addShape("circle")}
          >
            Add Circle
          </button>
        </div>
      </div>

      <canvas ref={canvasRef} className="border" />
    </div>
  );
}
