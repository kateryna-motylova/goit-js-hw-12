import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api.js";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from "./js/render-functions.js";

const form = document.querySelector(".form");
const loadMoreBtn = document.querySelector(".load-more");

let currentQuery = "";
let currentPage = 1;
let totalHits = 0;

let isEndMessageShown = false;
let isNoImagesMessageShown = false;
let lastQuery = "";
let isLoading = false;

const PER_PAGE = 15;

form.addEventListener("submit", onSearch);
loadMoreBtn.addEventListener("click", onLoadMore);

async function onSearch(event) {
  event.preventDefault();

  if (isLoading) return;
  isLoading = true;

  const query = event.target.elements["search-text"].value.trim();

  if (!query) {
    iziToast.warning({
      message: "Please enter search text",
      position: "topRight",
    });
    isLoading = false;
    return;
  }

  currentQuery = query;
  currentPage = 1;
  totalHits = 0;

  if (query !== lastQuery) {
    isEndMessageShown = false;
    isNoImagesMessageShown = false;
  }

  lastQuery = query;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, currentPage);

    if (!data.hits || data.hits.length === 0) {
      if (!isNoImagesMessageShown) {
        iziToast.error({
          message: "No images found",
          position: "topRight",
        });
        isNoImagesMessageShown = true;
      }

      hideLoadMoreButton();
      hideLoader();
      return;
    }

    totalHits = data.totalHits;

    createGallery(data.hits);

    checkLoadMoreVisibility();

    event.target.reset();

  } catch (error) {
    iziToast.error({
      message: "Something went wrong",
    });
  } finally {
    hideLoader();
    isLoading = false;
  }
}

async function onLoadMore() {
  if (isLoading) return;
  isLoading = true;

  if (currentPage * PER_PAGE >= totalHits) {
    hideLoadMoreButton();
    isLoading = false;
    return;
  }

  currentPage += 1;

  hideLoadMoreButton();

  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    if (data.hits && data.hits.length > 0) {
      createGallery(data.hits);
    }

    checkLoadMoreVisibility();
    smoothScroll();

  } catch (error) {
    iziToast.error({
      message: "Load more failed",
    });
  } finally {
    hideLoader();
    isLoading = false;
  }
}

function checkLoadMoreVisibility() {
  const loadedImages = currentPage * PER_PAGE;

  if (loadedImages >= totalHits) {
    hideLoadMoreButton();

    if (!isEndMessageShown) {
      iziToast.info({
        message:
          "We're sorry, but you've reached the end of search results.",
      });
      isEndMessageShown = true;
    }
  } else {
    showLoadMoreButton();
  }
}

function smoothScroll() {
  const cards = document.querySelectorAll(".gallery-item");
  const card = cards[cards.length - 1];

  if (!card) return;

  const height = card.getBoundingClientRect().height;

  window.scrollBy({
    top: height * 2,
    behavior: "smooth",
  });
}

