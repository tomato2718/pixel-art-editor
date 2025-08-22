import { useRef, useState } from "react";
import {
  useMouseEvent,
  useMousePosition,
  useBackground,
  usePaintBrush,
} from "./hooks";
import { usePixelArtEditor } from "@/features/PixelArtEditor";

const PIXEL_SIZE = 32;
const WIDTH = 20;
const HEIGHT = 20;

export function Editor() {
  const [color, setColor] = useState("#000000");
  const editor = usePixelArtEditor(WIDTH, HEIGHT);
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);
  const mouseCanvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useMousePosition(mouseCanvasRef);
  const paint = usePaintBrush(editor, backgroundCanvasRef.current, PIXEL_SIZE, parseRGB(color));

  useBackground(backgroundCanvasRef, editor, PIXEL_SIZE);
  useMouseEvent(mouseCanvasRef, mousePosition, PIXEL_SIZE, paint);

  return (
    <div className="flex h-full gap-2 pt-4">
      <div className="h-full w-full flex justify-center relative">
        <canvas
          ref={backgroundCanvasRef}
          className="absolute bg-grayscale-3 border border-grayscale-6 cursor-none"
          width={640}
          height={640}
        />
        <canvas
          ref={mouseCanvasRef}
          className="absolute border border-transparent cursor-none"
          width={640}
          height={640}
        />
      </div>
      <div className="h-full w-1/5">
        <input
          type="color"
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

function parseRGB(rgbString: string): {
  r: number,
  g: number,
  b: number,
  a: number
}{
  const rHex = rgbString.slice(1, 3);
  const gHex = rgbString.slice(3, 5);
  const bHex = rgbString.slice(5, 7);
  return {
    r: Number(`0x${rHex}`),
    g: Number(`0x${gHex}`),
    b: Number(`0x${bHex}`),
    a: 255,
  }
}