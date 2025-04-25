import { start, container2 } from "./DOM";
import { TurnSign } from "./PostStartComponents";

export function createStartBtn() {
	const buttonContainer = document.querySelector(".button-container");

	const battleships = document.querySelector(".battleships");
	const button = document.createElement("button");
	button.textContent = "START";
	buttonContainer.appendChild(button);

	button.addEventListener("click", () => {
		if (battleships.children.length) {
			alert("not enough ships");
			return;
		}

		start();
		removeStartingComps();
		addPostStartComps();
		container2.style.display = "block";
		button.parentElement.removeChild(button);
	});

	function removeStartingComps() {
		buttonContainer.parentElement.removeChild(buttonContainer);
		battleships.parentElement.removeChild(battleships);
	}

	function addPostStartComps() {
		//TODO add a sign that indicates who is shooting, computer needs to wait and the sign is thinking....
		const turnSign = TurnSign();
		turnSign.createElement();
	}
}

export function changeDirectionBtn() {
	const buttonContainer = document.querySelector(".button-container");
	const shipContainers = document.querySelectorAll(".ship-container");
	const button = document.createElement("button");
	button.textContent = "ROTATE SHIPS";
	buttonContainer.appendChild(button);
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
