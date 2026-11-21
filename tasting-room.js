(function () {
  "use strict";
  const { products, txt, t, icon, b } = AH;
  const room = document.getElementById("tasting-room");
  const notes = {
    cheese: {
      title: b("Pull apart", "拉開芝士"),
      description: b(
        "A springy beef shell holds the molten cheese. The seal is the part to test during reheating.",
        "彈牙牛丸包住流心芝士，翻熱試驗要觀察封口能否留住內餡。",
      ),
      x: 50,
      y: 46,
    },
    honey: {
      title: b("Follow the glaze", "看看掛汁"),
      description: b(
        "Honey and soy should coat the skewer in a thin layer. Adjusting their ratio changes both sweetness and cling.",
        "蜜糖醬油要薄薄掛在串上；兩者的比例同時影響甜度和掛汁效果。",
      ),
      x: 54,
      y: 54,
    },
    ginger: {
      title: b("Look into the broth", "看清湯底"),
      description: b(
        "Daikon brings gentle sweetness to a clear ginger broth. A tasting trial can compare different ginger strengths.",
        "白蘿蔔的清甜襯托姜香，可通過試食比較姜味濃淡。",
      ),
      x: 39,
      y: 67,
    },
    tomato: {
      title: b("Explore the sauce", "看看番茄果肉"),
      description: b(
        "Chunks of tomato give the sauce texture. The next trial is finding an acidity that complements the beef.",
        "保留番茄果肉讓醬汁更有層次；下一步試驗要找到能襯托牛味的酸度。",
      ),
      x: 51,
      y: 58,
    },
  };
  let index = 0,
    gesture = null,
    lastWheel = 0,
    wheelSum = 0;
  const product = () => products[index];
  function renderScene() {
    const p = product(),
      n = notes[p.id];
    room.querySelector(".scene-body").innerHTML =
      `<div class="scene-image" data-scene="${p.id}"><img src="assets/${p.id}.webp" alt="${txt(p.name)}" draggable="false"><button type="button" class="spot" aria-expanded="false" aria-controls="scene-note" style="left:${n.x}%;top:${n.y}%"><span aria-hidden="true">+</span> ${txt(n.title)}</button><p id="scene-note" class="scene-note" hidden>${txt(n.description)}</p><small class="scene-credit">${AH.note()}</small></div><div class="scene-copy"><span class="scene-series">${AH.series(p.series)} ${t("Collection", "系列")}</span><h3>${txt(p.name)}</h3><p>${txt(p.flavour)}</p><button type="button" class="btn primary" id="remix-scene">${icon("lab", 18)}${t("Remix this recipe", "用這款口味調配方")}</button></div>`;
    const selected = room.querySelector(`[data-choice="${index}"]`);
    room
      .querySelectorAll("[data-choice]")
      .forEach((el) =>
        el.setAttribute("aria-pressed", String(el === selected)),
      );
    room.querySelector(".scene-status").textContent =
      `${index + 1} / ${products.length} · ${txt(p.name)}`;
  }
  function move(by) {
    const focusedStory = room
      .querySelector(".scene-body")
      ?.contains(document.activeElement);
    index = (index + by + products.length) % products.length;
    renderScene();
    if (focusedStory)
      room
        .querySelector(`[data-choice="${index}"]`)
        .focus({ preventScroll: true });
  }
  AH.startTasting = (id) => {
    index = Math.max(
      0,
      products.findIndex((p) => p.id === id),
    );
    gesture = null;
    wheelSum = 0;
    lastWheel = 0;
    room.innerHTML = `<div class="room-top"><h2 id="room-title">${t("After Hours tasting room", "AFTER HOURS 互動品鑑室")}</h2><button class="round room-close" aria-label="${t("Close tasting room", "關閉品鑑室")}" autofocus>${icon("close", 18)}</button></div><div class="scene-body"></div><div class="room-foot"><div class="room-instructions"><span>${t("Swipe the photo or choose a flavour", "滑動照片，或點選口味")}</span><span class="scene-status" role="status"></span></div><div class="room-choices"><button class="round" data-shift="-1" aria-label="${t("Previous flavour", "上一款口味")}">${icon("prev", 18)}</button>${products.map((p, i) => `<button data-choice="${i}" aria-label="${txt(p.name)}" class="scene-choice"><img src="assets/${p.id}.webp" alt=""><span>${txt(p.short)}</span></button>`).join("")}<button class="round" data-shift="1" aria-label="${t("Next flavour", "下一款口味")}">${icon("next", 18)}</button></div></div>`;
    renderScene();
    room.showModal();
    room.scrollTop = 0;
  };
  room.addEventListener("click", (e) => {
    const el = e.target.closest("button");
    if (!el) return;
    if (el.matches(".room-close")) {
      room.close();
      return;
    }
    if (el.dataset.shift) {
      move(+el.dataset.shift);
      return;
    }
    if (el.dataset.choice !== undefined) {
      if (index !== +el.dataset.choice) {
        index = +el.dataset.choice;
        renderScene();
      }
      return;
    }
    if (el.matches(".spot")) {
      const note = room.querySelector("#scene-note");
      note.hidden = !note.hidden;
      el.setAttribute("aria-expanded", String(!note.hidden));
      el.firstElementChild.textContent = note.hidden ? "+" : "−";
      return;
    }
    if (el.id === "remix-scene") {
      room.close();
      AH.remixProduct(product().id);
    }
  });
  room.addEventListener("keydown", (e) => {
    if (e.altKey || e.metaKey || e.ctrlKey) return;
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      move(e.key === "ArrowRight" ? 1 : -1);
    }
  });
  room.addEventListener("pointerdown", (e) => {
    if (
      !e.isPrimary ||
      e.button !== 0 ||
      !e.target.closest(".scene-image") ||
      e.target.closest("button")
    )
      return;
    gesture = { x: e.clientX, y: e.clientY, id: e.pointerId };
    room.setPointerCapture?.(e.pointerId);
  });
  room.addEventListener("pointerup", (e) => {
    if (!gesture || e.pointerId !== gesture.id) return;
    const dx = e.clientX - gesture.x,
      dy = e.clientY - gesture.y;
    gesture = null;
    if (Math.abs(dx) > 38 && Math.abs(dx) > Math.abs(dy) * 1.25)
      move(dx < 0 ? 1 : -1);
  });
  room.addEventListener("pointercancel", () => (gesture = null));
  room.addEventListener(
    "wheel",
    (e) => {
      if (
        e.ctrlKey ||
        !e.target.closest(".scene-image") ||
        room.scrollHeight > room.clientHeight + 4
      )
        return;
      const now = performance.now();
      if (now - lastWheel > 180) wheelSum = 0;
      lastWheel = now;
      e.preventDefault();
      if (wheelSum === Infinity) return;
      wheelSum +=
        (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) *
        (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 240 : 1);
      if (Math.abs(wheelSum) >= 40) {
        move(wheelSum > 0 ? 1 : -1);
        wheelSum = Infinity;
      }
    },
    { passive: false },
  );
})();
