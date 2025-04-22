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

export const Computer = function () {
	const hit = new Set();
	let gmWidth = 10;
	let gmHeight = 10;
	const gameboard = Gameboard(gmWidth, gmHeight);

	function getGameboard() {
		return gameboard;
	}

	function getNextAttack() {
		let randomX = Math.floor(Math.random() * gmWidth);
		let randomY = Math.floor(Math.random() * gmHeight);
		let target = `${randomX}${randomY}`;

		while (hit.has(target)) {
			randomX = Math.floor(Math.random() * gmWidth);
			randomY = Math.floor(Math.random() * gmHeight);

			target = `${randomX}${randomY}`;
		}
		hit.add(target);

		return { x: randomX, y: randomY };
	}

	return { getGameboard, getNextAttack };
};
