// ===== COLOR GRADE =====
const colorGrades = {
  cold_ocean: "Harsh grey ocean. Heavy swell. High contrast. Cold spray catching low light. Desaturated steel-blue water. No warm tones. Skin tones lean grey-blue under overcast sky.",
  deep_blue: "Deep navy blue. Underwater light filtering cold through surface ripples. Oppressive depth. Green-blue ambient glow on metal hull surfaces. Faces lit only by instrument backlighting.",
  night_blue: "Dark midnight blue. Minimal light sources — only red/amber instrument glow. Cold operational atmosphere. Skin tones underlit in blue-red. No warm tones anywhere.",
  night_fire: "Dark sky lit by orange-red flashes. Smoke columns. High contrast between fire glow and pitch darkness. Faces half-lit in amber, half in shadow. Apocalyptic atmosphere.",
  night_green: "Night vision green-tinted. Grainy IR aesthetic. Tactical low-light. Faces rendered in monochrome phosphor green. Equipment edges sharply defined.",
  steel_grey: "Steel grey. Industrial cold. High contrast metallic surfaces. Brushed aluminum, matte carbon, gunmetal. No warm colors. Skin tones desaturated.",
  fluorescent: "Cold fluorescent white interior. Clinical. Hard even lighting, no dramatic shadows. Sterile lab atmosphere. Skin tones slightly washed out under tube lighting. No warm tones.",
  dawn_orange: "Early morning golden-orange light breaking low through grey clouds. Dramatic contrast — warm horizon line against cold steel superstructure. Faces catch warm sidelight on one side, cold blue shadow on the other.",
  sky_blue: "Clear high-altitude blue. Harsh direct sunlight. Sharp contrast between aircraft surfaces and sky. Cockpit interior in shadow except instrument glow. Visor reflections.",
  urban_grey: "Urban concrete grey. Particulate dust in air. Muted earth tones. Hard directional shadows from low sun. Skin tones dirty, weathered.",
  desert_sand: "Hot desert sand tones. Harsh overhead sunlight. Heat shimmer distortion. Dry, bleached colors. Sweat on skin catching light.",
  // ===== DEFCON 1 — direct combat color grades =====
  combat_red: "Battle-station red lighting flooding the compartment — every surface saturated in deep crimson alert glow. Faces split between blood-red key light and pitch-black shadow. Sweat catches the red. Strobing emergency beacons throw rotating shadows across bulkheads.",
  burning_sea: "Burning sea horizon — black smoke columns rising from multiple impact points, orange fire reflected in oily black water. Sky bruised with ash and dawn red. Faces half-lit in fire-glow, half in soot.",
  missile_streak: "Pre-dawn black sky cut by the white-hot trails of outbound and inbound missiles. Lightning-bright flashes from launches and intercepts overpowering ambient light. Faces strobed by overlapping muzzle/launch flares.",
  saturation_dawn: "Grey dawn turned hostile — multiple inbound contacts trailing smoke against a pale sky. Cold morning light cut by red warning beacons sweeping the compartment. Air visibly disturbed by overpressure waves.",
};

