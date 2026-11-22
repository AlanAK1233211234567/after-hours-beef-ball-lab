(function () {
  "use strict";
  const { t, txt, icon, esc, products } = AH;
  const site = document.getElementById("site"),
    dialog = document.getElementById("detail");
  const sections = ["overview", "products", "lab", "business"];
  const links = () => [
    t("Overview", "總覽"),
    t("Products", "產品"),
    t("Ingredient Lab", "食材實驗室"),
    t("Bar Collaboration", "酒吧合作"),
  ];
  const gallery = [
    {
      id: "hero",
      name: AH.b("The After Hours Cup", "AFTER HOURS 牛丸杯"),
      alt: AH.b(
        "Glazed beef balls hang above a steaming AFTER HOURS cup, with amber sauce droplets and a red Hong Kong neon sign.",
        "紅色香港霓虹招牌下，三粒牛丸懸在冒着熱氣的 AFTER HOURS 紙杯上方，琥珀色醬汁從丸身滴落。",
      ),
    },
    ...products,
  ];
  let frame = 0,
    filter = "all",
    active = "overview",
    compared = new Set(["cheese", "honey"]),
    observer = null,
    toastTimeout;
  AH.toast = (text) => {
    const toast = document.querySelector("#toast");
    toast.textContent = text;
    toast.classList.add("show");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove("show"), 2700);
  };
  const brand = () =>
    `<a class="brand" href="#overview" aria-label="AFTER HOURS ${t("home", "首頁")}"><img class="brandmark" src="assets/mark.svg" alt=""><span class="brandname">AFTER HOURS<small>INNOVATIVE BEEF BALLS</small></span></a>`;
  function header() {
    return `<a class="skip" href="#overview">${t("Skip to content", "跳到主內容")}</a><header class="top"><nav class="project-switch" aria-label="${t("Switch project","切換企劃")}"><span class="switch-symbol" aria-hidden="true">⇄</span><a href="#overview" aria-current="page">${t("After Hours","醒酒牛丸")}</a><a href="retail.html?lang=${AH.lang}">${t("Retail Collection","肉丸產品改善")}</a></nav><div class="wrap top-inner">${brand()}<nav class="mainnav" id="mainnav" aria-label="${t("Main navigation", "主導航")}">${sections.map((id, i) => `<a class="${id === active ? "active" : ""}" ${id === active ? 'aria-current="location"' : ""} href="#${id}">${links()[i]}</a>`).join("")}</nav><div class="language" aria-label="${t("Language", "語言")}">${icon("globe", 16)}<button data-lang="en" aria-label="English" aria-pressed="${AH.lang === "en"}">EN</button><span aria-hidden="true">/</span><button data-lang="zh" aria-label="中文" aria-pressed="${AH.lang === "zh"}">中文</button></div><button class="hamb" id="mobile-menu" aria-controls="mainnav" aria-expanded="false" aria-label="${t("Toggle navigation", "展開導航")}">${icon("menu")}</button></div></header>`;
  }
  const heroImage = () =>
    `<img src="assets/${gallery[frame].id}.webp" fetchpriority="high" alt="${txt(gallery[frame].alt || gallery[frame].name)}">`;
  function hero() {
    return `<section class="hero" id="overview" aria-label="${t("Project overview", "項目總覽")}"><figure class="hero-media"><button id="hero-media" class="hero-room-photo" data-room="gallery" aria-haspopup="dialog" aria-label="${t("Explore this image in the tasting room", "進入品鑑室探索這張概念圖")}">${heroImage()}</button></figure><div class="wrap hero-inner"><div class="hero-copy"><div class="eyebrow"><i class="signal" aria-hidden="true"></i>${t("Hong Kong Food Innovation", "香港食品創新企劃")}</div><h1>AFTER HOURS.<span>BETTER BITES.</span></h1><h2>${t("A New Generation of Hong Kong Beef Balls.", "新一代香港牛丸。")}</h2><p class="hero-sub" lang="zh-HK">${t("當傳統牛丸遇上香港夜生活，為經典食品創造新的可能。", "當傳統牛丸遇上香港夜生活，我們希望為經典食品創造新的可能性。")}</p><div class="buttons"><a class="btn primary" href="#products">${icon("skewer", 17)}${t("Explore Our Products", "探索創新產品")}</a><a class="btn" href="#lab">${icon("lab", 16)}${t("Discover the Ingredients", "走進食材實驗室")}</a></div><a class="model-link" href="#business">${t("Our Business Model", "瞭解商業模式")}</a></div></div><button type="button" class="gallery-caption room-entry" data-room="gallery" aria-haspopup="dialog"><span class="play-symbol" aria-hidden="true">▶</span>${t("Enter tasting room", "進入互動品鑑室")}</button><div class="gallery-info"><div class="gallery-credit"><strong id="visual-name">${txt(gallery[frame].name)}</strong><span class="imgnote">${AH.note()}</span></div><div class="gallery-ui" aria-label="${t("Concept gallery", "概念圖集")}"><span class="gallery-count" id="frame-count" aria-live="polite">0${frame + 1} / 05</span><button class="round" data-frame="-1" aria-label="${t("Previous concept visual", "上一張概念圖")}">${icon("prev", 14)}</button><button class="round" data-frame="1" aria-label="${t("Next concept visual", "下一張概念圖")}">${icon("next", 14)}</button></div></div></section>`;
  }
  const projectLinks = [
    [
      "products",
      "skewer",
      AH.b("Product Innovation", "產品創新"),
      AH.b(
        "Creating new flavours from traditional beef balls.",
        "從傳統牛丸出發，探索全新口味。",
      ),
    ],
    [
      "lab",
      "lab",
      AH.b("Ingredient Research", "食材研究"),
      AH.b(
        "Exploring ingredients and their potential in every bite.",
        "研究食材特性，探索每一口的可能性。",
      ),
    ],
    [
      "business",
      "bar",
      AH.b("Bar Collaboration", "酒吧合作"),
      AH.b(
        "Connecting Hong Kong street food with nightlife culture.",
        "連接香港街頭小食與夜生活文化。",
      ),
    ],
  ];
  function directory() {
    return `<section class="directory"><div class="wrap"><div class="rule-head">${icon("grid", 14)}<h2 class="micro">${t("Explore the project", "探索企劃")}</h2></div><div class="project-grid">${projectLinks.map(([id, pic, n, sub]) => `<a class="project-tile" href="#${id}"><span class="project-icon">${icon(pic, 32)}</span><span class="tile-sign">${icon("plus", 16)}</span><div class="tile-body"><h3>${txt(n).toUpperCase()}</h3><p>${txt(sub)}</p></div></a>`).join("")}</div></div></section>`;
  }
  const filterButtons = () =>
    ["all", "before", "after"]
      .map(
        (k) =>
          `<button class="pill" data-filter="${k}" aria-pressed="${filter === k}">${k === "all" ? t("All concepts", "全部概念") : AH.series(k)}</button>`,
      )
      .join("");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let motionEnabled = !reducedMotion.matches;
  let motionObserver;
  const inView = new Set();
  const captions = {
    cheese: ["A molten centre.", "一口拉絲。"],
    honey: ["A ribbon of honey.", "蜜汁緩緩掛上。"],
    ginger: ["A ripple of warmth.", "一圈漣漪，一口暖湯。"],
    tomato: ["A swirl of tomato.", "捲起一層番茄酸香。"],
  };
  function productCards() {
    return products
      .filter((p) => filter === "all" || p.series === filter)
      .map(
        (p) => `
      <article class="product-card food-stage food-${p.id}">
        <div class="food-copy">
          <span class="food-series">${AH.series(p.series)} ${t("Collection", "系列")}</span>
          <h3>${t(...captions[p.id])}</h3>
          <h4>${txt(p.name)}</h4>
          <p>${txt(p.flavour)}</p>
          <button class="btn" data-product="${p.id}">${t("Explore this concept", "探索這款牛丸")}</button>
        </div>
        <figure class="food-film">
          <video muted loop playsinline preload="none" poster="assets/${p.id}.webp" data-film="assets/${p.id}-motion.mp4" aria-label="${txt(p.name)}"></video>
          <figcaption>${AH.note()}</figcaption>
        </figure>
      </article>`,
      )
      .join("");
  }
  function syncFilms() {
    const control = document.getElementById("catalogue-motion");
    if (control) {
      control.textContent = motionEnabled
        ? t("Pause motion", "暫停動態")
        : t("Play motion", "播放動態");
      control.setAttribute("aria-pressed", String(motionEnabled));
    }
    for (const film of document.querySelectorAll("[data-film]")) {
      if (motionEnabled && !document.hidden && inView.has(film)) {
        if (!film.getAttribute("src")) film.src = film.dataset.film;
        film.muted = true;
        film.play()?.catch(() => {});
      } else if (!film.paused) film.pause();
    }
  }
  function observeFilms() {
    motionObserver?.disconnect();
    inView.clear();
    const films = document.querySelectorAll("[data-film]");
    if ("IntersectionObserver" in window) {
      motionObserver = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) inView.add(e.target);
            else inView.delete(e.target);
          }
          syncFilms();
        },
        { threshold: 0.12 },
      );
      films.forEach((f) => motionObserver.observe(f));
    } else films.forEach((f) => inView.add(f));
    syncFilms();
  }
  reducedMotion.addEventListener("change", (e) => {
    motionEnabled = !e.matches;
    syncFilms();
  });
  document.addEventListener("visibilitychange", syncFilms);
  function catalogue() {
    return `<section id="products" class="section catalogue"><div class="wrap">
      <div class="catalogue-intro"><div class="kicker">${t("Product innovation", "產品創新")}</div><h2>${t("Reinventing the classic beef ball", "重新構想經典牛丸")}</h2>
      <p>${t("Four ways to reimagine a Hong Kong favourite, from a molten cheese centre to a fragrant ginger broth.", "從拉絲芝士內餡到清香薑湯，以四種風味重新演繹港式牛丸。")}</p></div>
      <div class="toolbar"><div class="filters" id="product-filters">${filterButtons()}</div><div class="actions"><button id="catalogue-motion" class="btn" type="button"></button><button class="btn" data-open="compare">${icon("compare", 16)}${t("Compare products", "比較產品")}</button></div></div>
      <div class="food-stages" id="product-grid">${productCards()}</div><p class="fine section-note">${t("Before Party explores shareable snacks for gatherings. After Party explores warm, refreshing late-night food. These collection names describe eating occasions. Neither collection prevents intoxication or treats a hangover.", "聚會前系列注重豐富口味與分享，聚會後系列注重温暖、清爽及方便食用。兩個系列僅代表消費場景，產品不能預防醉酒或治療宿醉。")}</p></div></section>`;
  }
  function footer() {
    return `<footer class="foot"><div class="wrap"><details id="scientific" open><summary>${t("Important Scientific Disclaimer", "重要科學與食品安全聲明")}</summary><p class="fine">${t("This project explores innovative beef ball products inspired by social and nightlife consumption occasions. The products are not intended to prevent intoxication, accelerate alcohol metabolism, or treat hangovers.", "本項目旨在研究適合社交及夜間消費場景的創新牛丸食品。產品不用於預防醉酒、加速酒精代謝或治療宿醉。")}</p><p class="fine">${t("Recipes are in preliminary development. Formal food safety and shelf-life testing is pending. Account for milk and other allergens. Before sale, review Hong Kong food rules, verify ingredient evidence and avoid unsupported health claims.", "配方仍處於初步研究階段，產品尚未經過正式食品安全及貨架期測試。須考慮奶類等過敏原。銷售前需核對香港食品法規、驗證食材資料，並避免未經證實的醫療及功能性宣傳。")}</p><div class="source-links fine"><a target="_blank" rel="noopener" href="${AH.sources.alcohol}">${t("NIAAA · Hangovers", "NIAAA · 宿醉資料")}</a><a target="_blank" rel="noopener" href="${AH.sources.regulations}">${t("Hong Kong CFS · Food legislation", "香港食安中心 · 食品法規")}</a><a target="_blank" rel="noopener" href="${AH.sources.allergens}">${t("Hong Kong CFS · Allergens", "香港食安中心 · 致敏物")}</a><a target="_blank" rel="noopener" href="${AH.sources.grapefruit}">${t("FDA · Grapefruit interactions", "FDA · 西柚與藥物")}</a></div></details><div class="foot-bottom">${brand()}<p>${t("Independent student concept inspired by Tai Po Chun Hing. Unofficial portfolio. All products are under development and have not launched.", "醒酒牛丸創新企劃是以大埔振興牛丸為背景的學生獨立創作。本網站為非官方作品集，所有產品均處於概念研發階段，尚未上市。")}</p></div></div></footer>`;
  }
  const dlgHead = (title, kicker) =>
    `<div class="modal-head"><div><div class="kicker">${kicker}</div><h2 id="dialog-title">${title}</h2></div><button class="round" id="dialog-close" aria-label="${t("Close dialog", "關閉彈窗")}">${icon("close", 17)}</button></div>`;
  function comparison() {
    const chosen = products.filter((p) => compared.has(p.id));
    if (chosen.length < 2)
      return `<p class="fine">${t("Select at least two products to compare.", "請至少選擇兩款產品進行比較。")}</p>`;
    const keys = ["flavour", "ingredients", "occasion", "format", "challenge"];
    return `<div class="table-wrap"><table><thead><tr><th>${t("Compare by", "比較項目")}</th>${chosen.map((p) => `<th scope="col">${txt(p.short)}</th>`).join("")}</tr></thead><tbody>${keys.map((k) => `<tr><th scope="row">${txt(AH.fields[k])}</th>${chosen.map((p) => `<td>${txt(p[k])}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  }
  function showModal(id) {
    const p = products.find((x) => x.id === id),
      isCompare = id === "compare";
    let body = "";
    if (isCompare) {
      body =
        dlgHead(
          t("Product comparison", "產品比較"),
          t("Product innovation", "產品創新"),
        ) +
        `<div class="checks">${products.map((p) => `<label><input type="checkbox" data-compare="${p.id}" ${compared.has(p.id) ? "checked" : ""}>${txt(p.short)}</label>`).join("")}</div><div id="comparison" aria-live="polite">${comparison()}</div>`;
    } else if (p) {
      body =
        dlgHead(
          txt(p.name),
          AH.series(p.series) + " " + t("Collection", "系列"),
        ) +
        `<figure><img class="product-photo" src="assets/${p.id}.webp" alt="${txt(p.name)}"><figcaption class="imgnote">${AH.note()}</figcaption></figure><div class="facts">${Object.keys(
          AH.fields,
        )
          .map((k) => AH.fact(txt(AH.fields[k]), txt(p[k])))
          .join(
            "",
          )}</div><button class="btn mt" data-open="compare">${icon("compare", 16)}${t("Compare products", "比較產品")}</button>`;
    }
    document.getElementById("dialog-content").innerHTML =
      `<div class="modal">${body}</div>`;
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
  }
  function setActive(id) {
    active = id;
    document.querySelectorAll(".mainnav a").forEach((a) => {
      const match = a.hash === "#" + id;
      a.classList.toggle("active", match);
      if (match) a.setAttribute("aria-current", "location");
      else a.removeAttribute("aria-current");
    });
  }
  function pageScroll() {
    let id = "overview";
    for (const k of sections.slice(1)) {
      const box = document.getElementById(k)?.getBoundingClientRect();
      if (box && box.top <= 145) id = k;
    }
    setActive(id);
  }
  function render() {
    const open = [...site.querySelectorAll("details[open][id]")].map(
      (d) => d.id,
    );
    const position = sections
      .map((id) => [
        id,
        document.getElementById(id)?.getBoundingClientRect().top,
      ])
      .filter(([, y]) => y != null && y < window.innerHeight * 0.45)
      .pop();
    document.documentElement.lang = AH.lang === "zh" ? "zh-HK" : "en";
    document.title =
      AH.lang === "zh"
        ? "AFTER HOURS 醒酒牛丸創新企劃"
        : "AFTER HOURS — Innovative Beef Balls";
    site.innerHTML =
      header() +
      `<main>${hero() + directory() + catalogue() + AH.labPage() + AH.businessPage()}</main>` +
      footer();
    observeFilms();
    open.forEach((id) => {
      const d = document.getElementById(id);
      if (d) d.open = true;
    });
    if (observer) observer.disconnect();
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.remove("pre");
              observer.unobserve(e.target);
            }
          }),
        { threshold: 0.08 },
      );
      document.querySelectorAll(".section-head,.toolbox").forEach((x) => {
        x.classList.add("reveal");
        if (x.getBoundingClientRect().top > window.innerHeight) {
          x.classList.add("pre");
          observer.observe(x);
        }
      });
    }
    if (position) {
      const delta =
        document.getElementById(position[0]).getBoundingClientRect().top -
        position[1];
      if (Math.abs(delta) > 1)
        window.scrollBy({ top: delta, behavior: "instant" });
    }
    pageScroll();
  }
  document.addEventListener("click", (ev) => {
    const el = ev.target.closest("button,a");
    if (!el) return;
    if (el.dataset.lang) {
      if (AH.lang !== el.dataset.lang) {
        AH.lang = el.dataset.lang;
        AH.save("language", AH.lang);
        render();
        document
          .querySelector(`[data-lang="${AH.lang}"]`)
          .focus({ preventScroll: true });
      }
      return;
    }
    if (el.id === "mobile-menu") {
      const nav = document.querySelector(".mainnav");
      el.setAttribute("aria-expanded", nav.classList.toggle("open"));
      return;
    }
    if (el.matches('a[href^="#"]')) {
      document.querySelector(".mainnav")?.classList.remove("open");
      document
        .getElementById("mobile-menu")
        ?.setAttribute("aria-expanded", "false");
      return;
    }
    if (el.dataset.room) {
      AH.startTasting(gallery[frame].id);
      return;
    }
    if (el.dataset.frame) {
      frame =
        (frame + Number(el.dataset.frame) + gallery.length) % gallery.length;
      document.getElementById("hero-media").innerHTML = heroImage();
      document.getElementById("visual-name").textContent = txt(
        gallery[frame].name,
      );
      document.getElementById("frame-count").textContent = `0${frame + 1} / 05`;
      return;
    }
    if (el.id === "catalogue-motion") {
      motionEnabled = !motionEnabled;
      syncFilms();
      return;
    }
    if (el.dataset.filter) {
      filter = el.dataset.filter;
      document.getElementById("product-filters").innerHTML = filterButtons();
      document.getElementById("product-grid").innerHTML = productCards();
      observeFilms();
      document
        .querySelector(`[data-filter="${filter}"]`)
        .focus({ preventScroll: true });
      return;
    }
    if (el.dataset.product || el.dataset.open) {
      showModal(el.dataset.product || el.dataset.open);
      return;
    }
    if (el.id === "dialog-close") {
      dialog.close();
      return;
    }
    AH.labClick(el);
    AH.businessClick(el);
  });
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      const r = dialog.getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      )
        dialog.close();
    }
  });

  document.addEventListener("change", (e) => {
    const el = e.target;
    if (el.dataset.compare) {
      if (el.checked) compared.add(el.dataset.compare);
      else compared.delete(el.dataset.compare);
      document.getElementById("comparison").innerHTML = comparison();
      return;
    }
    if (el.tagName === "SELECT") {
      AH.labInput(el);
      AH.businessInput(el);
    }
  });
  document.addEventListener("input", (e) => {
    const el = e.target;
    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
      AH.labInput(el);
      AH.businessInput(el);
    }
  });
  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          pageScroll();
          ticking = false;
        });
      }
    },
    { passive: true },
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.querySelector(".mainnav.open")) {
      document.querySelector(".mainnav").classList.remove("open");
      document
        .getElementById("mobile-menu")
        .setAttribute("aria-expanded", "false");
      document.getElementById("mobile-menu").focus();
    }
  });
  render();
  if (location.hash) {
    const target = document.getElementById(
      decodeURIComponent(location.hash.slice(1)),
    );
    if (target)
      requestAnimationFrame(() =>
        target.scrollIntoView({ behavior: "instant" }),
      );
  }
})();
