import Phaser from 'phaser';
import BootScene from '../src/scenes/BootScene.js';
import TitleScene from '../src/scenes/TitleScene.js';
import MenuScene from '../src/scenes/MenuScene.js';
import CampusMapScene from '../src/scenes/CampusMapScene.js';
import CutsceneScene from '../src/scenes/CutsceneScene.js';
import GameplayScene from '../src/scenes/GameplayScene.js';
import VictoryScene from '../src/scenes/VictoryScene.js';
import GameOverScene from '../src/scenes/GameOverScene.js';

const gameConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  parent: 'game-container',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [BootScene, TitleScene, MenuScene, CampusMapScene, CutsceneScene, GameplayScene, VictoryScene, GameOverScene],
  audio: {
    disableWebAudio: false
  },
  backgroundColor: '#2d2d2d'
};

export default gameConfig;
