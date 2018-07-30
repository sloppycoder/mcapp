const scales = [
  0,
  0.25,
  0.5,
  1,
  2,
  4,
  5,
  6,
  8,
  10,
  15,
  14,
  16,
  18,
  20,
  25,
  30,
  32,
  40,
  45,
  50,
  56,
  66,
  100,
  150,
  200,
  224
];
const what = [['m', 'margin'], ['p', 'padding']];
const where = [
  ['a', ''],
  ['h', 'Horizontal'],
  ['v', 'Vertical'],
  ['t', 'Top'],
  ['r', 'Right'],
  ['b', 'Bottom'],
  ['l', 'Left']
];
const spacingStyles = {};
what.forEach(([whatShort, whatLong]) => {
  where.forEach(([whereShort, whereLong]) => {
    scales.forEach((scale, idx) => {
      spacingStyles[`${whatShort}${whereShort}${idx}`] = {
        [`${whatLong}${whereLong}`]: scale
      };
    });
  });
});

export default spacingStyles;
