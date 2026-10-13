(() => {
 'use strict';
 const root=document.querySelector('[data-work-gallery]'),data=window.CHOICE_GALLERY;
 if(!root||!data?.items?.length)return;
 const {items,chapters}=data,dialog=document.querySelector('.work-lightbox');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const find=s=>root.querySelector(s),dlg=s=>dialog.querySelector(s);
 let lang='en',selected=0,sequence=0,timer,restoreOverflow='',opener;
 const text=(en,es)=>lang==='es'?es:en;
 const current=()=>items[selected];
 const activeChapter=()=>chapters.find(c=>c.id===current().chapter);
 const image=find('.work-main-image');
 const chapterButtons=chapters.map((chapter,i)=>{
  const button=document.createElement('button');button.type='button';button.className='work-chapter';button.dataset.chapter=chapter.id;
  const number=document.createElement('span');number.className='work-chapter-number';number.textContent=String(i+1).padStart(2,'0');number.setAttribute('aria-hidden','true');
  const name=document.createElement('span');name.className='work-chapter-name';button.append(number,name);
  button.addEventListener('click',()=>select(items.findIndex(item=>item.chapter===chapter.id)));
  button.addEventListener('keydown',event=>{
   if(!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
   event.preventDefault();const direction=['ArrowUp','ArrowLeft'].includes(event.key)?-1:1;
   const index=event.key==='Home'?0:event.key==='End'?chapters.length-1:(i+direction+chapters.length)%chapters.length;
   chapterButtons[index].click();chapterButtons[index].focus();
  });find('.work-chapters').append(button);return button;
 });
 let detailsChapter='';
 function renderDetails(){
  const chapter=current().chapter;
  if(detailsChapter!==chapter){
   detailsChapter=chapter;const strip=find('.work-details');strip.replaceChildren();
   items.forEach((item,index)=>{if(item.chapter!==chapter)return;
    const button=document.createElement('button');button.type='button';button.className='work-detail';button.dataset.index=index;
    const thumbnail=document.createElement('img');thumbnail.src=item.thumbnail;thumbnail.alt='';thumbnail.loading='lazy';thumbnail.width=160;thumbnail.height=160;
    const name=document.createElement('span');name.className='work-detail-name';
    const kind=document.createElement('small');kind.className='work-detail-kind';
    button.append(thumbnail,name,kind);button.addEventListener('click',()=>select(index));
    button.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const buttons=[...strip.children],position=buttons.indexOf(button);const next=event.key==='Home'?0:event.key==='End'?buttons.length-1:(position+(event.key==='ArrowLeft'?-1:1)+buttons.length)%buttons.length;buttons[next].click();buttons[next].focus()});strip.append(button);
   });
  }
  find('.work-details').querySelectorAll('.work-detail').forEach(button=>{
   const item=items[Number(button.dataset.index)],active=Number(button.dataset.index)===selected;
   button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));button.setAttribute('aria-label',item[lang]+' — '+text(item.type==='video'?'Film':'Photograph',item.type==='video'?'Video':'Fotografía'));
   button.querySelector('.work-detail-name').textContent=item[lang];button.querySelector('.work-detail-kind').textContent=text(item.type==='video'?'Film':'Photo',item.type==='video'?'Video':'Foto');
  });
 }
 function render(){
  const item=current(),chapter=activeChapter(),chapterIndex=chapters.indexOf(chapter);
  image.src=item.poster;image.alt=item[lang]+' — '+item[lang==='es'?'descriptionEs':'descriptionEn'];image.width=item.width;image.height=item.height;
  find('.work-view-kind').textContent=text(item.type==='video'?'SITE FILM':'PHOTOGRAPH',item.type==='video'?'VIDEO DEL TRABAJO':'FOTOGRAFÍA');
  find('.work-view-index').textContent=String(selected+1).padStart(2,'0')+' / '+String(items.length).padStart(2,'0');
  find('.work-title').textContent=item[lang];find('.work-description').textContent=item[lang==='es'?'descriptionEs':'descriptionEn'];
  find('.work-stage-cta span').textContent=text(item.type==='video'?'Open film':'Inspect full view',item.type==='video'?'Abrir video':'Ver detalle completo');
  find('.work-stage').setAttribute('aria-label',text(item.type==='video'?'Open film: ':'Open photograph: ',item.type==='video'?'Abrir video: ':'Abrir fotografía: ')+item[lang]);
  find('.work-chapter-note').textContent=chapter[lang==='es'?'introEs':'introEn'];
  find('.work-chapter-count').textContent=text('CHAPTER ','CAPÍTULO ')+String(chapterIndex+1).padStart(2,'0');
  root.style.setProperty('--work-offset',(100-(chapterIndex+1)/chapters.length*100)+'');
  root.style.setProperty('--work-progress',((selected+1)/items.length*100)+'%');
  chapterButtons.forEach((button,i)=>{const active=i===chapterIndex;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));button.querySelector('.work-chapter-name').textContent=chapters[i][lang]});renderDetails();
 }
 function setError(on){const label=find('.work-error');label.hidden=!on;label.textContent=text('This image could not load. Choose another detail or open the media file.','No se pudo cargar la imagen. Elige otro detalle o abre el archivo.');}
 image.addEventListener('error',()=>setError(true));image.addEventListener('load',()=>setError(false));
 function select(index){
  selected=(index+items.length)%items.length;const token=++sequence;clearTimeout(timer);const stage=find('.work-stage');
  root.setAttribute('aria-busy','true');if(!reduced.matches)stage.classList.add('is-changing');
  timer=setTimeout(()=>{
   if(token!==sequence)return;render();setError(false);stage.classList.remove('is-changing');stage.classList.remove('is-revealing');
   if(!reduced.matches){void stage.offsetWidth;stage.classList.add('is-revealing')}
   root.removeAttribute('aria-busy');
   if(dialog.open)renderLightbox(false);
  },reduced.matches?0:170);
 }
 find('.work-prev').addEventListener('click',()=>select(selected-1));find('.work-next').addEventListener('click',()=>select(selected+1));
 function videoStatus(kind){const status=dlg('.work-video-status');status.dataset.kind=kind;status.hidden=false;status.textContent=kind==='playback'?text('Use the video controls to begin playback.','Usa los controles del video para reproducirlo.'):text('This video could not load. Please choose another detail.','No se pudo cargar el video. Elige otro detalle.');}
 function releaseVideo(){const video=dlg('video');video.pause();video.removeAttribute('src');video.load();dlg('.work-video-status').hidden=true;}
 function renderLightbox(play){
  const item=current(),photo=dlg('.work-lightbox-image'),video=dlg('video');releaseVideo();
  dlg('.work-lightbox-kind').textContent=text('INSIDE THE WORK','DETRÁS DEL TRABAJO')+' / '+String(selected+1).padStart(2,'0');
  dlg('.work-lightbox-title').textContent=item[lang];dlg('.work-lightbox-description').textContent=item[lang==='es'?'descriptionEs':'descriptionEn']+' '+(item[lang==='es'?'detailsEs':'detailsEn']||'');
  photo.hidden=item.type==='video';video.hidden=item.type!=='video';
  if(item.type==='video'){
   photo.removeAttribute('src');video.poster=item.poster;video.src=item.src;video.muted=true;video.setAttribute('aria-label',item[lang]);video.load();
   if(play){const attempt=video.play();attempt?.catch(()=>{if(dialog.open&&!video.hidden)videoStatus('playback')})}
  }else{photo.src=item.src;photo.alt=item[lang]+' — '+item[lang==='es'?'descriptionEs':'descriptionEn'];}
 }
 function openLightbox(){
  clearTimeout(timer);sequence++;render();root.removeAttribute('aria-busy');find('.work-stage').classList.remove('is-changing');
  if(typeof dialog.showModal!=='function'){window.open(current().src,'_blank','noopener');return}
  opener=find('.work-stage');restoreOverflow=document.body.style.overflow;dialog.showModal();document.body.style.overflow='hidden';renderLightbox(true);dlg('.work-lightbox-close').focus();
 }
 find('.work-stage').addEventListener('click',openLightbox);
 dlg('.work-lightbox-close').addEventListener('click',()=>dialog.close());
 dlg('.work-lightbox-prev').addEventListener('click',()=>{selected=(selected+items.length-1)%items.length;render();renderLightbox(false)});
 dlg('.work-lightbox-next').addEventListener('click',()=>{selected=(selected+1)%items.length;render();renderLightbox(false)});
 dlg('video').addEventListener('error',()=>{if(dialog.open&&!dlg('video').hidden)videoStatus('error')});
 dialog.addEventListener('keydown',event=>{
  if(['ArrowLeft','ArrowRight'].includes(event.key)&&event.target.tagName!=='VIDEO'){
   event.preventDefault();selected=(selected+(event.key==='ArrowLeft'?-1:1)+items.length)%items.length;render();renderLightbox(false);
  }
  if(event.key==='Tab'){
   const focusable=[...dialog.querySelectorAll('button,video[controls]')].filter(el=>!el.hidden&&el.getClientRects().length),first=focusable[0],last=focusable.at(-1);
   if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
  }
 });
 dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close()});
 dialog.addEventListener('close',()=>{releaseVideo();document.body.style.overflow=restoreOverflow;opener?.focus()});
 // Gesture navigation stays horizontal so ordinary page scrolling still works.
 let pointerStart=null,suppressClick=false;
 find('.work-stage').addEventListener('pointerdown',event=>{if(event.pointerType!=='mouse')pointerStart={x:event.clientX,y:event.clientY}});
 find('.work-stage').addEventListener('pointerup',event=>{if(!pointerStart)return;const dx=event.clientX-pointerStart.x,dy=event.clientY-pointerStart.y;pointerStart=null;if(Math.abs(dx)>65&&Math.abs(dx)>Math.abs(dy)*1.5){suppressClick=true;select(selected+(dx<0?1:-1));setTimeout(()=>{suppressClick=false},450)}});
 find('.work-stage').addEventListener('pointercancel',()=>{pointerStart=null});
 find('.work-stage').addEventListener('click',event=>{if(suppressClick){event.preventDefault();event.stopImmediatePropagation();suppressClick=false}},true);
 window.choiceGallery={setLanguage(next){lang=next==='es'?'es':'en';render();if(!find('.work-error').hidden)setError(true);if(dialog.open){const item=current();dlg('.work-lightbox-kind').textContent=text('INSIDE THE WORK','DETRÁS DEL TRABAJO')+' / '+String(selected+1).padStart(2,'0');dlg('.work-lightbox-title').textContent=item[lang];dlg('.work-lightbox-description').textContent=item[lang==='es'?'descriptionEs':'descriptionEn'];dlg('.work-lightbox-image').alt=item[lang]+' — '+item[lang==='es'?'descriptionEs':'descriptionEn'];dlg('video').setAttribute('aria-label',item[lang]);if(!dlg('.work-video-status').hidden)videoStatus(dlg('.work-video-status').dataset.kind);}},select,open:openLightbox};
 try{lang=localStorage.getItem('choice-lang')==='es'?'es':'en'}catch{}render();
})();
