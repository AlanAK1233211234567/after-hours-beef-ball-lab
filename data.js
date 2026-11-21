(function () {
  "use strict";
  const A = (window.AH = {});
  const bilingual = (en, zh) => ({ en, zh });
  A.b = bilingual;
  A.read = (key, fallback) => {
    try {
      const value = localStorage.getItem("after-hours.1." + key);
      return value === null ? fallback : JSON.parse(value);
    } catch {
      return fallback;
    }
  };
  A.save = (key, value) => {
    try {
      localStorage.setItem("after-hours.1." + key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  };
  A.lang = A.read("language", "en") === "zh" ? "zh" : "en";
  A.t = (en, zh) => (A.lang === "zh" ? zh : en);
  A.txt = (value) => value[A.lang];
  A.esc = (s) =>
    String(s).replace(
      /[&<>"']/g,
      (ch) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[ch],
    );
  A.sources = {
    alcohol:
      "https://www.niaaa.nih.gov/publications/brochures-and-fact-sheets/hangovers",
    grapefruit:
      "https://www.fda.gov/consumers/consumer-updates/grapefruit-juice-and-some-drugs-dont-mix",
    allergens: "https://www.cfs.gov.hk/english/food_leg/food_leg_lgfa.html",
    regulations: "https://www.cfs.gov.hk/english/food_leg/food_leg.html",
  };
  const icons = {
    globe:
      '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    prev: '<path d="m15 6-6 6 6 6"/>',
    next: '<path d="m9 6 6 6-6 6"/>',
    lab: '<path d="M9 2h6m-5 0v7L4.3 18.8A2 2 0 0 0 6 22h12a2 2 0 0 0 1.7-3.2L14 9V2M7.3 14.5h9.4"/><circle cx="10" cy="17" r=".65"/><circle cx="14" cy="19" r=".65"/>',
    skewer:
      '<path d="m2 22 3.6-3.7m12.5-12.4L22 2"/><g transform="rotate(42 12 12)"><rect x="8.1" y="1.8" width="7.8" height="6.6" rx="2.6"/><rect x="8.1" y="8.9" width="7.8" height="6.4" rx="2.5"/><rect x="8.1" y="15.8" width="7.8" height="6" rx="2.6"/><path d="M10.5 4.5h1m-.6 7h1m-1.1 6.7h1"/></g>',
    bar: '<path d="m3 6 9 10 9-10H3Zm9 10v5m-5 1h10M6 9h12M15 8l5-6"/><path d="M4.7 6a3.3 3.3 0 1 1 6.6 0"/>',
    book: '<path d="M4 3h14a2 2 0 0 1 2 2v15H6a2 2 0 0 1-2-2V3Zm0 14a2 2 0 0 1 2-2h14M8 7h8M8 10h5"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    compare: '<path d="M3 5h7v14H3zM14 5h7v14h-7z"/>',
    factory: '<path d="M3 21V9l6 3V8l6 3V3h4l2 18H3Zm4-5h1m3 0h1m4 0h1"/>',
    people:
      '<circle cx="9" cy="8" r="3"/><path d="M2 21v-2a7 7 0 0 1 14 0v2m0-16a3 3 0 0 1 0 6m2 3a5 5 0 0 1 4 5v2"/>',
    calc: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M8 6h8M8 11h1m4 0h2m-7 4h1m4 0h2m-7 3h1m4 0h2"/>',
    star: '<path d="m12 3 2.7 5.6 6.2.9-4.5 4.3 1.1 6.2-5.5-2.9-5.5 2.9 1-6.2-4.5-4.3 6.3-.9Z"/>',
    save: '<path d="M5 3h14v18l-7-4-7 4V3Z"/>',
    tune: '<path d="M3 7h8m5 0h5M3 17h3m5 0h10"/><circle cx="13.5" cy="7" r="2.5"/><circle cx="8.5" cy="17" r="2.5"/>',
  };
  A.icon = (id, size = 20) =>
    `<svg class="icon icon-${id}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">${icons[id] || ""}</svg>`;
  A.products = [
    {
      id: "cheese",
      series: "before",
      name: bilingual("Cheese-filled Beef Balls", "爆浆芝士牛丸"),
      short: bilingual("Cheese-filled", "爆浆芝士"),
      flavour: bilingual(
        "Rich, milky and savoury with a molten centre.",
        "奶香浓郁，咸鲜牛丸包裹流心芝士。",
      ),
      ingredients: bilingual(
        "Beef ball base and cheese filling.",
        "传统牛肉丸基底、芝士内馅。",
      ),
      innovation: bilingual(
        "A soft cheese centre inside a springy Hong Kong beef ball.",
        "将流心芝士包进传统弹牙牛丸。",
      ),
      audience: bilingual(
        "Adults sharing a snack with friends.",
        "喜欢与朋友分享小食的成年消费者。",
      ),
      occasion: bilingual(
        "Before Party · bar snacks and social gatherings.",
        "Before Party · 酒吧小食及朋友聚会。",
      ),
      format: bilingual(
        "Four warm bites in a sharing cup.",
        "四粒一杯，可趁热分食。",
      ),
      challenge: bilingual(
        "Test filling leakage, heat response, texture and chilled storage stability.",
        "测试芝士渗漏、加热表现、口感与冷藏稳定性。",
      ),
    },
    {
      id: "honey",
      series: "before",
      name: bilingual("Honey Glazed Beef Balls", "蜜汁牛丸"),
      short: bilingual("Honey glazed", "蜜汁"),
      flavour: bilingual(
        "Floral honey sweetness with a savoury soy finish.",
        "蜂蜜的花香甜味与酱油咸香交织。",
      ),
      ingredients: bilingual(
        "Beef balls, honey and soy sauce.",
        "牛丸、蜂蜜、酱油。",
      ),
      innovation: bilingual(
        "A glossy honey–soy glaze clings to each bite.",
        "蜜糖酱油调成挂汁，包裹每一粒牛丸。",
      ),
      audience: bilingual(
        "Adult diners curious about new sweet–savoury flavours.",
        "愿意尝试甜咸新口味的成年食客。",
      ),
      occasion: bilingual(
        "Before Party · shared bar tables and gatherings.",
        "Before Party · 酒吧拼桌与朋友聚会。",
      ),
      format: bilingual("Skewers or a small takeaway cup.", "串烧或便携小杯。"),
      challenge: bilingual(
        "Tune honey-to-soy ratio, sweetness and glaze viscosity after reheating.",
        "调整蜂蜜与酱油比例、甜度及翻热后的酱汁黏稠度。",
      ),
    },
    {
      id: "ginger",
      series: "after",
      name: bilingual("Ginger Broth Beef Balls", "姜香暖汤牛丸"),
      short: bilingual("Ginger broth", "姜香暖汤"),
      flavour: bilingual(
        "A light savoury broth with a clean ginger warmth.",
        "清鲜汤底带有温和姜香。",
      ),
      ingredients: bilingual(
        "Beef balls, ginger, clear broth and optional daikon.",
        "牛丸、生姜、清汤，可搭配白萝卜。",
      ),
      innovation: bilingual(
        "A late-night soup cup built around the traditional springy bite.",
        "以一杯暖汤衬托牛丸的弹牙口感。",
      ),
      audience: bilingual(
        "Adults looking for a warm late-night snack.",
        "想在深夜享用暖汤小食的成年食客。",
      ),
      occasion: bilingual(
        "After Party · a warm bite at the end of an evening.",
        "After Party · 夜间聚会后的暖心小食。",
      ),
      format: bilingual(
        "A lidded broth cup with a spoon.",
        "配匙羹的有盖汤杯。",
      ),
      challenge: bilingual(
        "Balance ginger strength, broth flavour and beef ball texture after reheating.",
        "平衡姜味强度、汤底风味及翻热后牛丸的弹性。",
      ),
    },
    {
      id: "tomato",
      series: "after",
      name: bilingual("Tomato Beef Balls", "番茄浓香牛丸"),
      short: bilingual("Tomato", "番茄浓香"),
      flavour: bilingual(
        "Bright tomato acidity, gentle sweetness and umami.",
        "番茄酸甜明亮，带有浓郁鲜味。",
      ),
      ingredients: bilingual(
        "Beef balls and a chunky tomato sauce.",
        "牛丸、带果肉的番茄酱汁。",
      ),
      innovation: bilingual(
        "A spoonable tomato coating for a portable late-night snack.",
        "用浓厚番茄酱汁做成方便携带的杯装小食。",
      ),
      audience: bilingual(
        "Adults who enjoy bright flavours on the go.",
        "喜欢酸甜口味和便携小食的成年食客。",
      ),
      occasion: bilingual(
        "After Party · late-night takeaway or bar service.",
        "After Party · 深夜外带或酒吧供应。",
      ),
      format: bilingual(
        "A ready-to-serve cup with a pick.",
        "即食杯装，配小竹签。",
      ),
      challenge: bilingual(
        "Test acidity, sauce adhesion, packaging and chilled storage stability.",
        "测试酸度、挂汁效果、包装及冷藏稳定性。",
      ),
    },
  ];
  A.fields = {
    flavour: bilingual("Flavour profile", "风味描述"),
    ingredients: bilingual("Main ingredients", "主要食材"),
    innovation: bilingual("Product innovation", "创新特点"),
    audience: bilingual("Target consumer", "目标消费者"),
    occasion: bilingual("Consumption occasion", "食用场景"),
    format: bilingual("Product format", "产品形式"),
    challenge: bilingual("Development challenges", "研发挑战"),
  };
  A.series = (type) =>
    type === "before"
      ? A.t("Before Party", "聚会前")
      : A.t("After Party", "聚会后");
  A.note = () =>
    A.t("Concept Visual — Product Under Development", "概念视觉 · 产品研发中");
  A.fact = (label, value) =>
    `<div class="fact"><h4>${label}</h4><p>${value}</p></div>`;
  A.toolbox = (id, icon, title, body) =>
    `<details class="toolbox" id="${id}"><summary>${A.icon(icon)}<strong>${title}</strong><span class="plus">${A.icon("plus", 19)}</span></summary><div class="tool-content">${body}</div></details>`;
  A.field = (label, id, options, value) =>
    `<label class="field">${label}<select id="${id}">${options.map(([v, n]) => `<option value="${v}" ${value === v ? "selected" : ""}>${n}</option>`).join("")}</select></label>`;
})();
