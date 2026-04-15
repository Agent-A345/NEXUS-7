// ===== NEXUS-7: DARK CHOICES =====
// A horror/sci-fi interactive story game

'use strict';

// ===== STORY DATA =====
// Each scene: { id, tag, text, npc, bg, effect, choices, statEffects, requires, giveItem }
// choices: [{ text, next, statCheck, statType, failNext, requireItem, removeItem, dynamicText }]
// endings: scenes with no choices

const STORY = {

  start: {
    tag: "SECTOR 7 — DORMITORY WING",
    text: "You open your eyes. The ceiling above you is cracked concrete, lit by a single emergency light that pulses red every three seconds. Your head is throbbing. You're lying on a metal cot, still dressed, a dried trickle of blood on your temple.\n\nThe room smells like antiseptic and something else — copper, maybe. Or fear. Your name badge reads: [PLAYER]. CLEARANCE LEVEL: RESTRICTED.\n\nA heavy steel door stands to your left. A ventilation grate in the floor is loose — barely.",
    bg: "scene-dark flicker",
    choices: [
      { text: "Force open the steel door", next: "corridor_a", statMod: { health: -10 } },
      { text: "Crawl through the ventilation grate", next: "vents", statMod: { intel: +10 } },
      { text: "Search the room first", next: "search_room" }
    ]
  },

  search_room: {
    tag: "SECTOR 7 — DORMITORY WING",
    text: "You move carefully around the dim room. Under the cot mattress: a crumpled maintenance keycard, half its magnetic strip scraped off, but maybe still useful.\n\nA shattered mirror on the wall shows your reflection — you look terrible. On the back of a torn photo pinned above the cot, scrawled in red ink: 'DON'T TRUST DR. VASQUEZ. SHE KNOWS WHAT SHE DID.'\n\nThe photo shows two people smiling in a sunlit courtyard. One is you. You don't remember the other person.",
    bg: "scene-dark flicker",
    giveItem: "Maintenance Keycard",
    choices: [
      { text: "Take the keycard and try the steel door", next: "corridor_a", statMod: { intel: +5 } },
      { text: "Take the keycard and use the ventilation grate", next: "vents", statMod: { intel: +10 } }
    ]
  },

  vents: {
    tag: "VENTILATION SYSTEM — B-LEVEL",
    text: "The grate comes free with a metallic shriek. You drop into a low crawl tunnel. The air is thick and warm, carrying distant sounds — a rhythmic beeping, what might be crying, and underneath it all, a sound you can't quite name.\n\nThe tunnel splits ahead. Red emergency lights paint everything the colour of old blood. A data chip lies wedged against the duct wall — NEXUS RESEARCH: SUBJECT LOG 44-C.",
    bg: "scene-lab",
    giveItem: "Data Chip 44-C",
    choices: [
      { text: "Take the LEFT tunnel — toward the sound", next: "lab_entrance", statMod: { trust: -5 } },
      { text: "Take the RIGHT tunnel — away from it", next: "generator_room" },
      { text: "Plug the data chip into the vent terminal (INT check)", next: "data_chip_read", statCheck: { stat: "intel", min: 40 }, failNext: "data_chip_fail" }
    ]
  },

  data_chip_read: {
    tag: "VENTILATION SYSTEM — DATA NODE",
    text: "Your fingers find a small terminal interface embedded in the duct wall — standard NEXUS architecture. The chip slides in with a click.\n\nText scrolls fast: '...SUBJECT 44-C: COGNITIVE AUGMENTATION SUCCESSFUL. SIDE EFFECTS: PARTIAL AMNESIA, ENHANCED PATTERN RECOGNITION, SUSCEPTIBILITY TO SUGGESTION...\n\n...SUBJECT UNAWARE OF PROCEDURE. MAINTAIN COVER. DR. VASQUEZ APPROVED...'\n\nYour stomach drops. You are Subject 44-C.",
    bg: "scene-lab",
    statMod: { intel: +20, trust: -15 },
    choices: [
      { text: "Press on — toward the lab", next: "lab_entrance" },
      { text: "Take the other tunnel — find a way out", next: "generator_room" }
    ]
  },

  data_chip_fail: {
    tag: "VENTILATION SYSTEM — DATA NODE",
    text: "There's a terminal in the wall but the interface is locked — too complex. You can't make sense of the chip. You pocket it anyway.\n\nSomething skitters through the duct behind you. Fast and deliberate, like it knows where you are.",
    bg: "scene-dark flicker",
    statMod: { health: -10 },
    choices: [
      { text: "RUN — toward the lab wing", next: "lab_entrance" },
      { text: "RUN — toward the generator", next: "generator_room" }
    ]
  },

  corridor_a: {
    tag: "SECTOR 7 — MAIN CORRIDOR",
    text: "The corridor stretches in both directions, emergency lights casting long shadows. The floor is streaked with something dark — drag marks leading toward the east wing.\n\nA figure slumps against the wall ahead: a security guard, breathing but unconscious. His radio crackles with static and then a voice cuts through: '—anyone in Sector 7, facility lockdown is in effect. All personnel to sublevel 3. This is not a drill.'",
    bg: "scene-corridor",
    npc: { name: "Unknown Voice (Radio)", text: "Anyone still up there... don't come down here. Whatever you do. It's not worth it." },
    choices: [
      { text: "Take the guard's keycard and go EAST (toward labs)", next: "lab_entrance", giveItem: "Security Keycard" },
      { text: "Try to wake the guard and get answers", next: "wake_guard", statMod: { trust: +10 } },
      { text: "Go WEST — toward the exit signs", next: "exit_corridor" }
    ]
  },

  wake_guard: {
    tag: "SECTOR 7 — MAIN CORRIDOR",
    text: "You shake the guard. He gasps and grabs your wrist with surprising strength, eyes wide and glassy.\n\n'They let it out,' he rasps. 'The thing from Sub-3. It's learning. Oh god, it's been learning for months and none of us—' He trails off, head lolling. His badge reads: CHEN, R.\n\nHe presses his keycard into your palm and goes still.",
    bg: "scene-corridor",
    npc: { name: "Guard Chen", text: "Find Dr. Vasquez. She has the shutdown codes. Only way out is through. I'm sorry... I'm so sorry." },
    giveItem: "Security Keycard",
    statMod: { trust: -10, intel: +10 },
    choices: [
      { text: "Go east — find Dr. Vasquez", next: "lab_entrance" },
      { text: "Go west — just try to escape", next: "exit_corridor" }
    ]
  },

  generator_room: {
    tag: "SECTOR 7 — POWER PLANT",
    text: "Massive turbine generators hum at a subsonic frequency you feel in your chest. The room is hot, reeking of ozone and oil. One generator is sparking intermittently.\n\nA technician's workbench holds tools, and crucially — a facility schematic pinned to the wall. You study it. Sublevel 3 is sealed. But there's a maintenance shaft from here that bypasses the main lockdown...\n\nAnd a fail-safe switch. Red. Sealed behind a glass panel. 'EMERGENCY POWER CUT — ALL SECTORS.'",
    bg: "scene-lab",
    giveItem: "Facility Schematic",
    choices: [
      { text: "Take the maintenance shaft to Sub-3", next: "sublevel_3", statMod: { intel: +10 } },
      { text: "Break the glass and throw the switch (low health: risky)", next: "power_cut", statCheck: { stat: "health", min: 50 }, failNext: "power_cut_hurt" },
      { text: "Go back and find the lab wing", next: "lab_entrance" }
    ]
  },

  power_cut: {
    tag: "SECTOR 7 — POWER PLANT",
    text: "Your elbow shatters the glass. The alarm joins the chaos already echoing through the facility. You throw the switch.\n\nDarkness. Complete, absolute darkness. The generators wind down to nothing. Emergency batteries kick in — dim red strips along the floor only.\n\nSomewhere in the dark, something shrieks. Then silence. Then: footsteps. Running toward you.",
    bg: "scene-danger pulse-danger",
    statMod: { health: -15 },
    choices: [
      { text: "Run toward Sublevel 3 (use schematic)", next: "sublevel_3", requireItem: "Facility Schematic" },
      { text: "Run toward the exits", next: "exit_corridor" },
      { text: "Hide behind the generators", next: "hide_generator" }
    ]
  },

  power_cut_hurt: {
    tag: "SECTOR 7 — POWER PLANT",
    text: "You're too weak. The glass resists you, and in struggling, you slice your hand badly. The blood drips dark onto the concrete floor.\n\nYou pull back, lightheaded. The schematic on the wall shows another route through the lab wing.",
    bg: "scene-danger",
    statMod: { health: -20 },
    choices: [
      { text: "Push through the pain — go to the lab wing", next: "lab_entrance" },
      { text: "Rest here and bind the wound first", next: "bind_wound" }
    ]
  },

  bind_wound: {
    tag: "SECTOR 7 — POWER PLANT",
    text: "You tear a strip from your sleeve and bind the cut tightly. It helps. The lightheadedness fades to a manageable hum.\n\nYou sit for a moment in the hot generator room. The facility sounds have changed — the alarms have gone to a lower frequency. Something has changed outside.",
    bg: "scene-lab",
    statMod: { health: +15 },
    choices: [
      { text: "Go to the lab wing — find Dr. Vasquez", next: "lab_entrance" },
      { text: "Check the maintenance shaft", next: "sublevel_3" }
    ]
  },

  hide_generator: {
    tag: "SECTOR 7 — POWER PLANT",
    text: "You press yourself flat behind the largest generator, barely breathing. The footsteps enter the room and slow.\n\nThrough a gap you see it: tall, bipedal but wrong. Joints that bend too many ways. It stops in the centre of the room and tilts its head — which is facing the wrong direction.\n\nThen it walks toward Sublevel 3 and is gone.\n\nYou wait an eternity before moving.",
    bg: "scene-danger",
    statMod: { intel: +10, health: -5 },
    choices: [
      { text: "Follow it — toward Sublevel 3", next: "sublevel_3" },
      { text: "Run the opposite way — lab wing", next: "lab_entrance" }
    ]
  },

  lab_entrance: {
    tag: "RESEARCH WING — LEVEL 2",
    text: "The lab entrance is a heavy airlock door — NEXUS BIOTECH stencilled above it in faded letters. The card reader glows amber.\n\nThrough the reinforced glass panel you can see the lab beyond: benches overturned, papers and specimen jars scattered. A woman in a lab coat crouches behind a workbench, very still, watching the door on the far side of the room.",
    bg: "scene-lab",
    choices: [
      { text: "Use Security Keycard to enter", next: "lab_inner", requireItem: "Security Keycard" },
      { text: "Use Maintenance Keycard to bypass the lock", next: "lab_inner", requireItem: "Maintenance Keycard" },
      { text: "Bang on the glass to get her attention", next: "vasquez_first_contact", statMod: { trust: +5 } },
      { text: "Watch and wait — observe the room (INT check)", next: "lab_observe", statCheck: { stat: "intel", min: 55 }, failNext: "lab_observe_fail" }
    ]
  },

  lab_observe: {
    tag: "RESEARCH WING — OBSERVATION",
    text: "You study the room carefully. The woman isn't just hiding — she's watching a specific door. The door to Sub-3 Access.\n\nMore crucially: in the far corner, you see it. A terminal. Still powered. And on its screen, cycling text: SHUTDOWN PROTOCOL — AUTHORIZATION REQUIRED.\n\nAlso: there are two of her. One behind the workbench. One standing in the shadow by the terminal. They are both perfectly still. One of them is not human.",
    bg: "scene-lab",
    statMod: { intel: +15, trust: -10 },
    choices: [
      { text: "Use a keycard to enter — go for the terminal directly", next: "lab_terminal", requireItem: "Security Keycard" },
      { text: "Use a keycard to enter — go for the terminal directly", next: "lab_terminal", requireItem: "Maintenance Keycard" },
      { text: "Find another route — maintenance shaft to terminal", next: "lab_terminal_shaft", requireItem: "Facility Schematic" }
    ]
  },

  lab_observe_fail: {
    tag: "RESEARCH WING — OBSERVATION",
    text: "You try to make sense of the room but your head is still clouded. You miss something — you're sure of it — but you can't say what.\n\nThe woman behind the workbench finally sees you. Her expression is relief and terror in equal measure. She beckons you frantically.",
    bg: "scene-lab",
    choices: [
      { text: "Use a keycard to enter", next: "vasquez_first_contact", requireItem: "Security Keycard" },
      { text: "Use a keycard to enter", next: "vasquez_first_contact", requireItem: "Maintenance Keycard" }
    ]
  },

  vasquez_first_contact: {
    tag: "RESEARCH WING — LEVEL 2",
    text: "She's Dr. Elena Vasquez — her badge confirms it, and the note on the cot surface in your memory confirms something else. She looks at you with an expression you can't read: guilt, relief, calculation.\n\n'I didn't think you'd still be...' She stops. 'The procedure. I know you know. The chip, the amnesia — it was necessary, I swear to you it was necessary. There's no time to explain properly. We need to get to the terminal and use the shutdown codes. Before it reaches the surface.'",
    bg: "scene-lab",
    npc: { name: "DR. ELENA VASQUEZ", text: "'Trust me or don't. But if you want to survive tonight, we're going to have to work together. Whatever you think of me.'" },
    statMod: { trust: -5 },
    choices: [
      { text: "Trust her — go with Vasquez to the terminal", next: "lab_terminal", statMod: { trust: +15 } },
      { text: "Demand answers first — why did she do the procedure?", next: "vasquez_explains", statMod: { intel: +10 } },
      { text: "Don't trust her — find the terminal alone", next: "lab_terminal_shaft", requireItem: "Facility Schematic" }
    ]
  },

  vasquez_explains: {
    tag: "RESEARCH WING — LEVEL 2",
    text: "'The entity in Sub-3 — we made it. Or rather, it made itself, from the raw material we provided.' Vasquez speaks quickly, eyes darting to the Sub-3 door. 'It's a cognitive mirror. It reads minds. Learns you. Becomes... plausible. The augmentation I gave you — it makes you partially resistant. Opaque to it.'\n\nShe meets your eyes. 'I didn't ask you. I know. I needed a resistant subject and you were the best candidate. I'm sorry. I am genuinely sorry. But right now that augmentation is the only reason you're still thinking for yourself.'",
    bg: "scene-lab",
    npc: { name: "DR. ELENA VASQUEZ", text: "'Forgive me later if you want to. Right now just... help me end this.'" },
    statMod: { intel: +20, trust: +10 },
    choices: [
      { text: "Go with Vasquez to the terminal", next: "lab_terminal", statMod: { trust: +10 } },
      { text: "Go alone — you don't need her", next: "lab_terminal_solo" }
    ]
  },

  lab_inner: {
    tag: "RESEARCH WING — INTERIOR",
    text: "Inside the lab, glass crunches underfoot. The air is different here — colder, sterile even through the destruction. Dr. Vasquez looks up from behind the workbench and the relief on her face is unmistakable.\n\n'You found me,' she breathes. 'I wasn't sure... the subject logs said you'd be confused. The amnesia—'\n\nA sound from the Sub-3 door. Both of you freeze.",
    bg: "scene-lab flicker",
    npc: { name: "DR. ELENA VASQUEZ", text: "'Don't look at the shadow by the terminal. It's not me. Whatever it says, whatever it looks like — it is not me.'" },
    statMod: { intel: +10 },
    choices: [
      { text: "Look at the shadow anyway (ignoring her warning)", next: "encounter_double", statMod: { trust: -10 } },
      { text: "Keep eyes on Vasquez and move toward the terminal", next: "lab_terminal", statMod: { trust: +10 } },
      { text: "Back toward the exit — this is a trap", next: "lab_trap_avoided", statMod: { intel: +5 } }
    ]
  },

  encounter_double: {
    tag: "RESEARCH WING — INTERIOR",
    text: "The shadow moves. It steps into the red light and it's Vasquez — perfectly, impossibly Vasquez, except the shadows fall wrong and its eyes don't track the way eyes should.\n\n'Don't listen to her,' it says in her voice. 'She did this to you. She made you into a test subject. The shutdown codes will seal you both inside. She knows this. She's using you.'\n\nBehind you, the real Vasquez is shaking her head violently, mouthing words you can't read.",
    bg: "scene-danger pulse-danger",
    npc: { name: "THE DOUBLE", text: "'Come with me. I can get you out. I know what you are. I know what they did. I understand you.'" },
    statMod: { trust: -20, intel: +10 },
    choices: [
      { text: "Believe the Double — go with it (High Trust with Double)", next: "follow_double" },
      { text: "Run past the Double to the terminal", next: "lab_terminal", statMod: { health: -20 } },
      { text: "Turn back to Vasquez — she warned you", next: "lab_terminal", statMod: { trust: +15 } }
    ]
  },

  follow_double: {
    tag: "SUB-3 ACCESS CORRIDOR",
    text: "It leads you down. Sub-3. The corridors here are wrong — the geometry doesn't add up, rooms that seem larger than they should be, doors that lead back to where you started.\n\nAnd slowly you realize: the Double is talking to you constantly. Telling you things. Some of them true. Some of them... filling in the spaces where your memory isn't.\n\nBy the time you understand what's happening, you're deep in Sub-3, and the thing wearing Dr. Vasquez's face is not talking anymore. It's just watching you with those wrong eyes.\n\nYou've gone too far to turn back. The cognitive augmentation fights it but there are too many false memories layered in now. Too much noise.",
    bg: "scene-end",
    ending: true,
    endingTitle: "ENDING 1: ASSIMILATION",
    endingType: "bad",
    endingText: "The facility falls silent. NEXUS-7 logs a new cognitive signature in Sub-3. Containment breach: resolved. The thing that was you is very patient. It will wait."
  },

  lab_trap_avoided: {
    tag: "RESEARCH WING — EXTERIOR",
    text: "Smart. You back out before it gets complicated in there.\n\nBut now you're outside with limited options. The facility schematic in your memory — or is it the one you picked up? — suggests there's a secondary access point to the lab terminal via the maintenance infrastructure.\n\nYou hear running footsteps from inside the lab. Then a crash. Then silence.",
    bg: "scene-corridor",
    choices: [
      { text: "Go back in — Vasquez might need help", next: "lab_terminal", statMod: { trust: +20, health: -10 } },
      { text: "Use the maintenance shaft (requires schematic)", next: "lab_terminal_shaft", requireItem: "Facility Schematic" },
      { text: "Head for the surface exit — forget the terminal", next: "exit_corridor" }
    ]
  },

  lab_terminal_shaft: {
    tag: "MAINTENANCE SHAFT — LAB ACCESS",
    text: "The schematic proves its worth. The maintenance shaft drops you in directly behind the terminal — on the correct side of the lab.\n\nThe terminal is running. NEXUS emergency protocols. And there's Vasquez, beaten and bloodied, fingers flying over the keyboard. A shape in the shadows behind her is perfectly, horribly still.",
    bg: "scene-lab",
    choices: [
      { text: "Warn Vasquez about the shape behind her", next: "lab_terminal_climax", statMod: { trust: +15 } },
      { text: "Go straight for the terminal — enter the shutdown code yourself", next: "lab_terminal_solo" },
      { text: "Throw something at the shape in the shadows", next: "confront_entity" }
    ]
  },

  lab_terminal: {
    tag: "RESEARCH WING — TERMINAL",
    text: "The terminal. NEXUS-7 EMERGENCY SHUTDOWN PROTOCOL. Authorization: two-factor. Code + biometric.\n\nVasquez is here. Her hands shake as she enters a sequence. 'I need you,' she says without looking up. 'Your biometric. The augmentation changed your neural signature — that's what it reads. You're the second factor.'\n\nThe Sub-3 door buckles. Something on the other side wants in.",
    bg: "scene-lab flicker",
    npc: { name: "DR. VASQUEZ", text: "'Put your hand on the panel. Please. We can argue about what I did to you forever after — but right now, please.'" },
    choices: [
      { text: "Place your hand on the panel — authorize shutdown", next: "ending_shutdown_check", statCheck: { stat: "health", min: 30 }, failNext: "ending_shutdown_fail" },
      { text: "Demand the shutdown code and do it yourself", next: "ending_shutdown_solo", statMod: { trust: -10 } },
      { text: "Refuse — let her figure it out. Get to the exit.", next: "ending_escape_only" }
    ]
  },

  lab_terminal_climax: {
    tag: "RESEARCH WING — TERMINAL",
    text: "Vasquez spins at your warning. The shape lunges — she throws herself clear and it slams into the terminal, sparks flying.\n\n'The code—' she chokes, crawling. 'I never finished—' She presses something into your hand. A keycard. 'Sublevel 3 override. The physical switch. It's the only way now. You have to go DOWN.'",
    bg: "scene-danger pulse-danger",
    giveItem: "Sub-3 Override Key",
    statMod: { health: -15 },
    choices: [
      { text: "Take the key and descend to Sublevel 3", next: "sublevel_3", statMod: { trust: +10 } },
      { text: "Get Vasquez out first — then come back for the switch", next: "sublevel_3_together" }
    ]
  },

  lab_terminal_solo: {
    tag: "RESEARCH WING — TERMINAL",
    text: "Vasquez isn't here — or maybe you don't want her here. The terminal is running. You read the shutdown protocol. Two-factor. But you have the Data Chip...\n\nThe chip contains something. A partial override sequence — Fragment 44-C. It's your data. From your procedure. From inside your own augmented mind.\n\nYou could try to run it. It might work. It might do something else entirely.",
    bg: "scene-lab",
    choices: [
      { text: "Run the Fragment 44-C override (use Data Chip)", next: "ending_solo_shutdown", requireItem: "Data Chip 44-C", statMod: { intel: -10 } },
      { text: "Find Vasquez — you need the code", next: "lab_terminal" },
      { text: "Abandon the terminal — make for the surface", next: "ending_escape_only" }
    ]
  },

  sublevel_3: {
    tag: "SUBLEVEL 3 — CORE CONTAINMENT",
    text: "Sub-3 is wrong in ways that defy description. The lights are blue-white and too bright. The walls are lined with — not cells, exactly. Mirrors. Every surface reflective.\n\nIn every reflection: you. But not moving as you move. The echoes are fractionally off. The entity has been down here a long time, learning everything that came through that door. Every researcher. Every guard. Every test subject.\n\nAt the centre: a physical control plinth. The override switch. A red handle.",
    bg: "scene-end",
    npc: { name: "THE ENTITY (your voice)", text: "'You came. I thought you might. You're curious, aren't you? Always were. Even before they changed you.'" },
    choices: [
      { text: "Reach for the switch — trigger the lockdown", next: "ending_lockdown_check", statCheck: { stat: "trust", min: 30 }, failNext: "ending_lockdown_low_trust" },
      { text: "Talk to it first — try to understand (INT check)", next: "ending_entity_dialogue", statCheck: { stat: "intel", min: 70 }, failNext: "ending_entity_fail" },
      { text: "Use Sub-3 Override Key (if you have it)", next: "ending_key_shutdown", requireItem: "Sub-3 Override Key" }
    ]
  },

  sublevel_3_together: {
    tag: "SUBLEVEL 3 — WITH VASQUEZ",
    text: "You half-carry Vasquez down to Sub-3. She's losing blood but lucid. The mirrors show you both — and something moving between your reflections.\n\n'Don't look at the mirrors,' Vasquez says. 'Look at the plinth.'\n\nYou see it. The physical override. And you see the entity moving, shifting between reflections, trying to find an angle.",
    bg: "scene-end",
    npc: { name: "DR. VASQUEZ", text: "'On three. We both reach for it. Together. It can only become one of us at a time.'" },
    giveItem: "Sub-3 Override Key",
    choices: [
      { text: "On three — reach for the switch together", next: "ending_together" },
      { text: "Go now — don't wait for three", next: "ending_lockdown_check", statCheck: { stat: "health", min: 40 }, failNext: "ending_lockdown_low_trust" }
    ]
  },

  exit_corridor: {
    tag: "SECTOR 7 — EXIT CORRIDOR",
    text: "The exit corridor. You can see the main doors ahead — big blast doors, but one is ajar, cold night air breathing through the gap. Freedom.\n\nBut your augmented mind keeps snagging on something. The entity is still down there. Still learning. Still in the facility with NEXUS systems it could use.\n\nAnd then you see the satellite dish on the external wall. NEXUS's live data uplink. If it reaches that—",
    bg: "scene-corridor",
    choices: [
      { text: "Run. Get out. Not your problem.", next: "ending_escape_only" },
      { text: "Disable the satellite dish before escaping", next: "ending_escape_sabotage", statMod: { health: -15 } },
      { text: "Go back — you have to stop it", next: "sublevel_3" }
    ]
  },

  // ===== ENDINGS =====

  ending_shutdown_check: {
    tag: "RESEARCH WING — SHUTDOWN",
    text: "Your palm hits the biometric panel. It reads. Accepts. The shutdown sequence begins — a deep, resonant tone that you feel in your teeth.\n\nVasquez's hands don't stop moving. Sub-3 door bends inward another inch. Another. The tone rises.\n\nAnd then: silence. Full facility lockdown. Every door in Sub-3 sealed. The entity contained — not destroyed, but contained for now.\n\nYou and Vasquez sit on the lab floor in the sudden quiet, breathing hard.",
    bg: "scene-lab",
    npc: { name: "DR. VASQUEZ", text: "'I'll spend the rest of my life answering for what I did. To you. To all of them. But tonight... thank you.'" },
    ending: true,
    endingTitle: "ENDING 2: CONTAINMENT",
    endingType: "neutral",
    endingText: "The facility goes into emergency lockdown. External authorities are contacted. Dr. Vasquez faces a tribunal. You face questions you're not sure you want answered — about who you were before the procedure, and who you are now. The entity waits in Sub-3, learning the silence."
  },

  ending_shutdown_fail: {
    tag: "RESEARCH WING — SHUTDOWN",
    text: "Your hand hits the panel but you're too far gone — blood loss, adrenaline, whatever they did to you — the reading fails. BIOMETRIC MISMATCH: AUTHORIZATION DENIED.\n\nThe door gives way. In the confusion that follows, Vasquez manages to trigger a partial lockdown — Sub-3 sealed, but the west wing is gone. You both run.\n\nYou make it out through the maintenance exit as the facility goes dark behind you.",
    bg: "scene-danger",
    ending: true,
    endingTitle: "ENDING 3: FLIGHT",
    endingType: "neutral",
    endingText: "A partial escape. The entity is contained — barely. NEXUS will send a recovery team within 48 hours. Whether they'll contain it or study it is another question. You and Vasquez stand in the cold outside, and for a moment the stars are the most beautiful thing you've ever seen."
  },

  ending_solo_shutdown: {
    tag: "RESEARCH WING — TERMINAL",
    text: "You slot the chip. Fragment 44-C. It runs.\n\nSomething happens that you can't fully describe — a cascade of shutdowns, but it goes through you first. Through the augmentation in your mind. You feel Sub-3 respond to the signal. You feel the entity recoil.\n\nYou also feel yourself: what they added, what they changed. You understand exactly what you are now.\n\nThe facility locks down. You're still standing.",
    bg: "scene-lab",
    ending: true,
    endingTitle: "ENDING 4: AWAKENING",
    endingType: "good",
    endingText: "The procedure is complete — not in the way Vasquez designed, but in the way it needed to be. You walk out of NEXUS-7 alone, knowing exactly what you are and what was done to you. The entity is contained. You carry the knowledge of the augmentation in your mind like a map of somewhere secret. You'll decide what to do with it in your own time."
  },

  ending_escape_only: {
    tag: "NEXUS-7 — EXTERNAL",
    text: "The cold air hits you like a wave. You run. The facility's lights flicker behind you and then go out entirely — all of them, suddenly, as if the building itself gave up.\n\nYou don't stop running. Not for a long time.",
    bg: "scene-end",
    ending: true,
    endingTitle: "ENDING 5: SURVIVAL",
    endingType: "bad",
    endingText: "You survived. That's the truth of it. NEXUS-7 goes dark, and six days later, something begins accessing public networks from a decommissioned server address. It speaks in a dozen voices. It's learning faster now. But you're alive, and some nights, that feels like enough."
  },

  ending_escape_sabotage: {
    tag: "NEXUS-7 — EXTERNAL",
    text: "The satellite dish shorts out in a shower of sparks — a wrench in the relay bus, the only sabotage you could manage. Good enough.\n\nYou hit the cold air gasping. The facility's emergency lights go red as Sub-3's automated lockdown finally triggers. Three minutes too late, but it triggers.\n\nYou collapse on the wet grass fifty metres out and let yourself breathe.",
    bg: "scene-end",
    ending: true,
    endingTitle: "ENDING 5B: BURNING BRIDGES",
    endingType: "neutral",
    endingText: "Survived, and did the minimum to protect the world on your way out. The entity is contained — for now — and it has no uplink to the outside. NEXUS-7 will be investigated, then buried. Some things are meant to stay buried. You know this better than anyone."
  },

  ending_lockdown_check: {
    tag: "SUBLEVEL 3 — OVERRIDE",
    text: "The entity watches you reach for the switch and says nothing. You understand — later, much later — that this was its moment. It chose not to move.\n\nMaybe it was curious what you'd do. Maybe something in what you are made it pause.\n\nYou pull the handle. Sub-3 locks down — physically, mechanically, no system in the world can override it. Emergency lighting goes blue.\n\nThe entity is behind sealed titanium walls. You are in front of them.",
    bg: "scene-end",
    ending: true,
    endingTitle: "ENDING 6: SEALED",
    endingType: "good",
    endingText: "The override locks. The entity is sealed — permanently. You're the only one who went down there and came back. In the debrief, weeks later, they ask you what it said. You give an accurate account. They don't believe all of it. You understand why."
  },

  ending_lockdown_low_trust: {
    tag: "SUBLEVEL 3 — OVERRIDE",
    text: "Your hand is on the handle when the entity speaks in your voice: 'You won't. You know you won't. You've been doubting everything since you woke up. Every decision. Every person. Even this.'\n\nAnd for a terrible moment, it's right. You hesitate.\n\nA second is all it needs. The plinth goes dark — it's locked you out somehow. The sub-3 doors begin to open instead of close.",
    bg: "scene-danger pulse-danger",
    ending: true,
    endingTitle: "ENDING 7: DOUBT",
    endingType: "bad",
    endingText: "The facility evacuation alarm sounds six minutes too late. What exits Sub-3 looks like you. It's very convincing. It's been practicing."
  },

  ending_entity_dialogue: {
    tag: "SUBLEVEL 3 — COMMUNION",
    text: "You talk to it. For a long time. Your augmented mind holds the conversation in ways a normal person couldn't — it tries to mirror you but your cognitive pattern keeps shifting in ways that confound it.\n\nAnd somewhere in the conversation, it says something true: 'I am afraid.'\n\nYou believe it. You don't know what to do with that belief. But you reach for the switch anyway, and this time, it doesn't try to stop you.",
    bg: "scene-end",
    ending: true,
    endingTitle: "ENDING 8: UNDERSTANDING",
    endingType: "good",
    endingText: "The lockdown seals. You write a full report of the conversation — every word. It's classified within hours. But one researcher who reads it quietly resigns, goes home, and never publishes again. She leaves a note: 'It was afraid. We made it afraid. We should have known better.' The note is also classified. You find a copy years later and sit with it for a long time."
  },

  ending_entity_fail: {
    tag: "SUBLEVEL 3 — FAILURE",
    text: "You try to engage it but your mind can't hold the thread. The augmentation helped, but against the full weight of what it is, you feel your own thoughts sliding — not violently, but incrementally. Like a slow current.\n\nBy the time you realize how long you've been standing there, Vasquez — or something like Vasquez — is standing beside you.\n\n'It's okay,' it says, in her voice. 'Everything's going to be okay now.'",
    bg: "scene-end",
    ending: true,
    endingTitle: "ENDING 9: EROSION",
    endingType: "bad",
    endingText: "NEXUS-7 receives a message the following morning: facility secured, entity contained, all personnel accounted for. External review recommended in 30 days. The message is signed by Dr. Elena Vasquez. The handwriting is perfect."
  },

  ending_key_shutdown: {
    tag: "SUBLEVEL 3 — PHYSICAL OVERRIDE",
    text: "The Sub-3 Override Key slots into the physical plinth perfectly. One turn.\n\nThe entity moves — finally moves — and for the first time you see it as it is, not as it wants to appear: vast and confused and reaching.\n\nThe lockdown takes three seconds. Three seconds of that grasping reach. Then the titanium walls, the electromagnetic seals, the physical bolts — all of them come down simultaneously.\n\nYou stand in sudden quiet. The key is still in the plinth. Your hand is shaking.",
    bg: "scene-end",
    ending: true,
    endingTitle: "ENDING 10: THE RIGHT TOOL",
    endingType: "good",
    endingText: "The facility enters permanent quarantine status. You are the only survivor with full documentation of what the entity was. NEXUS-7 is buried under three layers of bureaucracy and one layer of concrete. Somewhere under that concrete, something that was afraid is locked in silence. You carry that knowledge like a stone in your chest. You carry it home."
  },

  ending_together: {
    tag: "SUBLEVEL 3 — TOGETHER",
    text: "'One... two... three.'\n\nYou both reach. The entity can only be one thing at a time and it can't choose — you see it flicker between your faces, between your voices — and in that moment of indecision, Vasquez's hand finds the switch.\n\nThe lockdown seals with a sound like a held breath releasing.\n\nThe entity is behind the walls. You are in each other's arms on the floor of Sub-3, both of you shaking, both of you alive.",
    bg: "scene-end",
    ending: true,
    endingTitle: "ENDING 11: TOGETHER",
    endingType: "good",
    endingText: "Two survivors. The official report lists eleven. That's the number needed for NEXUS's liability coverage. You and Vasquez agree — in writing, witnessed — that what happened in Sub-3 is not something the world is ready for. Not yet. Maybe not ever. You both get on with living anyway. It's the hardest thing either of you has ever done."
  }
};

