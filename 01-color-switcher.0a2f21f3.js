const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),d=document.querySelector("body");let r=null;t.addEventListener("click",(function(){r=setInterval((()=>{const r=`#${Math.floor(16777215*Math.random()).toString(16)}`;d.style.backgroundColor=r,t.setAttribute("disabled","disabled"),e.removeAttribute("disabled")}),1e3)})),e.addEventListener("click",(function(){clearInterval(r),t.removeAttribute("disabled"),e.setAttribute("disabled","disabled")}));
//# sourceMappingURL=01-color-switcher.0a2f21f3.js.map