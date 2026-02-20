import Enemy from '../components/Enemy.js';

export default class LevelSystem {
  constructor(scene) {
    this.scene = scene;
    this.currentLevel = null;
    this.levelData = null;
    this.enemies = [];
    this.collectibles = [];
    this.levelProgress = {
      level1Complete: false,
      level2Complete: false,
      level3Complete: false,
      level4Complete: false,
      level5Complete: false
    };
  }

  async loadLevel(levelId) {
    console.log(`Loading level: ${levelId}`);
    
    // Use hardcoded level data instead of fetching JSON
    // This avoids async issues and works immediately
    const levelDataMap = this.getLevelDataMap();
    
    this.levelData = levelDataMap[levelId];
    
    if (!this.levelData) {
      console.error(`Level data not found for: ${levelId}`);
      return false;
    }
    
    this.currentLevel = levelId;
    this.setupLevel();
    return true;
  }

  getLevelDataMap() {
    // Hardcoded level data (matches the JSON files)
    return {
      'parking_lot': {
        "id": "parking_lot",
        "name": "Parking Lot",
        "levelNumber": 1,
        "duration": "short",
        "playerSpawn": { "x": 100, "y": 360 },
        "enemies": [
          { "type": "corrupt_priest", "x": 400, "y": 300, "patrol": [[400, 300], [500, 300]] },
          { "type": "lazy_student", "x": 300, "y": 300, "patrol": [[300, 300], [400, 300]] },
          { "type": "clueless_admin", "x": 500, "y": 400, "patrol": [[500, 400], [600, 400]] }
        ],
        "boss": null,
        "collectibles": {
          "relics": [{ "type": "hair", "x": 350, "y": 250 }],
          "artworks": [{ "id": "painting_01", "name": "Bad Parking Sign", "x": 450, "y": 350, "points": 50 }]
        },
        "cutsceneTriggers": [],
        "completionTrigger": { "type": "allEnemiesDefeated" },
        "historicalContent": {
          "description": "The parking lot at Seton Hall University, where students and faculty begin their journey on the 58-acre South Orange campus.",
          "facts": ["Seton Hall University is located 14 miles from Manhattan", "The campus is in the Village of South Orange, New Jersey"]
        }
      },
      'walsh_gallery': {
        "id": "walsh_gallery",
        "name": "Walsh Gallery",
        "levelNumber": 2,
        "duration": "short",
        "playerSpawn": { "x": 100, "y": 360 },
        "enemies": [
          { "type": "corrupt_priest", "x": 400, "y": 300, "patrol": [[400, 300], [500, 300]] },
          { "type": "lazy_student", "x": 600, "y": 400, "patrol": [[600, 400], [700, 400]] }
        ],
        "boss": null,
        "collectibles": {
          "relics": [{ "type": "fingerBone", "x": 450, "y": 250 }],
          "artworks": [{ "id": "painting_02", "name": "Portrait of a Priest", "x": 550, "y": 350, "points": 100 }]
        },
        "cutsceneTriggers": [],
        "completionTrigger": { "type": "allEnemiesDefeated" },
        "historicalContent": {
          "description": "The Walsh Gallery, located on the first floor of Walsh Library, enhances the intellectual life of Seton Hall University through dynamic exhibitions.",
          "facts": ["Walsh Library opened in 1994 as a 155,000-square-foot facility", "The library features an iconic domed Rotunda"]
        }
      },
      'walsh_library': {
        "id": "walsh_library",
        "name": "Walsh Library",
        "levelNumber": 3,
        "duration": "short",
        "playerSpawn": { "x": 100, "y": 360 },
        "enemies": [
          { "type": "corrupt_priest", "x": 350, "y": 300, "patrol": [[350, 300], [450, 300]] },
          { "type": "clueless_admin", "x": 550, "y": 350, "patrol": [[550, 350], [650, 350]] },
          { "type": "lazy_student", "x": 700, "y": 450, "patrol": [[700, 450], [800, 450]] }
        ],
        "boss": null,
        "collectibles": {
          "relics": [{ "type": "hair", "x": 400, "y": 250 }],
          "artworks": [{ "id": "painting_03", "name": "Library Mural", "x": 600, "y": 300, "points": 150 }]
        },
        "cutsceneTriggers": [],
        "completionTrigger": { "type": "allEnemiesDefeated" },
        "historicalContent": {
          "description": "Walsh Library, with its iconic domed Rotunda, is a landmark on Seton Hall's campus and serves 332,000 visitors annually.",
          "facts": ["The library houses print book and journal collections", "It includes the Monsignor William Noé Field Archives and Special Collections Center"]
        }
      },
      'admin_building': {
        "id": "admin_building",
        "name": "Administration Building",
        "levelNumber": 4,
        "duration": "long",
        "playerSpawn": { "x": 100, "y": 360 },
        "enemies": [
          { "type": "clueless_admin", "x": 300, "y": 300, "patrol": [[300, 300], [400, 300]] },
          { "type": "clueless_admin", "x": 500, "y": 350, "patrol": [[500, 350], [600, 350]] },
          { "type": "corrupt_priest", "x": 700, "y": 400, "patrol": [[700, 400], [800, 400]] },
          { "type": "lazy_student", "x": 400, "y": 500, "patrol": [[400, 500], [500, 500]] }
        ],
        "boss": null,
        "collectibles": {
          "relics": [
            { "type": "hair", "x": 350, "y": 250 },
            { "type": "fingerBone", "x": 650, "y": 450 }
          ],
          "artworks": [
            { "id": "painting_04", "name": "Presidential Portrait", "x": 450, "y": 300, "points": 200 },
            { "id": "painting_05", "name": "University Seal", "x": 750, "y": 350, "points": 250 }
          ]
        },
        "cutsceneTriggers": [],
        "completionTrigger": { "type": "allEnemiesDefeated" },
        "historicalContent": {
          "description": "The Administration Building houses the offices that manage Seton Hall University, founded in 1856 by Bishop James Roosevelt Bayley.",
          "facts": [
            "Seton Hall is the oldest diocesan university in the United States",
            "Named after Saint Elizabeth Ann Seton, the first American-born saint",
            "The university was originally located in Madison, New Jersey before moving to South Orange"
          ]
        }
      },
      'grotto': {
        "id": "grotto",
        "name": "The National Shrine Grotto",
        "levelNumber": 5,
        "duration": "long",
        "playerSpawn": { "x": 100, "y": 360 },
        "enemies": [
          { "type": "corrupt_priest", "x": 800, "y": 350, "patrol": [[800, 350], [900, 350]] },
          { "type": "demon", "x": 300, "y": 300, "patrol": [[300, 300], [400, 300]] },
          { "type": "bat", "x": 450, "y": 200, "patrol": [[450, 200], [550, 200]] },
          { "type": "rat", "x": 250, "y": 450, "patrol": [[250, 450], [350, 450]] },
          { "type": "skeleton", "x": 600, "y": 300, "patrol": [[600, 300], [700, 300]] },
          { "type": "spectre", "x": 350, "y": 350, "patrol": [[350, 350], [450, 350]] },
          { "type": "demon", "x": 500, "y": 500, "patrol": [[500, 500], [600, 500]] },
          { "type": "bat", "x": 700, "y": 250, "patrol": [[700, 250], [800, 250]] },
          { "type": "rat", "x": 400, "y": 400, "patrol": [[400, 400], [500, 400]] },
          { "type": "skeleton", "x": 750, "y": 450, "patrol": [[750, 450], [850, 450]] },
          { "type": "spectre", "x": 550, "y": 200, "patrol": [[550, 200], [650, 200]] }
        ],
        "boss": null,
        "collectibles": {
          "relics": [
            { "type": "hair", "x": 350, "y": 200 },
            { "type": "fingerBone", "x": 600, "y": 450 }
          ],
          "artworks": [
            { "id": "painting_03", "name": "Grotto Icon", "x": 450, "y": 350, "points": 300 },
            { "id": "painting_01", "name": "Sacred Relic", "x": 700, "y": 250, "points": 350 }
          ]
        },
        "cutsceneTriggers": [],
        "completionTrigger": { "type": "allEnemiesDefeated" },
        "historicalContent": {
          "description": "The National Shrine Grotto of Our Lady of Lourdes in Emmitsburg, Maryland, is the oldest American replica of the revered French shrine. This sacred cave has been overrun by demons, spectres, bats, rats, and the undead.",
          "facts": [
            "The Grotto was built in 1875 by Father John DuBois, founder of Mount St. Mary's University",
            "Saint Elizabeth Ann Seton prayed at this location during her time in Emmitsburg",
            "The Grotto is a pilgrimage site visited by thousands annually",
            "Elizabeth Ann Seton founded the Sisters of Charity in Emmitsburg in 1809"
          ]
        }
      }
    };
  }

