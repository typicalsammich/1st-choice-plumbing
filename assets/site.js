const langButtons=document.querySelectorAll('[data-lang]');function setLanguage(l){document.documentElement.lang=l;document.querySelectorAll('[data-en][data-es]').forEach(el=>el.textContent=el.dataset[l]);langButtons.forEach(b=>{b.classList.toggle('active',b.dataset.lang===l);b.setAttribute('aria-pressed',String(b.dataset.lang===l))});localStorage.setItem('choice-lang',l);document.body.classList.remove('lang-animate');void document.body.offsetWidth;document.body.classList.add('lang-animate')}langButtons.forEach(b=>b.addEventListener('click',()=>setLanguage(b.dataset.lang)));setLanguage(localStorage.getItem('choice-lang')==='es'?'es':'en');const menu=document.querySelector('.menu-btn'),nav=document.querySelector('.nav');if(menu){menu.addEventListener('click',()=>{let o=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(o))});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}))}function scrollUpdate(){let d=document.documentElement,p=d.scrollTop/Math.max(1,d.scrollHeight-d.clientHeight);d.style.setProperty('--width',p*100+'%');d.style.setProperty('--progress',p<.33?'#df2935':p<.67?'#1c4c82':'#f0f5fb');document.querySelector('.mobile-call')?.classList.toggle('show',d.scrollTop>180)}addEventListener('scroll',scrollUpdate,{passive:true});addEventListener('resize',scrollUpdate);scrollUpdate();
document.querySelectorAll('[data-contact-form]').forEach(form=>{
 form.addEventListener('submit',async event=>{
  event.preventDefault();
  const status=form.querySelector('.form-status'),button=form.querySelector('[type=submit]');
  const payload=Object.fromEntries(new FormData(form).entries());
  status.textContent=document.documentElement.lang==='es'?'Enviando...':'Sending...';
  button.disabled=true;
  try{
   const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
   const data=await response.json();
   if(!response.ok)throw new Error(data.error||'Email delivery is not configured.');
   status.textContent=document.documentElement.lang==='es'?'Solicitud enviada.':'Your request has been sent.';
   form.reset();
  }catch(error){
   status.textContent=(document.documentElement.lang==='es'?'No se pudo enviar el formulario. Llame al (213) 424-8544. ':'Could not send the form. Please call (213) 424-8544. ')+(error.message||'');
  }finally{button.disabled=false}
 });
});