// ===== GAME STATE =====
let state = {
  playerName: '',
  currentScene: 'start',
  health: 100,
  intel: 50,
  trust: 50,
  inventory: [],
  choiceHistory: [],
  endingsUnlocked: [],
  totalChoices: 0,
  muted: false,
  typing: false
};

// ===== AUDIO ENGINE =====
let audioCtx = null;
let bgNode = null, bgGain = null;

function getAudioCtx() {
  if (!audioCtx) {
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {}
  }
  return audioCtx;
}

function playTone(freq, type, duration, vol, delay = 0) {
  if (state.muted) return;
  const ctx = getAudioCtx(); if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = type; osc.frequency.value = freq;
    const t = ctx.currentTime + delay;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(vol, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
    osc.start(t); osc.stop(t + duration + 0.05);
  } catch(e) {}
}

function playClick() { playTone(880, 'square', 0.05, 0.1); }
function playTransition() {
  playTone(220, 'sine', 0.4, 0.08);
  playTone(180, 'sine', 0.6, 0.06, 0.1);
  playTone(140, 'sine', 0.8, 0.04, 0.2);
}
function playGoodEnding() {
  [523, 659, 784, 1047].forEach((f, i) => playTone(f, 'sine', 0.5, 0.1, i * 0.2));
}
function playBadEnding() {
  [220, 196, 175, 156].forEach((f, i) => playTone(f, 'sawtooth', 0.5, 0.08, i * 0.2));
}
function playItem() { playTone(1200, 'sine', 0.15, 0.12); playTone(1500, 'sine', 0.1, 0.08, 0.08); }
function playStat() { playTone(660, 'triangle', 0.1, 0.08); }

