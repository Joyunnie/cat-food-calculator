import rawData from '../../food_data.json';

// Raw-bone mineral corrections used by the calculator.
//
// Scope:
// - Values are per 100 g of raw carcass bone as used in homemade raw feeding.
// - Existing kcal / moisture / fat values are intentionally left unchanged because
//   the evidence gathered so far is strongest for mineral composition, not macros.
// - Ca/P are anchored to raw RMB / whole-carcass analyses where available.
// - Trace minerals are based on same-species bone analyses when available and
//   scaled to the practical raw-bone Ca concentration used by this calculator.
//
// Key evidence reviewed:
// - Chicken raw neck/back composition (KB RAW) + chicken bone mineral studies
// - Whole gutted quail carcass composition (KB RAW) + quail tibia analyses
// - Duck neck/wing composition (KB RAW) + Muscovy duck femur/tibia analyses
// - Pheasant femur/tibia mineral analyses; pheasant carcass/USDA data used to
//   scale the dense long-bone values to practical mixed carcass bone.
//
// These are evidence-based operating estimates, not certified laboratory assays
// of the user's specific batch. Units below are mg per 100 g raw bone.
const BONE_MINERAL_OVERRIDES = {
  '닭 생뼈(추정)': {
    '칼슘(mg)': 3700,
    '인(mg)': 1450,
    '마그네슘(mg)': 70,
    '나트륨(mg)': 95,
    '칼륨(mg)': 44,
    '철(mg)': 2.2,
    '구리(mg)': 0.14,
    '아연(mg)': 3.8,
    '망간(mg)': 0.13,
  },
  '메추리 생뼈(추정)': {
    '칼슘(mg)': 5630,
    '인(mg)': 2200,
    '마그네슘(mg)': 90,
    '나트륨(mg)': 150,
    '칼륨(mg)': 68,
    '철(mg)': 2.5,
    '구리(mg)': 0.04,
    '아연(mg)': 6.9,
    '망간(mg)': 0.31,
  },
  '오리 생뼈(추정)': {
    '칼슘(mg)': 4940,
    '인(mg)': 2380,
    '마그네슘(mg)': 88,
    '나트륨(mg)': 157,
    '칼륨(mg)': 61,
    '철(mg)': 1.1,
    '구리(mg)': 0.36,
    '아연(mg)': 7.7,
    '망간(mg)': 0.19,
  },
};

for (const [name, nutrients] of Object.entries(BONE_MINERAL_OVERRIDES)) {
  const food = rawData.foods.find((item) => item.name === name);
  if (food) Object.assign(food.nutrients, nutrients);
}

// Pheasant is added as a built-in raw-bone option.  Ca/P and the listed trace
// minerals use the practical mixed-carcass estimate established from pheasant
// bone analyses.  kcal/moisture/fat remain the quail proxy because no equally
// comparable mixed raw-pheasant-bone macro analysis was found; quail was the
// closest existing per-gram bone proxy in the reviewed data.
const pheasantName = '꿩 생뼈(추정)';
if (!rawData.foods.some((item) => item.name === pheasantName)) {
  rawData.foods.push({
    row: 10,
    id: '5',
    name: pheasantName,
    nutrients: {
      '함량(g)': '100g',
      '칼로리(Kcal)': 90,
      '수분(g)': 70,
      '지방(g)': 10,
      '칼슘(mg)': 5300,
      '인(mg)': 2250,
      '마그네슘(mg)': 80,
      '나트륨(mg)': 139,
      '칼륨(mg)': 64,
      '철(mg)': 2.5,
      '구리(mg)': 0.34,
      '아연(mg)': 5.5,
      '망간(mg)': 0.22,
    },
  });
}

const boneCategory = rawData.categories?.['식품A'];
if (boneCategory && !boneCategory.items.some((item) => item.name === pheasantName)) {
  boneCategory.items.push({ index: 5, name: pheasantName });
  boneCategory.range = 'B6:B10';
}
