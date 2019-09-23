export { addSceneEventListeners };


function addSceneEventListeners (that) {

  that.input.keyboard.on(
    "keydown_ESC",
     function () {
      that.scene.start('BootScene');
    }
  );
  that.input.keyboard.on(
    "keydown_ONE",
     function () {
      that.scene.start('Cavern1');
    }
  );
  that.input.keyboard.on(
    "keydown_TWO",
     function () {
      that.scene.start('Cavern2');
    }
  );
  that.input.keyboard.on(
    "keydown_THREE",
     function () {
      that.scene.start('Cavern3');
    }
  );
  that.input.keyboard.on(
    "keydown_FOUR",
     function () {
      that.scene.start('Cavern4');
    }
  );
  that.input.keyboard.on(
    "keydown_FIVE",
     function () {
      that.scene.start('Cavern5');
    }
  );
  that.input.keyboard.on(
    "keydown_SIX",
     function () {
      that.scene.start('Cavern6');
    }
  );
  that.input.keyboard.on(
    "keydown_SEVEN",
     function () {
      that.scene.start('Cavern7');
    }
  );
  that.input.keyboard.on(
    "keydown_EIGHT",
     function () {
      that.scene.start('EndScene');
    }
  );

}
