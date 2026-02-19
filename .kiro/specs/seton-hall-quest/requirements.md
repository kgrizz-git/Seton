# Requirements Document

## Introduction

Emily and the Ghost of Elizabeth Ann Seton is a web-based casual action-adventure game where players control Emily, the gallery director of Seton Hall University, on a quest given by the ghost of Saint Elizabeth Ann Seton. The game features four levels set on university grounds (Parking Lot, Walsh Gallery, Walsh Library, and Administration Building), combat against various enemies using thrown low-quality artworks, collectible relics with special powers, boss battles, narrative cut-scenes, and an art collection mechanic. The first three levels are designed for short gameplay sessions (30 seconds to 1 minute each), with the fourth level being longer and more challenging, and a final fifth level at the National Shrine Grotto of Our Lady of Lourdes in Emmitsburg, Maryland (the site dedicated to Saint Elizabeth Ann Seton) featuring a cave-like environment filled with demons. The game incorporates historical facts about Seton Hall University (founded 1856 in South Orange, New Jersey) and Saint Elizabeth Ann Seton's life (first American-born saint, canonized 1975).

## Glossary

- **Game_Engine**: The core system managing game state, rendering, and user interactions
- **Player_Character**: Emily, the gallery director controlled by the player
- **Combat_System**: The subsystem handling combat mechanics, damage, and enemy AI
- **Relic**: A collectible item (hair or finger bone of Saint Elizabeth Ann Seton) that grants temporary special powers
- **Cut_Scene**: A non-interactive narrative sequence featuring Emily and the ghost of Saint Elizabeth Ann Seton
- **Art_Collection**: The set of artworks discovered and collected by the player for points
- **Save_System**: The subsystem managing game state persistence and restoration
- **Level**: A distinct game area (Art Gallery or Library) with unique layout and challenges
- **Boss**: A powerful enemy encountered at key points requiring special strategy to defeat
- **Enemy**: An opponent in combat (corrupt priest, lazy student, or clueless administrator)
- **Invulnerability_Power**: A temporary state where the Player_Character cannot take damage
- **AOE_Spell**: An area-of-effect attack that damages multiple enemies simultaneously
- **Historical_Content**: Factual information about Seton Hall University and Saint Elizabeth Ann Seton integrated into the game

## Requirements

### Requirement 1: Player Character Control

**User Story:** As a player, I want to control Emily's movement and throw low-quality artworks as attacks, so that I can navigate the game world and engage in combat.

#### Acceptance Criteria

1. WHEN the player presses movement keys, THE Game_Engine SHALL move the Player_Character in the corresponding direction
2. WHEN the player presses the attack key, THE Combat_System SHALL throw a low-quality artwork projectile in the direction Emily is facing
3. WHEN the player presses the interact key near an interactable object, THE Game_Engine SHALL trigger the interaction
4. THE Game_Engine SHALL render the Player_Character position at 60 frames per second
5. THE Combat_System SHALL display artwork projectiles with appropriate visual assets (cheap paintings, bad portraits)

### Requirement 2: Game Initialization

**User Story:** As a player, I want the game to start with a colorful retro title screen and introductory cut-scene, so that I understand the quest premise and feel engaged from the start.

#### Acceptance Criteria

