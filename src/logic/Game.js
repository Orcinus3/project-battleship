import { Player } from "./Player";

export const Game = function () {
	const player1 = Player();
	const player2 = Player();
	const gameboard1 = player1.getGameboard();
	const gameboard2 = player2.getGameboard();

	gameboard1.placeShip(0, 0, 2, "horizontal");
	gameboard1.placeShip(8, 10, 2, "horizontal");
	gameboard1.placeShip(2, 2, 4, "vertical");
	gameboard1.placeShip(5, 2, 4, "vertical");

	gameboard2.placeShip(0, 0, 2, "horizontal");
	gameboard2.placeShip(8, 10, 2, "horizontal");
	gameboard2.placeShip(2, 2, 4, "vertical");
	gameboard2.placeShip(5, 2, 4, "vertical");

	function getPlayer1() {
		return player1;
	}

	function getPlayer2() {
		return player2;
	}

	return { getPlayer1, getPlayer2 };
};
