import { useEffect } from "react";

import { Layout } from "./layout";
import init, { greet } from "./shared/PixelArtEditor";

function App() {
  useEffect(() => {
    init().then();
  }, []);
  return (
    <Layout>
      <div className="w-full h-full flex items-center justify-center">
        <button
          className="px-4 py-2 rounded-xl bg-accent-9 hover:bg-accent-10 text-white cursor-pointer"
          onClick={() => greet("World")}
        >
          Click me
        </button>
      </div>
    </Layout>
  );
}

export default App;