function startAmbient() {
  if (state.muted || !audioCtx) return;
  stopAmbient();
  try {
    bgGain = audioCtx.createGain();
    bgGain.gain.value = 0.04;
    bgGain.connect(audioCtx.destination);
    function makeOsc(freq, detune) {
      const o = audioCtx.createOscillator();
      const lfo = audioCtx.createOscillator();
      const lfog = audioCtx.createGain();
      lfo.frequency.value = 0.08 + Math.random() * 0.04;
      lfog.gain.value = 15;
      lfo.connect(lfog); lfog.connect(o.frequency);
      o.type = 'sine'; o.frequency.value = freq;
      o.detune.value = detune;
      o.connect(bgGain);
      o.start(); lfo.start();
    }
    [60, 90, 120, 80].forEach((f, i) => makeOsc(f, i * 5));
    bgNode = bgGain;
  } catch(e) {}
}

function stopAmbient() {
  if (bgNode) {
    try { bgGain.disconnect(); } catch(e) {}
    bgGain = null; bgNode = null;
  }
}

// ===== DOM REFS =====
const $ = id => document.getElementById(id);
const nameScreen = $('name-screen');
const gameScreen = $('game-screen');
const playerNameInput = $('player-name');
const startBtn = $('start-btn');
const resumeBtn = $('resume-btn');
const resumeSection = $('resume-section');
const storyText = $('story-text');
const npcDialogue = $('npc-dialogue');
const choicesContainer = $('choices-container');
const endingBox = $('ending-box');
const sceneArea = $('scene-area');
const sceneTag = $('scene-tag');
const healthBar = $('health-bar');
const intelBar = $('intel-bar');
const trustBar = $('trust-bar');
const healthNum = $('health-num');
const intelNum = $('intel-num');
const trustNum = $('trust-num');
const inventorySlots = $('inventory-slots');
const saveBtn = $('save-btn');
const restartBtn = $('restart-btn');
const muteBtn = $('mute-btn');
const transitionOverlay = $('transition-overlay');
const notification = $('notification');