1. WHEN the game starts, THE Game_Engine SHALL display a colorful retro-styled title screen showing the game name "Emily and the Ghost of Elizabeth Ann Seton"
2. THE title screen SHALL play simple background music appropriate for a retro game
3. THE title screen SHALL display a "Press SPACE to Start" prompt
4. WHEN the player presses SPACE on the title screen, THE Game_Engine SHALL transition to the opening Cut_Scene showing the ghost of Saint Elizabeth Ann Seton giving Emily the quest
5. THE Cut_Scene SHALL include Saint Elizabeth Ann Seton complaining about low-quality portraits of priests on university grounds and asking for Emily's help
6. WHEN the opening Cut_Scene completes, THE Game_Engine SHALL transition the player to Level 1 (Parking Lot)
7. THE Cut_Scene SHALL include Historical_Content about Saint Elizabeth Ann Seton (born 1774, died 1821, canonized September 14, 1975, first American-born saint, founded Sisters of Charity, performed miracles including curing Anne Theresa O'Neill of leukemia)

### Requirement 3: Level Progression

**User Story:** As a player, I want to progress through five distinct levels, so that I experience varied gameplay environments with increasing challenge.

#### Acceptance Criteria

1. THE Game_Engine SHALL provide exactly five playable Levels: Parking Lot, Walsh Gallery, Walsh Library, Administration Building, and The Grotto
2. WHEN the player completes Level 1 objectives, THE Game_Engine SHALL unlock Level 2
3. WHEN the player completes Level 2 objectives, THE Game_Engine SHALL unlock Level 3
4. WHEN the player completes Level 3 objectives, THE Game_Engine SHALL unlock Level 4
5. WHEN the player completes Level 4 objectives, THE Game_Engine SHALL unlock Level 5
6. WHEN the player enters a new Level, THE Game_Engine SHALL load the Level layout and spawn appropriate Enemies
7. THE Game_Engine SHALL design Levels 1, 2, and 3 for short gameplay duration (30 seconds to 1 minute each)
8. THE Game_Engine SHALL design Level 4 as a longer, more challenging level
9. THE Game_Engine SHALL design Level 5 (The Grotto) as a cave-like environment at the National Shrine Grotto of Our Lady of Lourdes in Emmitsburg, Maryland, filled with demon enemies
10. THE Game_Engine SHALL incorporate Historical_Content about Seton Hall University and the National Shrine Grotto dedicated to Saint Elizabeth Ann Seton into each Level design

### Requirement 4: Combat Mechanics

**User Story:** As a player, I want to engage in combat with enemies using thrown artworks, so that I can overcome obstacles and progress through the game.

#### Acceptance Criteria

1. WHEN the Player_Character throws an artwork projectile at an Enemy, THE Combat_System SHALL calculate and apply damage to the Enemy upon collision
2. WHEN an Enemy throws an artwork projectile at the Player_Character, THE Combat_System SHALL calculate and apply damage to the Player_Character upon collision
3. WHEN an Enemy health reaches zero, THE Combat_System SHALL remove the Enemy from the Level
4. THE Combat_System SHALL implement easy difficulty with forgiving damage values and simple enemy attack patterns
5. THE Combat_System SHALL support three Enemy types: corrupt priest, lazy student, and clueless administrator
6. THE Combat_System SHALL display satirical dialogue from corrupt priest enemies that makes their predatory nature clear through their speech patterns and comments
7. THE Combat_System SHALL allow some Enemy types (corrupt priests and clueless administrators) to attack by throwing low-quality artwork projectiles at the Player_Character

### Requirement 5: Relic Collection and Powers

**User Story:** As a player, I want to collect relics that grant special powers, so that I can gain tactical advantages in combat.

#### Acceptance Criteria

1. WHEN the Player_Character collects a Relic, THE Game_Engine SHALL add the Relic to the player's inventory
2. WHEN the player activates an Invulnerability_Power Relic, THE Combat_System SHALL prevent damage to the Player_Character for 10 seconds
3. WHEN the player activates an AOE_Spell Relic, THE Combat_System SHALL deal damage to all Enemies within 5 meters of the Player_Character
4. WHEN a Relic power duration expires, THE Combat_System SHALL restore normal gameplay mechanics
5. THE Game_Engine SHALL provide two Relic types: hair of Saint Elizabeth Ann Seton and finger bone of Saint Elizabeth Ann Seton

### Requirement 6: Boss Encounters

**User Story:** As a player, I want to face challenging boss battles at key points, so that I experience climactic gameplay moments.

#### Acceptance Criteria

1. WHEN the player reaches a boss encounter point, THE Game_Engine SHALL spawn the Boss and initiate combat
2. WHEN the Boss health reaches zero, THE Combat_System SHALL trigger the boss defeat sequence
3. THE Combat_System SHALL give Boss enemies higher health and more complex attack patterns than regular Enemies
4. WHEN a Boss is defeated, THE Game_Engine SHALL unlock progression to the next game section

### Requirement 7: Narrative Cut-Scenes

**User Story:** As a player, I want to experience narrative cut-scenes throughout the game, so that I remain engaged with the story.

#### Acceptance Criteria

1. WHEN a story trigger point is reached, THE Game_Engine SHALL pause gameplay and display the appropriate Cut_Scene
2. THE Cut_Scene SHALL feature dialogue between Emily and the ghost of Saint Elizabeth Ann Seton
3. THE Cut_Scene SHALL include Saint Elizabeth Ann Seton giving Emily missions and guidance throughout the game
4. THE Cut_Scene SHALL include Saint Elizabeth Ann Seton complaining about low-quality portraits of priests on university grounds
5. WHEN the player presses the continue key during a Cut_Scene, THE Game_Engine SHALL advance to the next dialogue segment
6. WHEN a Cut_Scene completes, THE Game_Engine SHALL resume gameplay
7. THE Cut_Scene SHALL incorporate Historical_Content about Saint Elizabeth Ann Seton's life (converted to Catholicism 1805, founded Sisters of Charity, established first free Catholic school for girls 1810, performed miracles including healing of leukemia patient Anne Theresa O'Neill in 1952)

### Requirement 8: Art Collection Mechanic

**User Story:** As a player, I want to discover and collect artworks for points, so that I have an additional gameplay objective beyond combat.

#### Acceptance Criteria

