import Phaser from 'phaser';

export default class Enemy {
  constructor(scene, x, y, type) {
    this.scene = scene;
    this.type = type;
    
    // Map enemy types to sprite keys
    const spriteMap = {
      'corrupt_priest': 'priest_catholic',
      'lazy_student': 'skater_right', // Default to right-facing
      'clueless_admin': 'teacher_right', // Default to right-facing
      'demon': 'demon',
      'bat': 'bat',
      'rat': 'rat',
      'skeleton': 'skeleton',
      'spectre': 'spectre'
    };
    
    const spriteKey = spriteMap[type];
    
    // Create sprite - use real sprite if available, otherwise placeholder
    if (spriteKey && scene.textures.exists(spriteKey)) {
      this.sprite = scene.physics.add.sprite(x, y, spriteKey);
      
      // Set scale based on enemy type - each sprite has different native size
      const scaleMap = {
        'corrupt_priest': 1.2,   // Priest sprite is larger, scale down to match player
        'lazy_student': 0.56,    // 0.8 * 0.7 = 0.56 (70% of current size)
        'clueless_admin': 1.75,  // 2.5 * 0.7 = 1.75 (70% of current size)
        'demon': 0.7,            // 2.0 * 0.35 = 0.7 (35% of current size)
        'bat': 1.5,              // Small flying creature
        'rat': 1.2,              // Very small
        'skeleton': 2.5,         // Same as player
        'spectre': 2.2           // Slightly smaller than player
      };
      
      this.sprite.setScale(scaleMap[type] || 2.0);
    } else {
      // Create placeholder sprite based on type
      this.createPlaceholderSprite(type);
      this.sprite = scene.physics.add.sprite(x, y, `enemy_${type}_placeholder`);
    }
    
    // Enemy stats based on type
    this.setStatsForType(type);
    
    // AI state
    this.state = 'patrol'; // 'patrol', 'chase', 'attack'
    this.patrolPoints = [];
    this.currentPatrolIndex = 0;
    this.detectionRange = this.getDetectionRange(type);
    this.attackRange = this.getAttackRange(type);
    this.facingDirection = 'right'; // Track facing direction for directional sprites
    
    // Attack cooldown - different rates for different enemy types
    this.attackCooldown = 0;
    if (type === 'corrupt_priest' || type === 'clueless_admin') {
      this.attackCooldownTime = 4000; // 4 seconds (half the rate)
    } else {
      this.attackCooldownTime = 2000; // 2 seconds for other enemies
    }
    
    // Evil laugh timer for corrupt priests
    this.evilLaughTimer = 0;
    this.evilLaughInterval = 1000; // First laugh after 1 second
    this.hasLaughedOnce = false; // Track if first laugh has happened
    
    // Dialogue
    this.dialogue = this.getDialogueForType(type);
    this.canThrowArtwork = (type === 'corrupt_priest' || type === 'clueless_admin' || type === 'skeleton' || type === 'spectre');
    
    // Set up physics
    this.sprite.setCollideWorldBounds(true);
    this.sprite.setSize(30, 30);
  }

  createPlaceholderSprite(type) {
    const colors = {
      corrupt_priest: 0x8b008b, // Dark magenta
      lazy_student: 0x4169e1,   // Royal blue
      clueless_admin: 0x808080, // Gray
      demon: 0xff0000,          // Red
      bat: 0x4a0e4e,            // Dark purple
      rat: 0x654321,            // Brown
      skeleton: 0xf0f0f0,       // Off-white
      spectre: 0x00ffff         // Cyan (ghostly)
    };
    
    const graphics = this.scene.add.graphics();
    graphics.fillStyle(colors[type] || 0xff0000, 1);
    graphics.fillCircle(20, 20, 18);
    graphics.lineStyle(2, 0x000000, 1);
    graphics.strokeCircle(20, 20, 18);
    graphics.generateTexture(`enemy_${type}_placeholder`, 40, 40);
    graphics.destroy();
  }

  setStatsForType(type) {
    const stats = {
      corrupt_priest: { health: 30, damage: 8, speed: 80 },
      lazy_student: { health: 20, damage: 5, speed: 60 },
      clueless_admin: { health: 25, damage: 6, speed: 70 },
      demon: { health: 40, damage: 12, speed: 100 },
      bat: { health: 15, damage: 6, speed: 120 },
      rat: { health: 12, damage: 4, speed: 90 },
      skeleton: { health: 35, damage: 10, speed: 70 },
      spectre: { health: 25, damage: 9, speed: 85 }
    };
    
    const enemyStats = stats[type] || { health: 20, damage: 5, speed: 60 };
    this.health = enemyStats.health;
    this.maxHealth = enemyStats.health;
    this.damage = enemyStats.damage;
    this.speed = enemyStats.speed;
  }