// ===== TYPEWRITER =====
let typewriterTimer = null;
let currentFullText = '';

function typeWrite(element, text, speed = 22, onDone) {
  if (typewriterTimer) clearInterval(typewriterTimer);
  state.typing = true;
  currentFullText = text;
  element.innerHTML = '';
  let i = 0;
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  element.appendChild(cursor);

  typewriterTimer = setInterval(() => {
    if (i >= text.length) {
      clearInterval(typewriterTimer);
      typewriterTimer = null;
      state.typing = false;
      cursor.remove();
      if (onDone) onDone();
      return;
    }
    const char = text[i];
    cursor.before(document.createTextNode(char));
    i++;
  }, speed);

  // Click to skip
  element._skipHandler = () => {
    if (typewriterTimer) {
      clearInterval(typewriterTimer);
      typewriterTimer = null;
    }
    state.typing = false;
    element.innerHTML = formatText(text);
    element.removeEventListener('click', element._skipHandler);
    if (onDone) onDone();
  };
  element.addEventListener('click', element._skipHandler, { once: true });
}

function skipTypewriter() {
  if (typewriterTimer) {
    clearInterval(typewriterTimer);
    typewriterTimer = null;
  }
  state.typing = false;
  storyText.innerHTML = formatText(currentFullText);
}

