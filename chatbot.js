(function(){
const k='AIzaSyDDZsV69Pp3mIHyba4liiEMKTHZa1MIMpI';
const e='bridgemindgames@gmail.com';
let l=null,h=[],u=null,b=false;

function init(){
u=localStorage.getItem('bmg_u')||'u'+Date.now();
localStorage.setItem('bmg_u',u);
l=localStorage.getItem('bmg_l');
const s=localStorage.getItem('bmg_h'+u);
if(s)try{h=JSON.parse(s)}catch(ex){}
}

function save(){
if(l)localStorage.setItem('bmg_l',l);
if(h.length)localStorage.setItem('bmg_h'+u,JSON.stringify(h))
}

const info={
es:`Eres el asistente de BridgeMind Education. Responde SIEMPRE en ESPAÑOL. Enseñamos idiomas (español/inglés) con Bridge. 4 alumnos/mesa, 6h/semana, 1 año. Demo GRATIS. Contrato anual, pagos mensuales. Costos: el fundador los da en reunión personalizada. Contacto: WhatsApp/WeChat/Telegram +34 634 268 663. Horario: 8am-11pm España.`,
en:`You are BridgeMind Education assistant. ALWAYS respond in ENGLISH. We teach languages (Spanish/English) via Bridge card game. 4 students/table, 6h/week, 1 year. FREE demo. Annual contract, monthly payments. Costs: founder provides in personalized meeting. Contact: WhatsApp/WeChat/Telegram +34 634 268 663. Hours: 8am-11pm Spain time.`,
fr:`Vous êtes l'assistant de BridgeMind Education. Répondez TOUJOURS en FRANÇAIS. Nous enseignons les langues avec Bridge. 4 élèves/table, 6h/semaine, 1 an. Démo GRATUITE. Contrat annuel. Coûts: le fondateur en réunion. Contact: +34 634 268 663.`,
de:`Sie sind BridgeMind Education Assistent. Antworten Sie IMMER auf DEUTSCH. Wir lehren Sprachen mit Bridge. 4 Schüler/Tisch, 6 Std/Woche, 1 Jahr. KOSTENLOSE Demo. Jahresvertrag. Kosten: Gründer im Treffen. Kontakt: +34 634 268 663.`,
it:`Sei l'assistente di BridgeMind Education. Rispondi SEMPRE in ITALIANO. Insegniamo lingue con Bridge. 4 studenti/tavolo, 6 ore/settimana, 1 anno. Demo GRATUITA. Contratto annuale. Costi: fondatore in riunione. Contatto: +34 634 268 663.`,
ja:`あなたはBridgeMind Educationのアシスタントです。常に日本語で回答してください。ブリッジで言語を教えます。4人/テーブル、週6時間、1年。無料デモ。年間契約。費用：創設者が会議で。連絡先：+34 634 268 663。`,
zh:`您是BridgeMind Education助手。始终用中文回复。我们通过桥牌教语言。4人/桌，每周6小时，1年。免费演示。年度合同。费用：创始人在会议中。联系：+34 634 268 663。`,
ar:`أنت مساعد BridgeMind Education. أجب دائمًا بالعربية. نعلم اللغات بالبريدج. 4 طلاب/طاولة، 6 ساعات/أسبوع، سنة. عرض مجاني. عقد سنوي. تكاليف: المؤسس في الاجتماع. اتصال: +34 634 268 663.`
};

const welcome={
es:'¡Hola! 👋 Soy el asistente de BridgeMind. ¿En qué puedo ayudarte?',
en:'Hello! 👋 I\'m the BridgeMind assistant. How can I help you?',
fr:'Bonjour! 👋 Je suis l\'assistant de BridgeMind. Comment puis-je vous aider?',
de:'Hallo! 👋 Ich bin der BridgeMind Assistent. Wie kann ich Ihnen helfen?',
it:'Ciao! 👋 Sono l\'assistente di BridgeMind. Come posso aiutarti?',
ja:'こんにちは！👋 BridgeMindのアシスタントです。どうお手伝いできますか？',
zh:'你好！👋 我是BridgeMind助手。我能帮您什么？',
ar:'مرحبا! 👋 أنا مساعد BridgeMind. كيف يمكنني مساعدتك؟'
};

const css=`#bc{position:fixed;bottom:20px;right:20px;width:70px;height:70px;background:linear-gradient(135deg,#667eea,#764ba2);border:none;border-radius:50%;cursor:pointer;box-shadow:0 4px 20px rgba(102,126,234,.5);z-index:10000;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:8px;transition:.3s}#bc:hover{transform:scale(1.1)}#bi{font-size:32px;margin-bottom:2px}#bt{color:#fff;font-size:11px;font-weight:600}#bx{position:fixed;bottom:100px;right:20px;width:380px;max-width:calc(100vw - 40px);height:600px;max-height:calc(100vh - 130px);background:#fff;border-radius:20px;box-shadow:0 10px 40px rgba(0,0,0,.25);display:none;flex-direction:column;z-index:9999;overflow:hidden}#bx.s{display:flex}.bh{background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;padding:20px;display:flex;justify-content:space-between;align-items:center}.bh h3{margin:0;font-size:18px;font-weight:600}.bz{background:none;border:none;color:#fff;font-size:28px;cursor:pointer;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:50%;line-height:1;padding:0}.bz:hover{background:rgba(255,255,255,.2)}.bb{flex:1;overflow-y:auto;padding:20px;background:#f8f9fa;position:relative}.bb::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background:url('bmg.jpg') no-repeat center;background-size:cover;opacity:0.08;pointer-events:none;z-index:0}.m{margin-bottom:16px;display:flex;position:relative;z-index:1}.m.b{justify-content:flex-start}.m.u{justify-content:flex-end}.mt{max-width:80%;padding:12px 16px;border-radius:18px;font-size:14px;line-height:1.5;word-wrap:break-word}.m.b .mt{background:#fff;color:#2d3748;box-shadow:0 2px 8px rgba(0,0,0,.08);border-bottom-left-radius:4px}.m.u .mt{background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border-bottom-right-radius:4px}.ty{display:flex;gap:6px;padding:12px 16px;background:#fff;border-radius:18px;border-bottom-left-radius:4px;width:fit-content;box-shadow:0 2px 8px rgba(0,0,0,.08)}.ty span{width:8px;height:8px;background:#667eea;border-radius:50%;animation:bo 1.4s infinite}.ty span:nth-child(2){animation-delay:.2s}.ty span:nth-child(3){animation-delay:.4s}@keyframes bo{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-10px)}}.bi{padding:16px;background:#fff;border-top:1px solid #e2e8f0;display:flex;gap:10px}.bi input{flex:1;border:2px solid #e2e8f0;border-radius:24px;padding:12px 18px;font-size:14px;outline:none;font-family:inherit}.bi input:focus{border-color:#667eea}.se{background:linear-gradient(135deg,#667eea,#764ba2);border:none;color:#fff;width:46px;height:46px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:.2s;flex-shrink:0}.se:hover:not(:disabled){transform:scale(1.08)}.se:disabled{opacity:.5;cursor:not-allowed}`;

const st=document.createElement('style');
st.textContent=css;
document.head.appendChild(st);

const htm=`<button id="bc"><div id="bi">🤖</div><div id="bt">Chat 24/7</div></button><div id="bx"><div class="bh"><div><h3>BridgeMind Assistant</h3></div><button class="bz">×</button></div><div class="bb" id="ms"></div><div class="bi"><input id="ip" placeholder="Escribe..." autocomplete="off"><button id="se" class="se"><svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button></div></div>`;

document.body.insertAdjacentHTML('beforeend',htm);

const btn=document.getElementById('bc');
const box=document.getElementById('bx');
const cls=box.querySelector('.bz');
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

function showTy(){
const d=document.createElement('div');
d.className='m b';
d.id='ty';
const ty=document.createElement('div');
ty.className='ty';
ty.innerHTML='<span></span><span></span><span></span>';
d.appendChild(ty);
ms.appendChild(d);
ms.scrollTop=ms.scrollHeight;
}

function remTy(){
const t=document.getElementById('ty');
if(t)t.remove();
}

btn.onclick=function(){
box.classList.add('s');
if(!l)setTimeout(()=>showLang(),300);
else if(h.length===0)add(welcome[l]||welcome.es,'b');
};

cls.onclick=function(){
box.classList.remove('s');
};

function showLang(){
add('Selecciona idioma / Select language','b');
const opts=['🇪🇸 ES','🇬🇧 EN','🇫🇷 FR','🇩🇪 DE','🇮🇹 IT','🇯🇵 JP','🇨🇳 ZH','🇸🇦 AR'];
const d=document.createElement('div');
d.style.cssText='display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:12px';
opts.forEach(o=>{
const btn=document.createElement('button');
btn.textContent=o;
btn.style.cssText='background:#667eea;color:#fff;border:none;padding:12px;border-radius:12px;cursor:pointer;font-size:13px;font-weight:600;transition:.2s';
btn.onmouseover=()=>btn.style.background='#5568d3';
btn.onmouseout=()=>btn.style.background='#667eea';
btn.onclick=()=>{
l=o.split(' ')[1].toLowerCase();
if(l==='jp')l='ja';
save();
ms.innerHTML='';
add(welcome[l]||welcome.es,'b');
ip.focus();
};
d.appendChild(btn);
});
ms.appendChild(d);
ms.scrollTop=ms.scrollHeight;
}

async function send(){
const msg=ip.value.trim();
if(!msg||b||!l)return;
b=true;
se.disabled=true;
add(msg,'u');
ip.value='';
h.push({role:'user',parts:[{text:msg}]});
save();
showTy();
try{
const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${k}`,{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({
contents:[
{role:'user',parts:[{text:info[l]||info.es}]},
...h
],
generationConfig:{temperature:0.7,maxOutputTokens:800}
})
});
const d=await r.json();
remTy();
if(d.candidates?.[0]?.content?.parts?.[0]?.text){
const rp=d.candidates[0].content.parts[0].text;
add(rp,'b');
h.push({role:'model',parts:[{text:rp}]});
save();
}else{
add('Error en respuesta. Contacto: +34 634 268 663','b');
}
}catch(er){
remTy();
console.error(er);
add('Error de conexión. WhatsApp: +34 634 268 663','b');
}
b=false;
se.disabled=false;
ip.focus();
}

se.onclick=send;
ip.onkeypress=(e)=>{if(e.key==='Enter')send()};
init();
console.log('✅ Chatbot BridgeMind OK');
})();
