export const makeDropPoint = function (playerDOM) {
	const container = playerDOM.getContainer();
	const gameboard = playerDOM.getGameboard();
	const map = gameboard.getMap();

	console.log(container);
	console.log(gameboard);

	container.addEventListener("dragover", (event) => {
		event.preventDefault();
		event.target.classList.add("drop-zone");
	});

	container.addEventListener("dragleave", (event) => {
		event.preventDefault();
		event.target.classList.remove("drop-zone");
	});

	container.addEventListener("drop", (event) => {
		event.preventDefault();
		const draggable = document.querySelector(".draggable");

		let selected;
		for (let i = 0; i < map.length; i++) {
			for (let j = 0; j < map.length; j++) {
				if (map[i][j].element === event.target) {
					console.log(map[i][j]);
					selected = map[i][j];
					break;
				}
			}
		}
		event.target.classList.remove("drop-zone");

		const x = selected.x;
		const y = selected.y;
		const length = draggable.children.length;
		let direction;

		if (draggable.classList.contains("horizontal")) {
			direction = "horizontal";
		} else if (draggable.classList.contains("vertical")) {
			direction = "vertical";
		}

		if (gameboard.placeShip(x, y, length, direction)) {
			playerDOM.refreshGameboard();
			draggable.parentElement.removeChild(draggable);
		}
	});

	return container;
};

export const makeDraggable = function (shipContainer) {
	shipContainer.addEventListener("dragstart", (event) => {
		event.target.classList.add("draggable");
	});

	shipContainer.addEventListener("dragend", (event) => {
		event.target.classList.remove("draggable");
	});
};

//? DOM

export function generateDraggable(shipLengths) {
	for (let i = 0; i < shipLengths.length; i++) {
		const battleships = document.querySelector(".battleships");
		let direction = "horizontal";

		const newShipContainer = document.createElement("div");
		newShipContainer.draggable = true;
		newShipContainer.classList.add("ship-container");
		newShipContainer.classList.add(direction);
		for (let j = 0; j < shipLengths[i]; j++) {
			const element = document.createElement("button");
			element.classList.add("ship");
			newShipContainer.appendChild(element);
		}

		battleships.appendChild(newShipContainer);
	}
}
