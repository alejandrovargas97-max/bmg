// =============================================
// CHATBOT BRIDGEMIND CON GOOGLE GEMINI (GRATIS)
// =============================================

(function() {
    // 🔑 COLOCA TU API KEY DE GEMINI AQUÍ:
    const GEMINI_API_KEY = 'AIzaSyDDZsV69Pp3mIHyba4liiEMKTHZa1MIMpI'; // ← REEMPLAZA ESTO
    
    // =============================================
    // CONFIGURACIÓN DEL NEGOCIO
    // =============================================
    const BUSINESS_CONTEXT = `Eres el asistente virtual profesional de BridgeMind Education.

INFORMACIÓN DEL NEGOCIO:
- BridgeMind enseña idiomas (español e inglés) mediante el juego de Bridge
- El Bridge es un juego de cartas inglesas con 2 fases: declaración y carteo
- Se juega en parejas y requiere comunicación constante

MODELO DE IMPLEMENTACIÓN:
- 4 alumnos por mesa
- 6 horas semanales divididas en 3 días
- Duración: 1 año completo (también hay opción de semestre piloto)
- Orientado principalmente a jóvenes, pero cualquier edad puede participar
- Implementación presencial en aulas de instituciones educativas

BENEFICIOS:
- Los alumnos aprenden Bridge y el idioma simultáneamente
- Mejora memoria, lógica y habilidades cognitivas
- Metodología probada de neuro-lingüística con IA

DEMO GRATUITA:
- Disponible en cualquier ubicación de los 8 idiomas que ofrecemos
- Duración: 1 día completo
- Requisitos: 4 jóvenes participantes (pueden tener cero conocimiento de Bridge e idioma)
- Cliente cubre: transporte, alojamiento y equipos tecnológicos si son necesarios (TV smart, tablets)

FINANCIAMIENTO:
- Actualmente buscando inversión para salarios e implementación tecnológica
- Modelo de negocio: Contratos anuales con instituciones educativas

CONTACTO:
- WhatsApp: +34 634 268 663
- WeChat: +34 634 268 663
- Telegram: +34 634 268 663
- Email: bridgemindgames@gmail.com
- Horario: Horario laboral normal (depende de la zona)

IMPORTANTE SOBRE IDIOMAS:
- El equipo se comunica directamente en español e inglés
- Para otros idiomas (chino, japonés, árabe, alemán, francés, italiano) podemos usar traductores
- Siempre menciona esto cuando alguien pida contacto humano en idiomas diferentes a español/inglés

TONO DE COMUNICACIÓN:
- Innovador pero profesional
- Entusiasta sobre la metodología
- Accesible y cercano
- Siempre ofrece agendar demo o reunión para interesados
- Si detectas interés real, ofrece llenar formulario o contactar directamente

Responde de forma concisa, profesional y útil. Si no sabes algo, ofrece contacto directo.`;

    // =============================================
    // ESTILOS CSS
    // =============================================
    const style = document.createElement('style');
    style.textContent = `
        #bmg-chat-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.3s, box-shadow 0.3s;
        }
        
        #bmg-chat-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 25px rgba(102, 126, 234, 0.6);
        }
        
        #bmg-chat-btn svg {
            width: 28px;
            height: 28px;
            fill: white;
        }
        
        #bmg-chat-box {
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 380px;
            max-width: calc(100vw - 40px);
            height: 600px;
            max-height: calc(100vh - 120px);
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
        
        .bmg-chat-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .bmg-chat-header h3 {
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
        
        .bmg-status-dot {
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
            line-height: 1;
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
        
        .bmg-chat-body {
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
        
        .bmg-msg-content {
            max-width: 80%;
            padding: 12px 16px;
            border-radius: 18px;
            font-size: 14px;
            line-height: 1.5;
            word-wrap: break-word;
        }
        
        .bmg-msg.bot .bmg-msg-content {
            background: white;
            color: #2d3748;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            border-bottom-left-radius: 4px;
        }
        
        .bmg-msg.user .bmg-msg-content {
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
        
        .bmg-chat-input {
            padding: 16px;
            background: white;
            border-top: 1px solid #e2e8f0;
            display: flex;
            gap: 10px;
        }
        
        .bmg-chat-input input {
            flex: 1;
            border: 2px solid #e2e8f0;
            border-radius: 24px;
            padding: 12px 18px;
            font-size: 14px;
            outline: none;
            transition: border-color 0.2s;
            font-family: inherit;
        }
        
        .bmg-chat-input input:focus {
            border-color: #667eea;
        }
        
        .bmg-send-btn {
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
            flex-shrink: 0;
        }
        
        .bmg-send-btn:hover:not(:disabled) {
            transform: scale(1.08);
        }
        
        .bmg-send-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        
        .bmg-quick-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 12px;
        }
        
        .bmg-quick-btn {
            background: white;
            border: 2px solid #667eea;
            color: #667eea;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 13px;
            cursor: pointer;
            transition: all 0.2s;
            font-weight: 500;
        }
        
        .bmg-quick-btn:hover {
            background: #667eea;
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }
    `;
    document.head.appendChild(style);

    // =============================================
    // HTML DEL CHAT
    // =============================================
    const chatHTML = `
        <button id="bmg-chat-btn" aria-label="Abrir chat">
            <img src="logo.png" alt="BridgeMind" style="width:40px;height:40px;object-fit:contain;">
        </button>
        
        <div id="bmg-chat-box">
            <div class="bmg-chat-header">
                <div>
                    <h3>BridgeMind Assistant</h3>
                    <div class="bmg-status">
                        <span class="bmg-status-dot"></span>
                        <span>En línea</span>
                    </div>
                </div>
                <button class="bmg-close" aria-label="Cerrar chat">×</button>
            </div>
            
            <div class="bmg-chat-body" id="bmg-messages"></div>
            
            <div class="bmg-chat-input">
                <input 
                    type="text" 
                    id="bmg-input" 
                    placeholder="Escribe tu mensaje..."
                    autocomplete="off"
                >
                <button class="bmg-send-btn" id="bmg-send" aria-label="Enviar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', chatHTML);

    // =============================================
    // VARIABLES GLOBALES
    // =============================================
    let conversationHistory = [];
    let isProcessing = false;
    let chatStarted = false;

    // =============================================
    // ELEMENTOS DEL DOM
    // =============================================
    const chatBtn = document.getElementById('bmg-chat-btn');
    const chatBox = document.getElementById('bmg-chat-box');
    const closeBtn = chatBox.querySelector('.bmg-close');
    const messagesDiv = document.getElementById('bmg-messages');
    const input = document.getElementById('bmg-input');
    const sendBtn = document.getElementById('bmg-send');

    // =============================================
    // FUNCIONES
    // =============================================
    
    function toggleChat() {
        chatBox.classList.toggle('show');
        
        if (chatBox.classList.contains('show')) {
            input.focus();
            
            if (!chatStarted) {
                setTimeout(() => {
                    addMessage('¡Hola! 👋 Soy el asistente de BridgeMind Education.\n\n¿En qué puedo ayudarte hoy?', 'bot', true);
                    chatStarted = true;
                }, 500);
            }
        }
    }
    
    function addMessage(text, sender, showQuickActions = false) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `bmg-msg ${sender}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'bmg-msg-content';
        contentDiv.innerHTML = text.replace(/\n/g, '<br>');
        
        msgDiv.appendChild(contentDiv);
        messagesDiv.appendChild(msgDiv);
        
        if (showQuickActions && sender === 'bot') {
            addQuickActions();
        }
        
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
    
    function addQuickActions() {
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'bmg-msg bot';
        
        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'bmg-quick-actions';
        
        const actions = ['Solicitar Demo', 'Más información', 'Hablar con humano'];
        
        actions.forEach(action => {
            const btn = document.createElement('button');
            btn.className = 'bmg-quick-btn';
            btn.textContent = action;
            btn.onclick = () => sendMessage(action);
            buttonsDiv.appendChild(btn);
        });
        
        actionsDiv.appendChild(buttonsDiv);
        messagesDiv.appendChild(actionsDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
    
    function showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'bmg-msg bot';
        typingDiv.id = 'bmg-typing';
        
        const indicator = document.createElement('div');
        indicator.className = 'bmg-typing';
        indicator.innerHTML = '<span></span><span></span><span></span>';
        
        typingDiv.appendChild(indicator);
        messagesDiv.appendChild(typingDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
    
    function removeTyping() {
        const typing = document.getElementById('bmg-typing');
        if (typing) typing.remove();
    }
    
    async function sendMessage(text = null) {
        const message = text || input.value.trim();
        if (!message || isProcessing) return;
        
        isProcessing = true;
        sendBtn.disabled = true;
        
        addMessage(message, 'user');
        input.value = '';
        
        conversationHistory.push({
            role: 'user',
            parts: [{ text: message }]
        });
        
        showTyping();
        
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [
                        {
                            role: 'user',
                            parts: [{ text: BUSINESS_CONTEXT }]
                        },
                        ...conversationHistory
                    ],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 500
                    }
                })
            });
            
            const data = await response.json();
            removeTyping();
            
            if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
                const botResponse = data.candidates[0].content.parts[0].text;
                addMessage(botResponse, 'bot');
                
                conversationHistory.push({
                    role: 'model',
                    parts: [{ text: botResponse }]
                });
            } else {
                throw new Error('Respuesta inválida de la API');
            }
        } catch (error) {
            removeTyping();
            console.error('Error:', error);
            addMessage('Disculpa, tuve un problema. ¿Podrías contactarnos directamente?\n\n📱 WhatsApp: +34 634 268 663\n📧 bridgemindgames@gmail.com', 'bot');
        }
        
        isProcessing = false;
        sendBtn.disabled = false;
        input.focus();
    }

    // =============================================
    // EVENT LISTENERS
    // =============================================
    
    chatBtn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);
    sendBtn.addEventListener('click', () => sendMessage());
    
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
})();
