(() => {
 const section=document.querySelector('.nav-service'),toggle=section?.querySelector('.service-toggle'),menu=section?.querySelector('.service-menu');
 if(section&&toggle&&menu){
  function open(){menu.hidden=false;toggle.setAttribute('aria-expanded','true');toggle.querySelector('span').textContent='-';}
  function close(focus=false){menu.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.querySelector('span').textContent='+';if(focus)toggle.focus();}
  toggle.addEventListener('click',()=>menu.hidden?open():close());
  section.addEventListener('pointerenter',()=>{if(matchMedia('(min-width:821px)').matches)open()});section.addEventListener('pointerleave',()=>{if(matchMedia('(min-width:821px)').matches&&!section.contains(document.activeElement))close()});
  document.addEventListener('pointerdown',event=>{if(!section.contains(event.target))close()});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!menu.hidden){event.preventDefault();event.stopImmediatePropagation();close(true)}},true);
  toggle.addEventListener('keydown',event=>{if(event.key==='ArrowDown'){event.preventDefault();open();menu.querySelector('a').focus()}});
  menu.addEventListener('keydown',event=>{if(!['ArrowDown','ArrowUp','Home','End'].includes(event.key))return;event.preventDefault();const links=[...menu.querySelectorAll('a')],current=links.indexOf(document.activeElement),index=event.key==='Home'?0:event.key==='End'?links.length-1:(current+(event.key==='ArrowUp'?-1:1)+links.length)%links.length;links[index].focus()});
  section.addEventListener('focusout',()=>setTimeout(()=>{if(!section.contains(document.activeElement))close()},0));
  document.querySelector('.menu-close')?.addEventListener('click',()=>close());
  matchMedia('(min-width:821px)').addEventListener('change',()=>close());
 }
 document.querySelectorAll('form[data-service-default]').forEach(form=>{const select=form.querySelector('[name=service]');if(select&&[...select.options].some(o=>o.value===form.dataset.serviceDefault))select.value=form.dataset.serviceDefault});
})();
