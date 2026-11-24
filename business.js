(function () {
  "use strict";
  const { t, txt, b, icon, esc } = AH;
  const roles = [
    [
      "factory",
      b("Tai Po Chun Hing", "大埔振興牛丸"),
      b("Proposed manufacturer", "擬議生產方"),
      [
        b("Product development", "產品研發"),
        b("Production", "生產"),
        b("Quality control", "質量控制"),
        b("Packaging", "包裝"),
        b("Cold-chain distribution", "冷鏈配送"),
      ],
    ],
    [
      "bar",
      b("Partner bars", "合作酒吧"),
      b("Proposed service partners", "擬議供應夥伴"),
      [
        b("Product ordering", "訂貨"),
        b("Reheating and serving", "翻熱與供應"),
        b("Customer promotion", "顧客推廣"),
        b("Sales", "銷售"),
        b("Feedback collection", "收集反饋"),
      ],
    ],
    [
      "people",
      b("Consumers", "成年消費者"),
      b("Intended customer experience", "預期顧客體驗"),
      [
        b("Innovative Hong Kong snacks", "創新港式小食"),
        b("Convenient portions", "便捷份量"),
        b("Distinctive flavours", "特色口味"),
        b("New nightlife food experiences", "新的夜生活飲食體驗"),
      ],
    ],
  ];
  let role = 0;
  const inputs = [
    ["retail", b("Retail price / serving (HK$)", "每份零售價（HK$）"), false],
    [
      "wholesale",
      b("Wholesale price / serving (HK$)", "每份批發價（HK$）"),
      false,
    ],
    [
      "production",
      b("Production cost / serving (HK$)", "每份生產成本（HK$）"),
      false,
    ],
    [
      "serving",
      b("Bar serving cost / portion (HK$)", "酒吧每份供應成本（HK$）"),
      false,
    ],
    ["daily", b("Daily servings per bar", "每家酒吧日銷量（份）"), true],
    ["bars", b("Number of partner bars", "合作酒吧數量"), true],
    ["days", b("Operating days / month", "每月營業日數"), true],
  ];
  const scenarios = {
    conservative: {
      retail: 38,
      wholesale: 20,
      production: 21,
      serving: 6,
      daily: 8,
      bars: 2,
      days: 16,
    },
    base: {
      retail: 43,
      wholesale: 23,
      production: 15,
      serving: 4,
      daily: 20,
      bars: 2,
      days: 24,
    },
    optimistic: {
      retail: 48,
      wholesale: 25,
      production: 14,
      serving: 3,
      daily: 32,
      bars: 3,
      days: 28,
    },
  };
  const sNames = {
    conservative: b("Conservative", "保守"),
    base: b("Base", "基礎"),
    optimistic: b("Optimistic", "樂觀"),
  };
  let scenario = "base";
  function calc(a) {
    const volume = a.daily * a.bars * a.days,
      revenue = a.wholesale * volume,
      mp = (a.wholesale - a.production) * volume,
      bp = (a.retail - a.wholesale - a.serving) * volume;
    return {
      volume,
      revenue,
      mp,
      bp,
      mMargin: revenue ? (mp / revenue) * 100 : null,
      bMargin: a.retail * volume ? (bp / (a.retail * volume)) * 100 : null,
    };
  }
  AH.calculate = calc;
  function currency(n) {
    return new Intl.NumberFormat(AH.lang === "en" ? "en-HK" : "zh-HK", {
      style: "currency",
      currency: "HKD",
      currencyDisplay: "narrowSymbol",
      maximumFractionDigits: 2,
    })
      .format(n)
      .replace("$", "HK$")
      .replace("HKHK$", "HK$");
  }
  function profits() {
    const a = scenarios[scenario];
    if (
      inputs.some(
        ([id, , int]) =>
          a[id] === "" ||
          !Number.isFinite(+a[id]) ||
          a[id] < 0 ||
          (int && !Number.isInteger(+a[id])) ||
          (id === "days" && a[id] > 31),
      )
    ) {
      return `<p class="fine">${t("Enter a non-negative value in each field. Counts must be whole numbers and operating days cannot exceed 31.", "每欄須輸入非負數。數量須為整數，每月營業日數最多 31 天。")}</p>`;
    }
    const v = calc(a),
      pct = (n) => (n === null ? "—" : n.toFixed(1) + "%");
    const metrics = [
      [t("Manufacturer revenue", "廠家收入"), currency(v.revenue)],
      [t("Manufacturer gross profit", "廠家毛利"), currency(v.mp)],
      [t("Bar gross profit · all bars", "所有酒吧毛利"), currency(v.bp)],
      [
        t("Monthly sales volume", "每月銷量"),
        v.volume.toLocaleString() + " " + t("servings", "份"),
      ],
      [t("Manufacturer gross margin", "廠家毛利率"), pct(v.mMargin)],
      [t("Bar gross margin", "酒吧毛利率"), pct(v.bMargin)],
    ];
    return `<div class="profits">${metrics.map(([n, val]) => `<div class="metric"><span>${n}</span><b>${val}</b></div>`).join("")}</div>`;
  }
  function calculator() {
    return `<p class="subcopy">${t("Choose a scenario and edit its assumptions. All totals are monthly. Bar profit includes the additional cost of serving each portion.", "選擇情景並調整假設。結果按月計算，酒吧毛利已扣除每份額外供應成本。")}</p><div class="segments">${Object.keys(
      scenarios,
    )
      .map(
        (k) =>
          `<button class="pill" aria-pressed="${scenario === k}" data-scenario="${k}">${txt(sNames[k])}</button>`,
      )
      .join(
        "",
      )}</div><div class="two-col mt"><div class="fields">${inputs.map(([id, label, int]) => `<label class="field">${txt(label)}<input id="calc-${id}" type="number" min="0" ${id === "days" ? 'max="31"' : ""} step="${int ? "1" : ".01"}" value="${scenarios[scenario][id]}"></label>`).join("")}</div><div><div id="profit-output" aria-live="polite">${profits()}</div><p class="fine mt">${t("Illustrative Financial Estimates — Not Actual Business Performance", "示例財務估算 · 不代表實際商業表現")}</p></div></div><details class="fine mt"><summary>${t("Calculation method", "計算方式")}</summary><p class="mt">${t("Volume = daily sales × bars × days. Manufacturer revenue = wholesale price × volume. Manufacturer gross profit = (wholesale price − production cost) × volume. Bar gross profit = (retail price − wholesale price − serving cost) × volume. Each gross margin divides that party’s gross profit by its own sales revenue. Rent, labour and fixed costs are excluded.", "總銷量 = 每日銷量 × 酒吧數 × 營業日數。廠家收入 = 批發價 × 總銷量。廠家毛利 =（批發價 − 生產成本）× 總銷量。酒吧毛利 =（零售價 − 批發價 − 供應成本）× 總銷量。各方毛利率 = 各方毛利 ÷ 各自銷售收入。估算未計租金、人工及固定成本。")}</p></details>`;
  }
  const scoreFields = [
    ["taste", b("Taste", "味道")],
    ["texture", b("Texture", "口感")],
    ["aroma", b("Aroma", "香氣")],
    ["purchase", b("Purchase intention", "購買意願")],
    ["overall", b("Overall satisfaction", "整體滿意度")],
  ];
  const pilots = [
    b(
      "Compare preferences and acceptance in an alcohol-free tasting with 20–30 adults.",
      "邀請 20–30 名成年人蔘加不涉及飲酒的試食，比較接受度與偏好。",
    ),
    b(
      "Test willingness to pay and how easily bar staff can reheat and serve each cup.",
      "研究價格接受程度，並觀察酒吧員工翻熱和出餐的便利性。",
    ),
    b(
      "Review measured costs, margins and feedback before the next recipe iteration.",
      "整理實際成本、毛利和反饋，再修訂下一版配方。",
    ),
  ];
  const validScore = (n) => Number.isInteger(n) && n >= 1 && n <= 5;
  const validRecord = (r) =>
    r &&
    scoreFields.every(([k]) => validScore(r.scores?.[k])) &&
    typeof r.feedback === "string" &&
    (r.price === "" || (Number.isFinite(+r.price) && +r.price >= 0));
  let records = AH.read("tasting", {});
  records = Object.fromEntries(
    AH.products
      .filter((p) => validRecord(records?.[p.id]))
      .map((p) => [p.id, records[p.id]]),
  );
  let fav = AH.read("favourite", "");
  if (!AH.products.some((p) => p.id === fav)) fav = "";
  let current = "cheese",
    drafts = {};
  let confirming = false;
  function draft() {
    if (!drafts[current])
      drafts[current] = records[current]
        ? structuredClone(records[current])
        : { scores: {}, price: "", feedback: "" };
    return drafts[current];
  }
  function roleDetail() {
    const r = roles[role];
    return `<strong>${txt(r[2])}</strong><ul>${r[3].map((x) => `<li>${txt(x)}</li>`).join("")}</ul>`;
  }
  function chart() {
    const rated = AH.products.filter((p) => records[p.id]);
    if (!rated.length)
      return `<p class="fine mt">${t("Your chart appears after you save a tasting.", "保存第一項試食評分後，這裏會顯示圖表。")}</p>`;
    return `<p class="fine">${t("Mean of your five scores per saved product, out of 5.", "每款已保存產品五項評分的平均分，滿分 5 分。")}</p>${rated
      .map((p) => {
        const n =
          scoreFields.reduce((a, [k]) => a + records[p.id].scores[k], 0) / 5;
        return `<div class="chart-row"><span>${txt(p.short)}</span><div class="bar-track"><i style="width:${n * 20}%"></i></div><strong>${n.toFixed(1)} / 5</strong></div>`;
      })
      .join("")}`;
  }
  function tasting() {
    const d = draft();
    return `<div class="two-col"><div><p class="subcopy">${t("Proposed four-week pilot", "擬議四星期試點")}</p><ul>${pilots.map((x) => `<li>${txt(x)}</li>`).join("")}</ul></div><div class="results"><h4>${t("Your tasting notebook", "個人試食記錄")}</h4><p class="fine">${t("Record one tasting per product on this device. Saving again updates that product. Your chart contains only your saved ratings.", "每款產品可在本機保存一條試食記錄，再次保存會更新該款記錄。圖表僅使用你已保存的評分。")}</p></div></div><div class="two-col mt"><div>${AH.field(
      t("Product to rate", "選擇評分產品"),
      "rate-product",
      AH.products.map((p) => [p.id, txt(p.name)]),
      current,
    )}<div class="mt">${scoreFields.map(([key, label]) => `<div class="rating-line" role="group" aria-label="${txt(label)}"><span>${txt(label)}</span><div class="score-options">${[1, 2, 3, 4, 5].map((n) => `<button data-score="${key}" data-value="${n}" aria-label="${txt(label)} ${n}/5" aria-pressed="${d.scores[key] === n}">${n}</button>`).join("")}</div></div>`).join("")}</div><label class="field mt">${t("Suggested price per serving (HK$)", "建議每份售價（HK$）")}<input id="rate-price" type="number" min="0" step=".01" value="${esc(d.price)}"></label><label class="field mt">${t("Tasting notes", "試食反饋")}<textarea id="rate-feedback" maxlength="1500">${esc(d.feedback)}</textarea></label><button id="rate-save" class="btn primary mt">${t("Save my rating", "保存我的評分")}</button><div id="rate-status" class="fine mt" role="status"></div></div><div><div class="results"><h3>${t("My tasting results", "我的試食結果")}</h3><div id="chart" class="mt">${chart()}</div></div><div class="mt">${AH.field(t("My favourite product", "我最喜歡的產品"), "rate-fav", [["", t("Choose a favourite", "選擇最喜歡的產品")], ...AH.products.map((p) => [p.id, txt(p.name)])], fav)}</div><div class="actions mt"><button class="btn" id="rate-export" ${Object.keys(records).length || fav ? "" : "disabled"}>${t("Export results", "導出結果")}</button><button class="btn" id="rate-reset" ${Object.keys(records).length || fav ? "" : "disabled"}>${t("Reset results", "重置結果")}</button></div>${confirming ? `<div class="results mt"><p>${t("Clear all tasting ratings and your favourite from this browser?", "清除當前瀏覽器內的所有試食評分及最愛產品？")}</p><div class="actions mt"><button id="rate-cancel" class="btn">${t("Keep results", "保留記錄")}</button><button id="rate-clear" class="btn primary">${t("Clear tasting results", "確認清除試食記錄")}</button></div></div>` : ""}</div></div>`;
  }
  const refreshTasting = () => {
    document.querySelector("#tasting .tool-content").innerHTML = tasting();
  };
  AH.businessPage = () =>
    `<section class="section business" id="business"><div class="wrap"><div class="kicker">${t("Bar Collaboration", "酒吧合作")}</div><div class="section-head"><h2>${t("From traditional food<br>to nightlife culture", "從傳統食品走進夜生活")}</h2><p>${t("A proposed B2B2C pilot would connect Tai Po Chun Hing’s beef ball development with bars serving young adults. Bars could expand their snack menus and return direct tasting feedback to the maker.", "擬議的 B2B2C 試點將大埔振興的牛丸研發能力與面向年輕成年人的酒吧連接。酒吧可豐富小食選擇，並把顧客的試食意見帶回研發環節。")}</p></div><h3>${t("The proposed supply chain", "擬議合作流程")}</h3><div class="flow">${roles.map((r, i) => `<button data-role="${i}" aria-pressed="${role === i}">${icon(r[0], 25)}${txt(r[1])}</button>`).join("")}</div><div id="role-detail" class="flow-detail" aria-live="polite">${roleDetail()}</div>${AH.toolbox("calculator", "calc", t("Interactive profit calculator", "互動利潤計算器"), calculator())}${AH.toolbox("tasting", "star", t("Test before we launch", "上市前試食驗證"), tasting())}</div></section>`;
  AH.businessClick = (el) => {
    if (el.dataset.role !== undefined) {
      role = +el.dataset.role;
      document
        .querySelectorAll("[data-role]")
        .forEach((b) =>
          b.setAttribute("aria-pressed", +b.dataset.role === role),
        );
      document.querySelector("#role-detail").innerHTML = roleDetail();
      return;
    }
    if (el.dataset.scenario) {
      scenario = el.dataset.scenario;
      document.querySelector("#calculator .tool-content").innerHTML =
        calculator();
      document
        .querySelector(`[data-scenario="${scenario}"]`)
        .focus({ preventScroll: true });
      return;
    }
    if (el.dataset.score) {
      draft().scores[el.dataset.score] = +el.dataset.value;
      document
        .querySelectorAll(`[data-score="${el.dataset.score}"]`)
        .forEach((b) => b.setAttribute("aria-pressed", b === el));
      return;
    }
    if (el.id === "rate-save") {
      const d = draft();
      if (!validRecord(d)) {
        document.querySelector("#rate-status").textContent = t(
          "Give all five scores and enter a non-negative price, or leave the price blank.",
          "請完成五項評分。建議售價可留空，填寫時須為非負數。",
        );
        return;
      }
      records[current] = structuredClone(d);
      const ok = AH.save("tasting", records);
      refreshTasting();
      AH.toast(
        ok
          ? t("Tasting saved.", "試食評分已保存。")
          : t("Saved for this visit only.", "試食評分暫存於本次訪問。"),
      );
      return;
    }
    if (el.id === "rate-export") {
      const payload = {
        project: "AFTER HOURS",
        scope: "Personal local tasting records",
        scale: "1–5",
        currency: "HKD",
        favourite: fav || null,
        ratings: AH.products
          .filter((p) => records[p.id])
          .map((p) => ({ product: p.name.en, ...records[p.id] })),
      };
      const url = URL.createObjectURL(
        new Blob([JSON.stringify(payload, null, 2)], {
          type: "application/json",
        }),
      );
      const a = document.createElement("a");
      a.href = url;
      a.download = "after-hours-tasting.json";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      return;
    }
    if (el.id === "rate-reset" || el.id === "rate-cancel") {
      confirming = el.id === "rate-reset";
      refreshTasting();
      return;
    }
    if (el.id === "rate-clear") {
      records = {};
      drafts = {};
      fav = "";
      confirming = false;
      AH.save("tasting", {});
      AH.save("favourite", "");
      refreshTasting();
      AH.toast(t("Local tasting results cleared.", "本地試食記錄已清除。"));
    }
  };
  AH.businessInput = (el) => {
    if (el.id.startsWith("calc-")) {
      const key = el.id.slice(5);
      scenarios[scenario][key] = el.value === "" ? "" : +el.value;
      document.querySelector("#profit-output").innerHTML = profits();
      return;
    }
    if (el.id === "rate-product") {
      current = el.value;
      refreshTasting();
      return;
    }
    if (el.id === "rate-fav") {
      fav = el.value;
      const ok = AH.save("favourite", fav);
      for (const id of ["rate-export", "rate-reset"])
        document.getElementById(id).disabled =
          !Object.keys(records).length && !fav;
      if (!ok)
        AH.toast(
          t("Favourite stored for this visit.", "最愛產品暫存於本次訪問。"),
        );
      return;
    }
    if (el.id === "rate-price") draft().price = el.value;
    if (el.id === "rate-feedback") draft().feedback = el.value;
  };
})();
