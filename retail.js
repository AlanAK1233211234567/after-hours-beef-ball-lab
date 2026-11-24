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
        [26,69,t('一串四味','Four flavours'),t('手打牛丸、墨魚丸、芝士腸、黃金魚蛋，依次穿在同一支扁竹簽上。','Beef, cuttlefish, cheese sausage and golden fish ball share one flat bamboo skewer.')],
        [43,66,t('港式雙味','Two finishes'),t('蜜糖燒烤醬用來掃面，喜歡辛香的可以再撒上孜然粉。','Brush on honey BBQ sauce and finish with a dusting of spicy cumin.')]
      ],
      variants: [
        [t('預穿即烤丸串裝','Ready-to-grill pack'),t('360 克 · 6 串 · 每串 4 粒','360 g · 6 skewers · 4 pieces each'),t('每串配手打牛丸、墨魚丸、脆皮芝士腸和黃金魚蛋，另附蜜糖燒烤醬和香辣孜然粉各一包。','Each skewer combines a beef ball, cuttlefish ball, cheese sausage and golden fish ball. One honey BBQ sauce sachet and one spicy cumin sachet are included.')],
        [t('「一拎就走」全配箱','Grab-and-go BBQ box'),t('4–6 人 · 3–4 盒丸串','Serves 4–6 · 3–4 skewer packs'),t('附四包調味料、輕便摺疊或即棄鐵絲烤網，以及獨立包裝的紙碟、紙杯、燒烤叉或夾子和濕紙巾。調味可配蜜糖燒烤醬、孜然粉或椒鹽。','Includes four seasoning sachets, a folding or disposable wire grill, wrapped plates, cups, BBQ forks or tongs, and wet wipes. Seasonings may include honey BBQ sauce, cumin or pepper salt.')]
      ]
    },
    gift: {
      details: [
        [75,34,t('母親節禮袋','Mother’s Day gift bag'),t('素色布袋配上花卉腰封，旁邊的心意清單附有免洗碗券。','The cream tote has a floral sleeve and comes with a kindness checklist and a washing-up voucher.')],
        [32,39,t('圍爐湯底','Hotpot stocks'),t('清甜椰子雞湯底，加入丸料及自選主食即可圍爐。','Simmer the meatballs and your choice of noodles in sweet coconut chicken broth.')]
      ],
      variants: [[t('母親節套餐','Mother’s Day set'),t('主食三選一','Choose one staple'),t('烏冬麵、龍口粉絲或港式公仔麵','Udon, Longkou glass noodles or Hong Kong instant noodles')]]
    }
  };
  const card=(id,photo,name,label,desc,notes)=>{
    const product=collections[id];
    return `<article id="${id}" class="chapter">
      <div class="chapter-heading"><small>${label}</small><h2>${name}</h2></div>
      <figure><div class="studio"><video muted loop playsinline preload="none" poster="assets/${id === 'bbq' ? '大埔振興烧烤丸串纸盒版.jpg' : photo + '.webp'}" aria-label="${name}" data-src="assets/${photo}-cinema.mp4"></video>
      ${product.details.map(([x,y,title],i)=>`<button class="pin" style="left:${x}%;top:${y}%" data-detail="${i}" aria-label="${title}" aria-pressed="false">+</button>`).join('')}
      <button class="motion" aria-label="${t('播放動畫','Play motion')}">▶</button></div>
      <figcaption aria-live="polite"></figcaption></figure>
      <div class="chapter-copy"><p>${desc}</p>${product.variants.length>1?`<div class="options" role="group" aria-label="${t('選擇規格','Choose a size')}">${product.variants.map(([title],i)=>`<button data-size="${i}" aria-pressed="${i===0}">${title}</button>`).join('')}</div>` : ''}<div class="spec" aria-live="polite"></div>${notes}</div></article>`;
  };
  document.getElementById('retail').innerHTML=`
  <header><nav class="project-switch" aria-label="${t("切換企劃","Switch project")}"><form action="index.html" method="get"><button class="project-toggle" type="submit" role="switch" aria-checked="true" aria-label="${t("肉丸產品改善","Retail Collection")}"><span class="project-left">${t("醒酒牛丸","After Hours")}</span><span class="project-track" aria-hidden="true"></span><span class="project-right">${t("肉丸產品改善","Retail Collection")}</span></button></form></nav><div class="mast"><b>${t('大埔振興肉丸','Tai Po Chun Hing')}</b><nav><a href="#bbq">BBQ</a><a href="#gift">${t('母親節套餐','Mother’s Day set')}</a><a href="?lang=${en?'zh':'en'}">${en?'繁體中文':'English'}</a></nav></div></header>
  <main id="top">
  ${card('bbq','bbq-party-box',t('戶外燒烤「一拎即烤」','Grab-and-grill skewers'),t('郊野系列','Outdoor collection'),
    t('從大埔出發，到大美督海旁燒烤。大埔振興把四款招牌丸料預先穿好，小聚可帶一盒，週末露營可預約連烤網和餐具的全配箱。','Head from Tai Po to a seaside barbecue at Tai Mei Tuk. Tai Po Chun Hing threads four signature bites onto each skewer. Pick up one pack for a small gathering or reserve a box with grill and tableware for a camping weekend.'),
    detail(t('竹籤與分區包裝','Skewers and packaging'),t('18 厘米碳化寬柄扁竹籤方便拿取。單盒採用高阻隔透明貼體真空包裝，固定籤尖，減少刺穿漏氣。全配箱將密封丸串、烤網及餐具分隔，乾濕分開。','The 18 cm carbonised flat bamboo skewers have a broad grip. Transparent high-barrier vacuum skin packs secure the tips to reduce punctures. Separate compartments keep sealed food apart from the grill and utensils.'))+
    detail(t('適合場合與建議渠道','Occasions and proposed outlets'),t('單盒適合平日加餐或好友小聚，省去逐款挑選和穿串的工夫。建議於百佳、惠康、便利店冷櫃及網上平台發售。全配箱面向郊遊、露營及家庭聚會，建議於大埔振興門店、大美督沿線店舖及露營用品店供應，並接受網上預約。','The single pack saves sorting and threading for a snack or small gathering. Proposed outlets include PARKnSHOP, Wellcome, convenience-store chillers and online shops. The party box is designed for outings, camping and family gatherings, with online reservations and proposed pickup at Tai Po Chun Hing, Tai Mei Tuk shops and camping stores.')))}
  ${card('gift','mothers-day-hotpot',t('清潤暖心鍋套裝','Coconut chicken hotpot set'),t('節慶系列 · 五月母親節','Festive collection · Mother’s Day in May'),
    t('「今晚我來煮，媽咪去休息。」清甜的椰子雞湯底已配好，即使平日少下廚，也能按心意卡上的步驟煮一鍋，陪媽媽吃頓飯。','“I’ll cook tonight, Mum. You take a break.” A gently sweet coconut chicken soup base and a cooking card make it easy to prepare a meal together, even for someone who rarely cooks.'),
    detail(t('煮一鍋給媽媽','Cook for Mum'),t('先煲熱椰子雞湯底，再加入丸料和自選主食，煮熟後一起享用。','Heat the coconut chicken broth, add the meatballs and your chosen noodles, and serve once cooked through.'))+
    detail(t('隨盒送上的心意','Gifts inside'),t('套餐附心意卡、獨立包裝的陳皮或花草茶包，以及眼罩。吃過火鍋，讓媽媽喝杯茶、歇一歇，今晚的碗由你來洗。','The set includes a message card, an individually wrapped dried tangerine peel or herbal tea bag, and an eye mask. After dinner, put the kettle on for Mum and take care of the washing-up.')))}
  </main><footer>${t('學生獨立企劃 · 產品及渠道均為提案構想。','Independent student proposal · Products and outlets are proposed concepts.')}</footer>`;
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
