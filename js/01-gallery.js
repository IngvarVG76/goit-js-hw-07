//! Завдання 1 - галерея зображень
// Створи галерею з можливістю кліку по її елементах і перегляду повнорозмірного зображення у модальному вікні. Подивися демо відео роботи галереї.

// Виконуй це завдання у файлах 01-gallery.html і 01-gallery.js. Розбий його на декілька підзавдань:

// Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.
// Реалізація делегування на ul.gallery і отримання url великого зображення.
// Підключення скрипту і стилів бібліотеки модального вікна basicLightbox. Використовуй CDN сервіс jsdelivr і додай у проект посилання на мініфіковані (.min) файли бібліотеки.
// Відкриття модального вікна по кліку на елементі галереї. Для цього ознайомся з документацією і прикладами.
// Заміна значення атрибута src елемента <img> в модальному вікні перед відкриттям. Використовуй готову розмітку модального вікна із зображенням з прикладів бібліотеки basicLightbox.
// Розмітка елемента галереї
// Посилання на оригінальне зображення повинно зберігатися в data-атрибуті source на елементі <img>, і вказуватися в href посилання. Не додавай інші HTML теги або CSS класи, крім тих, що містяться в цьому шаблоні.

{
  /* <li class="gallery__item">
  <a class="gallery__link" href="large-image.jpg">
    <img
      class="gallery__image"
      src="small-image.jpg"
      data-source="large-image.jpg"
      alt="Image description"
    />
  </a>
</li> */
}

// Зверни увагу на те, що зображення обгорнуте посиланням, отже по кліку за замовчуванням користувач буде перенаправлений на іншу сторінку. Заборони цю поведінку за замовчуванням.

// Закриття з клавіатури
// УВАГА
// Наступний функціонал не обов'язковий для здавання завдання, але буде хорошою додатковою практикою.

// Додай закриття модального вікна після натискання клавіші Escape. Зроби так, щоб прослуховування клавіатури було тільки доти, доки відкрите модальне вікно. Бібліотека basicLightbox містить метод для програмного закриття модального вікна.

import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

//* Solution

// 1. Get galery element
const galleryEl = document.querySelector(".gallery");
// console.log(galleryEl); // Check

// 2. Create valid html code for image gallery mapping source array
const imageItemsEl = galleryItems
  .map(({ preview, original, description }) => {
    return `<li class="gallery__item">
     <a class="gallery__link" href="${original}">
     <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
  })
  .join("");

// console.log(imageItemsEl); // Check

// 3. Insert html code in to ul
galleryEl.insertAdjacentHTML("beforeend", imageItemsEl);

// 4.
// import * as basicLightbox from "../node_modules/basiclightbox";

let lightbox;

galleryEl.addEventListener("click", (event) => {
  event.preventDefault();

  console.log(event);

  if (event.target.tagName !== "IMG") {
    return;
  }

  const originalImgSrc = event.target.parentNode.href;
  lightbox = basicLightbox.create(`<img src="${originalImgSrc}">`);

    window.addEventListener("keydown", CloseModalEl );
    console.log("event listener added to window");

    lightbox.show();
});



function CloseModalEl(event) {
    if (event.key === "Escape") {
        window.removeEventListener("keydown", CloseModalEl );
        console.log("event listener remooved from window on ESCAPE");
        lightbox.close();
    }
}

lightbox.onClose(() => {
  window.removeEventListener("keydown", CloseModalEl);
  lightbox.close();
  console.log("event listener remooved from window on Click");
});