1. WHEN the Player_Character discovers an artwork, THE Game_Engine SHALL add the artwork to the Art_Collection
2. WHEN an artwork is added to the Art_Collection, THE Game_Engine SHALL award points to the player
3. THE Game_Engine SHALL display the current Art_Collection and total points in the user interface
4. THE Game_Engine SHALL place artworks throughout both Levels for discovery

### Requirement 9: Save and Load Functionality

**User Story:** As a player, I want to save my progress and load it later, so that I can continue my game across multiple sessions.

#### Acceptance Criteria

1. WHEN the player selects the save option, THE Save_System SHALL serialize the current game state to browser local storage
2. WHEN the player selects the load option, THE Save_System SHALL deserialize the game state from browser local storage and restore it
3. THE Save_System SHALL persist Player_Character position, health, inventory, Art_Collection, and Level progress
4. WHEN no saved game exists and the player selects load, THE Game_Engine SHALL display an error message

### Requirement 10: Web-Based Deployment

**User Story:** As a player, I want to play the game in my web browser, so that I can access it without installing software.

#### Acceptance Criteria

1. THE Game_Engine SHALL run in modern web browsers supporting HTML5, CSS3, and JavaScript ES6
2. THE Game_Engine SHALL render all graphics using HTML5 Canvas or WebGL
3. THE Game_Engine SHALL load all game assets (images, audio, data) via HTTP requests
4. THE Game_Engine SHALL support keyboard input for all game controls

### Requirement 11: Historical Accuracy

**User Story:** As a player, I want the game to include accurate historical information, so that I learn about Seton Hall University and Saint Elizabeth Ann Seton.

#### Acceptance Criteria

1. THE Game_Engine SHALL incorporate verified Historical_Content about Seton Hall University's grounds and history
2. THE Game_Engine SHALL incorporate verified Historical_Content about Saint Elizabeth Ann Seton's life and legacy
3. THE Game_Engine SHALL display Historical_Content in Cut_Scenes, Level descriptions, and collectible item descriptions
4. THE Historical_Content SHALL be researched from credible sources about Seton Hall University and Saint Elizabeth Ann Seton

### Requirement 12: User Interface

**User Story:** As a player, I want a clear user interface showing my status and progress, so that I can make informed gameplay decisions.

#### Acceptance Criteria

1. THE Game_Engine SHALL display the Player_Character health value in the user interface
2. THE Game_Engine SHALL display the current Relic inventory in the user interface
3. THE Game_Engine SHALL display the Art_Collection count and total points in the user interface
4. THE Game_Engine SHALL display the current Level name in the user interface
5. WHEN the Player_Character health reaches zero, THE Game_Engine SHALL display a game over screen with restart option

### Requirement 13: Visual Presentation

**User Story:** As a player, I want a visually dynamic and colorful game experience, so that the game is engaging and enjoyable to look at.

#### Acceptance Criteria

1. THE Game_Engine SHALL render graphics using a colorful art style with vibrant colors
2. THE Game_Engine SHALL implement smooth animations for Player_Character movement, attacks, and interactions
3. THE Game_Engine SHALL implement visual effects for combat actions, relic powers, and enemy defeats
4. THE Game_Engine SHALL use distinct visual designs for each Enemy type and Boss
5. THE Game_Engine SHALL render Level environments with detailed backgrounds and atmospheric elements

### Requirement 14: Audio System

**User Story:** As a player, I want music and sound effects during gameplay, so that the game feels more immersive and responsive.

#### Acceptance Criteria

1. THE Game_Engine SHALL play background music appropriate to the current game state (menu, Level 1, Level 2, Level 3, Level 4, boss battle)
2. THE Game_Engine SHALL play sound effects for Player_Character actions (attack, taking damage, collecting items)
3. THE Game_Engine SHALL play sound effects for Enemy actions and defeats
4. THE Game_Engine SHALL play sound effects for relic power activation
5. THE Game_Engine SHALL provide simple music tracks and sound effects suitable for casual gameplay
6. THE Game_Engine SHALL allow players to adjust or mute audio volume

### Requirement 15: Campus Map Display

**User Story:** As a player, I want to see a simplified map of Seton Hall University campus before each level, so that I understand where the level takes place on the real university grounds.

#### Acceptance Criteria

1. WHEN a new Level is about to start, THE Game_Engine SHALL display a simplified campus map screen showing the layout of Seton Hall University
2. THE campus map SHALL highlight the current level location with a visual indicator (glow, marker, or outline)
3. THE campus map SHALL display the name of the level location (Parking Lot, Walsh Gallery, Walsh Library, or Administration Building)
4. THE campus map SHALL be based on the actual layout of Seton Hall University's 58-acre South Orange campus
5. THE campus map SHALL show key landmarks including Walsh Library with its iconic domed Rotunda, Immaculate Conception Chapel, Boland Hall, and the Green
6. WHEN the player presses a continue key on the campus map screen, THE Game_Engine SHALL transition to the level gameplay
