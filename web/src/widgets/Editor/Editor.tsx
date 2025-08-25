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
  const [color, setColor] = useState({ rgb: "#000000", alpha: 0 });
  const editor = usePixelArtEditor(WIDTH, HEIGHT);
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);
  const mouseCanvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useMousePosition(mouseCanvasRef);
  const paint = usePaintBrush(
    editor,
    backgroundCanvasRef.current,
    PIXEL_SIZE,
    parseRGB(color.rgb, color.alpha),
  );

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
      <div className="h-full w-1/5 flex flex-col gap-2">
        <div className="flex gap-2  items-center">
          <span>Color picker</span>
          <input
            type="color"
            className="cursor-pointer"
            value={color.rgb}
            onChange={(e) => {
              setColor({ rgb: e.target.value, alpha: 255 });
            }}
          />
        </div>
        <div className="flex gap-2 items-center">
          <span>Remove pixel</span>
          <button
            className="border border-grayscale-6 hover:border-grayscale-7 cursor-pointer w-12 h-5"
            onClick={() => setColor({ rgb: "#000000", alpha: 0 })}
          />
        </div>
        <div>
          <button
            className="px-4 py-2 rounded-md bg-accent-9 hover:bg-accent-10 text-white cursor-pointer text-nowrap"
            onClick={() => {
              if (!editor) return;

              const buffer = editor.to_png(PIXEL_SIZE).buffer as ArrayBuffer;
              const blob = new Blob([buffer], { type: "image/png" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "PixelArt.png";
              a.click();

              URL.revokeObjectURL(url);
            }}
          >
            Save as png
          </button>
        </div>
      </div>
    </div>
  );
}

function parseRGB(
  rgbString: string,
  alpha: number,
): {
  r: number;
  g: number;
  b: number;
  a: number;
} {
  const rHex = rgbString.slice(1, 3);
  const gHex = rgbString.slice(3, 5);
  const bHex = rgbString.slice(5, 7);
  return {
    r: Number(`0x${rHex}`),
    g: Number(`0x${gHex}`),
    b: Number(`0x${bHex}`),
    a: alpha,
  };
}
