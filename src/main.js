import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api.js";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader
} from "./js/render-functions.js";

const form = document.querySelector(".form");
const loadMoreBtn = document.querySelector(".load-more");

let currentPage = 1;
let currentQuery = "";
let totalHits = 0;

const PER_PAGE = 9;

form.addEventListener("submit", onSearch);
loadMoreBtn.addEventListener("click", onLoadMore);

function onSearch(event) {
  event.preventDefault();

  const query = event.target.elements["search-text"].value.trim();
  if (!query) {
    iziToast.warning({
      message: "Please fill in the search field!",
      position: "topRight",
    });
    return;
  }

  currentPage = 1;
  currentQuery = query;

  clearGallery();
  loadMoreBtn.classList.remove("visible");
  showLoader();

  fetchImages(query, currentPage, true);

  event.target.reset();
}

function onLoadMore() {
  currentPage += 1;
  showLoader();

  fetchImages(currentQuery, currentPage, false);
}

function fetchImages(query, page, isNewSearch) {
  getImagesByQuery(query, page)
    .then(data => {
      if (!data.hits.length) {
        iziToast.error({
          message: "Sorry, no images found. Try again!",
          position: "topRight",
        });
        return;
      }

      createGallery(data.hits);
      totalHits = data.totalHits;

      toggleLoadMore();

      if (!isNewSearch) scrollPage();
    })
    .catch(() => {
      iziToast.error({ message: "Something went wrong" });
    })
    .finally(() => hideLoader());
}

function toggleLoadMore() {
  const loaded = currentPage * PER_PAGE;

  if (loaded >= totalHits) {
    loadMoreBtn.classList.remove("visible");

    iziToast.info({
      message: "End of search results",
    });
  } else {
    loadMoreBtn.classList.add("visible");
  }
}

function scrollPage() {
  const item = document.querySelector(".gallery-item");
  if (!item) return;

  const { height } = item.getBoundingClientRect();

  window.scrollBy({
    top: height * 2,
    behavior: "smooth",
  });
}