# Asset Inventory

This document tracks all assets used in "Emily and the Ghost of Elizabeth Ann Seton" game.

## Character Sprites

| Path | Filename | Used For | Status |
|------|----------|----------|--------|
| `assets/sprites/` | `emily.png` | Player character sprite (legacy/fallback) | ✓ Active |
| `assets/sprites/` | `emily-down.png` | Player character facing down (scale: 2.5x) | ✓ Active |
| `assets/sprites/` | `emily-up.png` | Player character facing up (scale: 2.5x) | ✓ Active |
| `assets/sprites/` | `emily-left.png` | Player character facing left (scale: 2.5x) | ✓ Active |
| `assets/sprites/` | `emily-right.png` | Player character facing right (scale: 2.5x) + Cutscene sprite (positioned LEFT, facing RIGHT) | ✓ Active |
| `assets/sprites/` | `emily-headshot-for-cutscenes+dialog.png` | Emily dialogue portrait in cutscenes (scale: 1.2x) | ✓ Active |
| `assets/sprites/` | `Priest.png` | Corrupt priest enemy (legacy) | ⚠️ Unused |
| `assets/sprites/` | `priest-catholic.png` | Corrupt priest enemy (scale: 1.2x) | ✓ Active |
| `assets/sprites/` | `teacher-left.png` | Clueless admin enemy facing left (scale: 1.75x) | ✓ Active |
| `assets/sprites/` | `teacher-right.png` | Clueless admin enemy facing right (scale: 1.75x) | ✓ Active |
| `assets/sprites/` | `skater-left.png` | Lazy student enemy facing left (scale: 0.56x) | ✓ Active |
| `assets/sprites/` | `skater-right.png` | Lazy student enemy facing right (scale: 0.56x) | ✓ Active |
| `assets/sprites/` | `admin.png` | Clueless admin enemy (legacy) | ⚠️ Unused |
| `assets/sprites/` | `student.png` | Lazy student enemy (legacy) | ⚠️ Unused |
| `assets/sprites/` | `ghost.png` | Ghost enemy (scale: 2.5x) | ✓ Active |
| `assets/sprites/` | `round-ghost-sprite_0-left.png` | Saint Elizabeth Ann Seton ghost form (cutscenes 1-3, positioned RIGHT, facing LEFT, scale: 2.0x) | ✓ Active |
| `assets/sprites/` | `round-ghost-sprite_0-right.png` | Saint Elizabeth Ann Seton ghost form (loaded but not used in cutscenes) | ⚠️ Loaded |
| `assets/sprites/` | `angel-flipped.gif` | Saint Elizabeth Ann Seton angelic form (cutscenes 4-5, animated, scale: 2.5x) | ✓ Active |
| `assets/sprites/` | `anne-seton-triumphant.gif` | Saint Elizabeth Ann Seton triumphant form (cutscene 6, animated, scale: 3.0x) | ✓ Active |
| `assets/sprites/` | `demon.png` | Demon enemy (scale: 0.7x) | ✓ Active |
| `assets/sprites/` | `bat.png` | Bat enemy (scale: 1.5x) | ✓ Active |
| `assets/sprites/` | `rat.png` | Rat enemy (scale: 1.2x) | ✓ Active |
| `assets/sprites/` | `skeleton.png` | Skeleton enemy (scale: 2.5x) | ✓ Active |
| `assets/sprites/` | `spectre.png` | Spectre enemy (scale: 2.2x) | ✓ Active |
| `assets/sprites/` | `anne-seton.gif` | Saint Elizabeth Ann Seton (Victory screen) | ✓ Active |
| `assets/sprites/` | `hair-relic.png` | Hair relic collectible (scale: 2.8x) | ✓ Active |

## Environment & UI

| Path | Filename | Used For | Status |
|------|----------|----------|--------|
| `assets/sprites/` | `campus-map.jpg` | Campus map reference | ✓ Active |

## Level Backgrounds

| Path | Filename | Used For | Status |
|------|----------|----------|--------|
| `assets/backgrounds/` | `parking-lot-bg.png` | Parking Lot level background (tiled) - asphalt texture + Cutscene 1 background | ✓ Active |
| `assets/backgrounds/` | `gallery-bg.png` | Walsh Gallery level background (tiled) - snowRocks texture | ✓ Active |
| `assets/backgrounds/` | `library-bg.png` | Walsh Library level background (tiled) - wood tile texture | ✓ Active |
| `assets/backgrounds/` | `admin-bg.png` | Admin Building level background (tiled) - violetRocks texture | ✓ Active |
| `assets/backgrounds/` | `grotto-bg.png` | The Grotto level background (tiled) - cave wall texture + Cutscene 6 background | ✓ Active |

## Cutscene Backgrounds

