# Game Structure - Emily and the Ghost of Elizabeth Ann Seton

This document outlines the complete structure of the game, including all scenes, levels, enemies, items, and assets used in each section.

---

## Title Screen

### Description
Colorful retro-styled title screen with gradient background and decorative sprites.

### Background
- Gradient stripes (5 colors: purple to orange gradient)
- 50 twinkling stars (procedural)
- Dimensions: 1280x720

### Decorative Sprites
| Sprite | Asset | Position | Scale | Notes |
|--------|-------|----------|-------|-------|
| Angel | `title_angel` (angel.gif) | (640, 360) | 4.375x | Center, large |
| Round Ghost | `title_ghost` (round-ghost.png) | (640, 500) | 3.6x | Under angel |
| Bone Femur | `title_bone` (bone_femur.png) | (320, 600) | 6.4x | Left-bottom |
| Hair | `title_hair` (hair_cut1_pinkbg.png) | (1100, 580) | 2.16x | Right-bottom |
| Church | `title_church` (church.gif) | (130, 350) | 1.08x | Left side |
| Library | `title_library` (library-big.png) | (1150, 350) | 2.496x | Right side |
| Painting 21 | `title_painting21` (painting-21.jpg) | (340, 410) | 0.30375x | Left-center |
| Painting 22 | `title_painting22` (painting-22.jpg) | (940, 410) | 0.30375x | Right-center |
| Stained Glass 03 | `title_glass03` (stained-glass-03.jpg) | (80, 130) | 0.0945x | Top-left corner |
| Stained Glass 05 | `title_glass05` (stained-glass-05.jpg) | (1200, 130) | 0.0945x | Top-right corner |
| Priest | `title_priest` (priest_trim1.png) | (180, 660) | 4.8x | Left-bottom corner |
| Cultist | `title_cultist` (cultist_3trimmed1.png) | (1100, 680) | 2.4x | Bottom-right corner |
| Teacher Left | `title_teacher_l` (Teacher-facing-left.png) | (350, 150) | 1.5015x | Top area |
| Teacher Right | `title_teacher_r` (Teacher-facing-right.png) | (900, 150) | 1.5015x | Top area |
| Coder | `title_coder` (coder.png) | (640, 650) | 2.1x | Bottom-center |
| Skater | `title_skater` (skater_guy.png) | (850, 600) | 0.28x | Bottom area |
| Icon | `title_icon` (icon_28.png) | (640, 80) | 2.4x | Top-center |

### Music
- **Track**: `title_music` (Doll House (Glockenspiel).mp3)
- **Volume**: 0.5
- **Loop**: Yes

### UI Elements
- Title text: "EMILY AND THE GHOST OF ELIZABETH ANN SETON"
- Subtitle: "A Seton Hall University Adventure"
- Prompt: "PRESS SPACE TO START"

### Progression
- Press SPACE to advance to Menu Scene

---

## Menu Scene

### Description
Main menu for level selection.

### Enemies/NPCs
None

### Items
None

### Assets Used
- Text-based menu (no sprites)

### Progression
- Select level to play
- Transitions to GameplayScene with selected level

---

## Cut-Scene: Introduction
**[PLACEHOLDER - To be implemented]**

This cut-scene will introduce the story and set up the player's mission.

---

## Level 1: Parking Lot

### Cut-Scene Before Level
**[PLACEHOLDER - To be implemented]**

Introduction to the parking lot and the corruption spreading through campus.

### Description
The parking lot at Seton Hall University where students and faculty begin their journey.

### Background
- **Asset**: `bg_parking_lot` (asphalt_or_similar1.png)
- **Type**: Tiled sprite
- **Dimensions**: 1280x720 (fills screen)
- **Opacity**: 30%
- **Position**: Centered, fixed to camera

