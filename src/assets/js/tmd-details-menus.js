/*
 * Script name   : Details Element State Persistence
 * Description   : This script saves and restores the 'open' state of <details> elements to localStorage.
 * This ensures that the open/closed state of details sections is preserved even after a page reload.
 * Version       : 0.3.0
 * Author        : InsertApps
 * Date          : 2024-10-08
 * Last Update   : 2024-10-09
 * License       : MIT
 *
 * Features:
 * 1. Preserves the open/closed state of <details> elements across page reloads.
 * 2. Automatically saves and restores the rotation state of a child element with the class '.rotate-on-open'.
 * 3. Uses localStorage to store the state of each <details> element individually.
 *
 * Usage:
 * - Add <details> elements to your HTML.
 * - Include this script in your HTML file.
 * - The script will automatically handle the persistence of the open state for all <details> elements on the page.
 * - Add the class 'rotate-on-open' to any child element inside <details> that you want to maintain its rotation state.
 *
 * Changelog:
 * - v0.3.0:
 * - v0.2.0: Added functionality to persist the rotation state of an element with the class '.rotate-on-open'.
 * - v0.1.0: Initial release with basic persistence for the 'open' attribute.
 */

document.addEventListener("DOMContentLoaded", function () {
	const detailsElements = document.querySelectorAll("details");

	function saveDetailsState() {
		const states = {};
		detailsElements.forEach(function (d, i) {
			let key = d.id;
			if (!key) {
				key = d.dataset.key;
			}
			if (!key) {
				key = "index-" + i; // fallback ke index
			}
			states[key] = d.open;
		});
		sessionStorage.setItem("detailsOpenStates", JSON.stringify(states));
	}

	function loadDetailsState() {
		const saved = sessionStorage.getItem("detailsOpenStates");
		if (saved) {
			const states = JSON.parse(saved);
			detailsElements.forEach(function (d, i) {
				let key = d.id;
				if (!key) {
					key = d.dataset.key;
				}
				if (!key) {
					key = "index-" + i;
				}
				if (states.hasOwnProperty(key)) {
					d.open = states[key];

					if (states[key]) {
						d.setAttribute("open", "");
					}
				}
			});
		}
	}

	loadDetailsState();
	detailsElements.forEach(function (d) {
		d.addEventListener("toggle", saveDetailsState);
	});
});
