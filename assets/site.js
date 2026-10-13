(() => {
 'use strict';
 const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const storage={get:(s,k)=>{try{return window[s].getItem(k)}catch{return null}},set:(s,k,v)=>{try{window[s].setItem(k,v)}catch{}}};
 let language=storage.get('localStorage','choice-lang')==='es'?'es':'en', languageTimer;
 const say=(en,es)=>language==='es'?es:en;
 function applyLanguage(l){
  language=l;document.documentElement.lang=l;
  $$('[data-en][data-es]').forEach(el=>el.textContent=el.dataset[l]);
  $$('[data-label-en]').forEach(el=>el.setAttribute('aria-label',el.dataset[l==='es'?'labelEs':'labelEn']));
  $$('[data-alt-en]').forEach(el=>el.alt=el.dataset[l==='es'?'altEs':'altEn']);
  $$('[data-content-en]').forEach(el=>el.content=el.dataset[l==='es'?'contentEs':'contentEn']);
  $$('[data-lang]').forEach(b=>{b.classList.toggle('active',b.dataset.lang===l);b.setAttribute('aria-pressed',String(b.dataset.lang===l))});
  storage.set('localStorage','choice-lang',l);
  window.choiceGallery?.setLanguage(l);
  $$('[data-contact-form]').forEach(f=>{f.querySelectorAll('input,textarea,select').forEach(el=>el.setCustomValidity(''));const s=f.querySelector('.form-status');if(s.dataset.state)formStatus(s,s.dataset.state)});
 }
 function switchLanguage(l){clearTimeout(languageTimer);if(reduced.matches){applyLanguage(l);return}document.body.classList.add('lang-ready','lang-changing');languageTimer=setTimeout(()=>{applyLanguage(l);document.body.classList.remove('lang-changing')},120)}
 $$('[data-lang]').forEach(b=>b.addEventListener('click',()=>switchLanguage(b.dataset.lang)));
 // Menu focus stays within the drawer; background and scroll are suspended until it closes.
 const menu=$('.menu-btn'), nav=$('.nav'),close=$('.menu-close');let menuOpen=false, previousOverflow='',backdrop;
 const inertTargets=[$('main'),$('.footer'),$('.mobile-call'),$('.topline'),$('.brand'),$('.badges'),$('.header-actions')];
 function openMenu(){menuOpen=true;nav.classList.add('open');menu.setAttribute('aria-expanded','true');nav.setAttribute('role','dialog');nav.setAttribute('aria-modal','true');previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';inertTargets.forEach(el=>el&&(el.inert=true));backdrop=document.createElement('div');backdrop.className='menu-backdrop';backdrop.addEventListener('click',closeMenu);document.body.append(backdrop);close.focus()}
 function closeMenu(){if(!menuOpen)return;menuOpen=false;nav.classList.remove('open');menu.setAttribute('aria-expanded','false');nav.removeAttribute('role');nav.removeAttribute('aria-modal');document.body.style.overflow=previousOverflow;inertTargets.forEach(el=>el&&(el.inert=false));backdrop?.remove();menu.focus()}
 menu?.addEventListener('click',()=>menuOpen?closeMenu():openMenu());close?.addEventListener('click',closeMenu);nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
 function trap(event,root){if(event.key!=='Tab')return;const items=[...root.querySelectorAll('a[href],button:not([disabled]),input,select,textarea')].filter(el=>el.getClientRects().length);const first=items[0],last=items.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}}
 document.addEventListener('keydown',e=>{if(menuOpen){if(e.key==='Escape')closeMenu();trap(e,nav)}});matchMedia('(min-width:821px)').addEventListener('change',e=>{if(e.matches)closeMenu()});
 let ticking=false;
 function scrollUpdate(){const d=document.documentElement,p=Math.max(0,Math.min(1,d.scrollTop/Math.max(1,d.scrollHeight-d.clientHeight)));d.style.setProperty('--width',p*100+'%');d.style.setProperty('--progress',p<.33?'#c81925':p<.67?'#174a87':'#f5f5f5');const form=$('.form-section'),r=form?.getBoundingClientRect();const formVisible=r&&r.top<innerHeight&&r.bottom>0;$('.mobile-call')?.classList.toggle('show',d.scrollTop>180&&!formVisible&&!menuOpen);ticking=false}
 addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(scrollUpdate);ticking=true}},{passive:true});addEventListener('resize',scrollUpdate);scrollUpdate();
 function formStatus(el,state){el.dataset.state=state;el.textContent=({sending:say('Sending your request…','Enviando tu solicitud…'),sent:say('Your request was accepted by the email service. For availability, please call.','El servicio de correo aceptó tu solicitud. Para consultar disponibilidad, llama.'),error:say('We could not send your request. Please call (213) 424-8544.','No pudimos enviar tu solicitud. Llama al (213) 424-8544.'),configuration:say('Online requests are not available yet. Please call (213) 424-8544.','Las solicitudes en línea aún no están disponibles. Llama al (213) 424-8544.')})[state]||''}
 $$('[data-contact-form]').forEach(form=>{
  form.addEventListener('invalid',e=>{const el=e.target;if(el.validity.valueMissing)el.setCustomValidity(say('Please complete this field.','Completa este campo.'));else if(el.validity.typeMismatch)el.setCustomValidity(say('Please enter a valid email address.','Ingresa un correo electrónico válido.'))},true);
  form.addEventListener('input',e=>e.target.setCustomValidity?.(''));
  form.addEventListener('change',e=>e.target.setCustomValidity?.(''));
  form.addEventListener('submit',async e=>{e.preventDefault();if(!form.reportValidity())return;const button=form.querySelector('[type=submit]'),status=form.querySelector('.form-status');button.disabled=true;form.setAttribute('aria-busy','true');formStatus(status,'sending');const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),15000);
   try{const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form))),signal:controller.signal});const data=await response.json();if(!response.ok||data.ok!==true){formStatus(status,response.status===503?'configuration':'error');return}formStatus(status,'sent');form.reset()}catch{formStatus(status,'error')}finally{clearTimeout(timeout);button.disabled=false;form.removeAttribute('aria-busy')}
  });
 });
 applyLanguage(language);
 const review=$('.review-profile');if(review&&window.CHOICE_CONFIG?.googleReviewUrl){try{const url=new URL(window.CHOICE_CONFIG.googleReviewUrl);if(url.protocol==='https:'){review.href=url.href;review.hidden=false;review.rel='noopener noreferrer';review.target='_blank'}}catch{}}
 // 1.75 seconds total, no video, sound, loading gate or layout changes.
 let sessionAvailable=false;try{sessionStorage.setItem('choice-probe','1');sessionStorage.removeItem('choice-probe');sessionAvailable=true}catch{}
 const intro=$('.intro');if(intro&&sessionAvailable&&!reduced.matches&&!storage.get('sessionStorage','choice-intro')&&Element.prototype.animate){
  storage.set('sessionStorage','choice-intro','seen');intro.hidden=false;intro.setAttribute('aria-hidden','false');const logo=intro.querySelector('.intro-logo'),img=logo.querySelector('img');let stopped=false,travelTimer,hardStop;
  const finish=()=>{if(stopped)return;stopped=true;clearTimeout(travelTimer);clearTimeout(hardStop);if(intro.contains(document.activeElement))$('.brand').focus();intro.hidden=true;intro.setAttribute('aria-hidden','true');logo.getAnimations().forEach(a=>a.cancel());if(!reduced.matches)$('.hero-grid')?.animate([{opacity:.75,transform:'translateY(6px)'},{opacity:1,transform:'none'}],{duration:350,easing:'ease-out'})};
  intro.querySelector('.intro-skip').addEventListener('click',finish);const begin=()=>{if(stopped)return;logo.classList.add('intro-reveal');travelTimer=setTimeout(()=>{if(stopped)return;const target=$('.brand img').getBoundingClientRect(),source=logo.getBoundingClientRect();logo.style.animation='none';logo.style.opacity='1';logo.style.filter='none';logo.animate([{transform:'translate(-50%,-50%)'},{transform:`translate(calc(-50% + ${target.left+target.width/2-source.left-source.width/2}px),calc(-50% + ${target.top+target.height/2-source.top-source.height/2}px)) scale(${target.width/source.width})`}],{duration:450,easing:'cubic-bezier(.4,0,.2,1)',fill:'forwards'});intro.animate([{background:'#000'},{background:'transparent'}],{duration:450,fill:'forwards'});setTimeout(finish,450)},1150)};
  if(img.complete)begin();else{img.addEventListener('load',begin,{once:true});img.addEventListener('error',finish,{once:true})}hardStop=setTimeout(finish,1750);
 }
})();
