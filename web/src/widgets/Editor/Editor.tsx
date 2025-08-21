import { useRef } from "react";
import { useMouseEvent, useMousePosition } from "./hooks";

const PixelSize = 32;

export function Editor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useMousePosition(canvasRef);
  useMouseEvent(canvasRef, mousePosition, PixelSize);

  return (
    <div className="h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="bg-grayscale-3 border border-grayscale-6 cursor-none"
        width={640}
        height={640}
      />
    </div>
  );
}
