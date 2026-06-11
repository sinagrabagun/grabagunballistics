/* Representative-but-real ballistics catalog.
   Each caliber carries a category, bullet diameter (in), a velocity-per-inch-of-barrel
   factor (fps/in) for barrel-length adjustment, and a typical test barrel length.
   Each load: manufacturer, product line, bullet weight (gr), G1 BC, G7 BC (where the
   bullet is a boat-tail/match design), advertised muzzle velocity (fps) at the listed
   test-barrel length, and a bullet-type tag.
   Numbers reflect published factory data; structured so a full catalog can be dropped in. */
window.BALLISTICS_DATA = [
  /* ---------------------------- RIMFIRE ---------------------------- */
  {
    id: "22lr", name: ".22 LR", category: "Rimfire", diameter: 0.224,
    fpsPerInch: 12, testBarrel: 24, defaultBarrel: 18,
    loads: [
      { mfr: "CCI", line: "Mini-Mag", grains: 40, bcG1: 0.138, mv: 1235, testBarrel: 24, type: "CPRN" },
      { mfr: "CCI", line: "Stinger", grains: 32, bcG1: 0.084, mv: 1640, testBarrel: 24, type: "CPHP" },
      { mfr: "CCI", line: "Standard Velocity", grains: 40, bcG1: 0.146, mv: 1070, testBarrel: 24, type: "LRN" },
      { mfr: "Federal", line: "Premium Gold Medal", grains: 40, bcG1: 0.172, mv: 1080, testBarrel: 24, type: "LRN" },
      { mfr: "Winchester", line: "Super-X", grains: 40, bcG1: 0.130, mv: 1300, testBarrel: 24, type: "CPHP" },
      { mfr: "Eley", line: "Tenex", grains: 40, bcG1: 0.172, mv: 1085, testBarrel: 24, type: "LRN" }
    ]
  },
  {
    id: "17hmr", name: ".17 HMR", category: "Rimfire", diameter: 0.172,
    fpsPerInch: 18, testBarrel: 24, defaultBarrel: 22,
    loads: [
      { mfr: "Hornady", line: "V-MAX", grains: 17, bcG1: 0.125, mv: 2550, testBarrel: 24, type: "V-MAX" },
      { mfr: "CCI", line: "TNT", grains: 17, bcG1: 0.124, mv: 2550, testBarrel: 24, type: "JHP" },
      { mfr: "Federal", line: "Premium", grains: 20, bcG1: 0.144, mv: 2375, testBarrel: 24, type: "Tipped" }
    ]
  },

  /* ---------------------------- .22 CENTERFIRE ---------------------------- */
  {
    id: "223rem", name: ".223 Rem / 5.56 NATO", category: "Rifle", diameter: 0.224,
    fpsPerInch: 25, testBarrel: 24, defaultBarrel: 16,
    loads: [
      { mfr: "Hornady", line: "ELD Match", grains: 73, bcG1: 0.398, bcG7: 0.200, mv: 2790, testBarrel: 24, type: "ELD-M" },
      { mfr: "Hornady", line: "ELD-X Precision Hunter", grains: 62, bcG1: 0.295, bcG7: 0.148, mv: 3000, testBarrel: 24, type: "ELD-X" },
      { mfr: "Hornady", line: "V-MAX", grains: 55, bcG1: 0.255, mv: 3240, testBarrel: 24, type: "V-MAX" },
      { mfr: "Hornady", line: "Black", grains: 75, bcG1: 0.395, bcG7: 0.198, mv: 2790, testBarrel: 24, type: "BTHP" },
      { mfr: "Federal", line: "Gold Medal Sierra MatchKing", grains: 77, bcG1: 0.362, bcG7: 0.181, mv: 2720, testBarrel: 24, type: "SMK" },
      { mfr: "Federal", line: "American Eagle", grains: 55, bcG1: 0.243, mv: 3240, testBarrel: 20, type: "FMJ" },
      { mfr: "Federal", line: "Fusion MSR", grains: 62, bcG1: 0.304, mv: 2750, testBarrel: 20, type: "Bonded SP" },
      { mfr: "Sierra", line: "MatchKing", grains: 69, bcG1: 0.301, bcG7: 0.151, mv: 2950, testBarrel: 24, type: "SMK" },
      { mfr: "Barnes", line: "VOR-TX", grains: 55, bcG1: 0.255, mv: 3100, testBarrel: 24, type: "TSX" },
      { mfr: "Nosler", line: "Ballistic Tip", grains: 55, bcG1: 0.267, mv: 3100, testBarrel: 24, type: "BT" },
      { mfr: "PMC", line: "Bronze", grains: 55, bcG1: 0.243, mv: 3200, testBarrel: 20, type: "FMJ" },
      { mfr: "Winchester", line: "USA", grains: 62, bcG1: 0.260, mv: 3020, testBarrel: 20, type: "FMJ" },
      { mfr: "Sellier & Bellot", line: "FMJ", grains: 55, bcG1: 0.243, mv: 3150, testBarrel: 24, type: "FMJ" },
      { mfr: "Sellier & Bellot", line: "HPBT Match", grains: 69, bcG1: 0.301, bcG7: 0.151, mv: 2887, testBarrel: 24, type: "HPBT" }
    ]
  },
  {
    id: "22250", name: ".22-250 Rem", category: "Rifle", diameter: 0.224,
    fpsPerInch: 30, testBarrel: 24, defaultBarrel: 24,
    loads: [
      { mfr: "Hornady", line: "Superformance V-MAX", grains: 50, bcG1: 0.242, mv: 4000, testBarrel: 24, type: "V-MAX" },
      { mfr: "Hornady", line: "ELD-X", grains: 64, bcG1: 0.345, bcG7: 0.173, mv: 3500, testBarrel: 24, type: "ELD-X" },
      { mfr: "Federal", line: "Power-Shok", grains: 55, bcG1: 0.255, mv: 3680, testBarrel: 24, type: "SP" },
      { mfr: "Nosler", line: "Varmageddon", grains: 55, bcG1: 0.236, mv: 3650, testBarrel: 24, type: "FBHP" }
    ]
  },

  /* ---------------------------- 6mm / .243 ---------------------------- */
  {
    id: "243win", name: ".243 Winchester", category: "Rifle", diameter: 0.243,
    fpsPerInch: 28, testBarrel: 24, defaultBarrel: 22,
    loads: [
      { mfr: "Hornady", line: "ELD-X Precision Hunter", grains: 90, bcG1: 0.409, bcG7: 0.205, mv: 3150, testBarrel: 24, type: "ELD-X" },
      { mfr: "Hornady", line: "Superformance SST", grains: 95, bcG1: 0.355, mv: 3185, testBarrel: 24, type: "SST" },
      { mfr: "Federal", line: "Fusion", grains: 95, bcG1: 0.380, mv: 3000, testBarrel: 24, type: "Bonded SP" },
      { mfr: "Nosler", line: "AccuBond", grains: 90, bcG1: 0.376, mv: 3100, testBarrel: 24, type: "AccuBond" },
      { mfr: "Winchester", line: "Deer Season XP", grains: 95, bcG1: 0.347, mv: 3100, testBarrel: 24, type: "Extreme Point" }
    ]
  },
  {
    id: "6creedmoor", name: "6mm Creedmoor", category: "Rifle", diameter: 0.243,
    fpsPerInch: 28, testBarrel: 24, defaultBarrel: 24,
    loads: [
      { mfr: "Hornady", line: "ELD Match", grains: 108, bcG1: 0.536, bcG7: 0.270, mv: 2960, testBarrel: 24, type: "ELD-M" },
      { mfr: "Hornady", line: "Precision Hunter ELD-X", grains: 103, bcG1: 0.512, bcG7: 0.258, mv: 3050, testBarrel: 24, type: "ELD-X" },
      { mfr: "Federal", line: "Gold Medal Berger", grains: 105, bcG1: 0.545, bcG7: 0.275, mv: 2950, testBarrel: 24, type: "Berger Hybrid" },
      { mfr: "Berger", line: "Long Range Hybrid Target", grains: 109, bcG1: 0.566, bcG7: 0.290, mv: 2900, testBarrel: 26, type: "LRHT" }
    ]
  },

  /* ---------------------------- 6.5mm ---------------------------- */
  {
    id: "65creedmoor", name: "6.5 Creedmoor", category: "Rifle", diameter: 0.264,
    fpsPerInch: 26, testBarrel: 24, defaultBarrel: 24,
    loads: [
      { mfr: "Hornady", line: "ELD Match", grains: 140, bcG1: 0.610, bcG7: 0.315, mv: 2710, testBarrel: 24, type: "ELD-M" },
      { mfr: "Hornady", line: "ELD Match", grains: 147, bcG1: 0.697, bcG7: 0.351, mv: 2695, testBarrel: 24, type: "ELD-M" },
      { mfr: "Hornady", line: "Precision Hunter ELD-X", grains: 143, bcG1: 0.625, bcG7: 0.315, mv: 2700, testBarrel: 24, type: "ELD-X" },
      { mfr: "Hornady", line: "Superformance SST", grains: 129, bcG1: 0.485, mv: 2950, testBarrel: 24, type: "SST" },
      { mfr: "Federal", line: "Gold Medal Berger", grains: 130, bcG1: 0.562, bcG7: 0.289, mv: 2825, testBarrel: 24, type: "Berger Hybrid" },
      { mfr: "Federal", line: "Terminal Ascent", grains: 130, bcG1: 0.532, bcG7: 0.271, mv: 2800, testBarrel: 24, type: "Terminal Ascent" },
      { mfr: "Federal", line: "Terminal Ascent +Peak", grains: 130, bcG1: 0.532, bcG7: 0.271, mv: 3100, testBarrel: 24, type: "Terminal Ascent · Peak Alloy" },
      { mfr: "Federal", line: "Fusion Tipped +Peak", grains: 155, bcG1: 0.608, bcG7: 0.310, mv: 2900, testBarrel: 24, type: "Fusion Tipped · Peak Alloy" },
      { mfr: "Nosler", line: "AccuBond Long Range", grains: 142, bcG1: 0.625, bcG7: 0.310, mv: 2700, testBarrel: 24, type: "ABLR" },
      { mfr: "Berger", line: "Elite Hunter", grains: 156, bcG1: 0.679, bcG7: 0.348, mv: 2625, testBarrel: 24, type: "Elite Hunter" },
      { mfr: "Sig Sauer", line: "Elite Match", grains: 140, bcG1: 0.595, bcG7: 0.305, mv: 2750, testBarrel: 24, type: "OTM" },
      { mfr: "Winchester", line: "Match", grains: 140, bcG1: 0.580, bcG7: 0.297, mv: 2700, testBarrel: 24, type: "BTHP" },
      { mfr: "Sellier & Bellot", line: "FMJ-BT", grains: 140, bcG1: 0.490, mv: 2657, testBarrel: 24, type: "FMJ-BT" }
    ]
  },
  {
    id: "65prc", name: "6.5 PRC", category: "Magnum", diameter: 0.264,
    fpsPerInch: 30, testBarrel: 24, defaultBarrel: 24,
    loads: [
      { mfr: "Hornady", line: "ELD Match", grains: 147, bcG1: 0.697, bcG7: 0.351, mv: 2910, testBarrel: 24, type: "ELD-M" },
      { mfr: "Hornady", line: "Precision Hunter ELD-X", grains: 143, bcG1: 0.625, bcG7: 0.315, mv: 2960, testBarrel: 24, type: "ELD-X" },
      { mfr: "Nosler", line: "AccuBond Long Range", grains: 142, bcG1: 0.625, bcG7: 0.310, mv: 2960, testBarrel: 24, type: "ABLR" },
      { mfr: "Berger", line: "Elite Hunter", grains: 156, bcG1: 0.679, bcG7: 0.348, mv: 2800, testBarrel: 24, type: "Elite Hunter" }
    ]
  },

  /* ---------------------------- .270 ---------------------------- */
  {
    id: "270win", name: ".270 Winchester", category: "Rifle", diameter: 0.277,
    fpsPerInch: 28, testBarrel: 24, defaultBarrel: 24,
    loads: [
      { mfr: "Hornady", line: "Precision Hunter ELD-X", grains: 145, bcG1: 0.536, bcG7: 0.268, mv: 2970, testBarrel: 24, type: "ELD-X" },
      { mfr: "Hornady", line: "Superformance SST", grains: 130, bcG1: 0.460, mv: 3200, testBarrel: 24, type: "SST" },
      { mfr: "Federal", line: "Power-Shok", grains: 130, bcG1: 0.409, mv: 3060, testBarrel: 24, type: "SP" },
      { mfr: "Nosler", line: "AccuBond", grains: 140, bcG1: 0.496, mv: 2950, testBarrel: 24, type: "AccuBond" },
      { mfr: "Winchester", line: "Deer Season XP", grains: 130, bcG1: 0.392, mv: 3060, testBarrel: 24, type: "Extreme Point" },
      { mfr: "Barnes", line: "VOR-TX", grains: 130, bcG1: 0.412, mv: 3060, testBarrel: 24, type: "TTSX" }
    ]
  },

  /* ---------------------------- 7mm ---------------------------- */
  {
    id: "7mm08", name: "7mm-08 Rem", category: "Rifle", diameter: 0.284,
    fpsPerInch: 27, testBarrel: 24, defaultBarrel: 22,
    loads: [
      { mfr: "Hornady", line: "Precision Hunter ELD-X", grains: 150, bcG1: 0.574, bcG7: 0.286, mv: 2770, testBarrel: 24, type: "ELD-X" },
      { mfr: "Federal", line: "Fusion", grains: 140, bcG1: 0.435, mv: 2800, testBarrel: 24, type: "Bonded SP" },
      { mfr: "Nosler", line: "Ballistic Tip", grains: 140, bcG1: 0.485, mv: 2820, testBarrel: 24, type: "BT" }
    ]
  },
  {
    id: "7remmag", name: "7mm Rem Magnum", category: "Magnum", diameter: 0.284,
    fpsPerInch: 30, testBarrel: 24, defaultBarrel: 24,
    loads: [
      { mfr: "Hornady", line: "Precision Hunter ELD-X", grains: 162, bcG1: 0.631, bcG7: 0.315, mv: 2940, testBarrel: 24, type: "ELD-X" },
      { mfr: "Hornady", line: "Superformance SST", grains: 154, bcG1: 0.525, mv: 3100, testBarrel: 24, type: "SST" },
      { mfr: "Federal", line: "Terminal Ascent", grains: 155, bcG1: 0.586, bcG7: 0.298, mv: 2950, testBarrel: 24, type: "Terminal Ascent" },
      { mfr: "Nosler", line: "AccuBond Long Range", grains: 168, bcG1: 0.631, bcG7: 0.323, mv: 2900, testBarrel: 24, type: "ABLR" },
      { mfr: "Berger", line: "Elite Hunter", grains: 168, bcG1: 0.617, bcG7: 0.316, mv: 2900, testBarrel: 24, type: "Elite Hunter" }
    ]
  },
  {
    id: "28nosler", name: "28 Nosler", category: "Magnum", diameter: 0.284,
    fpsPerInch: 32, testBarrel: 26, defaultBarrel: 26,
    loads: [
      { mfr: "Nosler", line: "AccuBond Long Range", grains: 168, bcG1: 0.631, bcG7: 0.323, mv: 3125, testBarrel: 26, type: "ABLR" },
      { mfr: "Nosler", line: "Reloading Berger", grains: 195, bcG1: 0.755, bcG7: 0.387, mv: 2950, testBarrel: 26, type: "Berger EOL" }
    ]
  },
  {
    id: "7mmbackcountry", name: "7mm Backcountry", category: "Magnum", diameter: 0.284,
    fpsPerInch: 28, testBarrel: 20, defaultBarrel: 20,
    loads: [
      { mfr: "Federal", line: "Terminal Ascent", grains: 155, bcG1: 0.586, bcG7: 0.296, mv: 3150, testBarrel: 20, type: "Terminal Ascent · Peak Alloy" },
      { mfr: "Federal", line: "Barnes LRX", grains: 168, bcG1: 0.513, bcG7: 0.258, mv: 3000, testBarrel: 20, type: "Barnes LRX · Peak Alloy" },
      { mfr: "Federal", line: "Terminal Ascent", grains: 170, bcG1: 0.645, bcG7: 0.323, mv: 3034, testBarrel: 20, type: "Terminal Ascent · Peak Alloy" },
      { mfr: "Federal", line: "Fusion Tipped", grains: 175, bcG1: 0.575, bcG7: 0.288, mv: 2975, testBarrel: 20, type: "Fusion Tipped · Peak Alloy" },
      { mfr: "Federal", line: "Berger Elite Hunter", grains: 195, bcG1: 0.755, bcG7: 0.384, mv: 2850, testBarrel: 20, type: "Berger Elite Hunter · Peak Alloy" },
      { mfr: "Remington", line: "Premier Long Range", grains: 175, bcG1: 0.560, bcG7: 0.281, mv: 2975, testBarrel: 20, type: "Speer Impact · Peak Alloy" },
      { mfr: "Remington", line: "Core-Lokt Tipped", grains: 175, bcG1: 0.515, bcG7: 0.258, mv: 2975, testBarrel: 20, type: "Core-Lokt Tipped · Peak Alloy" },
      { mfr: "Remington", line: "Core-Lokt", grains: 175, bcG1: 0.420, mv: 2975, testBarrel: 20, type: "Core-Lokt PSP · Peak Alloy" }
    ]
  },

  /* ---------------------------- .30 cal ---------------------------- */
  {
    id: "3030", name: ".30-30 Winchester", category: "Lever", diameter: 0.308,
    fpsPerInch: 22, testBarrel: 24, defaultBarrel: 20,
    loads: [
      { mfr: "Hornady", line: "LEVERevolution FTX", grains: 160, bcG1: 0.330, mv: 2400, testBarrel: 24, type: "FTX" },
      { mfr: "Federal", line: "Power-Shok", grains: 150, bcG1: 0.218, mv: 2390, testBarrel: 24, type: "FN SP" },
      { mfr: "Winchester", line: "Super-X", grains: 150, bcG1: 0.218, mv: 2390, testBarrel: 24, type: "Power Point" },
      { mfr: "Remington", line: "Core-Lokt", grains: 170, bcG1: 0.254, mv: 2200, testBarrel: 24, type: "SP" }
    ]
  },
  {
    id: "308win", name: ".308 Winchester", category: "Rifle", diameter: 0.308,
    fpsPerInch: 25, testBarrel: 24, defaultBarrel: 20,
    loads: [
      { mfr: "Hornady", line: "ELD Match", grains: 168, bcG1: 0.523, bcG7: 0.263, mv: 2700, testBarrel: 24, type: "ELD-M" },
      { mfr: "Hornady", line: "ELD Match", grains: 178, bcG1: 0.547, bcG7: 0.275, mv: 2600, testBarrel: 24, type: "ELD-M" },
      { mfr: "Hornady", line: "Precision Hunter ELD-X", grains: 178, bcG1: 0.552, bcG7: 0.277, mv: 2600, testBarrel: 24, type: "ELD-X" },
      { mfr: "Hornady", line: "Superformance SST", grains: 150, bcG1: 0.415, mv: 3000, testBarrel: 24, type: "SST" },
      { mfr: "Federal", line: "Gold Medal Sierra MatchKing", grains: 168, bcG1: 0.462, bcG7: 0.224, mv: 2650, testBarrel: 24, type: "SMK" },
      { mfr: "Federal", line: "Gold Medal Sierra MatchKing", grains: 175, bcG1: 0.505, bcG7: 0.243, mv: 2600, testBarrel: 24, type: "SMK" },
      { mfr: "Federal", line: "Power-Shok", grains: 150, bcG1: 0.314, mv: 2820, testBarrel: 24, type: "SP" },
      { mfr: "Federal", line: "Fusion", grains: 165, bcG1: 0.400, mv: 2700, testBarrel: 24, type: "Bonded SP" },
      { mfr: "Sierra", line: "MatchKing", grains: 175, bcG1: 0.505, bcG7: 0.243, mv: 2600, testBarrel: 24, type: "SMK" },
      { mfr: "Nosler", line: "AccuBond", grains: 165, bcG1: 0.475, mv: 2750, testBarrel: 24, type: "AccuBond" },
      { mfr: "Barnes", line: "VOR-TX", grains: 168, bcG1: 0.470, mv: 2680, testBarrel: 24, type: "TTSX" },
      { mfr: "Winchester", line: "Deer Season XP", grains: 150, bcG1: 0.367, mv: 2820, testBarrel: 24, type: "Extreme Point" },
      { mfr: "PMC", line: "Bronze", grains: 147, bcG1: 0.398, mv: 2780, testBarrel: 24, type: "FMJ-BT" },
      { mfr: "Sellier & Bellot", line: "FMJ-BT", grains: 147, bcG1: 0.400, mv: 2700, testBarrel: 24, type: "FMJ-BT" },
      { mfr: "Sellier & Bellot", line: "SP", grains: 180, bcG1: 0.448, mv: 2493, testBarrel: 24, type: "SP" }
    ]
  },
  {
    id: "3006", name: ".30-06 Springfield", category: "Rifle", diameter: 0.308,
    fpsPerInch: 26, testBarrel: 24, defaultBarrel: 24,
    loads: [
      { mfr: "Hornady", line: "Precision Hunter ELD-X", grains: 178, bcG1: 0.552, bcG7: 0.277, mv: 2750, testBarrel: 24, type: "ELD-X" },
      { mfr: "Hornady", line: "Superformance SST", grains: 165, bcG1: 0.447, mv: 2960, testBarrel: 24, type: "SST" },
      { mfr: "Federal", line: "Power-Shok", grains: 180, bcG1: 0.383, mv: 2700, testBarrel: 24, type: "SP" },
      { mfr: "Federal", line: "Trophy Copper", grains: 165, bcG1: 0.470, mv: 2800, testBarrel: 24, type: "Trophy Copper" },
      { mfr: "Nosler", line: "Partition", grains: 180, bcG1: 0.474, mv: 2700, testBarrel: 24, type: "Partition" },
      { mfr: "Remington", line: "Core-Lokt", grains: 150, bcG1: 0.314, mv: 2910, testBarrel: 24, type: "SP" },
      { mfr: "Winchester", line: "Power Point", grains: 180, bcG1: 0.385, mv: 2700, testBarrel: 24, type: "PP" },
      { mfr: "Sellier & Bellot", line: "SP", grains: 180, bcG1: 0.448, mv: 2625, testBarrel: 24, type: "SP" },
      { mfr: "Sellier & Bellot", line: "FMJ", grains: 150, bcG1: 0.367, mv: 2854, testBarrel: 24, type: "FMJ" }
    ]
  },
  {
    id: "300blk", name: ".300 AAC Blackout", category: "Rifle", diameter: 0.308,
    fpsPerInch: 18, testBarrel: 16, defaultBarrel: 16,
    loads: [
      { mfr: "Hornady", line: "Black V-MAX", grains: 110, bcG1: 0.290, mv: 2375, testBarrel: 16, type: "V-MAX" },
      { mfr: "Hornady", line: "Subsonic", grains: 190, bcG1: 0.437, mv: 1050, testBarrel: 16, type: "Sub-X" },
      { mfr: "Sig Sauer", line: "Elite Match", grains: 220, bcG1: 0.580, bcG7: 0.295, mv: 1000, testBarrel: 16, type: "OTM Subsonic" },
      { mfr: "Federal", line: "American Eagle", grains: 150, bcG1: 0.290, mv: 1900, testBarrel: 16, type: "FMJ" },
      { mfr: "Sellier & Bellot", line: "FMJ", grains: 124, bcG1: 0.290, mv: 2152, testBarrel: 16, type: "FMJ" },
      { mfr: "Sellier & Bellot", line: "Subsonic FMJ", grains: 200, bcG1: 0.437, mv: 1013, testBarrel: 16, type: "FMJ Subsonic" }
    ]
  },
  {
    id: "300winmag", name: ".300 Winchester Magnum", category: "Magnum", diameter: 0.308,
    fpsPerInch: 30, testBarrel: 24, defaultBarrel: 26,
    loads: [
      { mfr: "Hornady", line: "ELD Match", grains: 195, bcG1: 0.626, bcG7: 0.314, mv: 2930, testBarrel: 24, type: "ELD-M" },
      { mfr: "Hornady", line: "Precision Hunter ELD-X", grains: 200, bcG1: 0.626, bcG7: 0.314, mv: 2860, testBarrel: 24, type: "ELD-X" },
      { mfr: "Federal", line: "Gold Medal Berger", grains: 215, bcG1: 0.691, bcG7: 0.354, mv: 2830, testBarrel: 24, type: "Berger Hybrid" },
      { mfr: "Federal", line: "Terminal Ascent", grains: 200, bcG1: 0.608, bcG7: 0.310, mv: 2810, testBarrel: 24, type: "Terminal Ascent" },
      { mfr: "Nosler", line: "AccuBond Long Range", grains: 190, bcG1: 0.640, bcG7: 0.328, mv: 2950, testBarrel: 24, type: "ABLR" },
      { mfr: "Barnes", line: "VOR-TX LR", grains: 190, bcG1: 0.561, bcG7: 0.286, mv: 2900, testBarrel: 24, type: "LRX" },
      { mfr: "Winchester", line: "Expedition Big Game", grains: 180, bcG1: 0.507, mv: 2950, testBarrel: 24, type: "AccuBond CT" }
    ]
  },
  {
    id: "300prc", name: ".300 PRC", category: "Magnum", diameter: 0.308,
    fpsPerInch: 30, testBarrel: 24, defaultBarrel: 26,
    loads: [
      { mfr: "Hornady", line: "ELD Match", grains: 225, bcG1: 0.777, bcG7: 0.391, mv: 2810, testBarrel: 24, type: "ELD-M" },
      { mfr: "Hornady", line: "Precision Hunter ELD-X", grains: 212, bcG1: 0.673, bcG7: 0.336, mv: 2860, testBarrel: 24, type: "ELD-X" },
      { mfr: "Berger", line: "Elite Hunter", grains: 245, bcG1: 0.825, bcG7: 0.423, mv: 2700, testBarrel: 26, type: "Elite Hunter" }
    ]
  },
  {
    id: "300wsm", name: ".300 WSM", category: "Magnum", diameter: 0.308,
    fpsPerInch: 30, testBarrel: 24, defaultBarrel: 24,
    loads: [
      { mfr: "Hornady", line: "Precision Hunter ELD-X", grains: 200, bcG1: 0.626, bcG7: 0.314, mv: 2790, testBarrel: 24, type: "ELD-X" },
      { mfr: "Winchester", line: "Deer Season XP", grains: 150, bcG1: 0.367, mv: 3300, testBarrel: 24, type: "Extreme Point" },
      { mfr: "Federal", line: "Fusion", grains: 165, bcG1: 0.400, mv: 3000, testBarrel: 24, type: "Bonded SP" }
    ]
  },

  /* ---------------------------- BIG BORE / MAGNUM ---------------------------- */
  {
    id: "338lapua", name: ".338 Lapua Magnum", category: "Magnum", diameter: 0.338,
    fpsPerInch: 32, testBarrel: 27, defaultBarrel: 27,
    loads: [
      { mfr: "Hornady", line: "ELD Match", grains: 285, bcG1: 0.789, bcG7: 0.396, mv: 2745, testBarrel: 27, type: "ELD-M" },
      { mfr: "Hornady", line: "ELD-X", grains: 270, bcG1: 0.757, bcG7: 0.380, mv: 2840, testBarrel: 27, type: "ELD-X" },
      { mfr: "Berger", line: "Elite Hunter", grains: 300, bcG1: 0.818, bcG7: 0.419, mv: 2700, testBarrel: 27, type: "Elite Hunter" },
      { mfr: "Lapua", line: "Scenar", grains: 250, bcG1: 0.675, bcG7: 0.337, mv: 2900, testBarrel: 27, type: "OTM" }
    ]
  },
  {
    id: "375hh", name: ".375 H&H Magnum", category: "Magnum", diameter: 0.375,
    fpsPerInch: 30, testBarrel: 24, defaultBarrel: 24,
    loads: [
      { mfr: "Hornady", line: "Superformance", grains: 250, bcG1: 0.431, mv: 2890, testBarrel: 24, type: "GMX" },
      { mfr: "Federal", line: "Power-Shok", grains: 300, bcG1: 0.310, mv: 2530, testBarrel: 24, type: "SP" },
      { mfr: "Barnes", line: "VOR-TX", grains: 300, bcG1: 0.382, mv: 2560, testBarrel: 24, type: "TSX" }
    ]
  },
  {
    id: "4570", name: ".45-70 Government", category: "Lever", diameter: 0.458,
    fpsPerInch: 20, testBarrel: 24, defaultBarrel: 22,
    loads: [
      { mfr: "Hornady", line: "LEVERevolution FTX", grains: 325, bcG1: 0.230, mv: 2050, testBarrel: 24, type: "FTX" },
      { mfr: "Federal", line: "Power-Shok", grains: 300, bcG1: 0.200, mv: 1850, testBarrel: 24, type: "JHP" },
      { mfr: "Buffalo Bore", line: "Heavy", grains: 430, bcG1: 0.281, mv: 1925, testBarrel: 24, type: "Hard Cast" }
    ]
  },
  {
    id: "50bmg", name: ".50 BMG", category: "Magnum", diameter: 0.510,
    fpsPerInch: 25, testBarrel: 45, defaultBarrel: 29,
    loads: [
      { mfr: "Hornady", line: "A-MAX Match", grains: 750, bcG1: 1.050, bcG7: 0.525, mv: 2820, testBarrel: 45, type: "A-MAX" },
      { mfr: "Hornady", line: "Match", grains: 750, bcG1: 1.050, bcG7: 0.525, mv: 2800, testBarrel: 45, type: "A-MAX" },
      { mfr: "Federal", line: "American Eagle", grains: 660, bcG1: 0.620, mv: 3030, testBarrel: 45, type: "FMJ" }
    ]
  },

  /* ---------------------------- INTERMEDIATE / AK ---------------------------- */
  {
    id: "762x39", name: "7.62x39mm", category: "Rifle", diameter: 0.310,
    fpsPerInch: 20, testBarrel: 16, defaultBarrel: 16,
    loads: [
      { mfr: "Hornady", line: "Black SST", grains: 123, bcG1: 0.295, mv: 2350, testBarrel: 16, type: "SST" },
      { mfr: "PMC", line: "Bronze", grains: 123, bcG1: 0.275, mv: 2350, testBarrel: 16, type: "FMJ" },
      { mfr: "Federal", line: "American Eagle", grains: 124, bcG1: 0.275, mv: 2300, testBarrel: 16, type: "FMJ" },
      { mfr: "Sellier & Bellot", line: "FMJ", grains: 123, bcG1: 0.275, mv: 2421, testBarrel: 16, type: "FMJ" },
      { mfr: "Sellier & Bellot", line: "SP", grains: 124, bcG1: 0.280, mv: 2400, testBarrel: 16, type: "SP" }
    ]
  },
  {
    id: "350legend", name: ".350 Legend", category: "Rifle", diameter: 0.357,
    fpsPerInch: 20, testBarrel: 20, defaultBarrel: 18,
    loads: [
      { mfr: "Winchester", line: "Deer Season XP", grains: 150, bcG1: 0.223, mv: 2325, testBarrel: 20, type: "Extreme Point" },
      { mfr: "Federal", line: "Power-Shok", grains: 180, bcG1: 0.245, mv: 2100, testBarrel: 20, type: "SP" },
      { mfr: "Hornady", line: "American Whitetail", grains: 170, bcG1: 0.250, mv: 2200, testBarrel: 20, type: "InterLock" }
    ]
  },

  /* ---------------------------- HANDGUN ---------------------------- */
  {
    id: "9mm", name: "9mm Luger", category: "Pistol", diameter: 0.355,
    fpsPerInch: 25, testBarrel: 4, defaultBarrel: 4,
    loads: [
      { mfr: "Federal", line: "HST", grains: 124, bcG1: 0.165, mv: 1150, testBarrel: 4, type: "JHP" },
      { mfr: "Speer", line: "Gold Dot", grains: 147, bcG1: 0.175, mv: 985, testBarrel: 4, type: "JHP" },
      { mfr: "Hornady", line: "Critical Defense", grains: 115, bcG1: 0.140, mv: 1140, testBarrel: 4, type: "FTX" },
      { mfr: "Federal", line: "American Eagle", grains: 115, bcG1: 0.130, mv: 1180, testBarrel: 4, type: "FMJ" },
      { mfr: "Sellier & Bellot", line: "FMJ", grains: 115, bcG1: 0.140, mv: 1280, testBarrel: 4, type: "FMJ" },
      { mfr: "Sellier & Bellot", line: "FMJ", grains: 124, bcG1: 0.150, mv: 1181, testBarrel: 4, type: "FMJ" }
    ]
  },
  {
    id: "45acp", name: ".45 ACP", category: "Pistol", diameter: 0.451,
    fpsPerInch: 18, testBarrel: 5, defaultBarrel: 5,
    loads: [
      { mfr: "Federal", line: "HST", grains: 230, bcG1: 0.195, mv: 890, testBarrel: 5, type: "JHP" },
      { mfr: "Speer", line: "Gold Dot", grains: 230, bcG1: 0.190, mv: 890, testBarrel: 5, type: "JHP" },
      { mfr: "Federal", line: "American Eagle", grains: 230, bcG1: 0.190, mv: 850, testBarrel: 5, type: "FMJ" },
      { mfr: "Sellier & Bellot", line: "FMJ", grains: 230, bcG1: 0.190, mv: 830, testBarrel: 5, type: "FMJ" }
    ]
  },
  {
    id: "357mag", name: ".357 Magnum", category: "Pistol", diameter: 0.357,
    fpsPerInch: 30, testBarrel: 6, defaultBarrel: 4,
    loads: [
      { mfr: "Federal", line: "Power-Shok", grains: 158, bcG1: 0.206, mv: 1240, testBarrel: 6, type: "JHP" },
      { mfr: "Hornady", line: "Custom XTP", grains: 158, bcG1: 0.206, mv: 1250, testBarrel: 6, type: "XTP" },
      { mfr: "Buffalo Bore", line: "Heavy", grains: 180, bcG1: 0.245, mv: 1400, testBarrel: 6, type: "Hard Cast" },
      { mfr: "Sellier & Bellot", line: "SP", grains: 158, bcG1: 0.165, mv: 1263, testBarrel: 6, type: "SP" }
    ]
  },
  {
    id: "44mag", name: ".44 Magnum", category: "Pistol", diameter: 0.429,
    fpsPerInch: 28, testBarrel: 6, defaultBarrel: 6,
    loads: [
      { mfr: "Hornady", line: "Custom XTP", grains: 240, bcG1: 0.205, mv: 1350, testBarrel: 6, type: "XTP" },
      { mfr: "Federal", line: "Power-Shok", grains: 240, bcG1: 0.165, mv: 1230, testBarrel: 6, type: "JHP" },
      { mfr: "Buffalo Bore", line: "Heavy", grains: 305, bcG1: 0.205, mv: 1325, testBarrel: 6, type: "Hard Cast" }
    ]
  },
  {
    id: "10mm", name: "10mm Auto", category: "Pistol", diameter: 0.400,
    fpsPerInch: 25, testBarrel: 5, defaultBarrel: 5,
    loads: [
      { mfr: "Federal", line: "HST", grains: 200, bcG1: 0.190, mv: 1130, testBarrel: 5, type: "JHP" },
      { mfr: "Hornady", line: "Custom XTP", grains: 180, bcG1: 0.164, mv: 1180, testBarrel: 5, type: "XTP" },
      { mfr: "Buffalo Bore", line: "Heavy", grains: 220, bcG1: 0.205, mv: 1200, testBarrel: 5, type: "Hard Cast" }
    ]
  }
];
