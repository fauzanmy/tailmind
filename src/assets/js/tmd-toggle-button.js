export function initToggleController() {
	const toggleButtons = document.querySelectorAll(".toggle-button");

	function toggleElement(targetElement, toggleClasses) {
		const onClass = toggleClasses[0];
		const offClass = toggleClasses[1] || "";

		const isActive = targetElement.classList.contains(onClass);

		// Tutup semua elemen lain yang sedang aktif
		const openElements = document.querySelectorAll("." + onClass);
		openElements.forEach((el) => {
			if (el !== targetElement) {
				el.classList.remove(onClass);
				el.classList.add(offClass);
			}
		});

		// Toggle target
		if (isActive) {
			targetElement.classList.remove(onClass);
			targetElement.classList.add(offClass);
		} else {
			targetElement.classList.add(onClass);
			targetElement.classList.remove(offClass);

			// Fokus ke input search jika ada
			const inputField = targetElement.querySelector("input[type='search']");
			if (inputField) {
				inputField.focus();
			}
		}
	}

	// Event klik tombol toggle
	toggleButtons.forEach((button) => {
		button.addEventListener("click", function () {
			const targetIds = this.dataset.target.split(" ");
			let toggleClasses = ["open", "close"]; // default

			if (this.dataset.toggleClass) {
				toggleClasses = this.dataset.toggleClass.split(" ");
			}

			targetIds.forEach((id) => {
				const targetElement = document.getElementById(id);
				if (targetElement) {
					toggleElement(targetElement, toggleClasses);
				}
			});
		});
	});

	// Klik di luar → tutup elemen terbuka
	document.addEventListener("click", (event) => {
		const openedElements = document.querySelectorAll(".open, .active");

		openedElements.forEach((el) => {
			const isClickInside = el.contains(event.target);
			const isClickOnButton = event.target.closest(".toggle-button");

			if (!isClickInside && !isClickOnButton) {
				if (el.classList.contains("open")) {
					el.classList.remove("open");
					el.classList.add("close");
				} else if (el.classList.contains("active")) {
					el.classList.remove("active");
					el.classList.add("inactive");
				}
			}
		});
	});
}

//  Inisialisasi

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", () => {
		initToggleController();
	});
} else {
	initToggleController();
}