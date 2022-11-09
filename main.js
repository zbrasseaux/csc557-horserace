const upcoming = document.getElementById('upcoming');
const feed = document.getElementById('feed');
const betting = document.getElementById('betting');
const tokenField = document.getElementById('tokens');

const tokens = "tokens";
localStorage.setItem(tokens, 500);

const races = [[],[],[]];
const segments = 20;
let curr_race = 0;

for (let i=0; i<horses.length; i++) {
	races[i%3].push(horses[i]);
}

function writeln(field, text) {
	field.innerHTML += `<div class="text-line">${text}</div>`;
}

function renderTokens() {
	const fromLocal = localStorage.getItem(tokens);
	tokenField.innerHTML = fromLocal;
}

function addTokens(amount) {
	const fromLocal = localStorage.getItem(tokens);
	localStorage.setItem(tokens, fromLocal + amount);
	renderTokens();
} 

function runRace(race) {
	writeln(feed, "<br/>It's time! Ladies and gentlemen, here is your line-up!");
	race.forEach((horse)=>{
		writeln(upcoming, horse['name']);
	});
	writeln(feed, "<br/>And we are off!")
	for (i=0; i<segments-1; i++) {
		race.forEach((horse) => {
			horse.race_position += horse.avg_speed + (Math.random* (2*horse.speed_range)-horse.speed_range) - ((horse.endurance_factor/25)*(i/segments));
		};

		race.sort((horse_a, horse_b) => (horse_b.race_position - horse_a.race_position));

		writeln(feed, `It's ${race[0].name} in the lead, ${race[3].name} holding up the middle, and ${race[7].name} bringing up the rear!`);
	}
	race.forEach((horse) => {
			horse.race_position += horse.avg_speed + (Math.random* (2*horse.speed_range)-horse.speed_range) - ((horse.endurance_factor/25)*(i/segments));
	};
	race.sort((horse_a, horse_b) => (horse_b.race_position - horse_a.race_position));
	writeln(feed, "And there we have it, folks!");
	writeln(feed, `And the winner is... ${race[0]} is the winner! ${race[1]} is in second and ${race[2]} rounds it out in third.`);
	writeln(feed, "Here are the final standings:");
	race.forEach((horse)=>{
		writeln(upcoming, horse['name']);
	});
}

renderTokens();

writeln(feed, "Welcome, one and all, to Dirt Hill Downs, the premier horse-racing simulation page.");
writeln(feed, "This is your main feed, where you can monitor all the action.");
writeln(feed, "To the left is the upcoming races, with all the horses and their stats laid out for you to view.");
writeln(feed, "To the right is our betting portal, where you can place your bets before the race.")
writeln(feed, "Good luck!");

for (var i = 0; i < races.length; i++) {
	upcoming.innerHTML += `<div class="race-${i}"><h3>Race ${i+1}</h3>`

	races[i].forEach((horse)=>{
		writeln(upcoming, horse['name']);
	});

	upcoming.innerHTML += `</div>`
}
