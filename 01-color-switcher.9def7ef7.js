!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),a=null;function d(){var t="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0));document.body.style.backgroundColor=t}e.disabled=!0,t.addEventListener("click",(function(){t.disabled=!0,e.disabled=!1,a=setInterval(d,1e3)})),e.addEventListener("click",(function(){t.disabled=!1,e.disabled=!0,clearInterval(a)}))}();
//# sourceMappingURL=01-color-switcher.9def7ef7.js.map
