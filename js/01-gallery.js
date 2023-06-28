import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const galleryList = document.querySelector(".gallery");

const renderGallery = galleryItems
  .map(
    ({ original, preview, description }) => `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
  )
  .join("");

galleryList.insertAdjacentHTML("beforeend", renderGallery);

let instance = null;

const onImgClick = (event) => {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  const galleryData = event.target.dataset;
  instance = basicLightbox.create(`
    <div class="modal">
    <img src="${galleryData.source}" width="800" height="600">
    </div>
  `);
  instance.show();
};

galleryList.addEventListener("click", onImgClick);

const onModalClose = () => {
  if (instance) {
    instance.close();
  }
};

const onEscClick = (event) => {
  if (event.code === "Escape") {
    onModalClose();
  }
};

document.addEventListener("keydown", onEscClick);