  getDetectionRange(type) {
    const ranges = {
      corrupt_priest: 500,  // Increased detection range for priests
      lazy_student: 150,
      clueless_admin: 180,
      demon: 250,
      bat: 180,
      rat: 140,
      skeleton: 200,
      spectre: 220
    };
    return ranges[type] || 150;
  }

  getAttackRange(type) {
    const ranges = {
      corrupt_priest: 300,  // Ranged
      lazy_student: 40,     // Melee
      clueless_admin: 300,  // Ranged
      demon: 50,            // Melee
      bat: 45,              // Melee (flying)
      rat: 35,              // Melee (small)
      skeleton: 60,         // Melee
      spectre: 280          // Ranged (ghostly projectiles)
    };
    return ranges[type] || 50;
  }

  getDialogueForType(type) {
    const dialogues = {
      corrupt_priest: [
        "Come closer, my child...",
        "Your donations are... appreciated.",
        "The church needs your support...",
        "Such a generous young person you are..."
      ],
      lazy_student: [
        "Can't you see I'm busy scrolling?",
        "This is, like, so much work...",
        "Do I really have to?",
        "Whatever, I don't even care."
      ],
      clueless_admin: [
        "Have you filled out form 27B?",
        "That's not my department.",
        "You'll need to speak to someone else.",
        "Our policy clearly states..."
      ],
      demon: [
        "RAAAARGH!",
        "Your soul is mine!",
        "Darkness consumes all!",
        "The grotto belongs to us!"
      ],
      bat: [
        "Screeeech!",
        "Flap flap flap!",
        "*high-pitched shriek*"
      ],
      rat: [
        "Squeak squeak!",
        "*scurrying sounds*",
        "Hisssss!"
      ],
      skeleton: [
        "*bones rattling*",
        "Death comes for all...",
        "Join us in eternal rest!",
        "*clack clack clack*"
      ],
      spectre: [
        "Wooooooo...",
        "You cannot escape the past...",
        "*ethereal wailing*",
        "The dead do not rest here..."
      ]
    };
    return dialogues[type] || [];
  }

  setPatrolPoints(points) {
    this.patrolPoints = points;
  }

  update(player, delta) {
    if (!this.sprite || !this.sprite.active) return;
    
    // Update cooldowns
    if (this.attackCooldown > 0) {
      this.attackCooldown -= delta;
    }
    
    // Evil laugh for corrupt priests
    if (this.type === 'corrupt_priest') {
      this.evilLaughTimer += delta;
      if (this.evilLaughTimer >= this.evilLaughInterval) {
        this.playEvilLaugh();
        this.evilLaughTimer = 0;
        // After first laugh, set interval to 5 seconds
        if (!this.hasLaughedOnce) {
          this.hasLaughedOnce = true;
          this.evilLaughInterval = 5000; // 5 seconds for subsequent laughs
        }
      }
    }
    
    // Calculate distance to player
    const distanceToPlayer = Phaser.Math.Distance.Between(
      this.sprite.x, this.sprite.y,
      player.sprite.x, player.sprite.y
    );
    
    // State machine
    if (distanceToPlayer <= this.attackRange && this.attackCooldown <= 0) {
      this.state = 'attack';
      this.attack(player);
    } else if (distanceToPlayer <= this.detectionRange) {
      this.state = 'chase';
      this.chasePlayer(player);
    } else {
      this.state = 'patrol';
      this.patrol();
    }
  }

  playEvilLaugh() {
    // Randomly choose between the two evil laugh sounds
    const soundKey = Math.random() < 0.5 ? 'priest_evil_00' : 'priest_evil_02';
    
    // Check if sound exists in cache and play it with increased volume
    if (this.scene.cache.audio.exists(soundKey)) {
      this.scene.sound.play(soundKey, { volume: 0.7 });
      console.log(`Playing evil laugh: ${soundKey}`);
    } else {
      console.warn(`Evil laugh sound not found: ${soundKey}`);
    }
  }

