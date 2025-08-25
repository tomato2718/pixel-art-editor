use crate::pixel::Pixel;
use image::{ColorType, ImageFormat, write_buffer_with_format};
use std::io::Cursor;

const CHANNELS: usize = 4;

pub struct Canvas {
    width: usize,
    height: usize,
    pixels: Vec<Vec<Pixel>>,
}

impl Canvas {
    pub fn new(width: usize, height: usize) -> Self {
        let pixels = vec![vec![Pixel::new(0, 0, 0, 0); width]; height];
        Canvas {
            width: width,
            height: height,
            pixels: pixels,
        }
    }

    pub fn width(&self) -> usize {
        self.width
    }

    pub fn height(&self) -> usize {
        self.height
    }

    pub fn get_pixel(&self, x: usize, y: usize) -> &Pixel {
        &self.pixels[y][x]
    }

    pub fn set_pixel(&mut self, x: usize, y: usize, pixel: Pixel) {
        self.pixels[y][x] = pixel;
    }

    pub fn to_buffer(&self, scale: usize) -> Vec<u8> {
        let scaled_width = self.width * scale;
        let mut buffer = vec![0_u8; self.width * self.height * CHANNELS * scale * scale];
        for y in 0..self.height {
            for x in 0..self.width {
                let pixel = &self.pixels[y][x];
                for dy in 0..scale {
                    for dx in 0..scale {
                        let scaled_x = x * scale + dx;
                        let scaled_y = y * scale + dy;
                        let i = (scaled_y * scaled_width + scaled_x) * CHANNELS;

                        buffer[i] = pixel.r;
                        buffer[i + 1] = pixel.g;
                        buffer[i + 2] = pixel.b;
                        buffer[i + 3] = pixel.a;
                    }
                }
            }
        }

        buffer
    }

    pub fn to_png(&self, scale: usize) -> Vec<u8> {
        let mut cursor = Cursor::new(Vec::new());
        write_buffer_with_format(
            &mut cursor,
            &self.to_buffer(scale),
            (self.width * scale) as u32,
            (self.height * scale) as u32,
            ColorType::Rgba8,
            ImageFormat::Png,
        )
        .expect("ok");

        cursor.into_inner()
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn get_pixel_given_coordinate_should_return_the_pixel() {
        let canvas = Canvas::new(32, 32);

        let pixel = canvas.get_pixel(10, 10);

        assert_eq!((pixel.r, pixel.g, pixel.b, pixel.a), (0, 0, 0, 0));
    }

    #[test]
    fn set_pixel_given_coordinate_and_pixel_should_set_the_pixel() {
        let mut canvas = Canvas::new(32, 32);

        canvas.set_pixel(10, 20, Pixel::new(255, 255, 255, 255));
        let pixel = canvas.get_pixel(10, 20);

        assert_eq!((pixel.r, pixel.g, pixel.b, pixel.a), (255, 255, 255, 255));
    }

    #[test]
    fn to_buffer_should_return_rgba_buffer() {
        let mut canvas = Canvas::new(2, 2);

        canvas.set_pixel(0, 1, Pixel::new(255, 255, 255, 255));
        canvas.set_pixel(1, 0, Pixel::new(255, 255, 255, 255));

        let buffer = canvas.to_buffer(1);

        assert_eq!(
            buffer,
            [
                0, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 0
            ]
        );
    }

    #[test]
    fn to_png_should_return_png_buffer() {
        let mut canvas = Canvas::new(2, 2);

        canvas.set_pixel(0, 1, Pixel::new(255, 255, 255, 255));
        canvas.set_pixel(1, 0, Pixel::new(255, 255, 255, 255));

        let buffer = canvas.to_png(1);

        assert_eq!(
            buffer,
            [
                137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 2, 0, 0, 0,
                2, 8, 6, 0, 0, 0, 114, 182, 13, 36, 0, 0, 0, 29, 73, 68, 65, 84, 120, 1, 1, 18, 0,
                237, 255, 0, 0, 0, 0, 0, 255, 255, 255, 255, 0, 255, 255, 255, 255, 0, 0, 0, 0, 71,
                202, 7, 249, 66, 202, 86, 187, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130
            ]
        );
    }
}
