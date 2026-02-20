import Phaser from 'phaser';

export default class CombatSystem {
  constructor(scene) {
    this.scene = scene;
    this.playerProjectiles = scene.physics.add.group();
    this.enemyProjectiles = scene.physics.add.group();
    
    // Create placeholder projectile texture
    this.createProjectileTextures();
  }

  createProjectileTextures() {
    // Use available paintings for projectiles
    const paintingKeys = [];
    for (let i = 1; i <= 3; i++) {
      const key = `painting_${i.toString().padStart(2, '0')}`;
      if (this.scene.textures.exists(key)) {
        paintingKeys.push(key);
      }
    }
    
    if (paintingKeys.length === 0) {
      // Fallback to placeholder graphics
      const playerGraphics = this.scene.add.graphics();
      playerGraphics.fillStyle(0x00ff00, 1);
      playerGraphics.fillRect(0, 0, 20, 15);
      playerGraphics.lineStyle(2, 0x000000, 1);
      playerGraphics.strokeRect(0, 0, 20, 15);
      playerGraphics.generateTexture('player_projectile', 20, 15);
      playerGraphics.destroy();
      
      const enemyGraphics = this.scene.add.graphics();
      enemyGraphics.fillStyle(0xff0000, 1);
      enemyGraphics.fillRect(0, 0, 20, 15);
      enemyGraphics.lineStyle(2, 0x000000, 1);
      enemyGraphics.strokeRect(0, 0, 20, 15);
      enemyGraphics.generateTexture('enemy_projectile', 20, 15);
      enemyGraphics.destroy();
    }
    
    this.paintingKeys = paintingKeys;
  }

  createPlayerProjectile(attackData) {
    const { x, y, direction, damage, speed } = attackData;
    
    // Use random painting if available, otherwise use placeholder
    let textureKey = 'player_projectile';
    if (this.paintingKeys && this.paintingKeys.length > 0) {
      textureKey = Phaser.Utils.Array.GetRandom(this.paintingKeys);
    }
    
    const projectile = this.playerProjectiles.create(x, y, textureKey);
    
    // Scale paintings to about 1/3 player character size
    if (this.paintingKeys && this.paintingKeys.length > 0) {
      projectile.setScale(0.8); // Paintings should be visible but not too large
    }
    
    projectile.damage = damage;
    
    // Set velocity based on direction
    let velocityX = 0;
    let velocityY = 0;
    
    switch (direction) {
      case 'right':
        velocityX = speed;
        break;
      case 'left':
        velocityX = -speed;
        break;
      case 'up':
        velocityY = -speed;
        break;
      case 'down':
        velocityY = speed;
        break;
    }
    
    projectile.setVelocity(velocityX, velocityY);
    
    // Add rotation for visual effect
    projectile.setAngularVelocity(200);
    
    // Remove projectile after 3 seconds
    this.scene.time.delayedCall(3000, () => {
      if (projectile && projectile.active) {
        projectile.destroy();
      }
    });
    
    return projectile;
  }

  createEnemyProjectile(x, y, targetX, targetY, damage, speed) {
    // Use random painting if available, otherwise use placeholder
    let textureKey = 'enemy_projectile';
    if (this.paintingKeys && this.paintingKeys.length > 0) {
      textureKey = Phaser.Utils.Array.GetRandom(this.paintingKeys);
    }
    
    const projectile = this.enemyProjectiles.create(x, y, textureKey);
    
    // Scale paintings to about 1/3 player character size
    if (this.paintingKeys && this.paintingKeys.length > 0) {
      projectile.setScale(0.8); // Paintings should be visible but not too large
    }
    
    projectile.damage = damage;
    
    // Calculate angle to target
    const angle = Phaser.Math.Angle.Between(x, y, targetX, targetY);
    
    // Set velocity toward target
    projectile.setVelocity(
      Math.cos(angle) * speed,
      Math.sin(angle) * speed
    );
    
    // Add rotation for visual effect
    projectile.setAngularVelocity(-200);
    
    // Remove projectile after 3 seconds
    this.scene.time.delayedCall(3000, () => {
      if (projectile && projectile.active) {
        projectile.destroy();
      }
    });
    
    return projectile;
  }

  checkCollisions(player, enemies) {
    // Check player projectiles vs enemies
    this.playerProjectiles.children.entries.forEach(projectile => {
      if (!projectile.active) return;
      
      enemies.forEach(enemy => {
        if (!enemy.sprite || !enemy.sprite.active) return;
        
        if (this.scene.physics.overlap(projectile, enemy.sprite)) {
          enemy.takeDamage(projectile.damage);
          projectile.destroy();
          
          // Visual feedback - hit effect
          this.createHitEffect(enemy.sprite.x, enemy.sprite.y);
          
          // Audio feedback - randomly play hit1 or hit5
          const hitSound = Math.random() < 0.5 ? 'hit1_sound' : 'hit5_sound';
          if (this.scene.sound.get(hitSound)) {
            this.scene.sound.play(hitSound, { volume: 0.4 });
          }
        }
      });
    });
    
    // Check enemy projectiles vs player
    this.enemyProjectiles.children.entries.forEach(projectile => {
      if (!projectile.active) return;
      
      if (player.sprite && player.sprite.active) {
        if (this.scene.physics.overlap(projectile, player.sprite)) {
          player.takeDamage(projectile.damage);
          projectile.destroy();
          
          // Visual feedback - hit effect
          this.createHitEffect(player.sprite.x, player.sprite.y);
          
          // Audio feedback - randomly play hit1 or hit5
          const hitSound = Math.random() < 0.5 ? 'hit1_sound' : 'hit5_sound';
          if (this.scene.sound.get(hitSound)) {
            this.scene.sound.play(hitSound, { volume: 0.3 });
          }
        }
      }
    });
  }

  createHitEffect(x, y) {
    // Create a simple hit flash effect
    const flash = this.scene.add.circle(x, y, 20, 0xffffff, 0.8);
    
    this.scene.tweens.add({
      targets: flash,
      alpha: 0,
      scale: 2,
      duration: 300,
      onComplete: () => flash.destroy()
    });
    
    // Create particle burst
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 * i) / 8;
      const particle = this.scene.add.circle(x, y, 3, 0xff6600, 1);
      
      this.scene.tweens.add({
        targets: particle,
        x: x + Math.cos(angle) * 30,
        y: y + Math.sin(angle) * 30,
        alpha: 0,
        duration: 400,
        onComplete: () => particle.destroy()
      });
    }
  }

  update() {
    // Remove projectiles that are off-screen
    this.playerProjectiles.children.entries.forEach(projectile => {
      if (!projectile.active) return;
      
      const bounds = this.scene.cameras.main.worldView;
      if (!bounds.contains(projectile.x, projectile.y)) {
        projectile.destroy();
      }
    });
    
    this.enemyProjectiles.children.entries.forEach(projectile => {
      if (!projectile.active) return;
      
      const bounds = this.scene.cameras.main.worldView;
      if (!bounds.contains(projectile.x, projectile.y)) {
        projectile.destroy();
      }
    });
  }

  destroy() {
    this.playerProjectiles.clear(true, true);
    this.enemyProjectiles.clear(true, true);
  }
}