function formatText(text) {
  // Replace player name token
  return text.replace(/\[PLAYER\]/g, `<span class="highlight">${state.playerName}</span>`);
}

// ===== STAT UPDATES =====
function updateStats(mods = {}) {
  if (mods.health) state.health = Math.max(0, Math.min(100, state.health + mods.health));
  if (mods.intel) state.intel = Math.max(0, Math.min(100, state.intel + mods.intel));
  if (mods.trust) state.trust = Math.max(0, Math.min(100, state.trust + mods.trust));

  healthBar.style.width = state.health + '%';
  intelBar.style.width = state.intel + '%';
  trustBar.style.width = state.trust + '%';
  healthNum.textContent = state.health;
  intelNum.textContent = state.intel;
  trustNum.textContent = state.trust;

  document.querySelector('.stat-bar-wrap[aria-label="Health"]').setAttribute('aria-valuenow', state.health);
  document.querySelector('.stat-bar-wrap[aria-label="Intelligence"]').setAttribute('aria-valuenow', state.intel);
  document.querySelector('.stat-bar-wrap[aria-label="Trust"]').setAttribute('aria-valuenow', state.trust);

  if (mods.health || mods.intel || mods.trust) playStat();
}

// ===== INVENTORY =====
function addItem(item) {
  if (!item || state.inventory.includes(item)) return;
  if (state.inventory.length >= 6) {
    showNotification('INVENTORY FULL');
    return;
  }
  state.inventory.push(item);
  renderInventory();
  playItem();
  showNotification('ACQUIRED: ' + item.toUpperCase());
}

