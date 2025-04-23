import { turn, startStatus, setTurn } from "./DOM";

export const PlayerDOM = function (container, player, playerTurn) {
	const gameboard = player.getGameboard();

	function getGameboard() {
		return gameboard;
	}

	function getContainer() {
		return container;
	}

	function createGameboard() {
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
		if (gameboard.areAllSunk()) {
			document.body.innerHTML = `Player ${playerTurn} won!`;
		}
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
						element.classList.toggle("hit");
					} else {
						element.classList.add("ship");
					}
				}
			}
		}
	}

	function initializeTileListener(tile) {
		function handleClick() {
			if (!startStatus) {
				console.log("not started");
				return;
			}
			if (turn === playerTurn) {
				console.log(turn);
				return;
			}
			setTurn(turn + 1);
			if (turn === 2) {
				setTurn(0);
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

	return { createGameboard, getContainer, getGameboard, refreshGameboard };
};

export const ComputerDOM = function (container, computer, computerTurn) {
	const gameboard = computer.getGameboard();
	async function loop(enemyGameboard) {
		while (true) {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			if (turn === computerTurn) {
				console.log("computer's turn");
				attackEnemy(enemyGameboard);
			}
		}
	}

	function attackEnemy(enemyGameboard) {
		const map = enemyGameboard.getMap();
		const coords = computer.getNextAttack();
		console.log(coords);
		const x = coords.x;
		const y = coords.y;
		map[x][y].element.click();
	}

	function createGameboard() {
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
					initializeTileListener(tile);
					container.appendChild(tile.element);
				}
			}
		}
	}

	function refreshGameboard() {
		if (gameboard.areAllSunk()) {
			document.body.innerHTML = `Player ${computerTurn} won!`;
		}
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
						element.classList.toggle("hit");
					}
				}
			}
		}
	}
	function initializeTileListener(tile) {
		function handleClick() {
			if (!startStatus) {
				console.log("not started");
				return;
			}
			if (turn === computerTurn) {
				console.log(turn);
				return;
			}
			setTurn(turn + 1);
			if (turn === 2) {
				setTurn(0);
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

	const obj = PlayerDOM(container, computer, computerTurn);
	obj.loop = loop;
	obj.refreshGameboard = refreshGameboard;
	obj.createGameboard = createGameboard;

	return obj;
};
