import { startDOM } from "./DOM";

export const startScreen = function () {
	let choice;
	const startBtn = document.createElement("button");
	const onePlayerBtn = document.createElement("button");
	const twoPlayerBtn = document.createElement("button");
	const startContainer = document.createElement("div");
	const startMenu = document.createElement("div");
	startContainer.className = "start-container";
	startMenu.className = "start-menu";

	//? elements created after starting

	const buttonContainer = document.createElement("div");
	const turnContainer = document.createElement("div");
	const containers = document.createElement("div");
	const battleships = document.createElement("div");
	buttonContainer.className = "button-container";
	turnContainer.className = "turn-container";
	containers.className = "containers";
	battleships.className = "battleships";

	function modifyComps() {
		onePlayerBtn.textContent = "1 Player";
		twoPlayerBtn.textContent = "2 Players";
		startBtn.textContent = "Play";

		onePlayerBtn.addEventListener("click", () => {
			choice = 1;
		});
		twoPlayerBtn.addEventListener("click", () => {
			choice = 2;
		});
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
		startMenu.appendChild(onePlayerBtn);
		startMenu.appendChild(twoPlayerBtn);
	}

	function getChoice() {
		return choice;
	}

	return { getChoice, create };
};
