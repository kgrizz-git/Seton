import Phaser from 'phaser';

export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;
    
    // Create sprite - use real sprite if available, otherwise placeholder
    if (scene.textures.exists('emily_down')) {
      this.sprite = scene.physics.add.sprite(x, y, 'emily_down');
      this.sprite.setScale(2.5); // Scale up player character
    } else if (scene.textures.exists('emily')) {
      this.sprite = scene.physics.add.sprite(x, y, 'emily');
      this.sprite.setScale(2.5);
    } else {
      this.sprite = scene.physics.add.sprite(x, y, null);
      
      // Draw placeholder graphics
      const graphics = scene.add.graphics();
      graphics.fillStyle(0x00ff00, 1);
      graphics.fillCircle(0, 0, 20);
      graphics.generateTexture('player_placeholder', 40, 40);
      graphics.destroy();
      
      this.sprite.setTexture('player_placeholder');
    }
    
    // Player stats
    this.health = 100;
    this.maxHealth = 100;
    this.speed = 200;
    this.attackDamage = 10;
    this.projectileSpeed = 300;
    
    // Inventory
    this.inventory = {
      relics: [],
      artworks: []
    };
    
    // State
    this.isInvulnerable = false;
    this.invulnerabilityTimer = null;
    this.facingDirection = 'down';
    this.isMoving = false;
    
    // Set up physics
    this.sprite.setCollideWorldBounds(true);
    this.sprite.setSize(30, 30);
    
    // Input
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.wasd = {
      up: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    };
    this.attackKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    // Relic activation keys
    this.relicKey1 = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    this.relicKey2 = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    
    // Attack cooldown
    this.attackCooldown = 0;
    this.attackCooldownTime = 200; // 200ms between attacks
  }

  update(delta) {
    this.handleMovement(delta);
    this.handleAttack(delta);
    this.handleRelics(delta);
    this.updateAnimations();
    
    // Update cooldowns
    if (this.attackCooldown > 0) {
      this.attackCooldown -= delta;
    }
  }

  handleMovement(delta) {
    let velocityX = 0;
    let velocityY = 0;
    let newDirection = this.facingDirection;
    
    // Check input (both arrow keys and WASD)
    if (this.cursors.left.isDown || this.wasd.left.isDown) {
      velocityX = -this.speed;
      newDirection = 'left';
      this.isMoving = true;
    } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
      velocityX = this.speed;
      newDirection = 'right';
      this.isMoving = true;
    }
    
    if (this.cursors.up.isDown || this.wasd.up.isDown) {
      velocityY = -this.speed;
      newDirection = 'up';
      this.isMoving = true;
    } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
      velocityY = this.speed;
      newDirection = 'down';
      this.isMoving = true;
    }
    
    // If no movement input, stop
    if (velocityX === 0 && velocityY === 0) {
      this.isMoving = false;
    }
    
    // Update sprite texture if direction changed
    if (newDirection !== this.facingDirection) {
      this.facingDirection = newDirection;
      this.updateSpriteTexture();
    }
    
    // Normalize diagonal movement
    if (velocityX !== 0 && velocityY !== 0) {
      velocityX *= 0.707; // 1/sqrt(2)
      velocityY *= 0.707;
    }
    
    // Apply velocity
    this.sprite.setVelocity(velocityX, velocityY);
  }

  updateSpriteTexture() {
    // Map direction to sprite texture
    const textureMap = {
      'down': 'emily_down',
      'up': 'emily_up',
      'left': 'emily_left',
      'right': 'emily_right'
    };
    
    const newTexture = textureMap[this.facingDirection];
    
    if (newTexture && this.scene.textures.exists(newTexture)) {
      this.sprite.setTexture(newTexture);
    }
  }

  updateAnimations() {
    // Placeholder for animation updates
    // Will be implemented when sprite animations are added
    if (this.isMoving) {
      // Play walk animation based on facingDirection
    } else {
      // Play idle animation
    }
  }

  handleAttack(delta) {
    if (Phaser.Input.Keyboard.JustDown(this.attackKey) && this.attackCooldown <= 0) {
      this.throwArtwork();
      this.attackCooldown = this.attackCooldownTime;
    }
  }

  throwArtwork() {
    console.log(`Player throwing artwork in direction: ${this.facingDirection}`);
    
    // Play throw sound
    if (this.scene.sound.get('throw_sound')) {
      this.scene.sound.play('throw_sound', { volume: 0.3 });
    }
    
    // Emit event for combat system to create projectile
    this.scene.events.emit('playerAttack', {
      x: this.sprite.x,
      y: this.sprite.y,
      direction: this.facingDirection,
      damage: this.attackDamage,
      speed: this.projectileSpeed
    });
    
    // Visual feedback - brief flash
    this.sprite.setTint(0xffff00);
    this.scene.time.delayedCall(100, () => {
      if (this.sprite && this.sprite.active) {
        this.sprite.clearTint();
      }
    });
  }

  handleRelics(delta) {
    // Activate hair relic (invulnerability) with key 1
    if (Phaser.Input.Keyboard.JustDown(this.relicKey1)) {
      const hairRelic = this.inventory.relics.find(r => r.type === 'hair');
      if (hairRelic && hairRelic.quantity > 0) {
        if (this.activateRelic('hair')) {
          hairRelic.quantity--;
        }
      } else {
        console.log('No hair relic available');
      }
    }
    
    // Activate finger bone relic (AOE) with key 2
    if (Phaser.Input.Keyboard.JustDown(this.relicKey2)) {
      const boneRelic = this.inventory.relics.find(r => r.type === 'fingerBone');
      if (boneRelic && boneRelic.quantity > 0) {
        if (this.activateRelic('fingerBone')) {
          boneRelic.quantity--;
        }
      } else {
        console.log('No finger bone relic available');
      }
    }
  }

  takeDamage(amount) {
    if (this.isInvulnerable) {
      return;
    }
    
    this.health -= amount;
    console.log(`Player took ${amount} damage. Health: ${this.health}/${this.maxHealth}`);
    
    if (this.health <= 0) {
      this.health = 0;
      this.die();
    }
    
    // Visual feedback
    this.sprite.setTint(0xff0000);
    this.scene.time.delayedCall(200, () => {
      if (this.sprite && this.sprite.active) {
        this.sprite.clearTint();
      }
    });
  }

  die() {
    console.log('Player died!');
    
    // Play lose sound
    if (this.scene.sound.get('lose_sound')) {
      this.scene.sound.play('lose_sound', { volume: 0.5 });
    }
    
    this.sprite.setActive(false);
    this.sprite.setVisible(false);
    
    // Trigger game over
    this.scene.events.emit('playerDied');
  }

  collectArtwork(artwork) {
    this.inventory.artworks.push(artwork);
    console.log(`Collected artwork: ${artwork.id}`);
  }

  collectRelic(relic) {
    const existing = this.inventory.relics.find(r => r.type === relic.type);
    if (existing) {
      existing.quantity++;
    } else {
      this.inventory.relics.push({ type: relic.type, quantity: 1 });
    }
    console.log(`Collected relic: ${relic.type}`);
  }

  activateRelic(relicType) {
    const relic = this.inventory.relics.find(r => r.type === relicType);
    if (!relic || relic.quantity <= 0) {
      console.log(`No ${relicType} relic available`);
      return false;
    }
    
    relic.quantity--;
    console.log(`Activated ${relicType} relic`);
    
    // Relic effects will be handled by RelicManager
    this.scene.events.emit('relicActivated', relicType, this);
    return true;
  }

  destroy() {
    if (this.sprite) {
      this.sprite.destroy();
    }
  }
}
