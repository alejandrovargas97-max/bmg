// ==========================================
// BGM CHATBOT ENGINE - v3.0
// Brand: BridgeMindGames BGM
// ==========================================

const chatbotLogic = {
    isOpen: false,
    messages: [
        { role: 'system', content: 'Bienvenido al sistema BridgeMindGames. ¿En qué puedo ayudarte hoy?' }
    ],

    // Crear la estructura visual si no existe
    init() {
        const container = document.getElementById('chatbot-container');
        if (container) {
            container.innerHTML = `
                <div id="bgm-chat-header" style="background: #00ffcc; color: #000; padding: 10px; font-weight: bold; display: flex; justify-content: space-between; align-items: center;">
                    <span>BGM ASSISTANT</span>
                    <button onclick="window.toggleChatbot()" style="background: none; border: none; cursor: pointer; font-weight: bold;">X</button>
                </div>
                <div id="bgm-chat-messages" style="height: 300px; overflow-y: auto; padding: 10px; background: #111; color: #fff; font-family: monospace; display: flex; flex-direction: column; gap: 8px;">
                </div>
                <div style="padding: 10px; background: #222; display: flex; gap: 5px;">
                    <input type="text" id="chatbot-input" placeholder="Escribe un comando..." style="flex-grow: 1; background: #000; border: 1px solid #00ffcc; color: #00ffcc; padding: 5px;">
                    <button id="send-chat-btn" style="background: #00ffcc; border: none; padding: 5px 10px; cursor: pointer; font-weight: bold;">></button>
                </div>
            `;
            this.renderMessages();
        }
    },

    renderMessages() {
        const msgContainer = document.getElementById('bgm-chat-messages');
        if (!msgContainer) return;
        
        msgContainer.innerHTML = this.messages.map(m => `
            <div style="align-self: ${m.role === 'user' ? 'flex-end' : 'flex-start'}; 
                        background: ${m.role === 'user' ? '#004433' : '#333'}; 
                        padding: 8px; border-radius: 5px; max-width: 80%; border-left: 3px solid #00ffcc;">
                ${m.content}
            </div>
        `).join('');
        msgContainer.scrollTop = msgContainer.scrollHeight;
    }
};

// --- Funciones Globales (las que llama tu Index) ---

window.toggleChatbot = function() {
    const container = document.getElementById('chatbot-container');
    if (!container) return;
    
    chatbotLogic.isOpen = !chatbotLogic.isOpen;
    container.style.display = chatbotLogic.isOpen ? 'block' : 'none';
    
    if (chatbotLogic.isOpen && container.innerHTML === "") {
        chatbotLogic.init();
    }
};

window.sendChatMessage = function() {
    const input = document.getElementById('chatbot-input');
    const text = input.value.trim();
    
    if (text === "") return;

    // Agregar mensaje del usuario
    chatbotLogic.messages.push({ role: 'user', content: text });
    input.value = "";
    chatbotLogic.renderMessages();

    // Respuesta simulada de BGM
    setTimeout(() => {
        chatbotLogic.messages.push({ 
            role: 'system', 
            content: `BGM_LOG: Procesando "${text}"... Acceso concedido.` 
        });
        chatbotLogic.renderMessages();
    }, 600);
};

// Vincular eventos de teclado
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && document.activeElement.id === 'chatbot-input') {
        window.sendChatMessage();
    }
});
