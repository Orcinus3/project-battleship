export const dropPoint = function (playerDOM) {
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
		event.target.classList.remove("drop-zone");
	});

	container.addEventListener("drop", (event) => {
		const draggable = document.querySelector(".draggable");
		console.log(draggable);
		//console.log(event.target);

		let selected;
		for (let i = 0; i < map.length; i++) {
			for (let j = 0; j < map.length; j++) {
				if (map[i][j].element === event.target) {
					console.log("FOUND ELEMENT");
					console.log(map[i][j]);
					selected = map[i][j];
					break;
				}
			}
		}
		console.log("-----");
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

const draggable = function (shipContainer) {
	shipContainer.addEventListener("dragstart", (event) => {
		event.target.classList.add("draggable");
	});

	shipContainer.addEventListener("dragend", (event) => {
		event.target.classList.remove("draggable");
	});
};

function generateDraggable() {
	const battleships = document.querySelector(".battleships");
	const nShips = Math.round(Math.random() * 2) + 2;
	let direction;
	if (Math.round(Math.random()) === 0) {
		direction = "vertical";
	} else {
		direction = "horizontal";
	}

	const newShipContainer = document.createElement("div");
	newShipContainer.draggable = true;
	newShipContainer.classList.add("ship-container");
	newShipContainer.classList.add(direction);
	for (let i = 0; i < nShips; i++) {
		const element = document.createElement("button");
		element.classList.add("ship");
		newShipContainer.appendChild(element);
	}

	battleships.appendChild(newShipContainer);
}
generateDraggable();
generateDraggable();
generateDraggable();
generateDraggable();
const shipContainers = document.querySelectorAll(".ship-container");

shipContainers.forEach((shipContainer) => {
	draggable(shipContainer);
});