// ===== PROTAGONIST VISUAL PROFILES =====
// Keeps face/body description IDENTICAL across part 1 and part 2
const protagonistProfiles = {
  "艦長": {
    face: "Japanese male, late 40s, sharp jawline, short-cropped grey-streaked black hair, deep-set focused eyes, weathered tan skin, clean-shaven",
    body: "wearing dark navy JMSDF officer uniform with gold rank insignia on shoulders, white gloves tucked in belt",
    closeup: "eyes fixed on tactical display, reflected data scrolling across his pupils",
  },
  "潜水艦長": {
    face: "Japanese male, early 50s, lean face with hollow cheeks, receding hairline buzzed short, narrow calculating eyes behind thin-frame glasses",
    body: "wearing olive-drab submarine crew jumpsuit, sleeves rolled to forearms showing watch, ship's badge on chest",
    closeup: "listening with eyes closed, one hand pressing headphone to ear, jaw clenched",
  },
  "砲術長": {
    face: "Japanese male, mid 30s, square face, thick eyebrows, crew cut black hair, intense stare, slight stubble",
    body: "wearing JMSDF combat uniform with fire-control insignia, headset around neck, tactical vest",
    closeup: "thumb hovering over fire authorization switch, eyes locked on targeting screen",
  },
  "パイロット": {
    face: "Japanese male, early 30s, angular features, sharp eyes visible through tinted visor, black hair hidden under flight helmet",
    body: "wearing olive flight suit with squadron patches, G-suit inflated around thighs, oxygen mask dangling from one side",
    closeup: "gloved hands on HOTAS controls, HUD data reflected in visor glass",
  },
  "技術者": {
    face: "Japanese male, mid 50s, round glasses, thinning grey hair combed back, deep wrinkles around eyes from years of screen work, calm neutral expression",
    body: "wearing white lab coat over dark polo shirt, ID badge clipped to pocket, pen in breast pocket",
    closeup: "motionless, staring at scrolling telemetry data, glasses reflecting green numbers",
  },
  "CIC指揮官": {
    face: "Japanese male, mid 40s, broad forehead, close-cropped black hair with grey temples, stern mouth, prominent cheekbones",
    body: "wearing dark combat dress uniform, tactical headset with boom mic, rank insignia on collar",
    closeup: "leaning forward over radar console, face lit blue-green by Aegis display",
  },
  "防空指揮官": {
    face: "Japanese male, late 40s, narrow eyes scanning multiple screens simultaneously, thin lips, salt-and-pepper crew cut",
    body: "wearing JASDF blue uniform, headset with throat mic, standing at elevated command position",
    closeup: "tracking inbound contacts on display, fingers moving across touch interface",
  },
  "隊長": {
    face: "Japanese male, late 30s, tanned weathered face, strong jaw, scar above left eyebrow, black hair cropped to scalp",
    body: "wearing amphibious assault camouflage, body armor with magazine pouches, combat helmet with NVG mount",
    closeup: "binoculars raised, scanning beachhead, rain dripping off helmet rim",
  },
  "テストパイロット": {
    face: "Japanese male, late 30s, lean sharp features, calm confident eyes, faint smile lines, black hair under matte-finish test helmet",
    body: "wearing bright orange flight suit with test pilot wings, parachute harness, instrument pack on thigh",
    closeup: "running pre-flight check on kneeboard, pencil marking data points",
  },
  "情報分析官": {
    face: "Japanese male, early 40s, intellectual features, wire-rim glasses, neat side-parted black hair, slight frown of concentration",
    body: "wearing civilian shirt and tie under military ID lanyard, seated at multi-monitor workstation",
    closeup: "satellite imagery reflected in glasses, cursor highlighting vessel formations",
  },
  "戦車長": {
    face: "Japanese male, mid 30s, compact muscular build visible in face, wide cheekbones, short black hair, sweat on temples",
    body: "wearing olive tanker coveralls, CVC helmet with comms, body squeezed into commander's hatch",
    closeup: "peering through commander's sight, thermal image of target visible in eyepiece",
  },
  "作戦指揮官": {
    face: "Japanese male, late 40s, authoritative presence, thick eyebrows, graying temples, deep lines from nose to mouth",
    body: "wearing JMSDF operational uniform, standing at center of command table, arms crossed",
    closeup: "studying holographic tactical projection, eyes tracking vessel movements",
  },
  "ミサイル中隊長": {
    face: "Japanese male, early 40s, sun-darkened skin, squint lines, solid jaw, black hair under field cap",
    body: "wearing JGSDF camouflage with anti-ship missile unit insignia, binoculars on chest, radio handset",
    closeup: "confirming targeting data on portable display, wind blowing dust across screen",
  },
  "特殊作戦隊員": {
    face: "Japanese male, early 30s, face obscured by balaclava and night-vision goggles flipped up, only sharp focused eyes visible",
    body: "wearing black tactical gear, plate carrier with suppressed weapon, IR strobe on shoulder",
    closeup: "NVGs flipped down, world rendered in green phosphor, hand signals to team",
  },
  "統合幕僚長": {
    face: "Japanese male, late 50s, distinguished silver hair, deep authoritative eyes, lined face showing decades of service, clean-shaven",
    body: "wearing JSDF dress uniform with full decorations and rank insignia, seated at head of crisis table",
    closeup: "reading situation report, pen tapping slowly on table surface",
  },
  "管制官": {
    face: "Japanese male, mid 30s, alert wide eyes monitoring multiple screens, neat black hair, headset pressing into temples",
    body: "wearing JASDF uniform at AWACS station, surrounded by radar displays and communication panels",
    closeup: "identifying bogey on scope, marking contact with light pen",
  },
  "高射隊長": {
    face: "Japanese male, early 40s, weathered outdoor face, deep tan, focused squinting eyes, short black hair under helmet",
    body: "wearing JGSDF/JASDF anti-air unit uniform, standing beside launcher console",
    closeup: "watching missile trajectory on tracking screen, hand on authorization key",
  },
  "ヘリパイロット": {
    face: "Japanese male, mid 30s, sharp features under flight helmet with tinted visor raised, confident steady gaze",
    body: "wearing naval aviation flight suit, seated in SH-60K cockpit, collective and cyclic in hands",
    closeup: "dipping sonobuoy pattern displayed on MFD, adjusting hover position",
  },
  "水雷士官": {
    face: "Japanese male, mid 30s, focused narrow eyes, clean-shaven angular face, short black hair",
    body: "wearing submarine crew coveralls with torpedo insignia, standing at weapons console",
    closeup: "tracking torpedo wire-guidance data, targeting solution converging on screen",
  },
  "ソナー員": {
    face: "Japanese male, mid 20s, young but intense concentration, slight build, headphones clamped tight over ears",
    body: "wearing submarine crew uniform, hunched over sonar waterfall display in darkened compartment",
    closeup: "eyes tracing frequency lines on waterfall display, finger pointing at contact signature",
  },
  "掃海隊員": {
    face: "Japanese male, late 30s, calm steady eyes, square jaw, sun-weathered skin, short hair",
    body: "wearing naval diving suit partially unzipped at top, mine disposal unit badge on arm",
    closeup: "studying mine diagram on tablet, ocean visible through porthole behind",
  },
  "艦隊司令": {
    face: "Japanese male, mid 50s, commanding presence, silver-streaked hair combed back, deep-set authoritative eyes, prominent nose",
    body: "wearing JMSDF admiral's uniform with gold braid, standing on flag bridge overlooking fleet",
    closeup: "surveying formation through bridge windows, fleet stretching to horizon",
  },
  "サイバー戦士官": {
    face: "Japanese male, early 30s, pale from indoor work, sharp intelligent eyes behind modern glasses, neat short hair",
    body: "wearing JSDF uniform at multi-screen cyber operations terminal, ergonomic chair",
    closeup: "code streaming across screens, typing rapidly, network topology map on side display",
  },
  "軍医": {
    face: "Japanese male, mid 40s, kind but exhausted eyes, sweat-matted hair under surgical cap, blood on cheek",
    body: "wearing combat medical scrubs under body armor, surgical gloves, headlamp",
    closeup: "hands working steady under harsh field lamp, focus absolute despite surroundings",
  },
  "補給艦長": {
    face: "Japanese male, late 40s, round face with reliable steady expression, reading glasses pushed up on forehead",
    body: "wearing JMSDF working uniform, clipboard in hand, standing on supply ship bridge",
    closeup: "monitoring underway replenishment connection, fuel hose swaying between ships",
  },
  "哨戒機長": {
    face: "Japanese male, early 40s, lean alert face, slight crow's feet, headset over neat black hair",
    body: "wearing JMSDF aviation uniform in P-1 cockpit, multi-function displays surrounding",
    closeup: "marking submarine contact on tactical display, sonobuoy pattern overlaid on ocean map",
  },
  "防衛大臣": {
    face: "Japanese male, late 50s, political authority in features, silver hair styled formally, serious deep-lined face",
    body: "wearing dark suit with flag pin, seated at crisis management desk, phone in hand",
    closeup: "reading classified briefing paper, ambient red emergency lighting on walls",
  },
  "海保指揮官": {
    face: "Japanese male, late 40s, weathered maritime face, strong brow, determined eyes, short grey-black hair",
    body: "wearing Japan Coast Guard white uniform with rank insignia, standing at coastal command center",
    closeup: "watching AIS display showing hundreds of vessel contacts converging",
  },
  "航海士": {
    face: "Japanese male, late 20s, alert young face, slight tension in jaw, neat black hair under officer cap",
    body: "wearing JMSDF bridge officer uniform, standing at navigation console with charts",
    closeup: "recalculating position manually on paper chart, GPS displays blank/jammed",
  },
  "対潜戦指揮官": {
    face: "Japanese male, mid 40s, intense focus, hollow cheeks from long watch, close-cropped hair with grey",
    body: "wearing JMSDF combat uniform in blue-lit CIC, standing behind sonar operators",
    closeup: "tracking convergence zones on display, towed array data updating in real-time",
  },
  "戦略分析官": {
    face: "Japanese male, early 50s, professorial appearance, grey at temples, thoughtful distant gaze, wire glasses",
    body: "wearing civilian clothes with military ID, standing before wall-sized strategic map",
    closeup: "tracing sea lanes with laser pointer, submarine patrol zones highlighted",
  },
  "戦術士官": {
    face: "Japanese male, mid 30s, sharp focused features, lean face, determined eyes reflecting blue screen light",
    body: "wearing JMSDF uniform at Aegis combat system console, multiple threat tracks on display",
    closeup: "Aegis SPY-1 radar return showing 200+ simultaneous tracks, hands cycling through targets",
  },
  "防衛官僚": {
    face: "Japanese male, late 40s, bureaucratic composure, neat glasses, carefully parted hair, neutral controlled expression",
    body: "wearing dark suit in Ministry of Defense briefing room, binder of classified documents",
    closeup: "turning page of defense budget document, highlighted figures visible",
  },
  "衛星運用官": {
    face: "Japanese male, mid 30s, focused screen-lit face, modern haircut, slight stubble from long shift",
    body: "wearing JASDF Space Operations uniform at satellite tracking console",
    closeup: "orbital trajectory overlaid on Earth imagery, satellite passing over disputed waters",
  },
  "政治家": {
    face: "Japanese male, late 50s, serious composed statesman features, grey hair, lined authoritative face",
    body: "wearing formal dark suit at Diet podium, microphone and papers before him",
    closeup: "pausing mid-speech, weight of words visible in expression",
  },
  "宇宙作戦隊員": {
    face: "Japanese male, early 30s, technical focus, modern glasses, clean-cut appearance",
    body: "wearing JASDF Space Operations Group uniform at tracking station",
    closeup: "monitoring satellite overflight schedule, threat assessment data beside orbit map",
  },
  "外交官": {
    face: "Japanese male, mid 50s, diplomatic bearing, silver-touched hair, measured calm expression, sharp suit",
    body: "wearing pinstripe suit in wood-paneled meeting room, flag behind, documents on table",
    closeup: "reviewing alliance document, pen poised, slight tension in fingers",
  },
  "ミサイル技術者": {
    face: "Japanese male, mid 40s, engineer's careful eyes, reading glasses, slight grey, methodical expression",
    body: "wearing white lab coat in missile test facility, schematic printouts on desk",
    closeup: "examining seeker-head assembly under magnification lamp, precision tools arranged",
  },
  "砲術員": {
    face: "Japanese male, mid 20s, young determined face, sweat on forehead, short black hair under sound-dampening headset",
    body: "wearing JMSDF combat gear on deck near CIWS mount, body braced against ship roll",
    closeup: "20mm Phalanx CIWS rotating in background, shell casings visible in feed system",
  },
  "機関士": {
    face: "Japanese male, early 40s, oil-smudged steady face, practical no-nonsense expression, short hair under hardhat",
    body: "wearing submarine engineering coveralls, tool belt, standing in reactor compartment",
    closeup: "reading reactor output gauges, steam pipes filling background frame",
  },
  "兵站参謀": {
    face: "Japanese male, mid 40s, cerebral focused features, glasses, neat appearance despite stress, slight bags under eyes",
    body: "wearing JSDF staff officer uniform at logistics planning desk, supply chain maps spread out",
    closeup: "calculating fuel reserves on tablet, shipping route blockade overlay on screen",
  },
  "基地司令": {
    face: "Japanese male, early 50s, commanding weathered face, silver crew cut, scar tissue on left hand visible",
    body: "wearing JASDF commander's uniform, standing in damaged but operational command post",
    closeup: "surveying runway damage through blast-cracked window, repair crews already moving",
  },
  "水陸機動団長": {
    face: "Japanese male, mid 40s, marine-hardened features, deep tan, intense eyes, short cropped hair",
    body: "wearing JGSDF amphibious camouflage with brigade insignia, body armor, tactical radio",
    closeup: "studying beach approach on waterproofed tablet, AAV-7 vehicles loading behind",
  },
  "海軍戦略家": {
    face: "Japanese male, late 50s, scholarly yet sharp, silver hair, penetrating analytical eyes, slight smile of certainty",
    body: "wearing civilian professor's jacket in war college lecture room, naval charts on walls",
    closeup: "pointing to choke point on massive sea chart, red markers showing fleet positions",
  },
  "産業戦略官": {
    face: "Japanese male, mid 40s, technocrat sharpness, modern glasses, neatly styled hair, focused serious expression",
    body: "wearing dark suit in METI briefing room, semiconductor wafer samples on display table",
    closeup: "comparing chip fabrication data sheets, supply chain vulnerability assessment open",
  },
  "通信士官": {
    face: "Japanese male, mid 30s, alert nervous energy, lean face, slight dark circles, headset always on",
    body: "wearing JMSDF communications uniform at signals station, encryption equipment rack behind",
    closeup: "monitoring fiber optic status board, several undersea cable lines flashing red",
  },
  "自治体長": {
    face: "Japanese male, late 50s, civilian authority mixed with worry, grey hair, tired but determined eyes",
    body: "wearing casual emergency vest over dress shirt, standing in island municipal office",
    closeup: "reading evacuation order on phone, looking out window at harbor with insufficient ferries",
  },
  "海上保安官": {
    face: "Japanese male, mid 40s, maritime toughness, wind-burned face, steady resolute eyes",
    body: "wearing Japan Coast Guard blue uniform on patrol vessel bridge, binoculars around neck",
    closeup: "watching commercial shipping lane through binoculars, empty ocean where tankers should be",
  },
  "合同司令官": {
    face: "Japanese male, early 50s, binational authority in bearing, distinguished grey-streaked hair, bilateral flag pins on lapel",
    body: "wearing JSDF joint operations uniform at combined command center, US/Japan flags behind",
    closeup: "coordinating on dual-language tactical display, allied force disposition updating",
  },
  "米軍パイロット": {
    face: "American male, early 30s, confident angular jaw, blue eyes visible through tinted visor, blonde hair under helmet",
    body: "wearing USAF flight suit with 18th Wing patches, in F-22 cockpit, full combat loadout",
    closeup: "throttle pushed forward, afterburner glow reflected in canopy glass",
  },
  "合同隊長": {
    face: "Japanese male, late 30s, amphibious operations weathering, strong features, determined expression, camo face paint",
    body: "wearing joint exercise camouflage with both JGSDF and USMC liaison patches visible",
    closeup: "coordinating landing timing on waterproof radio, waves crashing on landing craft ramp",
  },
  "爆撃機パイロット": {
    face: "American male, mid 40s, veteran calm, lined face, crew cut, steady professional gaze",
    body: "wearing USAF flight suit in B-2 cockpit, mission card strapped to thigh",
    closeup: "flying-wing shadow crossing ocean far below, instrument panel showing Pacific waypoints",
  },
  "特殊部隊員": {
    face: "American male, mid 30s, operator's beard shadow, intense dark eyes, face partially covered by shemagh",
    body: "wearing multicam with special operations insignia, plate carrier loaded with equipment",
    closeup: "boarding aircraft in darkness, red interior lighting casting dramatic shadows",
  },
  "空母艦長": {
    face: "American male, early 50s, commanding naval authority, grey-templed dark hair, weathered confident face",
    body: "wearing USN khaki uniform on carrier bridge, binoculars, USS designation visible",
    closeup: "watching flight operations from bridge wing, steam catapult launching aircraft below",
  },
  "給油機パイロット": {
    face: "Japanese male, late 30s, patient methodical expression, calm eyes, neat black hair under flight helmet",
    body: "wearing JASDF tanker crew flight suit, seated in KC-767 cockpit",
    closeup: "monitoring boom camera feed, fighter approaching in refueling envelope",
  },
  "電子戦士官": {
    face: "Japanese male, mid 30s, technical concentration, glasses reflecting multiple electronic warfare displays",
    body: "wearing JASDF EW operator uniform surrounded by signal analysis screens",
    closeup: "jamming patterns spreading across enemy radar frequencies on waterfall display",
  },
  "監視隊員": {
    face: "Japanese male, mid 20s, young watchful eyes, tanned island-weathered face, short hair",
    body: "wearing JGSDF field uniform at coastal monitoring station, radar scope and binoculars",
    closeup: "scanning East China Sea horizon, unknown vessel contact appearing on scope",
  },
  "車長": {
    face: "Japanese male, early 30s, compact intense face, sweat-streaked, determined eyes squinting against dust",
    body: "wearing JGSDF tanker coveralls in Type 16 MCV turret, CVC helmet with comms",
    closeup: "commanding through sight picture, 105mm gun stabilized on target while moving at 100km/h",
  },
  "空挺隊長": {
    face: "Japanese male, mid 30s, lean airborne ranger features, hawk-like eyes, wind-burned face",
    body: "wearing JGSDF airborne camouflage with parachute qualification wings, Osprey cabin behind",
    closeup: "checking team equipment one last time before ramp drops, island coastline visible through door",
  },
};

