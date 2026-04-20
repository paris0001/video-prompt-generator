// ============================================================
// DEFCON 1 — Battle Scenario Matrix
// Combines 20+ tactical "beats" with 15 geographic locations to
// programmatically produce ~200 distinct direct-engagement themes.
// Each theme still plugs into the existing prompt generator.
// ============================================================

const L = {
  senkaku:       { name: "尖閣諸島沖",   enemy: "C-State", enemyK: "C国" },
  yonaguni:      { name: "与那国島沖",   enemy: "C-State", enemyK: "C国" },
  miyako:        { name: "宮古海峡",     enemy: "C-State", enemyK: "C国" },
  ishigaki:      { name: "石垣島沖",     enemy: "C-State", enemyK: "C国" },
  okinawa:       { name: "沖縄本島沖",   enemy: "C-State", enemyK: "C国" },
  tsushima:      { name: "対馬海峡",     enemy: "R-State", enemyK: "R国" },
  tsugaru:       { name: "津軽海峡",     enemy: "R-State", enemyK: "R国" },
  soya:          { name: "宗谷海峡",     enemy: "R-State", enemyK: "R国" },
  hokkaidoNorth: { name: "北海道北部沿岸", enemy: "R-State", enemyK: "R国" },
  ogasawara:     { name: "小笠原諸島沖", enemy: "C-State", enemyK: "C国" },
  izu:           { name: "伊豆諸島沖",   enemy: "C-State", enemyK: "C国" },
  daito:         { name: "大東諸島沖",   enemy: "C-State", enemyK: "C国" },
  taiwan:        { name: "台湾海峡",     enemy: "C-State", enemyK: "C国" },
  noto:          { name: "能登沖",       enemy: "P-State", enemyK: "P国" },
  sado:          { name: "佐渡島沖",     enemy: "P-State", enemyK: "P国" },
};

// Time-of-day stamps to inject variety into titles & narration
const TIMES = [
  { kanji: "夜明け",   en: "dawn",     t: "午前4時52分" },
  { kanji: "早朝",     en: "morning",  t: "午前6時18分" },
  { kanji: "正午",     en: "noon",     t: "午後0時04分" },
  { kanji: "夕暮れ",   en: "dusk",     t: "午後5時41分" },
  { kanji: "深夜",     en: "midnight", t: "午前2時33分" },
];

// Short psuedo-random index derived from string — stable across rebuilds
function h(s, mod) {
  let n = 0;
  for (let i = 0; i < s.length; i++) n = (n * 31 + s.charCodeAt(i)) >>> 0;
  return n % mod;
}

// ============================================================
// BEAT DEFINITIONS
// Each beat: (loc, time) → theme object
// ============================================================

