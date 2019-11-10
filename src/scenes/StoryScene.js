import Button from "../ui/Button.js";
import {FONT_FAMILY} from "../utils.js";

export default class StoryScene extends Phaser.Scene {
  constructor() {
    super('StoryScene');
  }

  preload() {
    this.load.setBaseURL('DeepAssets');
    this.load.image('Building', 'scene1.png');
    this.load.image('Sinking', 'scene2.png');
  }

  create() {
    this.scene1Played = false;

    if (!this.scene1Played) {
      this.scene1Played = true;
      this.playStory('This is where I was born.', 'Building', '#000');
    }
  }

  update(time, delta) {

  }

  playStory(text, image, FILL) {
    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, image).setScale(0.45)
    let storyText = this.add.text(
      this.cameras.main.scrollX + this.cameras.main.centerX,
      this.cameras.main.scrollY + this.cameras.main.centerY + 400,
      text,
      {
        fontFamily: FONT_FAMILY,
        fontSize: '48px',
        fill: FILL
      }
    ).setOrigin(0.5);

    const handleKeyPress = (e) => {
      if (e.which === 13) {
        if (!this.scene2Played) {
          storyText.destroy();
          document.removeEventListener('keypress', handleKeyPress);
          this.playStory('Then they left me. Now I am alone.', 'Sinking', '#FFF');
        } else if (this.scene2Played) {
          storyText.destroy();
          document.removeEventListener('keypress', handleKeyPress);
          this.scene.start('MainCavern')
        }
        this.scene2Played = true;
      }
    };

    document.addEventListener('keypress', handleKeyPress);
  }
}
