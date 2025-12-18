// chatbot.js - BridgeMind Education Bot
const datosBot = {
    es: { 
        bienvenida: "Bienvenido a la sala de BridgeMindGames.", 
        pregunta: "¿Cómo funciona el programa?", 
        respuesta: "Es un sistema dual de Neuro-Lingüística e IA. Adaptamos la dificultad en tiempo real. Programa mínimo de 6 meses. No hay prueba gratuita, pero ofrecemos demos pagadas para organizaciones.",
        volver: "← Volver"
    },
    en: { 
        bienvenida: "Welcome to the BridgeMindGames room.", 
        pregunta: "How does the program work?", 
        respuesta: "It's a dual Neuro-Linguistic and AI system. We adapt difficulty in real-time. 6-month minimum program. No free trial, but we offer paid demos for organizations.",
        volver: "← Back"
    },
    fr: { 
        bienvenida: "Bienvenue dans la salle BridgeMindGames.", 
        pregunta: "Comment ça marche ?", 
        respuesta: "Système dual Neuro-Linguistique et IA. Adaptation en temps réel. Programme de 6 mois minimum. Pas d'essai gratuit.",
        volver: "← Retour"
    },
    de: { 
        bienvenida: "Willkommen im BridgeMindGames-Raum.", 
        pregunta: "Wie funktioniert das?", 
        respuesta: "Duales Neuro-Linguistisches und KI-System. Echtzeit-Anpassung. Mindestens 6 Monate. Keine kostenlose Testversion.",
        volver: "← Zurück"
    },
    it: { 
        bienvenida: "Benvenuti nella sala BridgeMindGames.", 
        pregunta: "Come funziona?", 
        respuesta: "Sistema duale Neuro-Linguistico e IA. Adattamento in tempo reale. Minimo 6 mesi. Nessuna prova gratuita.",
        volver: "← Indietro"
    },
    jp: { 
        bienvenida: "BridgeMindGamesのルームへようこそ。", 
        pregunta: "仕組みは？", 
        respuesta: "神経言語学とAIのデュアルシステムです。リアルタイムで難易度を調整します。最低6ヶ月のプログラム。無料トライアルはありません。",
        volver: "← 戻る"
    },
    zh: { 
        bienvenida: "欢迎来到 BridgeMindGames 聊天室。", 
        pregunta: "系统如何运作？", 
        respuesta: "神经语言学与AI双系统。实时调整难度。最少6个月课程。无免费试用。",
        volver: "← 返回"
    },
    ar: { 
        bienvenida: "مرحباً بكم في غرفة BridgeMindGames.", 
        pregunta: "كيف يعمل النظام؟", 
        respuesta: "نظام مزدوج بين اللغويات العصبية والذكاء الاصطناعي. نعدل الصعوبة في الوقت الفعلي. برنامج مدته 6 أشهر كحد أدنى. لا توجد تجربة مجانية.",
        volver: "← عودة"
    }
};

// Crear la estructura del chat e inyectarla al cargar la página
function inyectarEstructuraChat() {
    if (document.getElementById('chat-container-manual')) return;

    const chatHTML = `
        <div id="chat-container-manual" style="position:fixed; bottom:20px; right:20px; z-index:9999; font-family:Arial, sans-serif;">
            <button id="btn-abrir-chat" onclick="toggleChatManual()" style="background:#007bff; color:white; border:none; width:60px; height:60px; border-radius:50%; font-size:24px; cursor:pointer; box-shadow:0 4px 12px rgba(0,0,0,0.3); transition: 0.3s;">💬</button>
            <div id="ventana-chat" style="display:none; width:320px; background:white; border-radius:15px; box-shadow:0 8px 30px rgba(0,0,0,0.25); position:absolute; bottom:80px; right:0; overflow:hidden; border:1px solid #eee;">
                <div style="background:#007bff; color:white; padding:18px; font-weight:bold; display:flex; justify-content:space-between; align-items:center;">
                    <span>BridgeMind Assistant</span>
                    <span onclick="toggleChatManual()" style="cursor:pointer; font-size:24px; line-height:20px;">&times;</span>
                </div>
                <div id="cuerpo-chat" style="height:350px; padding:20px; overflow-y:auto; background: #fff url('logo.png') no-repeat center; background-size: 60%; position:relative;">
                    </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', chatHTML);
}

function toggleChatManual() {
    const v = document.getElementById('ventana-chat');
    const isHidden = (v.style.display === 'none' || v.style.display === '');
    v.style.display = isHidden ? 'block' : 'none';
    if(isHidden) mostrarInicioBot();
}

function mostrarInicioBot() {
    const cuerpo = document.getElementById('cuerpo-chat');
    // Leemos el idioma del localStorage de tu index.html
    const lang = localStorage.getItem('idioma') || 'es';
    const t = datosBot[lang] || datosBot['es'];

    cuerpo.innerHTML = `
        <div style="background:rgba(255,255,255,0.92); height:100%; width:100%; position:absolute; top:0; left:0; z-index:0;"></div>
        <div style="position:relative; z-index:1;">
            <div style="background:#f1f1f1; padding:12px; border-radius:10px; font-size:14px; margin-bottom:15px; border:1px solid #e0e0e0; color:#333; line-height:1.4;">
                ${t.bienvenida}
            </div>
            <button onclick="mostrarRespuestaBot()" style="width:100%; background:#007bff; color:white; border:none; padding:12px; border-radius:8px; cursor:pointer; text-align:left; font-size:13px; font-weight:600; transition:0.2s; box-shadow:0 2px 5px rgba(0,123,255,0.2);">
                ${t.pregunta}
            </button>
        </div>
    `;
}

function mostrarRespuestaBot() {
    const cuerpo = document.getElementById('cuerpo-chat');
    const lang = localStorage.getItem('idioma') || 'es';
    const t = datosBot[lang] || datosBot['es'];

    cuerpo.innerHTML = `
        <div style="background:rgba(255,255,255,0.92); height:100%; width:100%; position
