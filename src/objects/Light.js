export default class Light extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y) {
        super(scene.matter.world, x, y, 'light');
        this.isOn = false;

        this.setAngle(270);
        this.scene.add.existing(this);

      const { Bodies } = Phaser.Physics.Matter.Matter;
      const mainBody = Bodies.rectangle(x, y, this.width, this.height, {
        isSensor: true
      });

      this.setExistingBody(mainBody)
        .setFixedRotation();

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
                this.setAngle(0);
                this.y += this.height / 2;
                break;
            case 'LeftDown':
                this.setAngle(45);
                this.y += this.height / 2;
                this.x -= this.width / 2;
            break;
            default:
            case 'Left':
                this.setAngle(90);
                this.x -= this.width / 2;
                break;
            case 'LeftUp':
                this.setAngle(135);
                this.x -= this.width / 2;
                this.y -= this.height / 2;
                break;
            case 'Up':
                this.setAngle(180);
                this.y -= this.height / 2;
                break;
            case 'RightUp':
                this.setAngle(225);
                this.x += this.width / 2;
                this.y -= this.height / 2;
                break;
            case 'Right':
                this.setAngle(270);
                this.x += this.width / 2;
                break;
            case 'RightDown':
                this.setAngle(315);
                this.x += this.width / 2;
                this.y += this.height / 2;
                break;
        }
        // this.setRectangle(this.width, this.height, {
        //     restitution: 1
        // });
    }
}