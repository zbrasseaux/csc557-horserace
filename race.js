
const horses = require('./horses.js').sort(() => (Math.random() > .5) ? 1 : -1);

const races = [[],[],[]];
const segments = 20;

for (let i=0; i<horses.length; i++) {
	races[i%3].push(horses[i]);
}

console.log(races[0].sort((horse_a, horse_b) => (
	horse_b.endurance_factor - horse_a.endurance_factor
)));

// // race distance - 2000
// function run_race(horses) {
// 	for (i=0; i<segments; i++) {

// 	}
// }

// race_position += avg_speed + (Math.random*(2*speed_range)-speed_range) - ((endurance_factor/25)*(i/segments));