(function () {
  "use strict";
  const { t, txt, b, icon, fact, esc } = AH;
  const rows = [
    [
      "vitamin",
      "before",
      "Vitamin C",
      "維生素 C",
      "Low",
      "較低",
      "Tart when added as ascorbic acid.",
      "以抗壞血酸添加時帶酸味。",
      "Insufficient evidence",
      "證據不足",
      "Evidence does not establish vitamin C as a way to prevent intoxication.",
      "現有證據不足以證明維生素 C 能預防醉酒。",
      "Explore an acidulated sauce in a sensory trial.",
      "在感官試驗中探索微酸醬汁配方。",
      "Measure acidity and taste before deciding on inclusion.",
      "加入前測量酸度並進行味覺測試。",
      "alcohol",
    ],
    [
      "honey",
      "before",
      "Honey",
      "蜂蜜",
      "Moderate",
      "中等",
      "Floral sweetness and a sticky finish.",
      "花香、甜味，質地黏稠。",
      "Insufficient evidence",
      "證據不足",
      "A honey–soy glaze is a flavour proposal. A hangover benefit is unestablished.",
      "蜜糖醬油是風味構想，其解酒功效缺乏充分證據。",
      "Blend with soy for a glossy skewer glaze.",
      "與醬油調成串燒掛汁。",
      "Test dilution, sweetness and the glaze after reheating.",
      "測試稀釋比例、甜度及翻熱後的掛汁效果。",
      "alcohol",
    ],
    [
      "milk",
      "before",
      "Milk",
      "牛奶",
      "Moderate",
      "中等",
      "Soft dairy sweetness and a creamy finish.",
      "温和奶甜味，口感順滑。",
      "Supported evidence",
      "已有依據",
      "Hong Kong allergen guidance identifies milk and milk products as allergens.",
      "香港致敏物指引將奶類及奶製品列為致敏物。",
      "Develop a mild milk-based dipping sauce.",
      "探索温和奶香蘸醬。",
      "Plan dairy allergen controls, chilled transport and service.",
      "規劃奶類過敏原管理、冷鏈運輸和供應。",
      "allergens",
    ],
    [
      "cheese",
      "before",
      "Cheese",
      "芝士",
      "High",
      "較高",
      "Salty, rich and creamy when warm.",
      "鹹香濃郁，加熱後口感柔滑。",
      "Supported evidence",
      "已有依據",
      "Cheese is a milk product and needs dairy allergen consideration.",
      "芝士屬於奶製品，需考慮奶類致敏風險。",
      "Form a soft centre in a springy beef shell.",
      "製成芝士內餡，配彈牙牛丸外層。",
      "Check melting, leakage and portion consistency.",
      "檢查融化程度、滲漏及每份餡料的一致性。",
      "allergens",
    ],
    [
      "meat",
      "before",
      "Beef",
      "牛肉",
      "High",
      "較高",
      "Savoury beef flavour and a springy bite.",
      "鮮香肉味，口感彈牙。",
      "Insufficient evidence",
      "證據不足",
      "The base is selected for texture. Its effect on hangovers is unproven.",
      "以口感為選擇依據，其緩解宿醉的作用尚未證實。",
      "Use the traditional beef ball as the foundation.",
      "用傳統牛丸作為創新配方的基礎。",
      "Validate cooking, chilled handling and reheating.",
      "驗證烹調、冷藏處理及翻熱流程。",
      "alcohol",
    ],
    [
      "tomato",
      "after",
      "Tomato",
      "番茄",
      "High",
      "較高",
      "Tangy, sweet and naturally savoury.",
      "酸甜帶鮮，果香明亮。",
      "Insufficient evidence",
      "證據不足",
      "Tomato is explored for acidity and flavour. A hangover effect has not been demonstrated here.",
      "研究重點是酸度和風味，本項目沒有證據證明番茄可解酒。",
      "Cook into a textured sauce or a soup base.",
      "製作帶果肉的醬汁或湯底。",
      "Assess acidity, thickness and packaging compatibility.",
      "測試酸度、濃稠度與包裝的適配性。",
      "alcohol",
    ],
    [
      "yogurt",
      "after",
      "Yogurt",
      "乳酪",
      "Moderate",
      "中等",
      "Cool, creamy and gently tart.",
      "清爽柔滑，略帶酸香。",
      "Supported evidence",
      "已有依據",
      "Dairy yogurt falls under milk allergen considerations.",
      "乳制乳酪需納入奶類致敏物管理。",
      "Serve separately as a chilled dipping sauce.",
      "單獨以冷藏蘸醬形式供應。",
      "Plan a cold chain and allergen labelling for the dip.",
      "規劃蘸醬的冷鏈與過敏原標示。",
      "allergens",
    ],
    [
      "banana",
      "after",
      "Banana",
      "香蕉",
      "Low",
      "較低",
      "Soft, sweet and distinctly fruity.",
      "質地軟糯，果甜味突出。",
      "Insufficient evidence",
      "證據不足",
      "Acceptance of a banana and beef pairing has yet to be tested.",
      "香蕉與牛肉搭配的接受度有待實際試食驗證。",
      "Trial a small fruit element in a tasting batch.",
      "在小批試作品中嘗試少量水果風味。",
      "Test browning, texture and consumer preference.",
      "測試褐變、口感及消費者喜好。",
      "alcohol",
    ],
    [
      "ginger",
      "after",
      "Ginger",
      "生薑",
      "High",
      "較高",
      "Fragrant, peppery warmth.",
      "芳香辛暖，帶輕微辣感。",
      "Traditional belief",
      "傳統認知",
      "Ginger broth is traditionally enjoyed for warmth. That association does not establish a hangover treatment.",
      "薑湯傳統上作為暖食享用，該習慣不能證明治療宿醉的功效。",
      "Infuse clear broth, then pair with beef balls and daikon.",
      "以清湯萃取姜香，配牛丸及白蘿蔔。",
      "Balance steeping time, aroma and pepperiness.",
      "平衡浸煮時間、香氣及辛辣程度。",
      "alcohol",
    ],
    [
      "grapefruit",
      "after",
      "Grapefruit",
      "西柚",
      "Use caution",
      "謹慎",
      "Citrus acidity and a bitter finish.",
      "柑橘酸香，尾韻微苦。",
      "Supported evidence",
      "已有依據",
      "The FDA identifies interactions between grapefruit and certain medicines.",
      "美國 FDA 指出西柚可能與部分藥物相互作用。",
      "Assess citrus aroma as a research question only.",
      "僅作為柑橘風味的研究方向。",
      "Avoid prioritising grapefruit as a main ingredient.",
      "不建議將西柚作為主要研發食材。",
      "grapefruit",
    ],
  ];
  const mixFields = [
    [
      "base",
      b("Beef ball base", "牛丸基底"),
      [
        ["classic", b("Classic springy beef", "傳統彈牙牛肉")],
        ["coarse", b("Coarse-ground beef", "粗絞牛肉")],
      ],
    ],
    [
      "filling",
      b("Filling", "內餡"),
      [
        ["none", b("No filling", "無內餡")],
        ["cheese", b("Cheese centre", "芝士內餡")],
      ],
    ],
    [
      "sauce",
      b("Sauce", "醬汁"),
      [
        ["none", b("No sauce", "無醬汁")],
        ["honey", b("Honey–soy glaze", "蜜糖醬油")],
        ["tomato", b("Tomato sauce", "番茄醬汁")],
        ["yogurt", b("Yogurt dip", "乳酪蘸醬")],
      ],
    ],
    [
      "broth",
      b("Broth", "湯底"),
      [
        ["none", b("No broth", "無湯底")],
        ["clear", b("Clear broth", "清湯")],
        ["ginger", b("Ginger broth", "姜香湯底")],
      ],
    ],
    [
      "extra",
      b("Additional ingredients", "配料"),
      [
        ["none", b("No extra ingredient", "不加配料")],
        ["daikon", b("Daikon", "白蘿蔔")],
        ["scallion", b("Scallion", "葱花")],
        ["banana", b("Banana", "香蕉")],
      ],
    ],
  ];
  let group = "before",
    selected = null;
  let mix = {
    base: "classic",
    filling: "cheese",
    sauce: "none",
    broth: "none",
    extra: "none",
  };
  const validMix = (m) =>
    m && mixFields.every(([id, , opts]) => opts.some(([v]) => v === m[id]));
  let saved = AH.read("recipes", []);
  saved = Array.isArray(saved)
    ? saved.filter(
        (c) =>
          validMix(c.mix) &&
          typeof c.name === "string" &&
          typeof c.id === "string",
      )
    : [];
  let name = "";
  const at = (row, i) => t(row[i], row[i + 1]);
  function cards() {
    return `<div class="ingredient-grid fade-in">${rows
      .filter((r) => r[1] === group)
      .map(
        (r) =>
          `<button class="ing-card" data-ingredient="${r[0]}" aria-expanded="${selected === r[0]}" aria-controls="ingredient-info"><img loading="lazy" src="assets/ingredients/${r[0]}.webp" alt="${at(r, 2)}"><span class="ing-name">${at(r, 2)} ${icon("plus", 16)}</span></button>`,
      )
      .join("")}</div><div id="ingredient-info">${details()}</div>`;
  }
  function details() {
    const r = rows.find((x) => x[0] === selected);
    if (!r) return "";
    return `<div class="ingredient-detail fade-in">${fact(t("Flavour characteristics", "風味特點"), at(r, 6))}${fact(t("Application feasibility", "應用可行性"), at(r, 4))}${fact(t("Scientific evidence", "科學依據"), `<strong>${at(r, 8)}</strong> · ${at(r, 10)} <a class="inline-link" href="${AH.sources[r[16]]}" target="_blank" rel="noopener">${t("Source", "資料來源")}</a>`)}${fact(t("Product application", "產品應用"), at(r, 12))}${fact(t("Development considerations", "研發注意事項"), at(r, 14))}</div>`;
  }
  const groupButtons = () =>
    ["before", "after"]
      .map(
        (g) =>
          `<button class="pill" data-group="${g}" aria-pressed="${g === group}">${g === "before" ? t("Before Party Ingredients", "聚會前食材") : t("After Party Ingredients", "聚會後食材")}</button>`,
      )
      .join("");
  function suggestions() {
    const flavour = [
      {
        none: t("The beef flavour leads.", "牛肉原味為主。"),
        honey: t(
          "Honey and soy add a sweet–savoury finish.",
          "蜂蜜與醬油帶來甜鹹尾韻。",
        ),
        tomato: t(
          "Tomato adds brightness and a tangy finish.",
          "番茄帶來明亮酸香。",
        ),
        yogurt: t(
          "A chilled yogurt dip adds a tart contrast.",
          "冷藏乳酪蘸醬增添清爽酸香。",
        ),
      }[mix.sauce],
    ];
    if (mix.broth === "ginger")
      flavour.push(t("Ginger brings peppery warmth.", "生薑增添辛暖風味。"));
    if (mix.filling === "cheese")
      flavour.push(
        t("A salty dairy centre enriches each bite.", "芝士內餡增添鹹香奶味。"),
      );
    if (mix.extra !== "none")
      flavour.push(
        {
          banana: t(
            "Fruit sweetness needs a tasting trial.",
            "水果甜味的接受度需要試食驗證。",
          ),
          daikon: t("Daikon contributes gentle sweetness.", "白蘿蔔增添清甜。"),
          scallion: t(
            "Scallion gives a fresh aromatic finish.",
            "葱花增添清新香氣。",
          ),
        }[mix.extra],
      );
    const texture = [
      mix.base === "classic"
        ? t("Keep the traditional springy bite.", "保留傳統彈牙口感。")
        : t("Test binding in the coarser grind.", "測試粗絞牛肉的成形性。"),
      mix.filling === "cheese"
        ? t(
            "Check the seal around the melting filling.",
            "檢查流心內餡的封口。",
          )
        : t(
            "Check even firmness through the centre.",
            "檢查中心與外層硬度是否均勻。",
          ),
    ];
    if (mix.broth !== "none" && mix.sauce !== "none")
      texture.push(
        t(
          "Serve the sauce separately to avoid dilution.",
          "醬汁另放，避免被湯底稀釋。",
        ),
      );
    const safety = [
      t(
        "Validate beef cooking, cold-chain handling and reheating.",
        "驗證牛肉烹煮、冷鏈處理及翻熱程序。",
      ),
    ];
    if (mix.filling === "cheese" || mix.sauce === "yogurt")
      safety.push(
        t(
          "Declare milk allergens and control dairy storage.",
          "標示奶類過敏原並控制奶製品貯存條件。",
        ),
      );
    if (mix.sauce === "honey")
      safety.push(
        t(
          "Check soy and wheat on the soy sauce label.",
          "核對醬油標籤上的大豆及小麥成分。",
        ),
      );
    const format =
      mix.broth !== "none"
        ? t("Lidded hot broth cup with a spoon.", "有蓋暖湯杯，配匙羹。")
        : mix.sauce === "honey"
          ? t(
              "Glazed sharing skewers in a paper tray.",
              "紙託盛載的蜜汁分享串燒。",
            )
          : mix.sauce === "yogurt"
            ? t(
                "Snack cup with a separate chilled dip.",
                "牛丸小食杯，另附冷藏蘸醬。",
              )
            : t(
                "Four-bite takeaway cup with a pick.",
                "四粒便攜小食杯，配小竹籤。",
              );
    return (
      fact(t("Flavour compatibility", "風味搭配"), flavour.join(" ")) +
      fact(t("Texture considerations", "口感考慮"), texture.join(" ")) +
      fact(t("Food safety considerations", "食品安全考慮"), safety.join(" ")) +
      fact(t("Recommended format", "建議產品形式"), format)
    );
  }
  const summary = (m) =>
    mixFields
      .map(([key, , opts]) => txt(opts.find((o) => o[0] === m[key])[1]))
      .join(" · ");
  function savedList() {
    return saved.length
      ? `<h4 class="mt">${t("Saved concepts", "已保存的配方")}</h4>${saved.map((c) => `<div class="saved-line"><span><b>${esc(c.name || t("My concept", "我的配方"))}</b><br><small>${summary(c.mix)}</small></span><button class="btn" data-load="${esc(c.id)}">${t("Load", "載入")}</button></div>`).join("")}`
      : "";
  }
  function mixer() {
    return `<p class="subcopy">${t("Build a five-part recipe. These rule-based ideas guide tasting trials. Food safety and shelf life still require testing.", "組合五項配方元素。以下為預設規則生成的概念建議，食品安全及貨架期仍需實際測試。")}</p><div class="two-col"><div><div class="fields">${mixFields
      .map(([id, label, opts]) =>
        AH.field(
          txt(label),
          "mix-" + id,
          opts.map(([v, n]) => [v, txt(n)]),
          mix[id],
        ),
      )
      .join(
        "",
      )}<label class="field">${t("Concept name (optional)", "配方名稱（選填）")}<input id="mix-name" maxlength="70" value="${esc(name)}"></label></div><button class="btn primary mt" id="save-concept">${icon("save", 16)} ${t("Save My Concept", "保存我的配方")}</button><p class="fine mt">${t("Saved in this browser.", "配方保存在當前瀏覽器。")}</p></div><div class="results" id="mix-output" aria-live="polite">${suggestions()}</div></div><div id="saved-list">${savedList()}</div>`;
  }
  AH.remixProduct = (id) => {
    const p = AH.products.find((item) => item.id === id);
    if (!p) return;
    mix = {
      base: "classic",
      filling: id === "cheese" ? "cheese" : "none",
      sauce: ["honey", "tomato"].includes(id) ? id : "none",
      broth: id === "ginger" ? "ginger" : "none",
      extra: id === "ginger" ? "daikon" : "none",
    };
    name = txt(p.name);
    group = p.series;
    selected = null;
    document.getElementById("ingredient-groups").innerHTML = groupButtons();
    document.getElementById("ingredient-cards").innerHTML = cards();
    const box = document.getElementById("mixer");
    box.querySelector(".tool-content").innerHTML = mixer();
    box.open = true;
    box.querySelector("summary").focus({ preventScroll: true });
    box.scrollIntoView({ block: "start" });
    AH.toast(
      t(
        "Recipe loaded. Choose an ingredient to change it.",
        "已載入配方，可更換食材。",
      ),
    );
  };
  AH.labPage = () =>
    `<section class="section alt lab" id="lab"><div class="wrap"><div class="kicker">${t("Ingredient Research", "食材研究")}</div><div class="section-head"><h2>${t("Inside the<br>Ingredient Lab", "走進食材實驗室")}</h2><p>${t("Exploring ingredients, flavours and product possibilities. Open an ingredient to see its evidence, application and development risks.", "探索食材、風味與產品的可能性。點開食材，瞭解科學依據、產品應用及研發風險。")}</p></div><div class="segments toolbar" id="ingredient-groups">${groupButtons()}</div><div id="ingredient-cards">${cards()}</div><details class="mt fine"><summary>${t("How to read the evidence", "如何理解證據等級")}</summary><p class="mt">${t("Traditional belief records culinary or cultural use. Preliminary research means early findings that still need confirmation. Supported evidence refers to the specific documented fact on the card. Insufficient evidence means the proposed effect or pairing has yet to be established. Feasibility is a project judgement about food development.", "傳統認知記錄飲食習慣。初步研究指仍需驗證的早期發現。已有依據針對卡片中的具體事實。證據不足指相關功效或搭配尚未得到證實。可行性是本企劃對食品研發的初步判斷。")}</p></details>${AH.toolbox("mixer", "tune", t("Ingredient Mixer", "食材搭配實驗室"), mixer())}</div></section>`;
  AH.labClick = (el) => {
    if (el.dataset.group) {
      group = el.dataset.group;
      selected = null;
      document.querySelector("#ingredient-groups").innerHTML = groupButtons();
      document.querySelector("#ingredient-cards").innerHTML = cards();
      document
        .querySelector(`[data-group="${group}"]`)
        .focus({ preventScroll: true });
      return;
    }
    if (el.dataset.ingredient) {
      selected =
        selected === el.dataset.ingredient ? null : el.dataset.ingredient;
      document
        .querySelectorAll("[data-ingredient]")
        .forEach((b) =>
          b.setAttribute("aria-expanded", b.dataset.ingredient === selected),
        );
      document.querySelector("#ingredient-info").innerHTML = details();
      return;
    }
    if (el.id === "save-concept") {
      const id =
        Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      saved.unshift({ id, name: name.trim(), mix: { ...mix } });
      const ok = AH.save("recipes", saved);
      document.querySelector("#saved-list").innerHTML = savedList();
      AH.toast(
        ok
          ? t("Concept saved in this browser.", "配方已保存在當前瀏覽器。")
          : t(
              "Saved for this visit. Browser storage is unavailable.",
              "瀏覽器存儲不可用，配方暫存於本次訪問。",
            ),
      );
    }
    if (el.dataset.load) {
      const c = saved.find((c) => c.id === el.dataset.load);
      if (c) {
        mix = { ...c.mix };
        name = c.name;
        document.querySelector("#mixer .tool-content").innerHTML = mixer();
        AH.toast(t("Concept loaded.", "配方已載入。"));
      }
    }
  };
  AH.labInput = (el) => {
    if (el.id === "mix-name") {
      name = el.value;
      return;
    }
    const key = el.id.replace("mix-", "");
    if (el.id.startsWith("mix-") && mixFields.some(([k]) => k === key)) {
      mix[key] = el.value;
      document.querySelector("#mix-output").innerHTML = suggestions();
    }
  };
})();
