import { Game } from "../logic/Game";
import { generateDraggable, makeDraggable, makeDropPoint } from "./drag&drop";
import { createStartBtn, changeDirectionBtn } from "./buttons";
import { PlayerDOM, ComputerDOM } from "./playerManager";
import { startScreen } from "./StartScreen";

export function start() {
	startStatus = true;
}

export function setTurn(num) {
	turn = num;
}

function generateRandomLengths(amount) {
	let nums = [];
	for (let i = 0; i < amount; i++) {
		const randomN = Math.round(Math.random() * 2) + 2;
		nums.push(randomN);
	}
	return nums;
}

export let startStatus = false;
export let turn = 0;

const SHIPS_AMOUNT = 5;

const game = Game();
const player1 = game.getPlayer1();
const player2 = game.getPlayer2();

export const container1 = document.createElement("div");
export const container2 = document.createElement("div");
container2.style.display = "none";

container1.classList.add("container");
container1.classList.add("player1");
container2.classList.add("container");
container2.classList.add("player2");

const sc = startScreen();
sc.create();

export function startDOM() {
	const containers = document.querySelector(".containers");
	containers.appendChild(container1);
	containers.appendChild(container2);

	const playerDOM1 = PlayerDOM(container1, player1, 0);
	const playerDOM2 = ComputerDOM(container2, player2, 1);

	const randomNums = generateRandomLengths(SHIPS_AMOUNT); //? random lengths of the ships

	game.placeRandomShips(player2.getGameboard(), randomNums);
	generateDraggable(randomNums);

	const shipContainers = document.querySelectorAll(".ship-container");
	shipContainers.forEach((shipContainer) => {
		makeDraggable(shipContainer);
	});

	//? DOM

	playerDOM1.createGameboard();
	playerDOM2.createGameboard();

	playerDOM2.loop(player1.getGameboard()); //? starts attack loop of the computer

	makeDropPoint(playerDOM1);

	createStartBtn();
	changeDirectionBtn();
}

//startDOM();
