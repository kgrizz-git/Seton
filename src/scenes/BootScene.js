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
    this.load.image('emily_down', 'assets/sprites/emily-down.png');
    this.load.image('emily_up', 'assets/sprites/emily-up.png');
    this.load.image('emily_left', 'assets/sprites/emily-left.png');
    this.load.image('emily_right', 'assets/sprites/emily-right.png');
    this.load.image('priest', 'assets/sprites/Priest.png');
    this.load.image('priest_catholic', 'assets/sprites/priest-catholic.png');
    this.load.image('teacher_left', 'assets/sprites/teacher-left.png');
    this.load.image('teacher_right', 'assets/sprites/teacher-right.png');
    this.load.image('skater_left', 'assets/sprites/skater-left.png');
    this.load.image('skater_right', 'assets/sprites/skater-right.png');
    this.load.image('student', 'assets/sprites/student.png');
    this.load.image('ghost', 'assets/sprites/ghost.png');
    this.load.image('demon', 'assets/sprites/demon.png');
    this.load.image('bat', 'assets/sprites/bat.png');
    this.load.image('rat', 'assets/sprites/rat.png');
    this.load.image('skeleton', 'assets/sprites/skeleton.png');
    this.load.image('spectre', 'assets/sprites/spectre.png');
    this.load.image('anne_seton', 'assets/sprites/anne-seton.gif');
    this.load.image('campus_map', 'assets/sprites/campus-map.jpg');
    this.load.image('hair_relic', 'assets/sprites/hair-relic.png');
    
    // Load cutscene sprite assets (Requirements 7.2, 13.2)
    // Emily sprites for cutscenes (positioned LEFT, facing RIGHT)
    this.load.image('emily-right', 'assets/sprites/emily-right.png');
    this.load.image('emily-headshot-for-cutscenes+dialog', 'assets/sprites/emily-headshot-for-cutscenes+dialog.png');
    
    // Saint Elizabeth Ann Seton sprites (positioned RIGHT, facing LEFT)
    this.load.image('round-ghost-sprite_0-left', 'assets/sprites/round-ghost-sprite_0-left.png');
    this.load.image('round-ghost-sprite_0-right', 'assets/sprites/round-ghost-sprite_0-right.png');
    
    // Animated .gif files for Saint Elizabeth Ann Seton
    // Note: Phaser loads .gif files as static images by default.
    // The CutsceneScene applies visual effects (floating, pulsing, glowing) to simulate animation
    // and indicate divine/powerful presence for these sprites.
    this.load.image('angel-flipped', 'assets/sprites/angel-flipped.gif');
    this.load.image('anne-seton-triumphant', 'assets/sprites/anne-seton-triumphant.gif');
    
    // Load paintings for collectibles (only 3 available)
    this.load.image('painting_01', 'assets/sprites/paintings/painting-01.png');
    this.load.image('painting_02', 'assets/sprites/paintings/painting-02.png');
    this.load.image('painting_03', 'assets/sprites/paintings/painting-03.png');
    
    // Load audio
    this.load.audio('ghost_music', 'assets/audio/Ghost (RPG).mp3');
    this.load.audio('ghost_step', 'assets/audio/symphony - 01 Ghost Step.ogg');
    this.load.audio('throw_sound', 'assets/audio/cartoon-throw.wav');
    this.load.audio('ghost_sound', 'assets/audio/ghost.wav');
    this.load.audio('scream', 'assets/audio/wscream_2.wav');
    this.load.audio('title_music', 'assets/audio/Doll House (Glockenspiel).mp3');
    this.load.audio('fight_music', 'assets/audio/SDM_FightingBack.mp3');
    this.load.audio('priest_evil_00', 'assets/audio/priest-evil-00.mp3');
    this.load.audio('priest_evil_02', 'assets/audio/priest-evil-02.mp3');
    
    // Level music tracks (randomly selected for levels 1-4, specific for level 5)
    this.load.audio('level_music_1', 'assets/audio/Ten to Life (Tickled to Death).ogg');
    this.load.audio('level_music_2', 'assets/audio/symphony - 01 Ghost Step.ogg');
    this.load.audio('level_music_3', 'assets/audio/WTF! Ghost!.mp3');
    this.load.audio('level_music_4', 'assets/audio/Cakeflaps - Cate.ogg');
    this.load.audio('level_music_5', 'assets/audio/SDM_FightingBack.mp3');
    this.load.audio('grotto_music', 'assets/audio/Showdown of Misdeeds - MP3.mp3');
    
    // Sound effects for combat and game events
    this.load.audio('hit1_sound', 'assets/audio/hit1.mp3');
    this.load.audio('hit5_sound', 'assets/audio/hit5.mp3');
    this.load.audio('die_sound', 'assets/audio/die1.mp3');
    this.load.audio('achievement_sound', 'assets/audio/Jingle_Achievement_00.mp3');
    this.load.audio('win_sound', 'assets/audio/Jingle_Win_00.mp3');
    this.load.audio('lose_sound', 'assets/audio/Jingle_Lose_00.mp3');
    
    // Load sound effects (with fallbacks for missing files)
    // Hit sounds - use ghost.wav as fallback if hit1/hit5 don't exist
    this.load.audio('hit_sound', ['assets/audio/hit1.wav', 'assets/audio/hit5.wav', 'assets/audio/ghost.wav']);
    
    // Die sound - use scream as fallback if die.wav doesn't exist
    this.load.audio('die_sound', ['assets/audio/die.wav', 'assets/audio/wscream_2.wav']);
    
    // Achievement jingle - use ghost_step as fallback if Jingle_Achievement_00 doesn't exist
    this.load.audio('achievement_jingle', ['assets/audio/Jingle_Achievement_00.wav', 'assets/audio/ghost_step.ogg']);
    
    // Win jingle - use title_music snippet as fallback if Jingle_Win_00 doesn't exist
    this.load.audio('win_jingle', ['assets/audio/Jingle_Win_00.wav', 'assets/audio/Doll House (Glockenspiel).mp3']);
    
    // Lose jingle - use scream as fallback if Jingle_Lose_00 doesn't exist
    this.load.audio('lose_jingle', ['assets/audio/Jingle_Lose_00.wav', 'assets/audio/wscream_2.wav']);
    
    // Load level backgrounds
    this.load.image('bg_parking_lot', 'assets/backgrounds/parking-lot-bg.png');
    this.load.image('bg_gallery', 'assets/backgrounds/gallery-bg.png');
    this.load.image('bg_library', 'assets/backgrounds/library-bg.png');
    this.load.image('bg_admin', 'assets/backgrounds/admin-bg.png');
    this.load.image('bg_grotto', 'assets/backgrounds/grotto-bg.png');
    
    // Load cutscene backgrounds
    this.load.image('parking_lot_background', 'assets/backgrounds/parking-lot-bg.png');
    
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
    
    // Load level decorations
    this.load.image('dec_flower_bush', 'assets/sprites/decorations/flower_bush1.png');
    this.load.image('dec_flowers_potted', 'assets/sprites/decorations/flowers-potted1.png');
    this.load.image('dec_fountain', 'assets/sprites/decorations/fountain_1.png');
    this.load.image('dec_lamppost', 'assets/sprites/decorations/lamppost1.png');
    this.load.image('dec_tree_full', 'assets/sprites/decorations/tree_full1.png');
    this.load.image('dec_church', 'assets/sprites/decorations/church.gif');
    this.load.image('dec_bust_full', 'assets/sprites/decorations/bust_full1.png');
    this.load.image('dec_vase', 'assets/sprites/decorations/vase1.png');
    this.load.image('dec_catpainting1', 'assets/sprites/decorations/catpainting1.png');
    this.load.image('dec_catpainting2', 'assets/sprites/decorations/catpainting2.png');
    this.load.image('dec_painting1', 'assets/sprites/decorations/painting1.png');
    this.load.image('dec_painting3', 'assets/sprites/decorations/painting3.png');
    this.load.image('dec_scroll', 'assets/sprites/decorations/reiwa_era_scroll_01.png');
    this.load.image('dec_bookshelves', 'assets/sprites/decorations/bookshelves1.png');
    this.load.image('dec_chair_purple3', 'assets/sprites/decorations/chair-purple3.png');
    this.load.image('dec_chair_purple4', 'assets/sprites/decorations/chair-purple4.png');
    this.load.image('dec_couch_red', 'assets/sprites/decorations/couch-red1.png');
    this.load.image('dec_desk_chair', 'assets/sprites/decorations/desk-w-chair1.png');
    this.load.image('dec_rug_horizontal', 'assets/sprites/decorations/rug-horizontal1.png');
    this.load.image('dec_side_table', 'assets/sprites/decorations/side-table1.png');
    this.load.image('dec_skeleton_manacled', 'assets/sprites/decorations/skeleton-manacled1.png');
    this.load.image('dec_skulls', 'assets/sprites/decorations/skulls1.png');
    this.load.image('dec_mudspots', 'assets/sprites/decorations/mudspots1.png');
    this.load.image('dec_fire', 'assets/sprites/decorations/fire1.png');
    this.load.image('dec_candelabra_big', 'assets/sprites/decorations/candelabra-big1.png');
    this.load.image('dec_bone_pile', 'assets/sprites/decorations/bone-pile1.png');
    this.load.image('dec_bloodsplatter3', 'assets/sprites/decorations/bloodsplatter3.png');
    this.load.image('dec_bloodsplatter1', 'assets/sprites/decorations/bloodsplatter1.png');
    this.load.image('dec_web4', 'assets/sprites/decorations/web4.png');
    this.load.image('dec_web2', 'assets/sprites/decorations/web2.png');
    this.load.image('dec_standingstones', 'assets/sprites/decorations/standingstones1.png');
    this.load.image('dec_standingstones_flipped', 'assets/sprites/decorations/standingstones-flipped1.png');
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
