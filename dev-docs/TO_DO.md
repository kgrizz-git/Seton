# TO DO List
## Seton Hall Quest - Development Tracking

This is a personal tracking document for development tasks. For formal requirements and specifications, see:
- `.kiro/specs/seton-hall-quest/requirements.md`
- `.kiro/specs/seton-hall-quest/design.md`
- `.kiro/specs/seton-hall-quest/tasks.md`

---
## Personal notes
- Ask Gemini or other AIs to make pixel art to use
  - may be other tools to use online to transform some other picture/sprite into pixel art
- Add more variations on enemies 
  - eg, coder as another student type 
  - or replace skater w/ coder, plus agent and beachnpc
- ask if kiro knows how to use sprite sheets with multiple sub-sprites on one png, or look into it myself
- add more sound fx
- add more music
- add a way to skip cut scenes
- add a way to genuinely save/load
- not seeing finger bone
- hair always in same place?
- improve decoration sizing, placement
- add walls?

---

## Visual Assets

### Title Screen
- [ ] Update title screen sprites to use better assets from `assets/sprites/title-screen/`
- [ ] Consider using: church.gif, stained-glass-03.jpg, stained-glass-05.jpg for background
- [ ] Add character sprites: priest_trim1.png, angel.gif, round-ghost.png
- [ ] Incorporate library-big.png or other campus imagery
- [ ] Test different sprite combinations for visual appeal

### Cutscene Sprites
- [ ] Prepare Emily sprite for cutscenes (gallery director attire)
- [ ] Prepare Saint Elizabeth Ann Seton ghost sprite (anne-seton.gif or custom)
- [ ] Prepare Saint Elizabeth Ann Seton triumphant form (michael__r1916397421.gif)
- [ ] Create or source background images for each cutscene location
- [ ] Test sprite animations and transitions

---

## Audio

### Music
- [ ] Add level-specific background music
  - [ ] Level 1 (Parking Lot): Casual/light theme
  - [ ] Level 2 (Walsh Gallery): Slightly tense, artistic theme
  - [ ] Level 3 (Walsh Library): Building tension, mysterious
  - [ ] Level 4 (Administration Building): Boss battle music
  - [ ] Level 5 (The Grotto): Epic, dark cave atmosphere transitioning to triumphant
- [ ] Add cutscene music
  - [ ] Opening cutscene: Mysterious, slightly ominous
  - [ ] Mid-game cutscenes: Hopeful but tense
  - [ ] Journey to Emmitsburg: Epic, building tension
  - [ ] Victory cutscene: Triumphant, celebratory, divine
- [ ] Add title screen music (retro-styled)
- [ ] Add game over music
- [ ] Implement music transitions between scenes

### Sound Effects
- [ ] Combat sounds
  - [ ] Artwork projectile throw (player)
  - [ ] Artwork projectile throw (enemy)
  - [ ] Projectile hit/impact
  - [ ] Player taking damage
  - [ ] Enemy taking damage
  - [ ] Enemy defeat/death
- [ ] Collectible sounds
  - [ ] Relic pickup
  - [ ] Artwork collection
  - [ ] Power-up activation
- [ ] UI sounds
  - [ ] Menu selection
  - [ ] Menu navigation
  - [ ] Button click
  - [ ] Level complete
  - [ ] Game over
- [ ] Special effects
  - [ ] Ghost appearance (ethereal whoosh)
  - [ ] Saint Elizabeth transformation (angelic choir)
  - [ ] Invulnerability power activation
  - [ ] AOE spell activation
  - [ ] Boss spawn
  - [ ] Satan defeat
  - [ ] Grotto restoration ambiance
- [ ] Ambient sounds
  - [ ] Parking lot background
  - [ ] Gallery/library ambiance
  - [ ] Cave/grotto atmosphere
  - [ ] Demon sounds

---

## Cutscenes & Dialogue