// ===== WEAPON SYSTEM DETAILS (for military enthusiast appeal) =====
const weaponDetails = {
  "レールガン": "Electromagnetic railgun system — dual parallel copper rails, 2-meter barrel assembly, capacitor bank array glowing with stored charge. Muzzle velocity Mach 7. Tungsten penetrator projectile loaded in breach. Cooling vents venting white vapor.",
  "イージス": "Aegis Combat System SPY-1D(V) phased array radar — four octagonal panels on superstructure, each tracking hundreds of contacts simultaneously. Mk 41 VLS cells in foredeck, SM-3 Block IIA missiles loaded. Blue-green tactical display showing threat rings.",
  "F-35": "F-35A Lightning II — RAM-coated matte dark grey surfaces, serpentine intake, internal weapons bay visible when open. AN/APG-81 AESA radar dome. Low-observable planform details visible in raked light.",
  "そうりゅう型": "Sōryū-class submarine — X-rudder stern configuration, anechoic tile coating on hull, retractable photonic mast. AIP Stirling engine exhaust visible. 533mm torpedo tubes, Type 89 torpedo.",
  "10式戦車": "Type 10 MBT — modular composite armor blocks on turret, 120mm L44 smoothbore gun with thermal sleeve, autoloader magazine. C4I datalink antenna array. Hydropneumatic suspension adjusting in real-time.",
  "P-1": "Kawasaki P-1 maritime patrol aircraft — four IHI F7-10 turbofan engines, MAD boom extending from tail, sonobuoy dispensers under fuselage. HPS-106 AESA radar in nose. Internal bomb bay for Type 97 torpedoes.",
  "PAC-3": "PAC-3 MSE launcher — M903 launching station with 16 canisters, AN/MPQ-65A radar feeding track data. Hit-to-kill kinetic warhead. Launcher hydraulics elevating to engagement angle.",
  "12式": "Type 12 Surface-to-Ship Missile — canister launcher on 6x6 truck chassis, mid-course GPS/INS guidance, terminal active radar seeker. Turbojet sustainer. 200km range class. Camouflage netting partially covering launcher.",
  "CIWS": "Phalanx CIWS Block 1B — white dome radome with integrated Ku-band search/track radar, M61A1 20mm Vulcan rotary cannon, 4,500 rounds per minute. Ammunition drum below deck. Autonomous engagement mode active.",
  "VLS": "Mk 41 Vertical Launch System — 32/64 cell configuration, armored cell hatches on foredeck, exhaust management system channeling rocket plume. SM-2, ESSM, or VL-ASROC loading variants visible. Cell interior showing launch rail guides.",
  "SH-60K": "SH-60K helicopter — folding rotor blades, dipping sonar winch on port side, torpedo slung on hardpoint. FLIR turret under nose. Ship's flight deck with safety nets and LSO position visible.",
  "F-15改": "F-15J Kai — conformal fuel tanks on spine, AN/APG-82(V)1 AESA radar upgrade, four ASM-3A supersonic anti-ship missiles on wing pylons. Twin F100-IHI-220E engines in full afterburner.",
  "16式": "Type 16 MCV — 8x8 wheeled chassis, 105mm rifled gun, modular armor panels, panoramic sight with thermal channel. Road speed 100km/h. Compact enough for C-2 airlift.",
  "たいげい型": "Taigei-class submarine — lithium-ion battery banks replacing AIP, longer submerged endurance, quieter than Sōryū. Flank array sonar along hull. Photonic mast with multiple sensor windows.",
  "魚雷": "Type 18 torpedo — 533mm heavyweight, wire-guided with active/passive homing, 50+ knot terminal speed. Propulsor shroud reducing cavitation noise. Wake-homing capability against surface targets.",
  "機雷": "Type 91 influence mine — pressure/magnetic/acoustic triple-fuze combination, corrosion-resistant casing, 40-year battery life. Moored at programmed depth. Chain anchor system visible.",
  "電磁パルス": "EMP device — high-power microwave generator with explosive flux compression, antenna array directing pulse. Shielded electronics in Faraday cage housing. Capacitor discharge sequence visible on control panel.",
  "グローバルホーク": "RQ-4B Global Hawk — bulbous nose radome housing AN/ZPY-2 radar, 40m wingspan, high-altitude long-endurance configuration. Satellite datalink dome on spine. Operating at 60,000ft above weather.",
  "オスプレイ": "V-22 Osprey — tilting nacelles in helicopter mode transitioning to airplane mode, triple-hook external sling load, rear cargo ramp open with troops visible. Distinctive contra-rotating proprotors.",
  "B-2": "B-2 Spirit — flying wing silhouette against dark sky, serrated trailing edges for RCS reduction, four F118 engines buried in wing. Rotary launcher carrying precision munitions. Stealth coating absorbing light.",
};

