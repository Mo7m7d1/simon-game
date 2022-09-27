const heading = $("h1");
const buttons = $(".box");
const buttonColors = ["red", "blue", "green", "yellow"];
const sounds = {
	green: "sounds/green.mp3",
	red: "sounds/red.mp3",
	yellow: "sounds/yellow.mp3",
	blue: "sounds/blue.mp3",
	wrong: "sounds/wrong.mp3",
};
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

$(document).on("keypress", function () {
	if (!started) {
		$(heading).text(`Level ${level}`);
		nextSequence();
		started = true;
	}
});

$(buttons).click(function () {
	let userChosenColor = $(this).attr("id");
	userClickedPattern.push(userChosenColor);

	checkAnswer(userClickedPattern.length - 1);

	playSound(userChosenColor);
	animatePress(`#${userChosenColor}`);
});

function nextSequence() {
	$(heading).text(`Level ${level++}`);

	let randomNumber = Math.floor(Math.random() * 4);
	let randomChosenColor = buttonColors[randomNumber];
	gamePattern.push(randomChosenColor);
	playSound(randomChosenColor);
	FlashAnimation(`#${randomChosenColor}`);
}

function FlashAnimation(element) {
	$(element).fadeOut(300).fadeIn(300);
}

function playSound(soundName) {
	let sound = new Audio(sounds[soundName]);
	sound.play();
}

function animatePress(currentColor) {
	$(currentColor).addClass("pressed");

	setInterval(() => {
		$(currentColor).removeClass("pressed");
	}, 100);
}

function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		if (gamePattern.length === userClickedPattern.length) {
			setTimeout(() => {
				nextSequence();
			}, 1000);
		}
	} else {
		playSound("wrong");
		$(document.body).addClass("game-over");
		$(heading).text(`Game over! Press any key to restart`);

		setTimeout(() => {
			$(document.body).removeClass("game-over");
		}, 200);

		startOver();
	}
}

function startOver() {
	level = 0;
	started = false;
	gamePattern = [];
	userClickedPattern = [];
}
