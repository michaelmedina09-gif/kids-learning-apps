/* Education content banks for Critter Cove (grade 5) and Dino Star Patrol (grade 1).
   All passages and stories are original. Checked by scripts in docs/edu/EDU_SPEC.md (see "Content QA").
   Load as a plain <script>; exposes a single global `EDU`. No personal data. */
const EDU = {
  version: 1,

  /* ---------------------------------------------------------------------
     1) GRADE 5 MORPHOLOGY SPELLING  (ELA.5.V.1.2 / ELA.5.C.3.1)
     parts join to the word unless `rule` says how the join changes it:
       'drop-e'  : base loses final e before a vowel suffix  (hope+ing = hoping)
       'double'  : 1 syllable, 1 short vowel, 1 final consonant -> double it (swim+ing = swimming)
       'y-to-i'  : consonant + y -> change y to i (except before -ing)  (happy+ness = happiness)
  --------------------------------------------------------------------- */
  morphGroups: [
    { id: 'un',     kind: 'prefix', label: 'un-',        meaning: 'not / opposite of' },
    { id: 're',     kind: 'prefix', label: 're-',        meaning: 'again / back' },
    { id: 'dis',    kind: 'prefix', label: 'dis-',       meaning: 'not / opposite of' },
    { id: 'mis',    kind: 'prefix', label: 'mis-',       meaning: 'wrongly / badly' },
    { id: 'pre',    kind: 'prefix', label: 'pre-',       meaning: 'before' },
    { id: 'in',     kind: 'prefix', label: 'in- / im-',  meaning: 'not (im- before b, m, p)' },
    { id: 'ful',    kind: 'suffix', label: '-ful / -less', meaning: 'full of / without' },
    { id: 'ness',   kind: 'suffix', label: '-ness / -ment', meaning: 'turns a word into a thing or state' },
    { id: 'tion',   kind: 'suffix', label: '-ion',       meaning: 'the act or result of' },
    { id: 'able',   kind: 'suffix', label: '-able',      meaning: 'can be done' },
    { id: 'er',     kind: 'suffix', label: '-er / -or',  meaning: 'a person or thing that does' },
    { id: 'drop-e', kind: 'rule',   label: 'Drop the e', meaning: 'Silent e leaves when the suffix starts with a vowel' },
    { id: 'double', kind: 'rule',   label: 'Double it',  meaning: '1 syllable + 1 short vowel + 1 consonant: double before a vowel suffix' },
    { id: 'y-to-i', kind: 'rule',   label: 'y to i',     meaning: 'Consonant + y: change y to i before a suffix (not -ing)' },
    { id: 'port',   kind: 'root',   label: 'port',       meaning: 'carry' },
    { id: 'rupt',   kind: 'root',   label: 'rupt',       meaning: 'break' },
    { id: 'struct', kind: 'root',   label: 'struct',     meaning: 'build' },
    { id: 'spect',  kind: 'root',   label: 'spect',      meaning: 'look' },
    { id: 'dict',   kind: 'root',   label: 'dict',       meaning: 'say / tell' },
    { id: 'graph',  kind: 'root',   label: 'graph',      meaning: 'write / draw' },
    { id: 'tract',  kind: 'root',   label: 'tract',      meaning: 'pull / drag' }
  ],
  morph: [
    { w: 'unhappy',       g: 'un',   parts: ['un', 'happy'],            m: 'not happy' },
    { w: 'unkind',        g: 'un',   parts: ['un', 'kind'],             m: 'not kind' },
    { w: 'unusual',       g: 'un',   parts: ['un', 'usual'],            m: 'not usual; rare' },
    { w: 'unlock',        g: 'un',   parts: ['un', 'lock'],             m: 'to do the opposite of lock' },
    { w: 'rewrite',       g: 're',   parts: ['re', 'write'],            m: 'to write again' },
    { w: 'rebuild',       g: 're',   parts: ['re', 'build'],            m: 'to build again' },
    { w: 'reread',        g: 're',   parts: ['re', 'read'],             m: 'to read again' },
    { w: 'return',        g: 're',   parts: ['re', 'turn'],             m: 'to turn or come back' },
    { w: 'disagree',      g: 'dis',  parts: ['dis', 'agree'],           m: 'to not agree' },
    { w: 'dishonest',     g: 'dis',  parts: ['dis', 'honest'],          m: 'not honest' },
    { w: 'disappear',     g: 'dis',  parts: ['dis', 'appear'],          m: 'to go out of sight' },
    { w: 'disconnect',    g: 'dis',  parts: ['dis', 'connect'],         m: 'to undo a connection' },
    { w: 'misspell',      g: 'mis',  parts: ['mis', 'spell'],           m: 'to spell wrongly', tip: 'mis + spell keeps BOTH s letters' },
    { w: 'misplace',      g: 'mis',  parts: ['mis', 'place'],           m: 'to put in the wrong place' },
    { w: 'mislead',       g: 'mis',  parts: ['mis', 'lead'],            m: 'to lead the wrong way' },
    { w: 'misunderstand', g: 'mis',  parts: ['mis', 'understand'],      m: 'to understand wrongly' },
    { w: 'preview',       g: 'pre',  parts: ['pre', 'view'],            m: 'to look at before' },
    { w: 'preheat',       g: 'pre',  parts: ['pre', 'heat'],            m: 'to heat before using' },
    { w: 'prepay',        g: 'pre',  parts: ['pre', 'pay'],             m: 'to pay before' },
    { w: 'prehistoric',   g: 'pre',  parts: ['pre', 'historic'],        m: 'from before written history' },
    { w: 'incorrect',     g: 'in',   parts: ['in', 'correct'],          m: 'not correct' },
    { w: 'invisible',     g: 'in',   parts: ['in', 'vis', 'ible'],      m: 'not able to be seen', tip: 'vis = see' },
    { w: 'impossible',    g: 'in',   parts: ['im', 'possible'],         m: 'not possible', tip: 'im- before p' },
    { w: 'impatient',     g: 'in',   parts: ['im', 'patient'],          m: 'not patient', tip: 'im- before p' },
    { w: 'careful',       g: 'ful',  parts: ['care', 'ful'],            m: 'full of care', tip: '-ful has only ONE l' },
    { w: 'hopeful',       g: 'ful',  parts: ['hope', 'ful'],            m: 'full of hope', tip: 'keep the e: -ful starts with a consonant' },
    { w: 'powerful',      g: 'ful',  parts: ['power', 'ful'],           m: 'full of power' },
    { w: 'fearless',      g: 'ful',  parts: ['fear', 'less'],           m: 'without fear' },
    { w: 'harmless',      g: 'ful',  parts: ['harm', 'less'],           m: 'without harm' },
    { w: 'careless',      g: 'ful',  parts: ['care', 'less'],           m: 'without care' },
    { w: 'kindness',      g: 'ness', parts: ['kind', 'ness'],           m: 'the quality of being kind' },
    { w: 'darkness',      g: 'ness', parts: ['dark', 'ness'],           m: 'the state of being dark' },
    { w: 'illness',       g: 'ness', parts: ['ill', 'ness'],            m: 'the state of being ill' },
    { w: 'fitness',       g: 'ness', parts: ['fit', 'ness'],            m: 'the state of being fit', tip: 'no doubling: -ness starts with a consonant' },
    { w: 'movement',      g: 'ness', parts: ['move', 'ment'],           m: 'the act of moving', tip: 'keep the e: -ment starts with a consonant' },
    { w: 'agreement',     g: 'ness', parts: ['agree', 'ment'],          m: 'the state of agreeing' },
    { w: 'excitement',    g: 'ness', parts: ['excite', 'ment'],         m: 'the feeling of being excited' },
    { w: 'payment',       g: 'ness', parts: ['pay', 'ment'],            m: 'money paid', tip: 'vowel + y keeps the y' },
    { w: 'action',        g: 'tion', parts: ['act', 'ion'],             m: 'the act of doing' },
    { w: 'invention',     g: 'tion', parts: ['invent', 'ion'],          m: 'something invented' },
    { w: 'direction',     g: 'tion', parts: ['direct', 'ion'],          m: 'the way something goes' },
    { w: 'collection',    g: 'tion', parts: ['collect', 'ion'],         m: 'a group of things collected' },
    { w: 'readable',      g: 'able', parts: ['read', 'able'],           m: 'can be read' },
    { w: 'washable',      g: 'able', parts: ['wash', 'able'],           m: 'can be washed' },
    { w: 'breakable',     g: 'able', parts: ['break', 'able'],          m: 'can be broken' },
    { w: 'comfortable',   g: 'able', parts: ['comfort', 'able'],        m: 'giving comfort' },
    { w: 'enjoyable',     g: 'able', parts: ['enjoy', 'able'],          m: 'can be enjoyed' },
    { w: 'teacher',       g: 'er',   parts: ['teach', 'er'],            m: 'a person who teaches' },
    { w: 'inventor',      g: 'er',   parts: ['invent', 'or'],           m: 'a person who invents' },
    { w: 'visitor',       g: 'er',   parts: ['visit', 'or'],            m: 'a person who visits' },
    { w: 'actor',         g: 'er',   parts: ['act', 'or'],              m: 'a person who acts' },
    { w: 'hoping',        g: 'drop-e', parts: ['hope', 'ing'],  rule: 'drop-e', m: 'wishing for something' },
    { w: 'writing',       g: 'drop-e', parts: ['write', 'ing'], rule: 'drop-e', m: 'putting words on paper' },
    { w: 'amazing',       g: 'drop-e', parts: ['amaze', 'ing'], rule: 'drop-e', m: 'causing wonder' },
    { w: 'closest',       g: 'drop-e', parts: ['close', 'est'], rule: 'drop-e', m: 'the most close; nearest' },
    { w: 'excited',       g: 'drop-e', parts: ['excite', 'ed'], rule: 'drop-e', m: 'full of eager feeling' },
    { w: 'swimming',      g: 'double', parts: ['swim', 'ing'],  rule: 'double', m: 'moving through water' },
    { w: 'stopped',       g: 'double', parts: ['stop', 'ed'],   rule: 'double', m: 'came to an end' },
    { w: 'hottest',       g: 'double', parts: ['hot', 'est'],   rule: 'double', m: 'the most hot' },
    { w: 'planned',       g: 'double', parts: ['plan', 'ed'],   rule: 'double', m: 'made a plan' },
    { w: 'bigger',        g: 'double', parts: ['big', 'er'],    rule: 'double', m: 'more big' },
    { w: 'happiness',     g: 'y-to-i', parts: ['happy', 'ness'],  rule: 'y-to-i', m: 'the state of being happy' },
    { w: 'beautiful',     g: 'y-to-i', parts: ['beauty', 'ful'],  rule: 'y-to-i', m: 'full of beauty' },
    { w: 'carried',       g: 'y-to-i', parts: ['carry', 'ed'],    rule: 'y-to-i', m: 'held and moved' },
    { w: 'easily',        g: 'y-to-i', parts: ['easy', 'ly'],     rule: 'y-to-i', m: 'in an easy way' },
    { w: 'families',      g: 'y-to-i', parts: ['family', 'es'],   rule: 'y-to-i', m: 'more than one family' },
    { w: 'transport',     g: 'port',   parts: ['trans', 'port'],  m: 'to carry across' },
    { w: 'portable',      g: 'port',   parts: ['port', 'able'],   m: 'able to be carried' },
    { w: 'import',        g: 'port',   parts: ['im', 'port'],     m: 'to carry in (from another country)' },
    { w: 'export',        g: 'port',   parts: ['ex', 'port'],     m: 'to carry out (to another country)' },
    { w: 'erupt',         g: 'rupt',   parts: ['e', 'rupt'],      m: 'to break out' },
    { w: 'interrupt',     g: 'rupt',   parts: ['inter', 'rupt'],  m: 'to break in between', tip: 'inter + rupt keeps BOTH r letters' },
    { w: 'disrupt',       g: 'rupt',   parts: ['dis', 'rupt'],    m: 'to break apart; upset' },
    { w: 'construct',     g: 'struct', parts: ['con', 'struct'],  m: 'to build' },
    { w: 'structure',     g: 'struct', parts: ['struct', 'ure'],  m: 'something built' },
    { w: 'instruct',      g: 'struct', parts: ['in', 'struct'],   m: 'to teach (build knowledge in)' },
    { w: 'destruction',   g: 'struct', parts: ['de', 'struct', 'ion'], m: 'the act of tearing down' },
    { w: 'inspect',       g: 'spect',  parts: ['in', 'spect'],    m: 'to look closely at' },
    { w: 'spectator',     g: 'spect',  parts: ['spect', 'at', 'or'], m: 'a person who watches' },
    { w: 'respect',       g: 'spect',  parts: ['re', 'spect'],    m: 'to look up to; value' },
    { w: 'predict',       g: 'dict',   parts: ['pre', 'dict'],    m: 'to tell before it happens' },
    { w: 'contradict',    g: 'dict',   parts: ['contra', 'dict'], m: 'to say the opposite' },
    { w: 'dictate',       g: 'dict',   parts: ['dict', 'ate'],    m: 'to say words for someone to write' },
    { w: 'autograph',     g: 'graph',  parts: ['auto', 'graph'],  m: 'a name written by the person (auto = self)' },
    { w: 'paragraph',     g: 'graph',  parts: ['para', 'graph'],  m: 'a group of written sentences' },
    { w: 'photograph',    g: 'graph',  parts: ['photo', 'graph'], m: 'a picture drawn with light (photo = light)' },
    { w: 'tractor',       g: 'tract',  parts: ['tract', 'or'],    m: 'a machine that pulls' },
    { w: 'attract',       g: 'tract',  parts: ['at', 'tract'],    m: 'to pull toward' },
    { w: 'subtract',      g: 'tract',  parts: ['sub', 'tract'],   m: 'to pull away (take away)' },
    { w: 'distract',      g: 'tract',  parts: ['dis', 'tract'],   m: 'to pull attention away' }
  ],

  /* ---------------------------------------------------------------------
     2) SENTENCE COMBINING (ELA.5.C.3.1; Writing Next)
     `model` is one strong answer; `accept` lists other correct versions.
  --------------------------------------------------------------------- */
  combine: [
    { s: ['I wanted to swim.', 'The water was too cold.'], c: 'but', type: 'compound', model: 'I wanted to swim, but the water was too cold.' },
    { s: ['It started to rain.', 'We went inside.'], c: 'so', type: 'compound', model: 'It started to rain, so we went inside.' },
    { s: ['The owl hunts at night.', 'It can see well in the dark.'], c: 'because', type: 'complex', model: 'The owl hunts at night because it can see well in the dark.' },
    { s: ['The turtle was slow.', 'It won the race.'], c: 'although', type: 'complex', model: 'Although the turtle was slow, it won the race.', accept: ['The turtle won the race although it was slow.'] },
    { s: ['The bell rang.', 'The students lined up.'], c: 'when', type: 'complex', model: 'When the bell rang, the students lined up.', accept: ['The students lined up when the bell rang.'] },
    { s: ['My aunt lives in Tampa.', 'She loves to fish.'], c: 'who', type: 'relative', model: 'My aunt, who lives in Tampa, loves to fish.', accept: ['My aunt, who loves to fish, lives in Tampa.'] },
    { s: ['The alligator rested on the bank.', 'The alligator was long.', 'The bank was muddy.'], c: '(adjectives)', type: 'embed', model: 'The long alligator rested on the muddy bank.' },
    { s: ['The dolphin jumped.', 'It jumped over the wave.'], c: '(phrase)', type: 'embed', model: 'The dolphin jumped over the wave.' },
    { s: ['The fox ran.', 'It ran quickly.'], c: '(adverb)', type: 'embed', model: 'The fox ran quickly.', accept: ['The fox quickly ran.'] },
    { s: ['I packed a flashlight.', 'I packed a map.', 'I packed water.'], c: 'and (list)', type: 'series', model: 'I packed a flashlight, a map, and water.' },
    { s: ['The storm was coming.', 'The fishermen stayed at the dock.'], c: 'because', type: 'complex', model: 'Because the storm was coming, the fishermen stayed at the dock.', accept: ['The fishermen stayed at the dock because the storm was coming.'] },
    { s: ['Coral reefs are colorful.', 'Coral reefs are in danger.'], c: 'but', type: 'compound', model: 'Coral reefs are colorful, but they are in danger.' },
    { s: ['The Florida panther is our state animal.', 'The Florida panther is endangered.'], c: '(appositive)', type: 'appositive', model: 'The Florida panther, our state animal, is endangered.' },
    { s: ['We finished our chores.', 'We went to the beach.'], c: 'after', type: 'complex', model: 'After we finished our chores, we went to the beach.', accept: ['We went to the beach after we finished our chores.'] },
    { s: ['The pelican dove into the water.', 'It caught a fish.'], c: 'and', type: 'compound-predicate', model: 'The pelican dove into the water and caught a fish.' },
    { s: ['The kitten was tiny.', 'The kitten was gray.', 'The kitten slept in a box.'], c: '(adjectives)', type: 'embed', model: 'The tiny gray kitten slept in a box.' },
    { s: ['The science fair is on Friday.', 'I need to finish my poster.'], c: 'so', type: 'compound', model: 'The science fair is on Friday, so I need to finish my poster.' },
    { s: ['We visited the Everglades.', 'The Everglades is a huge wetland.'], c: 'which', type: 'relative', model: 'We visited the Everglades, which is a huge wetland.' },
    { s: ['We waited under the tree.', 'The rain stopped.'], c: 'until', type: 'complex', model: 'We waited under the tree until the rain stopped.' },
    { s: ['The manatee is huge.', 'The manatee is gentle.'], c: 'and', type: 'embed', model: 'The manatee is huge and gentle.', accept: ['The huge manatee is gentle.'] }
  ],

  /* ---------------------------------------------------------------------
     3) SRSD ORGANIZERS + TEXT-BASED PROMPTS (B.E.S.T. Writing grades 4–6 style)
  --------------------------------------------------------------------- */
  srsd: {
    POW: [
      { k: 'P', name: 'Pick my idea',            kid: 'Read both passages. Decide what you think (or what you will explain).' },
      { k: 'O', name: 'Organize my notes',       kid: 'Fill in the planner below. Short notes are fine: no full sentences yet.' },
      { k: 'W', name: 'Write and say more',      kid: 'Turn each note into sentences. Add a detail or an example every time.' }
    ],
    TREE: [
      { k: 'T', name: 'Topic sentence', kid: 'Tell the reader what you believe.', starters: ['I believe that', 'In my opinion,', 'It is clear that'] },
      { k: 'R', name: 'Reasons (3 or more)', kid: 'Why do you believe it? Find reasons in the passages.', starters: ['One reason is', 'Another reason is', 'Most importantly,'] },
      { k: 'E', name: 'Explain reasons', kid: 'Say more about each reason. Use a fact from a passage and name it.', starters: ['According to "', 'For example,', 'This shows that'] },
      { k: 'E', name: 'Ending', kid: 'Wrap it up. Say your opinion again in new words.', starters: ['For these reasons,', 'That is why', 'In conclusion,'] }
    ],
    TIDE: [
      { k: 'T', name: 'Topic sentence', kid: 'Tell the reader what you will explain.', starters: ['There are several ways', 'It is important to understand', ''] },
      { k: 'I', name: 'Important evidence', kid: 'Pick 2–3 key facts from the passages.', starters: ['First,', 'In addition,', 'Also,'] },
      { k: 'D', name: 'Detail / explain', kid: 'Explain each fact in your own words. Name the passage.', starters: ['The passage "', 'This means that', 'In other words,'] },
      { k: 'E', name: 'Ending', kid: 'Sum up what the reader learned.', starters: ['As you can see,', 'In the end,', 'Overall,'] }
    ],
    selfTalk: ['What is my job? Read the prompt twice.', 'Take my time. Good writing takes a plan.', 'Did I use a fact from BOTH passages?', 'Say more! Add an example.', 'I can do this. I have a trick (POW).'],
    checklist: {
      argument: ['Topic sentence tells my opinion', '3 or more reasons', 'Each reason explained with a fact', 'Named at least one passage', 'Used transition words', 'Ending restates my opinion', 'Checked capitals, end marks, spelling'],
      expository: ['Topic sentence tells what I will explain', '2–3 important facts', 'Each fact explained in my own words', 'Named at least one passage', 'Used transition words', 'Ending sums up', 'Checked capitals, end marks, spelling']
    }
  },
  textPrompts: [
    {
      id: 'manatee', mode: 'expository', organizer: 'TIDE',
      prompt: 'Write an essay explaining why manatees gather in warm water every winter. Use information from both passages.',
      passages: [
        { title: 'Built for Warm Water', text: 'Manatees are large, slow-moving mammals that live in Florida’s rivers, bays, and coastal waters. Even though they look chubby, manatees do not have a thick layer of blubber like whales do. Their bodies also use energy slowly, so they cannot make much heat. When the water drops below about 68 degrees Fahrenheit, manatees can get sick from a condition called cold stress. Cold stress can damage their skin and make it hard for them to fight off illness. To stay healthy, manatees must find water that stays warm all winter long.' },
        { title: 'Winter Hot Spots', text: 'Every winter, hundreds of manatees swim to the same warm places. Some travel up rivers to natural springs, where water bubbles up from underground at about 72 degrees all year. Others crowd near power plants that release warm water into nearby canals. At Blue Spring State Park, visitors can stand on a boardwalk and watch manatees resting in the clear water on chilly mornings. On warmer afternoons, many manatees leave to look for food, then return when the air turns cold again. Scientists count the manatees each winter to see how the population is doing.' }
      ]
    },
    {
      id: 'native-plants', mode: 'argument', organizer: 'TREE',
      prompt: 'Should families plant native plants instead of grass lawns? Write an essay giving your opinion. Use information from both passages.',
      passages: [
        { title: 'The Case for Native Plants', text: 'Native plants are plants that grew naturally in an area long before people arrived. In Florida, examples include firebush, coontie, and beautyberry. Because these plants are used to local rain, heat, and soil, they often need less watering once their roots are settled. Native flowers also feed butterflies, bees, and hummingbirds that have depended on them for thousands of years. Many grass lawns, on the other hand, need regular watering, mowing, and fertilizer. When it rains, some of that fertilizer can wash into lakes and rivers, where it can feed harmful algae.' },
        { title: 'Why Some People Keep Lawns', text: 'Many families enjoy having a grass lawn. A soft, open lawn is a good place for kids to play tag, kick a ball, or have a picnic. Some neighborhoods have rules about how front yards should look, and a neat lawn is an easy way to follow them. Changing a whole yard to native plants can also cost time and money at first, because the old grass has to be removed and new plants must be watered until their roots grow. Some people choose a middle path: they keep a small lawn for play and plant native flowers along the edges.' }
      ]
    },
    {
      id: 'hatchlings', mode: 'expository', organizer: 'TIDE',
      prompt: 'Write an essay explaining how people can help sea turtle hatchlings reach the ocean. Use information from both passages.',
      passages: [
        { title: 'A Nighttime Journey', text: 'From spring through fall, sea turtles crawl onto Florida beaches at night to lay their eggs in the sand. About two months later, the baby turtles, called hatchlings, dig their way out, usually after dark. Hatchlings find the ocean by crawling toward the brightest direction. On a natural beach, that is the open sky over the water, lit by the moon and stars. Hatchlings need to reach the water quickly, because crabs, birds, and raccoons hunt them on the sand. Every minute on the beach is a risk.' },
        { title: 'Lights Out for Turtles', text: 'Bright lights from buildings, streetlights, and flashlights can confuse hatchlings. Instead of heading to the sea, they may crawl toward roads or parking lots, where they can get lost or run out of energy. Many Florida beach towns have rules that ask people to turn off or cover outdoor lights during nesting season. Beachgoers can help in other ways, too. They can fill in holes they dig, knock down sandcastles before they leave, and carry chairs and toys off the beach at night. These things can trap hatchlings on their way to the water.' }
      ]
    },
    {
      id: 'school-garden', mode: 'argument', organizer: 'TREE',
      prompt: 'Should every elementary school have a garden? Write an essay giving your opinion. Use information from both passages.',
      passages: [
        { title: 'Learning in the Garden', text: 'At some schools, students grow vegetables, herbs, and flowers in a school garden. Students measure how fast plants grow, record rainfall, and learn which insects help or harm the plants. Researchers have found that children who help grow vegetables are often more willing to taste them. A garden can also give students a calm place to work outside and a chance to take care of something as a team. Some school gardens even share their harvest with the cafeteria or with families in the neighborhood.' },
        { title: 'Growing Pains', text: 'A school garden takes more work than it might seem. Someone has to water the plants during hot Florida summers, when students are on vacation. Tools, soil, seeds, and fences cost money, and many schools already have tight budgets. Teachers also need time to plan garden lessons while still teaching everything students need to learn. Without a group of adults who promise to help, a garden can quickly fill with weeds. Some schools start small, with a few planters near a classroom, to see if the idea works before building a bigger garden.' }
      ]
    },
    {
      id: 'hurricanes', mode: 'expository', organizer: 'TIDE',
      prompt: 'Write an essay explaining how hurricanes form and how Florida families get ready for them. Use information from both passages.',
      passages: [
        { title: 'How a Hurricane Forms', text: 'Hurricanes begin over warm ocean water, usually at least 80 degrees Fahrenheit. The warm water heats the air above it, and the warm, wet air rises. As it rises, it cools and forms clouds and thunderstorms. More air rushes in to replace the rising air. Because Earth spins, the moving air begins to turn in a giant circle. When the storm’s winds reach 74 miles per hour, it is called a hurricane. The calm center of the storm, where the sky can even look clear, is called the eye.' },
        { title: 'Getting Ready', text: 'The Atlantic hurricane season runs from June 1 to November 30. Many Florida families prepare before a storm is ever on the way. They put together a kit with water, canned food, flashlights, batteries, and medicine. They also learn their evacuation zone so they know whether they may need to leave. When a storm is coming, people bring in patio furniture and toys so the wind cannot throw them. Some cover their windows with shutters. Forecasters track storms with satellites and special airplanes, which gives people days to get ready.' }
      ]
    },
    {
      id: 'plastic', mode: 'argument', organizer: 'TREE',
      prompt: 'Should beach towns ban plastic bags and straws? Write an essay giving your opinion. Use information from both passages.',
      passages: [
        { title: 'Plastic and the Sea', text: 'Plastic does not break down the way leaves or paper do. Instead, it breaks into smaller and smaller pieces that can last for many years. Sea turtles sometimes mistake floating plastic bags for jellyfish, one of their foods. Seabirds and fish can also swallow bits of plastic, which can make them sick. Volunteers who clean up beaches often find straws, bottle caps, and bags among the most common pieces of trash. Some people believe that if these items were not sold near the beach, far less of them would end up in the ocean.' },
        { title: 'Not So Simple', text: 'Some people say that bans are not the best answer. Certain people with disabilities need bendable plastic straws to drink safely, and paper straws can fall apart. Store owners point out that paper bags and sturdy reusable bags cost more to make. Others argue that it is better to teach people to throw trash away, to recycle, and to add more trash cans at the beach, instead of banning things that many people use responsibly. Some towns choose a middle path and charge a small fee for each bag instead of banning them.' }
      ]
    },
    {
      id: 'everglades', mode: 'expository', organizer: 'TIDE',
      prompt: 'Write an essay explaining why the Everglades is important and how alligators help other animals there. Use information from both passages.',
      passages: [
        { title: 'A River of Grass', text: 'The Everglades is a huge wetland in South Florida. Water flows slowly south from the Lake Okeechobee area toward Florida Bay, spreading out across miles of tall sawgrass. Because the water is wide, shallow, and slow, the writer Marjory Stoneman Douglas called the Everglades a “river of grass.” The Everglades is home to many animals, including wading birds, turtles, fish, and alligators. The water that soaks into the ground there also helps supply fresh drinking water to millions of Floridians.' },
        { title: 'Gator Holes', text: 'During the dry season, which lasts from about December to May, much of the Everglades dries out. American alligators use their bodies and tails to clear out low spots, making pools called gator holes. These holes keep water even when the land around them is dry. Fish, turtles, snails, and birds gather at gator holes to survive until the rains return. Without alligators, many of these animals would have a much harder time making it through the dry months. That is one reason scientists call the alligator a keystone species.' }
      ]
    },
    {
      id: 'recess', mode: 'argument', organizer: 'TREE',
      prompt: 'Should elementary students get more recess time? Write an essay giving your opinion. Use information from both passages.',
      passages: [
        { title: 'Room to Move', text: 'Many doctors and teachers say that children need time to move during the school day. The American Academy of Pediatrics, a group of children’s doctors, has called recess an important part of a child’s growth. Playing outside gives students a break from sitting still. After a break, many students find it easier to pay attention in class. Recess also gives kids time to make friends, take turns, solve problems, and invent games together. Some teachers say their classes are calmer and more focused on days with a longer recess.' },
        { title: 'Only So Many Hours', text: 'A school day has only so many hours. Florida law already requires elementary schools to give students at least 100 minutes of free-play recess each week, which is usually 20 minutes a day. Some teachers worry that adding more recess would mean less time for reading, math, science, and art. On very hot or stormy days, recess may have to move indoors, where there is less room to run. Some schools add short movement breaks inside the classroom instead, which take only a few minutes and keep students learning.' }
      ]
    }
  ],

  /* ---------------------------------------------------------------------
     4) WORD-PROBLEM SCHEMAS (Fuchs/Jitendra style) — MA.5.NSO.2, MA.5.FR.2, MA.5.AR.1
     `ans` is numeric (fractions as mixed-number strings in `ansText`).
  --------------------------------------------------------------------- */
  schemas: [
    { id: 'total', name: 'Total', kid: 'Parts put together make a total.', eq: 'P1 + P2 = T', clue: 'in all, altogether, total, combined, how much farther to finish',
      ex: [
        { q: 'The critter rescue center used 48.6 pounds of lettuce on Monday and 53.75 pounds on Tuesday. How many pounds did it use in all?', ans: 102.35, ansText: '102.35 pounds', eqn: '48.6 + 53.75 = T', std: 'MA.5.NSO.2.3' },
        { q: 'Otter’s class picked up 2 3/4 bags of beach trash in the morning and 1 2/3 bags in the afternoon. How many bags did they pick up altogether?', ans: 4 + 5 / 12, ansText: '4 5/12 bags', eqn: '2 3/4 + 1 2/3 = T', std: 'MA.5.FR.2.1' },
        { q: 'A nature trail is 4.5 miles long. Fox has already walked 2.75 miles. How many more miles does Fox need to walk to finish the trail?', ans: 1.75, ansText: '1.75 miles', eqn: '2.75 + P2 = 4.5', std: 'MA.5.NSO.2.3' }
      ] },
    { id: 'difference', name: 'Difference', kid: 'Compare a bigger amount and a smaller amount. The gap is the difference.', eq: 'B − s = D', clue: 'how much more, how much less, how much longer, heavier, farther',
      ex: [
        { q: 'A loggerhead sea turtle weighs 250.5 pounds. A green sea turtle weighs 312.8 pounds. How much heavier is the green sea turtle?', ans: 62.3, ansText: '62.3 pounds', eqn: '312.8 − 250.5 = D', std: 'MA.5.NSO.2.3' },
        { q: 'Otter swam 3/4 of a mile. Fox swam 1/3 of a mile. How much farther did Otter swim than Fox?', ans: 5 / 12, ansText: '5/12 mile', eqn: '3/4 − 1/3 = D', std: 'MA.5.FR.2.1' },
        { q: 'A young alligator is 2.35 meters long. A crocodile is 1.8 meters longer than the alligator. How long is the crocodile?', ans: 4.15, ansText: '4.15 meters', eqn: 'B − 2.35 = 1.8', std: 'MA.5.NSO.2.3' }
      ] },
    { id: 'change', name: 'Change', kid: 'Start with an amount, something changes (more or less), and you end with a new amount.', eq: 'S ± C = E', clue: 'had, then, got more, gave away, left, now',
      ex: [
        { q: 'An aquarium tank held 125.5 liters of water. Then 38.25 liters leaked out. How much water is in the tank now?', ans: 87.25, ansText: '87.25 liters', eqn: '125.5 − 38.25 = E', std: 'MA.5.NSO.2.3' },
        { q: 'Flamingo had 5 1/2 cups of shrimp food. Then she got 2 3/4 more cups. How many cups does she have now?', ans: 8.25, ansText: '8 1/4 cups', eqn: '5 1/2 + 2 3/4 = E', std: 'MA.5.FR.2.1' },
        { q: 'A tide pool had 1,248 snails in June. By August it had 2,006 snails. How many snails were added?', ans: 758, ansText: '758 snails', eqn: '1,248 + C = 2,006', std: 'MA.5.NSO.2.1' }
      ] },
    { id: 'equal-groups', name: 'Equal Groups', kid: 'Groups that are all the same size.', eq: 'groups × per group = total', clue: 'each, every, per, equally, shared',
      ex: [
        { q: 'The library has 24 shelves. Each shelf holds 36 books. How many books can the shelves hold?', ans: 864, ansText: '864 books', eqn: '24 × 36 = T', std: 'MA.5.NSO.2.1' },
        { q: 'The rescue center splits 1,512 fish equally into 28 buckets. How many fish go in each bucket?', ans: 54, ansText: '54 fish', eqn: '28 × n = 1,512', std: 'MA.5.NSO.2.2' },
        { q: 'Each of 6 bird feeders holds 2/3 cup of seeds. How many cups of seeds are needed to fill all 6 feeders?', ans: 4, ansText: '4 cups', eqn: '6 × 2/3 = T', std: 'MA.5.FR.2.2' }
      ] },
    { id: 'compare-times', name: 'Times as Many', kid: 'One amount is a number of times as big (or a fraction as big) as another.', eq: 'set × times = product', clue: 'times as many, times as long, half as much, 1/3 as far',
      ex: [
        { q: 'A baby dolphin is 1.2 meters long. An adult dolphin is 2.5 times as long. How long is the adult dolphin?', ans: 3, ansText: '3 meters', eqn: '1.2 × 2.5 = P', std: 'MA.5.NSO.2.4' },
        { q: 'Panther walked 15 miles. Raccoon walked 1/3 as far as Panther. How far did Raccoon walk?', ans: 5, ansText: '5 miles', eqn: '1/3 × 15 = P', std: 'MA.5.FR.2.2' },
        { q: 'Bear ate 84 berries. Fox ate 12 berries. Bear ate how many times as many berries as Fox?', ans: 7, ansText: '7 times as many', eqn: '12 × t = 84', std: 'MA.5.NSO.2.2' }
      ] },
    { id: 'multi-step', name: 'Two Steps', kid: 'Find a hidden answer first, then use it.', eq: 'step 1 → step 2', clue: 'look for two questions hiding in one',
      ex: [
        { q: 'Aquarium tickets cost $12.50 for adults and $8.75 for kids. How much do tickets cost for 1 adult and 3 kids?', ans: 38.75, ansText: '$38.75', eqn: '3 × 8.75 = 26.25; 12.50 + 26.25 = 38.75', std: 'MA.5.NSO.2.3, MA.5.NSO.2.4' },
        { q: 'The class had $50. They bought 4 packs of seeds for $3.25 each. How much money is left?', ans: 37, ansText: '$37.00', eqn: '4 × 3.25 = 13; 50 − 13 = 37', std: 'MA.5.NSO.2.3, MA.5.NSO.2.4' },
        { q: 'A garden is a rectangle 8 1/2 feet long and 4 feet wide. Tomatoes fill half of the garden. How many square feet are tomatoes?', ans: 17, ansText: '17 square feet', eqn: '8 1/2 × 4 = 34; 34 ÷ 2 = 17', std: 'MA.5.FR.2.2, MA.5.GR.2.1' }
      ] }
  ],

  /* ---------------------------------------------------------------------
     5) GRADE 1 DECODABLE STORIES (ELA.1.F.1.3, ELA.1.F.1.4)
     Every word is either (a) decodable with the target pattern or an earlier one,
     or (b) listed in `heart` (or `hf`: high-frequency words pre-taught as whole words).
     Names Zap/Rex are decodable (CVC; x = /ks/). Floss doubles (ll, ss, ff) count as taught with CVC.
  --------------------------------------------------------------------- */
  stories: [
    { id: 1, pattern: 'CVC short a, i', title: 'Zap and the Cat', heart: ['the', 'a', 'is', 'has', 'his'],
      text: 'Zap has a tan cap. A fat cat ran at Zap. The cat bit the cap! Zap is mad. Zap can tap the cat. Tap, tap! The cat hid in a bin. Zap sat. Zap had a nap in his cap.' },
    { id: 2, pattern: 'CVC short o, u (+ a, i)', title: 'The Bug in the Pod', heart: ['the', 'a', 'is', 'to', 'of'],
      text: 'A bug sat in a pod. The bug can hop. Hop, hop, hop! It hops to the top of a big pot. The pot is hot! The bug hops in a tub of mud. Rub, rub, rub. The bug is a mud bug. It is fun!' },
    { id: 3, pattern: 'CVC short e (+ all short vowels)', title: 'The Red Jet', heart: ['the', 'a', 'is', 'has', 'to', 'said', 'was'],
      text: 'Rex has a red jet. Zap gets in. Rex gets in. "Get set!" said Rex. The jet can zip. Up, up, up! It zips to the sun. The sun is hot. Rex gets wet. Zap gets wet. Rex was not sad. "Yes! The jet is a hit!" said Zap.' },
    { id: 4, pattern: 'digraphs sh, ch, th', title: 'Fish on the Ship', heart: ['the', 'a', 'is', 'has', 'said'],
      text: 'Rex has a ship. Rex sets a fish in a dish on the ship. Chug, chug! Then the ship hits a moth. Thud! The dish tips. The fish is on the rug! Rex gets the fish. "Shh. Such a chum!" said Rex. Then Rex chats with the fish.' },
    { id: 5, pattern: 'digraphs ck, wh, ng', title: 'The Sock on the Rock', heart: ['the', 'a', 'was', 'said', 'is', 'of'],
      text: 'Zap had a sock. The sock was on a rock. Whack! A duck hit the rock. The sock is in the mud. "Which duck did that?" said Zap. The duck sang a long song. Zap got the sock back. The duck was a pal of Zap.' },
    { id: 6, pattern: 'initial blends (fr, cr, st, sn, fl, pl)', title: 'Crab and Frog', heart: ['a', 'the', 'said', 'do', 'me', 'I'], hf: ['and'],
      text: 'A crab and a frog sit on a flat rock. The frog can flip. The crab can snap. Snap, snap! "Stop!" said the frog. "Do not snap at me!" The crab did stop. "I am glad," said the frog. Plop! The frog swam and the crab sat.' },
    { id: 7, pattern: 'final blends (-mp, -nt, -nd, -st, -lt, -sk, -pt)', title: 'Rex at Camp', heart: ['the', 'a', 'to', 'of', 'he', 'so'],
      text: 'Rex went to camp. Rex had a tent and a lamp. At dusk, a big wind hit the tent. The tent bent! Rex held the tent. He did not stop. At last the wind did stop. The rest of the camp slept, and so did Rex.' },
    { id: 8, pattern: 'silent e: a_e, i_e', title: 'Zap Makes a Kite', heart: ['the', 'a', 'to', 'was', 'said', 'I', 'is'],
      text: 'Zap made a kite. It was white with a red stripe. Up went the kite! "It is a fine kite!" said Zap. Then the kite hit a pine. Zap gave the pine a shake. The kite came back to Zap. "I like this kite," said Zap.' },
    { id: 9, pattern: 'silent e: o_e, u_e (+ a_e, i_e)', title: 'The Dome', heart: ['the', 'a', 'to', 'I', 'said', 'put', 'you', 'is', 'has', 'of'],
      text: 'Rex has a dome. Then a hole broke the dome! Zap rode to the dome with a tube of paste. "I will fix the hole!" said Zap. Zap put paste on the hole. Rex got a rope to help. The dome is safe. "You rule!" said Rex.' },
    { id: 10, pattern: 'vowel teams ee, ea', title: 'Snack by the Sea', heart: ['the', 'a', 'said', 'to', 'his', 'was', 'of', 'from'],
      text: 'Rex can see the sea from his seat. "Let us eat!" said Zap. Zap had a green bean and a peach. Rex had a heap of meat. Then a seal came up to the jet. The seal was sweet. Rex gave the seal a treat. The seal did a leap!' },
    { id: 11, pattern: 'vowel teams ai, ay', title: 'A Rainy Day', heart: ['the', 'a', 'said', 'we', 'they'],
      text: 'Zap and Rex play on a gray day. Rain hits the train. "Wait!" said Zap. "We may get wet." They stay in the train. They paint a snail. Zap paints a red tail on the snail. Rex paints a gray trail. Then the rain stops. Yay!' },
    { id: 12, pattern: 'vowel teams oa, ow (long o) + review', title: 'The Toad in the Boat', heart: ['the', 'a', 'I', 'they', 'is', 'has'],
      text: 'Rex has a red boat. Rex rows the boat on the moat. A toad sits on a log. The toad croaks. "Can I get a tow?" Rex lets the toad in. The boat is slow, but it floats. Rex and the toad row home, and they eat toast.' }
  ],

  /* ---------------------------------------------------------------------
     6a) ELKONIN SOUND BOXES — one box per phoneme; `gr` = grapheme in each box
  --------------------------------------------------------------------- */
  elkonin: [
    { w: 'sun',    gr: ['s', 'u', 'n'] },
    { w: 'cat',    gr: ['c', 'a', 't'] },
    { w: 'dog',    gr: ['d', 'o', 'g'] },
    { w: 'bed',    gr: ['b', 'e', 'd'] },
    { w: 'pig',    gr: ['p', 'i', 'g'] },
    { w: 'map',    gr: ['m', 'a', 'p'] },
    { w: 'web',    gr: ['w', 'e', 'b'] },
    { w: 'rug',    gr: ['r', 'u', 'g'] },
    { w: 'ship',   gr: ['sh', 'i', 'p'] },
    { w: 'fish',   gr: ['f', 'i', 'sh'] },
    { w: 'chin',   gr: ['ch', 'i', 'n'] },
    { w: 'duck',   gr: ['d', 'u', 'ck'] },
    { w: 'moth',   gr: ['m', 'o', 'th'] },
    { w: 'bell',   gr: ['b', 'e', 'll'] },
    { w: 'frog',   gr: ['f', 'r', 'o', 'g'] },
    { w: 'stop',   gr: ['s', 't', 'o', 'p'] },
    { w: 'clap',   gr: ['c', 'l', 'a', 'p'] },
    { w: 'crab',   gr: ['c', 'r', 'a', 'b'] },
    { w: 'jump',   gr: ['j', 'u', 'm', 'p'] },
    { w: 'hand',   gr: ['h', 'a', 'n', 'd'] },
    { w: 'nest',   gr: ['n', 'e', 's', 't'] },
    { w: 'tent',   gr: ['t', 'e', 'n', 't'] },
    { w: 'milk',   gr: ['m', 'i', 'l', 'k'] },
    { w: 'stamp',  gr: ['s', 't', 'a', 'm', 'p'] },
    { w: 'blend',  gr: ['b', 'l', 'e', 'n', 'd'] },
    { w: 'crust',  gr: ['c', 'r', 'u', 's', 't'] },
    { w: 'cake',   gr: ['c', 'a_e', 'k'], note: 'a_e is one sound in one box; the e is silent' },
    { w: 'bike',   gr: ['b', 'i_e', 'k'], note: 'i_e is one sound' },
    { w: 'rope',   gr: ['r', 'o_e', 'p'], note: 'o_e is one sound' },
    { w: 'feet',   gr: ['f', 'ee', 't'] }
  ],

  /* 6b) WORD CHAINS — each step changes exactly ONE sound (grapheme slot) */
  chains: [
    { focus: 'short a, final', words: ['cat', 'cap', 'can', 'cab', 'tab'] },
    { focus: 'mixed CVC', words: ['cat', 'cap', 'map', 'mop', 'top', 'tip'] },
    { focus: 'short i/a vowel', words: ['sit', 'sat', 'pat', 'pit', 'pin', 'pan'] },
    { focus: 'short o/u', words: ['hot', 'hut', 'nut', 'not', 'nod', 'rod'] },
    { focus: 'short e', words: ['bed', 'bad', 'bid', 'lid', 'led', 'let'] },
    { focus: 'all short vowels', words: ['big', 'bag', 'beg', 'bug', 'rug', 'rag'] },
    { focus: 'initial sounds', words: ['sun', 'fun', 'run', 'bun', 'bud', 'mud'] },
    { focus: 'digraphs', words: ['ship', 'shop', 'chop', 'chip', 'chin', 'thin'] },
    { focus: 'digraph ck', words: ['back', 'pack', 'pick', 'sick', 'sock', 'rock'] },
    { focus: 'digraph th/sh', words: ['bath', 'math', 'mash', 'cash', 'dash', 'dish'] },
    { focus: 'digraph wh/ch', words: ['whip', 'chip', 'chop', 'chap', 'chat', 'that'] },
    { focus: 'initial blends', words: ['lip', 'slip', 'slap', 'flap', 'flip', 'clip'] },
    { focus: 'initial blends', words: ['rip', 'drip', 'trip', 'trap', 'tram', 'trim'] },
    { focus: 'final blends', words: ['bet', 'best', 'nest', 'vest', 'vet', 'wet'] },
    { focus: 'final blends', words: ['lap', 'lamp', 'camp', 'cap', 'cup', 'pup'] },
    { focus: 'silent e (add/remove e)', words: ['tap', 'tape', 'cape', 'cap', 'cop', 'cope'] },
    { focus: 'silent e i_e', words: ['pin', 'pine', 'line', 'lime', 'time', 'tame'] },
    { focus: 'silent e o_e/u_e', words: ['hop', 'hope', 'rope', 'robe', 'rob', 'rub', 'cub', 'cube'] },
    { focus: 'vowel team ee', words: ['see', 'seed', 'feed', 'feel', 'peel', 'peek', 'week'] },
    { focus: 'vowel team ai + blends', words: ['rain', 'pain', 'paint', 'pant', 'plant', 'plan'] }
  ],

  /* ---------------------------------------------------------------------
     7) HEART WORDS (first ~40, in teaching order). `heart` = the part to learn "by heart"
        (letters that don't follow patterns he knows yet). `flash` = temporary heart word:
        it becomes decodable once the pattern is taught (e.g., open syllables, y as /ī/).
  --------------------------------------------------------------------- */
  heartWords: [
    { w: 'the',    heart: 'e',    why: 'e says /u/ (uh)' },
    { w: 'a',      heart: 'a',    why: 'a usually says /u/ (uh) when alone' },
    { w: 'I',      heart: 'I',    why: 'always a capital; says its name /ī/' },
    { w: 'is',     heart: 's',    why: 's says /z/' },
    { w: 'his',    heart: 's',    why: 's says /z/' },
    { w: 'has',    heart: 's',    why: 's says /z/' },
    { w: 'as',     heart: 's',    why: 's says /z/' },
    { w: 'to',     heart: 'o',    why: 'o says /oo/' },
    { w: 'do',     heart: 'o',    why: 'o says /oo/' },
    { w: 'into',   heart: 'o',    why: 'last o says /oo/ (in + to)' },
    { w: 'of',     heart: 'of',   why: 'o says /u/ and f says /v/' },
    { w: 'was',    heart: 'as',   why: 'a says /u/ and s says /z/' },
    { w: 'said',   heart: 'ai',   why: 'ai says /ĕ/ (short e)' },
    { w: 'says',   heart: 'ay',   why: 'ay says /ĕ/ and s says /z/' },
    { w: 'you',    heart: 'ou',   why: 'ou says /oo/' },
    { w: 'your',   heart: 'our',  why: 'our says /or/' },
    { w: 'are',    heart: 'e',    why: 'the e is silent and does not change the a; "ar" says /ar/' },
    { w: 'they',   heart: 'ey',   why: 'ey says /ā/' },
    { w: 'one',    heart: 'one',  why: 'says /wun/: the whole word is irregular' },
    { w: 'two',    heart: 'wo',   why: 'w is silent and o says /oo/' },
    { w: 'once',   heart: 'once', why: 'says /wuns/: the whole word is irregular' },
    { w: 'what',   heart: 'a',    why: 'a says /u/' },
    { w: 'want',   heart: 'a',    why: 'a says /o/ or /u/' },
    { w: 'from',   heart: 'o',    why: 'o says /u/' },
    { w: 'some',   heart: 'o_e',  why: 'o says /u/; the e is silent and does not make o long' },
    { w: 'come',   heart: 'o_e',  why: 'o says /u/; the e is silent and does not make o long' },
    { w: 'have',   heart: 'e',    why: 'English words don’t end in v, so e is added; a stays short' },
    { w: 'give',   heart: 'e',    why: 'English words don’t end in v, so e is added; i stays short' },
    { w: 'live',   heart: 'e',    why: 'English words don’t end in v, so e is added; i stays short' },
    { w: 'love',   heart: 'o',    why: 'o says /u/; e added because words don’t end in v' },
    { w: 'put',    heart: 'u',    why: 'u says /oo/ as in book' },
    { w: 'who',    heart: 'who',  why: 'wh says /h/ and o says /oo/' },
    { w: 'where',  heart: 'ere',  why: 'ere says /air/' },
    { w: 'there',  heart: 'ere',  why: 'ere says /air/' },
    { w: 'were',   heart: 'ere',  why: 'ere says /er/' },
    { w: 'could',  heart: 'oul',  why: 'oul says /oo/ as in book; l is silent' },
    { w: 'would',  heart: 'oul',  why: 'oul says /oo/ as in book; l is silent' },
    { w: 'does',   heart: 'oe',   why: 'oe says /u/ and s says /z/' },
    { w: 'he',     heart: 'e',    why: 'e says its name', flash: true },
    { w: 'she',    heart: 'e',    why: 'e says its name', flash: true },
    { w: 'we',     heart: 'e',    why: 'e says its name', flash: true },
    { w: 'me',     heart: 'e',    why: 'e says its name', flash: true },
    { w: 'go',     heart: 'o',    why: 'o says its name', flash: true },
    { w: 'no',     heart: 'o',    why: 'o says its name', flash: true },
    { w: 'my',     heart: 'y',    why: 'y says /ī/', flash: true },
    { w: 'by',     heart: 'y',    why: 'y says /ī/', flash: true },
    { w: 'so',     heart: 'o',    why: 'o says its name', flash: true }
  ]
};
if (typeof module !== 'undefined') module.exports = EDU;
