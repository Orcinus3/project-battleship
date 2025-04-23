import { start } from "./DOM";

export function createStartBtn() {
	const battleships = document.querySelector(".battleships");
	const button = document.createElement("button");
	button.textContent = "START";
	document.body.appendChild(button);

	button.addEventListener("click", () => {
		if (battleships.children.length) {
			alert("not enough ships");
			return;
		}

		start();

		button.parentElement.removeChild(button);
	});
}

export function changeDirectionBtn() {
	const shipContainers = document.querySelectorAll(".ship-container");
	const button = document.createElement("button");
	button.textContent = "CHANGE DIRECTIOn";
	document.body.appendChild(button);
	button.addEventListener("click", () => {
		shipContainers.forEach((ship) => {
			if (ship.classList.contains("vertical")) {
				ship.classList.remove("vertical");
				ship.classList.add("horizontal");
			} else {
				ship.classList.remove("horizontal");
				ship.classList.add("vertical");
			}
		});
	});
}
