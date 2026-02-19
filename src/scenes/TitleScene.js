import Phaser from 'phaser';
import ProceduralAudio from '../utils/ProceduralAudio.js';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TitleScene' });
  }

  create() {
    console.log('TitleScene: Creating title screen...');
    
    // Colorful retro gradient background
    this.createRetroBackground();
    
    // Add decorative elements
    this.addDecorativeElements();
    
    // Game title
    this.createTitle();
    
    // Subtitle
    this.createSubtitle();
    
    // Press to start prompt
    this.createStartPrompt();
    
    // Play simple retro music
    this.playTitleMusic();
    
    // Input handling
    this.input.keyboard.once('keydown-SPACE', () => {
      this.startGame();
    });
  }

  createRetroBackground() {
    // Create colorful retro gradient background
    const graphics = this.add.graphics();
    
    // Create multiple colored rectangles for retro stripe effect
    const colors = [0x4a0e4e, 0x81167a, 0xc7417b, 0xf77e70, 0xffcd75];
    const stripeHeight = this.cameras.main.height / colors.length;
    
    colors.forEach((color, index) => {
      graphics.fillStyle(color, 1);
      graphics.fillRect(0, index * stripeHeight, this.cameras.main.width, stripeHeight);
    });
    
    // Add some retro stars/sparkles
    for (let i = 0; i < 50; i++) {
      const x = Phaser.Math.Between(0, this.cameras.main.width);
      const y = Phaser.Math.Between(0, this.cameras.main.height);
      const size = Phaser.Math.Between(2, 4);
      
      const star = this.add.circle(x, y, size, 0xffffff, 0.8);
      
      // Twinkling animation
      this.tweens.add({
        targets: star,
        alpha: 0.2,
        duration: Phaser.Math.Between(1000, 2000),
        yoyo: true,
        repeat: -1
      });
    }
  }

  addDecorativeElements() {
    // Define decorative sprites with positions and scales
    const decorations = [
      { key: 'title_angel', x: 640, y: 360, scale: 4.375, alpha: 0.7 },
      { key: 'title_ghost', x: 640, y: 500, scale: 3.6, alpha: 0.8 },
      { key: 'title_bone', x: 320, y: 600, scale: 6.4, alpha: 0.6 },
      { key: 'title_hair', x: 1100, y: 580, scale: 2.16, alpha: 0.6 },
      { key: 'title_church', x: 130, y: 350, scale: 1.08, alpha: 0.5 },
      { key: 'title_library', x: 1150, y: 350, scale: 2.496, alpha: 0.5 },
      { key: 'title_painting21', x: 340, y: 410, scale: 0.30375, alpha: 0.7 },  // 0.3375 * 0.9, moved more inward
      { key: 'title_painting22', x: 940, y: 410, scale: 0.30375, alpha: 0.7 },  // 0.3375 * 0.9, moved more inward
      { key: 'title_glass03', x: 80, y: 130, scale: 0.0945, alpha: 0.6 },
      { key: 'title_glass05', x: 1200, y: 130, scale: 0.0945, alpha: 0.6 },
      { key: 'title_priest', x: 180, y: 660, scale: 4.8, alpha: 0.5 },
      { key: 'title_cultist', x: 1100, y: 680, scale: 2.4, alpha: 0.5 },  // 1.6 * 1.5, moved to bottom-right corner
      { key: 'title_teacher_l', x: 350, y: 150, scale: 1.5015, alpha: 0.4 },
      { key: 'title_teacher_r', x: 900, y: 150, scale: 1.5015, alpha: 0.4 },
      { key: 'title_coder', x: 640, y: 650, scale: 2.1, alpha: 0.4 },
      { key: 'title_skater', x: 850, y: 600, scale: 0.28, alpha: 0.4 },
      { key: 'title_icon', x: 640, y: 80, scale: 2.4, alpha: 0.5 }
    ];
    
    decorations.forEach(dec => {
      if (this.textures.exists(dec.key)) {
        const sprite = this.add.image(dec.x, dec.y, dec.key);
        sprite.setScale(dec.scale);
        sprite.setAlpha(dec.alpha);
        
        // Add gentle floating animation
        this.tweens.add({
          targets: sprite,
          y: sprite.y + Phaser.Math.Between(-10, 10),
          duration: Phaser.Math.Between(2000, 4000),
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut'
        });
        
        // Add gentle rotation for some elements
        if (Math.random() > 0.5) {
          this.tweens.add({
            targets: sprite,
            angle: Phaser.Math.Between(-5, 5),
            duration: Phaser.Math.Between(3000, 5000),
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
          });
        }
      }
    });
  }

  createTitle() {
    // Main title with retro styling
    const titleText = 'EMILY\nAND THE GHOST OF\nELIZABETH ANN SETON';
    
    const title = this.add.text(
      this.cameras.main.width / 2,
      200,
      titleText,
      {
        fontSize: '48px',
        fill: '#ffffff',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        align: 'center',
        stroke: '#000000',
        strokeThickness: 6,
        shadow: {
          offsetX: 4,
          offsetY: 4,
          color: '#ff00ff',
          blur: 0,
          fill: true
        }
      }
    ).setOrigin(0.5);
    
    // Pulsing animation
    this.tweens.add({
      targets: title,
      scale: 1.05,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  createSubtitle() {
    const subtitle = this.add.text(
      this.cameras.main.width / 2,
      400,
      'A Seton Hall University Adventure',
      {
        fontSize: '24px',
        fill: '#ffcd75',
        fontFamily: 'Arial, sans-serif',
        align: 'center',
        stroke: '#000000',
        strokeThickness: 3
      }
    ).setOrigin(0.5);
  }

  createStartPrompt() {
    const prompt = this.add.text(
      this.cameras.main.width / 2,
      550,
      'PRESS SPACE TO START',
      {
        fontSize: '32px',
        fill: '#ffffff',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        align: 'center',
        stroke: '#000000',
        strokeThickness: 4
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

  playTitleMusic() {
    console.log('Attempting to play title music...');
    console.log('Available sounds:', this.sound.sounds.map(s => s.key));
    
    // Play real title music if available, otherwise use procedural
    if (this.cache.audio.exists('title_music')) {
      console.log('Title music found in cache, playing...');
      this.titleMusic = this.sound.add('title_music', { loop: true, volume: 0.5 });
      this.titleMusic.play();
      console.log('Title music playing:', this.titleMusic.isPlaying);
    } else {
      console.log('Title music not found in cache, using procedural');
      // Fallback to procedural music
      try {
        ProceduralAudio.playRetroTitleMusic();
        console.log('Playing procedural title music');
      } catch (e) {
        console.warn('Could not play title music:', e);
      }
    }
  }

  startGame() {
    console.log('Starting game...');
    
    // Stop title music
    if (this.titleMusic) {
      this.titleMusic.stop();
    }
    ProceduralAudio.stop();
    
    // Play a simple beep for button press
    if (this.sound.get('throw_sound')) {
      this.sound.play('throw_sound', { volume: 0.3 });
    } else {
      ProceduralAudio.playSimpleBeep(880, 0.1);
    }
    
    // Transition to menu
    this.scene.start('MenuScene');
  }
}
