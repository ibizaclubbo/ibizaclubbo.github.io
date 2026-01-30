
// Tiny UI helpers for this static demo
const $ = (q,root=document)=>root.querySelector(q);
const $$ = (q,root=document)=>Array.from(root.querySelectorAll(q));

function setActiveNav(){
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  $$(".navlinks a").forEach(a=>{
    const href=(a.getAttribute("href")||"").toLowerCase();
    a.classList.toggle("active", href===path || (path==="" && href==="index.html"));
  });
  $$(".mobilePanel a").forEach(a=>{
    const href=(a.getAttribute("href")||"").toLowerCase();
    a.classList.toggle("active", href===path || (path==="" && href==="index.html"));
  });
}

function wireAccordion(){
  $$(".accHead").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const item = btn.closest(".accItem");
      const body = $(".accBody", item);
      const isOpen = item.classList.contains("open");
      // close all
      $$(".accItem.open").forEach(i=>{
        i.classList.remove("open");
        const b = $(".accBody", i);
        b.style.maxHeight = "0px";
        $(".plus span", i).textContent = "+";
      });
      if(!isOpen){
        item.classList.add("open");
        body.style.maxHeight = body.scrollHeight + "px";
        $(".plus span", item).textContent = "–";
      }
    });
  });
}

function wireMenu(){
  const openBtn = $("#menuBtn");
  const overlay = $("#mobileMenu");
  const closeBtn = $("#menuCloseBtn");

  function close(){ overlay?.classList.remove("open"); openBtn?.classList.remove("active"); }
  function open(){ overlay?.classList.add("open"); openBtn?.classList.add("active"); }

  openBtn?.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);
  overlay?.addEventListener("click", (e)=>{ if(e.target===overlay) close(); });
  document.addEventListener("keydown", (e)=>{ if(e.key==="Escape") close(); });
}

setActiveNav();
wireAccordion();
wireMenu();
