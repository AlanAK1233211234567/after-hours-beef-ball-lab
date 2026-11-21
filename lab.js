(function () {
  "use strict";
  const { t, txt, b, icon, fact, esc } = AH;
  const rows = [
    [
      "vitamin",
      "before",
      "Vitamin C",
      "维生素 C",
      "Low",
      "较低",
      "Tart when added as ascorbic acid.",
      "以抗坏血酸添加时带酸味。",
      "Insufficient evidence",
      "证据不足",
      "Evidence does not establish vitamin C as a way to prevent intoxication.",
      "现有证据不足以证明维生素 C 能预防醉酒。",
      "Explore an acidulated sauce in a sensory trial.",
      "在感官试验中探索微酸酱汁配方。",
      "Measure acidity and taste before deciding on inclusion.",
      "加入前测量酸度并进行味觉测试。",
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
      "花香、甜味，质地黏稠。",
      "Insufficient evidence",
      "证据不足",
      "A honey–soy glaze is a flavour proposal. A hangover benefit is unestablished.",
      "蜜糖酱油是风味构想，其解酒功效缺乏充分证据。",
      "Blend with soy for a glossy skewer glaze.",
      "与酱油调成串烧挂汁。",
      "Test dilution, sweetness and the glaze after reheating.",
      "测试稀释比例、甜度及翻热后的挂汁效果。",
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
      "温和奶甜味，口感顺滑。",
      "Supported evidence",
      "已有依据",
      "Hong Kong allergen guidance identifies milk and milk products as allergens.",
      "香港致敏物指引将奶类及奶制品列为致敏物。",
      "Develop a mild milk-based dipping sauce.",
      "探索温和奶香蘸酱。",
      "Plan dairy allergen controls, chilled transport and service.",
      "规划奶类过敏原管理、冷链运输和供应。",
      "allergens",
    ],
    [
      "cheese",
      "before",
      "Cheese",
      "芝士",
      "High",
      "较高",
      "Salty, rich and creamy when warm.",
      "咸香浓郁，加热后口感柔滑。",
      "Supported evidence",
      "已有依据",
      "Cheese is a milk product and needs dairy allergen consideration.",
      "芝士属于奶制品，需考虑奶类致敏风险。",
      "Form a soft centre in a springy beef shell.",
      "制成芝士内馅，配弹牙牛丸外层。",
      "Check melting, leakage and portion consistency.",
      "检查融化程度、渗漏及每份馅料的一致性。",
      "allergens",
    ],
    [
      "meat",
      "before",
      "Beef",
      "牛肉",
      "High",
      "较高",
      "Savoury beef flavour and a springy bite.",
      "鲜香肉味，口感弹牙。",
      "Insufficient evidence",
      "证据不足",
      "The base is selected for texture. Its effect on hangovers is unproven.",
      "以口感为选择依据，其缓解宿醉的作用尚未证实。",
      "Use the traditional beef ball as the foundation.",
      "用传统牛丸作为创新配方的基础。",
      "Validate cooking, chilled handling and reheating.",
      "验证烹调、冷藏处理及翻热流程。",
      "alcohol",
    ],
    [
      "tomato",
      "after",
      "Tomato",
      "番茄",
      "High",
      "较高",
      "Tangy, sweet and naturally savoury.",
      "酸甜带鲜，果香明亮。",
      "Insufficient evidence",
      "证据不足",
      "Tomato is explored for acidity and flavour. A hangover effect has not been demonstrated here.",
      "研究重点是酸度和风味，本项目没有证据证明番茄可解酒。",
      "Cook into a textured sauce or a soup base.",
      "制作带果肉的酱汁或汤底。",
      "Assess acidity, thickness and packaging compatibility.",
      "测试酸度、浓稠度与包装的适配性。",
      "alcohol",
    ],
    [
      "yogurt",
      "after",
      "Yogurt",
      "酸奶",
      "Moderate",
      "中等",
      "Cool, creamy and gently tart.",
      "清爽柔滑，略带酸香。",
      "Supported evidence",
      "已有依据",
      "Dairy yogurt falls under milk allergen considerations.",
      "乳制酸奶需纳入奶类致敏物管理。",
      "Serve separately as a chilled dipping sauce.",
      "单独以冷藏蘸酱形式供应。",
      "Plan a cold chain and allergen labelling for the dip.",
      "规划蘸酱的冷链与过敏原标示。",
      "allergens",
    ],
    [
      "banana",
      "after",
      "Banana",
      "香蕉",
      "Low",
      "较低",
      "Soft, sweet and distinctly fruity.",
      "质地软糯，果甜味突出。",
      "Insufficient evidence",
      "证据不足",
      "Acceptance of a banana and beef pairing has yet to be tested.",
      "香蕉与牛肉搭配的接受度有待实际试食验证。",
      "Trial a small fruit element in a tasting batch.",
      "在小批试作品中尝试少量水果风味。",
      "Test browning, texture and consumer preference.",
      "测试褐变、口感及消费者喜好。",
      "alcohol",
    ],
    [
      "ginger",
      "after",
      "Ginger",
      "生姜",
      "High",
      "较高",
      "Fragrant, peppery warmth.",
      "芳香辛暖，带轻微辣感。",
      "Traditional belief",
      "传统认知",
      "Ginger broth is traditionally enjoyed for warmth. That association does not establish a hangover treatment.",
      "姜汤传统上作为暖食享用，该习惯不能证明治疗宿醉的功效。",
      "Infuse clear broth, then pair with beef balls and daikon.",
      "以清汤萃取姜香，配牛丸及白萝卜。",
      "Balance steeping time, aroma and pepperiness.",
      "平衡浸煮时间、香气及辛辣程度。",
      "alcohol",
    ],
    [
      "grapefruit",
      "after",
      "Grapefruit",
      "西柚",
      "Use caution",
      "谨慎",
      "Citrus acidity and a bitter finish.",
      "柑橘酸香，尾韵微苦。",
      "Supported evidence",
      "已有依据",
      "The FDA identifies interactions between grapefruit and certain medicines.",
      "美国 FDA 指出西柚可能与部分药物相互作用。",
      "Assess citrus aroma as a research question only.",
      "仅作为柑橘风味的研究方向。",
      "Avoid prioritising grapefruit as a main ingredient.",
      "不建议将西柚作为主要研发食材。",
      "grapefruit",
    ],
  ];
  const mixFields = [
    [
      "base",
      b("Beef ball base", "牛丸基底"),
      [
        ["classic", b("Classic springy beef", "传统弹牙牛肉")],
        ["coarse", b("Coarse-ground beef", "粗绞牛肉")],
      ],
    ],
    [
      "filling",
      b("Filling", "内馅"),
      [
        ["none", b("No filling", "无内馅")],
        ["cheese", b("Cheese centre", "芝士内馅")],
      ],
    ],
    [
      "sauce",
      b("Sauce", "酱汁"),
      [
        ["none", b("No sauce", "无酱汁")],
        ["honey", b("Honey–soy glaze", "蜜糖酱油")],
        ["tomato", b("Tomato sauce", "番茄酱汁")],
        ["yogurt", b("Yogurt dip", "酸奶蘸酱")],
      ],
    ],
    [
      "broth",
      b("Broth", "汤底"),
      [
        ["none", b("No broth", "无汤底")],
        ["clear", b("Clear broth", "清汤")],
        ["ginger", b("Ginger broth", "姜香汤底")],
      ],
    ],
    [
      "extra",
      b("Additional ingredients", "配料"),
      [
        ["none", b("No extra ingredient", "不加配料")],
        ["daikon", b("Daikon", "白萝卜")],
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
    return `<div class="ingredient-detail fade-in">${fact(t("Flavour characteristics", "风味特点"), at(r, 6))}${fact(t("Application feasibility", "应用可行性"), at(r, 4))}${fact(t("Scientific evidence", "科学依据"), `<strong>${at(r, 8)}</strong> · ${at(r, 10)} <a class="inline-link" href="${AH.sources[r[16]]}" target="_blank" rel="noopener">${t("Source", "资料来源")}</a>`)}${fact(t("Product application", "产品应用"), at(r, 12))}${fact(t("Development considerations", "研发注意事项"), at(r, 14))}</div>`;
  }
  const groupButtons = () =>
    ["before", "after"]
      .map(
        (g) =>
          `<button class="pill" data-group="${g}" aria-pressed="${g === group}">${g === "before" ? t("Before Party Ingredients", "聚会前食材") : t("After Party Ingredients", "聚会后食材")}</button>`,
      )
      .join("");
  function suggestions() {
    const flavour = [
      {
        none: t("The beef flavour leads.", "牛肉原味为主。"),
        honey: t(
          "Honey and soy add a sweet–savoury finish.",
          "蜂蜜与酱油带来甜咸尾韵。",
        ),
        tomato: t(
          "Tomato adds brightness and a tangy finish.",
          "番茄带来明亮酸香。",
        ),
        yogurt: t(
          "A chilled yogurt dip adds a tart contrast.",
          "冷藏酸奶蘸酱增添清爽酸香。",
        ),
      }[mix.sauce],
    ];
    if (mix.broth === "ginger")
      flavour.push(t("Ginger brings peppery warmth.", "生姜增添辛暖风味。"));
    if (mix.filling === "cheese")
      flavour.push(
        t("A salty dairy centre enriches each bite.", "芝士内馅增添咸香奶味。"),
      );
    if (mix.extra !== "none")
      flavour.push(
        {
          banana: t(
            "Fruit sweetness needs a tasting trial.",
            "水果甜味的接受度需要试食验证。",
          ),
          daikon: t("Daikon contributes gentle sweetness.", "白萝卜增添清甜。"),
          scallion: t(
            "Scallion gives a fresh aromatic finish.",
            "葱花增添清新香气。",
          ),
        }[mix.extra],
      );
    const texture = [
      mix.base === "classic"
        ? t("Keep the traditional springy bite.", "保留传统弹牙口感。")
        : t("Test binding in the coarser grind.", "测试粗绞牛肉的成形性。"),
      mix.filling === "cheese"
        ? t(
            "Check the seal around the melting filling.",
            "检查流心内馅的封口。",
          )
        : t(
            "Check even firmness through the centre.",
            "检查中心与外层硬度是否均匀。",
          ),
    ];
    if (mix.broth !== "none" && mix.sauce !== "none")
      texture.push(
        t(
          "Serve the sauce separately to avoid dilution.",
          "酱汁另放，避免被汤底稀释。",
        ),
      );
    const safety = [
      t(
        "Validate beef cooking, cold-chain handling and reheating.",
        "验证牛肉烹煮、冷链处理及翻热程序。",
      ),
    ];
    if (mix.filling === "cheese" || mix.sauce === "yogurt")
      safety.push(
        t(
          "Declare milk allergens and control dairy storage.",
          "标示奶类过敏原并控制奶制品贮存条件。",
        ),
      );
    if (mix.sauce === "honey")
      safety.push(
        t(
          "Check soy and wheat on the soy sauce label.",
          "核对酱油标签上的大豆及小麦成分。",
        ),
      );
    const format =
      mix.broth !== "none"
        ? t("Lidded hot broth cup with a spoon.", "有盖暖汤杯，配匙羹。")
        : mix.sauce === "honey"
          ? t(
              "Glazed sharing skewers in a paper tray.",
              "纸托盛载的蜜汁分享串烧。",
            )
          : mix.sauce === "yogurt"
            ? t(
                "Snack cup with a separate chilled dip.",
                "牛丸小食杯，另附冷藏蘸酱。",
              )
            : t(
                "Four-bite takeaway cup with a pick.",
                "四粒便携小食杯，配小竹签。",
              );
    return (
      fact(t("Flavour compatibility", "风味搭配"), flavour.join(" ")) +
      fact(t("Texture considerations", "口感考虑"), texture.join(" ")) +
      fact(t("Food safety considerations", "食品安全考虑"), safety.join(" ")) +
      fact(t("Recommended format", "建议产品形式"), format)
    );
  }
  const summary = (m) =>
    mixFields
      .map(([key, , opts]) => txt(opts.find((o) => o[0] === m[key])[1]))
      .join(" · ");
  function savedList() {
    return saved.length
      ? `<h4 class="mt">${t("Saved concepts", "已保存的配方")}</h4>${saved.map((c) => `<div class="saved-line"><span><b>${esc(c.name || t("My concept", "我的配方"))}</b><br><small>${summary(c.mix)}</small></span><button class="btn" data-load="${esc(c.id)}">${t("Load", "载入")}</button></div>`).join("")}`
      : "";
  }
  function mixer() {
    return `<p class="subcopy">${t("Build a five-part recipe. These rule-based ideas guide tasting trials. Food safety and shelf life still require testing.", "组合五项配方元素。以下为预设规则生成的概念建议，食品安全及货架期仍需实际测试。")}</p><div class="two-col"><div><div class="fields">${mixFields
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
      )}<label class="field">${t("Concept name (optional)", "配方名称（选填）")}<input id="mix-name" maxlength="70" value="${esc(name)}"></label></div><button class="btn primary mt" id="save-concept">${icon("save", 16)} ${t("Save My Concept", "保存我的配方")}</button><p class="fine mt">${t("Saved in this browser.", "配方保存在当前浏览器。")}</p></div><div class="results" id="mix-output" aria-live="polite">${suggestions()}</div></div><div id="saved-list">${savedList()}</div>`;
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
        "已载入配方，可更换食材。",
      ),
    );
  };
  AH.labPage = () =>
    `<section class="section alt lab" id="lab"><div class="wrap"><div class="kicker">${t("Ingredient Research", "食材研究")}</div><div class="section-head"><h2>${t("Inside the<br>Ingredient Lab", "走进食材实验室")}</h2><p>${t("Exploring ingredients, flavours and product possibilities. Open an ingredient to see its evidence, application and development risks.", "探索食材、风味与产品的可能性。点开食材，了解科学依据、产品应用及研发风险。")}</p></div><div class="segments toolbar" id="ingredient-groups">${groupButtons()}</div><div id="ingredient-cards">${cards()}</div><details class="mt fine"><summary>${t("How to read the evidence", "如何理解证据等级")}</summary><p class="mt">${t("Traditional belief records culinary or cultural use. Preliminary research means early findings that still need confirmation. Supported evidence refers to the specific documented fact on the card. Insufficient evidence means the proposed effect or pairing has yet to be established. Feasibility is a project judgement about food development.", "传统认知记录饮食习惯。初步研究指仍需验证的早期发现。已有依据针对卡片中的具体事实。证据不足指相关功效或搭配尚未得到证实。可行性是本企划对食品研发的初步判断。")}</p></details>${AH.toolbox("mixer", "tune", t("Ingredient Mixer", "食材搭配实验室"), mixer())}</div></section>`;
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
          ? t("Concept saved in this browser.", "配方已保存在当前浏览器。")
          : t(
              "Saved for this visit. Browser storage is unavailable.",
              "浏览器存储不可用，配方暂存于本次访问。",
            ),
      );
    }
    if (el.dataset.load) {
      const c = saved.find((c) => c.id === el.dataset.load);
      if (c) {
        mix = { ...c.mix };
        name = c.name;
        document.querySelector("#mixer .tool-content").innerHTML = mixer();
        AH.toast(t("Concept loaded.", "配方已载入。"));
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
