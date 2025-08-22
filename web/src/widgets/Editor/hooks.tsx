import { useState, useEffect, useCallback, type RefObject } from "react";

import { type Canvas } from "@/shared/Canvas";

type MousePosition = {
  x: number;
  y: number;
};

export function useMousePosition(
  canvasRef: RefObject<HTMLCanvasElement | null>,
): MousePosition {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();

    const handleMouseMove = (event: MouseEvent) => {
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setMousePosition({ x, y });
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [canvasRef]);
  return mousePosition;
}

export function useMouseEvent(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  mousePosition: MousePosition,
  pixelScale: number,
  onClick: (x: number, y: number) => void,
) {
  const MOUSE_DEFAULT_ALPHA = 0.4;
  const x = pixelScale * (Math.ceil(mousePosition.x / pixelScale) - 1);
  const y = pixelScale * (Math.ceil(mousePosition.y / pixelScale) - 1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = getComputedStyle(canvas).getPropertyValue("--grayscale-11");

    const drawDefault = () => {
      ctx.globalAlpha = MOUSE_DEFAULT_ALPHA;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillRect(x, y, pixelScale, pixelScale);
    };
    const drawFilled = () => {
      ctx.globalAlpha = 1;
      ctx.fillRect(x, y, pixelScale, pixelScale);
    };
    const drawPixel = () => onClick(x, y);

    drawDefault();
    canvas.addEventListener("mousedown", drawFilled);
    canvas.addEventListener("mouseup", drawDefault);
    canvas.addEventListener("mouseup", drawPixel);
    return () => {
      canvas.removeEventListener("mousedown", drawFilled);
      canvas.removeEventListener("mouseup", drawDefault);
      canvas.removeEventListener("mouseup", drawPixel);
    };
  }, [canvasRef, x, y, pixelScale, onClick]);
}

export function useBackground(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  editor: Canvas | null,
  pixelScale: number,
) {
  useEffect(() => {
    if (editor === null) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < editor.height(); y++) {
      for (let x = 0; x < editor.width(); x++) {
        const pixelColor = editor.get_pixel(x, y);
        ctx.fillStyle = `rgba(${pixelColor[0]}, ${pixelColor[1]}, ${pixelColor[2]}, ${pixelColor[3]})`;
        ctx.fillRect(x * pixelScale, y * pixelScale, pixelScale, pixelScale);
      }
    }
  }, [canvasRef, editor, pixelScale]);
}

export function usePaintBrush(
  editor: Canvas | null,
  canvas: HTMLCanvasElement | null,
  size: number,
  color: { r: number; g: number; b: number; a: number },
): (x: number, y: number) => void {
  const setPixel = useCallback(
    (x: number, y: number) => {
      if (!editor || !canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a / 255})`;
      ctx.fillRect(x, y, size, size);
      editor.set_pixel(
        x / size,
        y / size,
        new Uint8Array([color.r, color.g, color.b, color.a]),
      );
    },
    [editor, canvas, size, color],
  );
  return setPixel;
}
