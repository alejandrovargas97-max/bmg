// chatbot.js - Motor de Inteligencia para BridgeMind Games BGM
const BridgeBot = {
    config: {
        phone: "34634268663",
        telegramUser: "BridgeMindGames", // Cambia por tu alias de Telegram
        wechatId: "BridgeMindBGM"       // Tu ID de WeChat
    },

    // Diccionario de Intenciones
    dictionary: {
        es: {
            saludo: ["hola", "buenos dias", "buenas tardes", "saludos"],
            cita: ["cita", "reunion", "agendar", "demo", "videollamada", "hablar", "entrevista"],
            info: ["precio", "costo", "programa", "metodo", "ia", "inteligencia"],
            respuestas: {
                welcome: "¡Hola! Soy el asistente de BridgeMind Games BGM. ¿Te gustaría agendar una demo o saber más sobre nuestro sistema neuro-lingüístico?",
                info: "Nuestro sistema usa IA para entrenar el cerebro y el lenguaje simultáneamente. Los costos dependen del número de alumnos/usuarios.",
                fallback: "Es una excelente pregunta. Como es un tema específico, lo mejor es que hablemos directamente para darte una respuesta exacta."
            },
            cta: "Haz clic para comunicarte conmigo ahora:"
        },
        en: {
            saludo: ["hello", "hi", "good morning", "hey"],
            cita: ["appointment", "meeting", "schedule", "demo", "call", "talk", "video call"],
            info: ["price", "cost", "program", "method", "ai", "intelligence"],
            respuestas: {
                welcome: "Hello! I am the BridgeMind Games BGM assistant. Would you like to schedule a demo or learn more about our neuro-linguistic system?",
                info: "Our system uses AI to train the brain and language simultaneously. Costs depend on the number of students/users.",
                fallback: "That's a great question. Since it's a specific matter, it's best we talk directly to provide an accurate answer."
            },
            cta: "Click to contact me now:"
        }
    },

    // Procesador de lógica
    getResponse: function(message, lang) {
        const msg = message.toLowerCase();
        const data = this.dictionary[lang] || this.dictionary.es;
        
        // 1. Detectar si pide CITA o CONTACTO
        const pideCita = data.cita.some(word => msg.includes(word));
        const pideInfo = data.info.some(word => msg.includes(word));
        const esSaludo = data.saludo.some(word => msg.includes(word));

        if (esSaludo) return { text: data.respuestas.welcome, showLinks: false };
        if (pideInfo) return { text: data.respuestas.info, showLinks: true };
        if (pideCita) return { text: "Excelente. Vamos a agendar tu cita.", showLinks: true };

        // 2. Si no entiende (Fallback)
        return { text: data.respuestas.fallback, showLinks: true };
    },

    // Generador de enlaces de mensajería
    getLinks: function(userMsg, lang) {
        const text = encodeURIComponent(`BridgeMind BGM - Consulta (${lang}): ${userMsg}`);
        return {
            whatsapp: `https://wa.me/${this.config.phone}?text=${text}`,
            telegram: `https://t.me/${this.config.telegramUser}`,
            wechat: `weixin://dl/chat?${this.config.wechatId}` // Nota: WeChat requiere que el usuario te tenga agregado o usar un QR
        };
    }
};

// --- FUNCIÓN DE INTEGRACIÓN CON TU HTML ---
function sendChatMessage() {
    const input = document.getElementById('chatbot-input');
    const messagesDiv = document.getElementById('chatbot-messages');
    const msg = input.value.trim();
    if (!msg) return;

    // Idioma actual
    const currentLang = document.querySelector('.lang-button.active')?.dataset.lang || 'es';

    // Mensaje del usuario
    const uMsg = document.createElement('div');
    uMsg.className = 'user-message';
    uMsg.textContent = msg;
    messagesDiv.appendChild(uMsg);
    input.value = '';

    // Respuesta del Bot
    setTimeout(() => {
        const response = BridgeBot.getResponse(msg, currentLang);
        const bMsg = document.createElement('div');
        bMsg.className = 'bot-message';
        bMsg.innerHTML = response.text;

        if (response.showLinks) {
            const links = BridgeBot.getLinks(msg, currentLang);
            const ctaText = BridgeBot.dictionary[currentLang].cta;
            bMsg.innerHTML += `<br><br><strong>${ctaText}</strong><br>
                <div style="margin-top:10px; display:flex; gap:10px; flex-wrap:wrap;">
                    <a href="${links.whatsapp}" target="_blank" style="background:#25d366; color:white; padding:5px 10px; border-radius:5px; text-decoration:none; font-size:0.8em;"><i class="fab fa-whatsapp"></i> WhatsApp</a>
                    <a href="${links.telegram}" target="_blank" style="background:#0088cc; color:white; padding:5px 10px; border-radius:5px; text-decoration:none; font-size:0.8em;"><i class="fab fa-telegram"></i> Telegram</a>
                </div>`;
        }

        messagesDiv.appendChild(bMsg);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, 600);
}
