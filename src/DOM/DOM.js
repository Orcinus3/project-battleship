import { Game } from "../logic/Game";

const game = Game();
const player1 = game.getPlayer1();
const player2 = game.getPlayer2();
const gameboard1 = player1.getGameboard();
const gameboard2 = player2.getGameboard();

const container = document.createElement("div");
container.className = "container";
document.body.appendChild(container);

export function createGameboard(gameboard) {
	const map = gameboard.getMap();
	for (let i = 0; i < gameboard.getWidth(); i++) {
		for (let j = 0; j < gameboard.getHeight(); j++) {
			console.log(map[i][j]);
		}
	}
}

createGameboard(gameboard1);
