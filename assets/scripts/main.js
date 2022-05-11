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
  if (e.target.classList.contains("menu-acco__span")) {
    e.target.parentNode.parentNode.classList.remove("menu-acco__item--active");
    return;
  } else if (e.target.classList.contains("menu-acco__trigger")) {
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

// Добавляем карту Yandex.Maps
//
// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);

// Массив меток на карте
const placemarks = [
  {
    latitude: 55.752,
    longitude: 37.576,
    hintContent: "CHOCCO!",
    balloonContent: ` 
                      <span>Магазин Лучших батончиков!</span>
                      <br>
                      <span>ул.Новый Арбат, д.31/12</span> 
    `,
  },
  {
    latitude: 55.7447,
    longitude: 37.5663,
    hintContent: "CHOCCO!",
    balloonContent: ` 
                      <span>CHOCCO ТЦ Европейский</span>
                      <br>
                      <span>площадь Киевского Вокзала, 2</span> 
    `,
  },
  {
    latitude: 55.7489,
    longitude: 37.539,
    hintContent: "CHOCCO!",
    balloonContent: ` 
                      <span>CHOCCO Афимол Сити</span>
                      <br>
                      <span>Пресненская наб., 2</span> 
    `,
  },
];

function init() {
  // Создание карты через конструктор
  const myMap = new ymaps.Map("map", {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    center: [55.75, 37.556],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 13,
    // Элементы интерфейса, оставляем только кнопки зума
    controls: ["zoomControl"],
    // Поведение при событиях скролла, кликов и тд., оставляем следующие
    behaviors: ["dblClickZoom", "drag", "multiTouch"],
  });

  // Ставим метки на карту при помощи метода forEach
  placemarks.forEach((item) => {
    const placemark = new ymaps.Placemark(
      [item.latitude, item.longitude],
      {
        hintContent: item.hintContent,
        balloonContent: item.balloonContent,
      },
      {
        iconLayout: "default#image",
        iconImageHref: "./assets/images/contacts/map-icon.png",
        iconImageSize: [46, 57],
        // cмещаем иконку, чтобы нижний указатель был на нужном адресе
        iconImageOffset: [-23, -57],
      }
    );

    myMap.geoObjects.add(placemark);
  });
}

// OneScrollPage
//
// Все секции страницы и секция, которую показываем
const sections = $(".section");
const displaySection = $(".content");
// Изначально запрещаем скролл, таким образом реализуем выполнение скролла
// на событие колеса мыши "wheel" только один раз
let isScroll = false;

// Смена активного класса для точек dots
function switchActiveDots(activeIndex) {
  $(".dots__item")
    .eq(activeIndex)
    .addClass("active")
    .siblings()
    .removeClass("active");
}

// Движение секции
function performTransition(sectionEq) {
  // Проверяем разрещен скролл или нет, если да (в момент скролла) - выходим
  if (isScroll) return;
  // Если не сколлим в данный момент, то разрешаем скролл
  isScroll = true;
  const position = `${sectionEq * -100}%`;

  // Добавляем класс section--active отображаемой секции
  // у братье проверяем у кого класс и удаляем его
  sections
    .eq(sectionEq)
    .addClass("section--active")
    .siblings()
    .removeClass("section--active");

  // Сдвигаем на нужное значаение по вертикали
  displaySection.css({
    transform: `translateY(${position})`,
  });

  // delay: 1300 = 1000(transition property) + 300(инерция браузеров)
  const transitionDuration = parseInt($(".content").css("transition-duration")); // 1s
  const browsersScrollInertia = 0.3; // 0.3s
  const delay = transitionDuration + browsersScrollInertia; // 1.3s

  // По задержке запрещаем скролл. Таким образом исключаем
  // инерцию на тачпадах и гиперпрокрутку на движение колеса
  setTimeout(() => {
    isScroll = false;
    switchActiveDots(sectionEq);
  }, delay * 1000);
}

function scrollToSection(direction) {
  const activeSection = sections.filter(".section--active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  // проверяем направление и существует ли вообще секция
  // в jQuery можно сделать это, проверив длину объекта через length
  if (direction === "next" && nextSection.length) {
    performTransition(nextSection.index());
    console.log(nextSection.index());
  } else if (direction === "prev" && prevSection.length) {
    performTransition(prevSection.index());
  }
}

$(".wrapper").on("wheel", (e) => {
  const deltaY = e.originalEvent.deltaY;

  if (deltaY > 0) {
    scrollToSection("next");
  }

  if (deltaY < 0) {
    scrollToSection("prev");
  }
});

// Скролл при помощи кнопок на клавиатуре
$(document).on("keydown", (e) => {
  switch (e.keyCode) {
    // клавиша вниз
    case 40:
      scrollToSection("next");
      break;
    // клавиша вверх
    case 38:
      scrollToSection("prev");
      break;
  }
});

// Скролл при помощи кликов по элементам меню и кнопкам dots
$("[data-scroll-ndx]").on("click", (e) => {
  e.preventDefault();

  // Удаляем классы, если открыт элемент fullscreen-menu
  burgerBtn.classList.remove("burger-menu--active");
  fullscreenMenu.classList.remove("fullscreen-menu--active");

  // Записываем численное значение индекса
  const targetIndex = $(e.currentTarget).attr("data-scroll-ndx");

  performTransition(targetIndex);
});
