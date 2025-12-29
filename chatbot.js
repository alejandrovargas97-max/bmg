// chatbot.js - Inteligencia Global BridgeMind Games BGM
const BridgeBot = {
    config: {
        phone: "34634268663",
        telegram: "BridgeMindGames",
        wechat: "BridgeMindBGM"
    },
    
    dictionary: {
        es: {
            keywords: {
                "hola": "¡Hola! Soy el asistente de BridgeMind Games BGM. ¿En qué nivel te gustaría entrenar?",
                "basico": "Nivel Básico: Ideal para fundamentos y estimulación cognitiva inicial.",
                "intermedio": "Nivel Intermedio: Gramática fluida con retos de memoria y atención.",
                "avanzado": "Nivel Avanzado: Bilingüismo activo y resolución de problemas complejos.",
                "experto": "Nivel Experto: Dominio total y máxima capacidad neuro-cognitiva.",
                "juego": "Puedes ajustar el nivel de juego independientemente del idioma.",
                "precio": "Los precios se adaptan a cada institución. ¿Quieres una cotización?"
            },
            unresolved: "Entiendo. ¿Prefieres hablar directamente con un experto de BridgeMind Games BGM?",
            cta: "Contactar soporte:"
        },
        en: {
            keywords: {
                "hello": "Hello! I'm the BridgeMind Games BGM assistant. At which level would you like to train?",
                "basic": "Basic Level: Ideal for foundations and initial cognitive stimulation.",
                "intermediate": "Intermediate Level: Fluent grammar with memory and attention challenges.",
                "advanced": "Advanced Level: Active bilingualism and complex problem solving.",
                "expert": "Expert Level: Total mastery and maximum neuro-cognitive capacity.",
                "game": "You can adjust the game level independently from the language.",
                "price": "Prices are tailored for each institution. Would you like a quote?"
            },
            unresolved: "I see. Would you prefer to speak directly with a BridgeMind Games BGM expert?",
            cta: "Contact support:"
        },
        fr: {
            keywords: {
                "bonjour": "Bonjour ! Je suis l'assistant BGM. À quel niveau souhaitez-vous vous entraîner ?",
                "basique": "Niveau Basique : Idéal pour les bases et la stimulation cognitive.",
                "expert": "Niveau Expert : Maîtrise totale et capacité neuro-cognitive maximale."
            },
            unresolved: "Je comprends. Vous souhaitez contacter un expert de BridgeMind Games BGM ?",
            cta: "Contacter le support :"
        },
        de: {
            keywords: {
                "hallo": "Hallo! Ich bin der BGM-Assistent. Auf welchem Level möchten Sie trainieren?",
                "basis": "Basis-Level: Ideal für Grundlagen und kognitive Stimulation.",
                "experte": "Experten-Level: Volle Beherrschung und maximale kognitive Kapazität."
            },
            unresolved: "Ich verstehe. Möchten Sie direkt mit einem BGM-Experten sprechen?",
            cta: "Support kontaktieren:"
        },
        it: {
            keywords: {
                "ciao": "Ciao! Sono l'assistente BGM. A che livello vorresti allenarti?",
                "base": "Livello Base: Ideale per le basi e la stimolazione cognitiva.",
                "esperto": "Livello Esperto: Padronanza totale e massima capacità cognitiva."
            },
            unresolved: "Capisco. Preferisci parlare con un esperto di BridgeMind Games BGM?",
            cta: "Contatta il supporto:"
        },
        jp: {
            keywords: {
                "こんにちは": "こんにちは！BGMアシスタントです。どのレベルでトレーニングしたいですか？",
                "基本": "基本レベル：基礎と初期の認知刺激に最適です。",
                "エキスパート": "エキスパートレベル：完全な習得と最大の神経認知能力。"
            },
            unresolved: "承知いたしました。専門スタッフに直接相談されますか？",
            cta: "サポートに連絡:"
        },
        zh: {
            keywords: {
                "你好": "你好！我是 BGM 助手。你想在哪个级别进行训练？",
                "基础": "基础级别：非常适合基础训练和初步认知刺激。",
                "专家": "专家级：完全掌握和最高神经认知能力。"
            },
            unresolved: "我明白。您想直接咨询 BridgeMind Games BGM 的专家吗？",
            cta: "联系支持:"
        },
        ar: {
            keywords: {
                "مرحبا": "مرحباً! أنا مساعد BGM. في أي مستوى تود التدريب؟",
                "أساسي": "المستوى الأساسي: مثالي للأساسيات والتحفيز المعرفي الأولي.",
                "خبير": "مستوى الخبير: إتقان تام وأقصى قدرة عصبية معرفية."
            },
            unresolved: "أفهم ذلك. هل تفضل التحدث مباشرة مع خبير في BridgeMind Games BGM؟",
            cta: "الاتصال بالدعم:"
        }
    },

    process: function(message, lang) {
        const text = message.toLowerCase();
        // Fallback al inglés si el idioma no existe
        const data = this.dictionary[lang] || this.dictionary.en;
        let response = null;

        for (let key in data.keywords) {
            if (text.includes(key)) {
                response = data.keywords[key];
                break;
            }
        }

        return {
            text: response || data.unresolved,
            cta: data.cta
        };
    }
};

function sendChatMessage() {
    const input = document.getElementById('chatbot-input');
    const messagesDiv = document.getElementById('chatbot-messages');
    const msg = input.value.trim();
    if (!msg) return;

    // Detectar idioma desde la variable global de tu index.html
    const lang = window.currentLang || 'es';

    // Mostrar mensaje usuario
    const uDiv = document.createElement('div');
    uDiv.className = 'user-message';
    uDiv.textContent = msg;
    messagesDiv.appendChild(uDiv);
    input.value = '';

    // Respuesta del Bot
    setTimeout(() => {
        const res = BridgeBot.process(msg, lang);
        const bDiv = document.createElement('div');
        bDiv.className = 'bot-message';
        
        const encoded = encodeURIComponent(`BridgeMind BGM (${lang}) - Consulta: "${msg}"`);
        
        bDiv.innerHTML = `
            <div>${res.text}</div>
            <div style="margin-top:10px; border-top:1px solid rgba(255,255,255,0.1); padding-top:8px;">
                <small style="font-size:10px; opacity:0.8;">${res.cta}</small><br>
                <div style="display:flex; gap:10px; margin-top:5px; flex-wrap:wrap;">
                    <a href="https://wa.me/${BridgeBot.config.phone}?text=${encoded}" target="_blank" style="color:#25d366; text-decoration:none; font-size:11px; font-weight:bold;">WhatsApp</a>
                    <a href="https://t.me/${BridgeBot.config.telegram}" target="_blank" style="color:#0088cc; text-decoration:none; font-size:11px; font-weight:bold;">Telegram</a>
                </div>
            </div>
        `;
        
        messagesDiv.appendChild(bDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, 500);
}
