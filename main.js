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

function replenishFunds() {
	if (get_current_tokens() < 100) {
		writeln(feed, "You take out another mortgage on your home to pay for more bets.")
		addTokens(500);
	} else {
		writeln(feed, "You have plenty of money, you don't need this.")
	}
}

function writeln(field, text) {
	field.innerHTML += `<div class="text-line">${text}</div>`;
}

function renderTokens() {
	const fromLocal = localStorage.getItem(tokens);
	tokenField.innerHTML = fromLocal;
}

function addTokens(amount) {
	const fromLocal = get_current_tokens();
	localStorage.setItem(tokens, fromLocal + amount);
	renderTokens();
} 

function get_current_tokens() {
	return parseInt(localStorage.getItem(tokens));
}

function betting_form(race) {
	writeln(betting, `<h3>Race ${curr_race + 1}</h3>`);
	betting.innerHTML = "<form>";
	let i=0;
	race.forEach((horse) => {
		writeln(betting, `${horse.name} 
			<input type="radio" name="horse-${i}" id="rd${i}-1" value="1"/> 1st
			<input type="radio" name="horse-${i}" id="rd${i}-2" value="2"/> 2nd
			<input type="radio" name="horse-${i}" id="rd${i}-3" value="3"/> 3rd
			<input type="number" id="horse-${i}-bet", value=0>`);
		i++;
	});
	betting.innerHTML += "</form>";
	betting.innerHTML += `<button onclick='process_bet()'>Place Bet</button>`;
}

function process_bet() {
	let sum = 0;
	let currval;
	let grp_elements;
	let race = races[curr_race];
	for (let i = 0; i<race.length; i++) {
		currval = parseInt(document.getElementById(`horse-${i}-bet`).value);
		sum += currval;
		race[i].bet_amount = currval;
		grp_elements = document.getElementsByName(`horse-${i}`);
		for(j = 0; j < grp_elements.length; j++) {
                if(grp_elements[j].checked)
	                race[i].bet_position = grp_elements[j].value;
        }
	}
	if (sum > get_current_tokens()) {
		console.log(sum);
		writeln(betting, "Bets exceed current funds.");
		return;
	} else {
		addTokens(-sum);
		runRace(race);
	}

}

function payout_race(race_results) {
	for (let i=0; i<race_results.length; i++){
		switch (race_results[i].bet_position) {
			case 1: addTokens(race_results[i].bet_amount);
			break;
			case 2: addTokens(race_results[i].bet_amount*.75);
			break;
			case 3: addTokens(race_results[i].bet_amount*.5);
			break;
		}
	};
}

function runRace(race) {
	writeln(feed, "<br/>It's time! Ladies and gentlemen, here is your line-up!");
	race.forEach((horse)=>{
		writeln(upcoming, horse['name']);
	});
	writeln(feed, "<br/>And we are off!")
	for (i=0; i<segments-1; i++) {
		race.forEach((horse) => {
			horse.race_position += horse.avg_speed + (Math.random()* (2*horse.speed_range)-horse.speed_range) - ((horse.endurance_factor/25)*(i/segments));
		});

		race.sort((horse_a, horse_b) => (horse_b.race_position - horse_a.race_position));

		writeln(feed, `It's ${race[0].name} in the lead, ${race[3].name} holding up the middle, and ${race[7].name} bringing up the rear!`);
	}
	race.forEach((horse) => {
			horse.race_position += horse.avg_speed + (Math.random* (2*horse.speed_range)-horse.speed_range) - ((horse.endurance_factor/25)*(i/segments));
	});
	race.sort((horse_a, horse_b) => (horse_b.race_position - horse_a.race_position));
	writeln(feed, "And there we have it, folks!");
	writeln(feed, `And the winner is... ${race[0].name} is the winner! ${race[1].name} is in second and ${race[2].name} rounds it out in third.`);
	writeln(feed, "Here are the final standings:");
	race.forEach((horse)=>{
		writeln(upcoming, horse['name']);
	});
	payout_race(race);
	// document.getElementById(`race-${curr_race}`).style.text-decoration = "line-through";
	curr_race++;
	betting_form(races[curr_race]);
}

renderTokens();

writeln(feed, "Welcome, one and all, to Dirt Hill Downs, the premier horse-racing simulation page.");
writeln(feed, "This is your main feed, where you can monitor all the action.");
writeln(feed, "To the left is the upcoming races, with all the horses and their stats laid out for you to view.");
writeln(feed, "To the right is our betting portal, where you can place your bets before the race.")
writeln(feed, "Good luck!");

for (var i = 0; i < races.length; i++) {
	upcoming.innerHTML += `<div id="race-${i}"><h3>Race ${i+1}</h3>`

	races[i].forEach((horse)=>{
		writeln(upcoming, horse['name']);
	});

	upcoming.innerHTML += `</div>`
}

betting_form(races[curr_race]);

