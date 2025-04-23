import { Game } from "../logic/Game";
import { dropPoint } from "./drag&drop";

let turn = 0;

const game = Game();
const player1 = game.getPlayer1();
const player2 = game.getPlayer2(); //TODO make computer adversary

const container1 = document.createElement("div");
const container2 = document.createElement("div");
container1.classList.add("container");
container1.classList.add("player1");
container2.classList.add("container");
container2.classList.add("player2");

const containers = document.querySelector(".containers");
containers.appendChild(container1);
containers.appendChild(container2);

const PlayerDOM = function (container, player, playerTurn) {
	const gameboard = player.getGameboard();

	function getGameboard() {
		return gameboard;
	}

	function getContainer() {
		return container;
	}

	function createGameboard() {
		const map = gameboard.getMap();
		for (let j = 0; j < gameboard.getWidth(); j++) {
			for (let i = 0; i < gameboard.getHeight(); i++) {
				const tile = map[i][j];
				const element = document.createElement("button");
				element.classList.add("tile");
				element.style.width = "10%";
				element.style.height = "10%";
				if (tile.ship === null) {
					tile.element = element;
					initializeTileListener(tile);
					container.appendChild(element);
				} else if (tile.ship !== null) {
					tile.element = element;
					tile.element.classList.add("ship");
					initializeTileListener(tile);
					container.appendChild(tile.element);
				}
			}
		}
	}

	function refreshGameboard() {
		if (gameboard.areAllSunk()) {
			document.body.innerHTML = `Player ${playerTurn} won!`;
		}
		const map = gameboard.getMap();
		for (let j = 0; j < gameboard.getWidth(); j++) {
			for (let i = 0; i < gameboard.getHeight(); i++) {
				const tile = map[i][j];
				const ship = tile.ship;
				const element = tile.element;
				if (ship === false) {
					element.classList.add("missed");
				} else if (ship !== null) {
					if (ship.isSunk()) {
						element.classList.add("sunk");
						element.classList.toggle("hit");
					} else {
						element.classList.add("ship");
					}
				}
			}
		}
	}

	function initializeTileListener(tile) {
		function handleClick() {
			if (turn === playerTurn) {
				console.log(turn);
				return;
			}
			turn++;
			if (turn === 2) {
				turn = 0;
			}

			const attacked = gameboard.receiveAttack(tile.x, tile.y);
			console.log(attacked);
			if (!attacked) {
				tile.ship = false;
				refreshGameboard();
				return;
			}
			tile.element.classList.add("hit");
			tile.element.removeEventListener("click", handleClick);
			refreshGameboard();
		}

		tile.element.addEventListener("click", handleClick);
	}

	return { createGameboard, getContainer, getGameboard, refreshGameboard };
};

const ComputerDOM = function (container, computer, computerTurn) {
	async function loop(enemyGameboard) {
		while (true) {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			if (turn === computerTurn) {
				console.log("computer's turn");
				attackEnemy(enemyGameboard);
			}
		}
	}

	function attackEnemy(enemyGameboard) {
		const map = enemyGameboard.getMap();
		const coords = computer.getNextAttack();
		console.log(coords);
		const x = coords.x;
		const y = coords.y;
		map[x][y].element.click();
	}

	const obj = PlayerDOM(container, computer, computerTurn);
	obj.loop = loop;

	return obj;
};

const playerDOM1 = PlayerDOM(container1, player1, 0);
const playerDOM2 = ComputerDOM(container2, player2, 1);

playerDOM1.createGameboard();
playerDOM2.createGameboard();

playerDOM2.loop(player1.getGameboard());

dropPoint(playerDOM1);
