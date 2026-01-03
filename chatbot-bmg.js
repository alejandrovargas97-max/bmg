(function() {
  'use strict';
  
  const GEMINI_API_KEY = "AIzaSyDDZsV69Pp3mIHyba4liiEMKTHZa1MIMpI";
  
  const systemPrompt = `Eres el asistente oficial de BridgeMind Games (BMG). SOLO hablas sobre BMG.

INFORMACIÓN BMG:
- Sistema de aprendizaje de idiomas mediante Bridge + IA
- Metodología dual: Idioma + Bridge simultáneamente
- Grupos de 4 personas, presencial en colegios/institutos
- Desde 12 años de edad
- Mínimo 1 semestre para ver resultados
- 8 países: China, Japón, Arabia Saudita, Australia, Italia, Francia, Alemania, España
- Precios personalizados según proyecto
- Contacto: Alejandro +34 634 268 663

REGLAS:
1. SOLO responde sobre BMG
2. Si preguntan algo NO relacionado con BMG: "Lo siento, solo puedo ayudarte con BridgeMind Games"
3. Sé breve (máximo 3-4 oraciones)
4. Si preguntan precios o quieren inscribirse: "Te puedo conectar con Alejandro al +34 634 268 663"`;

  let conversationHistory = [];
  let isLoading = false;

  // Crear el CSS
  const style = document.createElement('style');
  style.textContent = `
    #bmg-chat-button {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 50px;
      padding: 16px 24px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: transform 0.2s;
    }
    #bmg-chat-button:hover {
      transform: scale(1.05);
    }
    #bmg-chat-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 380px;
      height: 600px;
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      display: none;
      flex-direction: column;
      overflow: hidden;
      z-index: 9999;
      border: 4px solid #764ba2;
    }
    #bmg-chat-container.open {
      display: flex;
    }
    #bmg-chat-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    #bmg-chat-close {
      background: rgba(255,255,255,0.2);
      border: none;
      color: white;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #bmg-chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      background: linear-gradient(to bottom, #f9fafb, white);
    }
    .bmg-message {
      margin-bottom: 12px;
      display: flex;
    }
    .bmg-message.user {
      justify-content: flex-end;
    }
    .bmg-message.bot {
      justify-content: flex-start;
    }
    .bmg-message-content {
      max-width: 80%;
      padding: 12px 16px;
      border-radius: 16px;
      font-size: 14px;
      line-height: 1.5;
    }
    .bmg-message.user .bmg-message-content {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    .bmg-message.bot .bmg-message-content {
      background: #f3f4f6;
      color: #1f2937;
      border: 1px solid #e5e7eb;
    }
    .bmg-loading {
      display: flex;
      gap: 4px;
      padding: 12px 16px;
    }
    .bmg-loading-dot {
      width: 8px;
      height: 8px;
      background: #9ca3af;
      border-radius: 50%;
      animation: bmg-bounce 1.4s infinite ease-in-out;
    }
    .bmg-loading-dot:nth-child(1) { animation-delay: -0.32s; }
    .bmg-loading-dot:nth-child(2) { animation-delay: -0.16s; }
    @keyframes bmg-bounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }
    #bmg-chat-input-container {
      padding: 16px;
      border-top: 1px solid #e5e7eb;
      display: flex;
      gap: 8px;
    }
    #bmg-chat-input {
      flex: 1;
      border: 2px solid #e5e7eb;
      border-radius: 24px;
      padding: 12px 16px;
      font-size: 14px;
      outline: none;
    }
    #bmg-chat-input:focus {
      border-color: #764ba2;
    }
    #bmg-chat-send {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s;
    }
    #bmg-chat-send:hover {
      transform: scale(1.05);
    }
    #bmg-chat-send:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    #bmg-welcome {
      text-align: center;
      color: #9ca3af;
      padding: 48px 24px;
    }
    @media (max-width: 480px) {
      #bmg-chat-container {
        width: calc(100vw - 32px);
        height: calc(100vh - 100px);
      }
    }
  `;
  document.head.appendChild(style);

  // Crear el HTML del bot
  const chatHTML = `
    <button id="bmg-chat-button">
      <span style="font-size: 24px;">🎴</span>
      <span>BMG Chat</span>
    </button>
    
    <div id="bmg-chat-container">
      <div id="bmg-chat-header">
        <div>
          <div style="font-weight: bold; font-size: 18px;">🎴 BridgeMind</div>
          <div style="font-size: 12px; opacity: 0.9;">Gemini AI</div>
        </div>
        <button id="bmg-chat-close">×</button>
      </div>
      
      <div id="bmg-chat-messages">
        <div id="bmg-welcome">
          <div style="font-size: 48px; margin-bottom: 16px;">👋</div>
          <div style="font-size: 16px; font-weight: bold; color: #4b5563; margin-bottom: 8px;">
            ¡Hola! Soy el asistente de BMG
          </div>
          <div style="font-size: 14px;">
            Pregúntame sobre nuestro sistema de idiomas + Bridge
          </div>
        </div>
      </div>
      
      <div id="bmg-chat-input-container">
        <input 
          type="text" 
          id="bmg-chat-input" 
          placeholder="Escribe tu mensaje..."
        />
        <button id="bmg-chat-send">➤</button>
      </div>
    </div>
  `;

  const container = document.createElement('div');
  container.innerHTML = chatHTML;
  document.body.appendChild(container);

  // Referencias a elementos
  const button = document.getElementById('bmg-chat-button');
  const chatContainer = document.getElementById('bmg-chat-container');
  const closeBtn = document.getElementById('bmg-chat-close');
  const messagesDiv = document.getElementById('bmg-chat-messages');
  const input = document.getElementById('bmg-chat-input');
  const sendBtn = document.getElementById('bmg-chat-send');
  const welcome = document.getElementById('bmg-welcome');

  // Abrir/Cerrar chat
  button.addEventListener('click', () => {
    chatContainer.classList.add('open');
    button.style.display = 'none';
    input.focus();
  });

  closeBtn.addEventListener('click', () => {
    chatContainer.classList.remove('open');
    button.style.display = 'flex';
  });

  // Agregar mensaje
  function addMessage(text, type) {
    if (welcome) welcome.remove();
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `bmg-message ${type}`;
    messageDiv.innerHTML = `
      <div class="bmg-message-content">${text}</div>
    `;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  // Mostrar loading
  function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'bmg-message bot';
    loadingDiv.id = 'bmg-loading-message';
    loadingDiv.innerHTML = `
      <div class="bmg-message-content bmg-loading">
        <div class="bmg-loading-dot"></div>
        <div class="bmg-loading-dot"></div>
        <div class="bmg-loading-dot"></div>
      </div>
    `;
    messagesDiv.appendChild(loadingDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  function hideLoading() {
    const loading = document.getElementById('bmg-loading-message');
    if (loading) loading.remove();
  }

  // Llamar a Gemini API
  async function callGemini(userMessage) {
    try {
      isLoading = true;
      sendBtn.disabled = true;
      showLoading();

      const history = conversationHistory.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              ...history,
              { role: 'user', parts: [{ text: userMessage }] }
            ],
            systemInstruction: { parts: [{ text: systemPrompt }] },
            generationConfig: { temperature: 0.7, maxOutputTokens: 500 }
          })
        }
      );

      const data = await response.json();
      hideLoading();

      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        const botResponse = data.candidates[0].content.parts[0].text;
        
        conversationHistory.push(
          { role: 'user', content: userMessage },
          { role: 'assistant', content: botResponse }
        );

        addMessage(botResponse, 'bot');
      } else {
        addMessage('⚠️ Error al conectar. Verifica tu conexión.', 'bot');
      }
    } catch (error) {
      hideLoading();
      console.error('Error:', error);
      addMessage('Disculpa, tengo problemas de conexión. ¿Intentas de nuevo?', 'bot');
    } finally {
      isLoading = false;
      sendBtn.disabled = false;
    }
  }

  // Enviar mensaje
  function sendMessage() {
    const message = input.value.trim();
    if (!message || isLoading) return;

    addMessage(message, 'user');
    input.value = '';
    callGemini(message);
  }

  // Event listeners
  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  console.log('✅ BMG Chatbot cargado correctamente (versión simple)');
})();
