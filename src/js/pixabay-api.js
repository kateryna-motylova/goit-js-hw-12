import axios from "axios";

const API_KEY = "55659608-4110099c5f8e8424f77250296";
const BASE_URL = "https://pixabay.com/api/";

export function getImagesByQuery(query, page = 1) {
  return axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
      page: page,
      per_page: 9,
    },
  })
  .then(response => response.data);
}