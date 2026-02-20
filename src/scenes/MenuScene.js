import Phaser from 'phaser';
import { getCutscene } from '../data/cutscenes.js';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    console.log('MenuScene: Creating menu...');
    
    // Background
    this.cameras.main.setBackgroundColor('#2d2d2d');
    
    // Title
    this.add.text(640, 150, 'MAIN MENU', {
      fontSize: '48px',
      fill: '#fff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    
    // New Game button
    const newGameBtn = this.add.text(640, 300, 'NEW GAME', {
      fontSize: '32px',
      fill: '#00ff00',
      backgroundColor: '#000',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive();
    
    newGameBtn.on('pointerover', () => {
      newGameBtn.setScale(1.1);
    });
    
    newGameBtn.on('pointerout', () => {
      newGameBtn.setScale(1);
    });
    
    newGameBtn.on('pointerdown', () => {
      // Start with opening cutscene (Requirement 2.4)
      const cutsceneData = getCutscene('opening');
      this.scene.start('CutsceneScene', cutsceneData);
    });
    
    // Load Game button (placeholder)
    const loadGameBtn = this.add.text(640, 380, 'LOAD GAME', {
      fontSize: '32px',
      fill: '#888',
      backgroundColor: '#000',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5);
    
    // Options button (placeholder)
    const optionsBtn = this.add.text(640, 460, 'OPTIONS', {
      fontSize: '32px',
      fill: '#888',
      backgroundColor: '#000',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5);
    
    // Instructions
    this.add.text(640, 600, 'Click NEW GAME to start playing', {
      fontSize: '18px',
      fill: '#aaa'
    }).setOrigin(0.5);
  }
}