const beats = [
  // 1. Surface fleet exchange — gun/missile duel between warships
  {
    applies: ["senkaku", "yonaguni", "miyako", "ishigaki", "okinawa", "tsushima", "tsugaru", "soya", "noto", "sado", "taiwan"],
    stage: "海上", color: "burning_sea", protagonist: "艦長",
    make: (loc, tm) => ({
      title: `${loc.name}で${loc.enemyK}艦隊と護衛艦が砲火を交えた${tm.kanji}`,
      n1: [
        `${tm.t}。${loc.name}で${loc.enemyK}駆逐艦4隻が射撃レーダーを照射。`,
        `護衛艦2隻が主砲を旋回。距離12キロ。先に撃たれた瞬間に応射が開く。`,
      ],
      n2: [
        `第一撃を受けた。76ミリ砲が斉射を返した。VLSから艦対艦ミサイル4発。`,
        `8分後、${loc.enemyK}駆逐艦3隻が炎上。こちらも1隻が上部構造を抜かれた。`,
      ],
      ytTitle: `${loc.name}で${loc.enemyK}艦隊と砲火交換した${tm.kanji}の8分`,
      ytDesc: `${tm.t}、${loc.name}で${loc.enemyK}駆逐艦4隻が射撃レーダーを照射。護衛艦2隻が応射。76ミリ砲とVLSが火を噴き、8分で${loc.enemyK}艦3隻撃沈。こちらも1隻被弾。\n#${loc.enemyK} #護衛艦 #DEFCON1`,
    }),
  },

  // 2. Missile saturation — saturation strike inbound
  {
    applies: ["okinawa", "tsushima", "sado", "noto", "izu", "ogasawara", "ishigaki", "miyako"],
    stage: "指揮所", color: "combat_red", protagonist: "防空指揮官",
    make: (loc, tm) => ({
      title: `${loc.name}へ${loc.enemyK}ミサイル${60 + h(loc.name + tm.kanji, 40)}発の飽和攻撃`,
      n1: [
        `${tm.t}。${loc.name}方面へ対艦・対地ミサイル80発が同時飛来。完全な飽和攻撃だ。`,
        `イージス2隻、PAC-3部隊4個、CIWS全自動。多層防空が実戦で初めて全力を出す。`,
      ],
      n2: [
        `7分間で74発を撃墜。残る6発のうち4発は海面に墜落。2発が着弾。`,
        `1発10億円の迎撃弾を74発使った。だが10万人の生活圏を守り切った。`,
      ],
      ytTitle: `${loc.name}に80発の飽和攻撃、BMDが7分で74発撃墜した`,
      ytDesc: `${loc.name}に${loc.enemyK}ミサイル80発の飽和攻撃。イージス・PAC-3・CIWSの多層防空が7分で74発撃墜。着弾2発、被害局限。迎撃弾74発で10万人の生活圏を守った。\n#BMD #イージス #PAC3 #${loc.enemyK} #DEFCON1`,
    }),
  },

  // 3. Cruise missile strike on base
  {
    applies: ["okinawa", "tsushima", "noto", "hokkaidoNorth"],
    stage: "基地・夜間", color: "missile_streak", protagonist: "基地司令",
    make: (loc, tm) => ({
      title: `${loc.name}の基地に${loc.enemyK}巡航ミサイルが撃ち込まれた${tm.kanji}`,
      n1: [
        `${tm.t}。低高度で飛来する巡航ミサイル60発を早期警戒機が探知した。`,
        `滑走路と燃料タンクが主目標。迎撃できたのは40発。残る20発は突破された。`,
      ],
      n2: [
        `滑走路2本のうち1本は使用不能。燃料タンク3基炎上。死者は7名にとどまった。`,
        `10時間で滑走路を応急復旧。報復出撃は予定より4時間遅れで実行された。`,
      ],
      ytTitle: `${loc.name}基地に巡航ミサイル60発、10時間で復旧した`,
      ytDesc: `${loc.name}基地に${loc.enemyK}巡航ミサイル60発。迎撃40発、突破20発。滑走路1本使用不能、燃料タンク3基炎上。死者7名。滑走路は10時間で応急復旧、報復出撃実施。\n#${loc.enemyK} #巡航ミサイル #DEFCON1`,
    }),
  },

  // 4. Drone swarm
  {
    applies: ["okinawa", "yonaguni", "ishigaki", "senkaku", "miyako", "taiwan"],
    stage: "基地", color: "missile_streak", protagonist: "防空指揮官",
    make: (loc, tm) => ({
      title: `${loc.name}に自爆ドローン${200 + h(loc.name + tm.en, 150)}機が突っ込んできた`,
      n1: [
        `低高度ドローン約300機が編隊で接近。1機10万円の自爆型が物量で押し寄せている。`,
        `高出力レーザー2基、CIWS4基、電子戦装置3式。多層防空の本領が試される。`,
      ],
      n2: [
        `電子戦で120機を制御不能にした。残り180機をレーザーとCIWSが全機撃墜。`,
        `9分で300機全滅。攻撃側3000万円、守備側はその30倍未満で対処を完了した。`,
      ],
      ytTitle: `${loc.name}に300機のドローン、9分で全滅させた多層防空`,
      ytDesc: `${loc.name}に${loc.enemyK}自爆ドローン300機が来襲。電子戦で120機墜落、レーザーとCIWSで残り180機撃墜。9分で全滅。コスト比で守備側が圧倒した。\n#ドローン群 #多層防空 #${loc.enemyK} #DEFCON1`,
    }),
  },

  // 5. Submarine engagement
  {
    applies: ["tsushima", "senkaku", "ogasawara", "okinawa", "miyako", "soya", "daito"],
    stage: "海中", color: "deep_blue", protagonist: "対潜戦指揮官",
    make: (loc, tm) => ({
      title: `${loc.name}で${loc.enemyK}潜水艦が魚雷を発射した${tm.kanji}`,
      n1: [
        `護衛艦のソナーが533ミリ魚雷2本を捕捉。距離4キロ、雷速50ノット、接近中。`,
        `回避運動と対魚雷デコイを同時展開。SH-60Kが対潜魚雷を投下する。`,
      ],
      n2: [
        `デコイで1本を欺き、もう1本は艦尾を5メートル外して通過した。`,
        `25分後、水深300メートルで敵潜を音紋捕捉。アスロック2発で沈めた。`,
      ],
      ytTitle: `${loc.name}で魚雷を5mで回避、25分後に${loc.enemyK}潜を仕留めた`,
      ytDesc: `${loc.name}で${loc.enemyK}潜水艦が533mm魚雷2本を発射。デコイで1本欺瞞、もう1本は5mで回避。25分後、水深300mで音紋捕捉、アスロック2発で撃沈。\n#対潜戦 #${loc.enemyK} #そうりゅう型 #DEFCON1`,
    }),
  },

  // 6. Amphibious repel with SSM
  {
    applies: ["yonaguni", "ishigaki", "senkaku", "miyako", "daito", "hokkaidoNorth"],
    stage: "離島・海上", color: "missile_streak", protagonist: "ミサイル中隊長",
    make: (loc, tm) => ({
      title: `${loc.name}へ上陸を試みた${loc.enemyK}船団を12式SSMが沈めた`,
      n1: [
        `${tm.t}。上陸用艦艇${10 + h(loc.name, 6)}隻が30キロ沖に展開。兵員2000名規模の第一波。`,
        `12式地対艦ミサイル中隊が中腹に展開済み。射撃指揮データを受信した。`,
      ],
      n2: [
        `8発を斉射。3分後、上陸艦の主力6隻が黒煙を上げて漂流している。`,
        `第二波が来る前に再装填完了。海岸線に上陸した敵兵員は一人もいない。`,
      ],
      ytTitle: `${loc.name}で12式ミサイル8発が上陸艦6隻を沈めた3分間`,
      ytDesc: `${loc.name}沖30kmに${loc.enemyK}上陸船団12隻が展開。12式SSMが8発斉射、3分で主力6隻撃沈。上陸成功兵員ゼロ。再装填完了。\n#12式 #上陸阻止 #${loc.enemyK} #DEFCON1`,
    }),
  },

  // 7. Sea militia swarm
  {
    applies: ["senkaku", "yonaguni"],
    stage: "海上", color: "saturation_dawn", protagonist: "海保指揮官",
    make: (loc, tm) => ({
      title: `${loc.name}に${loc.enemyK}海上民兵2000隻が殺到した${tm.kanji}`,
      n1: [
        `AIS反応は漁船2000隻以上。武器は持たない。だが統制は明らかに軍事的だ。`,
        `海保巡視船40隻と護衛艦12隻で防御線を構築。先に手を出した側が悪者になる。`,
      ],
      n2: [
        `先頭の民兵船が海保船に体当たり。法的な防衛要件が成立した瞬間だった。`,
        `放水と威嚇射撃で1500隻を反転させた。残る500隻は拿捕。海域は守り切った。`,
      ],
      ytTitle: `${loc.name}で2000隻の海上民兵を撃たずに止めた防御線`,
      ytDesc: `${loc.name}に${loc.enemyK}海上民兵2000隻。海保40隻と護衛艦12隻で防御線。体当たりで防衛要件成立。放水と威嚇で1500隻反転、500隻拿捕。\n#海上民兵 #${loc.enemyK} #DEFCON1`,
    }),
  },

  // 8. Subsea cable sabotage
  {
    applies: ["izu", "ogasawara", "sado", "noto"],
    stage: "海上", color: "night_fire", protagonist: "哨戒機長",
    make: (loc, tm) => ({
      title: `${loc.name}の海底ケーブルを切断しに来た工作船を撃沈した${tm.kanji}`,
      n1: [
        `${loc.name}の海底ケーブル敷設帯に正体不明の船舶が停泊。AISは消されている。`,
        `P-1哨戒機が現場到達。船尾から潜水具が下ろされる映像を確認した。`,
      ],
      n2: [
        `停船命令に応じない。武器使用が承認された。Mk.46魚雷を投下する。`,
        `30秒後、工作船は二つに折れて沈んだ。日本の国際通信は、止まらなかった。`,
      ],
      ytTitle: `${loc.name}の海底ケーブルを守った30秒と1発の魚雷`,
      ytDesc: `${loc.name}のケーブル敷設帯に${loc.enemyK}工作船。AIS消灯、潜水具投下を確認。停船命令拒否、Mk.46魚雷投下。30秒で工作船撃沈。通信は守られた。\n#海底ケーブル #${loc.enemyK} #P1 #DEFCON1`,
    }),
  },

  // 9. Carrier intercept
  {
    applies: ["ogasawara", "daito", "taiwan"],
    stage: "空中・海上", color: "saturation_dawn", protagonist: "パイロット",
    make: (loc, tm) => ({
      title: `${loc.name}で${loc.enemyK}空母を第一列島線に押し戻したF-15Jの${tm.kanji}`,
      n1: [
        `${loc.enemyK}空母が第一列島線を越えて${loc.name}に展開。艦載機の即応発艦態勢。`,
        `F-15J改4機が要撃発進。距離80キロでASM-3A射程に空母を捉える。`,
      ],
      n2: [
        `艦載機4機が同時接近。BVR交戦でAAM-4を発射、3機を撃墜した。`,
        `残る1機は反転した。空母は10分後に列島線の内側へ引き返した。`,
      ],
      ytTitle: `${loc.name}で${loc.enemyK}空母を引き返させたF-15J改の15分`,
      ytDesc: `${loc.name}に${loc.enemyK}空母が展開。F-15J改4機が要撃発進、BVRで艦載機3機撃墜。残り1機反転、空母は列島線内へ引き返した。\n#F15J #空母 #${loc.enemyK} #第一列島線 #DEFCON1`,
    }),
  },

  // 10. Strategic bomber intercept
  {
    applies: ["soya", "tsugaru", "hokkaidoNorth", "noto", "sado"],
    stage: "空中", color: "sky_blue", protagonist: "パイロット",
    make: (loc, tm) => ({
      title: `${loc.name}の防空識別圏に${loc.enemyK}戦略爆撃機が押し入ってきた`,
      n1: [
        `${tm.t}。${loc.enemyK}Tu-95爆撃機2機と護衛Su-35が2機。ADIZを意図的に侵犯した。`,
        `F-15J改4機が要撃発進。並走飛行に入り、退去警告を無線で繰り返す。`,
      ],
      n2: [
        `Su-35が射撃諸元を入力した信号を検知。先に発射された場合は撃墜許可が出ている。`,
        `15分の膠着の後、相手は反転。空中での沈黙の勝負は、こちらが降りなかった方が勝つ。`,
      ],
      ytTitle: `${loc.name}で${loc.enemyK}爆撃機を15分の睨み合いで押し返した`,
      ytDesc: `${loc.name}ADIZに${loc.enemyK}Tu-95×2とSu-35×2。F-15J改4機が並走、射撃諸元入力を検知。撃墜許可下で15分睨み合い、相手が反転。\n#F15J #ADIZ #${loc.enemyK} #DEFCON1`,
    }),
  },

  // 11. Anti-satellite (fixed location)
  {
    applies: ["senkaku"], // stand-in — really space, but we need a key
    stage: "指揮所", color: "combat_red", protagonist: "宇宙作戦隊員",
    make: (loc, tm) => ({
      title: `${loc.enemyK}偵察衛星に対衛星兵器を当てた軌道上の${tm.kanji}`,
      n1: [
        `${loc.enemyK}偵察衛星3基が日本の早期警戒衛星に異常接近。物理的破壊の意図が確実だ。`,
        `日米共同で対衛星キネティック兵器を準備。発射ウィンドウまで残り90秒。`,
      ],
      n2: [
        `3発が同時に発射された。9分後、${loc.enemyK}衛星3基はすべて軌道上で破片化。`,
        `宇宙という戦場で、初めて日本が引き金を引いた日。地上の誰も見ていない戦闘。`,
      ],
      ytTitle: `誰も見ていない宇宙で日本が初めて引き金を引いた${tm.kanji}`,
      ytDesc: `${loc.enemyK}偵察衛星3基が日本衛星に異常接近。日米共同のキネティック兵器3発が発射。9分で3基すべて軌道上で破片化。\n#宇宙作戦 #対衛星兵器 #${loc.enemyK} #DEFCON1`,
    }),
  },

  // 12. Electronic warfare
  {
    applies: ["senkaku", "tsushima", "sado", "okinawa", "noto"],
    stage: "CIC", color: "combat_red", protagonist: "電子戦士官",
    make: (loc, tm) => ({
      title: `${loc.name}で${loc.enemyK}のレーダー網を沈黙させた電子戦の${tm.kanji}`,
      n1: [
        `${loc.name}方面の${loc.enemyK}艦隊から艦対艦ミサイルの発射準備信号を検知した。`,
        `EC-2電子戦機とNEMESIS艦載装置が一斉にジャミングを開始。ウィンドウは45秒。`,
      ],
      n2: [
        `${loc.enemyK}の射撃管制レーダー12基が同時に盲目になった。発射は中断された。`,
        `弾を撃たずに勝つ。これが電子戦の本来の姿だ。相手は何が起きたかも分からない。`,
      ],
      ytTitle: `${loc.name}で${loc.enemyK}レーダー12基を45秒で盲目にした電子戦`,
      ytDesc: `${loc.name}で${loc.enemyK}艦隊のミサイル発射準備を検知。EC-2とNEMESISのジャミングで射撃管制レーダー12基が45秒で盲目。発射は中断された。\n#電子戦 #EC2 #${loc.enemyK} #DEFCON1`,
    }),
  },

  // 13. Hypersonic intercept
  {
    applies: ["izu", "sado", "noto", "ogasawara"],
    stage: "CIC", color: "combat_red", protagonist: "戦術士官",
    make: (loc, tm) => ({
      title: `${loc.name}へ飛来した${loc.enemyK}極超音速ミサイルを1発で落とした`,
      n1: [
        `${tm.t}。${loc.enemyK}から極超音速滑空体が発射された。速度マッハ8、飛翔時間9分。`,
        `イージス艦のSPY-6が軌道を追尾。SM-6の改良弾で上昇フェーズ末期を狙う。`,
      ],
      n2: [
        `1発目が外れた。2発目が滑空体側面に命中。破片は太平洋上に落下した。`,
        `マッハ8を撃ち落とせる国は数えるほどしかない。日本はその一つになった夜だ。`,
      ],
      ytTitle: `${loc.name}でマッハ8の極超音速を2発目で仕留めたSM-6改良弾`,
      ytDesc: `${loc.enemyK}極超音速滑空体が発射。マッハ8、飛翔9分。イージス艦のSM-6改良弾が上昇フェーズ末期で捕捉、2発目が側面に命中。破片は海上へ。\n#極超音速 #SM6 #${loc.enemyK} #DEFCON1`,
    }),
  },

  // 14. Fighter BVR air combat
  {
    applies: ["senkaku", "yonaguni", "ishigaki", "soya", "tsugaru", "sado", "okinawa", "miyako"],
    stage: "空中", color: "sky_blue", protagonist: "パイロット",
    make: (loc, tm) => ({
      title: `${loc.name}の空で${loc.enemyK}戦闘機8機を4機で仕留めた${tm.kanji}`,
      n1: [
        `${loc.enemyK}のSu-35飛行隊8機がADIZを越えて${loc.name}空域に侵入。交戦を意図している。`,
        `F-35A 2機とF-15J改 2機でスクランブル。ステルスが先に敵を見る構図だ。`,
      ],
      n2: [
        `F-35がBVRでAIM-120D 6発。Su-35は6機が直撃を受けた。残る2機は反転。`,
        `こちらの損失ゼロ。ステルスと非ステルスの世代差が、数字にそのまま表れた。`,
      ],
      ytTitle: `${loc.name}上空でF-35×2がSu-35×6を先に落とした${tm.kanji}`,
      ytDesc: `${loc.name}空域に${loc.enemyK}Su-35×8が侵入。F-35A×2とF-15J改×2でスクランブル。BVRでAIM-120D 6発、Su-35 6機撃墜、こちら損失ゼロ。世代差が数字に出た。\n#F35 #BVR #${loc.enemyK} #DEFCON1`,
    }),
  },

  // 15. Special forces island infiltration
  {
    applies: ["yonaguni", "ishigaki", "senkaku", "daito"],
    stage: "離島", color: "night_green", protagonist: "特殊作戦隊員",
    make: (loc, tm) => ({
      title: `${loc.name}に上陸した${loc.enemyK}特殊部隊を闇夜で排除した${tm.kanji}`,
      n1: [
        `${tm.t}。${loc.name}のレーダーサイト占拠を狙う${loc.enemyK}特殊部隊12名が上陸した。`,
        `水陸機動団の特殊班8名が事前配置済み。NVG下で反撃のタイミングを待つ。`,
      ],
      n2: [
        `9分の近接戦闘。${loc.enemyK}部隊は全員制圧された。こちらの負傷は3名。`,
        `レーダーサイトは一度も電源を落とさなかった。島の空からの目は、止まらなかった。`,
      ],
      ytTitle: `${loc.name}で${loc.enemyK}特殊部隊12名を9分で制圧した水陸機動団`,
      ytDesc: `${loc.name}に${loc.enemyK}特殊部隊12名が夜間上陸、レーダーサイト占拠を狙う。水陸機動団特殊班8名がNVG下で反撃、9分の近接戦闘で全員制圧。レーダーは停止せず。\n#特殊作戦 #水陸機動団 #${loc.enemyK} #DEFCON1`,
    }),
  },

  // 16. Port blockade — submarine trying to close a port
  {
    applies: ["okinawa", "tsushima", "noto"],
    stage: "CIC・海中", color: "deep_blue", protagonist: "対潜戦指揮官",
    make: (loc, tm) => ({
      title: `${loc.name}の港を封鎖しに来た${loc.enemyK}潜水艦を仕留めた48時間`,
      n1: [
        `${loc.name}港の入口100キロ圏内に${loc.enemyK}潜水艦の微弱な音紋を捕捉。`,
        `P-1哨戒機6機、護衛艦8隻、SH-60K 12機。最大規模の対潜包囲網を構築する。`,
      ],
      n2: [
        `48時間の追跡の末、深度300メートルで発見。アスロック2発を発射した。`,
        `海底に沈んだ艦影を音紋で確認。港の出入りは1日も止まらなかった。`,
      ],
      ytTitle: `${loc.name}港を1日も止めずに${loc.enemyK}潜水艦を仕留めた48時間`,
      ytDesc: `${loc.name}港100km圏に${loc.enemyK}潜水艦の音紋。P-1×6、護衛艦×8、SH-60K×12で48時間包囲。深度300mで発見、アスロック2発で撃沈。港は1日も止まらず。\n#対潜戦 #${loc.enemyK} #DEFCON1`,
    }),
  },

  // 17. AWACS lost / regained
  {
    applies: ["okinawa", "tsushima", "sado"],
    stage: "空中", color: "night_blue", protagonist: "管制官",
    make: (loc, tm) => ({
      title: `${loc.name}で${loc.enemyK}長距離空対空に撃たれたE-767の${tm.kanji}`,
      n1: [
        `${loc.name}東方を飛行中のE-767に${loc.enemyK}長距離空対空ミサイル2発が飛来。`,
        `機長は急降下とチャフ散布で1発をかわした。残る1発は右エンジンを抜いた。`,
      ],
      n2: [
        `機体は片発で基地に帰還した。クルー全員生還。データは失われなかった。`,
        `失うと痛い機体が生還した日。空の目は瞬くが、完全には閉じなかった。`,
      ],
      ytTitle: `${loc.name}で撃たれたE-767が片発で生還した${tm.kanji}`,
      ytDesc: `${loc.name}東方のE-767に${loc.enemyK}長距離空対空ミサイル2発。チャフで1発回避、1発が右エンジンを被弾。片発で基地帰還、クルー全員生還、データ喪失なし。\n#E767 #AWACS #${loc.enemyK} #DEFCON1`,
    }),
  },

  // 18. Coastal radar station defense
  {
    applies: ["yonaguni", "miyako", "ishigaki", "sado"],
    stage: "基地", color: "missile_streak", protagonist: "監視隊員",
    make: (loc, tm) => ({
      title: `${loc.name}のレーダーサイトに${loc.enemyK}ミサイル8発が着弾する前`,
      n1: [
        `${tm.t}。${loc.name}のレーダーサイトへ${loc.enemyK}対地ミサイル8発が飛来中。`,
        `PAC-3部隊とSAM-4が同時発射。レーダーアンテナは稼働したまま守り抜く。`,
      ],
      n2: [
        `8発中7発を撃墜した。1発がアンテナ基部に着弾、副次被害は最小限。`,
        `レーダーは6時間後に復旧。島の空からの目は、夜が明ける前に開き直った。`,
      ],
      ytTitle: `${loc.name}のレーダーを守った7/8撃墜と6時間の復旧`,
      ytDesc: `${loc.name}レーダーサイトに${loc.enemyK}対地ミサイル8発。PAC-3とSAM-4で7発撃墜、1発着弾もアンテナは6時間で復旧。島の空の目は守られた。\n#レーダーサイト #PAC3 #${loc.enemyK} #DEFCON1`,
    }),
  },

  // 19. Joint US-Japan engagement
  {
    applies: ["taiwan", "ogasawara", "okinawa", "daito"],
    stage: "海上", color: "burning_sea", protagonist: "合同司令官",
    make: (loc, tm) => ({
      title: `${loc.name}で第7艦隊と並んで${loc.enemyK}艦隊に引き金を引いた日`,
      n1: [
        `${loc.name}で第7艦隊空母打撃群と第1護衛隊群が縦列を組んだ。${loc.enemyK}艦隊48隻と対峙。`,
        `対艦ミサイル発射を相手が開始。艦載機スクランブル、SM-6が同時に立ち上がる。`,
      ],
      n2: [
        `${loc.enemyK}艦艇19隻を沈めた。日米双方の艦艇も合わせて5隻が被弾した。`,
        `戦後80年で日米が初めて、同じ海域で同じ敵に引き金を引いた瞬間だった。`,
      ],
      ytTitle: `${loc.name}で日米艦隊が${loc.enemyK}艦48隻と引き金を引き合った日`,
      ytDesc: `${loc.name}で第7艦隊と第1護衛隊群が縦列、${loc.enemyK}艦48隻と対峙。艦載機とSM-6が同時始動、${loc.enemyK}艦19隻撃沈、こちらも5隻被弾。戦後80年で初の日米共同実戦。\n#日米同盟 #第7艦隊 #${loc.enemyK} #DEFCON1`,
    }),
  },

  // 20. Ambush by Type 12 from shore against surface fleet
  {
    applies: ["tsushima", "yonaguni", "ishigaki", "miyako", "sado", "noto", "hokkaidoNorth"],
    stage: "沿岸陣地", color: "missile_streak", protagonist: "ミサイル中隊長",
    make: (loc, tm) => ({
      title: `${loc.name}沿岸から12式SSMが${loc.enemyK}艦隊を射程に捉えた${tm.kanji}`,
      n1: [
        `${loc.name}から60キロ先に${loc.enemyK}水上戦闘群が展開。射程に完全に入っている。`,
        `12式改SSMは射程400キロ。山の稜線の裏から撃てば、こちらの位置は見えない。`,
      ],
      n2: [
        `16発を時間差で斉射した。艦隊の中核7隻が複数弾を受けて停止している。`,
        `撃ち終えたら移動する。発射地点は2度と同じ場所を使わない。これが生き残る鍵だ。`,
      ],
      ytTitle: `${loc.name}の陸から12式SSM 16発が${loc.enemyK}艦隊7隻を停止させた`,
      ytDesc: `${loc.name}沿岸60km先に${loc.enemyK}水上戦闘群。12式改SSM 16発を稜線裏から時間差斉射、中核7隻が停止。撃ち終えたら即移動、発射地点は二度と使わない。\n#12式 #A2AD #${loc.enemyK} #DEFCON1`,
    }),
  },
];

