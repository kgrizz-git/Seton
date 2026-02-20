/**
 * Unit tests for CutsceneScene
 * 
 * Tests core functionality:
 * - Initialization and configuration
 * - Speaker name display
 * - Character sprite key mapping
 * - Portrait key mapping
 * - Dialogue advancement logic
 * - Scene transition logic
 * 
 * Note: Full Phaser scene tests require canvas support.
 * These tests focus on the logic methods that can be tested in isolation.
 */

import CutsceneScene from './CutsceneScene.js';

describe('CutsceneScene', () => {
  let scene;

  beforeEach(() => {
    scene = new CutsceneScene();
    
    // Mock scene methods that would be provided by Phaser
    const mockFn = () => {
      const calls = [];
      const fn = (...args) => {
        calls.push(args);
      };
      fn.mock = { calls };
      return fn;
    };
    
    scene.scene = {
      start: mockFn()
    };
    scene.cameras = {
      main: {
        fadeOut: mockFn(),
        once: mockFn()
      }
    };
  });

  describe('Initialization', () => {
    test('should initialize with default values', () => {
      scene.init({});
      
      expect(scene.cutsceneId).toBe('opening');
      expect(scene.dialogue).toEqual([]);
      expect(scene.backgroundKey).toBe('cutscene_background');
      expect(scene.nextScene).toBe('GameplayScene');
      expect(scene.nextLevel).toBe(1);
      expect(scene.currentDialogueIndex).toBe(0);
      expect(scene.canAdvance).toBe(true);
      expect(scene.skipRequested).toBe(false);
    });

    test('should initialize with provided data', () => {
      const testData = {
        cutsceneId: 'test_cutscene',
        dialogue: [{ speaker: 'emily', text: 'Test dialogue' }],
        background: 'test_bg',
        nextScene: 'TestScene',
        nextLevel: 2
      };

      scene.init(testData);

      expect(scene.cutsceneId).toBe('test_cutscene');
      expect(scene.dialogue).toEqual(testData.dialogue);
      expect(scene.backgroundKey).toBe('test_bg');
      expect(scene.nextScene).toBe('TestScene');
      expect(scene.nextLevel).toBe(2);
    });
  });

  describe('Speaker Name Display', () => {
    test('should display correct name for Emily', () => {
      expect(scene.getSpeakerDisplayName('emily')).toBe('Emily');
    });

    test('should display correct name for ghost', () => {
      expect(scene.getSpeakerDisplayName('ghost')).toBe('Saint Elizabeth Ann Seton');
    });

    test('should display correct name for narrator', () => {
      expect(scene.getSpeakerDisplayName('narrator')).toBe('Narrator');
    });

    test('should return original speaker name if not mapped', () => {
      expect(scene.getSpeakerDisplayName('unknown')).toBe('unknown');
    });
  });

  describe('Character Sprite Key Mapping', () => {
    test('should get correct sprite key for Emily', () => {
      scene.init({ cutsceneNumber: 1 });
      const spriteKey = scene.getCharacterSpriteKey('emily', 'left');
      expect(spriteKey).toBe('emily-right');
    });

    test('should get correct sprite key for ghost in cutscenes 1-3', () => {
      scene.init({ cutsceneNumber: 1 });
      expect(scene.getCharacterSpriteKey('ghost', 'right')).toBe('round-ghost-sprite_0-left');
      
      scene.init({ cutsceneNumber: 2 });
      expect(scene.getCharacterSpriteKey('ghost', 'right')).toBe('round-ghost-sprite_0-left');
      
      scene.init({ cutsceneNumber: 3 });
      expect(scene.getCharacterSpriteKey('ghost', 'right')).toBe('round-ghost-sprite_0-left');
    });

    test('should get animated angel sprite for ghost in cutscenes 4-5', () => {
      scene.init({ cutsceneNumber: 4 });
      expect(scene.getCharacterSpriteKey('ghost', 'right')).toBe('angel-flipped');
      
      scene.init({ cutsceneNumber: 5 });
      expect(scene.getCharacterSpriteKey('ghost', 'right')).toBe('angel-flipped');
    });

    test('should get triumphant sprite for ghost in cutscene 6', () => {
      scene.init({ cutsceneNumber: 6 });
      expect(scene.getCharacterSpriteKey('ghost', 'right')).toBe('anne-seton-triumphant');
    });

    test('should return character name for unmapped characters', () => {
      scene.init({ cutsceneNumber: 1 });
      const spriteKey = scene.getCharacterSpriteKey('unknown', 'left');
      expect(spriteKey).toBe('unknown');
    });
  });

  describe('Portrait Key Mapping', () => {
    test('should get correct portrait key for Emily', () => {
      const portraitKey = scene.getPortraitKey('emily');
      expect(portraitKey).toBe('emily-headshot-for-cutscenes+dialog');
    });

    test('should return character name for unmapped portraits', () => {
      const portraitKey = scene.getPortraitKey('unknown');
      expect(portraitKey).toBe('unknown');
    });
  });

  describe('Sprite Scale Configuration', () => {
    test('should return correct scale for Emily sprite', () => {
      const scale = scene.getSpriteScale('emily-right');
      expect(scale).toBe(2.5);
    });

    test('should return correct scale for ghost sprite', () => {
      const scale = scene.getSpriteScale('round-ghost-sprite_0-left');
      expect(scale).toBe(2.0);
    });

    test('should return correct scale for angel sprite', () => {
      const scale = scene.getSpriteScale('angel-flipped');
      expect(scale).toBe(2.5);
    });

    test('should return correct scale for triumphant sprite', () => {
      const scale = scene.getSpriteScale('anne-seton-triumphant');
      expect(scale).toBe(3.0);
    });

    test('should return default scale for unknown sprites', () => {
      const scale = scene.getSpriteScale('unknown-sprite');
      expect(scale).toBe(2.0);
    });
  });

  describe('Dialogue Advancement Logic', () => {
    test('should advance to next dialogue when canAdvance is true', () => {
      const dialogue = [
        { speaker: 'emily', text: 'First line' },
        { speaker: 'ghost', text: 'Second line' }
      ];

      scene.init({ dialogue });
      scene.canAdvance = true;
      scene.currentDialogueIndex = 0;
      
      // Mock displayDialogue to track calls
      const calls = [];
      scene.displayDialogue = (...args) => {
        calls.push(args);
      };
      
      scene.advanceDialogue();
      
      expect(calls.length).toBe(1);
      expect(calls[0][0]).toBe(1);
    });

    test('should not advance when canAdvance is false', () => {
      const dialogue = [
        { speaker: 'emily', text: 'First line' },
        { speaker: 'ghost', text: 'Second line' }
      ];

      scene.init({ dialogue });
      scene.canAdvance = false;
      scene.currentDialogueIndex = 0;
      
      // Mock displayDialogue to track calls
      const calls = [];
      scene.displayDialogue = (...args) => {
        calls.push(args);
      };
      
      scene.advanceDialogue();
      
      expect(calls.length).toBe(0);
    });

    test('should end cutscene when advancing past last dialogue', () => {
      const dialogue = [
        { speaker: 'emily', text: 'Only line' }
      ];

      scene.init({ dialogue });
      scene.canAdvance = true;
      scene.currentDialogueIndex = 0;
      
      // Mock endCutscene to track calls
      const calls = [];
      scene.endCutscene = (...args) => {
        calls.push(args);
      };
      
      scene.advanceDialogue();
      
      expect(calls.length).toBe(1);
    });
  });

  describe('Scene Transition Logic', () => {
    test('should transition to GameplayScene with level number', () => {
      scene.init({ nextScene: 'GameplayScene', nextLevel: 2 });
      
      scene.transitionToNextScene();
      
      expect(scene.scene.start.mock.calls.length).toBe(1);
      expect(scene.scene.start.mock.calls[0]).toEqual(['GameplayScene', { level: 2 }]);
    });

    test('should transition to CampusMapScene with level number', () => {
      scene.init({ nextScene: 'CampusMapScene', nextLevel: 3 });
      
      scene.transitionToNextScene();
      
      expect(scene.scene.start.mock.calls.length).toBe(1);
      expect(scene.scene.start.mock.calls[0]).toEqual(['CampusMapScene', { level: 3 }]);
    });

    test('should transition to specified scene without level data', () => {
      scene.init({ nextScene: 'VictoryScene' });
      
      scene.transitionToNextScene();
      
      expect(scene.scene.start.mock.calls.length).toBe(1);
      expect(scene.scene.start.mock.calls[0]).toEqual(['VictoryScene']);
    });
  });

  describe('Skip Cutscene Logic', () => {
    test('should set skipRequested flag when skipping', () => {
      scene.init({});
      scene.skipRequested = false;
      
      scene.skipCutscene();
      
      expect(scene.skipRequested).toBe(true);
    });

    test('should fade out camera when skipping', () => {
      scene.init({});
      
      scene.skipCutscene();
      
      expect(scene.cameras.main.fadeOut.mock.calls.length).toBe(1);
      expect(scene.cameras.main.fadeOut.mock.calls[0]).toEqual([500, 0, 0, 0]);
    });

    test('should not skip twice', () => {
      scene.init({});
      
      scene.skipCutscene();
      const firstCallCount = scene.cameras.main.fadeOut.mock.calls.length;
      
      scene.skipCutscene();
      const secondCallCount = scene.cameras.main.fadeOut.mock.calls.length;
      
      expect(secondCallCount).toBe(firstCallCount);
    });
  });

  describe('End Cutscene Logic', () => {
    test('should fade out camera when ending cutscene', () => {
      scene.init({});
      
      scene.endCutscene();
      
      expect(scene.cameras.main.fadeOut.mock.calls.length).toBe(1);
      expect(scene.cameras.main.fadeOut.mock.calls[0]).toEqual([1000, 0, 0, 0]);
    });
  });
});