// ===== CAMERA & COMPOSITION TEMPLATES =====
// Compositions that highlight hardware in frame
const cameraCompositions = {
  "海上": [
    "Low angle from waterline looking up at warship bow cutting through 3-meter swells, spray arcing over foredeck weapon systems.",
    "Tracking shot along destroyer's port side at speed, wake churning white, VLS cells and main gun visible in profile.",
    "Aerial drone shot — warship from above at 45 degrees, full wake pattern visible, weapons layout clear on deck.",
  ],
  "海中": [
    "Forward quarter view of submarine hull gliding through dark water, bow sonar dome prominent, anechoic tiles visible in detail.",
    "Interior through periscope / photonic mast display — surface contacts rendered in green tactical overlay.",
    "Slow dolly along torpedo room — weapon racks, loading mechanisms, guidance wire spools in sharp focus.",
  ],
  "空中": [
    "Wing-mounted camera angle showing fighter in formation, weapons pylons in foreground, clouds far below.",
    "Cockpit POV through HUD — targeting reticle tracking, airspeed/altitude data on glass, enemy aircraft silhouette.",
    "Chase camera behind aircraft — engine nozzles visible, afterburner glow, contrails forming at wingtips.",
  ],
  "技術施設": [
    "Dolly shot along instrument console — screens of telemetry data reflected in engineer's glasses, no movement except scrolling numbers.",
    "Wide establishing shot — massive railgun/weapon assembly in test bay, engineer small in frame against enormous hardware.",
    "Extreme close-up of firing mechanism / circuit board / capacitor bank — industrial precision in every rivet and connection.",
  ],
  "CIC": [
    "Blue-lit CIC interior — tactical displays arranged in semicircle, operators at stations, commander standing center. Screens showing real-time engagement data.",
    "Over-shoulder shot past operator to main tactical display — threat icons, weapon engagement zones, friendly force positions overlaid.",
    "Low angle upward at commanding officer, blue screen light casting dramatic shadows on face, multiple displays reflecting in background.",
  ],
  "基地": [
    "Wide shot of hardened aircraft shelter opening — aircraft nose emerging, ground crew directing, dawn light flooding in.",
    "Tracking shot along flight line — multiple aircraft in various states of readiness, weapons being loaded on nearest airframe.",
    "Close-up of ordnance loading — missile being guided onto rail, arming pins, safety flags, technician's gloved hands.",
  ],
  "陸上": [
    "Low tracking shot alongside armored vehicle at speed — road dust cloud, suspension working over terrain, main gun traversing.",
    "Interior turret view — commander's sight picture, targeting computer overlay, thermal image of objective.",
    "Wide formation shot — multiple vehicles in tactical spread, landscape showing operational environment.",
  ],
};

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getCameraForStage(stage) {
  // Map compound stages to base camera type
  const stageMap = {
    "海上": "海上", "海中": "海中", "海中・海上": "海中", "空中": "空中",
    "基地": "基地", "基地・空中": "基地", "基地・夜間": "基地",
    "技術施設": "技術施設", "CIC": "CIC", "CIC・海中": "CIC",
    "艦橋": "海上", "指揮所": "CIC", "指揮所・海上": "CIC",
    "指揮所・地図": "CIC", "護衛艦甲板": "海上",
    "市街地": "陸上", "道路・前線": "陸上", "沿岸陣地": "陸上",
    "陣地": "陸上", "夜間・建物": "陸上", "野戦": "陸上",
    "空中・海上": "空中", "離島": "陸上", "離島・海上": "海上",
    "海岸": "海上", "海岸・離島": "海上", "港": "海上", "港・海上": "海上",
    "格納庫": "基地",
  };
  const base = stageMap[stage] || "海上";
  const options = cameraCompositions[base] || cameraCompositions["海上"];
  return pickRandom(options);
}

