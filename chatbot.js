// ==========================================
// BGM CHATBOT ENGINE - v3.1 (Optimized Layout)
// Brand: BridgeMindGames BGM
// ==========================================

const chatbotLogic = {
    isOpen: false,
    messages: [
        { role: 'system', content: 'SISTEMA BGM: En línea. ¿En qué puedo ayudarte?' }
    ],

    init() {
        const container = document.getElementById('chatbot-container');
        if (!container) return;

        // Estilos dinámicos para no tapar el contenido de contacto
        container.style.position = 'fixed';
        container.style.bottom = '80px'; // Sube un poco para dejar espacio
        container.style.right = '20px';
        container.style.zIndex = '1000';
        container.style.width = '320px';
        container.style.display = 'none';
        container.style.boxShadow = '0 0 20px rgba(0, 255, 204, 0.4)';

        container.innerHTML = `
            <div id="bgm-chat-header" style="background: #00ffcc; color: #000; padding: 12px; font-family: 'Segoe UI', sans-serif; font-weight: 900; display: flex; justify-content: space-between; align-items: center; border-radius: 10px 10px 0 0;">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <div style="width: 10px; height: 10px; background: #000; border-radius: 50%; animation: pulse 1.5s infinite;"></div>
                    <span>BGM INTERFACE</span>
                </div>
                <button onclick="window.toggleChatbot()" style="background: none; border: none; cursor: pointer; font-weight: bold; font-size: 1.2rem;">×</button>
            </div>
            <div id="bgm-chat-messages" style="height: 300px; overflow-y: auto; padding: 15px; background: rgba(10, 10, 10, 0.95); color: #fff; font-family: monospace; font-size: 0.9rem; display: flex; flex-direction: column; gap: 10px; border-left: 1px solid #00ffcc; border-right: 1px solid #00ffcc;">
            </div>
            <div style="padding: 10px; background: #1a1a1a; display: flex; gap: 8px; border-radius: 0 0 10px 10px; border: 1px solid #333; border-top: none;">
                <input type="text" id="chatbot-input" placeholder="Comando BGM..." style="flex-grow: 1; background: #000; border: 1px solid #444; color: #00ffcc; padding: 8px; border-radius: 4px; outline: none;">
                <button id="send-chat-btn" onclick="window.sendChatMessage()" style="background: #00ffcc; border: none; padding: 8px 15px; cursor: pointer; border-radius: 4px; font-weight: bold;">></button>
            </div>
            <style>
                @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
                #bgm-chat-messages::-webkit-scrollbar { width: 5px; }
                #bgm-chat-messages::-webkit-scrollbar-thumb { background: #00ffcc; }
            </style>
        `;
        this.renderMessages();
    },

    renderMessages() {
        const msgContainer = document.getElementById('bgm-chat-messages');
        if (!msgContainer) return;
        
        msgContainer.innerHTML = this.messages.map(m => `
            <div style="align-self: ${m.role === 'user' ? 'flex-end' : 'flex-start'}; 
                        background: ${m.role === 'user' ? '#004433' : '#222'}; 
                        color: ${m.role === 'user' ? '#fff' : '#00ffcc'};
                        padding: 10px; border-radius: 8px; max-width: 85%; 
                        font-size: 0.85rem; line-height: 1.4;
                        box-shadow: 2px 2px 5px rgba(0,0,0,0.3);">
                ${m.content}
            </div>
        `).join('');
        msgContainer.scrollTop = msgContainer.scrollHeight;
    }
};

// --- Funciones Globales de BridgeMindGames BGM ---

window.toggleChatbot = function() {
    const container = document.getElementById('chatbot-container');
    const floatingBtn = document.getElementById('chatbot-toggle-floating');
    
    if (!container) return;
    
    chatbotLogic.isOpen = !chatbotLogic.isOpen;
    container.style.display = chatbotLogic.isOpen ? 'block' : 'none';

    // Si el chat está abierto, podemos ocultar el botón flotante para que no tape nada
    if (floatingBtn) {
        floatingBtn.style.opacity = chatbotLogic.isOpen ? '0' : '1';
        floatingBtn.style.pointerEvents = chatbotLogic.isOpen ? 'none' : 'auto';
    }
    
    if (chatbotLogic.isOpen && container.innerHTML === "") {
        chatbotLogic.init();
    }
};

window.sendChatMessage = function() {
    const input = document.getElementById('chatbot-input');
    if (!input) return;
    const text = input.value.trim();
    
    if (text === "") return;

    chatbotLogic.messages.push({ role: 'user', content: text });
    input.value = "";
    chatbotLogic.renderMessages();

    // Lógica de respuesta BGM
    setTimeout(() => {
        let response = "BGM_SYSTEM: Comando no reconocido. Intente 'info' o 'ayuda'.";
        if(text.toLowerCase().includes("hola")) response = "Saludos. Sistema BGM operativo. ¿Listo para el siguiente nivel?";
        if(text.toLowerCase().includes("info")) response = "BridgeMindGames (BGM) es tu portal de estrategia y lógica avanzada.";
        
        chatbotLogic.messages.push({ role: 'system', content: response });
        chatbotLogic.renderMessages();
    }, 600);
};

// Inicialización automática al cargar el script
if (document.getElementById('chatbot-container')) {
    chatbotLogic.init();
}
