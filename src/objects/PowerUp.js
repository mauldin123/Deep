export default class PowerUp extends Phaser.GameObjects.Ellipse {
    constructor(scene, x, y, kind) {
        super(scene, x, y, 50, 50);
        this.kind = kind;
        this.duration = 0;

        let symbol, color, fontColor;
        switch (this.kind) {
            case 'LanternRadiusPlus':
                symbol = 'L+';
                color = 0xF0F0F0;
                fontColor = '#000';
                this.duration = 20000;
                break;
            case 'Shield':
                symbol = 'S';
                color = 0x0B97B8;
                fontColor = '#FFF';
                this.duration = 15000;
                break;
            case 'Taser':
                symbol = 'T';
                color = 0xECEB1D;
                fontColor = '#000';
                this.duration = 30000;
                break;
            case 'HealthUp':
                symbol = '+';
                color = 0xca2f31;
                fontColor = '#FFF';
                break;
            default:
                symbol = '';
                color = 0xFFFFFF;
                fontColor = '#000';
                break;
        }

        this.setFillStyle(color);

        this.scene.add.existing(this);
        this.scene.matter.add.gameObject(this, {
            shape: 'circle'
        });

        this.text = this.scene.add.text(
            x,
            y,
            symbol,
            {
                fontFamily: '"Play"',
                fontSize: 32,
                fill: fontColor
            }
        ).setOrigin(0.5);
    }

    destroy() {
        this.text.destroy();
        super.destroy();
    }
}