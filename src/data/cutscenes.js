/**
 * Cutscene Data Configuration
 * 
 * Contains all cutscene dialogue, character configurations, and transitions
 * for Emily and the Ghost of Elizabeth Ann Seton
 * 
 * Character Positioning:
 * - Emily: LEFT side, facing RIGHT (emily-right.png)
 * - Saint Elizabeth Ann Seton: RIGHT side, facing LEFT (round-ghost-sprite_0-left.png, angel-flipped.gif, anne-seton-triumphant.gif)
 * 
 * Validates Requirements: 2.2, 7.4, 11.1
 */

/**
 * Cutscene 1: The Ghostly Summons (Opening)
 * Location: Parking Lot (Emily arriving for work)
 * Characters: Emily (LEFT, facing RIGHT), Ghost of Saint Elizabeth Ann Seton (RIGHT, facing LEFT)
 * Transition: Campus map showing Parking Lot location → Level 1
 */
export const cutscene1 = {
  id: 'opening',
  cutsceneNumber: 1,
  background: 'bg_parking_lot',
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
 * Cutscene 2: The Gallery Complaint (Before Level 2)
 * Location: Transition between Parking Lot and Walsh Gallery
 * Characters: Emily, Ghost of Saint Elizabeth Ann Seton
 * Transition: Campus map showing Walsh Gallery location → Level 2
 */
export const cutscene2 = {
  id: 'gallery_complaint',
  cutsceneNumber: 2,
  background: 'bg_gallery',
  nextScene: 'CampusMapScene',
  nextLevel: 2,
  dialogue: [
    {
      speaker: 'ghost',
      text: '*appearing beside Emily* Well done in the parking lot! You\'re getting the hang of this.'
    },
    {
      speaker: 'emily',
      text: 'I just threw bad art at people until they went away. I\'m not sure this is what I signed up for when I became a gallery director.'
    },
    {
      speaker: 'ghost',
      text: '*laughing* Oh, Emily, you have no idea how many problems can be solved by throwing bad art at them! Now, let\'s head to the Walsh Gallery. That\'s your domain, isn\'t it?'
    },
    {
      speaker: 'emily',
      text: 'Yes, it\'s where I work. The gallery is on the first floor of Walsh Library, which opened in 1994. It\'s supposed to enhance the intellectual life of the university through dynamic exhibitions.'
    },
    {
      speaker: 'ghost',
      text: '*sighs* "Supposed to" being the operative words. I\'ve been watching, Emily. I\'ve seen what goes on in those halls. Corrupt priests using their positions of trust to prey on the vulnerable. It makes me sick.'
    },
    {
      speaker: 'emily',
      text: '*quietly* I\'ve heard the rumors too. It\'s... it\'s hard to know what to do.'
    },
    {
      speaker: 'ghost',
      text: 'That\'s why I\'m here. That\'s why YOU\'RE here. We\'re going to clean house, starting with the gallery. There\'s a particularly nasty one lurking in there right now, and more of those AWFUL portraits on the walls. Seriously, who approved these? The composition is terrible, the color palette is muddy, and don\'t even get me started on the anatomy!'
    },
    {
      speaker: 'emily',
      text: '*smiling despite herself* You really are passionate about art quality.'
    },
    {
      speaker: 'ghost',
      text: 'I\'m passionate about EXCELLENCE, Emily! When I founded my schools, I didn\'t settle for mediocrity. I taught my students to strive for greatness in all things. These portraits are an insult to that legacy!'
    },
    {
      speaker: 'emily',
      text: 'I\'ll do my best to... deal with them.'
    },
    {
      speaker: 'ghost',
      text: 'Good. And keep an eye out for more relics. My finger bone should be in the gallery somewhere. You\'ll need its power for what\'s coming.',
      historicalNote: 'Walsh Library opened in 1994 as a 155,000-square-foot facility featuring an iconic domed Rotunda. The Walsh Gallery on the first floor hosts exhibitions to enhance the university\'s intellectual life.'
    }
  ]
};

/**
 * Cutscene 3: The Library's Secrets (Before Level 3)
 * Location: Transition between Walsh Gallery and Walsh Library
 * Characters: Emily, Ghost of Saint Elizabeth Ann Seton
 * Transition: Campus map showing Walsh Library location → Level 3
 */
export const cutscene3 = {
  id: 'library_secrets',
  cutsceneNumber: 3,
  background: 'bg_library',
  nextScene: 'CampusMapScene',
  nextLevel: 3,
  dialogue: [
    {
      speaker: 'ghost',
      text: '*appearing with a satisfied expression* Excellent work in the gallery! Did you see the look on that corrupt priest\'s face when you hit him with that terrible portrait of Bishop Whoever-That-Was?'
    },
    {
      speaker: 'emily',
      text: 'I\'m still processing the fact that I\'m fighting people with bad art. This is the weirdest day of my life.'
    },
    {
      speaker: 'ghost',
      text: '*chuckling* Oh, Emily, if you think THIS is weird, wait until we get to the Grotto. But first, we need to clear out the rest of Walsh Library. The Rotunda, the stacks, all of it.'
    },
    {
      speaker: 'emily',
      text: 'The library is supposed to be a place of learning and quiet study. What\'s happened to it?'
    },
    {
      speaker: 'ghost',
      text: 'The same thing that\'s happened to everything else—corruption, laziness, bureaucratic nonsense. Students who won\'t read, administrators who won\'t help, and more of those DREADFUL portraits. I swear, if I see one more painting with incorrect perspective, I\'m going to... well, I\'m already dead, so I suppose I can\'t do much. But YOU can!'
    },
    {
      speaker: 'emily',
      text: '*looking at the relics she\'s collected* These powers you\'ve given me... the invulnerability from your hair, the holy spell from your finger bone... they\'re incredible. How is this possible?'
    },
    {
      speaker: 'ghost',
      text: 'I performed miracles in life, Emily. In 1952, my intercession cured Anne Theresa O\'Neill of acute leukemia. The doctors called it impossible, but faith made it real. These relics carry a fraction of that divine power. Use them wisely.'
    },
    {
      speaker: 'emily',
      text: 'I will. But... you keep mentioning the Grotto. What\'s really going on there?'
    },
    {
      speaker: 'ghost',
      text: '*her expression becomes grave* After you clear the library, we face the Administration Building. There\'s a boss there—a manifestation of all the bureaucratic evil that\'s infected this place. Defeat it, and I\'ll tell you everything about the Grotto. But I warn you, Emily... what waits there is far worse than anything you\'ve faced so far.'
    },
    {
      speaker: 'emily',
      text: '*steeling herself* I\'ve come this far. I won\'t back down now.'
    },
    {
      speaker: 'ghost',
      text: 'That\'s the spirit! Now go—the library awaits. And Emily? Thank you. For caring. For fighting. For honoring what this university was meant to be.',
      historicalNote: 'Saint Elizabeth Ann Seton performed miracles, including the healing of Anne Theresa O\'Neill from acute leukemia in 1952, which was recognized by the Catholic Church during her canonization process.'
    }
  ]
};

/**
 * Cutscene 4: The Administrative Evil (Before Level 4)
 * Location: Transition between Walsh Library and Administration Building
 * Characters: Emily, Saint Elizabeth Ann Seton (upgraded to angel form)
 * Transition: Campus map showing Administration Building location → Level 4
 */
export const cutscene4 = {
  id: 'administrative_evil',
  cutsceneNumber: 4,
  background: 'bg_admin',
  nextScene: 'CampusMapScene',
  nextLevel: 4,
  dialogue: [
    {
      speaker: 'ghost',
      text: '*appearing with an unusually serious expression* Emily, you\'ve done remarkably well. The parking lot is clear, the gallery is cleansed, and the library is safe again. But now comes the real test.'
    },
    {
      speaker: 'emily',
      text: 'The Administration Building?'
    },
    {
      speaker: 'ghost',
      text: 'Yes. The heart of bureaucratic corruption. Forms in triplicate, policies that help no one, administrators who\'ve forgotten that they serve students, not the other way around. And at the center of it all... a boss. A powerful manifestation of everything that\'s gone wrong.'
    },
    {
      speaker: 'emily',
      text: 'I\'ve fought corrupt priests and lazy students. I can handle some paperwork-obsessed administrator.'
    },
    {
      speaker: 'ghost',
      text: '*shaking her head* This is different, Emily. This isn\'t just one person—it\'s a system. A system that protects predators, that enables laziness, that values procedure over people. It\'s taken physical form, and it\'s strong.'
    },
    {
      speaker: 'emily',
      text: 'Then I\'ll use everything you\'ve taught me. The relics, the art, all of it.'
    },
    {
      speaker: 'ghost',
      text: '*placing a ghostly hand on Emily\'s shoulder* You have the strength. I see it in you. You remind me of myself, in a way—someone who cares deeply about education, about beauty, about doing what\'s right even when it\'s hard.'
    },
    {
      speaker: 'emily',
      text: '*touched* Thank you. That means a lot, coming from you.'
    },
    {
      speaker: 'ghost',
      text: '*stepping back* But Emily, there\'s something I need to tell you. Something I\'ve been holding back.'
    },
    {
      speaker: 'emily',
      text: 'The Grotto?'
    },
    {
      speaker: 'ghost',
      text: '*nodding gravely* Yes. The National Shrine Grotto of Our Lady of Lourdes, in Emmitsburg, Maryland. It\'s where I lived, where I taught, where I attended Mass every Sunday with my sisters. It\'s a holy place, built just 17 years after the apparition at Lourdes in France. A mountainside shrine with a cave-like grotto, dedicated to the Blessed Mother.'
    },
    {
      speaker: 'emily',
      text: 'It sounds beautiful.'
    },
    {
      speaker: 'ghost',
      text: '*her voice breaking slightly* It WAS beautiful. But something has happened. Something terrible. The corruption here at Seton Hall—it\'s not isolated. It\'s part of something larger, something darker. And that darkness has reached my Grotto.'
    },
    {
      speaker: 'emily',
      text: 'What do you mean?'
    },
    {
      speaker: 'ghost',
      text: '*looking directly at Emily* Satan himself has taken over the Grotto. He\'s filled it with demons, desecrated the holy cave, mocked everything that place represents. He\'s trying to destroy my legacy, to corrupt the very ground where I walked with God.'
    },
    {
      speaker: 'emily',
      text: '*shocked* Satan? As in... THE Satan?'
    },
    {
      speaker: 'ghost',
      text: 'The adversary. The deceiver. The enemy of all that is good. He\'s always been there, Emily, working through corrupt priests, through institutional evil, through the small compromises that lead to great sins. But now he\'s made himself known, and he must be confronted.'
    },
    {
      speaker: 'emily',
      text: '*overwhelmed* I\'m just a gallery director! How can I possibly fight Satan?'
    },
    {
      speaker: 'ghost',
      text: 'You won\'t be alone. You\'ll have my relics, my guidance, and most importantly, you\'ll have righteousness on your side. But first, you must prove yourself one final time here on campus. Defeat the boss in the Administration Building, and then... then we travel to Emmitsburg together.'
    },
    {
      speaker: 'emily',
      text: '*taking a deep breath* Okay. Okay. I can do this. I WILL do this.'
    },
    {
      speaker: 'ghost',
      text: 'That\'s my girl. Now go—show that bureaucratic nightmare what happens when someone actually cares about doing the right thing!',
      historicalNote: 'The National Shrine Grotto of Our Lady of Lourdes in Emmitsburg, Maryland, is the oldest US replica of the Lourdes shrine in France. Mother Seton and her sisters lived near the Grotto in a log cabin and attended Sunday Mass at the chapel on the mountain.'
    }
  ]
};

/**
 * Cutscene 5: The Journey to Emmitsburg (Before Level 5)
 * Location: After defeating Administration Building boss
 * Characters: Emily, Saint Elizabeth Ann Seton (angel form)
 * Transition: Travel montage → Grotto exterior → Level 5
 */
export const cutscene5 = {
  id: 'journey_to_emmitsburg',
  cutsceneNumber: 5,
  background: 'bg_grotto',
  nextScene: 'CampusMapScene',
  nextLevel: 5,
  dialogue: [
    {
      speaker: 'ghost',
      text: '*appearing as Emily catches her breath after the boss battle* You did it! You actually did it! The Administration Building is cleansed!'
    },
    {
      speaker: 'emily',
      text: '*exhausted but triumphant* That was... intense. I never want to see another form in triplicate again.'
    },
    {
      speaker: 'ghost',
      text: '*laughing* Oh, Emily, you\'ve earned a rest. But I\'m afraid we don\'t have time for that. The Grotto calls to us.'
    },
    {
      speaker: 'emily',
      text: '*straightening up* Right. Emmitsburg. Satan. Demons. Just another Tuesday.'
    },
    {
      speaker: 'ghost',
      text: '*smiling sadly* Your courage humbles me. Come—we must travel to Maryland. It\'s not far, but it\'s a journey that will change everything.'
    },
    {
      speaker: 'ghost',
      text: '*as they approach the Grotto* There it is. My Grotto. Or what\'s left of it.'
    },
    {
      speaker: 'emily',
      text: '*looking at the mountainside shrine* It\'s... it\'s still beautiful, even now. I can feel the holiness of this place.'
    },
    {
      speaker: 'ghost',
      text: 'Yes. The Blessed Mother\'s presence is strong here. But look closer—do you see the darkness creeping through the cave? The shadows that shouldn\'t be there?'
    },
    {
      speaker: 'emily',
      text: '*peering at the grotto entrance* I see it. It\'s like... like the cave itself is infected.'
    },
    {
      speaker: 'ghost',
      text: 'Satan has made his lair in the very heart of the Grotto. He\'s filled it with demons—twisted creatures of malice and hate. They mock the prayers that were said here, the miracles that happened here, the faith that sustained generations of believers.'
    },
    {
      speaker: 'emily',
      text: 'Why here? Why your Grotto specifically?'
    },
    {
      speaker: 'ghost',
      text: '*her voice filled with both anger and sorrow* Because I was the first American-born saint. Because I founded the Catholic school system in this country. Because my work, my legacy, represents everything he hates—education, compassion, faith, the elevation of the human spirit. By corrupting this place, he strikes at the very foundation of Catholic education in America.'
    },
    {
      speaker: 'emily',
      text: 'Then we\'ll take it back. We\'ll drive him out.'
    },
    {
      speaker: 'ghost',
      text: 'Emily, I need you to understand what you\'re facing. This isn\'t like the campus. Those were human failings, human corruption. This is pure evil. Satan himself waits in the depths of that cave, surrounded by his demons. You could die. Your soul could be lost.'
    },
    {
      speaker: 'emily',
      text: '*firmly* Then I\'ll die fighting for something that matters. You dedicated your life to education, to helping others, to building something beautiful in this world. I\'m just a gallery director, but I understand the importance of preserving beauty, of fighting for what\'s right. If I can help restore your Grotto, if I can honor your legacy... then that\'s worth any risk.'
    },
    {
      speaker: 'ghost',
      text: '*tears in her ghostly eyes* You are braver than you know, Emily. Braver than I was, perhaps. Very well—enter the Grotto. Fight through the demons. Find Satan in the deepest chamber, and cast him out. Use my relics, use your courage, and know that I am with you every step of the way.'
    },
    {
      speaker: 'emily',
      text: 'Will you... will you be there? In the cave?'
    },
    {
      speaker: 'ghost',
      text: 'I cannot enter while he holds dominion there. The darkness repels me. But the moment you weaken him, the moment his grip falters, I will be there. And I won\'t be alone.'
    },
    {
      speaker: 'emily',
      text: 'What do you mean?'
    },
    {
      speaker: 'ghost',
      text: '*smiling mysteriously* You\'ll see. Now go, Emily. Go into the darkness, and bring back the light. Show Satan that he has no power over faith, over love, over the legacy of those who serve God.'
    },
    {
      speaker: 'emily',
      text: '*turning toward the cave entrance* For you, Saint Elizabeth. For the students. For everyone who believes in something better.'
    },
    {
      speaker: 'ghost',
      text: '*softly* For all of us.',
      historicalNote: 'Mother Seton lived and worked in Emmitsburg, Maryland, where she founded her religious community and school. The Grotto was already considered a holy place during her lifetime, and she and her sisters attended Mass at the chapel on the mountain every Sunday.'
    }
  ]
};

/**
 * Cutscene 6: Victory and Transfiguration (After Level 5)
 * Location: Inside the Grotto cave, after defeating Satan
 * Characters: Emily, Saint Elizabeth Ann Seton (transforms to triumphant form)
 * Transition: Victory Scene (game end)
 */
export const cutscene6 = {
  id: 'victory_transfiguration',
  cutsceneNumber: 6,
  background: 'bg_grotto',
  nextScene: 'VictoryScene',
  nextLevel: null,
  dialogue: [
    {
      speaker: 'emily',
      text: '*breathing heavily, standing over the defeated form of Satan* It\'s... it\'s done. He\'s gone.'
    },
    {
      speaker: 'ghost',
      text: '*appearing in a brilliant glow* EMILY! You did it! You actually defeated him!'
    },
    {
      speaker: 'emily',
      text: '*collapsing to her knees* I couldn\'t have done it without your relics. Without your guidance. Without knowing what you stood for.'
    },
    {
      speaker: 'ghost',
      text: '*rushing to Emily\'s side* You are remarkable, my dear. Truly remarkable. You\'ve restored the Grotto, cleansed the campus, and proven that one person with courage can stand against any darkness.'
    },
    {
      speaker: 'saint',
      text: '*in a voice filled with divine authority and joy* The Grotto is free! The darkness is vanquished!'
    },
    {
      speaker: 'emily',
      text: '*in awe* Saint Elizabeth... you\'re... you\'re different!'
    },
    {
      speaker: 'saint',
      text: '*her form radiant and powerful* With Satan\'s defeat, I can manifest my true form—not just as a ghost bound to earth, but as a saint in glory! You\'ve freed not just this place, Emily, but freed me to show you the fullness of what faith can achieve!'
    },
    {
      speaker: 'emily',
      text: '*stammering* I... I just did what needed to be done.'
    },
    {
      speaker: 'saint',
      text: '*her voice resonating with power* And in doing so, you\'ve proven that the battle against evil can be won! The adversary has been cast out from this holy place. The Grotto is restored. The corruption on the campus is cleansed. But know this—the battle against evil is never truly over. It must be fought anew in every generation, in every heart.'
    },
    {
      speaker: 'emily',
      text: '*standing, finding strength* I understand. The fight continues. But today, we celebrate this victory.'
    },
    {
      speaker: 'saint',
      text: '*turning to Emily with radiant compassion* You have been given a great gift—the knowledge that evil can be defeated, that corruption can be cleansed, that one person\'s courage can change the world. Carry this knowledge with you. Share it with others. And never forget that you do not fight alone.'
    },
    {
      speaker: 'emily',
      text: '*finding her voice* I won\'t forget. I promise.'
    },
    {
      speaker: 'saint',
      text: '*raising her arms in blessing* Then go in peace, warrior of light. The Grotto is ours once more. May it stand as a testament to faith, to courage, and to the enduring power of good over evil. And may you carry this light with you always!'
    },
    {
      speaker: 'ghost',
      text: '*her form now softly glowing, back to her familiar ghostly appearance but with a new peace* Thank you, Emily. Thank you for everything. My Grotto is restored. The campus is cleansed. And most importantly, you\'ve shown that the values I fought for—education, excellence, compassion, courage—still matter in this world.'
    },
    {
      speaker: 'emily',
      text: '*smiling through her own tears* I learned from the best. A woman who converted to a new faith despite social ostracism. Who founded schools and religious communities. Who performed miracles. Who became America\'s first native-born saint. And who just transformed into a radiant warrior of heaven! If I have even a fraction of your courage, I\'ll count myself blessed.'
    },
    {
      speaker: 'ghost',
      text: '*laughing* Oh, Emily, you have more than a fraction. You have your own courage, your own strength. And now you have a story to tell—a story of how one gallery director saved a university and a holy shrine from darkness. And witnessed a saint in her full glory!'
    },
    {
      speaker: 'emily',
      text: '*looking around the restored Grotto* What happens now?'
    },
    {
      speaker: 'ghost',
      text: 'Now? Now you return to your gallery. You continue your work. You educate, you inspire, you maintain standards of excellence. And when you see corruption, when you see laziness, when you see those TERRIBLE portraits... *she grins* ...you remember that you once threw bad art at Satan himself and won.'
    },
    {
      speaker: 'emily',
      text: '*laughing* I don\'t think I\'ll ever forget that. Or the sight of you in your full saintly glory!'
    },
    {
      speaker: 'ghost',
      text: '*smiling warmly* Good. And Emily? Thank you. For believing in me. For believing in what I stood for. For proving that my legacy—our legacy—is worth fighting for. You gave me the chance to show my true power, my true form. That\'s a gift I can never repay.'
    },
    {
      speaker: 'emily',
      text: '*bowing her head* It was an honor, Saint Elizabeth Ann Seton.'
    },
    {
      speaker: 'ghost',
      text: '*beginning to fade* The honor was mine, Emily. Now go—the world needs more people like you. People who care about beauty, about truth, about doing what\'s right even when it\'s hard. And remember... *her voice echoing as she fades* ...always maintain your artistic standards!'
    },
    {
      speaker: 'emily',
      text: '*laughing as the ghost disappears* I will. I promise.',
      historicalNote: 'Saint Elizabeth Ann Seton\'s legacy continues through the Catholic school system she founded, the Sisters of Charity she established, and the countless lives she touched through her work. She was canonized on September 14, 1975, and her feast day is celebrated on January 4th, the anniversary of her death in 1821.'
    }
  ]
};

/**
 * All cutscenes indexed by ID
 */
export const cutscenes = {
  'opening': cutscene1,
  'cutscene1': cutscene1,
  'gallery_complaint': cutscene2,
  'cutscene2': cutscene2,
  'library_secrets': cutscene3,
  'cutscene3': cutscene3,
  'administrative_evil': cutscene4,
  'cutscene4': cutscene4,
  'journey_to_emmitsburg': cutscene5,
  'cutscene5': cutscene5,
  'victory_transfiguration': cutscene6,
  'cutscene6': cutscene6
};

/**
 * Get cutscene data by ID
 * @param {string} cutsceneId - ID of the cutscene
 * @returns {Object|null} Cutscene data or null if not found
 */
export function getCutscene(cutsceneId) {
  return cutscenes[cutsceneId] || null;
}
