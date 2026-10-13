export function buildHouse(THREE,textureFactory){
 const group=new THREE.Group(),roof=new THREE.Group(),frontWalls=new THREE.Group(),floors=new THREE.Group(),toilet=new THREE.Group(),wallPanel=new THREE.Group();
 const mat=(color,extra={})=>new THREE.MeshStandardMaterial({color,roughness:.78,...extra});
 const materials={plaster:mat('#d7d2c8',{map:textureFactory?.('stucco'),bumpMap:textureFactory?.('stucco'),bumpScale:.025}),wood:mat('#947452',{map:textureFactory?.('wood')}),floor:mat('#b4926b',{map:textureFactory?.('floor')}),tile:mat('#cdccc5',{map:textureFactory?.('tile')}),concrete:mat('#8a8780'),soil:mat('#675040'),grass:mat('#3e5338',{map:textureFactory?.('grass')}),pipe:mat('#34393c',{roughness:.55}),copper:mat('#b46b3e',{metalness:.66,roughness:.3}),chrome:mat('#a8b4bb',{metalness:.9,roughness:.18}),ceramic:mat('#f0f1ec',{roughness:.36}),roof:mat('#484d54',{map:textureFactory?.('roof')}),glass:mat('#9bbfc4',{transparent:true,opacity:.25,roughness:.12}),red:mat('#ab2530'),blue:mat('#235681'),dark:mat('#222528'),linen:mat('#a2a39a')};
 const unit=new THREE.BoxGeometry(1,1,1);let meshes=0;
 function box(w,h,d,x,y,z,material,parent=group){const m=new THREE.Mesh(unit,material);m.scale.set(w,h,d);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);meshes++;return m}
 function cylinder(radius,height,x,y,z,material,parent=group,segments=16){const m=new THREE.Mesh(new THREE.CylinderGeometry(radius,radius,height,segments),material);m.position.set(x,y,z);m.castShadow=true;parent.add(m);meshes++;return m}
 function pipe(a,b,r,material=materials.pipe,parent=group){const start=new THREE.Vector3(...a),end=new THREE.Vector3(...b),delta=end.clone().sub(start);const m=cylinder(r,delta.length(),0,0,0,material,parent);m.position.copy(start.add(end).multiplyScalar(.5));m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());return m}
 function ring(radius,tube,x,y,z,material,parent=group){const m=new THREE.Mesh(new THREE.TorusGeometry(radius,tube,8,28),material);m.rotation.x=-Math.PI/2;m.position.set(x,y,z);parent.add(m);meshes++;return m}
 group.add(roof,frontWalls,floors,toilet,wallPanel);
 // Lawn and an exposed ground cutaway around the exterior drain route.
 box(13,.36,12,0,-.90,0,materials.soil);box(10.2,.12,12,-1.4,-.32,0,materials.grass);box(2.7,.12,6.8,5.15,-.32,-2.6,materials.grass);box(.8,.12,5.2,6.1,-.32,3.4,materials.grass);
 box(4.7,.12,2.7,-.1,-.21,4.5,materials.concrete);box(8.2,.14,6.2,0,.03,0,materials.concrete,floors);
 box(5.9,.055,5.8,1.02,.14,0,materials.floor,floors);box(2.1,.06,2.9,-2.83,.15,-1.43,materials.tile,floors);
 for(let z=-2.8;z<=2.8;z+=.55)box(7.7,.15,.075,0,-.14,z,materials.wood);
 for(const x of [-3.6,3.6])for(const z of [-2.6,0,2.6])box(.35,.4,.35,x,-.34,z,materials.concrete);
 // Back and side walls remain while the front planes reveal the interior.
 // Real openings: walls stop at window jambs instead of hiding glass behind plaster.
 const backWindows=[-2.8,-.4,2.2];let edge=-4;
 for(const x of backWindows){const left=x-.675,right=x+.675;box(left-edge,2.8,.16,(edge+left)/2,1.55,-3,materials.plaster);box(1.35,.91,.16,x,.605,-3,materials.plaster);box(1.35,.52,.16,x,2.69,-3,materials.plaster);edge=right;}
 box(4-edge,2.8,.16,(edge+4)/2,1.55,-3,materials.plaster);box(.16,2.8,6,-4,1.55,0,materials.plaster);box(.16,2.8,6,4,1.55,0,materials.plaster,frontWalls);// Front door and living-room window have actual wall openings.
 box(3.675,2.8,.16,-2.1625,1.55,3,materials.plaster,frontWalls);
 box(.775,2.8,.16,.9625,1.55,3,materials.plaster,frontWalls);
 box(.95,.70,.16,.15,2.60,3,materials.plaster,frontWalls);
 box(1.7,.98,.16,2.2,.64,3,materials.plaster,frontWalls);
 box(1.7,.425,.16,2.2,2.7375,3,materials.plaster,frontWalls);
 box(.95,2.8,.16,3.525,1.55,3,materials.plaster,frontWalls);
 box(.12,2.4,3,-1.65,1.35,-1.5,materials.plaster);box(.72,2.4,.1,-3.62,1.35,0,materials.plaster);box(.64,2.4,.1,-1.97,1.35,0,materials.plaster);box(.94,.35,.1,-2.82,2.38,0,materials.plaster);
 box(2.3,2.3,.1,-2.83,1.3,-2.88,materials.plaster,wallPanel);
 for(let x=-3.65;x<=-1.9;x+=.43)box(.06,2.4,.10,x,1.4,-2.75,materials.wood);
 box(2.1,.09,.13,-2.83,.25,-2.75,materials.wood);box(2.1,.09,.13,-2.83,2.55,-2.75,materials.wood);
 // Exterior window panes, trim and a front-door panel.
 for(const x of [-2.8,-.4,2.2]){box(1.35,1.3,.05,x,1.75,-3.1,materials.glass);for(const dx of [-.69,.69])box(.055,1.4,.08,x+dx,1.75,-3.11,materials.wood);for(const y of [1.07,2.43])box(1.45,.06,.08,x,y,-3.11,materials.wood)}
 box(.95,2.1,.07,.15,1.2,3.1,materials.wood,frontWalls);box(1.7,1.35,.04,2.2,1.85,3.11,materials.glass,frontWalls);box(.06,1.35,.06,2.2,1.85,3.12,materials.chrome,frontWalls);
 // Pitch-roof planes and exposed timber ridge.
 const angle=Math.atan2(1.35,3.1),slope=Math.hypot(3.1,1.35);for(const sign of [-1,1]){const r=box(8.55,.14,slope,0,3.45,sign*1.55,materials.roof,roof);r.rotation.x=sign*angle}
 box(8.3,.12,.13,0,4.05,0,materials.wood);for(let x=-3.8;x<=3.8;x+=1.25){pipe([x,2.8,-3],[x,4.05,0],.04,materials.wood);pipe([x,4.05,0],[x,2.8,3],.04,materials.wood)}
 // Shower, porcelain fixtures and the exposed toilet flange.
 box(1.2,.12,1.2,-3.05,.27,-2.08,materials.ceramic);box(1.2,1.9,.035,-3.05,1.28,-1.5,materials.glass);box(.035,1.9,1.2,-2.46,1.28,-2.08,materials.glass);
 pipe([-3.13,.8,-2.76],[-3.13,2.2,-2.76],.022,materials.chrome);pipe([-3.13,2.2,-2.76],[-3.13,2.2,-2.40],.022,materials.chrome);cylinder(.105,.025,-3.13,2.18,-2.4,materials.chrome);
 const bowlProfile=[new THREE.Vector2(.14,0),new THREE.Vector2(.16,.18),new THREE.Vector2(.28,.33),new THREE.Vector2(.32,.44),new THREE.Vector2(.29,.49)];const bowl=new THREE.Mesh(new THREE.LatheGeometry(bowlProfile,28),materials.ceramic);bowl.position.set(-2.8,.24,-.58);toilet.add(bowl);meshes++;
 const seat=ring(.29,.035,-2.8,.74,-.58,materials.ceramic,toilet);seat.scale.z=1.12;box(.48,.52,.18,-2.8,.79,-.88,materials.ceramic,toilet);ring(.145,.035,-2.8,.195,-.58,materials.copper);cylinder(.11,.22,-2.8,.02,-.58,materials.pipe);
 box(.85,.8,.52,-2.14,.62,-1.55,materials.wood);box(.94,.085,.60,-2.14,1.05,-1.55,materials.ceramic);ring(.19,.06,-2.14,1.08,-1.55,materials.ceramic);pipe([-2.38,1.13,-1.79],[-2.38,1.4,-1.79],.015,materials.chrome);pipe([-2.38,1.4,-1.79],[-2.20,1.4,-1.65],.015,materials.chrome);
 // Kitchen and living-area details make the model read as a home.
 for(let x=.4;x<3.7;x+=.85){box(.79,.85,.72,x,.61,-2.5,materials.wood);box(.69,.69,.04,x,.61,-2.12,materials.plaster);box(.15,.025,.025,x,.81,-2.09,materials.chrome)}
 box(3.95,.09,.84,1.9,1.08,-2.5,materials.concrete);box(.62,.04,.46,1.65,1.14,-2.49,materials.chrome);pipe([1.65,1.16,-2.76],[1.65,1.5,-2.76],.019,materials.chrome);pipe([1.65,1.5,-2.76],[1.65,1.5,-2.52],.019,materials.chrome);
 box(1.8,.38,.85,2,.44,1.35,materials.linen);box(1.8,.50,.20,2,.86,1.70,materials.linen);box(.2,.62,.85,1.02,.60,1.35,materials.linen);box(.2,.62,.85,2.98,.60,1.35,materials.linen);box(1.15,.07,.65,.2,.61,1.4,materials.wood);for(const x of [-.25,.65])for(const z of [1.17,1.63])box(.055,.45,.055,x,.36,z,materials.wood);
 // Human-scale architectural details: fascia, gutters, porch, furnishings and utility equipment.
 const trim=mat('#f2eee5'),stone=mat('#c4b7a2'),fabric=mat('#777e78');
 for(const z of [-3.12,3.12]){box(8.65,.18,.15,0,2.90,z,trim,roof);pipe([-4.25,2.81,z],[4.25,2.81,z],.055,materials.chrome,roof);}
 for(const x of [-4.06,4.06]){const shape=new THREE.Shape();shape.moveTo(-3,0);shape.lineTo(3,0);shape.lineTo(0,1.35);shape.closePath();const gable=new THREE.Mesh(new THREE.ShapeGeometry(shape),mat('#d7d2c8',{side:THREE.DoubleSide}));gable.rotation.y=Math.PI/2;gable.position.set(x,2.8,0);roof.add(gable);meshes++;}
 // Stucco corner trim, foundation skirting and window mullions.
 for(const x of [-4.09,4.09])for(const z of [-3.07,3.07])box(.12,2.8,.12,x,1.55,z,trim,frontWalls);
 for(const x of [-2.8,-.4,2.2]){box(.035,1.3,.07,x,1.75,-3.12,trim);box(1.35,.035,.07,x,1.75,-3.12,trim);box(1.52,.08,.22,x,1.03,-3.12,stone);}
 box(1.85,.08,.20,2.2,1.13,3.14,trim,frontWalls);box(1.85,.08,.10,2.2,2.56,3.14,trim,frontWalls);
 box(.035,1.35,.07,2.2,1.85,3.15,trim,frontWalls);box(1.7,.035,.07,2.2,1.85,3.15,trim,frontWalls);
 box(.70,.025,.04,.15,2.03,3.15,trim,frontWalls);box(.70,.025,.04,.15,.49,3.15,trim,frontWalls);cylinder(.035,.035,.46,1.20,3.17,materials.chrome,frontWalls).rotation.x=Math.PI/2;
 box(2.25,.14,1.3,.15,.10,3.7,stone);box(2.50,.12,.40,.15,-.07,4.5,stone);box(2.75,.1,.4,.15,-.18,4.85,stone);
 box(2.55,.10,1.6,.15,2.65,3.65,materials.roof,frontWalls);for(const x of [-.95,1.25])box(.10,2.45,.10,x,1.34,4.28,trim,frontWalls);
 // Furnished living space and appliance proportions.
 box(2.1,.015,1.65,1.3,.19,1.2,fabric,floors);for(const x of [1.55,2.4])box(.72,.12,.70,x,.67,1.32,fabric);
 box(.66,1.68,.67,3.5,1.05,-1.4,materials.ceramic);box(.60,.015,.035,3.5,1.08,-1.055,materials.chrome);box(.025,.42,.03,3.72,1.53,-1.05,materials.chrome);
 box(.80,.025,.62,.80,1.145,-2.48,materials.dark);for(const x of [.57,1.02])for(const z of [-2.65,-2.32])ring(.10,.013,x,1.165,z,materials.chrome);
 // Water heater and vent connect to a plausible utility zone.
 cylinder(.32,1.35,3.36,.90,-2.45,materials.ceramic);cylinder(.22,.09,3.36,1.61,-2.45,materials.chrome);pipe([3.36,1.66,-2.45],[3.36,3.45,-2.45],.055,materials.chrome,roof);
 pipe([3.14,1.59,-2.45],[2.75,1.59,-2.77],.024,materials.copper);pipe([3.55,1.59,-2.45],[3.5,1.9,-2.77],.024,materials.copper);
 // A defined service trench exposes buried pipe without floating plumbing on the lawn.
 box(.10,.40,4.9,4.83,-.52,3.2,materials.soil);box(.10,.40,4.9,5.37,-.52,3.2,materials.soil);
 for(const z of [-4.6,-3.6,-2.6,-1.6,-.6,.4,1.4,2.4,3.4,4.4])box(.08,1.1,.10,-6.1,.23,z,materials.wood);
 for(const y of [.15,.60])box(.07,.07,10.1,-6.1,y,-.1,materials.wood);
 // Visible supply circuits and the underfloor/exterior drainage network.
 pipe([-3.65,.35,-2.69],[-3.65,2.4,-2.69],.024,materials.red);pipe([-3.51,.35,-2.69],[-3.51,2.4,-2.69],.024,materials.blue);
 pipe([2.75,.3,-2.77],[2.75,1.9,-2.77],.03,materials.copper);pipe([2.75,1.9,-2.77],[3.5,1.9,-2.77],.03,materials.copper);pipe([3.5,1.9,-2.77],[3.5,.7,-2.77],.03,materials.copper);pipe([2.75,.7,-2.77],[3.5,.7,-2.77],.03,materials.copper);
 pipe([-3.0,-.40,1.5],[5.1,-.40,1.5],.12);pipe([-2.8,-.05,-.58],[-2.8,-.40,1.5],.09);pipe([-3.1,.15,-2.4],[-3.1,-.4,-2.4],.065);pipe([-3.1,-.4,-2.4],[-2.8,-.4,-.58],.065);pipe([1.65,.5,-2.49],[1.65,-.4,-2.49],.06);pipe([1.65,-.4,-2.49],[1.65,-.4,1.5],.07);
 pipe([5.1,-.4,1.5],[5.1,-.4,5.3],.12);pipe([5.1,-.4,1.5],[5.1,.27,1.5],.11);cylinder(.145,.055,5.1,.29,1.5,materials.pipe);
 // Exterior wall supply assembly, matching the visible context of the copper work.
 pipe([4.18,.25,-1.9],[4.18,.9,-1.9],.04,materials.copper);pipe([4.18,.9,-1.9],[4.18,.9,-.75],.04,materials.copper);pipe([4.18,.9,-.75],[4.18,.25,-.75],.04,materials.copper);pipe([4.18,.9,-1.35],[4.18,.35,-1.35],.03,materials.copper);box(.14,.035,.04,4.18,.37,-1.35,materials.red);
 // Detail cut section is visibly part of the model drain, not an invented room assignment.
 ring(.15,.035,5.1,-.4,3.1,materials.ceramic).rotation.x=0;
 for(const [x,z]of [[-5,-3.8],[-5,4.8],[5.2,-4.8]]){cylinder(.12,1.15,x,.2,z,materials.wood);const shrub=new THREE.Mesh(new THREE.SphereGeometry(.65,16,10),materials.grass);shrub.position.set(x,1.0,z);group.add(shrub);meshes++;}
 const zones={wall:new THREE.Vector3(-3.3,1.45,-2.66),toilet:new THREE.Vector3(-2.8,.55,-.58),underfloor:new THREE.Vector3(-.4,-.40,1.5),supply:new THREE.Vector3(4.22,.75,-1.35),buried:new THREE.Vector3(5.1,-.4,1.5),outdoor:new THREE.Vector3(.3,-.05,4.7),'pipe-interior':new THREE.Vector3(5.1,-.4,3.1)};
 function setMode(mode,zone){roof.visible=mode==='exterior';frontWalls.visible=mode==='exterior';floors.visible=zone!=='underfloor';toilet.visible=zone!=='toilet';wallPanel.visible=mode==='exterior';}
 setMode('cutaway',null);return {group,zones,setMode,materials,meshCount:meshes};
}
export async function attachHouse(stage,host,onProject){
 const THREE=await import('./vendor/three.module.js');
 const textureFactory=kind=>{const canvas=document.createElement('canvas');canvas.width=canvas.height=128;const c=canvas.getContext('2d');if(!c)return null;const palettes={stucco:['#d7d2c8','#bdb7aa'],wood:['#9a7956','#745335'],floor:['#b8946b','#997349'],tile:['#cbc9c1','#9d9e97'],grass:['#465c3c','#34482d'],roof:['#52575c','#393f44']};const [base,line]=palettes[kind];c.fillStyle=base;c.fillRect(0,0,128,128);c.strokeStyle=line;c.lineWidth=kind==='tile'?1:2;
  if(kind==='stucco'){let seed=73;for(let i=0;i<7000;i++){seed=(seed*1664525+1013904223)>>>0;const x=seed%128;seed=(seed*1664525+1013904223)>>>0;const y=seed%128;c.fillStyle=i%3?'#c9c4b9':'#e2ddd3';c.fillRect(x,y,1,1)}}else if(kind==='tile'){for(let i=0;i<=128;i+=32){c.beginPath();c.moveTo(i,0);c.lineTo(i,128);c.moveTo(0,i);c.lineTo(128,i);c.stroke()}}
  else if(kind==='grass'){for(let i=0;i<450;i++){const x=(i*37)%128,y=(i*61)%128;c.fillStyle=i%2?line:'#546846';c.fillRect(x,y,1,3)}}
  else{const step=kind==='roof'?16:12;for(let y=0;y<128;y+=step){c.beginPath();c.moveTo(0,y);c.lineTo(128,y+(kind==='wood'?2:0));c.stroke();if(kind==='floor'){c.beginPath();c.moveTo((y*7)%128,y);c.lineTo((y*7)%128,y+step);c.stroke()}}}
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.repeat.set(kind==='grass'?6:2,kind==='grass'?6:2);return texture;};
 const renderer=new THREE.WebGLRenderer({alpha:true,antialias:innerWidth>820,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(devicePixelRatio||1,innerWidth<=820?1:1.5));renderer.shadowMap.enabled=innerWidth>520;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.setClearColor(0x171b1d,1);renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;host.append(renderer.domElement);
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(40,1,.1,80),house=buildHouse(THREE,textureFactory);scene.add(house.group);const studio=new THREE.Scene();studio.add(new THREE.HemisphereLight(0xffffff,0x727267,2));for(const [x,y,z,color]of [[-8,8,2,0xffffff],[6,5,-5,0xc9d9ee],[0,10,0,0xffe9ca]]){const panel=new THREE.Mesh(new THREE.BoxGeometry(6,6,.1),new THREE.MeshBasicMaterial({color}));panel.position.set(x,y,z);panel.lookAt(0,0,0);studio.add(panel)}const pmrem=new THREE.PMREMGenerator(renderer),environment=pmrem.fromScene(studio,.06);scene.environment=environment.texture;pmrem.dispose();scene.add(new THREE.HemisphereLight(0xe6e9ed,0x655441,1.4));
 const sun=new THREE.DirectionalLight(0xffe7c9,3.2);sun.position.set(-5,12,8);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-9;sun.shadow.camera.right=9;sun.shadow.camera.top=9;sun.shadow.camera.bottom=-9;sun.shadow.normalBias=.025;scene.add(sun);const fill=new THREE.DirectionalLight(0xc2d5ef,.8);fill.position.set(8,4,-5);scene.add(fill);
 const overview=new THREE.Vector3(12,9.5,13),overviewTarget=new THREE.Vector3(0,.75,.4);let target=overviewTarget.clone(),mode='cutaway',active=null,animation=0,disposed=false;
 camera.position.copy(overview);const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 function draw(){if(disposed)return;camera.lookAt(target);renderer.render(scene,camera);const rect=stage.getBoundingClientRect();const points={};for(const [id,position]of Object.entries(house.zones)){const projected=position.clone().project(camera);points[id]={x:(projected.x+1)*.5*rect.width,y:(1-projected.y)*.5*rect.height,visible:projected.z<1&&projected.x>-.96&&projected.x<.96&&projected.y>-.94&&projected.y<.94};}onProject(points);}
 function overviewPosition(){return overviewTarget.clone().add(overview.clone().sub(overviewTarget).multiplyScalar(Math.max(1,1.25/camera.aspect)))}
 function size(){const rect=stage.getBoundingClientRect();if(!rect.width||!rect.height)return;renderer.setSize(rect.width,rect.height,false);camera.aspect=rect.width/rect.height;camera.updateProjectionMatrix();if(!active){camera.position.copy(overviewPosition());target.copy(overviewTarget)}draw()}
 function flight(position,look){cancelAnimationFrame(animation);const start=camera.position.clone(),startTarget=target.clone(),time=performance.now(),duration=reduced.matches?0:650;
  function step(now){const t=duration?Math.min(1,(now-time)/duration):1,k=1-Math.pow(1-t,3);camera.position.lerpVectors(start,position,k);target.lerpVectors(startTarget,look,k);draw();if(t<1)animation=requestAnimationFrame(step)}animation=requestAnimationFrame(step);}
 function select(id){active=id;mode='cutaway';house.setMode(mode,id);const point=house.zones[id];if(!point){flight(overviewPosition(),overviewTarget);return}const offsets={wall:[3.8,2.7,5.2],toilet:[3.3,2.7,3.8],underfloor:[4,1.4,5],supply:[4.5,2.2,3.5],buried:[3.5,2.3,4.2],outdoor:[6,4.8,6],'pipe-interior':[2.7,1.8,3.3]};flight(point.clone().add(new THREE.Vector3(...offsets[id]).multiplyScalar(Math.max(1,1.1/camera.aspect))),point)}
 const resize=new ResizeObserver(size);resize.observe(stage);let pointer=null;
 function down(event){if(event.target.closest('button'))return;cancelAnimationFrame(animation);pointer={id:event.pointerId,x:event.clientX};stage.setPointerCapture?.(event.pointerId)}
 function move(event){if(!pointer||event.pointerId!==pointer.id)return;const dx=event.clientX-pointer.x;pointer.x=event.clientX;const vector=camera.position.clone().sub(target),angle=dx*.007;vector.applyAxisAngle(new THREE.Vector3(0,1,0),-angle);camera.position.copy(target).add(vector);draw()}
 function up(){pointer=null}stage.addEventListener('pointerdown',down);stage.addEventListener('pointermove',move);stage.addEventListener('pointerup',up);stage.addEventListener('pointercancel',up);size();
 return {select,setView(view){mode=view;active=null;house.setMode(mode,null);flight(overviewPosition(),overviewTarget)},reset(){active=null;house.setMode(mode,null);flight(overviewPosition(),overviewTarget)},dispose(){disposed=true;cancelAnimationFrame(animation);resize.disconnect();stage.removeEventListener('pointerdown',down);stage.removeEventListener('pointermove',move);stage.removeEventListener('pointerup',up);stage.removeEventListener('pointercancel',up);environment.dispose();studio.traverse(o=>{o.geometry?.dispose();o.material?.dispose()});renderer.dispose();scene.traverse(o=>{o.geometry?.dispose();if(o.material){for(const m of Array.isArray(o.material)?o.material:[o.material]){m.map?.dispose();m.dispose()}}});renderer.domElement.remove()}};
}
