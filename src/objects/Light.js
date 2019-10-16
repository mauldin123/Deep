export default class Light extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'light');
        this.isOn = false;

        this.setAngle(270);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
    }

    setOn(condition) {
        this.isOn = condition;
        this.showLight();
    }

    /** @private */
    showLight() {
        this.setAlpha(this.isOn ? 0.6 : 0.0);
    }

    update(anchor, angle) {
        this.setPosition(anchor.x, anchor.y);
        this.setAngle(angle);
        switch (anchor.orientation) {
            case 'Down':
                this.y += this.height / 2;
                break;
            case 'Left':
                this.x -= this.width / 2;
                break;
            case 'Up':
                this.y -= this.height / 2;
                break;
            case 'Right':
                this.x += this.width / 2;
                break;
        }
        this.body.setSize();
    }
}