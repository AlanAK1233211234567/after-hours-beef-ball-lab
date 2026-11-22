(() => {
  const section=document.querySelector('.journey');
  const frame=section.querySelector('.journey-frame');
  const object=frame.querySelector('.journey-object');
  const cards=frame.querySelector('.journey-cards');
  const foot=frame.querySelector('.journey-foot');
  const en=document.documentElement.lang==='en';
  const t=(zh,english)=>en?english:zh;
  const copy={
    bbq:[[t('郊野系列','Outdoor collection'),t('即烤鐵炮串','Ready for the grill')],
      [t('牛丸 · 墨魚丸 · 芝士腸 · 魚蛋','Beef · Cuttlefish · Cheese sausage · Fish ball'),t('一串四味','Four flavours, one skewer')],
      [t('蜜糖燒烤醬 · 香辣孜然粉','Honey BBQ sauce · Spicy cumin'),t('最後一抹香','The finishing touch')]],
    gift:[[t('節慶系列','Festive collection'),t('團圓火鍋禮盒','Reunion hotpot')],
      [t('可重用保溫禮袋','Reusable insulated gift bag'),t('紅金送暖','Wrapped in red and gold')],
      [t('濃縮沙爹 · 花膠雞湯','Satay · Fish maw chicken stock'),t('一鍋暖意','A warming broth')]]
  };
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let kit='bbq', tick=0;
  const clip=x=>Math.max(0,Math.min(1,x));
  const smooth=x=>x*x*(3-2*x);
  function update(){
    tick=0;
    const limit=section.offsetHeight-frame.offsetHeight;
    const p=clip((parseFloat(getComputedStyle(frame).top)-section.getBoundingClientRect().top)/Math.max(1,limit));
    const step=p<.24?0:p<.50?1:p<.76?2:3;
    const [caption,title]=copy[kit][Math.min(step,2)];
    frame.querySelector('small').textContent=step===3?t('大埔振興肉丸','Tai Po Chun Hing'):caption;
    frame.querySelector('h1').textContent=step===3?t('探索產品系列','Explore the collection'):title;
    cards.hidden=step!==3;
    foot.firstElementChild.style.visibility=step===3?'hidden':'visible';
    const modelReady=object.classList.contains('ready');
    let travel=0,dx=0,dy=0,scale=1;
    if(step===3){
      const dock=cards.querySelector('a[href="#'+kit+'"] span');
      const dest=dock.getBoundingClientRect(), base=frame.getBoundingClientRect();
      travel=reduced.matches?1:smooth(clip((p-.76)/.17));
      const ox=object.offsetLeft+object.offsetWidth/2,oy=object.offsetTop+object.offsetHeight/2;
      dx=(dest.left+dest.width/2-base.left-ox)*travel;
      dy=(dest.top+dest.height/2-base.top-oy)*travel;
      scale=1+(1.28*Math.min(dest.width/object.offsetWidth,dest.height/object.offsetHeight)-1)*travel;
    }
    object.style.transform=`translate(${dx}px,${dy}px) scale(${scale})`;
    for(const card of cards.children)card.classList.toggle('occupied',card.hash==='#'+kit);
    const angle=reduced.matches?0:Math.PI*(smooth(clip((p-.12)/.20))+smooth(clip((p-.39)/.22))+2*smooth(clip((p-.61)/.24)));
    if(modelReady)object.dispatchEvent(new CustomEvent('journey-pose',{detail:{kit,angle,burst:reduced.matches?0:clip((p-.51)/.25)}}));
  }
  function queue(){if(!tick)tick=requestAnimationFrame(update)}
  const resize=new ResizeObserver(()=>{
    section.style.setProperty('--mast-height',document.querySelector('header').offsetHeight+'px');queue();
  });
  resize.observe(document.querySelector('header'));resize.observe(frame);
  for(const button of frame.querySelectorAll('[data-kit]'))button.onclick=()=>{
    if(kit===button.dataset.kit)return;
    kit=button.dataset.kit;frame.dataset.active=kit;
    if(!reduced.matches)frame.querySelector('.journey-wash').animate([{clipPath:'circle(0% at 56% 54%)'},{clipPath:'circle(130% at 56% 54%)'}],{duration:590,easing:'ease-out'});
    object.querySelector('img').src='assets/'+(kit==='bbq'?'bbq-kit':'reunion-kit')+'.webp';
    foot.querySelector('a').href='#'+kit;
    for(const tab of frame.querySelectorAll('[data-kit]'))tab.setAttribute('aria-pressed',String(tab===button));
    update();
  };
  object.addEventListener('journey-ready',update);
  addEventListener('scroll',queue,{passive:true});reduced.addEventListener('change',queue);update();
})();
