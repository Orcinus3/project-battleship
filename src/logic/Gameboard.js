import { Ship } from "./Ship";

export const Gameboard = function (width, height) {
	const map = createMap();

	function createMap() {
		const matrix = [];
		for (let i = 0; i < width; i++) {
			const row = [];
			for (let j = 0; j < height; j++) {
				row.push({ ship: null, x: i, y: j });
			}
			matrix.push(row);
		}
		return matrix;
	}

	function isOutOfBounds(x, y) {
		if (x >= width || x < 0) {
			return true;
		} else if (y >= height || y < 0) {
			return true;
		}
		return false;
	}

	function isOccupied(x, y) {
		return !!map[x][y].ship;
	}

	function canBePlaced(x, y, length, direction) {
		if (direction === "horizontal") {
			for (let i = x; i < length + x; i++) {
				if (isOutOfBounds(i, y) || isOccupied(i, y)) {
					return false;
				}
			}
		} else if (direction === "vertical") {
			for (let i = y; i < length + y; i++) {
				if (isOutOfBounds(x, i) || isOccupied(x, i)) {
					return false;
				}
			}
		}
		return true;
	}

	function placeShip(x, y, shipLength, direction) {
		const ship = Ship(shipLength);

		if (direction === "horizontal" && canBePlaced(x, y, shipLength, direction)) {
			for (let i = x; i < shipLength + x; i++) {
				map[i][y].ship = ship;
			}
			return true;
		} else if (direction === "vertical" && canBePlaced(x, y, shipLength, direction)) {
			for (let i = y; i < shipLength + y; i++) {
				map[x][i].ship = ship;
			}
			return true;
		}

		return false;
	}

	function receiveAttack(x, y) {
		const occupied = isOccupied(x, y);
		if (occupied) {
			map[x][y].ship.hit();
		} else {
			map[x][y].ship = false; //? distiguishes the hit tiles "false" from the "null" tiles
		}

		return occupied;
	}

	function areAllSunk() {
		for (let i = 0; i < width; i++) {
			for (let j = 0; j < height; j++) {
				if (isOccupied(i, j) && !map[i][j].ship.isSunk()) {
					return false;
				}
			}
		}
		return true;
	}

	function getWidth() {
		return width;
	}

	function getHeight() {
		return height;
	}

	function getMap() {
		return map;
	}

	return { placeShip, receiveAttack, areAllSunk, getWidth, getHeight, getMap };
};
