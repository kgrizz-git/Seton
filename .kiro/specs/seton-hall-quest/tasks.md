# Implementation Plan: Seton Hall Quest

## Overview

This plan implements a browser-based 2D action-adventure game using JavaScript and Phaser 3. The game features four levels on Seton Hall University grounds with projectile-based combat, collectible relics, boss battles, narrative cutscenes, and historical content integration. Implementation follows an incremental approach: project setup → core systems → level content → integration → testing.

## Tasks

- [x] 1. Set up project structure and Phaser 3 framework
  - Create project directory structure (src/, assets/, config/)
  - Install Phaser 3 (v3.60+) and development dependencies
  - Create index.html with canvas element
  - Set up game configuration with arcade physics
  - Create basic scene structure (BootScene, MenuScene, GameplayScene)
  - _Requirements: 10.1, 10.2_

- [ ] 2. Implement asset loading system
  - [x] 2.1 Create BootScene with asset preloading
    - Implement loading progress bar display
    - Load sprite assets (player, enemies, projectiles, collectibles)
    - Load audio assets (music tracks, sound effects)
    - Load level data JSON files
    - Load campus map image
    - Handle asset loading errors with retry logic
    - _Requirements: 10.3, 2.1_
  
  - [ ]* 2.2 Write unit tests for asset loading error handling
    - Test failed asset load with retry mechanism
    - Test missing audio fallback behavior
    - _Requirements: 10.3_

- [ ] 3. Implement Player component and controls
  - [x] 3.1 Create Player class with sprite and physics
    - Initialize player sprite with position and health
    - Implement movement logic with keyboard input (WASD/arrows)
    - Track facing direction based on movement
    - Implement smooth animations for movement states
    - Set up player physics body with collision bounds
    - _Requirements: 1.1, 1.4_
  
  - [x] 3.2 Implement player attack system
    - Create throwArtwork() method that spawns projectile
    - Set projectile velocity based on facing direction
    - Add attack cooldown (200ms) to prevent spam
    - Implement attack animation
    - _Requirements: 1.2, 1.5_
  
  - [ ] 3.3 Implement player interaction system
    - Detect nearby interactable objects
    - Trigger interactions on key press when in range
    - Display interaction prompts in UI
    - _Requirements: 1.3_
  
  - [ ]* 3.4 Write property test for movement input
    - **Property 1: Movement Input Updates Position**
    - **Validates: Requirements 1.1**
  
  - [ ]* 3.5 Write property test for attack action
    - **Property 2: Attack Action Creates Hitbox**
    - **Validates: Requirements 1.2**
  
  - [ ]* 3.6 Write property test for interaction range
    - **Property 3: Interaction Triggers Within Range**
    - **Validates: Requirements 1.3**

- [ ] 4. Implement Enemy system
  - [x] 4.1 Create Enemy base class
    - Initialize enemy sprite with type-specific stats
    - Implement health and damage properties
    - Create AI state machine (patrol, chase, attack)
    - Implement patrol movement along waypoints
    - Implement chase behavior when player in detection range
    - _Requirements: 4.5, 4.4_
  
  - [ ] 4.2 Implement enemy attack behaviors
    - Add throwArtwork() method for corrupt_priest and clueless_admin
    - Implement projectile aiming toward player
    - Add attack cooldown (2 seconds)
    - Implement melee attack for lazy_student
    - _Requirements: 4.7, 4.4_
  
  - [ ] 4.3 Add enemy dialogue system
    - Create dialogue display for corrupt priest enemies
    - Implement satirical dialogue triggers
    - Display dialogue bubbles above enemy sprites
    - _Requirements: 4.6_
  
  - [ ] 4.4 Create Boss subclass
    - Extend Enemy class with higher health
    - Implement multi-phase attack patterns
    - Add phase transitions based on health thresholds
    - _Requirements: 6.3_
  
  - [ ]* 4.5 Write property test for damage application
    - **Property 7: Damage Application**
    - **Validates: Requirements 4.1, 4.2**
  
  - [ ]* 4.6 Write property test for entity removal on death
    - **Property 8: Entity Removal on Death**
    - **Validates: Requirements 4.3, 6.2, 6.4**
  
  - [ ]* 4.7 Write property test for boss health comparison
    - **Property 13: Boss Health Exceeds Regular Enemies**
    - **Validates: Requirements 6.3**