### Cutscene System Implementation
- [ ] Create CutsceneScene in Phaser
- [ ] Implement dialogue box UI component
- [ ] Add text display system with typewriter effect (optional)
- [ ] Add dialogue advancement (SPACE key)
- [ ] Add skip cutscene option (ESC key for replays)
- [ ] Implement character sprite display in cutscenes
- [ ] Add background image support
- [ ] Add historical note display system
- [ ] Test scene transitions (cutscene → campus map → gameplay)

### Cutscene Content
- [ ] Cutscene 1: The Ghostly Summons (Parking Lot)
  - [ ] Write dialogue script
  - [ ] Add background (parking lot with campus buildings)
  - [ ] Add character sprites (Emily, Ghost)
  - [ ] Add music
  - [ ] Add historical notes
- [ ] Cutscene 2: The Gallery Complaint (Before Level 2)
  - [ ] Write dialogue script
  - [ ] Add campus map transition
  - [ ] Add character sprites
  - [ ] Add music
  - [ ] Add historical notes
- [ ] Cutscene 3: The Library's Secrets (Before Level 3)
  - [ ] Write dialogue script
  - [ ] Add campus map transition
  - [ ] Add character sprites
  - [ ] Add music
  - [ ] Add historical notes
- [ ] Cutscene 4: The Administrative Evil (Before Level 4)
  - [ ] Write dialogue script
  - [ ] Add campus map transition
  - [ ] Add character sprites
  - [ ] Add music
  - [ ] Add historical notes
- [ ] Cutscene 5: The Journey to Emmitsburg (Before Level 5)
  - [ ] Write dialogue script
  - [ ] Add travel montage visuals
  - [ ] Add Grotto exterior background
  - [ ] Add character sprites
  - [ ] Add music
  - [ ] Add historical notes
- [ ] Cutscene 6: Victory and Transfiguration (After Level 5)
  - [ ] Write dialogue script
  - [ ] Add cave interior background
  - [ ] Add transformation animation (michael__r1916397421.gif)
  - [ ] Add triumphant music
  - [ ] Add visual effects (light, restoration)
  - [ ] Add historical notes
  - [ ] Add credits roll

### Dialogue System
- [ ] Implement text rendering in dialogue boxes
- [ ] Add speaker name display
- [ ] Add character portrait display
- [ ] Add dialogue history/log (optional)
- [ ] Add subtitles/accessibility options
- [ ] Test dialogue pacing and readability

---

## Campus Map

- [ ] Create CampusMapScene in Phaser
- [ ] Design simplified campus map layout
- [ ] Add landmark markers
  - [ ] Parking Lot
  - [ ] Walsh Library (with Rotunda)
  - [ ] Walsh Gallery (inside library)
  - [ ] Immaculate Conception Chapel
  - [ ] Boland Hall
  - [ ] The Green
  - [ ] Administration Building
- [ ] Implement location highlighting system
- [ ] Add level name display
- [ ] Add "Press SPACE to continue" prompt
- [ ] Test transitions to gameplay scenes
- [ ] **Integrate campus map display before each level (after cutscenes)**

---

## Level Design & Decorations

### Environmental Decorations
- [ ] Add level-specific decorations to enhance atmosphere
  - [ ] **Level 1 (Parking Lot)**: Trees, bushes, cars, lamp posts, parking signs
  - [ ] **Level 2 (Walsh Gallery)**: Paintings on walls, pedestals, display cases, benches, gallery lighting
  - [ ] **Level 3 (Walsh Library)**: Bookshelves, desks, tables, chairs, reading lamps, stained glass windows
  - [ ] **Level 4 (Administration Building)**: Desks, filing cabinets, office chairs, bureaucratic clutter, portraits
  - [ ] **Level 5 (The Grotto)**: Skulls, bones, fire, boiling cauldrons, demonic symbols, cave formations, stalactites
- [ ] Source decoration sprites from available assets
  - [ ] Check `assets-likely/sheets/landscapes_items_icons/` for furniture, trees, objects
  - [ ] Use fire.gif, boil.gif for Grotto level
  - [ ] Use stained glass assets for library/chapel areas
