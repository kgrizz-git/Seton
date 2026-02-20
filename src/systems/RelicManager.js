import Phaser from 'phaser';

export default class RelicManager {
  constructor(scene) {
    this.scene = scene;
    
    this.relicTypes = {
      hair: {
        name: "Hair of Saint Elizabeth Ann Seton",
        power: "invulnerability",
        duration: 10000, // 10 seconds
        description: "Grants temporary invulnerability"
      },
      fingerBone: {
        name: "Finger Bone of Saint Elizabeth Ann Seton",
        power: "aoe_spell",
        radius: 150, // 5 meters in pixels (30px per meter)
        damage: 30,
        description: "Massive area-of-effect damage"
      }
    };
  }

  activateRelic(relicType, player, enemies) {
    const relic = this.relicTypes[relicType];
    
    if (!relic) {
      console.error(`Unknown relic type: ${relicType}`);
      return false;
    }
    
    console.log(`Activating relic: ${relic.name}`);
    
    if (relic.power === 'invulnerability') {
      this.activateInvulnerability(player);
    } else if (relic.power === 'aoe_spell') {
      this.activateAOESpell(player, enemies);
    }
    
    return true;
  }

  activateInvulnerability(player) {
    if (player.isInvulnerable) {
      console.log('Player is already invulnerable');
      return;
    }
    
    // Play achievement sound
    if (this.scene.sound.get('achievement_sound')) {
      this.scene.sound.play('achievement_sound', { volume: 0.5 });
    }
    
    player.isInvulnerable = true;
    
    // Visual feedback - golden glow
    player.sprite.setTint(0xffff00);
    
    // Create pulsing effect
    const pulseEffect = this.scene.tweens.add({
      targets: player.sprite,
      alpha: 0.7,
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
    
    // Display effect text
    const effectText = this.scene.add.text(
      player.sprite.x,
      player.sprite.y - 50,
      'INVULNERABLE!',
      {
        fontSize: '24px',
        fill: '#ffff00',
        fontStyle: 'bold',
        stroke: '#000',
        strokeThickness: 4
      }
    ).setOrigin(0.5);
    
    // Make text follow player
    const textFollow = this.scene.time.addEvent({
      delay: 16,
      callback: () => {
        if (effectText && effectText.active) {
          effectText.setPosition(player.sprite.x, player.sprite.y - 50);
        }
      },
      loop: true
    });
    
    // Remove invulnerability after duration
    this.scene.time.delayedCall(this.relicTypes.hair.duration, () => {
      player.isInvulnerable = false;
      player.sprite.clearTint();
      player.sprite.setAlpha(1);
      
      if (pulseEffect) {
        pulseEffect.remove();
      }
      
      if (effectText && effectText.active) {
        effectText.destroy();
      }
      
      if (textFollow) {
        textFollow.remove();
      }
      
      console.log('Invulnerability ended');
    });
  }

  activateAOESpell(player, enemies) {
    const aoeRadius = this.relicTypes.fingerBone.radius;
    const aoeDamage = this.relicTypes.fingerBone.damage;
    
    console.log(`AOE Spell activated! Radius: ${aoeRadius}, Damage: ${aoeDamage}`);
    
    // Play achievement sound
    if (this.scene.sound.get('achievement_sound')) {
      this.scene.sound.play('achievement_sound', { volume: 0.5 });
    }
    
    // Create visual effect - expanding circle
    const aoeCircle = this.scene.add.circle(
      player.sprite.x,
      player.sprite.y,
      10,
      0xff00ff,
      0.5
    );
    
    // Expand animation
    this.scene.tweens.add({
      targets: aoeCircle,
      radius: aoeRadius,
      alpha: 0,
      duration: 500,
      ease: 'Cubic.easeOut',
      onComplete: () => {
        aoeCircle.destroy();
      }
    });
    
    // Create particle effect
    this.createAOEParticles(player.sprite.x, player.sprite.y, aoeRadius);
    
    // Damage all enemies in range
    let enemiesHit = 0;
    enemies.forEach(enemy => {
      if (!enemy.sprite || !enemy.sprite.active) return;
      
      const distance = Phaser.Math.Distance.Between(
        player.sprite.x,
        player.sprite.y,
        enemy.sprite.x,
        enemy.sprite.y
      );
      
      if (distance <= aoeRadius) {
        enemy.takeDamage(aoeDamage);
        enemiesHit++;
        
        // Knockback effect
        const angle = Phaser.Math.Angle.Between(
          player.sprite.x,
          player.sprite.y,
          enemy.sprite.x,
          enemy.sprite.y
        );
        
        enemy.sprite.setVelocity(
          Math.cos(angle) * 300,
          Math.sin(angle) * 300
        );
        
        // Reset velocity after knockback
        this.scene.time.delayedCall(200, () => {
          if (enemy.sprite && enemy.sprite.active) {
            enemy.sprite.setVelocity(0, 0);
          }
        });
      }
    });
    
    console.log(`AOE Spell hit ${enemiesHit} enemies`);
    
    // Display damage text
    const damageText = this.scene.add.text(
      player.sprite.x,
      player.sprite.y - 70,
      `${enemiesHit} ENEMIES HIT!`,
      {
        fontSize: '28px',
        fill: '#ff00ff',
        fontStyle: 'bold',
        stroke: '#000',
        strokeThickness: 4
      }
    ).setOrigin(0.5);
    
    this.scene.tweens.add({
      targets: damageText,
      y: damageText.y - 50,
      alpha: 0,
      duration: 1500,
      ease: 'Cubic.easeOut',
      onComplete: () => {
        damageText.destroy();
      }
    });
  }

  createAOEParticles(x, y, radius) {
    // Create simple particle effect
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const particle = this.scene.add.circle(x, y, 5, 0xff00ff, 1);
      
      this.scene.tweens.add({
        targets: particle,
        x: x + Math.cos(angle) * radius,
        y: y + Math.sin(angle) * radius,
        alpha: 0,
        duration: 500,
        ease: 'Cubic.easeOut',
        onComplete: () => {
          particle.destroy();
        }
      });
    }
  }
}
