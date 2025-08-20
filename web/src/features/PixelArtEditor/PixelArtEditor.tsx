import { useEffect, useState } from "react";

import init, { Canvas } from "@/shared/Canvas";

export function usePixelArtEditor(): Canvas | null {
  const [canvas, setCanvas] = useState<Canvas | null>(null);

  useEffect(() => {
    init().then(() => setCanvas(new Canvas(12, 12)));
  }, []);

  return canvas;
}
