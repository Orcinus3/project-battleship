import { turn, playerDOM1, playerDOM2 } from "./DOM";

export const TurnSign = function () {
	const container = document.querySelector(".turn-container");
	const sign = document.createElement("div");

	const container1 = playerDOM1.getContainer();
	const container2 = playerDOM2.getContainer();
	const player1Turn = playerDOM1.getTurn();
	const player2Turn = playerDOM2.getTurn();

	async function checkTurn() {
		while (true) {
			if (turn === player1Turn) {
				console.log("player1 turn");
				container2.classList.add("current-player2");
				container1.classList.remove("current-player1");
			} else {
				console.log("player2 turn");

				container1.classList.add("current-player1");
				container2.classList.remove("current-player2");
			}
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