| Path | Filename | Used For | Status |
|------|----------|----------|--------|
| `assets/backgrounds/` | `parking-lot-bg.png` | Cutscene 1 background (tiled) | ✓ Active |
| N/A | Campus map (procedural) | Cutscenes 2-5 background (generated in CampusMapScene) | ✓ Active |
| `assets/backgrounds/` | `grotto-bg.png` | Cutscene 6 background (tiled, cave interior) | ✓ Active |

## Collectibles - Paintings

All paintings are used as throwable projectiles (scale: 0.8x - about 1/3 player size) and collectibles (scale: 1.75x when placed in levels) throughout the game.

| Path | Filename | Used For | Status |
|------|----------|----------|--------|
| `assets/sprites/paintings/` | `painting-01.png` | Collectible artwork | ✓ Active |
| `assets/sprites/paintings/` | `painting-02.png` | Collectible artwork | ✓ Active |
| `assets/sprites/paintings/` | `painting-03.png` | Collectible artwork | ✓ Active |

**Note:** Only 3 paintings are currently available. Old painting JPG files (painting-01.jpg through painting-39.jpg) have been removed.

## Level Decorations

Decorative sprites placed in levels to enhance visual atmosphere. Scaled between 25% and 250% of player character size.

| Path | Filename | Used For | Status |
|------|----------|----------|--------|
| `assets/sprites/decorations/` | `flower_bush1.png` | Level 1 decoration | ✓ Active |
| `assets/sprites/decorations/` | `flowers-potted1.png` | Level 1 decoration | ✓ Active |
| `assets/sprites/decorations/` | `fountain_1.png` | Level 1 decoration | ✓ Active |
| `assets/sprites/decorations/` | `lamppost1.png` | Level 1 decoration | ✓ Active |
| `assets/sprites/decorations/` | `tree_full1.png` | Level 1 decoration | ✓ Active |
| `assets/sprites/decorations/` | `church.gif` | Level 1 decoration (large building) | ✓ Active |
| `assets/sprites/decorations/` | `bust_full1.png` | Level 2 decoration | ✓ Active |
| `assets/sprites/decorations/` | `vase1.png` | Level 2 decoration | ✓ Active |
| `assets/sprites/decorations/` | `catpainting1.png` | Level 2 decoration | ✓ Active |
| `assets/sprites/decorations/` | `catpainting2.png` | Level 2 decoration | ✓ Active |
| `assets/sprites/decorations/` | `painting1.png` | Level 2 decoration | ✓ Active |
| `assets/sprites/decorations/` | `painting3.png` | Level 2 decoration | ✓ Active |
| `assets/sprites/decorations/` | `reiwa_era_scroll_01.png` | Level 2 decoration | ✓ Active |
| `assets/sprites/decorations/` | `bookshelves1.png` | Level 3 & 4 decoration | ✓ Active |
| `assets/sprites/decorations/` | `chair-purple3.png` | Level 3 & 4 decoration | ✓ Active |
| `assets/sprites/decorations/` | `chair-purple4.png` | Level 3 & 4 decoration | ✓ Active |
| `assets/sprites/decorations/` | `couch-red1.png` | Level 3 & 4 decoration | ✓ Active |
| `assets/sprites/decorations/` | `desk-w-chair1.png` | Level 3 & 4 decoration | ✓ Active |
| `assets/sprites/decorations/` | `rug-horizontal1.png` | Level 3 & 4 decoration | ✓ Active |
| `assets/sprites/decorations/` | `side-table1.png` | Level 4 decoration | ✓ Active |
| `assets/sprites/decorations/` | `skeleton-manacled1.png` | Level 5 decoration | ✓ Active |
| `assets/sprites/decorations/` | `skulls1.png` | Level 5 decoration | ✓ Active |
| `assets/sprites/decorations/` | `mudspots1.png` | Level 5 decoration | ✓ Active |
| `assets/sprites/decorations/` | `fire1.png` | Level 5 decoration | ✓ Active |
| `assets/sprites/decorations/` | `candelabra-big1.png` | Level 5 decoration | ✓ Active |
| `assets/sprites/decorations/` | `bone-pile1.png` | Level 5 decoration | ✓ Active |
| `assets/sprites/decorations/` | `bloodsplatter3.png` | Level 5 decoration | ✓ Active |
| `assets/sprites/decorations/` | `bloodsplatter1.png` | Level 5 decoration | ✓ Active |
| `assets/sprites/decorations/` | `web4.png` | Level 5 decoration | ✓ Active |
| `assets/sprites/decorations/` | `web2.png` | Level 5 decoration | ✓ Active |
| `assets/sprites/decorations/` | `standingstones1.png` | Level 5 decoration | ✓ Active |
| `assets/sprites/decorations/` | `standingstones-flipped1.png` | Level 5 decoration | ✓ Active |

## Title Screen Decorations

