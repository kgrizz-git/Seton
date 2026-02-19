import Phaser from 'phaser';

export default class VictoryScene extends Phaser.Scene {
  constructor() {
    super({ key: 'VictoryScene' });
  }

  create() {
    console.log('VictoryScene: Game completed!');
    
    // Colorful victory background
    this.createVictoryBackground();
    
    // Victory title
    this.createVictoryTitle();
    
    // Anne Seton sprite/gif
    this.createAnneSeton();
    
    // Thank you message
    this.createThankYouMessage();
    
    // Return to menu prompt
    this.createMenuPrompt();
    
    // Input handling
    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.start('MenuScene');
    });
  }

  createVictoryBackground() {
    // Create golden/holy gradient background
    const graphics = this.add.graphics();
    
    // Create multiple colored rectangles for holy/divine effect
    const colors = [0xffd700, 0xffed4e, 0xffffff, 0xffed4e, 0xffd700];
    const stripeHeight = this.cameras.main.height / colors.length;
    
    colors.forEach((color, index) => {
      graphics.fillStyle(color, 1);
      graphics.fillRect(0, index * stripeHeight, this.cameras.main.width, stripeHeight);
    });
    
    // Add sparkles
    for (let i = 0; i < 100; i++) {
      const x = Phaser.Math.Between(0, this.cameras.main.width);
      const y = Phaser.Math.Between(0, this.cameras.main.height);
      const size = Phaser.Math.Between(2, 6);
      
      const star = this.add.circle(x, y, size, 0xffffff, 0.9);
      
      // Twinkling animation
      this.tweens.add({
        targets: star,
        alpha: 0.2,
        duration: Phaser.Math.Between(800, 1500),
        yoyo: true,
        repeat: -1
      });
    }
  }

  createVictoryTitle() {
    const title = this.add.text(
      this.cameras.main.width / 2,
      80,
      'VICTORY!',
      {
        fontSize: '72px',
        fill: '#ffffff',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        align: 'center',
        stroke: '#000000',
        strokeThickness: 8,
        shadow: {
          offsetX: 4,
          offsetY: 4,
          color: '#ffd700',
          blur: 0,
          fill: true
        }
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
  }

  createAnneSeton() {
    // Load and display Anne Seton gif
    if (this.textures.exists('anne_seton')) {
      const anneSprite = this.add.image(
        this.cameras.main.width / 2,
        280,
        'anne_seton'
      );
      
      // Scale if needed
      anneSprite.setScale(2);
      
      // Add glow effect
      this.tweens.add({
        targets: anneSprite,
        alpha: 0.8,
        duration: 1500,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    } else {
      // Fallback: create a placeholder
      const placeholder = this.add.circle(
        this.cameras.main.width / 2,
        280,
        60,
        0xffffff,
        0.9
      );
      
      this.tweens.add({
        targets: placeholder,
        scale: 1.1,
        duration: 1500,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }
  }

  createThankYouMessage() {
    const message = this.add.text(
      this.cameras.main.width / 2,
      420,
      'Thank you, Emily!\n\nYou have cleansed the grotto\nand restored peace to Seton Hall.\n\nThe spirits can rest now.',
      {
        fontSize: '28px',
        fill: '#000000',
        fontFamily: 'Arial, sans-serif',
        align: 'center',
        fontStyle: 'bold',
        stroke: '#ffd700',
        strokeThickness: 3
      }
    ).setOrigin(0.5);
    
    // Subtitle
    const subtitle = this.add.text(
      this.cameras.main.width / 2,
      540,
      '- Saint Elizabeth Ann Seton',
      {
        fontSize: '20px',
        fill: '#000000',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'italic',
        align: 'center'
      }
    ).setOrigin(0.5);
  }

  createMenuPrompt() {
    const prompt = this.add.text(
      this.cameras.main.width / 2,
      650,
      'PRESS SPACE TO RETURN TO MENU',
      {
        fontSize: '24px',
        fill: '#000000',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        align: 'center',
        stroke: '#ffd700',
        strokeThickness: 3
      }
    ).setOrigin(0.5);
    
    // Blinking animation
    this.tweens.add({
      targets: prompt,
      alpha: 0.3,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }
}
