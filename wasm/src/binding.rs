use crate::canvas;
use crate::pixel;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Canvas {
    canvas: canvas::Canvas,
}

#[wasm_bindgen]
impl Canvas {
    #[wasm_bindgen(constructor)]
    pub fn new(width: usize, height: usize) -> Self {
        Canvas {
            canvas: canvas::Canvas::new(width, height),
        }
    }

    #[wasm_bindgen]
    pub fn get_pixel(&self, x: usize, y: usize) -> Box<[u8]> {
        let pixel = &self.canvas.get_pixel(x, y);

        Box::new([pixel.r, pixel.g, pixel.b, pixel.a])
    }

    #[wasm_bindgen]
    pub fn set_pixel(&mut self, x: usize, y: usize, pixel: &[u8]) {
        self.canvas.set_pixel(
            x,
            y,
            pixel::Pixel::new(pixel[0], pixel[1], pixel[2], pixel[3]),
        );
    }

    #[wasm_bindgen]
    pub fn to_buffer(&self) -> Box<[u8]> {
        self.canvas.to_buffer().into_boxed_slice()
    }
}
