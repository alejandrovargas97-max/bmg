// ==========================================
// BGM ENGINE - INTEGRACIÓN TOTAL
// ==========================================

// 1. Mantenemos el estado sincronizado con tu Index
let isChatOpen = false;

// 2. Función de Toggle (La que llama tu botón flotante)
window.toggleChatbot = function() {
    const container = document.getElementById('chatbot-container');
    if (!container) return;

    isChatOpen = !isChatOpen;
    container.style.display = isChatOpen ? 'flex' : 'none';
    
    // Si se abre y está vacío, inyectamos la interfaz BGM
    if (isChatOpen && container.innerHTML.trim() === "") {
        renderBGMInterface();
    }
};

// 3. Renderizado de la Interfaz (Sin romper el CSS global)
function renderBGMInterface() {
    const container = document.getElementById('chatbot-container');
    container.style.flexDirection = 'column';
    container.style.backgroundColor = '#0a0a0a';
    container.style.border = '2px solid #00ffcc';
    container.style.borderRadius = '12px';
    container.style.overflow = 'hidden';

    container.innerHTML = `
        <div style="background:#00ffcc; color:#000; padding:10px; font-weight:bold; display:flex; justify-content:space-between;">
            <span>BGM SYSTEM</span>
            <button onclick="window.toggleChatbot()" style="background:none; border:none; cursor:pointer;">✕</button>
        </div>
        <div id="bgm-messages-display" style="height:300px; overflow-y:auto; padding:10px; display:flex; flex-direction:column; gap:8px; background:#111;">
            <div style="color:#00ffcc; font-family:monospace; font-size:13px;">[SYS]: Sistema BridgeMindGames activo.</div>
        </div>
        <div style="padding:10px; display:flex; gap:5px; border-top:1px solid #333;">
            <input type="text" id="chatbot-input" placeholder="Escribir..." style="flex-grow:1; background:#000; color:#00ffcc; border:1px solid #444; padding:5px;">
            <button onclick="window.sendChatMessage()" style="background:#00ffcc; border:none; padding:5px 10px; cursor:pointer;">></button>
        </div>
    `;
}

// 4. Función de Envío (La que llama tu listener de 'Enter' en el Index)
window.sendChatMessage = function() {
    const input = document.getElementById('chatbot-input');
    const display = document.getElementById('bgm-messages-display');
    if (!input || !input.value.trim()) return;

    const userMsg = input.value;
    display.innerHTML += `<div style="align-self:flex-end; background:#004433; padding:8px; border-radius:8px; font-size:13px; color:white;">${userMsg}</div>`;
    
    input.value = "";
    display.scrollTop = display.scrollHeight;

    // Respuesta IA BGM
    setTimeout(() => {
              const lang = (typeof window.getCurrentLanguage === 'function') ? window.getCurrentLanguage() : 'es';

      const bgmResponses = {
        es: "Procesando datos en BGM...",
        en: "Processing BGM data...",
        fr: "Traitement des données dans BGM...",
        de: "Verarbeitung von BGM-Daten...",
        it: "Elaborazione dei dati in BGM...",
        jp: "BGM でデータを処理しています...",
        ch: "正在在 BGM 中处理数据...",
        ar: "جاري معالجة البيانات في BGM..."
      };

      const response = bgmResponses[lang] || bgmResponses.en;
        display.innerHTML += `<div style="align-self:flex-start; background:#222; padding:8px; border-radius:8px; font-size:13px; color:#00ffcc; border-left:2px solid #00ffcc;">${response}</div>`;
        display.scrollTop = display.scrollHeight;
    }, 800);
};
