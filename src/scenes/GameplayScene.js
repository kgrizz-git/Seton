import Phaser from 'phaser';
import Player from '../components/Player.js';
import CombatSystem from '../systems/CombatSystem.js';
import LevelSystem from '../systems/LevelSystem.js';
import RelicManager from '../systems/RelicManager.js';

export default class GameplayScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameplayScene' });
  }

  init(data) {
    // Get level to load - convert number to level ID if needed
    if (typeof data.level === 'number') {
      const levelMap = {
        1: 'parking_lot',
        2: 'walsh_gallery',
        3: 'walsh_library',
        4: 'admin_building',
        5: 'grotto'
      };
      this.levelToLoad = levelMap[data.level] || 'parking_lot';
    } else {
      this.levelToLoad = data.level || 'parking_lot';
    }
    this.isPaused = false;
  }

  async create() {
    console.log('GameplayScene: Creating gameplay...');
    
    // Create player
    this.player = new Player(this, 640, 360);
    
    // Create combat system
    this.combatSystem = new CombatSystem(this);
    
    // Create level system
    this.levelSystem = new LevelSystem(this);
    
    // Create relic manager
    this.relicManager = new RelicManager(this);
    
    // Load the level (no longer async, returns immediately)
    this.levelSystem.loadLevel(this.levelToLoad);
    
    // Start level music
    this.startLevelMusic();
    
    // Set up event listeners
    this.events.on('playerAttack', (attackData) => {
      this.combatSystem.createPlayerProjectile(attackData);
    });
    
    this.events.on('enemyAttack', (attackData) => {
      this.combatSystem.createEnemyProjectile(
        attackData.x,
        attackData.y,
        attackData.targetX,
        attackData.targetY,
        attackData.damage,
        attackData.speed
      );
    });
    
    this.events.on('playerDied', () => {
      console.log('Game Over!');
      // Stop music
      if (this.currentMusic) {
        this.currentMusic.stop();
      }
      const totalPoints = this.player.inventory.artworks.reduce((sum, art) => sum + art.points, 0);
      const artworksCount = this.player.inventory.artworks.length;
      this.scene.start('GameOverScene', { score: totalPoints, artworks: artworksCount });
    });
    
    this.events.on('levelComplete', (levelNum) => {
      this.handleLevelComplete(levelNum);
    });
    
    this.events.on('artworkCollected', (artwork) => {
      console.log(`Collected artwork worth ${artwork.points} points!`);
    });
    
    this.events.on('relicActivated', (relicType, player) => {
      this.relicManager.activateRelic(relicType, player, this.levelSystem.enemies);
    });
    
    // Pause menu handling
    this.input.keyboard.on('keydown-ESC', () => {
      this.togglePause();
    });
    
    // UI
    this.createUI();
  }

  startLevelMusic() {
      // Stop any existing music
      if (this.currentMusic && typeof this.currentMusic.stop === 'function') {
        this.currentMusic.stop();
      }

      // Determine which music to play based on level
      let musicKey;

      if (this.levelToLoad === 'grotto') {
        // Final level - play Showdown of Misdeeds
        musicKey = 'grotto_music';
      } else {
        // Levels 1-4 - randomly select from the 5 tracks
        const randomTracks = ['level_music_1', 'level_music_2', 'level_music_3', 'level_music_4', 'level_music_5'];
        musicKey = Phaser.Utils.Array.GetRandom(randomTracks);
      }

      // Play the selected music
      if (this.cache.audio.exists(musicKey)) {
        this.currentMusic = this.sound.add(musicKey, { 
          volume: 0.5, 
          loop: true 
        });
        this.currentMusic.play();
        console.log(`Playing level music: ${musicKey}`);
      } else {
        console.warn(`Level music not found: ${musicKey}`);
      }
    }

  createUI() {
    // Controls
    this.add.text(10, 10, 'WASD/Arrows: Move | SPACE: Attack | 1: Invuln | 2: AOE | ESC: Pause', {
      fontSize: '16px',
      fill: '#fff',
      backgroundColor: '#000',
      padding: { x: 5, y: 5 }
    }).setScrollFactor(0).setDepth(100);
    
    // Health bar
    this.healthText = this.add.text(10, 40, '', {
      fontSize: '16px',
      fill: '#fff',
      backgroundColor: '#000',
      padding: { x: 5, y: 5 }
    }).setScrollFactor(0).setDepth(100);
    
    // Score
    this.scoreText = this.add.text(10, 70, 'Score: 0', {
      fontSize: '16px',
      fill: '#fff',
      backgroundColor: '#000',
      padding: { x: 5, y: 5 }
    }).setScrollFactor(0).setDepth(100);
    
    // Relics
    this.relicText = this.add.text(10, 100, '', {
      fontSize: '16px',
      fill: '#ffd700',
      backgroundColor: '#000',
      padding: { x: 5, y: 5 }
    }).setScrollFactor(0).setDepth(100);
  }

  handleLevelComplete(levelNum) {
    console.log(`Level ${levelNum} complete!`);
    
    // Stop level music
    if (this.currentMusic) {
      this.currentMusic.stop();
    }
    
    // Play win sound
    if (this.sound.get('win_sound')) {
      this.sound.play('win_sound', { volume: 0.6 });
    }
    
    // Check if this is the final level (grotto = level 5)
    if (levelNum === 5) {
      // Show victory cutscene (Cutscene 6)
      this.showFinalVictory();
      return;
    }
    
    // Show completion message
    const completeText = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'LEVEL COMPLETE!\n\nPress SPACE to continue',
      {
        fontSize: '48px',
        fill: '#00ff00',
        fontStyle: 'bold',
        align: 'center',
        stroke: '#000',
        strokeThickness: 6
      }
    ).setOrigin(0.5).setScrollFactor(0);
    
    // Wait for space key
    this.input.keyboard.once('keydown-SPACE', () => {
      // Trigger cutscene after level completion
      const cutsceneMap = {
        1: 'cutscene2',  // After parking lot -> Gallery cutscene
        2: 'cutscene3',  // After gallery -> Library cutscene
        3: 'cutscene4',  // After library -> Admin cutscene
        4: 'cutscene5'   // After admin -> Journey to Emmitsburg cutscene
      };
      
      const cutsceneId = cutsceneMap[levelNum];
      
      if (cutsceneId) {
        // Import cutscene data
        import('../data/cutscenes.js').then(module => {
          const cutsceneData = module.getCutscene(cutsceneId);
          if (cutsceneData) {
            this.scene.start('CutsceneScene', cutsceneData);
          } else {
            console.warn(`Cutscene not found: ${cutsceneId}`);
            // Fallback to campus map
            this.scene.start('CampusMapScene', { level: levelNum + 1 });
          }
        });
      } else {
        // No cutscene, go to next level
        const nextLevel = this.levelSystem.getNextLevel();
        if (nextLevel) {
          this.scene.restart({ level: nextLevel });
        } else {
          console.log('Game Complete!');
          this.scene.start('VictoryScene');
        }
      }
    });
  }

  showFinalVictory() {
    // Show final level complete message
    const completeText = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'THE GROTTO IS CLEANSED!\n\nPress SPACE to continue',
      {
        fontSize: '48px',
        fill: '#ffd700',
        fontStyle: 'bold',
        align: 'center',
        stroke: '#000',
        strokeThickness: 6
      }
    ).setOrigin(0.5).setScrollFactor(0);
    
    // Pulsing animation
    this.tweens.add({
      targets: completeText,
      scale: 1.1,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
    
    // Wait for space key
    this.input.keyboard.once('keydown-SPACE', () => {
      // Trigger final victory cutscene (Cutscene 6)
      import('../data/cutscenes.js').then(module => {
        const cutsceneData = module.getCutscene('cutscene6');
        if (cutsceneData) {
          this.scene.start('CutsceneScene', cutsceneData);
        } else {
          console.warn('Final cutscene not found');
          this.scene.start('VictoryScene');
        }
      });
    });
  }

  update(time, delta) {
    // Don't update if paused
    if (this.isPaused) return;
    
    // Update player
    if (this.player) {
      this.player.update(delta);
      
      // Update health display
      this.healthText.setText(`Health: ${this.player.health}/${this.player.maxHealth}`);
      
      // Update relic display
      const hairCount = this.player.inventory.relics.find(r => r.type === 'hair')?.quantity || 0;
      const boneCount = this.player.inventory.relics.find(r => r.type === 'fingerBone')?.quantity || 0;
      this.relicText.setText(`Relics: Hair(1): ${hairCount} | Bone(2): ${boneCount}`);
    }
    
    // Update level system (which updates enemies)
    if (this.levelSystem) {
      this.levelSystem.update(this.player, delta);
    }
    
    // Update combat system
    if (this.combatSystem) {
      this.combatSystem.update();
      this.combatSystem.checkCollisions(this.player, this.levelSystem.enemies);
    }
    
    // Update score
    const totalPoints = this.player.inventory.artworks.reduce((sum, art) => sum + art.points, 0);
    this.scoreText.setText(`Score: ${totalPoints}`);
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    
    if (this.isPaused) {
      this.showPauseMenu();
      this.physics.pause();
      // Pause music
      if (this.currentMusic && this.currentMusic.isPlaying) {
        this.currentMusic.pause();
      }
    } else {
      this.hidePauseMenu();
      this.physics.resume();
      // Resume music
      if (this.currentMusic && this.currentMusic.isPaused) {
        this.currentMusic.resume();
      }
    }
  }

  showPauseMenu() {
    // Create pause overlay
    this.pauseOverlay = this.add.rectangle(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      this.cameras.main.width,
      this.cameras.main.height,
      0x000000,
      0.7
    ).setScrollFactor(0).setDepth(1000);
    
    // Pause title
    this.pauseTitle = this.add.text(
      this.cameras.main.width / 2,
      200,
      'PAUSED',
      {
        fontSize: '64px',
        fill: '#ffffff',
        fontStyle: 'bold',
        stroke: '#000000',
        strokeThickness: 6
      }
    ).setOrigin(0.5).setScrollFactor(0).setDepth(1001);
    
    // Resume text
    this.pauseResumeText = this.add.text(
      this.cameras.main.width / 2,
      350,
      'Press ESC to Resume',
      {
        fontSize: '32px',
        fill: '#00ff00',
        fontStyle: 'bold'
      }
    ).setOrigin(0.5).setScrollFactor(0).setDepth(1001);
    
    // Menu text
    this.pauseMenuText = this.add.text(
      this.cameras.main.width / 2,
      450,
      'Press M to Return to Menu',
      {
        fontSize: '24px',
        fill: '#ffffff'
      }
    ).setOrigin(0.5).setScrollFactor(0).setDepth(1001);
    
    // Handle menu return
    this.pauseMenuHandler = this.input.keyboard.once('keydown-M', () => {
      this.scene.start('MenuScene');
    });
  }

  hidePauseMenu() {
    if (this.pauseOverlay) this.pauseOverlay.destroy();
    if (this.pauseTitle) this.pauseTitle.destroy();
    if (this.pauseResumeText) this.pauseResumeText.destroy();
    if (this.pauseMenuText) this.pauseMenuText.destroy();
    
    // Remove menu handler if it exists
    if (this.pauseMenuHandler) {
      this.input.keyboard.off('keydown-M', this.pauseMenuHandler);
    }
  }
}
