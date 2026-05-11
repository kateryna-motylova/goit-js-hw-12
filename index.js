import{a as E,S as q,i}from"./assets/vendor-Do60_h77.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))h(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&h(u)}).observe(document,{childList:!0,subtree:!0});function e(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function h(o){if(o.ep)return;o.ep=!0;const r=e(o);fetch(o.href,r)}})();const $="55659608-4110099c5f8e8424f77250296",B="https://pixabay.com/api/",R=15;async function g(t,s){return(await E.get(B,{params:{key:$,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:R}})).data}const y=document.querySelector(".gallery"),L=document.querySelector(".loader"),b=document.querySelector(".load-more"),A=new q(".gallery a",{captionsData:"alt",captionDelay:250});function v(t){const s=t.map(e=>`
    <li class="gallery-item">
      <a href="${e.largeImageURL}">
        <img src="${e.webformatURL}" alt="${e.tags}" />
      </a>

      <div class="info">
        <ul class="info-list">
          <li>
            <span class="label">Likes</span>
            <span class="value">${e.likes}</span>
          </li>
          <li>
            <span class="label">Views</span>
            <span class="value">${e.views}</span>
          </li>
          <li>
            <span class="label">Comments</span>
            <span class="value">${e.comments}</span>
          </li>
          <li>
            <span class="label">Downloads</span>
            <span class="value">${e.downloads}</span>
          </li>
        </ul>
      </div>
    </li>
  `).join("");y.insertAdjacentHTML("beforeend",s),A.refresh()}function I(){y.innerHTML=""}function w(){L.classList.add("visible")}function p(){L.classList.remove("visible")}function x(){b.classList.add("visible")}function l(){b.classList.remove("visible")}const O=document.querySelector(".form"),_=document.querySelector(".load-more");let S="",n=1,c=0,m=!1,f=!1,d="",a=!1;const M=15;O.addEventListener("submit",N);_.addEventListener("click",D);async function N(t){if(t.preventDefault(),a)return;a=!0;const s=t.target.elements["search-text"].value.trim();if(!s){i.warning({message:"Please enter search text",position:"topRight"}),a=!1;return}if(s===d){a=!1;return}S=s,n=1,c=0,s!==d&&(m=!1,f=!1),d=s,I(),l(),w();try{const e=await g(s,n);if(!e.hits||e.hits.length===0){f||(i.error({message:"No images found",position:"topRight"}),f=!0),l(),p();return}c=e.totalHits,v(e.hits),P(),t.target.reset()}catch{i.error({message:"Something went wrong"})}finally{p(),a=!1}}async function D(){if(!a){if(a=!0,n*M>=c){l(),a=!1;return}n+=1,w();try{const t=await g(S,n);t.hits&&t.hits.length>0&&v(t.hits),P(),G()}catch{i.error({message:"Load more failed"})}finally{p(),a=!1}}}function P(){n*M>=c?(l(),m||(i.info({message:"We're sorry, but you've reached the end of search results."}),m=!0)):x()}function G(){const t=document.querySelectorAll(".gallery-item"),s=t[t.length-1];if(!s)return;const e=s.getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