- [ ] 5. Implement Combat System
  - [x] 5.1 Create CombatSystem class
    - Initialize projectile groups (player and enemy)
    - Implement createPlayerProjectile() method
    - Implement createEnemyProjectile() method
    - Add projectile cleanup after timeout (3 seconds)
    - _Requirements: 4.1, 4.2, 4.7_
  
  - [ ] 5.2 Implement collision detection
    - Check player projectiles vs enemy sprites
    - Check enemy projectiles vs player sprite
    - Check melee range for lazy student enemies
    - Apply damage on collision and destroy projectiles
    - _Requirements: 4.1, 4.2_
  
  - [ ] 5.3 Add combat visual and audio feedback
    - Create hit effects (particles, flashes)
    - Play sound effects for attacks and hits
    - Implement damage numbers display
    - _Requirements: 13.3, 14.2, 14.3_
  
  - [ ]* 5.4 Write unit tests for collision detection
    - Test projectile-enemy collision
    - Test projectile-player collision
    - Test melee range detection
    - _Requirements: 4.1, 4.2_

- [ ] 6. Checkpoint - Ensure core combat works
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Implement Relic system
  - [x] 7.1 Create RelicManager class
    - Define relic types (hair, fingerBone) with properties
    - Implement activateInvulnerability() method
    - Implement activateAOESpell() method
    - Add visual effects for relic powers
    - Handle power duration timers
    - _Requirements: 5.5, 5.2, 5.3_
  
  - [ ] 7.2 Integrate relics with player inventory
    - Add relic collection logic
    - Implement relic activation from inventory
    - Update UI to show available relics
    - _Requirements: 5.1_
  
  - [ ]* 7.3 Write property test for collectible addition
    - **Property 9: Collectible Addition to Inventory**
    - **Validates: Requirements 5.1, 8.1**
  
  - [ ]* 7.4 Write property test for invulnerability
    - **Property 10: Invulnerability Prevents Damage**
    - **Validates: Requirements 5.2**
  
  - [ ]* 7.5 Write property test for AOE spell range
    - **Property 10: AOE Spell Range-Based Damage**
    - **Validates: Requirements 5.3**
  
  - [ ]* 7.6 Write property test for power expiration
    - **Property 11: Power Expiration Restores Normal State**
    - **Validates: Requirements 5.4**

- [ ] 8. Implement Art Collection system
  - [ ] 8.1 Create ArtManager class
    - Define artwork collectibles with point values
    - Implement collection logic
    - Track collected artworks and total points
    - _Requirements: 8.1, 8.2_
  
  - [ ] 8.2 Integrate with UI
    - Display art collection count
    - Display total points
    - Show collection notifications on pickup
    - _Requirements: 8.3_
  
  - [ ]* 8.3 Write property test for artwork points
    - **Property 17: Artwork Collection Awards Points**
    - **Validates: Requirements 8.2**

- [ ] 9. Implement Level system
  - [x] 9.1 Create level data JSON files
    - Create parking_lot.json (Level 1 - short)
    - Create walsh_gallery.json (Level 2 - short)
    - Create walsh_library.json (Level 3 - short)
    - Create admin_building.json (Level 4 - longer)
    - Include enemy spawns, collectibles, triggers, historical content
    - _Requirements: 3.1, 3.6, 3.7, 3.8_
  
  - [x] 9.2 Create LevelSystem class
    - Implement level loading from JSON
    - Spawn enemies at configured positions
    - Place collectibles (relics and artworks)
    - Set up boss encounter triggers
    - Load tilemap and background
    - _Requirements: 3.5_
  
  - [ ] 9.3 Implement level progression logic
    - Track level completion objectives
    - Unlock next level on completion
    - Transition between levels
    - _Requirements: 3.2, 3.3, 3.4_
  
  - [ ]* 9.4 Write property test for level completion
    - **Property 4: Level Completion Unlocks Next Level**
    - **Validates: Requirements 3.2, 3.3, 3.4**
  
  - [ ]* 9.5 Write property test for level entry
    - **Property 5: Level Entry Loads Data and Spawns Enemies**
    - **Validates: Requirements 3.5**
  
  - [ ]* 9.6 Write unit test for short level duration design
    - **Property 6: Short Level Duration Design**
    - **Validates: Requirements 3.6**
  
  - [ ]* 9.7 Write property test for boss trigger
    - **Property 12: Boss Trigger Spawns Boss**
    - **Validates: Requirements 6.1**

