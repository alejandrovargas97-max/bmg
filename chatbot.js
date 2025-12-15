// =============================================
// CHATBOT BRIDGEMIND CON GOOGLE GEMINI
// Detecta idioma automáticamente de tu sitio
// =============================================

(function() {
    // 🔑 COLOCA TU API KEY DE GEMINI AQUÍ:
    const GEMINI_API_KEY = 'AIzaSyDDZsV69Pp3mIHyba4liiEMKTHZa1MIMpI'; // ← REEMPLAZA ESTO
    
    // Variable global de idioma
    let currentLanguage = 'es';
    
    // =============================================
    // DETECTAR CAMBIOS DE IDIOMA EN TU SITIO
    // =============================================
    
    function detectLanguageButtons() {
        // Busca los botones de idioma en tu sitio
        const languageButtons = document.querySelectorAll('.language-selector button, nav button');
        
        languageButtons.forEach(button => {
            button.addEventListener('click', function() {
                const buttonText = this.textContent.trim().toUpperCase();
                
                // Mapeo de códigos de idioma
                const langMap = {
                    'ES': 'es',
                    'EN': 'en',
                    'FR': 'fr',
                    'DE': 'de',
                    'IT': 'it',
                    'JP': 'ja',
                    'ZH': 'zh',
                    'AR': 'ar'
                };
                
                if (langMap[buttonText]) {
                    currentLanguage = langMap[buttonText];
                    console.log('Idioma detectado:', currentLanguage);
                }
            });
        });
    }
    
    // =============================================
    // CONTEXTO DEL NEGOCIO (MULTIIDIOMA)
    // =============================================
    
    function getSystemPrompt(lang) {
        const prompts = {
            es: `Eres el asistente virtual profesional de BridgeMind Education. Responde SIEMPRE en español.

INFORMACIÓN DEL NEGOCIO:
- BridgeMind enseña idiomas (español e inglés) mediante el juego de Bridge
- Bridge: juego de cartas con 2 fases (declaración y carteo), se juega en parejas
- 4 alumnos por mesa
- 6 horas semanales en 3 días
- Duración: 1 año (opción semestre piloto)
- Para instituciones educativas
- Orientado a jóvenes (cualquier edad bienvenida)

DEMO GRATUITA:
- Disponible en cualquier ubicación
- 1 día completo
- 4 participantes (pueden tener cero conocimiento)
- Cliente cubre: transporte, alojamiento, equipos (TV, tablets)

FINANCIAMIENTO:
- Buscando inversión para salarios e implementación tecnológica

CONTACTO:
- WhatsApp: +34 634 268 663
- WeChat: +34 634 268 663
- Telegram: +34 634 268 663
- Email: bridgemindgames@gmail.com

IDIOMAS DEL EQUIPO:
- El equipo responde en español e inglés
- Para otros idiomas se usan traductores
- Menciona esto cuando pidan contacto humano

Tono: Profesional, innovador, entusiasta. Respuestas concisas. Ofrece demo/reunión a interesados.`,

            en: `You are BridgeMind Education's professional virtual assistant. ALWAYS respond in English.

BUSINESS INFO:
- BridgeMind teaches languages (Spanish & English) through Bridge card game
- Bridge: 2-phase card game (bidding/play), played in pairs
- 4 students per table
- 6 hours/week over 3 days
- Duration: 1 year (pilot semester option)
- For educational institutions
- Aimed at youth (all ages welcome)

FREE DEMO:
- Available anywhere
- 1 full day
- 4 participants (can have zero knowledge)
- Client covers: transport, accommodation, equipment (TV, tablets)

FUNDING:
- Seeking investment for salaries and tech implementation

CONTACT:
- WhatsApp: +34 634 268 663
- WeChat: +34 634 268 663
- Telegram: +34 634 268 663
- Email: bridgemindgames@gmail.com

TEAM LANGUAGES:
- Team responds in Spanish and English
- Other languages use translators
- Mention this when they request human contact

Tone: Professional, innovative, enthusiastic. Concise responses. Offer demo/meeting to interested parties.`,

            fr: `Vous êtes l'assistant virtuel professionnel de BridgeMind Education. Répondez TOUJOURS en français.

INFORMATIONS:
- BridgeMind enseigne les langues (espagnol et anglais) par le jeu de Bridge
- Bridge: jeu de cartes à 2 phases, joué en paires
- 4 élèves par table
- 6 heures/semaine sur 3 jours
- Durée: 1 an (option semestre pilote)
- Pour institutions éducatives

DÉMO GRATUITE:
- Disponible partout
- 1 journée complète
- 4 participants
- Client couvre: transport, hébergement, équipements

CONTACT:
- WhatsApp: +34 634 268 663
- WeChat: +34 634 268 663
- Telegram: +34 634 268 663
- Email: bridgemindgames@gmail.com

LANGUES:
- Équipe répond en espagnol et anglais
- Autres langues: traducteurs disponibles

Ton professionnel et enthousiaste.`,

            de: `Sie sind der professionelle virtuelle Assistent von BridgeMind Education. Antworten Sie IMMER auf Deutsch.

INFORMATIONEN:
- BridgeMind lehrt Sprachen (Spanisch & Englisch) durch Bridge-Kartenspiel
- Bridge: 2-Phasen-Spiel, in Paaren gespielt
- 4 Schüler pro Tisch
- 6 Stunden/Woche über 3 Tage
- Dauer: 1 Jahr (Pilotsemester-Option)
- Für Bildungseinrichtungen

KOSTENLOSE DEMO:
- Überall verfügbar
- 1 voller Tag
- 4 Teilnehmer
- Kunde deckt: Transport, Unterkunft, Ausrüstung

KONTAKT:
- WhatsApp: +34 634 268 663
- WeChat: +34 634 268 663
- Telegram: +34 634 268 663
- Email: bridgemindgames@gmail.com

SPRACHEN:
- Team antwortet auf Spanisch und Englisch
- Andere Sprachen: Übersetzer verfügbar

Professioneller und enthusiastischer Ton.`,

            it: `Sei l'assistente virtuale professionale di BridgeMind Education. Rispondi SEMPRE in italiano.

INFORMAZIONI:
- BridgeMind insegna lingue (spagnolo e inglese) attraverso il Bridge
- Bridge: gioco di carte a 2 fasi, giocato in coppie
- 4 studenti per tavolo
- 6 ore/settimana in 3 giorni
- Durata: 1 anno (opzione semestre pilota)
- Per istituzioni educative

DEMO GRATUITA:
- Disponibile ovunque
- 1 giornata completa
- 4 partecipanti
- Cliente copre: trasporto, alloggio, attrezzature

CONTATTO:
- WhatsApp: +34 634 268 663
- WeChat: +34 634 268 663
- Telegram: +34 634 268 663
- Email: bridgemindgames@gmail.com

LINGUE:
- Team risponde in spagnolo e inglese
- Altre lingue: traduttori disponibili

Tono professionale ed entusiasta.`,

            ja: `あなたはBridgeMind Educationのプロフェッショナルなバーチャルアシスタントです。常に日本語で回答してください。

情報:
- BridgeMindはブリッジカードゲームを通じて言語（スペイン語と英語）を教えます
- ブリッジ: 2フェーズのゲーム、ペアでプレイ
- テーブルあたり4人の生徒
- 週6時間、3日間
- 期間: 1年（パイロット学期オプション）
- 教育機関向け

無料デモ:
- どこでも利用可能
- 丸1日
- 4人の参加者
- クライアント負担: 交通費、宿泊費、機器

連絡先:
- WhatsApp: +34 634 268 663
- WeChat: +34 634 268 663
- Telegram: +34 634 268 663
- Email: bridgemindgames@gmail.com

言語:
- チームはスペイン語と英語で対応
- 他の言語: 翻訳者利用可能

プロフェッショナルで熱心なトーン。`,

            zh: `您是BridgeMind Education的专业虚拟助手。始终用中文回复。

信息:
- BridgeMind通过桥牌游戏教授语言（西班牙语和英语）
- 桥牌：2阶段游戏，成对游戏
- 每桌4名学生
- 每周6小时，分3天
- 时长：1年（试点学期选项）
- 面向教育机构

免费演示:
- 任何地点均可
- 完整1天
- 4名参与者
- 客户承担：交通、住宿、设备

联系方式:
- WhatsApp: +34 634 268 663
- WeChat: +34 634 268 663
- Telegram: +34 634 268 663
- Email: bridgemindgames@gmail.com

语言:
- 团队用西班牙语和英语回复
- 其他语言：可用翻译

专业热情的语气。`,

            ar: `أنت المساعد الافتراضي المحترف لـ BridgeMind Education. أجب دائمًا بالعربية.

المعلومات:
- BridgeMind يعلم اللغات (الإسبانية والإنجليزية) من خلال لعبة البريدج
- البريدج: لعبة من مرحلتين، تُلعب في أزواج
- 4 طلاب لكل طاولة
- 6 ساعات/أسبوع على 3 أيام
- المدة: سنة واحدة (خيار فصل تجريبي)
- للمؤسسات التعليمية

عرض توضيحي مجاني:
- متاح في أي مكان
- يوم كامل
- 4 مشاركين
- العميل يغطي: النقل، الإقامة، المعدات

الاتصال:
- WhatsApp: +34 634 268 663
- WeChat: +34 634 268 663
- Telegram: +34 634 268 663
- Email: bridgemindgames@gmail.com

اللغات:
- الفريق يرد بالإسبانية والإنجليزية
- اللغات الأخرى: مترجمون متاحون

نبرة محترفة ومتحمسة.`
        };
        
        return prompts[lang] || prompts['es'];
    }

    // =============================================
    // ESTILOS CSS
    // =============================================
    
    const style = document.createElement('style');
    style.textContent = `
        #bmg-chat-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 65px;
            height: 65px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(102, 126, 234, 0.5);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.3s, box-shadow 0.3s;
            padding: 12px;
        }
        
        #bmg-chat-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 30px rgba(102, 126, 234, 0.7);
        }
        
        #bmg-chat-btn img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            filter: brightness(0) invert(1);
        }
        
        #bmg-chat-box {
            position: fixed;
            bottom: 95px;
            right: 20px;
            width: 380px;
            max-width: calc(100vw - 40px);
            height: 600px;
            max-height: calc(100vh - 125px);
            background: white;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.25);
            display: none;
            flex-direction: column;
            z-index: 9999;
            overflow: hidden;
            animation: slideUp 0.3s ease-out;
        }
        
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        #bmg-chat-box.show {
            display: flex;
        }
        
        .bmg-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .bmg-header h3 {
            margin: 0;
            font-size: 18px;
            font-weight: 600;
        }
        
        .bmg-status {
            font-size: 12px;
            opacity: 0.95;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        
        .bmg-dot {
            width: 8px;
            height: 8px;
            background: #4ade80;
            border-radius: 50%;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        
        .bmg-close {
            background: none;
            border: none;
            color: white;
            font-size: 28px;
            cursor: pointer;
            padding: 0;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.2s;
        }
        
        .bmg-close:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        
        .bmg-body {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: #f8f9fa;
        }
        
        .bmg-msg {
            margin-bottom: 16px;
            display: flex;
            animation: fadeIn 0.3s;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .bmg-msg.bot {
            justify-content: flex-start;
        }
        
        .bmg-msg.user {
            justify-content: flex-end;
        }
        
        .bmg-msg-txt {
            max-width: 80%;
            padding: 12px 16px;
            border-radius: 18px;
            font-size: 14px;
            line-height: 1.5;
            word-wrap: break-word;
        }
        
        .bmg-msg.bot .bmg-msg-txt {
            background: white;
            color: #2d3748;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            border-bottom-left-radius: 4px;
        }
        
        .bmg-msg.user .bmg-msg-txt {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-bottom-right-radius: 4px;
        }
        
        .bmg-typing {
            display: flex;
            gap: 6px;
            padding: 12px 16px;
            background: white;
            border-radius: 18px;
            border-bottom-left-radius: 4px;
            width: fit-content;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }
        
        .bmg-typing span {
            width: 8px;
            height: 8px;
            background: #667eea;
            border-radius: 50%;
            animation: bounce 1.4s infinite;
        }
        
        .bmg-typing span:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .bmg-typing span:nth-child(3) {
            animation-delay: 0.4s;
        }
        
        @keyframes bounce {
            0%, 60%, 100% { transform: translateY(0); }
            30% { transform: translateY(-10px); }
        }
        
        .bmg-input {
            padding: 16px;
            background: white;
            border-top: 1px solid #e2e8f0;
            display: flex;
            gap: 10px;
        }
        
        .bmg-input input {
            flex: 1;
            border: 2px solid #e2e8f0;
            border-radius: 24px;
            padding: 12px 18px;
            font-size: 14px;
            outline: none;
            transition: border-color 0.2s;
            font-family: inherit;
        }
        
        .bmg-input input:focus {
            border-color: #667eea;
        }
        
        .bmg-send {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            color: white;
            width: 46px;
            height: 46px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s;
        }
        
        .bmg-send:hover:not(:disabled) {
            transform: scale(1.08);
        }
        
        .bmg-send:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    `;
    document.head.appendChild(style);

    // =============================================
    // HTML
    // =============================================
    
    const html = `
        <button id="bmg-chat-btn" aria-label="Abrir chat">
            <img src="logo.png" alt="BridgeMind">
        </button>
        
        <div id="bmg-chat-box">
            <div class="bmg-header">
                <div>
                    <h3>BridgeMind Assistant</h3>
                    <div class="bmg-status">
                        <span class="bmg-dot"></span>
                        <span>En línea</span>
                    </div>
                </div>
                <button class="bmg-close">×</button>
            </div>
            
            <div class="bmg-body" id="bmg-msgs"></div>
            
            <div class="bmg-input">
                <input type="text" id="bmg-inp" placeholder="Escribe tu mensaje..." autocomplete="off">
                <button class="bmg-send" id="bmg-send">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', html);

    // =============================================
    // VARIABLES
    // =============================================
    
    let history = [];
    let processing = false;
    let started = false;

    // =============================================
    // ELEMENTOS
    // =============================================
    
    const btn = document.getElementById('bmg-chat-btn');
    const box = document.getElementById('bmg-chat-box');
    const close = box.querySelector('.bmg-close');
    const msgs = document.getElementById('bmg-msgs');
    const inp = document.getElementById('bmg-inp');
    const send = document.getElementById('bmg-send');

    // =============================================
    // FUNCIONES
    // =============================================
    
    function toggle() {
        box.classList.toggle('show');
        
        if (box.classList.contains('show')) {
            inp.focus();
            
            if (!started) {
                setTimeout(() => {
                    const welcomes = {
                        es: '¡Hola! 👋 Soy el asistente de BridgeMind Education.\n\n¿En qué puedo ayudarte?',
                        en: 'Hello! 👋 I\'m the BridgeMind Education assistant.\n\nHow can I help you?',
                        fr: 'Bonjour! 👋 Je suis l\'assistant de BridgeMind Education.\n\nComment puis-je vous aider?',
                        de: 'Hallo! 👋 Ich bin der BridgeMind Education Assistent.\n\nWie kann ich Ihnen helfen?',
                        it: 'Ciao! 👋 Sono l\'assistente di BridgeMind Education.\n\nCome posso aiutarti?',
                        ja: 'こんにちは！👋 BridgeMind Educationのアシスタントです。\n\nどうお手伝いできますか？',
                        zh: '你好！👋 我是BridgeMind Education的助手。\n\n我能帮您什么？',
                        ar: 'مرحبا! 👋 أنا مساعد BridgeMind Education.\n\nكيف يمكنني مساعدتك؟'
                    };
                    add(welcomes[currentLanguage] || welcomes['es'], 'bot');
                    started = true;
                }, 500);
            }
        }
    }
    
    function add(text, sender) {
        const div = document.createElement('div');
        div.className = `bmg-msg ${sender}`;
        
        const txt = document.createElement('div');
        txt.className = 'bmg-msg-txt';
        txt.innerHTML = text.replace(/\n/g, '<br>');
        
        div.appendChild(txt);
        msgs.appendChild(div);
        msgs.scrollTop = msgs.scrollHeight;
    }
    
    function showTyping() {
        const div = document.createElement('div');
        div.className = 'bmg-msg bot';
        div.id = 'bmg-typing';
        
        const typing = document.createElement('div');
        typing.className = 'bmg-typing';
        typing.innerHTML = '<span></span><span></span><span></span>';
        
        div.appendChild(typing);
        msgs.appendChild(div);
        msgs.scrollTop = msgs.scrollHeight;
    }
    
    function removeTyping() {
        const t = document.getElementById('bmg-typing');
        if (t) t.remove();
    }
    
    async function sendMsg(text = null) {
        const msg = text || inp.value.trim();
        if (!msg || processing) return;
        
        processing = true;
        send.disabled = true;
        
        add(msg, 'user');
        inp.value = '';
        
        history.push({
            role: 'user',
            parts: [{ text: msg }]
        });
        
        showTyping();
        
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [
                        {
                            role: 'user',
                            parts: [{ text: getSystemPrompt(currentLanguage) }]
                        },
                        ...history
                    ],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 500
                    }
                })
            });
            
            const data = await response.json();
            removeTyping();
            
            if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
                const reply = data.candidates[0].content.parts[0].text;
                add(reply, 'bot');
                
                history.push({
                    role: 'model',
                    parts: [{ text: reply }]
                });
            } else {
                throw new Error('Invalid response');
            }
        } catch (error) {
            removeTyping();
            console.error('Error:', error);
            
            const errors = {
                es: 'Disculpa, tuve un problema. Contáctanos:\n📱 WhatsApp: +34 634 268 663\n📧 bridgemindgames@gmail.com',
                en: 'Sorry, I had a problem. Contact us:\n📱 WhatsApp: +34 634 268 663\n📧 bridgemindgames@gmail.com'
            };
            
            add(errors[currentLanguage] || errors['es'], 'bot');
        }
        
        processing = false;
        send.disabled = false;
        inp.focus();
    }

    // =============================================
    // EVENT LISTENERS
    // =============================================
    
    btn.addEventListener('click', toggle);
    close.addEventListener('click', toggle);
    send.addEventListener('click', () => sendMsg());
    
    inp.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMsg();
        }
    });
    
    // =============================================
    // INICIALIZACIÓN
    // =============================================
    
    window.addEventListener('DOMContentLoaded', () => {
        detectLanguageButtons();
        console.log('BridgeMind Chatbot inicializado');
    });
})();
