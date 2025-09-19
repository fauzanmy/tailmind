/*
* Script name   : Navigation Active State
* Description   : Script untuk menandai item menu navigasi yang aktif (current page)
*                 dengan class `current-page` dan atribut `aria-current="page"` pada <a>.
* Version       : 1.0.0
* Author        : InsertApps
* Date          : 2025-09-13
* Last Update   : 2025-09-13
* License       : MIT
* 
* Features:
* - Menambahkan class `current-page` pada <li> yang diklik.
* - Menghapus class `current-page` dari semua sibling <li>.
* - Menambahkan atribut `aria-current="page"` pada elemen <a> di dalam <li> aktif.
* - Menghapus atribut `aria-current` dari semua item lain.
* - Menggunakan event delegation untuk efisiensi.
* 
* Usage:
* HTML:
* <ul class="menus">
*   <li><a href="/">Home</a></li>
*   <li><a href="/about">About</a></li>
*   <li><a href="/contact">Contact</a></li>
* </ul>
* 
* JS:
* addActiveClassToNav('.menus'); // default class: current-page
* 
* CSS:
* .current-page > a {
*   font-weight: bold;
*   color: red;
* }
* 
* Changelog:
* v1.0.0 - Versi awal: penambahan class current-page & aria-current="page"
*/

export function addActiveClassToNav(parentSelector, activeClass = 'current-menu-item') {
    const parentElements = document.querySelectorAll(parentSelector);

    if (!parentElements.length) {
        console.error(`Element with selector '${parentSelector}' was not found.`);
        return;
    }

    // Saat halaman dimuat, cek sessionStorage
    const savedId = sessionStorage.getItem('activeMenuItemId');
    if (savedId) {
        const savedItem = document.querySelector(`${parentSelector} li[data-id="${savedId}"]`);
        if (savedItem) {
            activateItem(savedItem, parentSelector, activeClass);
        }
    }

    parentElements.forEach(parentElement => {
        parentElement.addEventListener('click', (event) => {
            const clickedItem = event.target.closest('li[data-id]');

            if (!clickedItem || !parentElement.contains(clickedItem)) {
                return;
            }

            // Aktifkan item yang diklik
            activateItem(clickedItem, parentSelector, activeClass);

            // Simpan data-id ke sessionStorage
            const id = clickedItem.getAttribute('data-id');
            if (id) {
                sessionStorage.setItem('activeMenuItemId', id);
            }
        });
    });
}

function activateItem(item, parentSelector, activeClass) {
    // Hapus aktif di semua menu
    const allItems = document.querySelectorAll(`${parentSelector} li`);
    allItems.forEach(li => {
        li.classList.remove(activeClass);
        const link = li.querySelector('a');
        if (link) {
            link.removeAttribute('aria-current');
        }
    });

    // Tambahkan aktif ke item ini
    item.classList.add(activeClass);
    const activeLink = item.querySelector('a');
    if (activeLink) {
        activeLink.setAttribute('aria-current', 'page');
    }
}

// Jalankan langsung jika DOM sudah siap
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        addActiveClassToNav('.menu');
    });
} else {
    addActiveClassToNav('.menu');
}