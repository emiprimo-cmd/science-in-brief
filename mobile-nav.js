document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("header").forEach((header, index) => {
    const desktopNav = header.querySelector("nav");
    const headerRow = header.querySelector(".flex.items-center");
    if (!desktopNav || !headerRow || header.querySelector("[data-mobile-menu-button]")) return;

    const menuId = `mobile-menu-${index}`;
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("data-mobile-menu-button", "");
    button.setAttribute("aria-controls", menuId);
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Open navigation menu");
    button.className = "md:hidden inline-flex h-10 w-10 items-center justify-center rounded border border-slate-300 bg-white text-primary shadow-sm";
    button.innerHTML = '<span class="text-2xl">&#9776;</span>';

    const menu = document.createElement("nav");
    menu.id = menuId;
    menu.setAttribute("data-mobile-menu", "");
    menu.className = "hidden md:hidden border-t border-slate-200 bg-white px-6 py-4 shadow-lg";

    const linkWrap = document.createElement("div");
    linkWrap.className = "flex flex-col gap-3";
    desktopNav.querySelectorAll("a").forEach((link) => {
      const clone = link.cloneNode(true);
      clone.className = "rounded px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-surface-container hover:text-primary";
      clone.addEventListener("click", () => closeMenu(button, menu));
      linkWrap.appendChild(clone);
    });
    menu.appendChild(linkWrap);

    const actions = headerRow.lastElementChild;
    if (actions) {
      actions.insertBefore(button, actions.firstChild);
    } else {
      headerRow.appendChild(button);
    }
    header.appendChild(menu);

    button.addEventListener("click", () => {
      const isOpen = button.getAttribute("aria-expanded") === "true";
      isOpen ? closeMenu(button, menu) : openMenu(button, menu);
    });

    document.addEventListener("click", (event) => {
      if (!header.contains(event.target)) closeMenu(button, menu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu(button, menu);
    });
  });
});

function openMenu(button, menu) {
  button.setAttribute("aria-expanded", "true");
  button.setAttribute("aria-label", "Close navigation menu");
  button.innerHTML = '<span class="text-2xl">&times;</span>';
  menu.classList.remove("hidden");
}

function closeMenu(button, menu) {
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-label", "Open navigation menu");
  button.innerHTML = '<span class="text-2xl">&#9776;</span>';
  menu.classList.add("hidden");
}
