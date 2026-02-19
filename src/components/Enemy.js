import Phaser from 'phaser';

export default class Enemy {
  constructor(scene, x, y, type) {
    this.scene = scene;
    this.type = type;
    
    // Map enemy types to sprite keys
    const spriteMap = {
      'corrupt_priest': 'priest',
      'lazy_student': 'student',
      'clueless_admin': 'admin',
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
    
    // Attack cooldown
    this.attackCooldown = 0;
    this.attackCooldownTime = 2000; // 2 seconds
    
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
      corrupt_priest: 200,
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
    
    this.sprite.setVelocity(
      Math.cos(angle) * this.speed,
      Math.sin(angle) * this.speed
    );
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
