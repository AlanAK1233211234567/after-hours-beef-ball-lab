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

// Surface colour comes from the kit photograph; lighting is calculated in 3D.
const loader=new T.TextureLoader();
async function food(name,roughness) {
  const map=await loader.loadAsync(new URL(`./assets/surfaces/${name}.webp`,import.meta.url).href);
  map.colorSpace=T.SRGBColorSpace;
  map.wrapS=T.RepeatWrapping;
  return new T.MeshPhysicalMaterial({map,bumpMap:map,bumpScale:.033,roughness,
    clearcoat:.13,clearcoatRoughness:.38});
}
const [beef,fish,golden,sausage]=await Promise.all([
  food('beef',.58),food('fish',.47),food('golden',.51),food('sausage',.35)
]);
const prawn=fish.clone();prawn.color.set('#f4bda8');

const grain=texture(256,128,c=>{
  c.fillStyle='#e6c991';c.fillRect(0,0,256,128);
  for(let i=0;i<64;i++){
    c.fillStyle=i%3?'#a987573d':'#fff3cd91';
    c.fillRect(0,i*2,256,.5+Math.sin(i*3.7)*.4);
  }
});
grain.wrapS=grain.wrapT=T.RepeatWrapping;
bamboo.map=grain;bamboo.bumpMap=grain;bamboo.bumpScale=.012;
const weave=texture(128,128,c=>{
  c.fillStyle='#a7a7a7';c.fillRect(0,0,128,128);
  for(let i=0;i<128;i+=4){
    c.fillStyle='#737373';c.fillRect(i,0,1,128);
    c.fillStyle='#dddddd';c.fillRect(0,i,128,1);
  }
});
weave.wrapS=weave.wrapT=T.RepeatWrapping;weave.repeat.set(2,2);
const cloth=finish('#8b1e2c',{bumpMap:weave,bumpScale:.018,roughness:.86});
trayBlack.roughness=.28;
gold.metalness=.68;gold.roughness=.32;

function mesh(group,geometry,material,x,y,z) {
  const item=new T.Mesh(geometry,material);
  item.position.set(x,y,z);group.add(item);
  return item;
}
function orb(group,x,y,z,rx,ry,rz,material) {
  const skin=sphere.clone();
  const vertices=skin.attributes.position;
  const phase=x*7+z*13;
  for(let i=0;i<vertices.count;i++){
    const a=vertices.getX(i), b=vertices.getY(i), c=vertices.getZ(i);
    const radius=1+.037*Math.sin(6*a+phase)*Math.sin(5*c+3*b)+.014*Math.cos(11*b-4*c+phase);
    vertices.setXYZ(i,a*radius,b*radius,c*radius);
  }
  skin.computeVertexNormals();
  const item=mesh(group,skin,material,x,y,z);
  skin.rotateY(phase);
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
// Thin sealed edges enclose a slightly uneven, filled centre.
function pouch(group,x,y,z,w,h,d,color) {
  const foil=new T.MeshPhysicalMaterial({color,roughness:.38,metalness:.14,clearcoat:.55});
  const skin=new T.PlaneGeometry(w,d,32,24);
  skin.rotateX(-Math.PI/2);
  const points=skin.attributes.position;
  for(let i=0;i<points.count;i++){
    const u=points.getX(i)/w+.5,v=points.getZ(i)/d+.5;
    const edge=Math.min(u,v,1-u,1-v);
    const fullness=T.MathUtils.smoothstep(edge,0,.17);
    const crease=.07*Math.sin(23*u+8*v)*Math.sin(12*v)*fullness;
    points.setY(i,h*(.06+.92*fullness+crease));
  }
  skin.computeVertexNormals();
  mesh(group,skin,foil,x,y,z);
  block(group,x,y,z,w,.025,d,foil,.035);
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
    pouch(g,x,.16,1.76,2.44,.18,.68,color);
    badge(g,label,color,'#fff0cc',x,.354,1.76,1.69,.35,true);
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
    pouch(g,x,.24,-.55,.94,.31,1.87,color);
    badge(g,i?'花膠雞湯':'濃縮沙爹',color,'#573321',x,.572,-.55,.65,.59,true);
    mesh(g,new T.CylinderGeometry(.40,.36,.20,48),finish('#532f20'),x,.35,1);
    mesh(g,new T.CylinderGeometry(.43,.43,.075,64),gold,x,.454,1);
    mesh(g,new T.CylinderGeometry(.36,.36,.018,48),finish('#49291e'),x,.498,1);
    badge(g,i?'沙茶':'XO','#533025','#ffdc93',x,.511,1,.50,.30,true);
  }
  const bag=new T.Group();g.add(bag);
  bag.position.set(-.68,0,-2.52);
  block(bag,0,1.12,0,3.7,2.44,1.12,cloth,.16);
  block(bag,0,2.35,0,3.42,.035,.075,gold);
  for(const side of [-1,1]){
    const seam=new T.CatmullRomCurve3([[-.52,.08],[-.52,2.15],[-.43,2.29],[.43,2.29],[.52,2.15],[.52,.08]].map(([z,y])=>new T.Vector3(side*1.85,y,z)));
    mesh(bag,new T.TubeGeometry(seam,64,.021,8,false),gold,0,0,0);
  }
  for(const z of [-.57,.57]){
    for(const x of [-.79,.79]){
      block(bag,x,2.04,z,.19,.48,.055,cloth);
      const rivet=mesh(bag,new T.SphereGeometry(.055,16,10),gold,x,1.94,z*1.12);
      rivet.scale.z=.34;
    }
    const curve=new T.CatmullRomCurve3([[-.79,2.22],[-.66,2.97],[0,3.17],[.66,2.97],[.79,2.22]].map(([x,y])=>new T.Vector3(x,y,z)));
    mesh(bag,new T.TubeGeometry(curve,48,.076,10,false),gold,0,0,0);
  }
  badge(bag,'團圓 · 大埔振興','#871e29','#ebcc8e',0,1.23,.607,3.18,1.23);
  badge(g,'團圓孝心禮盒','#851e27','#f3d89d',0,.17,1.794,2.6,.30);
}