### Player
- **Sprite**: `emily_down/up/left/right` (pc-down1.png, pc-up1.png, pc-left1.png, pc-right1.png)
- **Scale**: 2.5x
- **Starting Position**: (100, 360)
- **Health**: 100
- **Speed**: 200

### Enemies
| Type | Sprite | Scale | Position | Patrol Points | Dialogue | Sound Effects |
|------|--------|-------|----------|---------------|----------|---------------|
| Corrupt Priest | `priest_catholic` (priest-catholic1.png) | 1.2x | (400, 300) | [[400,300], [500,300]] | "Come closer, my child...", "Your donations are... appreciated." | `priest_evil_00.mp3`, `priest_evil_02.mp3` (1s then every 5s) |
| Lazy Student | `skater_left/skater_right` (skater-left.png, skater-right.png) | 0.8x | (300, 300) | [[300,300], [400,300]] | "Can't you see I'm busy scrolling?", "Whatever, I don't even care." | None |
| Clueless Admin | `teacher_left/teacher_right` (teacher-left.png, teacher-right.png) | 2.5x | (500, 400) | [[500,400], [600,400]] | "Have you filled out form 27B?", "That's not my department." | None |

### Collectibles
| Type | Asset | Scale | Position | Points/Effect |
|------|-------|-------|----------|---------------|
| Hair Relic | `hair_relic` (hair_cut1_pinkbg-removebg-preview.png) | 0.8x | (350, 250) | Grants invulnerability when activated |
| Painting | `painting_01` (painting1.png) | 0.5x | (450, 350) | 50 points |

### Projectiles
- **Player**: Random painting from available 3 (scale: 0.5x)
- **Enemy**: Random painting from available 3 (scale: 0.5x)

### Victory Condition
- Defeat all enemies

### Historical Content
- "The parking lot at Seton Hall University, where students and faculty begin their journey on the 58-acre South Orange campus."
- "Seton Hall University is located 14 miles from Manhattan"
- "The campus is in the Village of South Orange, New Jersey"

### Progression
- Transitions to Level 2 (Walsh Gallery)

---

## Cut-Scene: After Level 1
**[PLACEHOLDER - To be implemented]**

Transition from parking lot to Walsh Gallery.

---

## Level 2: Walsh Gallery

### Cut-Scene Before Level
**[PLACEHOLDER - To be implemented]**

Introduction to the Walsh Gallery and the corrupted art.

### Description
The Walsh Gallery on the first floor of Walsh Library, featuring dynamic exhibitions.

### Background
- **Asset**: `bg_gallery` (snowRocks.png)
- **Type**: Tiled sprite (scaled to 50% - shows more tiles)
- **Dimensions**: 1280x720 (fills screen)
- **Opacity**: 30%
- **Position**: Centered, fixed to camera

### Player
- **Starting Position**: (100, 360)

### Enemies
| Type | Sprite | Scale | Position | Patrol Points | Dialogue | Sound Effects |
|------|--------|-------|----------|---------------|----------|---------------|
| Corrupt Priest | `priest_catholic` (priest-catholic1.png) | 1.2x | (400, 300) | [[400,300], [500,300]] | "Such a generous young person you are...", "The church needs your support..." | `priest_evil_00.mp3`, `priest_evil_02.mp3` (1s then every 5s) |
| Lazy Student | `skater_left/skater_right` (skater-left.png, skater-right.png) | 0.8x | (600, 400) | [[600,400], [700,400]] | "This is, like, so much work...", "Do I really have to?" | None |

### Collectibles
| Type | Asset | Scale | Position | Points/Effect |
|------|-------|-------|----------|---------------|
| Finger Bone Relic | Placeholder (gold star) | 1x | (450, 250) | AOE damage spell when activated |
| Painting | `painting_02` (painting2.png) | 0.5x | (550, 350) | 100 points |

### Victory Condition
- Defeat all enemies

### Historical Content
- "The Walsh Gallery, located on the first floor of Walsh Library, enhances the intellectual life of Seton Hall University through dynamic exhibitions."
- "Walsh Library opened in 1994 as a 155,000-square-foot facility"
- "The library features an iconic domed Rotunda"

