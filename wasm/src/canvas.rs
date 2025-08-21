use crate::pixel::Pixel;

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

    pub fn to_buffer(&self) -> Vec<u8> {
        let mut buffer = vec![0_u8; self.width * self.height * CHANNELS];
        for y in 0..self.height {
            for x in 0..self.width {
                let i = (y * self.width + x) * CHANNELS;

                buffer[i] = self.pixels[y][x].r;
                buffer[i + 1] = self.pixels[y][x].g;
                buffer[i + 2] = self.pixels[y][x].b;
                buffer[i + 3] = self.pixels[y][x].a;
            }
        }

        buffer
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

        let buffer = canvas.to_buffer();

        assert_eq!(
            buffer,
            [
                0, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 0
            ]
        );
    }
}
