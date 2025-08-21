import { useState, useEffect, type RefObject } from "react";

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

    drawDefault();
    canvas.addEventListener("mousedown", drawFilled);
    canvas.addEventListener("mouseup", drawDefault);
    return () => {
      canvas.removeEventListener("mousedown", drawFilled);
      canvas.removeEventListener("mouseup", drawDefault);
    };
  }, [canvasRef, x, y, pixelScale]);
}
