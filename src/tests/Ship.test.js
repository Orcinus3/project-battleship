import { Ship } from "../logic/Ship";

it("does hit and isSunk work", () => {
	const ship = Ship(3);
	ship.hit();
	ship.hit();
	expect(ship.isSunk()).toBe(false);
	ship.hit();
	expect(ship.isSunk()).toBe(true);
});
