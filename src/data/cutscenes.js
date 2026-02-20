/**
 * Cutscene Data Configuration
 * 
 * Contains all cutscene dialogue, character configurations, and transitions
 * for Emily and the Ghost of Elizabeth Ann Seton
 * 
 * Validates Requirements: 2.2, 7.4, 11.1
 */

/**
 * Cutscene 1: The Ghostly Summons (Opening)
 * Location: Parking Lot (Emily arriving for work)
 * Characters: Emily, Ghost of Saint Elizabeth Ann Seton
 * Transition: Campus map showing Parking Lot location → Level 1
 */
export const cutscene1 = {
  id: 'opening',
  cutsceneNumber: 1,
  background: 'parking_lot_background',
  nextScene: 'CampusMapScene',
  nextLevel: 1,
  dialogue: [
    {
      speaker: 'emily',
      text: '*walking toward campus, coffee in hand* Just another day at the gallery. Maybe I\'ll finally get those new acquisitions catalogued...'
    },
    {
      speaker: 'ghost',
      text: '*appearing suddenly in front of Emily* Emily, I need your help. The university grounds are in peril.'
    },
    {
      speaker: 'emily',
      text: '*startled, dropping her coffee* A ghost? This is... unexpected. Who are you?'
    },
    {
      speaker: 'ghost',
      text: 'I am Elizabeth Ann Seton, the woman for whom this university was named. I died in 1821, but my spirit remains bound to the institutions I helped create.'
    },
    {
      speaker: 'emily',
      text: 'Saint Elizabeth Ann Seton? The first American-born saint? I... this is incredible!'
    },
    {
      speaker: 'ghost',
      text: 'Yes, yes, canonized September 14, 1975. But we don\'t have time for pleasantries. Have you SEEN the state of this campus?'
    },
    {
      speaker: 'emily',
      text: 'What do you mean?'
    },
    {
      speaker: 'ghost',
      text: '*gesturing dramatically* These halls are filled with corruption! Predatory priests lurking in shadows, students too lazy to pursue knowledge, administrators who care more about paperwork than people! And don\'t even get me STARTED on these portraits!'
    },
    {
      speaker: 'emily',
      text: 'The... portraits?'
    },
    {
      speaker: 'ghost',
      text: '*pointing at a painting on the wall* Look at this! LOOK AT IT! This is supposed to be a portrait of a priest, but the proportions are all wrong, the brushwork is amateurish, and the expression makes him look like he\'s plotting something nefarious—which, granted, he probably is, but that\'s beside the point! The artistic quality is ABYSMAL!'
    },
    {
      speaker: 'emily',
      text: '*suppressing a smile* You\'re... complaining about the art quality?'
    },
    {
      speaker: 'ghost',
      text: 'I founded the Catholic school system in America! I dedicated my life to education, to excellence, to lifting people up through knowledge and beauty! And THIS is what they\'ve done with my legacy? Terrible art everywhere, corruption in the halls, and my sacred Grotto... *trails off, looking troubled*'
    },
    {
      speaker: 'emily',
      text: 'What about the Grotto?'
    },
    {
      speaker: 'ghost',
      text: 'We\'ll get to that. First, you must prove yourself worthy. I need you to collect my sacred relics—strands of my hair and a bone from my finger. They hold holy power that will aid you in battle.'
    },
    {
      speaker: 'emily',
      text: 'Battle? I\'m a gallery director, not a warrior!'
    },
    {
      speaker: 'ghost',
      text: 'You\'ll fight with what you know best—art! Throw these terrible portraits at the enemies. At least they\'ll be good for something. The relics will grant you powers: my hair will make you invulnerable for a time, and my finger bone will unleash a holy spell to smite multiple foes at once.'
    },
    {
      speaker: 'emily',
      text: 'This is insane. But... if you\'re really Saint Elizabeth Ann Seton, and you need my help... I\'ll do it.'
    },
    {
      speaker: 'ghost',
      text: 'Good! Start in the parking lot. Yes, even there the corruption has spread. Lazy students and confused administrators wander about. Clear them out, collect what relics you find, and work your way through the campus. I\'ll guide you along the way.'
    },
    {
      speaker: 'emily',
      text: 'And then?'
    },
    {
      speaker: 'ghost',
      text: 'Then we deal with the Administration Building. And after that... *her expression darkens* ...we travel to Emmitsburg, to my Grotto. Something terrible has happened there. But first, prove yourself here.',
      historicalNote: 'Saint Elizabeth Ann Seton (1774-1821) was born into an Episcopalian family in New York City. After her husband\'s death, she converted to Catholicism in 1805. She founded the Sisters of Charity in 1809 and established the first free Catholic school for girls in America in 1810, becoming the founder of the Catholic parochial school system.'
    }
  ]
};

/**
 * All cutscenes indexed by ID
 */
export const cutscenes = {
  'opening': cutscene1,
  'cutscene1': cutscene1
};

/**
 * Get cutscene data by ID
 * @param {string} cutsceneId - ID of the cutscene
 * @returns {Object|null} Cutscene data or null if not found
 */
export function getCutscene(cutsceneId) {
  return cutscenes[cutsceneId] || null;
}