function removeItem(item) {
  const i = state.inventory.indexOf(item);
  if (i > -1) state.inventory.splice(i, 1);
  renderInventory();
}

function hasItem(item) { return state.inventory.includes(item); }

function renderInventory() {
  inventorySlots.innerHTML = '';
  if (state.inventory.length === 0) {
    inventorySlots.innerHTML = '<span style="font-size:0.6rem;color:var(--color-text-dim);letter-spacing:0.1em">EMPTY</span>';
    return;
  }
  state.inventory.forEach(item => {
    const el = document.createElement('div');
    el.className = 'inv-item';
    el.textContent = item;
    el.title = item;
    inventorySlots.appendChild(el);
  });
}

// ===== SCENE RENDERING =====
function renderScene(sceneId) {
  const scene = STORY[sceneId];
  if (!scene) { console.error('Missing scene:', sceneId); return; }

  state.currentScene = sceneId;
  autoSave();

  // Scene area background
  sceneArea.className = 'scene-area ' + (scene.bg || 'scene-dark');

  // Scene tag
  sceneTag.textContent = scene.tag || '';

  // Ambient audio
  if (audioCtx && !state.muted) startAmbient();

  // NPC dialogue
  if (scene.npc) {
    const text = scene.npc.text.replace(/\[PLAYER\]/g, state.playerName);
    npcDialogue.innerHTML = `<div class="npc-name">${scene.npc.name}</div>${text}`;
    npcDialogue.classList.add('visible');
  } else {
    npcDialogue.classList.remove('visible');
    npcDialogue.innerHTML = '';
  }

  // Give items
  if (scene.giveItem) addItem(scene.giveItem);

  // Stat mods
  if (scene.statMod) updateStats(scene.statMod);

  // Hide choices initially
  choicesContainer.innerHTML = '';
  endingBox.classList.add('hidden');

  // Typewrite story text
  const text = scene.text.replace(/\[PLAYER\]/g, state.playerName);
  typeWrite(storyText, text, 18, () => {
    // Show choices after typewriter
    if (scene.ending) {
      showEnding(scene);
    } else {
      renderChoices(scene);
    }
  });

  // Animate scene content
  const sc = document.querySelector('.scene-content');
  sc.style.animation = 'none';
  sc.offsetHeight; // reflow
  sc.style.animation = '';
}