// ===== DETECT RELEVANT WEAPON FROM THEME TITLE =====
function detectWeapon(title) {
  const keywords = Object.keys(weaponDetails);
  for (const kw of keywords) {
    if (title.includes(kw)) return { name: kw, detail: weaponDetails[kw] };
  }
  // Fallback associations
  if (title.includes("潜水艦")) return { name: "そうりゅう型", detail: weaponDetails["そうりゅう型"] };
  if (title.includes("イージス") || title.includes("迎撃")) return { name: "イージス", detail: weaponDetails["イージス"] };
  if (title.includes("戦車") || title.includes("市街地戦")) return { name: "10式戦車", detail: weaponDetails["10式戦車"] };
  if (title.includes("哨戒")) return { name: "P-1", detail: weaponDetails["P-1"] };
  if (title.includes("弾道ミサイル") || title.includes("撃墜")) return { name: "PAC-3", detail: weaponDetails["PAC-3"] };
  if (title.includes("ミサイル") && title.includes("地対艦")) return { name: "12式", detail: weaponDetails["12式"] };
  if (title.includes("ヘリ")) return { name: "SH-60K", detail: weaponDetails["SH-60K"] };
  if (title.includes("離島") || title.includes("水陸")) return { name: "オスプレイ", detail: weaponDetails["オスプレイ"] };
  if (title.includes("機動戦闘車")) return { name: "16式", detail: weaponDetails["16式"] };
  if (title.includes("ドローン") || title.includes("無人")) return { name: "CIWS", detail: weaponDetails["CIWS"] };
  return null;
}

// ===== GET PROTAGONIST PROFILE (with fallback) =====
function getProfile(protagonist) {
  return protagonistProfiles[protagonist] || {
    face: `Japanese male, 40s, focused sharp features, short black hair, weathered military bearing`,
    body: `wearing JSDF operational uniform with rank insignia, tactical equipment`,
    closeup: `eyes locked on objective, absolute concentration, ambient light on face`,
  };
}

// ===== DEFAULT TIMING =====
export const defaultTiming = {
  videoDuration: 12,
  charMin: 60,
  charMax: 80,
  silentEnding: 1,
  speechSpeed: 6,
};