- [ ] Implement decoration placement system in level JSON files
- [ ] Add collision detection for solid decorations
- [ ] Test decoration layering (foreground/background)

### Level Size & Layout
- [ ] **Expand level dimensions** - make levels bigger for more exploration
  - [ ] Increase tilemap size for each level
  - [ ] Add more rooms/areas to explore
  - [ ] Create more interesting level layouts (not just rectangular)
  - [ ] Add multiple paths through levels (optional)
- [ ] Balance level size with intended completion time
  - [ ] Levels 1-3: Still relatively short but more interesting
  - [ ] Level 4: Significantly larger, more complex
  - [ ] Level 5: Epic final level with multiple chambers

### Background Improvements
- [ ] **Enhance background visuals for each level**
  - [ ] Level 1: Better parking lot background with campus buildings visible
  - [ ] Level 2: Gallery interior with art on walls
  - [ ] Level 3: Library interior with Rotunda visible
  - [ ] Level 4: Administrative office environment
  - [ ] Level 5: Dark cave atmosphere with grotto elements
- [ ] Add parallax scrolling backgrounds (optional)
- [ ] Test background/foreground layering

---

## Gameplay Improvements

### Enemy AI & Movement
- [ ] **Improve enemy movement patterns** - make more realistic and varied
  - [ ] Replace simple left/right, up/down patrol with more complex paths
  - [ ] Add diagonal movement
  - [ ] Add curved/circular patrol paths
  - [ ] Add random wandering behavior
  - [ ] Add pause/idle states in patrol
  - [ ] Make chase behavior more intelligent (pathfinding or smarter pursuit)
- [ ] Implement different movement patterns per enemy type
  - [ ] Corrupt priests: Slow, methodical, predatory stalking
  - [ ] Lazy students: Erratic, distracted movement, frequent stops
  - [ ] Clueless admins: Rigid patrol patterns, sudden direction changes
  - [ ] Demons (Level 5): Aggressive, flying/floating movement
- [ ] Test enemy movement feels natural and challenging

### Enemy Spawning & Variety
- [ ] **Implement wave-based enemy spawning**
  - [ ] Spawn new enemies after first wave is defeated
  - [ ] Add 2-3 waves per level minimum
  - [ ] Increase difficulty with each wave
  - [ ] Add visual/audio cues for new wave spawning
- [ ] **Add level-specific enemy composition**
  - [ ] Level 1 (Parking Lot): Mostly lazy students, few clueless admins
  - [ ] Level 2 (Walsh Gallery): Mix of corrupt priests and lazy students, emphasis on priests
  - [ ] Level 3 (Walsh Library): Balanced mix of all three enemy types
  - [ ] Level 4 (Administration Building): Mostly clueless admins, some corrupt priests, boss fight
  - [ ] Level 5 (The Grotto): Demons only, multiple types if possible, Satan boss
- [ ] Balance enemy counts and difficulty per level
- [ ] Test spawn timing and placement

---

## Polish & Testing

### Visual Polish
- [ ] Add particle effects for combat
- [ ] Add screen shake for impacts
- [ ] Add visual feedback for damage
- [ ] Add glow effects for relics
- [ ] Add transition effects between scenes
- [ ] Test color palette consistency

### Audio Polish
- [ ] Balance music and SFX volumes
- [ ] Add audio fade in/out for transitions
- [ ] Test audio on different devices/browsers
- [ ] Ensure no audio clipping or distortion

### Playtesting
- [ ] Test full game flow from start to finish
- [ ] Verify all cutscenes trigger correctly
- [ ] Test save/load with cutscene progress
- [ ] Verify historical accuracy of all content
- [ ] Test audio/visual synchronization
- [ ] Get feedback on dialogue pacing
- [ ] Test on multiple browsers

---

## Notes

- Reference `dev-docs/plot-and-narrative.md` for complete cutscene scripts
- Reference `dev-docs/asset-inventory.md` for available assets
- Reference `dev-docs/game-structure.md` for technical implementation details
- Keep this document updated as tasks are completed
- Add new items as they come up during development

---

**Last Updated**: [Current Date]
