
(function(){
 var R=document.documentElement,rm=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(pointer:fine)').matches;
 var hd=document.querySelector('.hd'),bg=document.querySelector('.bg'),nv=document.querySelector('.nv'),cu=document.querySelector('.curtain'),pb=document.querySelector('.pgbar');
 bg.addEventListener('click',function(){var o=nv.classList.toggle('o');bg.setAttribute('aria-expanded',o);document.documentElement.classList.toggle('mo',o)});
 nv.addEventListener('click',function(e){if(e.target.closest('a')){nv.classList.remove('o');document.documentElement.classList.remove('mo');bg.setAttribute('aria-expanded','false')}});
 addEventListener('keydown',function(e){if(e.key==='Escape'&&nv.classList.contains('o'))bg.click()});
 /* mots */
 function split(el){var i=0;(function walk(n){Array.from(n.childNodes).forEach(function(c){
  if(c.nodeType===3){var fr=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(function(p){if(!p)return;
   if(/^\s+$/.test(p)){fr.appendChild(document.createTextNode(' '))}
   else{var w=document.createElement('span');w.className='wd';var x=document.createElement('span');x.className='wi';x.textContent=p;x.style.transitionDelay=(i++*0.07)+'s';w.appendChild(x);fr.appendChild(w)}});c.replaceWith(fr)}
  else if(c.nodeType===1)walk(c)})})(el);el.classList.add('sp')}
 if(!rm)document.querySelectorAll('main h1,main h2').forEach(split);
 /* décalage en cascade */
 document.querySelectorAll('.cards,.exp,.steps,.args,.gal,.vs,.pills,.ft .cols').forEach(function(g){var k=0;Array.from(g.children).forEach(function(c){if(c.classList.contains('rv')){c.style.setProperty('--d',(k++*0.12)+'s')}})});
 document.querySelectorAll('.split .rv').forEach(function(c,i){c.style.setProperty('--d',(i*0.15)+'s')});
 /* révélation au défilement */
 function start(){
  R.classList.add('ready');
  document.querySelectorAll('.hero h1,.ph h1').forEach(function(h){h.classList.add('in')});
  var io='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');if(e.target.classList.contains('split'))e.target.querySelectorAll('.rv').forEach(function(x){x.classList.add('in')});io.unobserve(e.target)}})},{threshold:.15,rootMargin:'0px 0px -6% 0px'}):null;
  document.querySelectorAll('.rv:not(.im),.split,main h2.sp,main h1.sp').forEach(function(el){if(el.closest('.hero')||el.closest('.ph'))return;io?io.observe(el):el.classList.add('in')});
  if(!io)document.querySelectorAll('.rv').forEach(function(x){x.classList.add('in')});
 }
 if(rm||!cu){R.classList.remove('entering');start()}
 else{
  var go=function(){
   requestAnimationFrame(function(){requestAnimationFrame(function(){
    cu.style.transition='transform .9s cubic-bezier(.76,0,.24,1) .25s';cu.style.transform='translateY(-100%)';R.classList.remove('entering');
    setTimeout(start,650)})})};
  if(document.readyState==='complete')go();else addEventListener('load',go);
  setTimeout(function(){if(!R.classList.contains('ready')){go()}},2500);
 }
 /* transitions entre pages */
 document.addEventListener('click',function(e){
  var a=e.target.closest('a');if(!a||rm||!cu)return;
  var h=a.getAttribute('href');if(!h||a.target||e.metaKey||e.ctrlKey||e.shiftKey||/^(mailto:|tel:|https?:|#)/.test(h))return;
  if(h.split('#')[0]===location.pathname.split('/').pop()&&h.indexOf('#')>-1)return;
  e.preventDefault();cu.classList.add('leaving');
  cu.style.transition='none';cu.style.transform='translateY(100%)';void cu.offsetHeight;
  cu.style.transition='transform .6s cubic-bezier(.76,0,.24,1)';cu.style.transform='none';
  setTimeout(function(){location.href=h},620);
 });
 addEventListener('pageshow',function(e){if(e.persisted&&cu){cu.classList.remove('leaving');cu.style.transition='none';cu.style.transform='translateY(100%)'}});
 /* défilement : en-tête, barre de progression, parallaxe */
 var lastY=scrollY,hero=document.querySelector('.hero>.hs'),tick=false;
 /* bannière : fond qui change toutes les 5 secondes */
 var hs=document.querySelector('.hero .hs');
 if(hs&&!rm){var sl=hs.querySelectorAll('img'),sk=0;if(sl.length>1)setInterval(function(){if(document.hidden)return;sl[sk].classList.remove('on');sk=(sk+1)%sl.length;sl[sk].classList.add('on')},5000)}
 function onScroll(){
  var y=scrollY;hd.classList.toggle('s',y>30);
  if(!nv.classList.contains('o')){hd.classList.toggle('hide',y>260&&y>lastY+4);if(y<lastY-4||y<260)hd.classList.remove('hide')}
  lastY=y;
  var m=document.documentElement.scrollHeight-innerHeight;if(pb)pb.style.transform='scaleX('+(m>0?y/m:0)+')';
  if(hero&&!rm&&y<innerHeight*1.2)hero.style.setProperty('--py',(y*.22)+'px');
  tick=false;
 }
 onScroll();addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(onScroll)}},{passive:true});
 /* boutons magnétiques */
 if(fine&&!rm)document.querySelectorAll('.btn.r,.btn.w2,.nv .pill').forEach(function(b){
  b.addEventListener('mousemove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.18)+'px,'+((e.clientY-r.top-r.height/2)*.28)+'px)'});
  b.addEventListener('mouseleave',function(){b.style.transform=''});
 });

 /* galerie par séries */
 var lb=document.getElementById('lb');
 if(lb){var im=lb.querySelector('img'),ct=lb.querySelector('.lbc'),tt=lb.querySelector('.lbt'),L=[],ix=0,last=null;
  var show=function(i){ix=(i+L.length)%L.length;im.src='img/'+L[ix]+'.jpg';im.alt=tt.textContent+', photo '+(ix+1);ct.textContent=(ix+1)+' / '+L.length};
  var open=function(b){L=b.dataset.p.split(',');tt.textContent=b.querySelector('.sr-k').textContent;lb.classList.toggle('one',L.length<2);last=b;show(0);lb.hidden=false;document.body.style.overflow='hidden';lb.querySelector('.lbx').focus()};
  var close=function(){lb.hidden=true;document.body.style.overflow='';if(last)last.focus()};
  [].forEach.call(document.querySelectorAll('.sr'),function(b){b.addEventListener('click',function(){open(b)})});
  lb.querySelector('.lbx').onclick=close;lb.querySelector('.lbp').onclick=function(){show(ix-1)};lb.querySelector('.lbn').onclick=function(){show(ix+1)};
  lb.addEventListener('click',function(e){if(e.target===lb)close()});
  document.addEventListener('keydown',function(e){if(lb.hidden)return;if(e.key==='Escape')close();if(L.length>1&&e.key==='ArrowLeft')show(ix-1);if(L.length>1&&e.key==='ArrowRight')show(ix+1)});
  var tx=0;lb.addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:true});lb.addEventListener('touchend',function(e){var d=e.changedTouches[0].clientX-tx;if(L.length>1&&Math.abs(d)>50)show(ix+(d<0?1:-1))});
 }
 var f=document.getElementById('dform');if(!f)return;
 var T=[{"id": "photo", "t": "Photographie", "s": "Shooting solo, duo, groupe, famille", "price": "Formule", "f": [["sel", "Formule", "Classic Begins, solo|100", "Editorial Essentiel, solo|140", "Editorial Premium, solo|220", "Editorial Signature, solo|290", "Duo|250", "Trio|300", "Famille|300", "Animaux|155"], ["txt", "Nombre de personnes", "Ex. 2"], ["txt", "Lieu souhaité", "Paris, studio, extérieur"], ["sel", "Livraison", "Standard|0", "Express 48 h, +50 €|50"]]}, {"id": "event", "t": "Captation événementielle", "s": "Défilé, soirée, salon, concert", "price": null, "f": [["sel", "Type d’événement", "Défilé de mode|0", "Soirée|0", "Salon ou conférence|0", "Concert|0", "Autre|0"], ["txt", "Nom de l’événement ou de la marque", "Titre, organisateur"], ["txt", "Lieu", "Salle, adresse, ville"], ["txt", "Durée sur place", "Ex. 3 heures"], ["txt", "Nombre d’invités ou de passages", "Ex. 120"], ["sel", "Livrable souhaité", "Film souvenir de 1 à 2 minutes|0", "Captation complète|0", "Film et teaser réseaux|0", "Film et photos|0", "Je ne sais pas encore|0"]]}, {"id": "reel", "t": "Contenu court", "s": "Reels et TikTok pour vos réseaux", "price": null, "f": [["sel", "Format", "Un reel ou TikTok|0", "Plusieurs vidéos par mois|0", "Je ne sais pas encore|0"], ["txt", "Votre compte ou marque", "@..."], ["sel", "Style", "Dynamique et rythmé|0", "Mode et lifestyle|0", "Produit ou service|0"], ["sel", "Livraison", "Standard|0", "Express 48 h|0"]]}, {"id": "custom", "t": "Projet sur mesure", "s": "Photo, vidéo ou les deux", "price": null, "f": [["sel", "Type de projet", "Photo|0", "Vidéo|0", "Photo et vidéo|0"], ["txt", "Lieu", "Paris, autre ville"]]}],KEY="e3af1aed-5219-4a8a-80b6-4b4d3f8e6371",MAIL="mns.studioprod@gmail.com";
 var types=document.getElementById('types'),fields=document.getElementById('fields'),ok=document.getElementById('ok'),estn=document.getElementById('estn'),cur=T[0];
 function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
 function sel(id,l,opts){return '<div class="fld"><label for="'+id+'">'+esc(l)+'</label><select id="'+id+'" data-l="'+esc(l)+'">'+opts.map(function(o){var p=o.split('|');return '<option value="'+(p[1]||0)+'">'+esc(p[0])+'</option>'}).join('')+'</select></div>'}
 function build(t){
  cur=t;
  types.querySelectorAll('button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.t===t.id)});
  var h='';
  t.f.forEach(function(x,i){
   var k=x[0],l=x[1],id='f'+i;
   if(k==='sel')h+=sel(id,l,x.slice(2));
   else h+='<div class="fld"><label for="'+id+'">'+esc(l)+'</label><input id="'+id+'" data-l="'+esc(l)+'" placeholder="'+esc(x[2]||'')+'"></div>';
  });
  h+='<div class="fld full"><label for="fd">Décrivez votre projet *</label><textarea id="fd" data-l="Description du projet" required placeholder="Contexte, objectif, ambiance, références, ce qui compte pour vous…"></textarea></div>';
  h+=sel('fb','Budget envisagé',['Sélectionnez|0','Moins de 250 €|0','250 – 500 €|0','500 – 1 000 €|0','Plus de 1 000 €|0','Je ne sais pas encore|0']);
  h+='<div class="fld"><label for="fe">Date ou échéance</label><input id="fe" type="date" data-l="Date ou échéance"></div>';
  fields.innerHTML=h;
  fields.querySelectorAll('select').forEach(function(s){s.addEventListener('change',upd)});
  ok.textContent='';ok.className='ok';upd();
 }
 function upd(){
  var tot=0,has=false;
  if(cur.price){fields.querySelectorAll('select[data-l]').forEach(function(x){if(x.dataset.l===cur.price&&+x.value>0)has=true;tot+=(+x.value)})}
  estn.hidden=!has;estn.textContent=has?'Estimation indicative : '+tot+' €, à confirmer dans votre devis.':'';
 }
 types.innerHTML=T.map(function(t){return '<button type="button" data-t="'+t.id+'" aria-pressed="false"><b>'+esc(t.t)+'</b><small>'+esc(t.s)+'</small></button>'}).join('');
 types.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;build(T.filter(function(t){return t.id===b.dataset.t})[0])});
 var q=(location.hash||'').slice(1);build(T.filter(function(t){return t.id===q})[0]||T[0]);
 var show=function(){try{ok.scrollIntoView({behavior:'smooth',block:'center'})}catch(x){}};
 f.addEventListener('submit',function(e){
  e.preventDefault();ok.className='ok';ok.textContent='';
  if(document.getElementById('hp').value)return;
  var n=document.getElementById('fn').value.trim(),m=document.getElementById('fm').value.trim(),d=document.getElementById('fd').value.trim();
  if(!d){ok.className='ok bad';ok.textContent='Décrivez votre projet en quelques lignes.';show();document.getElementById('fd').focus();return}
  if(!n||!/^\S+@\S+\.\S+$/.test(m)){ok.className='ok bad';ok.textContent='Indiquez votre nom et une adresse mail valide.';show();return}
  if(!document.getElementById('fc').checked){ok.className='ok bad';ok.textContent='Merci de cocher la case d’autorisation pour être recontacté.';show();return}
  var lines=['Votre projet concerne : '+cur.t,''];
  fields.querySelectorAll('[data-l]').forEach(function(x){var v=x.tagName==='SELECT'?x.selectedOptions[0].text:x.value;if(v&&v!=='Sélectionnez')lines.push(x.dataset.l+' : '+v)});
  if(estn.textContent)lines.push(estn.textContent);
  var co=document.getElementById('fo').value,tel=document.getElementById('ft').value;
  lines.push('','Nom : '+n);if(co)lines.push('Entreprise : '+co);lines.push('Mail : '+m);if(tel)lines.push('Téléphone : '+tel);
  var body=lines.join('\n'),btn=f.querySelector('button[type=submit]');btn.disabled=true;btn.textContent='Envoi en cours…';
  fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({access_key:KEY,subject:'Demande de devis : '+cur.t+' ('+n+')',from_name:n,email:m,message:body})})
  .then(function(r){return r.json()}).then(function(j){
    if(j.success){ok.className='ok good';ok.textContent='Merci, votre demande est bien envoyée. Je reviens vers vous sous 48 h.';f.reset();build(cur);ok.className='ok good';ok.textContent='Merci, votre demande est bien envoyée. Je reviens vers vous sous 48 h.'}
    else throw 0
  }).catch(function(){
    ok.className='ok bad';ok.innerHTML='L’envoi a échoué. <a href="mailto:'+MAIL+'?subject='+encodeURIComponent('Demande de devis : '+cur.t)+'&body='+encodeURIComponent(body)+'" style="text-decoration:underline">Envoyer par mail</a>';
  }).finally(function(){btn.disabled=false;btn.textContent='Envoyer ma demande';show()});
 });
})();
