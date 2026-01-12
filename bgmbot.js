// Configuración del Chatbot BGM
const chatbotBtn = document.createElement('button');
chatbotBtn.className = 'chatbot-btn';
// Usamos tu favicon como logo del botón
chatbotBtn.innerHTML = `<img src="favicon.ico" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">`;
document.body.appendChild(chatbotBtn);

const chatbotContainer = document.createElement('div');
chatbotContainer.className = 'chatbot-container';
chatbotContainer.innerHTML = `
    <div style="background:var(--blue); color:white; padding:15px; display:flex; justify-content:space-between; align-items:center;">
        <span style="font-weight:bold;">BGM AI Assistant</span>
        <button onclick="toggleChat()" style="background:none; border:none; color:white; cursor:pointer; font-size:20px;">&times;</button>
    </div>
    <div id="chat-messages" style="height:380px; overflow-y:auto; padding:15px; display:flex; flex-direction:column; gap:10px; color:#333; font-size:0.9rem;">
        <div style="background:#f1f1f1; padding:10px; border-radius:10px; align-self:flex-start;">
            Hola, soy el asistente de BridgeMind Games (BGM). ¿Eres un inversor/financista o representas a una institución educativa?
        </div>
    </div>
    <div style="padding:10px; border-top:1px solid #eee; display:flex; gap:5px;">
        <input type="text" id="chat-input" placeholder="Escribe aquí..." style="flex:1; border:1px solid #ddd; border-radius:5px; padding:8px;">
        <button onclick="sendMessage()" style="background:var(--blue); color:white; border:none; border-radius:5px; padding:8px 15px; cursor:pointer;">
            <i class="fas fa-paper-plane"></i>
        </button>
    </div>
`;
document.body.appendChild(chatbotContainer);

let chatOpen = false;
let userType = null; // 'financista' o 'institucion'

function toggleChat() {
    chatOpen = !chatOpen;
    chatbotContainer.style.display = chatOpen ? 'block' : 'none';
}

chatbotBtn.onclick = toggleChat;

function sendMessage() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    input.value = '';

    // Lógica de respuesta personalizada BridgeMind Games
    setTimeout(() => {
        let response = "";
        const lowerText = text.toLowerCase();

        // 1. Identificar tipo de usuario si no se ha hecho
        if (!userType) {
            if (lowerText.includes('finan') || lowerText.includes('inver')) {
                userType = 'financista';
                response = "Entendido. Para inversores, BGM ofrece un modelo de escalabilidad global único con IA. ¿Te gustaría conocer el retorno proyectado?";
            } else if (lowerText.includes('insti') || lowerText.includes('cole') || lowerText.includes('escuela')) {
                userType = 'institucion';
                response = "Excelente. Para instituciones, nuestro enfoque es pedagógico y mental, facilitando la enseñanza de 8 idiomas mediante el Bridge y la IA.";
            } else {
                response = "Por favor, indícame si eres un financista o una institución para poder darte la información correcta sobre BGM.";
            }
        } 
        // 2. Restringir solo a temas de BGM
        else if (!lowerText.includes('bgm') && !lowerText.includes('bridge') && !lowerText.includes('idioma') && !lowerText.includes('juego')) {
            response = "Lo siento, solo puedo responder preguntas relacionadas con BGM. Para otros temas, por favor completa el formulario de contacto.";
        }
        // 3. Respuesta según perfil
        else {
            if (userType === 'financista') {
                response = "Como financista, debes saber que BGM es una solución 'adictiva' por su sistema de juegos, lo que garantiza retención de usuarios y alta rentabilidad.";
            } else {
                response = "Nuestra metodología institucional se centra en el desarrollo mental y el aprendizaje de idiomas (Español, Inglés, Alemán, Italiano, Francés, Japonés, Árabe y Chino).";
            }
        }

        appendMessage(response, 'bot');
    }, 600);
}

function appendMessage(text, side) {
    const msgDiv = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.style.padding = "10px";
    div.style.borderRadius = "10px";
    div.style.maxWidth = "80%";
    div.style.marginBottom = "5px";
    
    if (side === 'user') {
        div.style.background = "var(--blue)";
        div.style.color = "white";
        div.style.alignSelf = "flex-end";
    } else {
        div.style.background = "#f1f1f1";
        div.style.alignSelf = "flex-start";
    }
    
    div.innerText = text;
    msgDiv.appendChild(div);
    msgDiv.scrollTop = msgDiv.scrollHeight;
}