| Path | Filename | Used For | Status |
|------|----------|----------|--------|
| `assets/sprites/title-screen/` | `angel.gif` | Title screen decoration (center) | ✓ Active |
| `assets/sprites/title-screen/` | `round-ghost.png` | Title screen decoration (under angel) | ✓ Active |
| `assets/sprites/title-screen/` | `bone_femur.png` | Title screen decoration (left-bottom) | ✓ Active |
| `assets/sprites/title-screen/` | `hair_cut1_pinkbg.png` | Title screen decoration (right-bottom) | ✓ Active |
| `assets/sprites/title-screen/` | `church.gif` | Title screen decoration (left side) | ✓ Active |
| `assets/sprites/title-screen/` | `library-big.png` | Title screen decoration (right side) | ✓ Active |
| `assets/sprites/title-screen/` | `painting-21.jpg` | Title screen decoration (left-center) | ✓ Active |
| `assets/sprites/title-screen/` | `painting-22.jpg` | Title screen decoration (right-center) | ✓ Active |
| `assets/sprites/title-screen/` | `stained-glass-03.jpg` | Title screen decoration (top-left corner) | ✓ Active |
| `assets/sprites/title-screen/` | `stained-glass-05.jpg` | Title screen decoration (top-right corner) | ✓ Active |
| `assets/sprites/title-screen/` | `priest_trim1.png` | Title screen decoration (left-bottom corner) | ✓ Active |
| `assets/sprites/title-screen/` | `cultist_3trimmed1.png` | Title screen decoration (bottom-right corner) | ✓ Active |
| `assets/sprites/title-screen/` | `Teacher-facing-left.png` | Title screen decoration (top area) | ✓ Active |
| `assets/sprites/title-screen/` | `Teacher-facing-right.png` | Title screen decoration (top area) | ✓ Active |
| `assets/sprites/title-screen/` | `coder.png` | Title screen decoration (bottom-center) | ✓ Active |
| `assets/sprites/title-screen/` | `skater_guy.png` | Title screen decoration (bottom area) | ✓ Active |
| `assets/sprites/title-screen/` | `icon_28.png` | Title screen decoration (top-center) | ✓ Active |
| `assets/sprites/title-screen/` | `2b.png` | Loaded but not currently used | ⚠️ Unused |
| `assets/sprites/title-screen/` | `sprite-0002.png` | Loaded but not currently used | ⚠️ Unused |

## Music

### Music Assignments by Scene/Level

| Cutscene/Level | Music Track | File | Status |
|----------------|-------------|------|--------|
| Title Screen | Doll House (Glockenspiel) | `Doll House (Glockenspiel).mp3` | ✓ Active |
| Cutscene 1 & Level 1 (Parking Lot) | SDM_FightingBack | `SDM_FightingBack.mp3` | ✓ Active |
| Cutscene 2 & Level 2 (Gallery) | Ghost (RPG) | `Ghost (RPG).mp3` | ✓ Active |
| Cutscene 3 & Level 3 (Library) | WTF! Ghost! | `WTF! Ghost!.mp3` | ✓ Active |
| Cutscene 4 & Level 4 (Admin) | Cakeflaps - Cate | `Cakeflaps - Cate.ogg` | ✓ Active |
| Cutscene 5 & Level 5 (Grotto) | Showdown of Misdeeds | `Showdown of Misdeeds - MP3.mp3` | ✓ Active |
| Cutscene 6 (Victory) | Ten to Life (Tickled to Death) | `Ten to Life (Tickled to Death).ogg` | ✓ Active |

### All Music Files

| Path | Filename | Used For | Status |
|------|----------|----------|--------|
| `assets/audio/` | `Doll House (Glockenspiel).mp3` | Title screen music (looping) | ✓ Active |
| `assets/audio/` | `SDM_FightingBack.mp3` | Cutscene 1 & Level 1 music | ✓ Active |
| `assets/audio/` | `Ghost (RPG).mp3` | Cutscene 2 & Level 2 music | ✓ Active |
| `assets/audio/` | `WTF! Ghost!.mp3` | Cutscene 3 & Level 3 music | ✓ Active |
| `assets/audio/` | `Cakeflaps - Cate.ogg` | Cutscene 4 & Level 4 music | ✓ Active |
| `assets/audio/` | `Showdown of Misdeeds - MP3.mp3` | Cutscene 5 & Level 5 music | ✓ Active |
| `assets/audio/` | `Ten to Life (Tickled to Death).ogg` | Cutscene 6 (Victory) music | ✓ Active |
| `assets/audio/` | `Jingle_Win_00.mp3` | Alternate music (loaded but not assigned) | ⚠️ Loaded |
| `assets/audio/` | `symphony - 01 Ghost Step.ogg` | Alternate music (loaded but not assigned) | ⚠️ Loaded |

## Sound Effects

