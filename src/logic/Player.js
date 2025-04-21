import { Gameboard } from "./Gameboard";

export const Player = function () {
	let gmWidth = 10;
	let gmHeight = 10;
	const gameboard = Gameboard(gmWidth, gmHeight);

	function getGameboard() {
		return gameboard;
	}

	return { getGameboard };
};
