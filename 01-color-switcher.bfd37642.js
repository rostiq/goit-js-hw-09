const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");let d=null;t.addEventListener("click",(function(){t.setAttribute("disabled","disabled"),d=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),e.addEventListener("click",(function(){t.removeAttribute("disabled"),clearInterval(d)}));
//# sourceMappingURL=01-color-switcher.bfd37642.js.map
