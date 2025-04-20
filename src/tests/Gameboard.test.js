import { Gameboard } from "../logic/Gameboard";

it("isOutOfBounds works? ", () => {
	const gameboard = Gameboard(10, 10);
	expect(gameboard.placeShip(9, 9, 3, "horizontal")).toBe(false);
});

it("isOutOfBounds works? pt 2 ", () => {
	const gameboard = Gameboard(10, 10);
	expect(gameboard.placeShip(0, 9, 3, "horizontal")).toBe(true);
	expect(gameboard.placeShip(0, 8, 3, "vertical")).toBe(false);
	expect(gameboard.placeShip(0, 6, 3, "vertical")).toBe(true);
});

it("receiveAttack works? ", () => {
	const gameboard = Gameboard(10, 10);
	expect(gameboard.receiveAttack(1, 1)).toBe(false);
	expect(gameboard.placeShip(0, 1, 3, "horizontal")).toBe(true);
	expect(gameboard.receiveAttack(1, 1)).toBe(true);
	expect(gameboard.receiveAttack(1, 2)).toBe(false);
});

it("can Gameboard tell if all ships are all sunk?", () => {
	const gameboard = Gameboard(10, 10);
	expect(gameboard.areAllSunk()).toBe(true);
	gameboard.placeShip(1, 1, 1, "horizontal");
	expect(gameboard.areAllSunk()).toBe(false);
	gameboard.receiveAttack(1, 1);
	expect(gameboard.areAllSunk()).toBe(true);
});