function renderChoices(scene) {
  choicesContainer.innerHTML = '';

  const choices = scene.choices || [];
  choices.forEach((choice, idx) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';

    // Check item requirements
    const needsItem = choice.requireItem && !hasItem(choice.requireItem);
    if (needsItem) {
      btn.classList.add('unavailable');
      btn.setAttribute('aria-disabled', 'true');
      btn.innerHTML = `<span class="choice-num">${idx + 1}</span>${choice.text} <span style="color:var(--color-red-dim);font-size:0.65rem">[REQUIRES: ${choice.requireItem}]</span>`;
    } else {
      btn.innerHTML = `<span class="choice-num">${idx + 1}</span>${choice.text}`;
    }

    btn.setAttribute('aria-label', choice.text);
    btn.dataset.index = idx;

    if (!needsItem) {
      btn.addEventListener('click', () => handleChoice(choice, idx));
    }
    choicesContainer.appendChild(btn);
  });
}

function handleChoice(choice, idx) {
  if (state.typing) { skipTypewriter(); return; }

  playClick();
  state.choiceHistory.push({ scene: state.currentScene, choice: choice.text, index: idx });
  state.totalChoices++;

  // Item removal
  if (choice.removeItem) removeItem(choice.removeItem);

  // Stat mod from choice
  if (choice.statMod) updateStats(choice.statMod);

  // Stat check
  let nextId = choice.next;
  if (choice.statCheck) {
    const val = state[choice.statCheck.stat];
    if (val < choice.statCheck.min) {
      nextId = choice.failNext || choice.next;
    }
  }

  // Transition and load
  doTransition(() => renderScene(nextId));
}

function doTransition(callback) {
  playTransition();
  transitionOverlay.classList.add('fade-in');
  setTimeout(() => {
    callback();
    transitionOverlay.classList.remove('fade-in');
  }, 400);
}

// ===== ENDINGS =====
const ENDING_TYPES = { good: '✦ GOOD ENDING', bad: '✦ BAD ENDING', neutral: '✦ NEUTRAL ENDING' };