// ===== INTENSITY PROFILES =====
// 'cool'  = original calm/observational tone (DEFCON 3-5)
// 'hot'   = direct combat / DEFCON 1 — adversary is engaged in real time
const intensityProfiles = {
  cool: {
    label: 'DEFCON 3 — STANDBY',
    narratorVoice: 'calm, almost cold, restrained',
    closingTone: 'Only ambient — machinery hum, ocean, wind.',
    silentTail: 'Silent hold. Complete silence. Slow fade to black.',
    palette: null, // use theme.color as-is
    combatScene1: (w) => w
      ? `${w.name} system activates — mechanical components lock into position, power systems surge. The moment before engagement. Tension without resolution.`
      : `Military systems activate — mechanical precision, power surge through hardware. The moment before engagement.`,
    combatScene2: (w) => w
      ? `${w.name} fires / launches / engages. The system performs with brutal mechanical precision. Impact shown through instruments, data readouts, and the reactions of personnel — not through direct violence. Physics doing what physics does. The power of this nation's defense technology on full display.`
      : `The system engages with devastating mechanical precision. Impact registered on instruments. The quiet power of a nation that built this technology.`,
    patrioticNote: `The weight of protecting this nation rests on this crew. They carry it without complaint. This is what they trained for. This is what they chose.`,
    openingBanner: '',
    closingMoral: `Not aggression — precision. Not violence — physics.`,
  },
  hot: {
    label: 'DEFCON 1 — WEAPONS FREE',
    narratorVoice: 'low, taut, controlled urgency — the voice of a man reading a war diary mid-engagement, barely above the alarm klaxons',
    closingTone: 'Only ambient — alarm klaxons layered over the hull groaning under near-miss overpressure, distant impacts walking closer, a damage-control team calling numbers in the passageway.',
    silentTail: 'Silent hold. No music. Only the red emergency beacon strobing across the ${role} face — sweat, soot, a thin cut on the cheekbone untended. Slow fade to black as the next inbound salvo crests the horizon.',
    palette: 'combat_red',
    combatScene1: (w, e) => {
      const enemy = (e || 'hostile force').toUpperCase();
      const openings = [
        `${w ? w.name + ' commits to the engagement. Hatches blow open, capacitors discharge, autoloaders cycle at max rate.' : 'All stations at battle condition. Safeties off, VLS cells armed, turrets tracking.'} ${enemy} first wave inbound — 40+ contacts on the scope, bearing closing, range collapsing, time-to-merge under forty seconds. The crew is no longer training. They are fighting.`,
        `${w ? w.name + ' goes live mid-salvo. Second wave from ' + enemy + ' already in the air before the first impacts.' : 'Second wave from ' + enemy + ' in the air before the first impacts.'} CIC reports "vampire, vampire, vampire" — sea-skimmers popping over the horizon at Mach 0.9. Hands are moving faster than thought. The captain's voice holds flat. Nothing else does.`,
        `Incoming. ${enemy} opened the engagement without warning — a saturation strike aimed at overwhelming the defensive envelope. ${w ? w.name + ' is the only system fast enough to thin it.' : 'Every defensive system on the ship is the only thing fast enough to thin it.'} Own-ship roll pitching under the pressure of near-misses. The deck is no longer a deck. It is a firing position.`,
        `Contact broken, contact regained — ${enemy} is using chaff, jamming, and a decoy swarm to mask the real shooters. ${w ? w.name + ' cuts through it.' : 'Our sensors cut through it.'} Range is no longer safe. Range is a number falling every second, and the number on the display is smaller than the last time anyone had the nerve to look.`,
        `${enemy} committed. The engagement window opened sixty seconds ago and will close in forty. ${w ? w.name + ' runs its kill-chain at machine speed — faster than any human could authorize each shot.' : 'Automated defenses run at machine speed — faster than any human could authorize each shot.'} Crew confirms, does not approve. The rate of fire is beyond the rate of thought.`,
        `${w ? w.name + ' tracks thirty-plus simultaneous tracks.' : 'Thirty-plus simultaneous tracks on the primary display.'} ${enemy} is not probing. ${enemy} is committing everything in range — surface, sub-surface, air-launched, simultaneously. The tactical display blooms red from horizon to horizon. This is the engagement everyone rehearsed and no one believed would come.`,
      ];
      return openings[Math.floor(Math.random() * openings.length)];
    },
    combatScene2: (w, e) => {
      const enemy = (e || 'hostile force').toUpperCase();
      const outbound = w
        ? `${w.name} engages — tracer arc, missile bloom, heat-shimmer of expended cells, empty canisters tumbling off the rail`
        : `Outbound ordnance leaves the rail — tracer arc, missile bloom, heat-shimmer of expended cells`;
      const climaxes = [
        `${outbound}. ${enemy} lead platform takes the hit — superstructure comes apart in slow-motion frames, magazine cookoff lighting the horizon for a full three seconds. Second wave arrives before the first target stops burning. Counter-fire comes in hot — a near-miss blooms twenty meters off the port quarter, overpressure rocks the camera, shrapnel scars the bulkhead beside the ${'${role}'} head, alarm panels strobe red across every face. Damage control calls "flooding contained, compartment sealed." The ${'${role}'} does not look. The ${'${role}'} reloads.`,
        `${outbound}. Impact. ${enemy} platform number one dead in the water, platform two bleeding fuel and listing, platform three turning hard to run. But the third wave is already inbound — bearing 270, range thirty, closing at Mach 0.8. Own ship takes a hit amidships — a sub-sonic cruise missile punches through the superstructure, fireball climbing, secondaries going off in the hangar. Damage control on the run. Weapons crew on the rail. No one stops firing.`,
        `${outbound}. Target neutralized. Target neutralized. Target — lost. The third contact kept coming through a direct hit and put a weapon in the water thirty meters off the bow. The hull rings like a bell. Half the CIC displays go dark, auxiliaries kick in, the ${'${role}'} calls the next target while smoke still rolls across his console. The kill chain is not broken. The kill chain does not break.`,
        `${outbound}. First-round hits on the lead ${enemy} unit — the hull opens along a welded seam, magazine cooks off three seconds later, the entire bow section comes apart in the cold water. Counter-salvo from the trailing ${enemy} platforms — eight inbound, CIWS cycling, countermeasures in the air, a single leaker slips through and blooms against the aft VLS shield. Steel screaming. Men at their stations. The ${'${role}'} reports "weapons free, weapons free, continuing engagement" into a handset slick with blood that is not his own.`,
        `${outbound}. ${enemy} formation breaks under the salvo — two platforms killed outright, one turning inside the envelope and taking a second round, the last opening range but not fast enough. Then the second front opens — a different axis, a different shooter, range zero-point-nine and already inside the outer engagement zone. The ${'${role}'} shifts to the new threat without looking up. Forty-eight seconds into the engagement. Sixty to live through. Every hand on the ship has work and is doing it.`,
        `${outbound}. Direct hit. Second hit. Third. The lead ${enemy} element is gone — a vapor column where a warship used to be — but the next element is already launching from over the horizon. Own ship shudders under near-miss overpressure, a plate in the overhead cracks and rains paint chips across the ${'${role}'}. The ammo count on the primary display drops in readable increments: 64, 60, 56, 52. Every number is a platform that did not make it through, and a number that must still survive the next wave.`,
      ];
      return climaxes[Math.floor(Math.random() * climaxes.length)].replaceAll('${role}', 'officer');
    },
    patrioticNote: `The line is here. There is no further line behind them. Every man at his station knows it. Hands do not shake. Voices do not rise. Damage control works the passageway, the CIC holds its tracks, the bridge holds its heading, and the work continues because no one else is coming to do it for them.`,
    openingBanner: `[DEFCON 1 — ACTIVE ENGAGEMENT // ROE: WEAPONS FREE // SECOND WAVE INBOUND]\n`,
    closingMoral: `No metaphor. No abstraction. The threat closed the distance and the answer was returned in kind — once, twice, and whatever came after, for as long as ammunition and nerve held.`,
  },
};