  patrol() {
    if (this.patrolPoints.length === 0) {
      this.sprite.setVelocity(0, 0);
      return;
    }
    
    const target = this.patrolPoints[this.currentPatrolIndex];
    const distance = Phaser.Math.Distance.Between(
      this.sprite.x, this.sprite.y,
      target[0], target[1]
    );
    
    if (distance < 10) {
      // Reached patrol point, move to next
      this.currentPatrolIndex = (this.currentPatrolIndex + 1) % this.patrolPoints.length;
    } else {
      // Move toward patrol point
      const angle = Phaser.Math.Angle.Between(
        this.sprite.x, this.sprite.y,
        target[0], target[1]
      );
      
      // Update facing direction for clueless_admin (teacher) and lazy_student (skater)
      if (this.type === 'clueless_admin' || this.type === 'lazy_student') {
        const velocityX = Math.cos(angle) * this.speed;
        if (velocityX < 0 && this.facingDirection !== 'left') {
          this.facingDirection = 'left';
          this.updateDirectionalSprite();
        } else if (velocityX > 0 && this.facingDirection !== 'right') {
          this.facingDirection = 'right';
          this.updateDirectionalSprite();
        }
      }
      
      this.sprite.setVelocity(
        Math.cos(angle) * this.speed,
        Math.sin(angle) * this.speed
      );
    }
  }

  chasePlayer(player) {
    const angle = Phaser.Math.Angle.Between(
      this.sprite.x, this.sprite.y,
      player.sprite.x, player.sprite.y
    );
    
    // Update facing direction for clueless_admin (teacher) and lazy_student (skater)
    if (this.type === 'clueless_admin' || this.type === 'lazy_student') {
      const velocityX = Math.cos(angle) * this.speed;
      if (velocityX < 0 && this.facingDirection !== 'left') {
        this.facingDirection = 'left';
        this.updateDirectionalSprite();
      } else if (velocityX > 0 && this.facingDirection !== 'right') {
        this.facingDirection = 'right';
        this.updateDirectionalSprite();
      }
    }
    
    this.sprite.setVelocity(
      Math.cos(angle) * this.speed,
      Math.sin(angle) * this.speed
    );
  }

  updateDirectionalSprite() {
    // Handle directional sprites for clueless_admin (teacher) and lazy_student (skater)
    let textureKey;
    
    if (this.type === 'clueless_admin') {
      textureKey = this.facingDirection === 'left' ? 'teacher_left' : 'teacher_right';
    } else if (this.type === 'lazy_student') {
      textureKey = this.facingDirection === 'left' ? 'skater_left' : 'skater_right';
    } else {
      return; // Not a directional sprite type
    }
    
    if (this.scene.textures.exists(textureKey)) {
      this.sprite.setTexture(textureKey);
    }
  }

  attack(player) {
    this.sprite.setVelocity(0, 0);
    
    if (this.canThrowArtwork) {
      this.throwArtwork(player);
    } else {
      // Melee attack (lazy student)
      const distance = Phaser.Math.Distance.Between(
        this.sprite.x, this.sprite.y,
        player.sprite.x, player.sprite.y
      );
      
      if (distance <= this.attackRange) {
        player.takeDamage(this.damage);
      }
    }
    
    this.attackCooldown = this.attackCooldownTime;
  }

  throwArtwork(player) {
    console.log(`${this.type} throwing artwork at player`);
    
    // Emit event for combat system to create projectile
    this.scene.events.emit('enemyAttack', {
      x: this.sprite.x,
      y: this.sprite.y,
      targetX: player.sprite.x,
      targetY: player.sprite.y,
      damage: this.damage,
      speed: 250
    });
  }

  takeDamage(amount) {
    this.health -= amount;
    console.log(`${this.type} took ${amount} damage. Health: ${this.health}/${this.maxHealth}`);
    
    // Visual feedback
    this.sprite.setTint(0xff0000);
    this.scene.time.delayedCall(200, () => {
      if (this.sprite && this.sprite.active) {
        this.sprite.clearTint();
      }
    });
    
    if (this.health <= 0) {
      this.die();
    }
  }

  die() {
    console.log(`${this.type} defeated!`);
    
    // Play die sound
    if (this.scene.sound.get('die_sound')) {
      this.scene.sound.play('die_sound', { volume: 0.4 });
    }
    
    // Death animation (simple fade out)
    this.scene.tweens.add({
      targets: this.sprite,
      alpha: 0,
      scale: 0.5,
      duration: 300,
      onComplete: () => {
        this.destroy();
      }
    });
    
    // Emit event for score/drops
    this.scene.events.emit('enemyDefeated', this.type);
  }

  destroy() {
    if (this.sprite) {
      this.sprite.destroy();
    }
  }
}