- [ ] 10. Implement Cutscene system
  - [x] 10.1 Create CutsceneScene base class
    - Create Phaser scene for displaying cutscenes
    - Implement dialogue box rendering with speaker names
    - Add character sprite positioning system (left/right sides)
    - Implement dialogue portrait display (shows when character speaks)
    - Add historical notes display at bottom of screen
    - Implement SPACE key dialogue advancement
    - Add skip cutscene functionality
    - Handle scene transitions to next level or cutscene
    - _Requirements: 7.2, 7.3, 7.5_
  
  - [x] 10.2 Implement sprite display system for cutscenes
    - Load and display static sprites (emily-right.png, emily-headshot-for-cutscenes+dialog.png, round-ghost-sprite_0-left.png)
    - Load and animate .gif files (angel-flipped.gif, anne-seton-triumphant.gif)
    - Implement sprite positioning (characters on left/right, portraits alongside dialogue)
    - Handle sprite visibility toggling based on dialogue
    - Ensure .gif animations play correctly in Phaser
    - _Requirements: 7.2, 13.2_
  
  - [-] 10.3 Create Cutscene 1: The Ghostly Summons (Opening)
    - Implement parking lot background display
    - Configure Emily sprite (emily-right.png) and dialogue portrait (emily-headshot-for-cutscenes+dialog.png)
    - Configure Saint Elizabeth sprite (round-ghost-sprite_0-left.png)
    - Add complete dialogue sequence (Emily meets ghost, learns about corruption, accepts quest)
    - Display historical note about Saint Elizabeth Ann Seton (1774-1821, conversion, founded schools)
    - Transition to campus map showing Parking Lot location
    - _Requirements: 2.2, 7.4, 11.1_
  
  - [ ] 10.4 Create Cutscene 2: The Gallery Complaint (Before Level 2)
    - Implement campus map background highlighting Walsh Gallery
    - Configure character sprites (Emily and Saint Elizabeth in ghost form)
    - Add dialogue about gallery corruption and bad portraits
    - Display historical note about Walsh Library (opened 1994, Walsh Gallery)
    - Transition to Level 2 gameplay
    - _Requirements: 2.3, 7.4, 11.1_
  
  - [ ] 10.5 Create Cutscene 3: The Library's Secrets (Before Level 3)
    - Implement campus map background highlighting Walsh Library
    - Configure character sprites (Emily and Saint Elizabeth in ghost form)
    - Add dialogue about miracles and foreshadowing the Grotto
    - Display historical note about Saint Elizabeth's miracles (Anne Theresa O'Neill healing, 1952)
    - Transition to Level 3 gameplay
    - _Requirements: 2.4, 7.4, 11.2_
  
  - [ ] 10.6 Create Cutscene 4: The Administrative Evil (Before Level 4)
    - Implement campus map background highlighting Administration Building
    - Configure Saint Elizabeth sprite upgrade to angel-flipped.gif (animated angelic form)
    - Add dialogue revealing Satan has taken over the Grotto
    - Display historical note about National Shrine Grotto (Emmitsburg, Maryland, oldest US Lourdes replica)
    - Transition to Level 4 gameplay
    - _Requirements: 2.4, 7.4, 11.2_
  
  - [ ] 10.7 Create Cutscene 5: The Journey to Emmitsburg (Before Level 5)
    - Implement travel montage backgrounds (leaving campus, highway, arriving at Grotto)
    - Display Grotto exterior background
    - Configure Saint Elizabeth sprite (angel-flipped.gif animated form)
    - Add dialogue about final confrontation with Satan
    - Display historical note about Mother Seton's life in Emmitsburg
    - Transition to Level 5 gameplay (The Grotto)
    - _Requirements: 2.4, 7.4, 11.2_
  
  - [ ] 10.8 Create Cutscene 6: Victory and Transfiguration (After Level 5)
    - Implement cave interior background with lighting effects (darkness to light)
    - Configure Saint Elizabeth transformation sequence (angel-flipped.gif to anne-seton-triumphant.gif)
    - Add victory dialogue and saint's glorified form revelation
    - Display historical note about Saint Elizabeth's canonization (September 14, 1975)
    - Implement credits roll
    - Transition to game end
    - _Requirements: 7.4, 7.6, 11.2_
  
  - [ ] 10.9 Integrate cutscenes with game flow
    - Trigger Cutscene 1 at game start after title screen
    - Trigger Cutscene 2 after completing Level 1
    - Trigger Cutscene 3 after completing Level 2
    - Trigger Cutscene 4 after completing Level 3
    - Trigger Cutscene 5 after defeating Level 4 boss
    - Trigger Cutscene 6 after defeating Satan in Level 5
    - Pause gameplay during cutscenes
    - Resume gameplay after cutscene completion
    - _Requirements: 7.1, 7.6_
  
  - [ ]* 10.10 Write property test for cutscene trigger
    - **Property 14: Cutscene Trigger Pauses Gameplay**
    - **Validates: Requirements 7.1**
  
  - [ ]* 10.11 Write property test for cutscene advancement
    - **Property 15: Cutscene Advancement**
    - **Validates: Requirements 7.3**
  
  - [ ]* 10.12 Write property test for cutscene completion
    - **Property 16: Cutscene Completion Resumes Gameplay**
    - **Validates: Requirements 7.6**