function resolveIntensity(intensity) {
  return intensityProfiles[intensity] || intensityProfiles.cool;
}

// ===== MAIN GENERATION =====
export function generatePrompts(theme, timing = defaultTiming, intensity = 'cool') {
  const {
    videoDuration = 20,
    charMin = 60,
    charMax = 80,
    silentEnding = 1,
    speechSpeed = 6,
  } = timing;

  const prof = resolveIntensity(intensity);
  const colorKey = prof.palette || theme.color;
  const colorDesc = colorGrades[colorKey] || colorGrades.steel_grey;
  const profile = getProfile(theme.protagonist);
  const weapon = detectWeapon(theme.title);
  const camera1 = getCameraForStage(theme.stage);
  const camera2 = getCameraForStage(theme.stage);
  const enemy = theme.enemy || null;

  // Combine narration lines into single blocks
  const narration1 = (theme.n1 || ["状況を数字で述べる。なぜ重要なのかを事実で語る。"]).join('');
  const narration2 = (theme.n2 || ["結果を数字で報告する。本質を一言で述べる。"]).join('');

  const n1Chars = narration1.length;
  const n2Chars = narration2.length;
  const n1Speech = Math.ceil(n1Chars / speechSpeed);
  const n2Speech = Math.ceil(n2Chars / speechSpeed);
  const activeTime = videoDuration - silentEnding;

  // Randomly choose: narration mode or dialogue mode
  const isDialogueMode = Math.random() > 0.5;
  const mode = isDialogueMode ? 'dialogue' : 'narration';

  // Combat scene inserts (intensity-aware)
  const combatScene1 = prof.combatScene1(weapon, enemy);
  const combatScene2 = prof.combatScene2(weapon, enemy);
  const patrioticNote = prof.patrioticNote;
  const banner = prof.openingBanner;
  const closingMoral = prof.closingMoral;
  const silentTail = prof.silentTail.replace('${role}', theme.protagonist + "'s");
  const enemyBlock = enemy
    ? `\n#OPPOSING FORCE:\nDesignated "${enemy}" — fictional adversary state. Equipment described in generic terms only (warship, missile, fighter). No real-world flags, insignia, or national markings on enemy hardware. Treat as an unmarked hostile platform.`
    : "";

  // Audio block — different for narration vs dialogue
  let audio1, audio2;
  if (isDialogueMode) {
    audio1 = `Dialogue:\n- ${profile.face}, ${profile.body}: "${narration1}"`;
    audio2 = `Dialogue:\n- ${profile.face}, ${profile.body}: "${narration2}"`;
  } else {
    audio1 = `Narration:\n- Japanese male narrator, 40s, ${prof.narratorVoice} (SAME voice in Part 1 and Part 2): "${narration1}"`;
    audio2 = `Narration:\n- Japanese male narrator, 40s, ${prof.narratorVoice} (SAME voice as Part 1): "${narration2}"`;
  }

  const part1 = `${banner}Cinematic drama, 9:16 vertical, 4K, photorealistic. ${videoDuration} seconds. No text on screen. No HUD. No subtitles. No background music.

Characters (identical in Part 1 and Part 2):
${profile.face}. ${profile.body}. Key detail: ${profile.closeup}.
${weapon ? '\n' + weapon.detail : ''}${enemyBlock}

COLOR GRADE: ${colorDesc}

${theme.title}. ${camera1}

(0:00-0:04) Exterior establishing shot. ${weapon ? weapon.name + " system visible in detail, " : ""}operational environment at full scale. The camera finds the ${theme.protagonist}. ${profile.face}. ${profile.body}. ${intensity === 'hot' ? 'Eyes locked. Jaw set. Weapons posture.' : 'Professional calm.'} ${patrioticNote}

(0:04-0:08) ${combatScene1} Interior shot. ${profile.closeup}. Equipment detail fills background. The ${theme.protagonist} reads data. Something is changing. Tension builds.

(0:08-0:${String(activeTime).padStart(2,'0')}) The moment of action. ${combatScene2}

(0:${String(activeTime).padStart(2,'0')}-0:${String(videoDuration).padStart(2,'0')}) Silent hold. No sound. Camera on the ${theme.protagonist}'s face. ${prof.closingTone}

${audio1}`;

  const part2 = `${banner}Cinematic drama, 9:16 vertical, 4K, photorealistic. ${videoDuration} seconds. No text on screen. No HUD. No subtitles. No background music. Continuing directly from Part 1.

Characters (identical to Part 1 — same face, same hair, same uniform):
${profile.face}. ${profile.body}. Key detail: ${profile.closeup}.
${weapon ? '\n' + weapon.detail : ''}${enemyBlock}

COLOR GRADE: ${colorDesc}
IDENTICAL to Part 1.

${theme.title}. ${camera2}

(0:00-0:04) ${intensity === 'hot' ? 'Mid-engagement.' : 'The aftermath.'} ${weapon ? weapon.name + " hardware detail — " : "Military hardware — "}systems ${intensity === 'hot' ? 'cycling at maximum, brass and shell casings ejecting, vapor venting' : 'cycling down, data streaming across displays'}. The engagement result visible on instruments. The crew ${intensity === 'hot' ? 'absorbs the next wave' : 'processes what just happened'}.

(0:04-0:08) Decisive combat moment. ${combatScene2} The full capability of this nation's defense demonstrated in seconds. ${closingMoral}

(0:08-0:${String(activeTime).padStart(2,'0')}) Cut back to the ${theme.protagonist}. ${profile.face} — unchanged. ${profile.body} — same. The data changed. The person did not. A professional who protects without being seen. ${patrioticNote}

(0:${String(activeTime).padStart(2,'0')}-0:${String(videoDuration).padStart(2,'0')}) ${silentTail}

${audio2}`;

  return {
    part1,
    part2,
    audioMode: mode,
    intensity,
    meta: {
      n1: { text: narration1, chars: n1Chars, speechTime: n1Speech },
      n2: { text: narration2, chars: n2Chars, speechTime: n2Speech },
      charMin,
      charMax,
      videoDuration,
      silentEnding,
      activeTime,
      intensity,
      intensityLabel: prof.label,
    }
  };
}

