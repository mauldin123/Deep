export const FONT_FAMILY = '"Play", sans-serif';

export function getPositionInCanvas(obj, camera) {
    let x = obj.x - camera.scrollX * obj.scrollFactorX + camera.x;
    let y = obj.y - camera.scrollY * obj.scrollFactorY + camera.y;
    return new Phaser.Math.Vector2(x, y);
}

export function setPositionInCanvas(obj, camera, canvasX, canvasY) {
    let x = canvasX - camera.x + camera.scrollX * obj.scrollFactorX;
    let y = canvasY - camera.y + camera.scrollY * obj.scrollFactorY;
    obj.setPosition(x, y);
}

/**
 * Blends two colors together in "multiply" mode.
 *
 * @param color1
 * @param color2
 * @returns {number}
 */
export function multiplyColors(color1, color2) {
    // Get the R, G, and B values for each color on [0.0, 1.0]
    let c1r = ((color1 & 0xFF0000) >> 16) / 255;
    let c1g = ((color1 & 0x00FF00) >> 8) / 255;
    let c1b = (color1 & 0x0000FF) / 255;
    let c2r = ((color2 & 0xFF0000) >> 16) / 255;
    let c2g = ((color2 & 0x00FF00) >> 8) / 255;
    let c2b = (color2 & 0x0000FF) / 255;

    // Multiply the color values together, rescale them to integers on [0, 256)
    let finalColorRed = Math.round((c1r * c2r) * 255);
    let finalColorGreen = Math.round((c1g * c2g) * 255);
    let finalColorBlue = Math.round((c1b * c2b) * 255);

    // Combine the color values
    return (finalColorRed << 16) | (finalColorGreen << 8) | finalColorBlue;
}

export default {
    getPositionInCanvas: getPositionInCanvas,
    setPositionInCanvas: setPositionInCanvas,
    multiplyColors: multiplyColors,
    FONT_FAMILY: FONT_FAMILY
};