- [ ] 11. Implement Campus Map display
  - [ ] 11.1 Create CampusMapScene
    - Display simplified Seton Hall campus map background
    - Draw landmark positions (Walsh Library, Chapel, Boland Hall, Green, Admin Building)
    - Highlight current level location with glow effect
    - Add pulsing animation to highlight
    - Display level name text
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5_
  
  - [ ] 11.2 Integrate campus map into level flow
    - Show campus map before each level starts
    - Transition to gameplay on continue key press
    - _Requirements: 15.6_
  
  - [ ]* 11.3 Write property test for campus map display
    - **Property 27: Campus Map Display Before Level**
    - **Validates: Requirements 15.1, 15.2, 15.3**
  
  - [ ]* 11.4 Write property test for campus map landmarks
    - **Property 28: Campus Map Landmark Presence**
    - **Validates: Requirements 15.4, 15.5**
  
  - [ ]* 11.5 Write property test for campus map continuation
    - **Property 29: Campus Map Continuation**
    - **Validates: Requirements 15.6**

- [ ] 12. Checkpoint - Ensure level flow works end-to-end
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 13. Implement Save/Load system
  - [ ] 13.1 Create SaveSystem class
    - Implement saveGame() method with localStorage
    - Implement loadGame() method with deserialization
    - Serialize player state, inventory, level progress, art collection
    - Handle localStorage errors (quota, unavailable, corrupted data)
    - _Requirements: 9.1, 9.2, 9.3_
  
  - [ ] 13.2 Add save/load UI to MenuScene
    - Add "Load Game" button
    - Display error messages for missing/corrupted saves
    - Add save option to pause menu
    - _Requirements: 9.4_
  
  - [ ]* 13.3 Write property test for save/load round trip
    - **Property 18: Save and Load Round Trip**
    - **Validates: Requirements 9.1, 9.2, 9.3**
  
  - [ ]* 13.4 Write unit tests for save/load errors
    - Test no save data error message
    - Test corrupted save data handling
    - Test localStorage quota exceeded
    - _Requirements: 9.4_

- [ ] 14. Implement UI system
  - [ ] 14.1 Create UIScene that runs parallel to gameplay
    - Display player health bar
    - Display relic inventory icons
    - Display art collection count and points
    - Display current level name
    - Update UI in real-time based on game state
    - _Requirements: 12.1, 12.2, 12.3, 12.4_
  
  - [ ] 14.2 Create GameOverScene
    - Display game over message
    - Show final score and art collection
    - Add restart and return to menu buttons
    - _Requirements: 12.5_
  
  - [ ]* 14.3 Write property test for UI state display
    - **Property 21: UI State Display**
    - **Validates: Requirements 8.3, 12.1, 12.2, 12.3, 12.4**

- [ ] 15. Implement Audio system
  - [ ] 15.1 Add background music for each game state
    - Create music tracks for menu, levels 1-4, boss battles
    - Implement music transitions between scenes
    - _Requirements: 14.1_
  
  - [ ] 15.2 Add sound effects
    - Player actions (attack, damage, collect)
    - Enemy actions and defeats
    - Relic power activation
    - UI interactions
    - _Requirements: 14.2, 14.3, 14.4_
  
  - [ ] 15.3 Implement volume controls
    - Add volume sliders to options menu
    - Implement mute functionality
    - Persist volume settings to localStorage
    - _Requirements: 14.6_
  
  - [ ]* 15.4 Write property test for game state music mapping
    - **Property 24: Game State Music Mapping**
    - **Validates: Requirements 14.1**
  
  - [ ]* 15.5 Write property test for action sound effects
    - **Property 25: Action Sound Effects**
    - **Validates: Requirements 14.2, 14.3, 14.4**
  
  - [ ]* 15.6 Write property test for volume control
    - **Property 26: Volume Control Functionality**
    - **Validates: Requirements 14.6**

