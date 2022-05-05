// DOM элементы
const burgerBtn = document.querySelector("#burger-menu");
const fullscreenMenu = document.querySelector(".fullscreen-menu");
const teamList = document.querySelector(".team__list");
const menuList = document.querySelector(".menu-acco__list");
const reviewsList = document.querySelector(".reviews__list");
const reviewsTabs = document.querySelector(".reviews__tabs");

// Функционал Бургер-меню для планшетов и ниже
//
burgerBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // переключаем классы у нужным элементов
  burgerBtn.classList.toggle("burger-menu--active");
  fullscreenMenu.classList.toggle("fullscreen-menu--active");
  document.body.classList.toggle("stop-scroll");
});

// Вертикальный Аккордеон Команды
//
// Делаем первый айтем команды активным по умолчанию
let activeTeamItem = document.querySelector(".team__item");

teamList.addEventListener("click", (e) => {
  // проверка, что мы попали именно на Заголовок с классом team__name
  if (e.target.classList.contains("team__name")) {
    // Запишем его родителя (team__item) в переменную
    let targetItem = e.target.parentNode.parentNode;

    // проверка есть ли уже у выбранного элемента team__item класс active
    if (targetItem.classList.contains("team__item--active")) {
      // если да, то удаляем его и выходим из функции!
      targetItem.classList.remove("team__item--active");
      return;
    } else if (activeTeamItem) {
      // если уже есть другой открытый элемент, то удадяем у него класс
      activeTeamItem.classList.remove("team__item--active");
    }
    // далее делаем активным айтемом тот, по которому кликнули
    activeTeamItem = targetItem;
    // и добавляем ему класс по таймауту, чтобы прошла анимации закрытия
    setTimeout(() => {
      targetItem.classList.add("team__item--active");
    }, 450);
  }
});

// Горизонтальный Аккордеон Меню
//
// Делаем первый айтем меню активным по умолчанию
let activeMenuItem = document.querySelector(".menu-acco__item");

menuList.addEventListener("click", (e) => {
  if (e.target.classList.contains("menu-acco__trigger")) {
    let targetItem = e.target.parentNode;

    if (targetItem.classList.contains("menu-acco__item--active")) {
      targetItem.classList.remove("menu-acco__item--active");
      return;
    } else if (activeMenuItem) {
      activeMenuItem.classList.remove("menu-acco__item--active");
    }

    activeMenuItem = targetItem;
    activeMenuItem.classList.add("menu-acco__item--active");
  }
});

// Переключатель отзывов в секции Отзывы
//
let activeTabsItem = document.querySelector(".tabs__item");

reviewsTabs.addEventListener("click", (e) => {
  if (e.target.classList.contains("tabs__image")) {
    let tabsItem = e.target.parentNode;

    if (tabsItem.classList.contains("tabs__item--active")) {
      tabsItem.classList.remove("tabs__item--active");
      return;
    } else if (activeTabsItem) {
      activeTabsItem.classList.remove("tabs__item--active");
    }

    activeTabsItem = tabsItem;
    activeTabsItem.classList.add("tabs__item--active");

    moveReviewsItem(e.target);
  }
});

function moveReviewsItem(target) {
  let tabIndex = parseInt(target.dataset.tabs);
  if (tabIndex === 0) {
    reviewsList.style.left = "0%";
  } else {
    reviewsList.style.left = `-${tabIndex * 100}%`;
  }
}