### Progression
- Transitions to Level 3 (Walsh Library)

---

## Cut-Scene: After Level 2
**[PLACEHOLDER - To be implemented]**

Transition from gallery to library interior.

---

## Level 3: Walsh Library

### Cut-Scene Before Level
**[PLACEHOLDER - To be implemented]**

Introduction to Walsh Library and the spreading corruption.

### Description
Walsh Library with its iconic domed Rotunda, serving 332,000 visitors annually.

### Background
- **Asset**: `bg_library` (wood_singletile1.png)
- **Type**: Tiled sprite
- **Dimensions**: 1280x720 (fills screen)
- **Opacity**: 30%
- **Position**: Centered, fixed to camera

### Player
- **Starting Position**: (100, 360)

### Enemies
| Type | Sprite | Scale | Position | Patrol Points | Dialogue | Sound Effects |
|------|--------|-------|----------|---------------|----------|---------------|
| Corrupt Priest | `priest_catholic` (priest-catholic1.png) | 1.2x | (350, 300) | [[350,300], [450,300]] | "Come closer, my child...", "Your donations are... appreciated." | `priest_evil_00.mp3`, `priest_evil_02.mp3` (1s then every 5s) |
| Clueless Admin | `teacher_left/teacher_right` (teacher-left.png, teacher-right.png) | 2.5x | (550, 350) | [[550,350], [650,350]] | "You'll need to speak to someone else.", "Our policy clearly states..." | None |
| Lazy Student | `skater_left/skater_right` (skater-left.png, skater-right.png) | 0.8x | (700, 450) | [[700,450], [800,450]] | "Can't you see I'm busy scrolling?", "Whatever, I don't even care." | None |

### Collectibles
| Type | Asset | Scale | Position | Points/Effect |
|------|-------|-------|----------|---------------|
| Hair Relic | `hair_relic` (hair_cut1_pinkbg-removebg-preview.png) | 0.8x | (400, 250) | Grants invulnerability when activated |
| Painting | `painting_03` (painting3.png) | 0.5x | (600, 300) | 150 points |

### Victory Condition
- Defeat all enemies

### Historical Content
- "Walsh Library, with its iconic domed Rotunda, is a landmark on Seton Hall's campus and serves 332,000 visitors annually."
- "The library houses print book and journal collections"
- "It includes the Monsignor William Noé Field Archives and Special Collections Center"

### Progression
- Transitions to Level 4 (Administration Building)

---

## Cut-Scene: After Level 3
**[PLACEHOLDER - To be implemented]**

Transition from library to administration building.

---

## Level 4: Administration Building

### Cut-Scene Before Level
**[PLACEHOLDER - To be implemented]**

Introduction to the Administration Building and the source of corruption.

### Description
The Administration Building houses the offices that manage Seton Hall University, founded in 1856.

### Background
- **Asset**: `bg_admin` (violetRocks.png)
- **Type**: Tiled sprite
- **Dimensions**: 1280x720 (fills screen)
- **Opacity**: 30%
- **Position**: Centered, fixed to camera

### Player
- **Starting Position**: (100, 360)

### Enemies
| Type | Sprite | Scale | Position | Patrol Points | Dialogue | Sound Effects |
|------|--------|-------|----------|---------------|----------|---------------|
| Corrupt Priest | `priest_catholic` (priest-catholic1.png) | 1.2x | (700, 400) | [[700,400], [800,400]] | "Such a generous young person you are...", "The church needs your support..." | `priest_evil_00.mp3`, `priest_evil_02.mp3` (1s then every 5s) |
| Clueless Admin | `teacher_left/teacher_right` (teacher-left.png, teacher-right.png) | 2.5x | (300, 300) | [[300,300], [400,300]] | "Have you filled out form 27B?", "That's not my department." | None |
| Clueless Admin | `teacher_left/teacher_right` (teacher-left.png, teacher-right.png) | 2.5x | (500, 350) | [[500,350], [600,350]] | "You'll need to speak to someone else.", "Our policy clearly states..." | None |
| Lazy Student | `skater_left/skater_right` (skater-left.png, skater-right.png) | 0.8x | (400, 500) | [[400,500], [500,500]] | "This is, like, so much work...", "Do I really have to?" | None |

