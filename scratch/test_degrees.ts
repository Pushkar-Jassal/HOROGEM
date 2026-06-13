import { calculateKundali } from '../src/engine/astrology';

const chart = calculateKundali('2005-10-03', '07:55', 'Ludhiana', 30.9010, 75.8573);
console.log('LAGNA INDEX:', chart.lagnaIndex);
console.log('PLANETARY POSITIONS SORTED BY HOUSE:');
const planetsByHouse = {};
chart.planetaryPositions.forEach(p => {
  if (!planetsByHouse[p.house]) {
    planetsByHouse[p.house] = [];
  }
  planetsByHouse[p.house].push(p);
});

Object.keys(planetsByHouse).forEach(house => {
  console.log(`\nHouse ${house}:`);
  planetsByHouse[house].forEach(p => {
    console.log(`  - ${p.name} (${p.symbol}): Degree in sign = ${p.degree}°, Sign = ${p.sign}`);
  });
});
