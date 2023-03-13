const title = document.querySelector(".title");
title.innerHTML = "Sapphire Fly";

// Create context 2D
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Bird params
const bird = {
	x: 50,
	y: canvas.height / 2,
	width: 20,
	height: 20,
	speed: 1,
	gravity: 0.2,
	jump: 6,
	onGround: true,
};

// Obstacules array
const obstacules = [];

// Obstacules params
const obstaculesProps = {
	obstaculeHeight: 70,
	obstaculeWidth: 50,
	obstaculeGap: 50,
	obstaculeSpeed: 2,
	lastObstacule: canvas.width,
};

document.addEventListener("keydown", (evt) => {
	if (evt.keyCode === 32 && bird.onGround) {
		jumpBird();
	}
});

const draw = () => {
	// clear the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// draw background
	ctx.fillStyle = "lightblue";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// draw the bird
	ctx.fillStyle = "red";
	ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
};

const jumpBird = () => {
	bird.onGround = "false";
	bird.speed = -bird.jump;
	bird.onGround = "true";
};

//* Función de actualización de juego
const update = () => {
	// Actualiza la velocidad de caída del pájaro
	bird.speed += bird.gravity;

	// Actualiza la posición del pájaro en función de su velocidad de salto
	bird.y += bird.speed;

	// Limita la posición del pájaro a los bordes superior e inferior del lienzo
	if (bird.y < 0) {
		bird.y = 0;
		bird.velocity = 0;
	} else if (bird.y + bird.height > canvas.height) {
		bird.y = canvas.height - bird.height;
		bird.velocity = 0;
	}
};


//* Loop function
const loop = () => {
	// update function
	update();

	// draw elements of canvas
	draw();

	// Update bird position
	bird.speed += bird.gravity;
	bird.y += bird.speed;
	
	// Solicita la siguiente actualización de animación
	requestAnimationFrame(loop);
};

loop();