### Collectibles
| Type | Asset | Scale | Position | Points/Effect |
|------|-------|-------|----------|---------------|
| Hair Relic | `hair_relic` (hair_cut1_pinkbg-removebg-preview.png) | 0.8x | (350, 250) | Grants invulnerability when activated |
| Finger Bone Relic | Placeholder (gold star) | 1x | (650, 450) | AOE damage spell when activated |
| Painting | `painting_01` (painting1.png) | 0.5x | (450, 300) | 200 points |
| Painting | `painting_02` (painting2.png) | 0.5x | (750, 350) | 250 points |

### Victory Condition
- Defeat all enemies

### Historical Content
- "The Administration Building houses the offices that manage Seton Hall University, founded in 1856 by Bishop James Roosevelt Bayley."
- "Seton Hall is the oldest diocesan university in the United States"
- "Named after Saint Elizabeth Ann Seton, the first American-born saint"
- "The university was originally located in Madison, New Jersey before moving to South Orange"

### Progression
- Transitions to Level 5 (The Grotto)

---

## Cut-Scene: After Level 4
**[PLACEHOLDER - To be implemented]**

Transition to the National Shrine Grotto - the final confrontation.

---

## Level 5: The National Shrine Grotto

### Cut-Scene Before Level
**[PLACEHOLDER - To be implemented]**

Introduction to the Grotto and the final battle against the demonic forces.

### Description
The National Shrine Grotto of Our Lady of Lourdes in Emmitsburg, Maryland - a sacred cave overrun by demons and undead.

### Background
- **Asset**: `bg_grotto` (cave-wall-outer-or-inner1.png)
- **Type**: Tiled sprite
- **Dimensions**: 1280x720 (fills screen)
- **Opacity**: 30%
- **Position**: Centered, fixed to camera

### Player
- **Starting Position**: (100, 360)

### Enemies
| Type | Sprite | Scale | Position | Patrol Points | Dialogue | Sound Effects |
|------|--------|-------|----------|---------------|----------|---------------|
| Corrupt Priest | `priest_catholic` (priest-catholic1.png) | 1.2x | (800, 350) | [[800,350], [900,350]] | "Come closer, my child...", "Your donations are... appreciated." | `priest_evil_00.mp3`, `priest_evil_02.mp3` (1s then every 5s) |
| Demon | `demon` (demon.png) | 2.0x | (300, 300) | [[300,300], [400,300]] | "RAAAARGH!", "Your soul is mine!" | None |
| Demon | `demon` (demon.png) | 2.0x | (500, 500) | [[500,500], [600,500]] | "Darkness consumes all!", "The grotto belongs to us!" | None |
| Bat | `bat` (bat.png) | 1.5x | (450, 200) | [[450,200], [550,200]] | "Screeeech!", "*high-pitched shriek*" | None |
| Bat | `bat` (bat.png) | 1.5x | (700, 250) | [[700,250], [800,250]] | "Flap flap flap!", "Screeeech!" | None |
| Rat | `rat` (rat.png) | 1.2x | (250, 450) | [[250,450], [350,450]] | "Squeak squeak!", "Hisssss!" | None |
| Rat | `rat` (rat.png) | 1.2x | (400, 400) | [[400,400], [500,400]] | "*scurrying sounds*", "Squeak squeak!" | None |
| Skeleton | `skeleton` (skeleton.png) | 2.5x | (600, 300) | [[600,300], [700,300]] | "*bones rattling*", "Death comes for all..." | None |
| Skeleton | `skeleton` (skeleton.png) | 2.5x | (750, 450) | [[750,450], [850,450]] | "Join us in eternal rest!", "*clack clack clack*" | None |
| Spectre | `spectre` (spectre.png) | 2.2x | (350, 350) | [[350,350], [450,350]] | "Wooooooo...", "You cannot escape the past..." | None |
| Spectre | `spectre` (spectre.png) | 2.2x | (550, 200) | [[550,200], [650,200]] | "*ethereal wailing*", "The dead do not rest here..." | None |

