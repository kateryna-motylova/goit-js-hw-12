import{a as h,S as y,i}from"./assets/vendor-D1AWmRWP.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const L="55659608-4110099c5f8e8424f77250296",v="https://pixabay.com/api/";function b(s,e=1){return h.get(v,{params:{key:L,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:9}}).then(o=>o.data)}const u=document.querySelector(".gallery"),f=document.querySelector(".loader"),w=new y(".gallery a",{captionsData:"alt",captionDelay:250});function S(s){const e=s.map(o=>`
    <li class="gallery-item">
      <a href="${o.largeImageURL}">
        <img src="${o.webformatURL}" alt="${o.tags}" />
      </a>

      <div class="info">
        <ul class="info-list">
          <li>
            <span class="label">Likes</span>
            <span class="value">${o.likes}</span>
          </li>
          <li>
            <span class="label">Views</span>
            <span class="value">${o.views}</span>
          </li>
          <li>
            <span class="label">Comments</span>
            <span class="value">${o.comments}</span>
          </li>
          <li>
            <span class="label">Downloads</span>
            <span class="value">${o.downloads}</span>
          </li>
        </ul>
      </div>
    </li>
  `).join("");u.insertAdjacentHTML("beforeend",e),w.refresh()}function P(){u.innerHTML=""}function d(){f.classList.add("visible")}function q(){f.classList.remove("visible")}const E=document.querySelector(".form"),l=document.querySelector(".load-more");let n=1,p="",m=0;const R=9;E.addEventListener("submit",$);l.addEventListener("click",M);function $(s){s.preventDefault();const e=s.target.elements["search-text"].value.trim();if(!e){i.warning({message:"Please fill in the search field!",position:"topRight"});return}n=1,p=e,P(),l.classList.remove("visible"),d(),g(e,n,!0),s.target.reset()}function M(){n+=1,d(),g(p,n,!1)}function g(s,e,o){b(s,e).then(a=>{if(!a.hits.length){i.error({message:"Sorry, no images found. Try again!",position:"topRight"});return}S(a.hits),m=a.totalHits,O(),o||x()}).catch(()=>{i.error({message:"Something went wrong"})}).finally(()=>q())}function O(){n*R>=m?(l.classList.remove("visible"),i.info({message:"End of search results"})):l.classList.add("visible")}function x(){const s=document.querySelector(".gallery-item");if(!s)return;const{height:e}=s.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