| Path | Filename | Used For | Status |
|------|----------|----------|--------|
| `assets/audio/` | `cartoon-throw.wav` | Throwing projectile sound | ✓ Active |
| `assets/audio/` | `ghost.wav` | Ghost sound effect | ✓ Active |
| `assets/audio/` | `wscream_2.wav` | Scream sound effect | ✓ Active |
| `assets/audio/` | `priest-evil-00.mp3` | Corrupt priest evil laugh (variant 1) | ✓ Active |
| `assets/audio/` | `priest-evil-02.mp3` | Corrupt priest evil laugh (variant 2) | ✓ Active |

## Unused Audio Assets

These audio files exist but are not currently loaded or used:

| Path | Filename | Status |
|------|----------|--------|
| `assets/audio/` | `Camille_Saint-Saens-Aquarium.ogg` | ⚠️ Not loaded |
| `assets/audio/` | `theramin-crazy.wav` | ⚠️ Not loaded |
| `assets/audio/` | `Viktor Kraus - The Pilgrimage.mp3` | ⚠️ Not loaded |

## Missing Assets & Placeholders

### Visual Effects
- **Hit effects**: Currently using procedural white flash + particle burst (no sprite assets)
- **Projectile trails**: Using Phaser graphics primitives (no sprite assets)
- **Health bars**: Using Phaser graphics rectangles (no sprite assets)
- **UI elements**: Using text and basic shapes (no custom UI sprites)

### Relics
- **Hair relic**: Referenced in code but using placeholder or missing sprite
- **Finger bone relic**: Referenced in code but using placeholder or missing sprite

### Level Backgrounds
- **Parking Lot**: Using asphalt texture (`assets/backgrounds/parking-lot-bg.png`)
- **Walsh Gallery**: Using painting/gallery interior (`assets/backgrounds/gallery-bg.png`)
- **Walsh Library**: Using bookshelves texture (`assets/backgrounds/library-bg.png`)
- **Admin Building**: Using desk/office texture (`assets/backgrounds/admin-bg.png`)
- **The Grotto**: Using cave wall texture (`assets/backgrounds/grotto-bg.png`)

All backgrounds are rendered as tiled sprites at 60% opacity to maintain gameplay clarity.

### Animations
- **Character animations**: All sprites are static (no walk/attack/idle animations)
- **Enemy animations**: All sprites are static (no movement animations)
- **Projectile animations**: Using rotation only (no sprite animation frames)

### Additional Sound Effects Needed
- **Player hit sound**: Missing
- **Enemy death sound**: Missing
- **Relic pickup sound**: Missing
- **Level complete sound**: Missing
- **Menu navigation sounds**: Missing
- **Victory fanfare**: Missing
- **Game over sound**: Missing

## Asset Loading Location

All assets are loaded in: `src/scenes/BootScene.js` in the `loadPlaceholderAssets()` method.

## Cutscene Data

All cutscene dialogue and configuration is stored in: `src/data/cutscenes.js`

### Cutscene Files

| Cutscene ID | Name | Dialogue Segments | Trigger | Status |
|-------------|------|-------------------|---------|--------|
| `cutscene1` / `opening` | The Ghostly Summons | 20 | Game start (after title screen) | ✓ Active |
| `cutscene2` / `gallery_complaint` | The Gallery Complaint | 11 | After Level 1 completion | ✓ Active |
| `cutscene3` / `library_secrets` | The Library's Secrets | 11 | After Level 2 completion | ✓ Active |
| `cutscene4` / `administrative_evil` | The Administrative Evil | 20 | After Level 3 completion | ✓ Active |
| `cutscene5` / `journey_to_emmitsburg` | The Journey to Emmitsburg | 21 | After Level 4 completion | ✓ Active |
| `cutscene6` / `victory_transfiguration` | Victory and Transfiguration | 23 | After Level 5 completion | ✓ Active |

### Cutscene Features
- **Character Positioning**: Emily (LEFT, facing RIGHT), Saint Elizabeth Ann Seton (RIGHT, facing LEFT)
- **Sprite Progression**: Ghost form (cutscenes 1-3) → Angel form (cutscenes 4-5) → Triumphant form (cutscene 6)
- **Dialogue Advancement**: SPACE or ENTER key
- **Skip Functionality**: ESC key
- **Historical Notes**: Displayed at appropriate dialogue points
- **Background Tiling**: All backgrounds tile to cover 1280x720 window
- **Transitions**: Automatic scene transitions to CampusMapScene or VictoryScene

## Notes

1. The game currently uses many procedural graphics (shapes, particles) instead of sprite assets
2. All character and enemy sprites are static images with no animation frames
3. Combat visual effects are generated programmatically
4. UI elements use basic text and shapes rather than custom sprites
5. No background music transitions between levels (same track plays throughout)
6. Several audio files in the assets folder are not being used
