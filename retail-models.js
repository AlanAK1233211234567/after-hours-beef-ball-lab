import * as T from './assets/three/three.module.js';
import { OrbitControls } from './assets/three/OrbitControls.js';

const finish = (color, extras = {}) => new T.MeshStandardMaterial({color, roughness: .62, ...extras});
const cream = finish('#efe2c4'), gold = finish('#cb9a47', {metalness:.32});
const bamboo = finish('#dbaf73'), trayBlack = finish('#262724'), red = finish('#8c1f2a');
const sphere = new T.SphereGeometry(1,32,24);

function texture(width,height,paint) {
  const canvas=document.createElement('canvas');
  canvas.width=width; canvas.height=height;
  paint(canvas.getContext('2d'));
  const result=new T.CanvasTexture(canvas);
  result.colorSpace=T.SRGBColorSpace;
  result.anisotropy=4;
  return result;
}

function food(base, fleck) {
  const map=texture(256,128,ctx=>{
    ctx.fillStyle=base;ctx.fillRect(0,0,256,128);
    let seed=325;
    const rand=()=>((seed=seed*16807%2147483647)/2147483647);
    for(let i=0;i<3800;i++){
      ctx.fillStyle=i%3?fleck:'#fff6db';
      ctx.globalAlpha=.09+rand()*.22;
      ctx.beginPath();ctx.ellipse(rand()*256,rand()*128,.3+rand()*2,.3+rand(),0,0,Math.PI*2);ctx.fill();
    }
  });
  return finish('white',{map,bumpMap:map,bumpScale:.022,roughness:.48});
}
const beef=food('#ac8060','#593d28'), fish=food('#f2e3c9','#bbab86');
const golden=food('#e5a640','#b27920'), sausage=food('#dd963c','#c98027'), prawn=food('#f1bd9f','#b77053');

function mesh(group,geometry,material,x,y,z) {
  const item=new T.Mesh(geometry,material);
  item.position.set(x,y,z);group.add(item);
  return item;
}
function orb(group,x,y,z,rx,ry,rz,material) {
  const item=mesh(group,sphere,material,x,y,z);
  item.scale.set(rx,ry,rz); return item;
}
function block(group,x,y,z,w,h,d,material,r=.05) {
  const shape=new T.Shape();
  const a=w/2,b=d/2;
  r=Math.min(r,a,b);
  shape.moveTo(-a+r,-b);shape.lineTo(a-r,-b);shape.quadraticCurveTo(a,-b,a,-b+r);
  shape.lineTo(a,b-r);shape.quadraticCurveTo(a,b,a-r,b);shape.lineTo(-a+r,b);
  shape.quadraticCurveTo(-a,b,-a,b-r);shape.lineTo(-a,-b+r);shape.quadraticCurveTo(-a,-b,-a+r,-b);
  const edge=Math.min(.035,h/4);
  const geometry=new T.ExtrudeGeometry(shape,{depth:h-2*edge,bevelEnabled:true,bevelSegments:3,bevelThickness:edge,bevelSize:edge});
  geometry.rotateX(-Math.PI/2);geometry.translate(0,-h/2+edge,0);
  return mesh(group,geometry,material,x,y,z);
}
function badge(group, text, bg, ink,x,y,z,w,h,flat=false){
  const map=texture(768,224,c=>{
    c.fillStyle=bg;c.fillRect(0,0,768,224);
    c.strokeStyle=ink;c.lineWidth=3;c.strokeRect(13,13,742,198);
    c.textAlign='center';c.fillStyle=ink;c.font='bold 78px serif';c.fillText(text,384,115,685);
    c.font='24px Georgia';c.fillText('T A I   P O   C H U N   H I N G',384,171);
  });
  const panel=mesh(group,new T.PlaneGeometry(w,h),finish('white',{map}),x,y,z);
  if(flat) panel.rotation.x=-Math.PI/2;
}
function tray(g,w,d,mat) {
  block(g,0,0,0,w,.22,d,mat,.13);
  for(const side of [-1,1]){
    block(g,side*(w/2-.07),.18,0,.12,.32,d-.12,mat);
    block(g,0,.18,side*(d/2-.07),w-.12,.32,.12,mat);
  }
}
function skewerKit(g) {
  tray(g,5.9,4.6,trayBlack);
  for(let i=0;i<6;i++){
    const z=-1.83+i*.57;
    block(g,.08,.42,z,5.32,.08,.12,bamboo);
    block(g,2.24,.42,z,.88,.095,.23,bamboo);
    orb(g,-2.12,.46,z,.44,.36,.285,beef);
    orb(g,-1.17,.46,z,.44,.36,.28,fish);
    const link=mesh(g,new T.CapsuleGeometry(.275,.83,10,32),sausage,.06,.44,z);
    link.rotation.z=Math.PI/2;
    orb(g,1.30,.44,z,.41,.34,.28,golden);
  }
  for(const [i,label,color] of [[0,'蜜糖燒烤醬','#603421'],[1,'香辣孜然粉','#b57339']]){
    const x=-1.32+2.66*i;
    block(g,x,.24,1.76,2.44,.16,.68,finish(color));
    badge(g,label,color,'#fff0cc',x,.331,1.76,2.31,.58,true);
  }
  badge(g,'大埔振興','#272924','#f4ddaf',0,.16,2.314,2.4,.26);
}
function reunionKit(g){
  tray(g,5.65,3.55,red);
  block(g,0,.17,0,5.31,.12,3.22,cream);
  block(g,.38,.33,0,.075,.29,3.17,cream);
  for(let i=0;i<9;i++){
    orb(g,-2.10+i%3*.83,.54,-1.02+Math.floor(i/3)*.69,.37,.36,.33,[beef,fish,prawn][i%3]);
  }
  for(let i=0;i<3;i++){
    const x=-2.10+i*.83;
    block(g,x,.45,1.12,.64,.39,.55,golden,.11);
    badge(g,'福','#d89e4e','#944c24',x,.655,1.12,.47,.38,true);
  }
  for(let i=0;i<2;i++){
    const x=1.05+i*1.05, color=i?'#e2b570':'#bc7535';
    block(g,x,.41,-.55,.94,.29,1.87,finish(color),.12);
    badge(g,i?'花膠雞湯':'濃縮沙爹',color,'#573321',x,.563,-.55,.82,.62,true);
    mesh(g,new T.CylinderGeometry(.43,.38,.22,40),gold,x,.36,1);
    badge(g,i?'沙茶':'XO','#533025','#ffdc93',x,.478,1,.58,.36,true);
  }
  const bag=new T.Group();g.add(bag);
  bag.position.set(-.68,0,-2.52);
  block(bag,0,1.12,0,3.7,2.44,1.12,red,.16);
  for(const z of [-.57,.57]){
    const curve=new T.CatmullRomCurve3([[-.79,2.22],[-.66,2.97],[0,3.17],[.66,2.97],[.79,2.22]].map(([x,y])=>new T.Vector3(x,y,z)));
    mesh(bag,new T.TubeGeometry(curve,48,.076,10,false),gold,0,0,0);
  }
  badge(bag,'團圓 · 大埔振興','#871e29','#ebcc8e',0,1.23,.607,3.18,1.23);
  badge(g,'團圓孝心禮盒','#851e27','#f3d89d',0,.17,1.794,2.6,.30);
}