function mount(article, journey=false){
  const stage=journey?article:article.querySelector('.model-stage'), poster=stage.querySelector('img');
  let renderer;
  try{renderer=new T.WebGLRenderer({alpha:true,antialias:true});}catch{return;}
  renderer.toneMapping=T.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.08;
  const scene=new T.Scene();
  const models=new Map();
  let bounds,center,active;
  function selectModel(id){
    if(active===id)return;
    if(active)models.get(active).product.visible=false;
    if(!models.has(id)){
      const product=new T.Group();
      (id==='bbq'?skewerKit:reunionKit)(product);
      const box=new T.Box3().setFromObject(product);
      product.position.sub(box.getCenter(new T.Vector3()));
      product.traverse(part=>{if(part.isMesh){part.castShadow=true;part.receiveShadow=true}});
      scene.add(product);models.set(id,{product,box});
    }
    active=id;
    const model=models.get(id);
    model.product.visible=true;bounds=model.box;center=bounds.getCenter(new T.Vector3());
  }
  selectModel(journey?'bbq':article.id);
  renderer.shadowMap.enabled=true;
  renderer.shadowMap.type=T.PCFSoftShadowMap;
  // Broad studio reflections define the tray lip, foil seals and satin handles.
  const studio=texture(512,256,c=>{
    c.fillStyle='#242327';c.fillRect(0,0,512,256);
    c.fillStyle='#ffeacb';c.fillRect(50,25,104,64);
    c.fillStyle='#eeeef5';c.fillRect(318,48,24,75);
    c.fillStyle='#ad805d';c.fillRect(394,80,64,36);
  });
  studio.mapping=T.EquirectangularReflectionMapping;
  scene.environment=studio;
  scene.add(new T.HemisphereLight(0xffead6,0x695951,.76));
  const key=new T.DirectionalLight(0xffe2bb,3.1);key.position.set(-5,7,3);
  key.castShadow=true;key.shadow.mapSize.set(1024,1024);
  key.shadow.normalBias=.012;scene.add(key);
  const rim=new T.DirectionalLight(0xffdbab,2.4);rim.position.set(3,4,-5);scene.add(rim);
  const fill=new T.DirectionalLight(0xc9dcff,.61);fill.position.set(2,2,5);scene.add(fill);
  const floor=new T.Mesh(new T.PlaneGeometry(30,30),new T.ShadowMaterial({opacity:.25,depthWrite:false}));
  floor.rotation.x=-Math.PI/2;floor.position.y=bounds.min.y-center.y-.015;floor.receiveShadow=true;
  scene.add(floor);
  const camera=new T.PerspectiveCamera(34,1,.1,120);
  const canvas=renderer.domElement;
  canvas.tabIndex=0;canvas.setAttribute('aria-label',poster.alt+' · 3D');
  stage.append(canvas);
  const tools=article.querySelector('.model-tools');
  const controls=new OrbitControls(camera,canvas);
  controls.enablePan=false; controls.enableZoom=false;controls.rotateSpeed=.78;
  const render=()=>renderer.render(scene,camera);
  if(!journey)controls.addEventListener('change',render);
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
  if(journey){
    canvas.tabIndex=-1;canvas.setAttribute('aria-hidden','true');controls.enabled=false;
    const ingredients=new T.Group();scene.add(ingredients);
    for(let i=0;i<12;i++){
      const bit=orb(ingredients,0,0,0,.20,.19,.21,[beef,fish,golden][i%3]);
      bit.rotation.y=i*2.4;
    }
    let last='';
    stage.addEventListener('journey-pose',({detail:{kit,angle,burst}})=>{
      const key=[kit,angle,burst].join('/');
      if(last===key)return;
      last=key;
      const changed=active!==kit;
      selectModel(kit);
      floor.position.y=bounds.min.y-center.y-.015;
      if(changed)fit();
      const distance=camera.position.length();
      camera.position.copy(home).applyAxisAngle(new T.Vector3(0,1,0),angle).multiplyScalar(distance);
      ingredients.visible=burst>0&&burst<1;
      ingredients.children.forEach((bit,i)=>{
        const theta=i*2.399+burst*.7;
        const radius=2.1+burst*3.6;
        bit.position.set(Math.cos(theta)*radius,1.2*Math.sin(i*4.1)+burst,Math.sin(theta)*radius);
        bit.scale.setScalar(.22*Math.sin(Math.PI*burst));
        if(i%3===2)bit.material=kit==='gift'?prawn:golden;
      });
      controls.update();render();
    });
    fit();stage.classList.add('ready');stage.dispatchEvent(new Event('journey-ready'));
    canvas.addEventListener('webglcontextlost',()=>{canvas.style.display='none';stage.classList.remove('ready')});
    return;
  }
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
mount(document.querySelector('.journey-object'),true);
const nearby=new IntersectionObserver(entries=>{
  for(const entry of entries){
    if(!entry.isIntersecting)continue;
    nearby.unobserve(entry.target);
    mount(entry.target);
  }
},{rootMargin:'600px'});
document.querySelectorAll('.chapter').forEach(article=>nearby.observe(article));
