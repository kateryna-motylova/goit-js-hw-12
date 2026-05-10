import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images.map(img => `
    <li class="gallery-item">
      <a href="${img.largeImageURL}">
        <img src="${img.webformatURL}" alt="${img.tags}" />
      </a>

      <div class="info">
        <ul class="info-list">
          <li>
            <span class="label">Likes</span>
            <span class="value">${img.likes}</span>
          </li>
          <li>
            <span class="label">Views</span>
            <span class="value">${img.views}</span>
          </li>
          <li>
            <span class="label">Comments</span>
            <span class="value">${img.comments}</span>
          </li>
          <li>
            <span class="label">Downloads</span>
            <span class="value">${img.downloads}</span>
          </li>
        </ul>
      </div>
    </li>
  `).join("");

  gallery.insertAdjacentHTML("beforeend", markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = "";
}

export function showLoader() {
  loader.classList.add("visible");
}

export function hideLoader() {
  loader.classList.remove("visible");
}