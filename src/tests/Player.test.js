import { Player } from "../logic/Player";

it("does player's gameboard get passed by reference?", () => {
	const player1 = Player();
	const gameboard = player1.getGameboard();
	expect(gameboard.areAllSunk()).toBe(true);
	gameboard.placeShip(1, 1, 1, "vertical");
	expect(gameboard.areAllSunk()).toBe(false);
	const a = player1.getGameboard();
	expect(a.areAllSunk()).toBe(false);
});