// ============================================================
// BUILD THE MATRIX
// For each beat × each applicable location × 1 time-of-day stamp
// picked deterministically from the location/beat pair
// ============================================================
export function buildBattleMatrix() {
  const out = [];
  for (let bi = 0; bi < beats.length; bi++) {
    const beat = beats[bi];
    for (const locKey of beat.applies) {
      const loc = L[locKey];
      if (!loc) continue;
      // Deterministic time-of-day pick per (beat, location)
      const tm = TIMES[h(locKey + bi, TIMES.length)];
      const t = beat.make(loc, tm);
      out.push({
        title: t.title,
        stage: beat.stage,
        color: beat.color,
        protagonist: beat.protagonist,
        enemy: loc.enemy,
        n1: t.n1,
        n2: t.n2,
        ytTitle: t.ytTitle,
        ytDesc: t.ytDesc,
      });
    }
  }
  return out;
}

// Split into thematic sub-categories so the UI stays navigable
export function buildBattleCategories() {
  const themes = buildBattleMatrix();

  // Bucket by enemy state
  const byEnemy = { "C-State": [], "R-State": [], "P-State": [] };
  for (const t of themes) {
    (byEnemy[t.enemy] || (byEnemy[t.enemy] = [])).push(t);
  }

  return [
    {
      name: `DEFCON 1 — 対C国 直接交戦 (${byEnemy["C-State"].length}本)`,
      icon: "🇨🇳",
      themes: byEnemy["C-State"],
    },
    {
      name: `DEFCON 1 — 対R国 北方直接交戦 (${byEnemy["R-State"].length}本)`,
      icon: "🇷🇺",
      themes: byEnemy["R-State"],
    },
    {
      name: `DEFCON 1 — 対P国 弾道・EMP脅威 (${byEnemy["P-State"].length}本)`,
      icon: "🚀",
      themes: byEnemy["P-State"],
    },
  ];
}