function mount(article){
  const stage=article.querySelector('.model-stage'), poster=stage.querySelector('img');
  let renderer;
  try{renderer=new T.WebGLRenderer({alpha:true,antialias:true});}catch{return;}
  const scene=new T.Scene(), product=new T.Group();
  scene.add(product);
  (article.id==='bbq'?skewerKit:reunionKit)(product);
  renderer.shadowMap.enabled=true;
  renderer.shadowMap.type=T.PCFSoftShadowMap;
  product.traverse(part=>{if(part.isMesh){part.castShadow=true;part.receiveShadow=true}});
  const bounds=new T.Box3().setFromObject(product);
  const center=bounds.getCenter(new T.Vector3());
  product.position.sub(center);
  scene.add(new T.HemisphereLight(0xfff4df,0xada090,2.1));
  const key=new T.DirectionalLight(0xfff1df,2.4);key.position.set(-4,9,5);
  key.castShadow=true;key.shadow.mapSize.set(1024,1024);
  key.shadow.normalBias=.025;scene.add(key);
  const rim=new T.DirectionalLight(0xffcfaa,1.1);rim.position.set(4,3,-4);scene.add(rim);
  const camera=new T.PerspectiveCamera(34,1,.1,120);
  const canvas=renderer.domElement;
  canvas.tabIndex=0;canvas.setAttribute('aria-label',poster.alt+' · 3D');
  stage.append(canvas);
  const tools=article.querySelector('.model-tools');
  const controls=new OrbitControls(camera,canvas);
  controls.enablePan=false; controls.enableZoom=false;controls.rotateSpeed=.78;
  const render=()=>renderer.render(scene,camera);
  controls.addEventListener('change',render);
  const home=new T.Vector3(.32,1.08,1.12).normalize();
  camera.position.copy(home);
  function fit(){
    const w=stage.clientWidth,h=stage.clientHeight;
    camera.aspect=w/h;
    const halfAngle=Math.atan(Math.tan(T.MathUtils.degToRad(17))*Math.min(1,camera.aspect));
    const radius=bounds.getBoundingSphere(new T.Sphere()).radius;
    camera.position.setLength(radius/Math.sin(halfAngle)*(camera.aspect>1.25?.86:.98));
    camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(w,h,false);
    controls.update();render();
  }
  new ResizeObserver(fit).observe(stage);
  tools.querySelector('button').onclick=()=>{camera.position.copy(home);fit()};
  canvas.onkeydown=e=>{
    if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return;
    e.preventDefault();
    const view=new T.Spherical().setFromVector3(camera.position);
    view.theta+=({ArrowRight:1,ArrowLeft:-1}[e.key]||0)*.15;
    view.phi+=({ArrowDown:1,ArrowUp:-1}[e.key]||0)*.15;
    view.makeSafe();camera.position.setFromSpherical(view);controls.update();
  };
  fit();poster.hidden=true;tools.hidden=false;
  canvas.addEventListener('webglcontextlost',()=>{canvas.hidden=true;canvas.style.display='none';poster.hidden=false;tools.hidden=true});
}
document.querySelectorAll('.chapter').forEach(mount);
