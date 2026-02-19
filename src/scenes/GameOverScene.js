import Phaser from 'phaser';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  init(data) {
    this.finalScore = data.score || 0;
    this.artworksCollected = data.artworks || 0;
  }

  create() {
    console.log('GameOverScene: Game Over');
    
    // Dark background
    this.add.rectangle(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      this.cameras.main.width,
      this.cameras.main.height,
      0x000000,
      0.9
    );
    
    // Game Over title
    const title = this.add.text(
      this.cameras.main.width / 2,
      150,
      'GAME OVER',
      {
        fontSize: '72px',
        fill: '#ff0000',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        stroke: '#000000',
        strokeThickness: 8
      }
    ).setOrigin(0.5);
    
    // Pulsing animation
    this.tweens.add({
      targets: title,
      scale: 1.1,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
    
    // Stats
    this.add.text(
      this.cameras.main.width / 2,
      300,
      `Final Score: ${this.finalScore}`,
      {
        fontSize: '36px',
        fill: '#ffffff',
        fontStyle: 'bold'
      }
    ).setOrigin(0.5);
    
    this.add.text(
      this.cameras.main.width / 2,
      360,
      `Artworks Collected: ${this.artworksCollected}`,
      {
        fontSize: '28px',
        fill: '#ffd700'
      }
    ).setOrigin(0.5);
    
    // Restart button
    const restartText = this.add.text(
      this.cameras.main.width / 2,
      480,
      'Press R to Restart',
      {
        fontSize: '32px',
        fill: '#00ff00',
        fontStyle: 'bold'
      }
    ).setOrigin(0.5);
    
    // Menu button
    const menuText = this.add.text(
      this.cameras.main.width / 2,
      550,
      'Press M to Return to Menu',
      {
        fontSize: '28px',
        fill: '#ffffff'
      }
    ).setOrigin(0.5);
    
    // Blinking animation for restart
    this.tweens.add({
      targets: restartText,
      alpha: 0.3,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
    
    // Input handling
    this.input.keyboard.once('keydown-R', () => {
      this.scene.start('GameplayScene', { level: 'parking_lot' });
    });
    
    this.input.keyboard.once('keydown-M', () => {
      this.scene.start('MenuScene');
    });
  }
}
