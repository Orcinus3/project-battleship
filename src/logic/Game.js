import { Computer, Player } from "./Player";

export const Game = function () {
	const player1 = Player();
	const player2 = Computer();

	function getPlayer1() {
		return player1;
	}

	function getPlayer2() {
		return player2;
	}

	function placeRandomShips(gameboard, shipLengths) {
		let counter = 0;
		let shipCounter = 0;
		let randomX;
		let randomY;
		let randomLength;
		let randomDirection;
		while (counter <= 2000 && shipCounter < shipLengths.length) {
			randomX = Math.floor(Math.random() * 10);
			randomY = Math.floor(Math.random() * 10);
			randomLength = shipLengths[shipCounter];

			if (Math.round(Math.random()) === 0) {
				randomDirection = "horizontal";
			} else {
				randomDirection = "vertical";
			}

			if (randomLength === 0) {
				continue;
			}

			let isValid = gameboard.placeShip(randomX, randomY, randomLength, randomDirection);
			if (isValid) {
				shipCounter++;
			}
			counter++;
		}
	}

	return { getPlayer1, getPlayer2, placeRandomShips };
};
