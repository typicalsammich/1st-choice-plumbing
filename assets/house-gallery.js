(() => {
 'use strict';
 const root=document.querySelector('[data-house-gallery]'),data=window.CHOICE_GALLERY;if(!root||!data)return;
 const {items,zones}=data,dialog=document.querySelector('.house-lightbox'),stage=root.querySelector('.house-stage');
 const find=s=>root.querySelector(s),modal=s=>dialog.querySelector(s),text=(en,es)=>lang==='es'?es:en;
 let lang='en',selected=0,zone=null,model=null,mode='cutaway',savedOverflow='',opener;
 try{lang=localStorage.getItem('choice-lang')==='es'?'es':'en'}catch{}
 const current=()=>items[selected],filtered=()=>zone?items.filter(i=>i.zone===zone):items;
 const fallbackPositions={wall:[27,39],toilet:[39,54],underfloor:[48,71],supply:[68,39],buried:[82,68],outdoor:[31,85],'pipe-interior':[71,84]};
 const hotButtons=[],areaButtons=[],catalogueButtons=[];
 const leaders=document.createElementNS('http://www.w3.org/2000/svg','svg');leaders.classList.add('house-leaders');leaders.setAttribute('aria-hidden','true');stage.append(leaders);const leaderLines={};
 zones.forEach((area,index)=>{
  const hotspot=document.createElement('button');hotspot.type='button';hotspot.className='house-hotspot';hotspot.textContent=String(index+1).padStart(2,'0');hotspot.dataset.zone=area.id;hotspot.style.left=fallbackPositions[area.id][0]+'%';hotspot.style.top=fallbackPositions[area.id][1]+'%';hotspot.addEventListener('click',()=>selectZone(area.id));find('.house-hotspots').append(hotspot);hotButtons.push(hotspot);
  const line=document.createElementNS('http://www.w3.org/2000/svg','line');leaders.append(line);leaderLines[area.id]=line;
  const button=document.createElement('button');button.type='button';button.className='house-area-button';button.dataset.zone=area.id;button.innerHTML=`<span aria-hidden="true">${String(index+1).padStart(2,'0')}</span><span class="house-area-name"></span><small></small>`;button.addEventListener('click',()=>selectZone(area.id));find('.house-area-list').append(button);areaButtons.push(button);
 });
 items.forEach((item,index)=>{
  const button=document.createElement('button');button.type='button';button.className='house-media-item';button.dataset.index=index;
  const img=document.createElement('img');img.src=item.thumbnail;img.alt='';img.loading='lazy';img.width=160;img.height=160;
  const label=document.createElement('span');label.className='house-media-name';const area=document.createElement('small');area.className='house-media-area';button.append(img,label,area);
  button.addEventListener('click',()=>{selected=index;render();openModal()});find('.house-media-list').append(button);catalogueButtons.push(button);
 });
 function render(){const item=current(),list=filtered();
  find('.house-selected-area').textContent=item[lang==='es'?'areaEs':'areaEn'];find('.house-item-position').textContent=String(list.indexOf(item)+1).padStart(2,'0')+' / '+String(list.length).padStart(2,'0');
  const image=find('.house-inspect-image img');image.src=item.poster;image.alt=item[lang]+' — '+item[lang==='es'?'descriptionEs':'descriptionEn'];image.width=item.width;image.height=item.height;
  find('.house-item-title').textContent=item[lang];find('.house-item-description').textContent=item[lang==='es'?'descriptionEs':'descriptionEn'];find('.house-open-label').textContent=text(item.type==='video'?'Open film':'Inspect this detail',item.type==='video'?'Abrir video':'Ver este detalle');
  find('.house-inspect-image').setAttribute('aria-label',text('Open: ','Abrir: ')+item[lang]);
  zones.forEach((area,i)=>{const amount=items.filter(item=>item.zone===area.id).length;hotButtons[i].setAttribute('aria-label',area[lang]+' · '+amount+' '+text('views','vistas'));hotButtons[i].setAttribute('aria-pressed',String(zone===area.id));hotButtons[i].classList.toggle('active',zone===area.id);areaButtons[i].querySelector('.house-area-name').textContent=area[lang];areaButtons[i].querySelector('small').textContent=amount+' '+text('views','vistas');areaButtons[i].setAttribute('aria-pressed',String(zone===area.id));areaButtons[i].classList.toggle('active',zone===area.id)});
  catalogueButtons.forEach((button,i)=>{const item=items[i];button.hidden=!!zone&&item.zone!==zone;button.querySelector('.house-media-name').textContent=item[lang];button.querySelector('.house-media-area').textContent=text(item.type==='video'?'Film · ':'Photo · ',item.type==='video'?'Video · ':'Foto · ')+item[lang==='es'?'areaEs':'areaEn'];button.setAttribute('aria-label',text('Open full detail: ','Abrir detalle completo: ')+item[lang]);button.setAttribute('aria-pressed',String(i===selected));button.classList.toggle('active',i===selected)});
  find('.house-all').setAttribute('aria-pressed',String(!zone));find('.house-catalogue-top h2').textContent=text(zone?'Work in this area':'The full work journal',zone?'Trabajo en esta área':'El registro completo del trabajo');
  find('.house-model-status').textContent=text(model?'Select an area to move closer. The house is representative.':'House plan view. All photographs and films remain available below.',model?'Elige un área para acercarte. La casa es representativa.':'Vista en plano. Todas las fotos y videos están disponibles abajo.');const note=find('.house-stage-note');note.dataset.en=model?'Choose a numbered area. Drag the model to look around.':'Choose a numbered area to see the work.';note.dataset.es=model?'Elige un área numerada. Arrastra el modelo para mirar alrededor.':'Elige un área numerada para ver el trabajo.';note.textContent=note.dataset[lang];
 }
 function setMode(value){mode=value;root.querySelectorAll('[data-house-view]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.houseView===mode)));model?.setView(value);stage.dataset.view=value;}
 function selectZone(id){zone=id;const list=filtered();if(!list.length){zone=null;return}if(current().zone!==id)selected=items.indexOf(list[0]);mode='cutaway';root.querySelectorAll('[data-house-view]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.houseView==='cutaway')));model?.select(id);stage.dataset.view='cutaway';render();if(matchMedia('(max-width: 820px)').matches)openModal();}
 function showAll(){zone=null;render();model?.reset();}
 find('.house-all').addEventListener('click',showAll);find('.house-reset').addEventListener('click',()=>{zone=null;setMode('cutaway');model?.reset();render()});root.querySelectorAll('[data-house-view]').forEach(button=>button.addEventListener('click',()=>setMode(button.dataset.houseView)));
 function move(delta){const list=filtered(),index=list.indexOf(current());selected=items.indexOf(list[(index+delta+list.length)%list.length]);render();if(dialog.open)renderModal(false)}
 find('.house-previous').addEventListener('click',()=>move(-1));find('.house-next').addEventListener('click',()=>move(1));
 function feedback(kind){const el=modal('.house-playback-status');el.hidden=false;el.dataset.kind=kind;el.textContent=kind==='play'?text('Use the video controls to start playback.','Usa los controles del video para reproducirlo.'):text('This media could not load. Choose another detail.','No se pudo cargar este archivo. Elige otro detalle.');}
 function stopVideo(){const video=modal('video');video.pause();video.removeAttribute('src');video.load();modal('.house-playback-status').hidden=true;}
 function modalLabels(){const item=current();modal('.house-lightbox-area').textContent=item[lang==='es'?'areaEs':'areaEn'];modal('.house-lightbox-title').textContent=item[lang];modal('.house-lightbox-description').textContent=item[lang==='es'?'descriptionEs':'descriptionEn'];modal('.house-lightbox-placement').textContent=item[lang==='es'?'detailsEs':'detailsEn'];modal('.house-lightbox-type').textContent=text(item.type==='video'?'SITE FILM':'PHOTOGRAPH',item.type==='video'?'VIDEO DEL TRABAJO':'FOTOGRAFÍA');modal('img').alt=item[lang];modal('video').setAttribute('aria-label',item[lang]);}
 function renderModal(play){const item=current(),image=modal('img'),video=modal('video');stopVideo();modalLabels();image.hidden=item.type==='video';video.hidden=item.type!=='video';
  if(item.type==='video'){image.removeAttribute('src');video.src=item.src;video.poster=item.poster;video.muted=true;video.load();if(play)video.play()?.catch(()=>{if(dialog.open&&!video.hidden)feedback('play')})}
  else{image.src=item.src;}
 }
 function openModal(){if(typeof dialog.showModal!=='function'){window.open(current().src,'_blank','noopener');return}opener=document.activeElement?.closest('button')||find('.house-inspect-image');savedOverflow=document.body.style.overflow;if(!dialog.open)dialog.showModal();dialog.scrollTop=0;document.body.style.overflow='hidden';renderModal(true);modal('.house-close').focus();}
 find('.house-inspect-image').addEventListener('click',openModal);modal('.house-close').addEventListener('click',()=>dialog.close());modal('.house-modal-prev').addEventListener('click',()=>move(-1));modal('.house-modal-next').addEventListener('click',()=>move(1));
 modal('video').addEventListener('error',()=>{if(dialog.open&&!modal('video').hidden)feedback('error')});modal('img').addEventListener('error',()=>{if(dialog.open&&!modal('img').hidden)feedback('error')});
 dialog.addEventListener('close',()=>{stopVideo();document.body.style.overflow=savedOverflow;opener?.focus()});dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()});
 dialog.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();dialog.close();return}if(['ArrowLeft','ArrowRight'].includes(event.key)&&event.target.tagName!=='VIDEO'){event.preventDefault();move(event.key==='ArrowLeft'?-1:1)}if(event.key==='Tab'){const list=[...dialog.querySelectorAll('button,video[controls]')].filter(el=>!el.hidden&&el.getClientRects().length),first=list[0],last=list.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}}});
 function project(points){const rect=stage.getBoundingClientRect(),placed=[];leaders.setAttribute('viewBox',`0 0 ${rect.width} ${rect.height}`);
  zones.forEach((area,i)=>{const point=points[area.id],button=hotButtons[i],line=leaderLines[area.id];button.hidden=!point.visible;line.style.display=point.visible?'':'none';if(!point.visible)return;let x=point.x,y=point.y;
   for(let tries=0;tries<12&&placed.some(p=>Math.hypot(p.x-x,p.y-y)<48);tries++){y+=tries%2?-(tries+1)*12:(tries+1)*12;x=Math.min(rect.width-24,Math.max(24,x));y=Math.min(rect.height-38,Math.max(25,y));}
   placed.push({x,y});button.style.left=x+'px';button.style.top=y+'px';line.setAttribute('x1',point.x);line.setAttribute('y1',point.y);line.setAttribute('x2',x);line.setAttribute('y2',y);line.style.opacity=Math.hypot(x-point.x,y-point.y)>8?'.65':'0';
  });
 }
 let modelStarted=false;async function loadModel(){if(modelStarted)return;modelStarted=true;if(typeof WebGL2RenderingContext==='undefined')return;
  try{const module=await import('./house-model.js');model=await module.attachHouse(stage,find('.house-canvas-host'),project);stage.classList.add('has-3d');find('.house-fallback').setAttribute('hidden','');if(zone)model.select(zone);else model.setView(mode);render();modelCanvasFailure();}
  catch{find('.house-fallback').removeAttribute('hidden');stage.classList.remove('has-3d');model=null;render();}
 }
 function modelCanvasFailure(){find('canvas')?.addEventListener('webglcontextlost',event=>{event.preventDefault();model?.dispose();model=null;stage.classList.remove('has-3d');find('.house-fallback').removeAttribute('hidden');leaders.style.display='none';zones.forEach((area,i)=>{hotButtons[i].hidden=false;hotButtons[i].style.left=fallbackPositions[area.id][0]+'%';hotButtons[i].style.top=fallbackPositions[area.id][1]+'%'});render()},{once:true});}
 if(typeof IntersectionObserver==='function'){const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){loadModel();observer.disconnect()}},{rootMargin:'120px'});observer.observe(stage)}else loadModel();
 window.choiceHouseGallery={setLanguage(value){lang=value==='es'?'es':'en';render();if(dialog.open){modalLabels();if(!modal('.house-playback-status').hidden)feedback(modal('.house-playback-status').dataset.kind)}},selectZone,showAll,select(index){selected=Math.max(0,Math.min(items.length-1,index));zone=null;render()},open:openModal};
 addEventListener('pagehide',()=>{stopVideo();model?.dispose();model=null;modelStarted=false;stage.classList.remove('has-3d');find('.house-fallback').removeAttribute('hidden')});addEventListener('pageshow',event=>{if(event.persisted){loadModel();if(dialog.open)renderModal(false);render()}});render();
})();
