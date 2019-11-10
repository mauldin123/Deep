import Button from "../ui/Button.js";
import {FONT_FAMILY} from "../utils.js";

export default class Menu extends Phaser.Scene {
    preload() {
        this.load.setBaseURL('DeepAssets');
        this.load.image('ocean', 'oceanBackground.png');
    }

    create() {
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'ocean');
        this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            "Deep",
            {
                fontFamily: FONT_FAMILY,
                fontSize: '60px'
            }
        ).setOrigin(0.5);

        let startButton = new Button(
            this,
            this.cameras.main.centerX - 150,
            this.cameras.main.centerY + 100,
            'Start Game',
            0x005599,
            () => this.scene.start('StoryScene')
        );
        let startTutorial = new Button(
            this,
            this.cameras.main.centerX + 150,
            this.cameras.main.centerY + 100,
            'Tutorial',
            0x005599,
            () => this.scene.start('Tutorial')
        );
    }
}
