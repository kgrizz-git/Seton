import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
    this.loadAttempts = {};
    this.maxRetries = 3;
  }

  preload() {
    console.log('BootScene: Preloading assets...');
    
    // Create loading progress bar
    this.createLoadingBar();
    
    // Set up error handling with retry logic
    this.load.on('loaderror', this.handleLoadError, this);
    this.load.on('progress', this.updateProgressBar, this);
    this.load.on('complete', this.onLoadComplete, this);
    
    // Load placeholder assets (will be replaced with real assets)
    // For now, we'll use Phaser's built-in graphics to create placeholder sprites
    this.loadPlaceholderAssets();
  }

  createLoadingBar() {
    const width = 400;
    const height = 30;
    const x = (this.cameras.main.width - width) / 2;
    const y = (this.cameras.main.height - height) / 2;
    
    // Background
    this.loadingBarBg = this.add.graphics();
    this.loadingBarBg.fillStyle(0x222222, 1);
    this.loadingBarBg.fillRect(x, y, width, height);
    
    // Progress bar
    this.loadingBar = this.add.graphics();
    
    // Loading text
    this.loadingText = this.add.text(
      this.cameras.main.width / 2,
      y - 30,
      'Loading... 0%',
      { fontSize: '20px', fill: '#ffffff' }
    ).setOrigin(0.5);
    
    this.progressBarX = x;
    this.progressBarY = y;
    this.progressBarWidth = width;
    this.progressBarHeight = height;
  }

  updateProgressBar(progress) {
    this.loadingBar.clear();
    this.loadingBar.fillStyle(0x00ff00, 1);
    this.loadingBar.fillRect(
      this.progressBarX,
      this.progressBarY,
      this.progressBarWidth * progress,
      this.progressBarHeight
    );
    
    this.loadingText.setText(`Loading... ${Math.round(progress * 100)}%`);
  }

  handleLoadError(file) {
    console.error(`Failed to load: ${file.key} (${file.url})`);
    
    const key = file.key;
    this.loadAttempts[key] = (this.loadAttempts[key] || 0) + 1;
    
    if (this.loadAttempts[key] < this.maxRetries) {
      console.log(`Retrying ${key} (attempt ${this.loadAttempts[key] + 1}/${this.maxRetries})`);
      // Retry loading the file
      setTimeout(() => {
        this.load.start();
      }, 1000);
    } else {
      console.warn(`Failed to load ${key} after ${this.maxRetries} attempts. Continuing with placeholder.`);
    }
  }

  onLoadComplete() {
    console.log('BootScene: All assets loaded successfully');
  }

  loadPlaceholderAssets() {
    // Load real sprite assets
    this.load.image('emily', 'assets/sprites/emily.png');
    this.load.image('priest', 'assets/sprites/Priest.png');
    this.load.image('admin', 'assets/sprites/admin.png');
    this.load.image('student', 'assets/sprites/student.png');
    this.load.image('ghost', 'assets/sprites/ghost.png');
    this.load.image('demon', 'assets/sprites/demon.png');
    this.load.image('bat', 'assets/sprites/bat.png');
    this.load.image('rat', 'assets/sprites/rat.png');
    this.load.image('skeleton', 'assets/sprites/skeleton.png');
    this.load.image('spectre', 'assets/sprites/spectre.png');
    this.load.image('anne_seton', 'assets/sprites/anne-seton.gif');
    this.load.image('campus_map', 'assets/sprites/campus-map.jpg');
    
    // Load paintings for collectibles
    for (let i = 1; i <= 39; i++) {
      const paddedNum = i.toString().padStart(2, '0');
      this.load.image(`painting_${paddedNum}`, `assets/sprites/paintings/painting-${paddedNum}.jpg`);
    }
    
    // Load audio
    this.load.audio('ghost_music', 'assets/audio/Ghost (RPG).mp3');
    this.load.audio('ghost_step', 'assets/audio/symphony - 01 Ghost Step.ogg');
    this.load.audio('throw_sound', 'assets/audio/cartoon-throw.wav');
    this.load.audio('ghost_sound', 'assets/audio/ghost.wav');
    this.load.audio('scream', 'assets/audio/wscream_2.wav');
    this.load.audio('title_music', 'assets/audio/Doll House (Glockenspiel).mp3');
    this.load.audio('fight_music', 'assets/audio/SDM_FightingBack.mp3');
    
    // Load title screen decorations
    this.load.image('title_angel', 'assets/sprites/title-screen/angel.gif');
    this.load.image('title_bone', 'assets/sprites/title-screen/bone_femur.png');
    this.load.image('title_hair', 'assets/sprites/title-screen/hair_cut1_pinkbg.png');
    this.load.image('title_icon', 'assets/sprites/title-screen/icon_28.png');
    this.load.image('title_library', 'assets/sprites/title-screen/library-big.png');
    this.load.image('title_painting21', 'assets/sprites/title-screen/painting-21.jpg');
    this.load.image('title_painting22', 'assets/sprites/title-screen/painting-22.jpg');
    this.load.image('title_demon', 'assets/sprites/title-screen/2b.png');
    this.load.image('title_cultist', 'assets/sprites/title-screen/cultist_3trimmed1.png');
    this.load.image('title_coder', 'assets/sprites/title-screen/coder.png');
    this.load.image('title_priest', 'assets/sprites/title-screen/priest_trim1.png');
    this.load.image('title_skater', 'assets/sprites/title-screen/skater_guy.png');
    this.load.image('title_sprite', 'assets/sprites/title-screen/sprite-0002.png');
    this.load.image('title_glass03', 'assets/sprites/title-screen/stained-glass-03.jpg');
    this.load.image('title_glass05', 'assets/sprites/title-screen/stained-glass-05.jpg');
    this.load.image('title_teacher_l', 'assets/sprites/title-screen/Teacher-facing-left.png');
    this.load.image('title_teacher_r', 'assets/sprites/title-screen/Teacher-facing-right.png');
    this.load.image('title_church', 'assets/sprites/title-screen/church.gif');
    this.load.image('title_ghost', 'assets/sprites/title-screen/round-ghost.png');
  }

  create() {
    console.log('BootScene: Assets loaded, transitioning to TitleScene');
    
    // Clean up loading bar (check if they exist first)
    if (this.loadingBar) {
      this.loadingBar.destroy();
    }
    if (this.loadingBarBg) {
      this.loadingBarBg.destroy();
    }
    if (this.loadingText) {
      this.loadingText.destroy();
    }
    
    // Transition to title screen
    this.scene.start('TitleScene');
  }
}
