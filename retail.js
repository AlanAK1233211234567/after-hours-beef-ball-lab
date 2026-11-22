(() => {
  const url = new URL(location.href);
  const en = url.searchParams.get('lang') === 'en';
  const t = (zh, english) => en ? english : zh;
  document.documentElement.lang = en ? 'en' : 'zh-HK';
  document.title = t('大埔振興肉丸 · 產品改善企劃','Tai Po Chun Hing · Retail Collection');
  try {localStorage.setItem('after-hours.1.language', JSON.stringify(en?'en':'zh'))} catch {}
  const detail=(a,b)=>`<details><summary>${a}</summary><p>${b}</p></details>`;
  const collections = {
    bbq: {
      details: [
        [43,43,t('一串四味','Four flavours'),t('手打牛丸、墨魚丸、芝士腸、黃金魚蛋，依次穿在同一支扁竹簽上。','Beef, cuttlefish, cheese sausage and golden fish ball share one flat bamboo skewer.')],
        [62,65,t('港式雙味','Two finishes'),t('蜜糖燒烤醬用來掃面，喜歡辛香的可以再撒上孜然粉。','Brush on honey BBQ sauce and finish with a dusting of spicy cumin.')]
      ],
      variants: [[t('單盒裝','Single pack'),t('360 克 · 6 串','360 g · 6 skewers'),'HK$48–55'],[t('週末派對箱','Party box'),t('4 盒 · 24 串','4 packs · 24 skewers'),t('附摺疊烤網、紙碟及夾子','Includes a folding grill, plates and tongs')]]
    },
    gift: {
      details: [
        [25,30,t('保溫禮袋','Insulated bag'),t('紅金配色的保溫手提袋，送禮後也可重用。','A reusable insulated gift bag in festive red and gold.')],
        [77,49,t('圍爐湯底','Hotpot stocks'),t('濃縮沙爹或花膠雞湯，配上分格盛載的招牌丸料。','Satay or fish maw chicken stock pairs with the tray of signature meatballs.')]
      ],
      variants: [[t('小家庭版','Small family'),t('800 克 · 3–4 人','800 g · serves 3–4'),'HK$148–168'],[t('大家庭版','Large family'),t('1.5 公斤 · 6–7 人','1.5 kg · serves 6–7'),t('建議零售價待定','Proposed price pending')]]
    }
  };
  const card=(id,photo,name,label,desc,notes)=>{
    const product=collections[id];
    return `<article id="${id}" class="chapter">
      <div class="model-stage"><img class="model-poster" src="assets/${photo}.webp" alt="${name}"></div>
      <div class="model-tools" hidden><span>${t('拖動旋轉 · 方向鍵微調','Drag to rotate · Arrow keys to turn')}</span><button type="button">${t('重設視角','Reset view')}</button></div>
      <section class="product-info"><div class="chapter-heading"><small>${label}</small><h2>${name}</h2></div>
      <div class="chapter-copy"><p>${desc}</p><div class="options" role="group" aria-label="${t('選擇規格','Choose a size')}">${product.variants.map(([title],i)=>`<button data-size="${i}" aria-pressed="${i===0}">${title}</button>`).join('')}</div><div class="spec" aria-live="polite"></div>${notes}<details><summary>${t('查看包裝攝影','Explore packaging photography')}</summary><figure><div class="studio"><video muted loop playsinline preload="none" poster="assets/${photo}.webp" aria-label="${name}" data-src="assets/${photo}-cinema.mp4"></video>
      ${product.details.map(([x,y,title],i)=>`<button class="pin" style="left:${x}%;top:${y}%" data-detail="${i}" aria-label="${title}" aria-pressed="false">+</button>`).join('')}
      <button class="motion" aria-label="${t('播放動畫','Play motion')}">▶</button></div>
      <figcaption aria-live="polite"></figcaption></figure></details></div></section></article>`;
  };
  document.getElementById('retail').innerHTML=`
  <header><nav class="project-switch" aria-label="${t("切換企劃","Switch project")}"><form action="index.html" method="get"><button class="project-toggle" type="submit" role="switch" aria-checked="true" aria-label="${t("肉丸產品改善","Retail Collection")}"><span class="project-left">${t("醒酒牛丸","After Hours")}</span><span class="project-track" aria-hidden="true"></span><span class="project-right">${t("肉丸產品改善","Retail Collection")}</span></button></form></nav><div class="mast"><b>${t('大埔振興肉丸','Tai Po Chun Hing')}</b><nav><a href="#bbq">BBQ</a><a href="#gift">${t('團圓禮盒','Gift set')}</a><a href="#pilot">${t('試點計劃','Pilot')}</a><a href="?lang=${en?'zh':'en'}">${en?'繁體中文':'English'}</a></nav></div></header>
  <main id="top"><section class="cover"><div class="intro"><small>${t('大埔振興肉丸 · 產品改善企劃','Tai Po Chun Hing · Retail design proposal')}</small><h1>${t('從郊野炭爐<br>到團圓飯桌','From the grill<br>to the family table')}</h1><p>${t('同一款手打牛丸，週末可以帶到大美督燒烤，冬至也可以成為一份心意。這份企劃從穿串、湯底和包裝入手，為兩種聚餐重新配搭。','A hand-beaten beef ball can travel to a weekend grill at Tai Mei Tuk or home for the winter solstice. Two retail concepts rethink skewers, soup bases and packaging around the people sharing the meal.')}</p><a class="browse" href="#bbq">${t('翻閱產品系列','Explore the collection')}</a></div><div class="covers"><a href="#bbq"><img src="assets/bbq-kit.webp" alt="${t('即烤鐵炮串組合','Ready-to-grill skewer kit')}"><span>BBQ</span></a><a href="#gift"><img src="assets/reunion-kit.webp" alt="${t('團圓火鍋禮盒','Reunion hotpot gift set')}"><span>${t('團圓','Reunion')}</span></a></div></section>
  ${card('bbq','bbq-kit',t('即烤 BBQ 鐵炮串','Ready-to-grill skewers'),t('郊野系列','Outdoor collection'),t('每串集齊手打牛丸、墨魚丸、脆皮芝士腸及黃金魚蛋。兩小包港式蜜糖燒烤醬與香辣孜然粉，讓同行的人各選口味。','Each skewer pairs beef and cuttlefish balls with cheese sausage and a golden fish ball. Individual honey BBQ sauce and cumin seasoning sachets let everyone finish their own.'),detail(t('竹簽與貼體包裝','Skewer and pack design'),t('擬用 18 厘米碳化寬柄扁竹簽，四件緊排，留約 4 厘米作手柄。貼體真空膜配托盤固定簽尖；打樣時須測試耐熱、刺穿及封口。','The proposed 18 cm flat bamboo skewer leaves a 4 cm grip. A skin-packed tray secures the tips. Heat resistance, puncture resistance and seals need prototype testing.'))+detail(t('週末派對箱與客群','Weekend party box'),t('面向 18–35 歲露營客及郊遊家庭。四盒派對裝另配摺疊烤網、紙碟和夾子，烤網獨立放置。擬以大埔門店、大美督沿線及露營店作週末補給點。','For campers aged 18–35 and families on day trips. A four-pack party box adds a separately packed folding grill, plates and tongs. Proposed weekend outlets include Tai Po shops, the Tai Mei Tuk route and camping stores.')))}
  ${card('gift','reunion-kit',t('團圓孝心火鍋禮盒','Reunion hotpot gift set'),t('節慶系列','Festive collection'),t('七成招牌牛丸、墨魚丸及蝦丸，配三成限定鮑魚汁福袋及福字魚豆腐。連湯底和蘸醬一起送到家，讓下班趕回家的人也能張羅一桌。','The proposed mix combines 70% signature beef, cuttlefish and prawn balls with 30% festive abalone-sauce pouches and lucky fish tofu. Stock and dips round out a family meal after work.'),detail(t('湯底與節日配搭','Seasonal pairings'),t('冬至、中秋及團年飯可配濃縮沙爹或花膠雞湯底，另附瑤柱 XO 醬或沙茶醬。五月母親節版本建議選清潤椰子雞或花膠雞湯。','For winter solstice, Mid-Autumn and Lunar New Year, pair satay or fish maw chicken stock with scallop XO or shacha sauce. A lighter coconut chicken or fish maw broth is proposed for Mother’s Day.'))+detail(t('保溫手提袋與心意卡','Gift bag and kindness card'),t('為 25–45 歲上班族及其家人設計紅金色可重用保溫袋。禮盒附心意卡，把「今晚我洗碗」或「幫媽媽按摩半小時」帶上飯桌。','A reusable red-and-gold insulated bag is designed for working adults aged 25–45 and their families. A kindness card offers a small promise such as washing up tonight or giving Mum a half-hour massage.')))}
  <section class="plan" id="pilot"><small>${t('定價與落地','Pricing and rollout')}</small><h2>${t('從大埔開始試點','A pilot starting in Tai Po')}</h2><p>${t('沿用現有肉丸工藝，先以後段分揀、穿串及禮盒組裝測試需求，觀察便利包裝能否帶動週末及節慶銷量。','Keep the existing meatball process and test demand through sorting, skewering and assembly. Measure whether convenience lifts weekend and festive sales.')}</p><ol>
  <li><b>${t('第 1 個月 · 打樣','Month 1 · Prototype')}</b>${t('選竹簽、貼體膜及湯醬代工供應商；測試包裝、保溫袋與心意卡。','Select skewer, film and stock suppliers. Prototype the packaging, insulated bag and card.')}</li>
  <li><b>${t('第 2 個月 · 區域試售','Month 2 · Local trial')}</b>${t('擬在大埔門店、大美督沿線便利店及 HKTVmall 試售串燒，記錄週末動銷。','Trial the skewers in Tai Po shops, convenience stores on the Tai Mei Tuk route and HKTVmall. Track weekend sell-through.')}</li>
  <li><b>${t('第 3–4 個月 · 評估擴展','Months 3–4 · Review expansion')}</b>${t('按試點數據評估百佳、惠康等冷櫃渠道；擬在冬至及農曆新年前三星期推出節慶禮盒。','Use pilot results to evaluate supermarket distribution, including PARKnSHOP and Wellcome. Schedule gift sets three weeks before winter solstice and Lunar New Year.')}</li></ol>
  ${detail(t('查看商業假設','View commercial assumptions'),t('原案以散裝丸約 HK$38 作串燒定價參照；小家庭禮盒以散裝丸 HK$115 加湯醬 HK$35 作參照。原案預期串燒與禮盒毛利率分別提升 15–20% 及 18–25%，並以禮盒客單價翻倍為目標。須以包材、代工及試售數據核實。','Loose meatballs at about HK$38 anchor the skewer price. The small gift set benchmarks HK$115 of meatballs plus HK$35 of stock and sauces. The proposal targets margin lifts of 15–20% and 18–25% respectively, and a doubling of basket value for gift sets. Packaging costs, outsourced production and pilot sales must validate these targets.'))}</section></main><footer>${t('學生獨立企劃 · 產品、渠道及定價均為提案構想。','Independent student proposal · Products, channels and prices are proposed concepts.')}</footer>`;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('.chapter').forEach(article=>{
    const product=collections[article.id];
    const video=article.querySelector('video');
    const motion=article.querySelector('.motion');
    const caption=article.querySelector('figcaption');
    let selected=-1;
    let enabled=!reduced.matches;
    let visible=false;
    function syncMotion(){
      if(visible && enabled && selected===-1){
        if(!video.hasAttribute('src')) video.src=video.dataset.src;
        video.play().catch(()=>{});
      }else video.pause();
    }
    function playbackLabel(){
      motion.textContent=video.paused?'▶':'Ⅱ';
      motion.setAttribute('aria-label',video.paused?t('播放動畫','Play motion'):t('暫停動畫','Pause motion'));
    }
    function focusDetail(index){
      selected=index;
      const item=product.details[index];
      video.style.transformOrigin=item?`${item[0]}% ${item[1]}%`:'center';
      video.classList.toggle('closeup',Boolean(item));
      for(const pin of article.querySelectorAll('.pin')){
        const [x,y]=product.details[Number(pin.dataset.detail)];
        pin.style.left=(item?item[0]+1.45*(x-item[0]):x)+'%';
        pin.style.top=(item?item[1]+1.45*(y-item[1]):y)+'%';
        pin.setAttribute('aria-pressed',String(Number(pin.dataset.detail)===index));
        pin.textContent=Number(pin.dataset.detail)===index?'−':'+';
      }
      caption.textContent=item?item[2]+' · '+item[3]:t('包裝概念圖 · 點選 ＋ 探索細節','Packaging concept · Select + to explore');
      syncMotion();
    }
    function setSize(index){
      article.querySelectorAll('[data-size]').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
      const [,size,detail]=product.variants[index];
      article.querySelector('.spec').innerHTML=`<strong>${size}</strong><span>${detail.startsWith('HK$')?t('建議零售價 ','Proposed retail '):''}${detail}</span>`;
    }
    article.querySelectorAll('.pin').forEach(pin=>pin.onclick=()=>{
      const i=Number(pin.dataset.detail);
      focusDetail(selected===i?-1:i);
    });
    article.querySelectorAll('[data-size]').forEach(button=>button.onclick=()=>setSize(Number(button.dataset.size)));
    motion.onclick=()=>{enabled=video.paused;focusDetail(-1)};
    video.onplay=video.onpause=playbackLabel;
    video.onerror=()=>{motion.hidden=true};
    reduced.addEventListener('change',()=>{enabled=!reduced.matches;syncMotion()});
    focusDetail(-1);
    setSize(0);
    new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;syncMotion()},{threshold:0.12}).observe(video.parentElement);
  });
})();
