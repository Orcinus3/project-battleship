import { turn } from "./DOM";

export const TurnSign = function () {
	const container = document.querySelector(".turn-container");
	const sign = document.createElement("div");

	async function checkTurn() {
		while (true) {
			sign.textContent = `Player ${turn}'s turn`;
			await new Promise((resolve) => setTimeout(resolve, 50));
		}
	}

	function createElement() {
		container.appendChild(sign);
		checkTurn();
	}

	return { createElement };
};
