//* Creamos el Canvas con contexto 2D
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// creamos la imagen de dinoImage
const dinoImage = new Image();
dinoImage.src =
  "https://bestanimations.com/media/dinosaur-art/2131955109dinosaur-animation-34.gif";
dinoImage.style.display = "block";

let isDead = false;

//* Objeto Dino
let dino = {
	x: 50,
	y: 100,
	width: 120,
	height: 120,
	speed: 1,
	gravity: 0.15,
	jump: 6,
	src: "https://bestanimations.com/media/dinosaur-art/2131955109dinosaur-animation-34.gif",
};

document.addEventListener("click", () => {
	loop();
	//* Salta al presionar la tecla "espacio"
	document.addEventListener("keydown", (evt) => {
		if (evt.keyCode === 32) {
		// salta al presionar la tecla "espacio"
			jump();
		}
	});
});

//* Función de dibujado de Canvas
const draw = () => {
	// borrar el contenido del Canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// renderizamos el dino
	ctx.drawImage(dinoImage, dino.x, dino.y, dino.width, dino.height);
};

const restart = () => {
	document.removeEventListener("click", restart);

	document.addEventListener("keydown", (evt) => {
		if (evt.keyCode === 32) {
			isDead = false;
			loop();
			const bg = document.querySelectorAll(".bg");
			bg.forEach((bg) => {
				if (bg[0]) {
					bg.stye.animation = "bgMove1 8s linear infinite";
				}
				bg.stye.animation = "bgMove2 8s linear infinite";
			});
		}
	});
};

const gameOver = () => {
	const bg = document.querySelectorAll(".bg");
	bg.forEach((bg) => (bg.style.animation = "none"));

	cancelAnimationFrame(loop);
	isDead = true;
	dino = {
		x: 50,
		y: 100,
		width: 120,
		height: 120,
		speed: 1,
		gravity: 0.15,
		jump: 6,
	};

	document.addEventListener("click", restart);
};

//* Función de salto de Dino
const jump = () => {
	dino.speed = -dino.jump;
};

//* Función de actualización
const update = () => {
	// Actualiza la velocidad de caída del dino
	dino.speed += dino.gravity;

	// Actualiza la posición del dino en función de su velocidad de salto
	dino.y += dino.speed;

	// Limita la posición del dino a los bordes superior e inferior del lienzo
	if (dino.y < 0) {
		dino.y = 0;
		dino.velocity = 0;
	} else if (dino.y + dino.height > canvas.height) {
		dino.y = 100;
		gameOver();
	}
};

//TODO Función loop
const loop = () => {
	if (!isDead) {
		// actualizar la posición del dino y del Canvas
		update();

		// renderizar fondo de Canvas y el dino
		draw();

		// actualizar la posición del dino
		dino.speed += dino.gravity;
		dino.y += dino.speed;

		// solicita la siguiente actualización de animación
		requestAnimationFrame(loop);
	}
};
