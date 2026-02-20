import Phaser from 'phaser';

/**
 * CampusMapScene - Displays simplified map of Seton Hall University campus
 * 
 * Shows campus layout with key landmarks and highlights the current level location.
 * Provides context for where each level takes place on the real university grounds.
 * 
 * Validates Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6
 */
export default class CampusMapScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CampusMapScene' });
  }

  /**
   * Initialize with level data
   * @param {Object} data - Scene initialization data
   * @param {number} data.level - Level number (1-4)
   */
  init(data) {
    this.targetLevel = data.level || 1;
    this.levelName = this.getLevelName(this.targetLevel);
  }

  create() {
    console.log(`CampusMapScene: Displaying campus map for level ${this.targetLevel}...`);
    
    // Create background
    this.createBackground();
    
    // Display campus map
    this.displayCampusMap();
    
    // Display level name
    this.displayLevelName();
    
    // Display continue prompt
    this.displayContinuePrompt();
    
    // Setup input handling
    this.setupInputHandlers();
  }

  createBackground() {
    // Gradient background
    const graphics = this.add.graphics();
    graphics.fillGradientStyle(0x1a3a52, 0x1a3a52, 0x0d1f2d, 0x0d1f2d, 1);
    graphics.fillRect(0, 0, 1280, 720);
  }

  displayCampusMap() {
    // Check if campus map image exists
    if (this.textures.exists('campus_map')) {
      // Display actual campus map image
      const mapImage = this.add.image(640, 360, 'campus_map');
      mapImage.setScale(0.8);
      mapImage.setAlpha(0.9);
    } else {
      // Fallback: Create simplified campus map with graphics
      this.createSimplifiedMap();
    }
    
    // Highlight current level location
    this.highlightLevelLocation();
  }

  createSimplifiedMap() {
    // Title
    this.add.text(640, 80, 'SETON HALL UNIVERSITY', {
      fontSize: '32px',
      fill: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold',
      align: 'center',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5);
    
    this.add.text(640, 120, 'South Orange, New Jersey - 58 Acre Campus', {
      fontSize: '18px',
      fill: '#aaaaaa',
      fontFamily: 'Arial, sans-serif',
      align: 'center'
    }).setOrigin(0.5);
    
    // Define landmark positions on the map (Requirement 15.4, 15.5)
    const landmarks = {
      parkingLot: { x: 350, y: 500, label: 'Parking Lot', size: 12 },
      walshLibrary: { x: 500, y: 300, label: 'Walsh Library\n(with Gallery & Rotunda)', size: 15 },
      chapel: { x: 700, y: 250, label: 'Immaculate\nConception Chapel', size: 12 },
      bolandHall: { x: 400, y: 450, label: 'Boland Hall', size: 10 },
      theGreen: { x: 600, y: 400, label: 'The Green', size: 10 },
      adminBuilding: { x: 750, y: 350, label: 'Administration\nBuilding', size: 12 }
    };
    
    // Draw paths/roads connecting landmarks
    const pathGraphics = this.add.graphics();
    pathGraphics.lineStyle(3, 0x666666, 0.5);
    
    // Connect landmarks with paths
    pathGraphics.lineBetween(landmarks.parkingLot.x, landmarks.parkingLot.y, landmarks.bolandHall.x, landmarks.bolandHall.y);
    pathGraphics.lineBetween(landmarks.bolandHall.x, landmarks.bolandHall.y, landmarks.walshLibrary.x, landmarks.walshLibrary.y);
    pathGraphics.lineBetween(landmarks.walshLibrary.x, landmarks.walshLibrary.y, landmarks.chapel.x, landmarks.chapel.y);
    pathGraphics.lineBetween(landmarks.walshLibrary.x, landmarks.walshLibrary.y, landmarks.theGreen.x, landmarks.theGreen.y);
    pathGraphics.lineBetween(landmarks.theGreen.x, landmarks.theGreen.y, landmarks.adminBuilding.x, landmarks.adminBuilding.y);
    pathGraphics.lineBetween(landmarks.chapel.x, landmarks.chapel.y, landmarks.adminBuilding.x, landmarks.adminBuilding.y);
    
    // Draw landmarks
    Object.entries(landmarks).forEach(([key, landmark]) => {
      // Building circle
      const buildingCircle = this.add.circle(landmark.x, landmark.y, landmark.size, 0x4a4a4a);
      buildingCircle.setStrokeStyle(2, 0xffffff);
      
      // Label
      this.add.text(landmark.x, landmark.y + landmark.size + 15, landmark.label, {
        fontSize: '14px',
        fill: '#ffffff',
        align: 'center',
        fontFamily: 'Arial, sans-serif',
        stroke: '#000000',
        strokeThickness: 2
      }).setOrigin(0.5);
    });
    
    // Store landmarks for highlighting
    this.landmarks = landmarks;
  }

  highlightLevelLocation() {
    // Map level numbers to landmark positions (Requirement 15.2, 15.3)
    const levelLocations = {
      1: { x: 350, y: 500, name: 'Parking Lot' },           // Parking Lot
      2: { x: 500, y: 300, name: 'Walsh Gallery' },         // Walsh Gallery (inside library)
      3: { x: 500, y: 300, name: 'Walsh Library' },         // Walsh Library
      4: { x: 750, y: 350, name: 'Administration Building' } // Administration Building
    };
    
    const currentLocation = levelLocations[this.targetLevel];
    
    if (!currentLocation) {
      console.warn(`No location defined for level ${this.targetLevel}`);
      return;
    }
    
    // Create glowing highlight effect (Requirement 15.2)
    const highlight = this.add.circle(
      currentLocation.x,
      currentLocation.y,
      35,
      0xffff00,
      0.3
    );
    
    // Add border to highlight
    highlight.setStrokeStyle(3, 0xffff00, 0.8);
    
    // Pulsing animation
    this.tweens.add({
      targets: highlight,
      alpha: 0.6,
      scale: 1.3,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
    
    // Add marker icon above location
    const marker = this.add.text(currentLocation.x, currentLocation.y - 50, '▼', {
      fontSize: '32px',
      fill: '#ffff00',
      fontFamily: 'Arial, sans-serif',
      stroke: '#000000',
      strokeThickness: 3
    }).setOrigin(0.5);
    
    // Bouncing animation for marker
    this.tweens.add({
      targets: marker,
      y: currentLocation.y - 40,
      duration: 600,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  displayLevelName() {
    // Display level name (Requirement 15.3)
    this.add.text(640, 620, `Next Location: ${this.levelName}`, {
      fontSize: '36px',
      fill: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 30, y: 15 },
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold',
      align: 'center',
      stroke: '#ffff00',
      strokeThickness: 2
    }).setOrigin(0.5);
  }

  displayContinuePrompt() {
    // Continue prompt (Requirement 15.6)
    const prompt = this.add.text(640, 680, 'Press SPACE to continue', {
      fontSize: '20px',
      fill: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      align: 'center'
    }).setOrigin(0.5);
    
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

  setupInputHandlers() {
    // SPACE key to continue (Requirement 15.6)
    this.input.keyboard.once('keydown-SPACE', () => {
      this.continueToLevel();
    });
    
    // Also allow ENTER
    this.input.keyboard.once('keydown-ENTER', () => {
      this.continueToLevel();
    });
  }

  continueToLevel() {
    console.log(`Transitioning to level ${this.targetLevel}...`);
    
    // Fade out
    this.cameras.main.fadeOut(500, 0, 0, 0);
    
    this.cameras.main.once('camerafadeoutcomplete', () => {
      // Transition to gameplay scene with level number
      this.scene.start('GameplayScene', { level: this.targetLevel });
    });
  }

  /**
   * Get level name from level number
   * @param {number} level - Level number (1-4)
   * @returns {string} Level name
   */
  getLevelName(level) {
    const names = {
      1: 'Parking Lot',
      2: 'Walsh Gallery',
      3: 'Walsh Library',
      4: 'Administration Building'
    };
    return names[level] || 'Unknown Location';
  }
}
