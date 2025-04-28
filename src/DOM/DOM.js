import { Game } from "../logic/Game";
import { generateDraggable, makeDraggable, makeDropPoint } from "./drag&drop";
import { createStartBtn, createNextBtn, changeDirectionBtn } from "./buttons";
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
//TODO change color of ships based on player
export let startStatus = false;
export let turn = 0;

const SHIPS_AMOUNT = 5;

const game = Game();

export const container1 = document.createElement("div");
export const container2 = document.createElement("div");
container2.style.display = "none";

container1.classList.add("container");
container1.classList.add("player1");
container2.classList.add("container");
container2.classList.add("player2");

const sc = startScreen();
sc.create();

export let playerDOM1;
export let playerDOM2;

export function startDOM() {
	if (sc.getChoice() === 2) {
		game.setVSHuman();
		twoPlayersMode();
		return;
	}
	onePlayerMode();
}

function onePlayerMode() {
	const player1 = game.getPlayer1();
	const player2 = game.getPlayer2();
	const containers = document.querySelector(".containers");
	containers.appendChild(container1);
	containers.appendChild(container2);

	playerDOM1 = PlayerDOM(container1, player1, 0);
	playerDOM2 = ComputerDOM(container2, player2, 1);

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
}

function twoPlayersMode() {
	const player1 = game.getPlayer1();
	const player2 = game.getPlayer2();
	const containers = document.querySelector(".containers");
	containers.appendChild(container1);
	containers.appendChild(container2);

	playerDOM1 = PlayerDOM(container1, player1, 0);
	playerDOM2 = PlayerDOM(container2, player2, 1);

	const randomNums = generateRandomLengths(SHIPS_AMOUNT); //? random lengths of the ships
	generateDraggable(randomNums);

	const shipContainers = document.querySelectorAll(".ship-container");
	shipContainers.forEach((shipContainer) => {
		makeDraggable(shipContainer);
	});

	playerDOM1.createGameboard();
	playerDOM2.createGameboard();

	makeDropPoint(playerDOM1);
	makeDropPoint(playerDOM2);
	createNextBtn();
}
