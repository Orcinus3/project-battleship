import { startDOM } from "./DOM";

export const startScreen = function () {
	const startBtn = document.createElement("button");
	const startContainer = document.createElement("div");
	const startMenu = document.createElement("div");
	startContainer.className = "start-container";
	startMenu.className = "start-menu";

	const buttonContainer = document.createElement("div");
	const turnContainer = document.createElement("div");
	const containers = document.createElement("div");
	const battleships = document.createElement("div");
	buttonContainer.className = "button-container";
	turnContainer.className = "turn-container";
	containers.className = "containers";
	battleships.className = "battleships";

	function modifyComps() {
		startBtn.textContent = "Play";
		startBtn.addEventListener("click", () => {
			document.body.innerHTML = "";
			document.body.appendChild(buttonContainer);
			document.body.appendChild(turnContainer);
			document.body.appendChild(containers);
			document.body.appendChild(battleships);
			startDOM();
		});
	}

	function create() {
		document.body.innerHTML = "";
		modifyComps();

		document.body.appendChild(startContainer);
		startContainer.appendChild(startMenu);
		startMenu.appendChild(startBtn);
	}

	return { create };
};