### Collectibles
| Type | Asset | Scale | Position | Points/Effect |
|------|-------|-------|----------|---------------|
| Hair Relic | `hair_relic` (hair_cut1_pinkbg-removebg-preview.png) | 0.8x | (350, 200) | Grants invulnerability when activated |
| Finger Bone Relic | Placeholder (gold star) | 1x | (600, 450) | AOE damage spell when activated |
| Painting | `painting_03` (painting3.png) | 0.5x | (450, 350) | 300 points |
| Painting | `painting_01` (painting1.png) | 0.5x | (700, 250) | 350 points |

### Victory Condition
- Defeat all enemies (11 total)

### Historical Content
- "The National Shrine Grotto of Our Lady of Lourdes in Emmitsburg, Maryland, is the oldest American replica of the revered French shrine. This sacred cave has been overrun by demons, spectres, bats, rats, and the undead."
- "The Grotto was built in 1875 by Father John DuBois, founder of Mount St. Mary's University"
- "Saint Elizabeth Ann Seton prayed at this location during her time in Emmitsburg"
- "The Grotto is a pilgrimage site visited by thousands annually"
- "Elizabeth Ann Seton founded the Sisters of Charity in Emmitsburg in 1809"

### Progression
- Transitions to Victory Scene

---

## Victory Scene

### Description
Golden/holy gradient background with sparkles celebrating the player's victory.

### Background
- Gradient (golden/holy colors)
- Sparkle particles (procedural)

### NPCs
| Character | Sprite | Scale | Position | Message |
|-----------|--------|-------|----------|---------|
| Saint Elizabeth Ann Seton | `anne_seton` (anne-seton.gif) | 3x | (640, 300) | "Thank you, Emily! You have cleansed the grotto and restored peace to Seton Hall. The spirits can rest now." |

### Music
None (peaceful silence)

### UI Elements
- Victory message
- Final score display
- Artworks collected count

### Progression
- Return to menu or restart game

---

## Game Over Scene

### Description
Displayed when player dies.

### Background
- Dark gradient

### UI Elements
- "GAME OVER" text
- Final score
- Artworks collected count
- Options: Restart or Return to Menu

### Progression
- Restart current level or return to menu

---

## Notes

### Enemy Attack Patterns
- **Melee enemies** (Lazy Student, Demon, Bat, Rat): Attack when within close range
- **Ranged enemies** (Corrupt Priest, Clueless Admin, Skeleton, Spectre): Throw projectiles from distance

### Relic System
- **Hair Relic**: Press '1' to activate invulnerability
- **Finger Bone Relic**: Press '2' to activate AOE damage

### Combat System
- Player throws paintings as projectiles (SPACE key)
- Enemies throw paintings back
- Hit effects: White flash + particle burst
- Sound effects on hit

### Progression System
- Each level must be completed to unlock the next
- Score accumulates across levels
- Artworks collected are tracked

---

## Future Additions

### Cut-Scenes
All cut-scenes are currently placeholders. Future implementation will include:
- Story narrative
- Character dialogue
- Plot development
- Thematic connections to Saint Elizabeth Ann Seton's life and Seton Hall history

### Additional Features to Consider
- Boss battles
- More enemy variety
- Additional relics
- Power-ups
- Level-specific music tracks
- Animated sprites
- More detailed backgrounds
