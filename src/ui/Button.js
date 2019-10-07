import { multiplyColors, FONT_FAMILY } from "../utils.js";

export default class Button extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, label, color, onClick) {
        super(scene, x, y, 200, 75, color);
        this.color = color || 0x808080;
        if (onClick) this.onClick = onClick;

        this.scene.add.existing(this);

        scene.add.text(x, y, label, {
            fontFamily: FONT_FAMILY,
            fontSize: '36px'
        }).setOrigin(0.5);

        this.setInteractive();
        this.on('pointerdown', this.onDown, this);
        this.on('pointerup', this.onUp, this);
        this.on('pointerover', this.onMouseOver, this);
        this.on('pointerout', this.onMouseOut, this);
        this.on('pointerup', this.onClick, this);
    }

    onDown() {
        this.setFillStyle(multiplyColors(this.color, 0xB0B0B0));
    }

    onUp() {
        this.setFillStyle(this.color);
    }

    onMouseOver() {
        this.setStrokeStyle(5, 0xFFFFFF);
    }

    onMouseOut() {
        this.onUp();
        this.setStrokeStyle();
    }

    onClick() {}
}