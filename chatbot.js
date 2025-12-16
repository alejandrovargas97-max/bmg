(function(){
const k='AIzaSyDDZsV69Pp3mIHyba4liiEMKTHZa1MIMpI';
const e='bridgemindgames@gmail.com';
let l=null,h=[],u=null,b=false;

function init(){
u=localStorage.getItem('bmg_u')||'u'+Date.now();
localStorage.setItem('bmg_u',u);
l=localStorage.getItem('bmg_l');
  
const s=localStorage.getItem('bmg_h'+u);
if(s)try{h=JSON.parse(s)}catch(e){}
}

function save(){
if(l)localStorage.setItem('bmg_l',l);
if(h.length)localStorage.setItem('bmg_h'+u,JSON.stringify(h))
}

async function notify(t,d){
const hh=new Date().getHours();
if(hh<8||hh>23)return;
const subj=t==='human'?'🔴 Cliente':'📅 Reunión';
const msg=`Usuario:${u}\nIdioma:${l}\n\nNombre:${d.n}\nEmail:${d.e}\nTel:${d.p}\nMsg:${d.m}`;
const fd=new FormData();
fd.append('_subject',subj);
fd.append('message',msg);
try{await fetch(`https://formsubmit.co/${e}`,{method:'POST',body:fd})}catch(er){}
}

const info={
es:`Asistente BridgeMind. ESPAÑOL. Enseñamos idiomas con Bridge. 4/mesa,6h/sem,1año. Demo gratis. Contrato anual,pago mensual. Costos:fundador en reunión. Contacto:+34 634 268 663. 8-23h España`,
en:`BridgeMind assistant. ENGLISH. Languages via Bridge. 4/table,6h/wk,1yr. Free demo. Annual contract,monthly pay. Costs:founder in meeting. Contact:+34 634 268 663. 8-23h Spain`,
fr:`Assistant BridgeMind. FRANÇAIS. Langues par Bridge. Contact:+34 634 268 663`,
de:`BridgeMind Assistent. DEUTSCH. Sprachen durch Bridge. Kontakt:+34 634 268 663`,
it:`Assistente BridgeMind. ITALIANO. Lingue con Bridge. Contatto:+34 634 268 663`,
ja:`BridgeMindアシスタント。日本語。ブリッジで言語。連絡先:+34 634 268 663`,
zh:`BridgeMind助手。中文。桥牌教语言。联系:+34 634 268 663`,
ar:`مساعد BridgeMind. العربية. لغات بالبريدج. اتصال:+34 634 268 663`
};

const css=`#bc{position:fixed;bottom:20px;right:20px;width:70px;height:70px;background:linear-gradient(135deg,#667eea,#764ba2);border:none;border-radius:50%;cursor:pointer;box-shadow:0 4px 20px rgba(102,126,234,.5);z-index:10000;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:8px}#bc:hover{transform:scale(1.1)}#bi{font-size:32px}#bt{color:#fff;font-size:11px;font-weight:600}#bx{position:fixed;bottom:100px;right:20px;width:380px;height:600px;background:#fff;border-radius:20px;box-shadow:0 10px 40px rgba(0,0,0,.25);display:none;flex-direction:column;z-index:9999}#bx.s{display:flex}.bh{background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;padding:20px}.bb{flex:1;overflow-y:auto;padding:20px;background:#f8f9fa}.m{margin-bottom:16px;display:flex}.m.b{justify-content:flex-start}.m.u{justify-content:flex-end}.mt{max-width:80%;padding:12px 16px;border-radius:18px;font-size:14px}.m.b .mt{background:#fff;color:#2d3748}.m.u .mt{background:linear-gradient(135deg,#667eea,#764ba2);color:#fff}`;

const st=document.createElement('style');
st.textContent=css;
document.head.appendChild(st);

const htm=`<button id="bc"><div id="bi">🤖</div><div id="bt">Chat 24/7</div></button><div id="bx"><div class="bh"><div><h3>BridgeMind</h3></div><button class="bz" onclick="document.getElementById('bx').classList.remove('s')">×</button></div><div class="bb" id="ms"></div><div class="bi"><input id="ip" placeholder="Escribe..."><button id="se" class="se">▶</button></div></div>`;

document.body.insertAdjacentHTML('beforeend',htm);

const btn=document.getElementById('bc');
const box=document.getElementById('bx');
const ms=document.getElementById('ms');
const ip=document.getElementById('ip');
const se=document.getElementById('se');

function add(t,ty){
const d=document.createElement('div');
d.className='m '+ty;
const tx=document.createElement('div');
tx.className='mt';
tx.innerHTML=t.replace(/\n/g,'<br>');
d.appendChild(tx);
ms.appendChild(d);
ms.scrollTop=ms.scrollHeight;
}

btn.onclick=function(){
box.classList.add('s');
if(!l)setTimeout(()=>showLang(),300);
};

function showLang(){
add('Selecciona idioma / Select language','b');
const opts=['🇪🇸 ES','🇬🇧 EN','🇫🇷 FR','🇩🇪 DE','🇮🇹 IT','🇯🇵 JP','🇨🇳 ZH','🇸🇦 AR'];
opts.forEach(o=>{
const btn=document.createElement('button');
btn.textContent=o;
btn.style.cssText='margin:5px;padding:10px;background:#667eea;color:#fff;border:none;border-radius:8px;cursor:pointer';
btn.onclick=()=>{l=o.split(' ')[1].toLowerCase();save();add('¡Hola! ¿En qué puedo ayudarte?','b');ip.focus()};
ms.appendChild(btn);
});
}

async function send(){
if(b||!ip.value.trim()||!l)return;
b=true;
se.disabled=true;
const msg=ip.value.trim();
add(msg,'u');
ip.value='';
h.push({role:'user',parts:[{text:msg}]});
save();
try{
const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${k}`,{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({contents:[{role:'user',parts:[{text:info[l]||info.es}]},...h],generationConfig:{temperature:0.7,maxOutputTokens:500}})
});
const d=await r.json();
if(d.candidates?.[0]?.content?.parts?.[0]?.text){
const rp=d.candidates[0].content.parts[0].text;
add(rp,'b');
h.push({role:'model',parts:[{text:rp}]});
save();
}
}catch(er){
add('Error: +34 634 268 663','b');
}
b=false;
se.disabled=false;
ip.focus();
}

se.onclick=send;
ip.onkeypress=(e)=>{if(e.key==='Enter')send()};
init();
})();
