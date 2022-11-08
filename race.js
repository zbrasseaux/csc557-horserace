
const horses = require('./horses.js').sort(() => (Math.random() > .5) ? 1 : -1);

const races = [[],[],[]]

for (let i=0; i<horses.length; i++) {
	races[i%3].push(horses[i]);
}

console.log(races[0].sort((horse_a, horse_b) => (
	horse_b.endurance_factor - horse_a.endurance_factor
)));

// function run_race(horses) {
// 	for (i=0; i<10; i++) {

// 	}
// }