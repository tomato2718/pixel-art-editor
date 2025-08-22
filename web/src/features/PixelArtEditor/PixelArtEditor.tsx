import { useEffect, useState } from "react";
import init, { Canvas } from "@/shared/Canvas";

const MAX_RETRIES = 5;

export function usePixelArtEditor(
  width: number,
  height: number,
): Canvas | null {
  const [canvas, setCanvas] = useState<Canvas | null>(null);

  useEffect(() => {
    let mounted = true;
    let retryCount = 0;

    const initCanvas = async () => {
      try {
        await init();

        const testCanvas = new Canvas(1, 1);
        if (testCanvas.free) {
          testCanvas.free();
        }

        if (mounted) {
          setCanvas(new Canvas(width, height));
        }
      } catch (error) {
        console.error(
          `Canvas initialization failed (attempt ${retryCount + 1}):`,
          error,
        );

        if (retryCount < MAX_RETRIES && mounted) {
          retryCount++;
          setTimeout(() => initCanvas(), 10);
        } else {
          console.error(
            "Failed to initialize canvas after",
            retryCount,
            "attempts",
          );
        }
      }
    };

    initCanvas();

    return () => {
      mounted = false;
    };
  }, [width, height]);

  return canvas;
}
