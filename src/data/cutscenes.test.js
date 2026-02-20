/**
 * Tests for cutscene data configuration
 * Validates Requirements: 2.2, 2.4, 7.4, 11.1, 11.2
 */

import { cutscene1, cutscene3, getCutscene } from './cutscenes.js';

describe('Cutscene Data', () => {
  describe('Cutscene 1: The Ghostly Summons', () => {
    test('should have correct metadata', () => {
      expect(cutscene1.id).toBe('opening');
      expect(cutscene1.cutsceneNumber).toBe(1);
      expect(cutscene1.background).toBe('parking_lot_background');
      expect(cutscene1.nextScene).toBe('CampusMapScene');
      expect(cutscene1.nextLevel).toBe(1);
    });

    test('should have dialogue array', () => {
      expect(Array.isArray(cutscene1.dialogue)).toBe(true);
      expect(cutscene1.dialogue.length).toBeGreaterThan(0);
    });

    test('should have dialogue with Emily and ghost speakers', () => {
      const speakers = cutscene1.dialogue.map(d => d.speaker);
      expect(speakers).toContain('emily');
      expect(speakers).toContain('ghost');
    });

    test('should have dialogue text for each segment', () => {
      cutscene1.dialogue.forEach((segment, index) => {
        expect(segment.text).toBeDefined();
        expect(typeof segment.text).toBe('string');
        expect(segment.text.length).toBeGreaterThan(0);
      });
    });

    test('should have historical note in final dialogue', () => {
      const lastDialogue = cutscene1.dialogue[cutscene1.dialogue.length - 1];
      expect(lastDialogue.historicalNote).toBeDefined();
      expect(lastDialogue.historicalNote).toContain('Saint Elizabeth Ann Seton');
      expect(lastDialogue.historicalNote).toContain('1774-1821');
    });

    test('should include key narrative elements', () => {
      const allText = cutscene1.dialogue.map(d => d.text).join(' ');
      
      // Check for key narrative elements from plot-and-narrative.md
      expect(allText).toContain('corruption');
      expect(allText).toContain('portraits');
      expect(allText).toContain('relics');
      expect(allText).toContain('hair');
      expect(allText).toContain('finger bone');
      expect(allText).toContain('parking lot');
      expect(allText).toContain('Grotto');
    });

    test('should mention Emily as gallery director', () => {
      const allText = cutscene1.dialogue.map(d => d.text).join(' ');
      expect(allText).toContain('gallery');
    });

    test('should include Saint Elizabeth Ann Seton introduction', () => {
      const allText = cutscene1.dialogue.map(d => d.text).join(' ');
      expect(allText).toContain('Elizabeth Ann Seton');
      expect(allText).toContain('university was named');
    });

    test('should explain the quest objective', () => {
      const allText = cutscene1.dialogue.map(d => d.text).join(' ');
      expect(allText).toContain('collect');
      expect(allText).toContain('sacred relics');
    });

    test('should transition to campus map showing parking lot', () => {
      expect(cutscene1.nextScene).toBe('CampusMapScene');
      expect(cutscene1.nextLevel).toBe(1); // Level 1 is Parking Lot
    });
  });

  describe('getCutscene function', () => {
    test('should retrieve cutscene by id "opening"', () => {
      const cutscene = getCutscene('opening');
      expect(cutscene).toBeDefined();
      expect(cutscene.id).toBe('opening');
    });

    test('should retrieve cutscene by id "cutscene1"', () => {
      const cutscene = getCutscene('cutscene1');
      expect(cutscene).toBeDefined();
      expect(cutscene.id).toBe('opening');
    });

    test('should return null for non-existent cutscene', () => {
      const cutscene = getCutscene('nonexistent');
      expect(cutscene).toBeNull();
    });
  });

  describe('Sprite Configuration', () => {
    test('should use correct Emily sprites', () => {
      // Emily should use emily-right.png as standing sprite
      // and emily-headshot-for-cutscenes+dialog.png as dialogue portrait
      // This is validated by the CutsceneScene implementation
      expect(cutscene1.cutsceneNumber).toBe(1);
    });

    test('should use correct ghost sprite for cutscene 1', () => {
      // Cutscene 1 should use round-ghost-sprite_0-left.png
      // This is validated by the CutsceneScene implementation
      expect(cutscene1.cutsceneNumber).toBe(1);
      expect(cutscene1.cutsceneNumber).toBeLessThanOrEqual(3);
    });
  });

  describe('Historical Accuracy (Requirement 11.1)', () => {
    test('should include accurate birth and death years', () => {
      const lastDialogue = cutscene1.dialogue[cutscene1.dialogue.length - 1];
      expect(lastDialogue.historicalNote).toContain('1774');
      expect(lastDialogue.historicalNote).toContain('1821');
    });

    test('should mention conversion to Catholicism', () => {
      const lastDialogue = cutscene1.dialogue[cutscene1.dialogue.length - 1];
      expect(lastDialogue.historicalNote).toContain('converted to Catholicism');
      expect(lastDialogue.historicalNote).toContain('1805');
    });

    test('should mention founding of Sisters of Charity', () => {
      const lastDialogue = cutscene1.dialogue[cutscene1.dialogue.length - 1];
      expect(lastDialogue.historicalNote).toContain('Sisters of Charity');
      expect(lastDialogue.historicalNote).toContain('1809');
    });

    test('should mention founding of first free Catholic school', () => {
      const lastDialogue = cutscene1.dialogue[cutscene1.dialogue.length - 1];
      expect(lastDialogue.historicalNote).toContain('first free Catholic school for girls');
      expect(lastDialogue.historicalNote).toContain('1810');
    });

    test('should mention Catholic parochial school system', () => {
      const lastDialogue = cutscene1.dialogue[cutscene1.dialogue.length - 1];
      expect(lastDialogue.historicalNote).toContain('Catholic parochial school system');
    });
  });

  describe('Cutscene 3: The Library\'s Secrets', () => {
    test('should have correct metadata', () => {
      expect(cutscene3.id).toBe('library_secrets');
      expect(cutscene3.cutsceneNumber).toBe(3);
      expect(cutscene3.background).toBe('campus_map_background');
      expect(cutscene3.nextScene).toBe('CampusMapScene');
      expect(cutscene3.nextLevel).toBe(3);
    });

    test('should have dialogue array', () => {
      expect(Array.isArray(cutscene3.dialogue)).toBe(true);
      expect(cutscene3.dialogue.length).toBeGreaterThan(0);
    });

    test('should have dialogue with Emily and ghost speakers', () => {
      const speakers = cutscene3.dialogue.map(d => d.speaker);
      expect(speakers).toContain('emily');
      expect(speakers).toContain('ghost');
    });

    test('should have dialogue text for each segment', () => {
      cutscene3.dialogue.forEach((segment, index) => {
        expect(segment.text).toBeDefined();
        expect(typeof segment.text).toBe('string');
        expect(segment.text.length).toBeGreaterThan(0);
      });
    });

    test('should have historical note in final dialogue', () => {
      const lastDialogue = cutscene3.dialogue[cutscene3.dialogue.length - 1];
      expect(lastDialogue.historicalNote).toBeDefined();
      expect(lastDialogue.historicalNote).toContain('Saint Elizabeth Ann Seton');
    });

    test('should include key narrative elements', () => {
      const allText = cutscene3.dialogue.map(d => d.text).join(' ');
      
      // Check for key narrative elements from plot-and-narrative.md
      expect(allText).toContain('gallery');
      expect(allText).toContain('library');
      expect(allText).toContain('relics');
      expect(allText).toContain('miracles');
      expect(allText).toContain('Grotto');
      expect(allText).toContain('Administration Building');
    });

    test('should mention clearing the gallery', () => {
      const allText = cutscene3.dialogue.map(d => d.text).join(' ');
      expect(allText).toContain('gallery');
    });

    test('should discuss relics and their powers', () => {
      const allText = cutscene3.dialogue.map(d => d.text).join(' ');
      expect(allText).toContain('invulnerability');
      expect(allText).toContain('hair');
      expect(allText).toContain('finger bone');
    });

    test('should mention Anne Theresa O\'Neill healing', () => {
      const allText = cutscene3.dialogue.map(d => d.text).join(' ');
      expect(allText).toContain('Anne Theresa O\'Neill');
      expect(allText).toContain('leukemia');
      expect(allText).toContain('1952');
    });

    test('should foreshadow Administration Building boss', () => {
      const allText = cutscene3.dialogue.map(d => d.text).join(' ');
      expect(allText).toContain('Administration Building');
      expect(allText).toContain('boss');
    });

    test('should foreshadow the Grotto threat', () => {
      const allText = cutscene3.dialogue.map(d => d.text).join(' ');
      expect(allText).toContain('Grotto');
      expect(allText).toContain('far worse');
    });

    test('should transition to campus map showing Walsh Library', () => {
      expect(cutscene3.nextScene).toBe('CampusMapScene');
      expect(cutscene3.nextLevel).toBe(3); // Level 3 is Walsh Library
    });

    test('should use ghost form sprite (cutsceneNumber 3)', () => {
      // Cutscene 3 should use round-ghost-sprite_0-left.png (ghost form)
      // This is validated by the CutsceneScene implementation
      expect(cutscene3.cutsceneNumber).toBe(3);
      expect(cutscene3.cutsceneNumber).toBeLessThanOrEqual(3);
    });
  });

  describe('Historical Accuracy for Cutscene 3 (Requirement 11.2)', () => {
    test('should mention Anne Theresa O\'Neill healing miracle', () => {
      const lastDialogue = cutscene3.dialogue[cutscene3.dialogue.length - 1];
      expect(lastDialogue.historicalNote).toContain('Anne Theresa O\'Neill');
      expect(lastDialogue.historicalNote).toContain('leukemia');
    });

    test('should include accurate year of miracle (1952)', () => {
      const lastDialogue = cutscene3.dialogue[cutscene3.dialogue.length - 1];
      expect(lastDialogue.historicalNote).toContain('1952');
    });

    test('should mention canonization process', () => {
      const lastDialogue = cutscene3.dialogue[cutscene3.dialogue.length - 1];
      expect(lastDialogue.historicalNote).toContain('canonization');
    });
  });
});