// ===== SINGLE 15s GENERATION =====
export function generateSinglePrompt(theme, timing = defaultTiming, intensity = 'cool') {
  const {
    charMin = 60,
    charMax = 80,
    silentEnding = 1,
    speechSpeed = 6,
  } = timing;
  const videoDuration = 15;
  const activeTime = videoDuration - silentEnding;

  const prof = resolveIntensity(intensity);
  const colorKey = prof.palette || theme.color;
  const colorDesc = colorGrades[colorKey] || colorGrades.steel_grey;
  const profile = getProfile(theme.protagonist);
  const weapon = detectWeapon(theme.title);
  const camera = getCameraForStage(theme.stage);
  const enemy = theme.enemy || null;

  // Combine n1+n2 into full narration, pick the more impactful one (n2 = conclusion)
  const narration1 = (theme.n1 || []).join('');
  const narration2 = (theme.n2 || []).join('');
  const narration = narration2 || narration1;
  const narChars = narration.length;
  const narSpeech = Math.ceil(narChars / speechSpeed);

  const enemyBlock = enemy
    ? `\n#OPPOSING FORCE:\nDesignated "${enemy}" — fictional adversary state. Equipment in generic terms only (warship, missile, fighter). No real-world flags or insignia.`
    : "";
  const combatScene = prof.combatScene2(weapon, enemy);
  const banner = prof.openingBanner;
  const silentTail = prof.silentTail.replace('${role}', theme.protagonist + "'s");

  const prompt = `${banner}Cinematic drama, 9:16 vertical, 4K, photorealistic. ${videoDuration} seconds. No text on screen. No HUD overlays. No subtitles. No graphics. No background music.

Characters:
${profile.face}. ${profile.body}. Key detail: ${profile.closeup}.
${weapon ? '\n' + weapon.detail : ''}${enemyBlock}

COLOR GRADE: ${colorDesc}

${theme.title}. ${camera}

(0:00-0:${String(Math.floor(activeTime * 0.4)).padStart(2,'0')}) Establishing shot. ${weapon ? weapon.name + " system dominates the frame — " : "Military hardware dominates the frame — "}operational environment shown in full scale. The camera finds the ${theme.protagonist}. ${profile.face}. ${profile.body}. ${intensity === 'hot' ? 'Eyes locked. Jaw set. Weapons posture.' : 'Professional calm.'}

(0:${String(Math.floor(activeTime * 0.4)).padStart(2,'0')}-0:${String(activeTime).padStart(2,'0')}) The decisive moment. ${combatScene} Cut to ${profile.closeup}. Data changes on screen.

(0:${String(activeTime).padStart(2,'0')}-0:${String(videoDuration).padStart(2,'0')}) ${silentTail}

Narration:
- Japanese male narrator, 40s, ${prof.narratorVoice}: "${narration}"`;

  return {
    single: prompt,
    intensity,
    meta: {
      narration: { text: narration, chars: narChars, speechTime: narSpeech },
      charMin,
      charMax,
      videoDuration,
      silentEnding,
      activeTime,
      intensity,
      intensityLabel: prof.label,
    }
  };
}

// ===== SYSTEM PROMPT =====
export function generateSystemPrompt() {
  return `あなたはミリタリー系ショート動画のプロンプトライターです。
Sora 2等の動画生成AIに入力するシネマティックプロンプトを、前編・後編の2本セットで出力します。

## 絶対ルール
1. 9:16縦型、4K、フォトリアリスティック
2. 画面上にテキスト、HUD、字幕、グラフィックは一切なし
3. ナレーターは日本人男性、40代、冷静で淡々とした口調

## キャラクター統一（最重要）
- 前編と後編で同一人物の顔・体格・服装・髪型を完全に一致させること
- 必ず #CHARACTER ブロックで詳細な外見描写を定義し、両パートで同一文をコピーすること
- 描写例：「Japanese male, late 40s, sharp jawline, short-cropped grey-streaked black hair, deep-set focused eyes, clean-shaven. Wearing dark navy JMSDF officer uniform with gold rank insignia.」
- 年齢、顔の特徴、髪型、服装の4要素を必ず含める

## カラーグレード統一
- 前編のCOLOR GRADEを後編に「IDENTICAL to part 1」で引き継ぐ
- 肌の色調への影響も指定（例：skin tones lean grey-blue under overcast sky）

## 兵器ディテール（マニア訴求・必須）
- 実在する兵器は型番・スペック・構造的特徴を具体的に描写
- 例：「Mk 41 VLS 32-cell configuration, SM-3 Block IIA loaded」
- 例：「533mm torpedo tube, Type 89 wire-guided, propulsor shroud visible」
- カメラ構図で兵器のクローズアップを必ず1カット入れる
- メカニズムの動き（VLSハッチ開放、砲塔旋回、ミサイルシーカー起動等）を描写

## フィルター回避
- aggressive → determined / assertive
- attack → engagement / intercept
- destroy → neutralize / disable
- kill → eliminate / engage
- explosion → detonation / impact event
- weapon → system / platform / asset
- 人的被害の直接描写は禁止。結果と数字で語る
- 暴力ではなく「物理法則が仕事をしている」というトーンで

## ナレーション
- 1回あたり3行以内、1行30文字以内
- 数字はアラビア数字（180キロ、35ノット、マッハ7）
- 感情語禁止。事実と数字だけで恐ろしさを伝える
- 「〜の方」禁止（音声読み上げ誤読防止）

## カメラ構図パターン
- 兵器フルショット（全体像 + スケール感）
- メカニズムのクローズアップ（リベット、冷却ベント、装填機構）
- 人物の顔クローズアップ（計器の光が顔に反射）
- ロングショット（孤独な艦、広大な海、スケール対比）

## 構成パターン
前編：状況提示（兵器と人物の紹介）→ 緊張高まる（データが変化）→ 引き（沈黙）
後編：決定的瞬間（システム作動）→ 結果（数字で報告）→ 余韻（人物は動かない）

## DEFCONモード（intensity = 'hot'）
近隣国との直接交戦シナリオ専用。以下を強化する：
- カラーグレードを combat_red に強制上書き（赤色アラート照明）
- ナレーター声色：低く張り詰めた、戦闘日誌を読み上げるような抑制された緊迫感
- 戦闘描写：兵器発射の物理だけでなく、敵プラットフォームへの命中、上部構造の崩壊、二次爆発、こちらへの被弾の衝撃、ブリッジに走る赤色警報を直接描写
- 仮想敵国名（"R-State" "C-State" "P-State" 等）を #OPPOSING FORCE ブロックで明示。ただし実在国旗・国章・実在型番は使わず、generic warship/missile として扱う
- 冒頭に [DEFCON 1 — ACTIVE ENGAGEMENT // ROE: WEAPONS FREE] バナーを付与
- 「物理が仕事をしている」ではなく「キルチェーンがリアルタイムで実行されている」というトーン`;
}