- [ ] 16. Implement visual effects and animations
  - [ ] 16.1 Create sprite animations
    - Player movement animations (walk in 4 directions)
    - Player attack animation
    - Enemy movement and attack animations for all types
    - Boss special attack animations
    - _Requirements: 13.2_
  
  - [ ] 16.2 Add particle effects
    - Combat hit effects
    - Relic power activation effects
    - Enemy defeat effects
    - Collectible pickup sparkles
    - _Requirements: 13.3_
  
  - [ ] 16.3 Implement colorful art style
    - Apply vibrant color palette to sprites
    - Add atmospheric background elements
    - Create distinct visual designs for each enemy type
    - _Requirements: 13.1, 13.4, 13.5_
  
  - [ ]* 16.4 Write property test for visual effects triggering
    - **Property 22: Visual Effects Triggering**
    - **Validates: Requirements 13.3**
  
  - [ ]* 16.5 Write property test for unique enemy visuals
    - **Property 23: Unique Enemy Visuals**
    - **Validates: Requirements 13.4**

- [ ] 17. Implement MenuScene
  - [ ] 17.1 Create main menu UI
    - Add "New Game" button that starts opening cutscene
    - Add "Load Game" button with error handling
    - Add "Options" button for audio settings
    - Style menu with game branding
    - _Requirements: 2.1_
  
  - [ ]* 17.2 Write unit test for menu navigation
    - Test button interactions
    - Test scene transitions from menu
    - _Requirements: 2.1_

- [ ] 18. Add historical content integration
  - [ ] 18.1 Create historical content data
    - Compile verified facts about Seton Hall University (founded 1856, 58 acres, South Orange NJ)
    - Compile facts about Saint Elizabeth Ann Seton (1774-1821, canonized 1975, miracles)
    - Add facts to level descriptions
    - Add facts to cutscene dialogue
    - Add facts to collectible descriptions
    - _Requirements: 2.4, 3.8, 7.7, 11.1, 11.2, 11.3, 11.4_
  
  - [ ]* 18.2 Write property test for historical content presence
    - **Property 20: Historical Content Presence**
    - **Validates: Requirements 2.3, 3.4, 7.2, 7.5, 11.3**

- [ ] 19. Implement input handling
  - [ ] 19.1 Set up keyboard input handlers
    - Map WASD/arrow keys to movement
    - Map spacebar to attack
    - Map E key to interact
    - Map ESC to pause menu
    - Map number keys to relic activation
    - Handle conflicting simultaneous inputs
    - _Requirements: 10.4_
  
  - [ ]* 19.2 Write property test for keyboard input handling
    - **Property 19: Keyboard Input Handling**
    - **Validates: Requirements 10.4**

- [ ] 20. Checkpoint - Full game playthrough test
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 21. Polish and optimization
  - [ ] 21.1 Optimize performance
    - Ensure 60 FPS rendering
    - Optimize sprite batching
    - Implement object pooling for projectiles
    - Profile and optimize hot paths
    - _Requirements: 1.4_
  
  - [ ] 21.2 Add error handling and recovery
    - Implement all error handlers from design document
    - Add graceful degradation for missing assets
    - Add user-friendly error messages
    - Test error scenarios
    - _Requirements: 9.4_
  
  - [ ] 21.3 Cross-browser testing
    - Test on Chrome, Firefox, Safari, Edge
    - Fix browser-specific issues
    - Verify HTML5 Canvas compatibility
    - _Requirements: 10.1_

- [ ] 22. Final integration and wiring
  - [ ] 22.1 Wire all scenes together
    - Verify scene transitions work correctly
    - Ensure game state persists across scenes
    - Test complete game flow from start to finish
    - _Requirements: 2.3, 3.2, 3.3, 3.4_
  
  - [ ] 22.2 Final gameplay balance pass
    - Adjust enemy difficulty for easy mode
    - Verify levels 1-3 are short (30s-1min)
    - Verify level 4 is longer and more challenging
    - Balance damage values and health pools
    - _Requirements: 3.6, 3.7, 4.4_
  
  - [ ]* 22.3 Run full property test suite
    - Execute all 29 property tests
    - Verify 100+ iterations per test
    - Fix any failures
    - _All Properties_

- [ ] 23. Final checkpoint - Complete game verification
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests validate universal correctness properties using fast-check library
- Unit tests validate specific examples, edge cases, and integration points
- Checkpoints ensure incremental validation at key milestones
- The game uses client-side only architecture with no backend dependencies
- All assets should be organized in assets/ directory (sprites/, audio/, data/)
- Historical content must be fact-checked against credible sources before integration
