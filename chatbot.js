// chatbot.js - Inteligencia BridgeMind Games BGM con Niveles
const BridgeBot = {
    config: {
        phone: "34634268663",
        telegram: "BridgeMindGames",
        wechat: "BridgeMindBGM"
    },
    
    // Diccionario con lógica de niveles y combinaciones
    dictionary: {
        es: {
            keywords: {
                "hola": "¡Hola! Soy el asistente de BridgeMind Games BGM. ¿Buscas info sobre nuestros programas educativos o niveles de entrenamiento?",
                "precio": "Los precios se adaptan a cada institución. ¿Te gustaría recibir una cotización?",
                "demo": "Podemos agendar una demo por Zoom para mostrarte la IA. ¿Te interesa?",
                "ia": "Nuestra IA ajusta la dificultad neuro-lingüística según el desempeño del usuario.",
                // Lógica de Niveles
                "basico": "En el nivel **Básico**, nos enfocamos en fundamentos lingüísticos y estimulación cognitiva inicial.",
                "intermedio": "El nivel **Intermedio** combina gramática fluida con retos de memoria y atención rápida.",
                "avanzado": "El nivel **Avanzado** exige bilingüismo activo y resolución de problemas complejos bajo presión.",
                "experto": "El nivel **Experto** es nuestra combinación más alta: dominio total del idioma y alta capacidad neuro-cognitiva.",
                "juego": "Puedes elegir el nivel de **Juego** (Mecánicas) independientemente del nivel de **Idioma**.",
                "idioma": "Ofrecemos 4 categorías de idioma: Básico, Intermedio, Avanzado y Experto."
            },
            unresolved: "Es una consulta muy específica. ¿Prefieres que un asesor de BridgeMind te lo explique directamente por chat?",
            cta: "Contactar con soporte BGM:"
        },
        en: {
            keywords: {
                "hello": "Hello! I'm the BridgeMind Games BGM assistant. Looking for info on our programs or training levels?",
                "price": "Prices are tailored for each institution. Would you like a quote?",
                "demo": "We can schedule a Zoom demo. Interested?",
                "ai": "Our AI adjusts neuro-linguistic difficulty based on user performance.",
                // Levels Logic
                "basic": "In the **Basic** level, we focus on linguistic foundations and initial cognitive stimulation.",
                "intermediate": "The **Intermediate** level combines fluent grammar with memory and quick attention challenges.",
                "advanced": "The **Advanced** level requires active bilingualism and solving complex problems under pressure.",
                "expert": "The **Expert** level is our highest combination: full language mastery and high neuro-cognitive capacity.",
                "game": "You can choose the **Game** level (Mechanics) independently from the **Language** level.",
                "language": "We offer 4 language categories: Basic, Intermediate, Advanced, and Expert."
            },
            unresolved: "That's a very specific inquiry. Would you prefer a BridgeMind consultant to explain it via chat?",
            cta: "Contact BGM support:"
        }
    },

    process: function(message, lang) {
        const text = message.toLowerCase();
        const data = this.dictionary[lang] || this.dictionary.es;
        let response = null;

        // Detección de combinaciones (Ej: "juego intermedio" o "idioma experto")
        if (text.includes("juego") || text.includes("game")) {
            if (text.includes("basico") || text.includes("basic")) response = lang === 'es' ? "Configurando: Juego (Básico) + Idioma a elección." : "Setting up: Game (Basic) + Language of choice.";
            if (text.includes("intermedio") || text.includes("intermediate")) response = lang === 'es' ? "Configurando: Juego (Intermedio). Ideal para usuarios con experiencia previa." : "Setting up: Game (Intermediate). Ideal for experienced users.";
        }

        // Búsqueda general de palabras clave si no se detectó combinación específica arriba
        if (!response) {
            for (let key in data.keywords) {
                if (text.includes(key)) {
                    response = data.keywords[key];
                    break;
                }
            }
        }

        return {
            text: response || data.unresolved,
            isFallback: !response,
            cta: data.cta
        };
    }
};

function sendChatMessage() {
    const input = document.getElementById('chatbot-input');
    const messagesDiv = document.getElementById('chatbot-messages');
    const msg = input.value.trim();
    if (!msg) return;

    const uDiv = document.createElement('div');
    uDiv.className = 'user-message';
    uDiv.textContent = msg;
    messagesDiv.appendChild(uDiv);
    input.value = '';

    const lang = document.querySelector('.lang-button.active')?.dataset.lang || 'es';

    setTimeout(() => {
        const res = BridgeBot.process(msg, lang);
        const bDiv = document.createElement('div');
        bDiv.className = 'bot-message';
        
        let html = `<div>${res.text}</div>`;
        const encoded = encodeURIComponent(`BridgeMind BGM - Consulta sobre Niveles: "${msg}"`);
        
        html += `<div style="margin-top:10px; border-top:1px solid rgba(255,255,255,0.2); padding-top:8px;">
            <small style="font-size:10px; opacity:0.8;">${res.cta}</small><br>
            <div style="display:flex; gap:10px; margin-top:5px; flex-wrap:wrap;">
                <a href="https://wa.me/${BridgeBot.config.phone}?text=${encoded}" target="_blank" style="color:#25d366; text-decoration:none; font-size:12px; font-weight:bold;">WhatsApp</a>
                <a href="https://t.me/${BridgeBot.config.telegram}" target="_blank" style="color:#0088cc; text-decoration:none; font-size:12px; font-weight:bold;">Telegram</a>
                <a href="weixin://dl/chat?${BridgeBot.config.wechat}" style="color:#09BB07; text-decoration:none; font-size:12px; font-weight:bold;">WeChat</a>
            </div>
        </div>`;
        
        bDiv.innerHTML = html;
        messagesDiv.appendChild(bDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, 600);
}