  async loadLevelData(levelId) {
    // This method is no longer used but kept for compatibility
    const response = await fetch(`/assets/data/${levelId}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load level data: ${levelId}`);
    }
    return await response.json();
  }

  setupLevel() {
    // Clear existing level
    this.clearLevel();
    
    // Add level background
    this.addLevelBackground();
    
    // Spawn player at start position
    if (this.scene.player) {
      this.scene.player.sprite.setPosition(
        this.levelData.playerSpawn.x,
        this.levelData.playerSpawn.y
      );
      this.scene.player.health = this.scene.player.maxHealth;
    }
    
    // Spawn enemies
    this.spawnEnemies();
    
    // Place collectibles
    this.placeCollectibles();
    
    // Display level name
    this.displayLevelName();
    
    console.log(`Level ${this.levelData.name} loaded successfully`);
  }

  addLevelBackground() {
    // Map level IDs to background keys
    const backgroundMap = {
      'parking_lot': 'bg_parking_lot',
      'walsh_gallery': 'bg_gallery',
      'walsh_library': 'bg_library',
      'admin_building': 'bg_admin',
      'grotto': 'bg_grotto'
    };
    
    const bgKey = backgroundMap[this.currentLevel];
    
    if (bgKey && this.scene.textures.exists(bgKey)) {
      // Create tiled background to fill the screen
      const bg = this.scene.add.tileSprite(
        this.scene.cameras.main.width / 2,
        this.scene.cameras.main.height / 2,
        this.scene.cameras.main.width,
        this.scene.cameras.main.height,
        bgKey
      );
      
      // Scale down gallery background to show more tiles
      if (this.currentLevel === 'walsh_gallery') {
        bg.setTileScale(0.5, 0.5); // Show tiles at 50% size (more tiles visible)
      }
      
      bg.setDepth(-10); // Behind everything
      bg.setScrollFactor(0); // Fixed to camera
      bg.setAlpha(0.3); // More transparent so gameplay is very clear
      
      this.background = bg;
      console.log(`Added background: ${bgKey}`);
    } else {
      console.warn(`Background not found for level: ${this.currentLevel}`);
    }
  }

  spawnEnemies() {
    this.levelData.enemies.forEach(enemyData => {
      const enemy = new Enemy(
        this.scene,
        enemyData.x,
        enemyData.y,
        enemyData.type
      );
      
      if (enemyData.patrol) {
        enemy.setPatrolPoints(enemyData.patrol);
      }
      
      this.enemies.push(enemy);
    });
    
    console.log(`Spawned ${this.enemies.length} enemies`);
  }

  placeCollectibles() {
    // Place relics
    if (this.levelData.collectibles.relics) {
      this.levelData.collectibles.relics.forEach(relicData => {
        this.createCollectible('relic', relicData);
      });
    }
    
    // Place artworks
    if (this.levelData.collectibles.artworks) {
      this.levelData.collectibles.artworks.forEach(artworkData => {
        this.createCollectible('artwork', artworkData);
      });
    }
  }

  createCollectible(type, data) {
    let sprite;
    
    if (type === 'relic') {
      // Use actual relic sprites based on type
      if (data.type === 'hair' && this.scene.textures.exists('hair_relic')) {
        sprite = this.scene.physics.add.sprite(data.x, data.y, 'hair_relic');
        sprite.setScale(2.8); // 0.8 * 3.5 = 2.8 (3.5x larger)
      } else {
        // Fallback to placeholder
        const graphics = this.scene.add.graphics();
        graphics.fillStyle(0xffd700, 1);
        graphics.fillStar(0, 0, 5, 10, 20);
        graphics.generateTexture(`collectible_relic_${data.x}_${data.y}`, 40, 40);
        graphics.destroy();
        sprite = this.scene.physics.add.sprite(data.x, data.y, `collectible_relic_${data.x}_${data.y}`);
        sprite.setScale(3.5); // 3.5x larger for placeholders
      }
    } else if (type === 'artwork') {
      // Use actual painting sprites
      if (data.id && this.scene.textures.exists(data.id)) {
        sprite = this.scene.physics.add.sprite(data.x, data.y, data.id);
        sprite.setScale(1.75); // 0.5 * 3.5 = 1.75 (3.5x larger)
      } else {
        // Fallback to placeholder
        const graphics = this.scene.add.graphics();
        graphics.fillStyle(0x00ffff, 1);
        graphics.fillStar(0, 0, 5, 10, 20);
        graphics.generateTexture(`collectible_artwork_${data.x}_${data.y}`, 40, 40);
        graphics.destroy();
        sprite = this.scene.physics.add.sprite(data.x, data.y, `collectible_artwork_${data.x}_${data.y}`);
        sprite.setScale(3.5); // 3.5x larger for placeholders
      }
    }
    
    // Add floating animation
    this.scene.tweens.add({
      targets: sprite,
      y: sprite.y - 10,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
    
    // Add rotation
    this.scene.tweens.add({
      targets: sprite,
      angle: 360,
      duration: 3000,
      repeat: -1,
      ease: 'Linear'
    });
    
    sprite.setData('collectibleType', type);
    sprite.setData('collectibleData', data);
    
    this.collectibles.push(sprite);
    
    // Set up collision with player
    this.scene.physics.add.overlap(
      this.scene.player.sprite,
      sprite,
      () => this.collectItem(sprite, type, data)
    );
  }

  collectItem(sprite, type, data) {
    console.log(`Collected ${type}:`, data);
    
    if (type === 'relic') {
      this.scene.player.collectRelic(data);
    } else if (type === 'artwork') {
      this.scene.player.collectArtwork(data);
      this.scene.events.emit('artworkCollected', data);
    }
    
    // Remove collectible
    sprite.destroy();
    this.collectibles = this.collectibles.filter(c => c !== sprite);
  }

  displayLevelName() {
    const levelName = this.scene.add.text(
      this.scene.cameras.main.width / 2,
      100,
      this.levelData.name,
      {
        fontSize: '48px',
        fill: '#fff',
        fontStyle: 'bold',
        stroke: '#000',
        strokeThickness: 6
      }
    ).setOrigin(0.5).setScrollFactor(0);
    
    // Fade out after 2 seconds
    this.scene.tweens.add({
      targets: levelName,
      alpha: 0,
      duration: 1000,
      delay: 2000,
      onComplete: () => levelName.destroy()
    });
  }

  checkLevelCompletion() {
    if (!this.levelData) return false;
    
    const trigger = this.levelData.completionTrigger;
    
    if (trigger.type === 'allEnemiesDefeated') {
      return this.enemies.length === 0;
    } else if (trigger.type === 'bossDefeated') {
      // Check if boss is defeated
      const boss = this.enemies.find(e => e.type.includes('boss'));
      return !boss;
    }
    
    return false;
  }

  completeLevel() {
    const levelNum = this.levelData.levelNumber;
    this.levelProgress[`level${levelNum}Complete`] = true;
    
    console.log(`Level ${levelNum} completed!`);
    this.scene.events.emit('levelComplete', levelNum);
  }

  getNextLevel() {
    const levelOrder = ['parking_lot', 'walsh_gallery', 'walsh_library', 'admin_building', 'grotto'];
    const currentIndex = levelOrder.indexOf(this.currentLevel);
    
    if (currentIndex >= 0 && currentIndex < levelOrder.length - 1) {
      return levelOrder[currentIndex + 1];
    }
    
    return null; // No more levels
  }

  clearLevel() {
    // Destroy background
    if (this.background) {
      this.background.destroy();
      this.background = null;
    }
    
    // Destroy all enemies
    this.enemies.forEach(enemy => enemy.destroy());
    this.enemies = [];
    
    // Destroy all collectibles
    this.collectibles.forEach(collectible => collectible.destroy());
    this.collectibles = [];
  }

  update(player, delta) {
    // Update all enemies
    this.enemies.forEach(enemy => {
      enemy.update(player, delta);
    });
    
    // Remove dead enemies
    this.enemies = this.enemies.filter(enemy => enemy.sprite && enemy.sprite.active);
    
    // Check for level completion
    if (this.checkLevelCompletion() && !this.levelCompleted) {
      this.levelCompleted = true;
      this.completeLevel();
    }
  }

  destroy() {
    this.clearLevel();
  }
}
