import Phaser from 'phaser';

/**
 * CutsceneScene - Base class for displaying narrative cutscenes
 * 
 * Features:
 * - Dialogue box rendering with speaker names
 * - Character sprite positioning (left/right sides)
 * - Dialogue portrait display (shows when character speaks)
 * - Historical notes display at bottom of screen
 * - SPACE key dialogue advancement
 * - Skip cutscene functionality
 * - Scene transitions to next level or cutscene
 * 
 * Validates Requirements: 7.2, 7.3, 7.5
 */
export default class CutsceneScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CutsceneScene' });
  }

  /**
   * Initialize cutscene with data
   * @param {Object} data - Cutscene configuration
   * @param {string} data.cutsceneId - ID of the cutscene to display
   * @param {Array} data.dialogue - Array of dialogue segments
   * @param {string} data.background - Background image key
   * @param {string} data.nextScene - Next scene to transition to
   * @param {number} data.nextLevel - Next level number (if applicable)
   * @param {number} data.cutsceneNumber - Cutscene number (1-6) for sprite progression
   */
  init(data) {
    this.cutsceneId = data.cutsceneId || 'opening';
    this.dialogue = data.dialogue || [];
    this.backgroundKey = data.background || 'cutscene_background';
    this.nextScene = data.nextScene || 'GameplayScene';
    this.nextLevel = data.nextLevel || 1;
    this.cutsceneNumber = data.cutsceneNumber || 1;
    
    this.currentDialogueIndex = 0;
    this.canAdvance = true;
    this.skipRequested = false;
  }

  create() {
      console.log(`CutsceneScene: Creating cutscene ${this.cutsceneId}...`);

      // Stop all previous music before starting cutscene music
      this.sound.stopAll();

      // Start cutscene music
      this.startCutsceneMusic();

      // Create background
      this.createBackground();

      // Create character sprites
      this.createCharacterSprites();

      // Create dialogue box
      this.createDialogueBox();

      // Create historical notes area
      this.createHistoricalNotesArea();

      // Create skip prompt
      this.createSkipPrompt();

      // Display first dialogue
      this.displayDialogue(0);

      // Setup input handlers
      this.setupInputHandlers();
    }

  startCutsceneMusic() {
      // Map cutscene numbers to music tracks (matching their corresponding levels)
      const cutsceneMusicMap = {
        1: 'level_music_1',      // SDM_FightingBack
        2: 'level_music_2',      // Ghost (RPG)
        3: 'level_music_3',      // WTF! Ghost!
        4: 'level_music_4',      // Cakeflaps - Cate
        5: 'level_music_5',      // Showdown of Misdeeds
        6: 'victory_music'       // Ten to Life (Tickled to Death)
      };

      const musicKey = cutsceneMusicMap[this.cutsceneNumber] || 'level_music_1';

      if (this.cache.audio.exists(musicKey)) {
        this.cutsceneMusic = this.sound.add(musicKey, {
          volume: 0.4,
          loop: true  // Loop all cutscene music including victory
        });
        this.cutsceneMusic.play();
        console.log(`Playing cutscene ${this.cutsceneNumber} music: ${musicKey}`);
      } else {
        this.cutsceneMusic = null;
        console.warn(`Cutscene music not found: ${musicKey}`);
      }
    }

  createBackground() {
    // Add background image or color
    if (this.textures.exists(this.backgroundKey)) {
      // Tile the background to cover the entire window
      const bg = this.add.tileSprite(640, 360, 1280, 720, this.backgroundKey);
    } else {
      // Fallback to gradient background
      const graphics = this.add.graphics();
      graphics.fillGradientStyle(0x2a1a4a, 0x2a1a4a, 0x1a0a2a, 0x1a0a2a, 1);
      graphics.fillRect(0, 0, 1280, 720);
    }
    
    // Add semi-transparent overlay for better text readability
    const overlay = this.add.graphics();
    overlay.fillStyle(0x000000, 0.3);
    overlay.fillRect(0, 0, 1280, 720);
  }

  createCharacterSprites() {
    // Container for character sprites
    this.characterSprites = {
      left: null,
      right: null
    };
    
    // Positions for character sprites
    this.spritePositions = {
      left: { x: 250, y: 360 },
      right: { x: 1030, y: 360 }
    };
    
    // Portrait positions (shown when character speaks)
    this.portraitPositions = {
      emily: { x: 150, y: 520 },
      ghost: { x: 150, y: 520 }
    };
    
    this.currentPortrait = null;
  }

  createDialogueBox() {
    // Dialogue box background (bottom third of screen)
    const boxHeight = 200;
    const boxY = 720 - boxHeight;
    
    this.dialogueBoxBg = this.add.graphics();
    this.dialogueBoxBg.fillStyle(0x000000, 0.85);
    this.dialogueBoxBg.fillRect(0, boxY, 1280, boxHeight);
    
    // Dialogue box border
    this.dialogueBoxBg.lineStyle(3, 0xffffff, 1);
    this.dialogueBoxBg.strokeRect(10, boxY + 10, 1260, boxHeight - 20);
    
    // Speaker name text
    this.speakerNameText = this.add.text(40, boxY + 25, '', {
      fontSize: '28px',
      fill: '#ffcd75',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 3
    });
    
    // Dialogue text
    this.dialogueText = this.add.text(40, boxY + 65, '', {
      fontSize: '22px',
      fill: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      wordWrap: { width: 1100 },
      lineSpacing: 5
    });
    
    // Continue prompt
    this.continuePrompt = this.add.text(1200, boxY + boxHeight - 35, '▼', {
      fontSize: '24px',
      fill: '#ffffff',
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);
    
    // Blinking animation for continue prompt
    this.tweens.add({
      targets: this.continuePrompt,
      alpha: 0.3,
      duration: 600,
      yoyo: true,
      repeat: -1
    });
  }

  createHistoricalNotesArea() {
    // Historical notes display at bottom of dialogue box
    this.historicalNotesText = this.add.text(40, 680, '', {
      fontSize: '16px',
      fill: '#aaaaaa',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'italic',
      wordWrap: { width: 1200 }
    });
    
    this.historicalNotesText.setVisible(false);
  }

  createSkipPrompt() {
    // Skip cutscene prompt (top-right corner)
    this.skipPromptText = this.add.text(1260, 20, 'Press ESC to skip', {
      fontSize: '18px',
      fill: '#cccccc',
      fontFamily: 'Arial, sans-serif',
      align: 'right'
    }).setOrigin(1, 0);
    
    // Fade in/out animation
    this.tweens.add({
      targets: this.skipPromptText,
      alpha: 0.5,
      duration: 1500,
      yoyo: true,
      repeat: -1
    });
  }

  setupInputHandlers() {
      // SPACE key to advance dialogue (Requirement 7.3)
      this.input.keyboard.on('keydown-SPACE', () => {
        if (this.canAdvance && !this.skipRequested) {
          this.advanceDialogue();
        }
      });

      // ESC key to skip cutscene
      this.input.keyboard.on('keydown-ESC', () => {
        console.log('ESC key pressed');
        this.skipCutscene();
      });

      // Also allow ENTER to advance
      this.input.keyboard.on('keydown-ENTER', () => {
        if (this.canAdvance && !this.skipRequested) {
          this.advanceDialogue();
        }
      });

      // Alternative: Add ESC key as a Key object for better compatibility
      const escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
      escKey.on('down', () => {
        console.log('ESC key down event');
        this.skipCutscene();
      });
    }

  /**
   * Display dialogue segment at given index
   * @param {number} index - Index of dialogue segment to display
   */
  displayDialogue(index) {
    if (index >= this.dialogue.length) {
      // End of cutscene
      this.endCutscene();
      return;
    }
    
    const segment = this.dialogue[index];
    this.currentDialogueIndex = index;
    
    // Update speaker name
    const speakerName = this.getSpeakerDisplayName(segment.speaker);
    this.speakerNameText.setText(speakerName);
    
    // Update dialogue text
    this.dialogueText.setText(segment.text);
    
    // Update character sprites and portraits
    this.updateCharacterDisplay(segment.speaker);
    
    // Update historical notes if present
    if (segment.historicalNote) {
      this.historicalNotesText.setText(`Historical Note: ${segment.historicalNote}`);
      this.historicalNotesText.setVisible(true);
    } else {
      this.historicalNotesText.setVisible(false);
    }
    
    // Brief delay before allowing next advance (prevents accidental double-advance)
    this.canAdvance = false;
    this.time.delayedCall(300, () => {
      this.canAdvance = true;
    });
  }

  /**
   * Get display name for speaker
   * @param {string} speaker - Speaker identifier
   * @returns {string} Display name
   */
  getSpeakerDisplayName(speaker) {
    const names = {
      'emily': 'Emily',
      'ghost': 'Saint Elizabeth Ann Seton',
      'narrator': 'Narrator'
    };
    return names[speaker] || speaker;
  }

  /**
   * Update character sprite and portrait display based on current speaker
   * @param {string} speaker - Current speaker identifier
   */
  updateCharacterDisplay(speaker) {
    // Remove previous portrait
    if (this.currentPortrait) {
      this.currentPortrait.destroy();
      this.currentPortrait = null;
    }
    
    // Dim non-speaking characters
    if (this.characterSprites.left) {
      this.characterSprites.left.setAlpha(0.5);
    }
    if (this.characterSprites.right) {
      this.characterSprites.right.setAlpha(0.5);
    }
    
    // Display appropriate character sprites and portraits
    // Emily on the LEFT side, Saint Elizabeth Ann Seton on the RIGHT side
    if (speaker === 'emily') {
      // Emily on the left side
      this.displayCharacterSprite('emily', 'left');
      this.displayPortrait('emily');
      
      // Ensure ghost is visible on right (if not already displayed)
      if (!this.characterSprites.right) {
        this.displayCharacterSprite('ghost', 'right');
      }
      // Dim the ghost when Emily is speaking
      if (this.characterSprites.right) {
        this.characterSprites.right.setAlpha(0.5);
      }
    } else if (speaker === 'ghost') {
      // Ghost on the right side
      this.displayCharacterSprite('ghost', 'right');
      
      // Ensure Emily is visible on left (if not already displayed)
      if (!this.characterSprites.left) {
        this.displayCharacterSprite('emily', 'left');
      }
      // Dim Emily when ghost is speaking
      if (this.characterSprites.left) {
        this.characterSprites.left.setAlpha(0.5);
      }
    }
  }

  /**
   * Display character sprite at specified position
   * @param {string} character - Character identifier
   * @param {string} position - Position ('left' or 'right')
   */
  displayCharacterSprite(character, position) {
    const spriteKey = this.getCharacterSpriteKey(character, position);
    
    if (!this.textures.exists(spriteKey)) {
      console.warn(`Sprite texture not found: ${spriteKey}`);
      return;
    }
    
    // Remove existing sprite at this position
    if (this.characterSprites[position]) {
      this.characterSprites[position].destroy();
    }
    
    // Create new sprite
    const pos = this.spritePositions[position];
    const sprite = this.add.image(pos.x, pos.y, spriteKey);
    
    // Adjust scale based on sprite type
    const scale = this.getSpriteScale(spriteKey);
    sprite.setScale(scale);
    sprite.setAlpha(1); // Full opacity for active speaker
    
    this.characterSprites[position] = sprite;
    
    // Apply animation effects based on sprite type
    this.applySpriteAnimation(sprite, spriteKey, pos);
  }

  /**
   * Get appropriate scale for sprite
   * @param {string} spriteKey - Sprite key
   * @returns {number} Scale factor
   */
  getSpriteScale(spriteKey) {
    // Adjust scale for different sprite types
    if (spriteKey === 'emily-right') {
      return 2.5;
    } else if (spriteKey === 'round-ghost-sprite_0-left') {
      return 2.0;
    } else if (spriteKey === 'angel-flipped') {
      return 2.5;
    } else if (spriteKey === 'anne-seton-triumphant') {
      return 3.0;
    }
    return 2.0; // Default scale
  }

  /**
   * Apply animation effects to sprite
   * @param {Phaser.GameObjects.Image} sprite - Sprite object
   * @param {string} spriteKey - Sprite key
   * @param {Object} pos - Position object with x, y
   */
  applySpriteAnimation(sprite, spriteKey, pos) {
    // Check if this is an animated .gif sprite
    const isAnimatedGif = spriteKey === 'angel-flipped' || spriteKey === 'anne-seton-triumphant';
    
    if (isAnimatedGif) {
      // For animated .gif files, add a glowing/pulsing effect to indicate divine/powerful presence
      // Add a subtle floating animation
      this.tweens.add({
        targets: sprite,
        y: pos.y - 15,
        duration: 1500,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
      
      // Add a pulsing glow effect for divine presence
      this.tweens.add({
        targets: sprite,
        alpha: 0.85,
        duration: 1000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
      
      // Add a subtle scale pulse for triumphant form
      if (spriteKey === 'anne-seton-triumphant') {
        this.tweens.add({
          targets: sprite,
          scaleX: sprite.scaleX * 1.05,
          scaleY: sprite.scaleY * 1.05,
          duration: 1200,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut'
        });
      }
    } else {
      // For static sprites, add subtle animation for active speaker
      this.tweens.add({
        targets: sprite,
        y: pos.y - 10,
        duration: 1000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }
  }

  /**
   * Get sprite key for character at position
   * @param {string} character - Character identifier
   * @param {string} position - Position ('left' or 'right')
   * @returns {string} Sprite key
   */
  getCharacterSpriteKey(character, position) {
    // Map character and position to sprite keys
    // Emily on LEFT (facing RIGHT), Saint Elizabeth Ann Seton on RIGHT (facing LEFT)
    if (character === 'emily') {
      return 'emily-right'; // emily-right.png (facing right, positioned on left)
    } else if (character === 'ghost') {
      // Ghost sprite changes based on cutscene progression
      // Cutscenes 1-3: round-ghost-sprite_0-left.png (facing left, positioned on right)
      // Cutscenes 4-5: angel-flipped.gif (animated angelic form)
      // Cutscene 6: anne-seton-triumphant.gif (animated triumphant form)
      
      if (this.cutsceneNumber >= 1 && this.cutsceneNumber <= 3) {
        return 'round-ghost-sprite_0-left';
      } else if (this.cutsceneNumber >= 4 && this.cutsceneNumber <= 5) {
        return 'angel-flipped';
      } else if (this.cutsceneNumber === 6) {
        return 'anne-seton-triumphant';
      }
      // Default to ghost form
      return 'round-ghost-sprite_0-left';
    }
    return character;
  }

  /**
   * Display dialogue portrait for character
   * @param {string} character - Character identifier
   */
  displayPortrait(character) {
    const portraitKey = this.getPortraitKey(character);
    
    if (!this.textures.exists(portraitKey)) {
      console.warn(`Portrait texture not found: ${portraitKey}`);
      return;
    }
    
    const pos = this.portraitPositions[character];
    this.currentPortrait = this.add.image(pos.x, pos.y, portraitKey);
    
    // Adjust scale for portrait
    this.currentPortrait.setScale(1.2);
    
    // Fade in animation
    this.currentPortrait.setAlpha(0);
    this.tweens.add({
      targets: this.currentPortrait,
      alpha: 1,
      duration: 300,
      ease: 'Power2'
    });
  }

  /**
   * Get portrait key for character
   * @param {string} character - Character identifier
   * @returns {string} Portrait key
   */
  getPortraitKey(character) {
    const portraits = {
      'emily': 'emily-headshot-for-cutscenes+dialog' // emily-headshot-for-cutscenes+dialog.png
    };
    return portraits[character] || character;
  }

  /**
   * Advance to next dialogue segment (Requirement 7.3)
   */
  advanceDialogue() {
    if (!this.canAdvance) return;
    
    const nextIndex = this.currentDialogueIndex + 1;
    
    if (nextIndex < this.dialogue.length) {
      // Display next dialogue
      this.displayDialogue(nextIndex);
    } else {
      // End of cutscene
      this.endCutscene();
    }
  }

  /**
   * Skip cutscene and transition to next scene
   */
  skipCutscene() {
      if (this.skipRequested) return;

      this.skipRequested = true;
      console.log('Skipping cutscene...');

      // Stop cutscene music
      if (this.cutsceneMusic && typeof this.cutsceneMusic.stop === 'function') {
        this.cutsceneMusic.stop();
      }

      // Fade out
      this.cameras.main.fadeOut(500, 0, 0, 0);

      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.transitionToNextScene();
      });
    }

  /**
   * End cutscene and transition to next scene (Requirement 7.4)
   */
  endCutscene() {
      console.log('Cutscene complete, transitioning to next scene...');

      // Stop cutscene music
      if (this.cutsceneMusic && typeof this.cutsceneMusic.stop === 'function') {
        this.cutsceneMusic.stop();
      }

      // Fade out
      this.cameras.main.fadeOut(1000, 0, 0, 0);

      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.transitionToNextScene();
      });
    }

  /**
   * Handle scene transitions to next level or cutscene
   */
  transitionToNextScene() {
    // Determine next scene based on cutscene configuration
    if (this.nextScene === 'GameplayScene') {
      // Transition to gameplay with level number
      this.scene.start('GameplayScene', { level: this.nextLevel });
    } else if (this.nextScene === 'CampusMapScene') {
      // Transition to campus map
      this.scene.start('CampusMapScene', { level: this.nextLevel });
    } else {
      // Transition to specified scene
      this.scene.start(this.nextScene);
    }
  }

  /**
   * Update loop (if needed for animations)
   */
  update() {
    // Update logic here if needed
  }
}
