import { Game } from "../logic/Game";

let turn = 0;

const game = Game();
const player1 = game.getPlayer1();
const player2 = game.getPlayer2();

const container1 = document.createElement("div");
const container2 = document.createElement("div");
container1.classList.add("container");
container1.classList.add("player1");
container2.classList.add("container");
container2.classList.add("player2");

document.body.appendChild(container1);
document.body.appendChild(container2);

const PlayerDOM = function (player, playerTurn) {
	const gameboard = player.getGameboard();

	function createGameboard(container) {
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
					} else {
						element.classList.add("ship");
					}
				}
			}
		}
	}

	function initializeTileListener(tile) {
		function handleClick() {
			if (turn !== playerTurn) {
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

	return { createGameboard };
};

const playerDOM1 = PlayerDOM(player1, 0);
const playerDOM2 = PlayerDOM(player2, 1);

playerDOM1.createGameboard(container1);
playerDOM2.createGameboard(container2);
