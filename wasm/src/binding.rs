use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {name}!"));
}

#[wasm_bindgen]
pub struct Counter {
    count: u32,
}

#[wasm_bindgen]
impl Counter {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Counter { count: 0 }
    }

    #[wasm_bindgen]
    pub fn read(&mut self) -> u32 {
        self.count += 1;
        self.count
    }
}