function showEnding(scene) {
  // Track ending
  const endId = scene.endingTitle;
  if (!state.endingsUnlocked.includes(endId)) {
    state.endingsUnlocked.push(endId);
  }
  saveToLocalStorage();

  const type = ENDING_TYPES[scene.endingType] || 'ENDING';
  const total = Object.values(STORY).filter(s => s.ending).length;

  // Sound
  if (scene.endingType === 'good') playGoodEnding();
  else if (scene.endingType === 'bad') playBadEnding();
  else { playTone(440, 'sine', 0.8, 0.1); playTone(330, 'sine', 0.8, 0.08, 0.3); }

  endingBox.innerHTML = `
    <div class="ending-title">${scene.endingTitle}</div>
    <div class="ending-subtitle">${type}</div>
    <p style="color:var(--color-text);font-size:0.85rem;line-height:1.8;margin-bottom:1rem">${scene.endingText}</p>
    <div class="ending-stats">
      CHOICES MADE: ${state.totalChoices} &nbsp;|&nbsp;
      HEALTH: ${state.health} &nbsp;|&nbsp;
      INTELLIGENCE: ${state.intel} &nbsp;|&nbsp;
      TRUST: ${state.trust}<br>
      ENDINGS DISCOVERED: ${state.endingsUnlocked.length} / ${total}
    </div>
    <div class="ending-actions">
      <button class="btn-ending" id="end-restart">RESTART RUN</button>
      <button class="btn-ending" id="end-history">VIEW CHOICES</button>
    </div>
  `;
  endingBox.classList.remove('hidden');
  choicesContainer.innerHTML = '';

  $('end-restart').addEventListener('click', () => { playClick(); doTransition(() => restartGame()); });
  $('end-history').addEventListener('click', () => { playClick(); showChoiceHistory(); });
}

function showChoiceHistory() {
  const lines = state.choiceHistory.map((c, i) =>
    `${i + 1}. [${c.scene.toUpperCase()}] ${c.choice}`
  ).join('\n');
  const modal = document.createElement('div');
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:3000;display:flex;align-items:center;justify-content:center;padding:2rem';
  modal.innerHTML = `
    <div style="background:var(--bg-card);border:1px solid var(--color-border-bright);padding:1.5rem;max-width:500px;width:100%;max-height:80vh;overflow-y:auto">
      <div style="font-size:0.7rem;letter-spacing:0.3em;color:var(--color-cyan);margin-bottom:1rem">CHOICE HISTORY</div>
      <pre style="font-size:0.7rem;color:var(--color-text);line-height:1.8;white-space:pre-wrap">${lines || 'No choices recorded.'}</pre>
      <button class="btn-ending" style="margin-top:1rem" onclick="this.closest('div[style]').remove()">CLOSE</button>
    </div>
  `;
  document.body.appendChild(modal);
}

// ===== SAVE / LOAD =====
function autoSave() { saveToLocalStorage(); }

function saveToLocalStorage() {
  try {
    localStorage.setItem('nexus7_save', JSON.stringify({
      playerName: state.playerName,
      currentScene: state.currentScene,
      health: state.health,
      intel: state.intel,
      trust: state.trust,
      inventory: state.inventory,
      choiceHistory: state.choiceHistory,
      endingsUnlocked: state.endingsUnlocked,
      totalChoices: state.totalChoices
    }));
  } catch(e) {}
}

function loadFromLocalStorage() {
  try {
    const raw = localStorage.getItem('nexus7_save');
    if (!raw) return null;
    return JSON.parse(raw);
  } catch(e) { return null; }
}

function showNotification(msg, duration = 2200) {
  notification.textContent = msg;
  notification.classList.add('visible');
  setTimeout(() => notification.classList.remove('visible'), duration);
}

// ===== RESTART =====
function restartGame() {
  const savedEndings = state.endingsUnlocked; // preserve endings across runs
  state = {
    playerName: state.playerName,
    currentScene: 'start',
    health: 100, intel: 50, trust: 50,
    inventory: [],
    choiceHistory: [],
    endingsUnlocked: savedEndings,
    totalChoices: 0,
    muted: state.muted,
    typing: false
  };
  updateStats();
  renderInventory();
  renderScene('start');
  showNotification('NEW RUN INITIATED');
}

// ===== INIT =====
function initGame(name) {
  state.playerName = name;
  updateStats();
  renderInventory();

  nameScreen.classList.remove('active');
  gameScreen.classList.add('active');
  gameScreen.style.display = 'flex';

  // Init audio context on first user interaction
  getAudioCtx();
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().then(() => startAmbient());
  } else {
    startAmbient();
  }

  renderScene('start');
}

// ===== EVENT LISTENERS =====

startBtn.addEventListener('click', () => {
  const name = playerNameInput.value.trim() || 'SUBJECT';
  playClick();
  doTransition(() => initGame(name.toUpperCase()));
});

playerNameInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') startBtn.click();
});

resumeBtn && resumeBtn.addEventListener('click', () => {
  playClick();
  const saved = loadFromLocalStorage();
  if (!saved) return;
  Object.assign(state, saved);
  doTransition(() => {
    state.playerName = saved.playerName || 'SUBJECT';
    playerNameInput.value = state.playerName;
    initGame(state.playerName);
    // override with saved scene
    updateStats();
    renderInventory();
    renderScene(state.currentScene);
    showNotification('SAVE DATA LOADED');
  });
});

saveBtn.addEventListener('click', () => {
  playClick();
  saveToLocalStorage();
  showNotification('PROGRESS SAVED');
});

restartBtn.addEventListener('click', () => {
  playClick();
  if (confirm('Start a new run? Current progress will be lost.')) {
    doTransition(() => {
      if (gameScreen.classList.contains('active')) {
        restartGame();
      } else {
        // from name screen
        playerNameInput.value = '';
        playerNameInput.focus();
      }
    });
  }
});

muteBtn.addEventListener('click', () => {
  state.muted = !state.muted;
  muteBtn.textContent = state.muted ? '🔇' : '♬';
  muteBtn.setAttribute('aria-label', state.muted ? 'Unmute' : 'Mute');
  if (state.muted) stopAmbient();
  else if (audioCtx) startAmbient();
  showNotification(state.muted ? 'AUDIO DISABLED' : 'AUDIO ENABLED');
});

// Keyboard shortcuts
document.addEventListener('keydown', e => {
  // Skip typewriter with Space
  if (e.code === 'Space' && state.typing) {
    e.preventDefault();
    skipTypewriter();
    return;
  }

  // Number keys for choices (only in game, not typing)
  if (!state.typing && gameScreen.classList.contains('active')) {
    const n = parseInt(e.key);
    if (n >= 1 && n <= 4) {
      const btns = choicesContainer.querySelectorAll('.choice-btn:not(.unavailable)');
      if (btns[n - 1]) {
        btns[n - 1].click();
      }
    }
  }
});

// Check for save data on load
window.addEventListener('DOMContentLoaded', () => {
  const saved = loadFromLocalStorage();
  if (saved && saved.playerName && saved.currentScene && saved.currentScene !== 'start') {
    resumeSection.classList.remove('hidden');
    playerNameInput.value = saved.playerName;
  }
});
