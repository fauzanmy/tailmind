/**
 * Dark Mode Toggle Script - Default Light
 * -----------------------------------
 * Script ini mengelola pengaturan tema (gelap, terang, atau otomatis) 
 * berdasarkan preferensi pengguna. Tema yang dipilih akan disimpan di 
 * localStorage agar tetap konsisten di setiap kunjungan halaman.
 * 
 * @author  Fauzan My
 * @version 0.5.1
 * @license MIT
 */

export function initDarkMode() {
	const themeToggleBtn = document.getElementById('theme-toggle-btn');
	const themeOptionsMenu = document.getElementById('theme-options');
	if (!themeToggleBtn || !themeOptionsMenu) return;

	const themeButtons = themeOptionsMenu.querySelectorAll('.theme-option');

	const getPreferredTheme = () => {
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme) return savedTheme;
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	};

	const setTheme = (theme) => {
		if (theme === 'auto') {
			if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		} else {
			document.documentElement.classList.toggle('dark', theme === 'dark');
		}
		localStorage.setItem('theme', theme);
		updateButtonIcon(theme);
		updateActiveButton(theme);
	};

	const updateButtonIcon = (theme) => {
		const icon = themeToggleBtn.querySelector('.theme-icon-active use');
		if (!icon) return;
		if (theme === 'dark') {
			icon.setAttribute('href', '#moon');
			themeToggleBtn.setAttribute('aria-label', 'Toggle theme (dark)');
		} else if (theme === 'light') {
			icon.setAttribute('href', '#sun');
			themeToggleBtn.setAttribute('aria-label', 'Toggle theme (light)');
		} else {
			icon.setAttribute('href', '#theme-system');
			themeToggleBtn.setAttribute('aria-label', 'Toggle theme (auto)');
		}
	};

	const updateActiveButton = (theme) => {
		themeButtons.forEach(btn => {
			btn.classList.toggle('active', btn.getAttribute('data-theme') === theme);
		});
	};

	themeButtons.forEach(button => {
		button.addEventListener('click', () => {
			const theme = button.getAttribute('data-theme');
			setTheme(theme);
			themeOptionsMenu.classList.remove('open');
			themeOptionsMenu.classList.add('close');
		});
	});

	// set theme saat load pertama
	const preferredTheme = getPreferredTheme();
	setTheme(preferredTheme);
	updateActiveButton(preferredTheme);
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", () => {
		initDarkMode();
	});
} else {
	initDarkMode();
}