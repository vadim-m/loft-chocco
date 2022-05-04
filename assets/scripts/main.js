// DOM элементы
const burgerBtn = document.querySelector("#burger-menu");
const fullscreenMenu = document.querySelector(".fullscreen-menu");
const teamList = document.querySelector(".team__list");

// Функционал Бургер-меню для планшетов и ниже
burgerBtn.addEventListener("click", (e) => {
  e.preventDefault();

  burgerBtn.classList.toggle("burger-menu--active");
  fullscreenMenu.classList.toggle("fullscreen-menu--active");
  document.body.classList.toggle("stop-scroll");
});

// Вертикальный Аккордеон Команды
// Переменная для переключения активного айтема
let activeTeamItem;

teamList.addEventListener("click", (e) => {
  // проверка, что мы попали именно на Заголовок с классом team__name
  if (e.target.classList.contains("team__name")) {
    // Запишем его родителя - team__item в переменную
    let listItem = e.target.parentNode.parentNode;

    // проверка есть ли уже у выбранного элемента team__item класс active
    if (listItem.classList.contains("team__item--active")) {
      // если да, то удаляем его и выходим!
      listItem.classList.remove("team__item--active");

      return;
    } else if (activeTeamItem) {
      // если уже есть открытй элемент, то удадяем у него класс
      activeTeamItem.classList.remove("team__item--active");
    }
    // а далее делаем активный айтем тот, по которому кликнули
    activeTeamItem = listItem;
    // и добавляем ему класс
    listItem.classList.add("team__item--active");
  }
});
